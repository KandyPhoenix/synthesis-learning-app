// ============================================
// ACTIVE RECALL SYSTEM
// Flashcards, Quick Quiz, Feynman Technique
// ============================================

class ActiveRecallSystem {
    constructor(app) {
        this.app = app;
        this.currentFlashcard = null;
        this.flashcardQueue = [];
        this.quizQuestions = [];
        this.currentQuizIndex = 0;
        this.quizScore = 0;
        this.feynmanConcept = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Back buttons — return to wherever the user came from
        const backBtns = ['flashcards', 'quick-quiz', 'feynman'];
        backBtns.forEach(view => {
            const btn = document.getElementById(`${view}-back-btn`);
            if (btn) {
                btn.addEventListener('click', () => this.app.goBack());
            }
        });
    }

    // ============================================
    // FLASHCARD SYSTEM
    // ============================================

    renderFlashcards() {
        const container = document.getElementById('flashcards-content');
        if (!container) return;

        // Ensure flashcards data structure exists
        if (!APP_DATA.user.flashcards) {
            APP_DATA.user.flashcards = { cards: [], settings: { newCardsPerDay: 20, reviewsPerDay: 100 }, stats: {} };
        }
        if (!APP_DATA.user.flashcards.settings) {
            APP_DATA.user.flashcards.settings = { newCardsPerDay: 20, reviewsPerDay: 100 };
        }

        const dueCards = this.getDueFlashcards();
        const allCards = APP_DATA.user.flashcards.cards || [];
        const reviewedCount = APP_DATA.user.learningStats?.flashcardsReviewed || 0;

        const html = `
            <div class="flashcard-stats">
                <div class="fc-stat">
                    <span class="fc-stat-value">${allCards.length}</span>
                    <span class="fc-stat-label">Total Cards</span>
                </div>
                <div class="fc-stat">
                    <span class="fc-stat-value">${dueCards.length}</span>
                    <span class="fc-stat-label">Due Today</span>
                </div>
                <div class="fc-stat">
                    <span class="fc-stat-value">${reviewedCount}</span>
                    <span class="fc-stat-label">Reviewed</span>
                </div>
            </div>

            ${dueCards.length > 0 ? `
                <div class="flashcard-review-section">
                    <h3>Ready to Review</h3>
                    <p class="fc-subtitle">${dueCards.length} cards waiting for you</p>
                    <button class="btn-primary fc-start-btn" onclick="window.activeRecall.startFlashcardReview()">
                        Start Review Session
                    </button>
                </div>
            ` : `
                <div class="flashcard-empty">
                    <div class="empty-icon">🎉</div>
                    <h3>All caught up!</h3>
                    <p>No cards due for review right now. Complete more lessons to generate flashcards.</p>
                </div>
            `}

            <div class="flashcard-decks">
                <h3>Your Card Decks</h3>
                <div class="deck-list" id="deck-list">
                    ${this.renderDeckList()}
                </div>
            </div>

            <div class="flashcard-settings">
                <h3>Settings</h3>
                <div class="setting-row">
                    <label>New cards per day</label>
                    <input type="number" value="${APP_DATA.user.flashcards.settings.newCardsPerDay || 20}"
                           onchange="window.activeRecall.updateSetting('newCardsPerDay', this.value)" class="setting-input">
                </div>
                <div class="setting-row">
                    <label>Reviews per day</label>
                    <input type="number" value="${APP_DATA.user.flashcards.settings.reviewsPerDay || 100}"
                           onchange="window.activeRecall.updateSetting('reviewsPerDay', this.value)" class="setting-input">
                </div>
            </div>
        `;

        container.innerHTML = html;
        this.updateDueBadge();
    }

    renderDeckList() {
        const cards = APP_DATA.user.flashcards?.cards || [];
        const deckMap = {};

        cards.forEach(card => {
            if (!deckMap[card.bookId]) {
                const book = getBookById(card.bookId);
                deckMap[card.bookId] = {
                    name: card.deck || (book ? book.title : 'Unknown'),
                    count: 0,
                    due: 0
                };
            }
            deckMap[card.bookId].count++;
            if (new Date(card.nextReview) <= new Date()) {
                deckMap[card.bookId].due++;
            }
        });

        if (Object.keys(deckMap).length === 0) {
            return '<p class="no-decks">No flashcard decks yet. Complete lessons to auto-generate cards!</p>';
        }

        return Object.entries(deckMap).map(([bookId, deck]) => `
            <div class="deck-item" onclick="window.activeRecall.reviewDeck('${bookId}')">
                <div class="deck-info">
                    <div class="deck-name">${deck.name}</div>
                    <div class="deck-count">${deck.count} cards</div>
                </div>
                ${deck.due > 0 ? `<span class="deck-due">${deck.due} due</span>` : '<span class="deck-done">✓</span>'}
            </div>
        `).join('');
    }

    getDueFlashcards() {
        const now = new Date();
        const cards = APP_DATA.user.flashcards?.cards || [];
        return cards.filter(card => {
            return new Date(card.nextReview) <= now;
        });
    }

    updateDueBadge() {
        const badge = document.getElementById('flashcards-due-badge');
        if (badge) {
            const dueCount = this.getDueFlashcards().length;
            badge.textContent = `${dueCount} due`;
            badge.style.display = dueCount > 0 ? 'block' : 'none';
        }
    }

    // Round-robins due cards across books so consecutive cards are never
    // from the same book — interleaved practice (mixing topics) is one of
    // the best-documented ways to fight forgetting, and reviewing the raw
    // due-queue in insertion order (previously: cards from whichever book
    // you finished most recently, back-to-back) is the opposite: blocked
    // practice.
    interleaveByBook(cards) {
        const groups = {};
        const order = [];
        for (const card of cards) {
            const key = card.bookId || 'unknown';
            if (!groups[key]) { groups[key] = []; order.push(key); }
            groups[key].push(card);
        }
        if (order.length <= 1) return cards;

        const result = [];
        let added = true;
        while (added) {
            added = false;
            for (const key of order) {
                if (groups[key].length > 0) {
                    result.push(groups[key].shift());
                    added = true;
                }
            }
        }
        return result;
    }

    startFlashcardReview() {
        this.flashcardQueue = this.interleaveByBook(this.getDueFlashcards());
        if (this.flashcardQueue.length === 0) return;

        this.showNextFlashcard();
    }

    reviewDeck(bookId) {
        const now = new Date();
        this.flashcardQueue = APP_DATA.user.flashcards.cards.filter(card => {
            return card.bookId === bookId && new Date(card.nextReview) <= now;
        });

        if (this.flashcardQueue.length === 0) {
            toast('No cards due in this deck!', 'info');
            return;
        }

        this.showNextFlashcard();
    }

    showNextFlashcard() {
        if (this.flashcardQueue.length === 0) {
            this.showReviewComplete();
            return;
        }

        this.currentFlashcard = this.flashcardQueue.shift();
        const container = document.getElementById('flashcards-content');

        const html = `
            <div class="flashcard-review">
                <div class="fc-header">
                    <button class="btn-back-inline" onclick="window.activeRecall.renderFlashcards()">
                        ← Back to Flashcards
                    </button>
                    <div class="fc-progress">
                        <span>${this.flashcardQueue.length + 1} cards remaining</span>
                    </div>
                </div>

                <div class="flashcard" id="active-flashcard" onclick="window.activeRecall.flipCard()">
                    <div class="flashcard-inner" id="flashcard-inner">
                        <div class="flashcard-front">
                            <div class="fc-label">Question</div>
                            <div class="fc-content">${this.currentFlashcard.front}</div>
                            <div class="fc-hint">Tap to reveal answer</div>
                        </div>
                        <div class="flashcard-back">
                            <div class="fc-label">Answer</div>
                            <div class="fc-content">${this.currentFlashcard.back}</div>
                        </div>
                    </div>
                </div>

                <div class="fc-actions" id="fc-actions" style="display: none;">
                    <p class="fc-rate-label">How well did you know this?</p>
                    <div class="fc-buttons">
                        <button class="fc-btn fc-again" onclick="window.activeRecall.rateCard(0)">
                            <span class="fc-btn-icon">❌</span>
                            <span>Again</span>
                        </button>
                        <button class="fc-btn fc-hard" onclick="window.activeRecall.rateCard(1)">
                            <span class="fc-btn-icon">😓</span>
                            <span>Hard</span>
                        </button>
                        <button class="fc-btn fc-good" onclick="window.activeRecall.rateCard(2)">
                            <span class="fc-btn-icon">👍</span>
                            <span>Good</span>
                        </button>
                        <button class="fc-btn fc-easy" onclick="window.activeRecall.rateCard(3)">
                            <span class="fc-btn-icon">🎯</span>
                            <span>Easy</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    flipCard() {
        const cardInner = document.getElementById('flashcard-inner');
        const actions = document.getElementById('fc-actions');

        if (cardInner && !cardInner.classList.contains('flipped')) {
            cardInner.classList.add('flipped');
            if (actions) actions.style.display = 'block';
        }
    }

    rateCard(quality) {
        if (!this.currentFlashcard) return;

        // Use gamification system's SM-2 algorithm
        if (window.gamification) {
            window.gamification.reviewFlashcard(this.currentFlashcard.id, quality);
        }

        // Show next card
        this.showNextFlashcard();
    }

    showReviewComplete() {
        const container = document.getElementById('flashcards-content');
        const reviewed = APP_DATA.user.learningStats.flashcardsReviewed;

        container.innerHTML = `
            <div class="review-complete">
                <div class="complete-icon">🎉</div>
                <h2>Review Complete!</h2>
                <p>You've reviewed all due cards for now.</p>
                <div class="complete-stats">
                    <div class="complete-stat">
                        <span class="complete-value">${reviewed}</span>
                        <span class="complete-label">Total Reviews</span>
                    </div>
                </div>
                <button class="btn-primary" onclick="window.activeRecall.renderFlashcards()">Back to Flashcards</button>
            </div>
        `;
    }

    updateSetting(key, value) {
        APP_DATA.user.flashcards.settings[key] = parseInt(value);
        saveProgress();
    }

    // ============================================
    // QUICK QUIZ MODE
    // ============================================

    renderQuickQuiz() {
        const container = document.getElementById('quick-quiz-content');
        if (!container) return;

        // Gather all quiz questions from completed lessons
        const allQuizzes = this.gatherAllQuizzes();

        const html = `
            <div class="quiz-intro">
                <div class="quiz-intro-icon">⚡</div>
                <h2>Quick Quiz Mode</h2>
                <p>Test your knowledge with random questions from lessons you've completed!</p>

                <div class="quiz-length-options">
                    <div class="quiz-option-card" onclick="window.activeRecall.startQuiz(5)">
                        <span class="option-number">5</span>
                        <span class="option-label">Quick</span>
                        <span class="option-time">~2 min</span>
                    </div>
                    <div class="quiz-option-card" onclick="window.activeRecall.startQuiz(10)">
                        <span class="option-number">10</span>
                        <span class="option-label">Standard</span>
                        <span class="option-time">~5 min</span>
                    </div>
                    <div class="quiz-option-card" onclick="window.activeRecall.startQuiz(20)">
                        <span class="option-number">20</span>
                        <span class="option-label">Challenge</span>
                        <span class="option-time">~10 min</span>
                    </div>
                </div>

                <div class="quiz-stats">
                    <p><strong>${allQuizzes.length}</strong> questions available from your completed lessons</p>
                </div>
            </div>

            <div class="quiz-history">
                <h3>Recent Results</h3>
                <div class="history-list">
                    ${this.renderQuizHistory()}
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    gatherAllQuizzes() {
        const quizzes = [];

        // First, add sample quizzes (always available for testing)
        if (APP_DATA.user.sampleQuizzes && APP_DATA.user.sampleQuizzes.length > 0) {
            APP_DATA.user.sampleQuizzes.forEach(quiz => {
                quizzes.push({
                    type: 'quiz',
                    question: quiz.question,
                    options: quiz.options,
                    explanation: quiz.explanation,
                    bookTitle: quiz.bookTitle,
                    lessonTitle: quiz.lessonTitle
                });
            });
        }

        // Then add quizzes from completed lessons
        APP_DATA.categories.forEach(category => {
            category.books.forEach(book => {
                if (book.lessonList) {
                    book.lessonList.forEach(lesson => {
                        if (lesson.completed && lesson.cards) {
                            lesson.cards.forEach(card => {
                                if (card.type === 'quiz' && card.question && card.options) {
                                    quizzes.push({
                                        ...card,
                                        bookTitle: book.title,
                                        lessonTitle: lesson.title
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });

        return quizzes;
    }

    renderQuizHistory() {
        const quizHistory = APP_DATA.user.learningStats?.quizHistory || [];
        const history = quizHistory.slice(-5).reverse();

        if (history.length === 0) {
            return '<p class="no-history">No quiz history yet. Start a quiz to track your progress!</p>';
        }

        return history.map(entry => `
            <div class="history-item">
                <div class="history-score ${entry.perfect ? 'perfect' : ''}">${entry.score}/${entry.total}</div>
                <div class="history-info">
                    <div class="history-date">${formatDateMMDDYYYY(entry.date)}</div>
                    <div class="history-perc">${Math.round(entry.percentage)}%</div>
                </div>
            </div>
        `).join('');
    }

    startQuiz(count) {
        const allQuizzes = this.gatherAllQuizzes();

        if (allQuizzes.length === 0) {
            toast('No quiz questions available! Complete some lessons with quizzes first.', 'success');
            return;
        }

        // Shuffle and pick questions
        const shuffled = [...allQuizzes].sort(() => Math.random() - 0.5);
        this.quizQuestions = shuffled.slice(0, Math.min(count, shuffled.length));
        this.currentQuizIndex = 0;
        this.quizScore = 0;

        this.showQuizQuestion();
    }

    showQuizQuestion() {
        if (this.currentQuizIndex >= this.quizQuestions.length) {
            this.showQuizResults();
            return;
        }

        const container = document.getElementById('quick-quiz-content');
        const question = this.quizQuestions[this.currentQuizIndex];
        const progress = ((this.currentQuizIndex + 1) / this.quizQuestions.length) * 100;

        const html = `
            <div class="quiz-active">
                <div class="quiz-header">
                    <button class="btn-back-inline" onclick="window.activeRecall.renderQuickQuiz()">
                        ← Back to Quiz Menu
                    </button>
                </div>

                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="quiz-counter">
                    Question ${this.currentQuizIndex + 1} of ${this.quizQuestions.length}
                </div>

                <div class="quiz-source">
                    From: ${question.bookTitle} - ${question.lessonTitle}
                </div>

                <div class="quiz-question-card">
                    <h3 class="quiz-question-text">${question.question}</h3>
                    <div class="quiz-options-list">
                        ${question.options.map((opt, i) => `
                            <button class="quiz-option-btn" id="quiz-opt-${i}"
                                    onclick="window.activeRecall.selectQuizAnswer(${i}, ${opt.correct})">
                                ${opt.text}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="quiz-explanation-box" id="quiz-explanation-box" style="display: none;">
                    <div class="explanation-content" id="explanation-content"></div>
                    <button class="btn-primary" onclick="window.activeRecall.nextQuizQuestion()">
                        ${this.currentQuizIndex < this.quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    selectQuizAnswer(index, isCorrect) {
        // Disable all options
        document.querySelectorAll('.quiz-option-btn').forEach((btn, i) => {
            btn.disabled = true;
            const question = this.quizQuestions[this.currentQuizIndex];
            if (question.options[i].correct) {
                btn.classList.add('correct');
            }
        });

        const selectedBtn = document.getElementById(`quiz-opt-${index}`);
        if (isCorrect) {
            this.quizScore++;
            selectedBtn.classList.add('correct');
        } else {
            selectedBtn.classList.add('incorrect');
        }

        // Show explanation
        const explanationBox = document.getElementById('quiz-explanation-box');
        const explanationContent = document.getElementById('explanation-content');
        const question = this.quizQuestions[this.currentQuizIndex];

        explanationContent.innerHTML = `
            <div class="${isCorrect ? 'correct-msg' : 'incorrect-msg'}">
                ${isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </div>
            ${question.explanation ? `<p>${question.explanation}</p>` : ''}
        `;
        explanationBox.style.display = 'block';
    }

    nextQuizQuestion() {
        this.currentQuizIndex++;
        this.showQuizQuestion();
    }

    showQuizResults() {
        const container = document.getElementById('quick-quiz-content');
        const total = this.quizQuestions.length;
        const percentage = Math.round((this.quizScore / total) * 100);
        const isPerfect = this.quizScore === total;

        // Record results
        if (window.gamification) {
            window.gamification.recordQuizResult('quick-quiz', 'quick-quiz', this.quizScore, total);
        }

        let grade, gradeClass;
        if (percentage >= 90) { grade = 'A'; gradeClass = 'grade-a'; }
        else if (percentage >= 80) { grade = 'B'; gradeClass = 'grade-b'; }
        else if (percentage >= 70) { grade = 'C'; gradeClass = 'grade-c'; }
        else if (percentage >= 60) { grade = 'D'; gradeClass = 'grade-d'; }
        else { grade = 'F'; gradeClass = 'grade-f'; }

        const html = `
            <div class="quiz-results">
                <div class="results-icon">${isPerfect ? '🏆' : percentage >= 70 ? '🎉' : '📚'}</div>
                <h2>Quiz Complete!</h2>

                <div class="results-grade ${gradeClass}">${grade}</div>

                <div class="results-score">
                    <span class="score-value">${this.quizScore}</span>
                    <span class="score-total">/ ${total}</span>
                </div>

                <div class="results-percentage">${percentage}%</div>

                <div class="results-message">
                    ${isPerfect ? 'Perfect score! You\'re a master!' :
                      percentage >= 80 ? 'Great job! Keep it up!' :
                      percentage >= 60 ? 'Good effort! Review the topics you missed.' :
                      'Keep studying! You\'ll get better with practice.'}
                </div>

                <div class="results-actions">
                    <button class="btn-secondary" onclick="window.activeRecall.renderQuickQuiz()">Back to Quiz Menu</button>
                    <button class="btn-primary" onclick="window.activeRecall.startQuiz(${total})">Try Again</button>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // ============================================
    // FEYNMAN TECHNIQUE
    // ============================================

    renderFeynman() {
        const container = document.getElementById('feynman-content');
        if (!container) return;

        const hasApiKey = !!(this.app && typeof this.app.getAnthropicApiKey === 'function' && this.app.getAnthropicApiKey());
        const hasHistory = (APP_DATA.user.feynmanExplanations || []).length > 0;

        const html = `
            <div class="feynman-intro">
                <div class="feynman-quote">
                    <p>"If you can't explain it simply, you don't understand it well enough."</p>
                    <span class="quote-author">- Richard Feynman</span>
                </div>

                <div class="feynman-steps">
                    <h3>The Feynman Technique</h3>
                    <div class="step-list">
                        <div class="step-item">
                            <span class="step-num">1</span>
                            <span class="step-text">Choose a concept you want to understand</span>
                        </div>
                        <div class="step-item">
                            <span class="step-num">2</span>
                            <span class="step-text">Explain it as if teaching a child</span>
                        </div>
                        <div class="step-item">
                            <span class="step-num">3</span>
                            <span class="step-text">Identify gaps in your explanation</span>
                        </div>
                        <div class="step-item">
                            <span class="step-num">4</span>
                            <span class="step-text">Review and simplify</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="feynman-practice">
                <h3>Practice Now</h3>
                <p>Select a concept from your completed lessons or your Glossary:</p>

                <div class="concept-selector">
                    <select id="feynman-concept-select" onchange="window.activeRecall.selectFeynmanConcept(this.value)">
                        <option value="">-- Choose a concept --</option>
                        ${this.renderConceptOptions()}
                    </select>
                    <button class="btn-secondary" onclick="window.activeRecall.startRevisit()" ${hasHistory ? '' : 'disabled title="Save an explanation first"'} style="margin-top: 0.5rem;">
                        🔄 Revisit an Old Explanation
                    </button>
                </div>

                <div id="feynman-workspace" class="feynman-workspace" style="display: none;">
                    <div class="workspace-header">
                        <h4 id="feynman-concept-title"></h4>
                        <p id="feynman-revisit-note" class="workspace-prompt" style="display:none; color: var(--color-primary-light);"></p>
                    </div>

                    <div class="feynman-step-block">
                        <label class="feynman-step-label">1. Explain it simply — as if teaching a 5-year-old</label>
                        <textarea id="feynman-explanation" class="feynman-textarea"
                                  placeholder="Start typing your explanation...&#10;&#10;Tips:&#10;- Use simple words&#10;- Give real-world examples&#10;- Avoid jargon"></textarea>
                    </div>

                    <div class="feynman-step-block">
                        <label class="feynman-step-label">2. Where did you get stuck, or what did you gloss over?</label>
                        <textarea id="feynman-gaps" class="feynman-textarea" style="min-height: 80px;"
                                  placeholder="Be honest — this is the whole point of the technique. What couldn't you explain cleanly?"></textarea>
                    </div>

                    <div class="feynman-step-block">
                        <label class="feynman-step-label">3. Now simplify further — your best version</label>
                        <textarea id="feynman-simplified" class="feynman-textarea" style="min-height: 80px;"
                                  placeholder="Rewrite it, now that you've spotted the gaps."></textarea>
                    </div>

                    <div class="workspace-actions">
                        <button class="btn-secondary" onclick="window.activeRecall.clearFeynman()">Clear</button>
                        ${hasApiKey
                            ? `<button class="btn-secondary" id="feynman-feedback-btn" onclick="window.activeRecall.getFeynmanFeedback()">🧑‍🏫 Get AI Feedback</button>`
                            : `<button class="btn-secondary" disabled title="Add an API key in Profile > AI Tutor to unlock this">🧑‍🏫 Get AI Feedback</button>`
                        }
                        <button class="btn-primary" onclick="window.activeRecall.saveFeynman()">Save Explanation</button>
                    </div>

                    <div id="feynman-feedback-result" class="feynman-feedback-box" style="display:none;"></div>
                </div>
            </div>

            <div class="feynman-history">
                <h3>Your Explanations</h3>
                <div id="feynman-saved-list">
                    ${this.renderFeynmanHistory()}
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // Concept dropdown grouped by source, so a large list (lesson concepts +
    // glossary terms + samples) stays navigable.
    renderConceptOptions() {
        const concepts = this.getFeynmanConcepts();
        const groups = { sample: [], concept: [], glossary: [] };
        concepts.forEach(c => groups[c.source || 'concept'].push(c));

        const optGroup = (label, items) => items.length === 0 ? '' : `
            <optgroup label="${label}">
                ${items.map(c => `<option value="${c.id}">${escapeHtml(c.title)} (${escapeHtml(c.book)})</option>`).join('')}
            </optgroup>
        `;

        return optGroup('From Your Lessons', groups.concept)
            + optGroup('From Your Glossary', groups.glossary)
            + optGroup('Sample Concepts', groups.sample);
    }

    getFeynmanConcepts() {
        const concepts = [];

        // First, add sample Feynman concepts (always available for testing)
        if (APP_DATA.user.sampleFeynmanConcepts && APP_DATA.user.sampleFeynmanConcepts.length > 0) {
            APP_DATA.user.sampleFeynmanConcepts.forEach(concept => {
                concepts.push({
                    id: concept.id,
                    title: concept.title,
                    content: concept.content,
                    book: concept.book,
                    lesson: concept.lesson,
                    source: 'sample'
                });
            });
        }

        // Then add concepts from completed lessons
        APP_DATA.categories.forEach(category => {
            category.books.forEach(book => {
                if (book.lessonList) {
                    book.lessonList.forEach(lesson => {
                        if (lesson.completed && lesson.cards) {
                            lesson.cards.forEach((card, i) => {
                                if (card.type === 'concept' && card.title) {
                                    concepts.push({
                                        id: `${book.id}-${lesson.id}-${i}`,
                                        title: card.title,
                                        content: card.content,
                                        book: book.title,
                                        lesson: lesson.title,
                                        source: 'concept'
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });

        // Personal Glossary terms — more specific, granular practice targets
        // than a whole lesson's "concept" card.
        if (this.app && typeof this.app.buildPersonalGlossary === 'function') {
            this.app.buildPersonalGlossary().forEach(term => {
                const entry = term.entries[0];
                if (!entry) return;
                concepts.push({
                    id: `glossary-${term.term}`,
                    title: term.term,
                    content: entry.context,
                    book: entry.bookTitle,
                    lesson: entry.lessonTitle,
                    source: 'glossary'
                });
            });
        }

        return concepts;
    }

    selectFeynmanConcept(conceptId) {
        if (!conceptId) {
            document.getElementById('feynman-workspace').style.display = 'none';
            return;
        }

        const concepts = this.getFeynmanConcepts();
        this.feynmanConcept = concepts.find(c => c.id === conceptId);
        this._feynmanRevisitOf = null;

        if (this.feynmanConcept) {
            document.getElementById('feynman-concept-title').textContent = this.feynmanConcept.title;
            document.getElementById('feynman-revisit-note').style.display = 'none';
            document.getElementById('feynman-workspace').style.display = 'block';
            document.getElementById('feynman-explanation').value = '';
            document.getElementById('feynman-gaps').value = '';
            document.getElementById('feynman-simplified').value = '';
            document.getElementById('feynman-feedback-result').style.display = 'none';
        }
    }

    clearFeynman() {
        document.getElementById('feynman-explanation').value = '';
        document.getElementById('feynman-gaps').value = '';
        document.getElementById('feynman-simplified').value = '';
        document.getElementById('feynman-feedback-result').style.display = 'none';
    }

    // Resurfaces the least-recently-explained concept so you can try
    // explaining it again cold — the old answer stays hidden until after
    // you save, so you're re-deriving the explanation, not copying it.
    getRevisitCandidate() {
        const explanations = APP_DATA.user.feynmanExplanations || [];
        if (explanations.length === 0) return null;
        return [...explanations].sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    }

    startRevisit() {
        const candidate = this.getRevisitCandidate();
        if (!candidate) {
            toast('No saved explanations yet to revisit!', 'info');
            return;
        }

        this.feynmanConcept = {
            id: candidate.conceptId,
            title: candidate.conceptTitle,
            book: candidate.book,
            lesson: candidate.lesson || '',
            content: candidate.sourceContent || ''
        };
        this._feynmanRevisitOf = candidate;

        document.getElementById('feynman-concept-select').value = '';
        document.getElementById('feynman-concept-title').textContent = this.feynmanConcept.title;
        const note = document.getElementById('feynman-revisit-note');
        note.textContent = `🔄 You explained this on ${formatDateMMDDYYYY(candidate.date)} — try again without peeking at your old answer. You'll be able to compare after you save.`;
        note.style.display = 'block';
        document.getElementById('feynman-workspace').style.display = 'block';
        document.getElementById('feynman-explanation').value = '';
        document.getElementById('feynman-gaps').value = '';
        document.getElementById('feynman-simplified').value = '';
        document.getElementById('feynman-feedback-result').style.display = 'none';
    }

    async getFeynmanFeedback() {
        if (!this.app || !this.app.getAnthropicApiKey()) {
            toast('Add an API key in Profile > AI Tutor to unlock feedback.', 'info');
            return;
        }
        const explanation = document.getElementById('feynman-explanation').value.trim();
        if (!explanation) {
            toast('Write your explanation first.', 'info');
            return;
        }
        if (!this.feynmanConcept) return;

        const btn = document.getElementById('feynman-feedback-btn');
        const resultBox = document.getElementById('feynman-feedback-result');
        if (btn) { btn.disabled = true; btn.textContent = 'Thinking...'; }

        const gaps = document.getElementById('feynman-gaps').value.trim();
        const sourceContent = (this.feynmanConcept.content || '').slice(0, 1500);

        try {
            const systemPrompt = `You are a supportive tutor grading a student's attempt at the Feynman Technique (explaining a concept in plain language, as if teaching a child). Be encouraging but honest and specific. Keep your whole response to 3-4 short sentences — this is quick feedback, not an essay.`;
            const userPrompt = `Concept: "${this.feynmanConcept.title}" (from "${this.feynmanConcept.book}"${this.feynmanConcept.lesson ? ' — ' + this.feynmanConcept.lesson : ''}).\n\n${sourceContent ? `Original source material, for grounding:\n${sourceContent}\n\n` : ''}The student's plain-language explanation:\n"${explanation}"\n${gaps ? `\nThe student already flagged this gap themselves: "${gaps}"\n` : ''}\nIdentify: (1) what they got right, (2) any gaps, inaccuracies, or oversimplifications — especially ones they didn't already flag — and (3) one specific way to sharpen the explanation.`;

            const feedback = await this.app.callAnthropicApi([{ role: 'user', content: userPrompt }], systemPrompt);
            resultBox.innerHTML = `<strong>🧑‍🏫 Feedback</strong><p>${escapeHtml(feedback)}</p>`;
            resultBox.style.display = 'block';
            this._lastFeynmanFeedback = feedback;
        } catch (err) {
            resultBox.innerHTML = `<strong>⚠️</strong> ${escapeHtml(err.message)}`;
            resultBox.style.display = 'block';
        }

        if (btn) { btn.disabled = false; btn.textContent = '🧑‍🏫 Get AI Feedback'; }
    }

    saveFeynman() {
        const explanation = document.getElementById('feynman-explanation').value.trim();
        const gaps = document.getElementById('feynman-gaps').value.trim();
        const simplified = document.getElementById('feynman-simplified').value.trim();

        if (!explanation) {
            toast('Please write an explanation first!', 'info');
            return;
        }

        if (!this.feynmanConcept) return;

        if (!APP_DATA.user.feynmanExplanations) {
            APP_DATA.user.feynmanExplanations = [];
        }

        APP_DATA.user.feynmanExplanations.push({
            id: Date.now(),
            conceptId: this.feynmanConcept.id,
            conceptTitle: this.feynmanConcept.title,
            book: this.feynmanConcept.book,
            lesson: this.feynmanConcept.lesson || '',
            sourceContent: this.feynmanConcept.content || '',
            explanation,
            gaps,
            simplified,
            feedback: this._lastFeynmanFeedback || null,
            revisitOfId: this._feynmanRevisitOf ? this._feynmanRevisitOf.id : null,
            date: new Date().toISOString()
        });

        saveProgress();
        this._lastFeynmanFeedback = null;
        this._feynmanRevisitOf = null;

        // Award XP
        if (window.gamification) {
            window.gamification.awardXP(30, 'Feynman Technique Practice');
        }

        toast('Explanation saved! +30 XP', 'success');
        this.renderFeynman();
    }

    renderFeynmanHistory() {
        const explanations = APP_DATA.user.feynmanExplanations || [];

        if (explanations.length === 0) {
            return '<p class="no-explanations">No saved explanations yet. Practice explaining concepts above!</p>';
        }

        return explanations.slice(-5).reverse().map(exp => {
            const original = exp.revisitOfId ? explanations.find(e => e.id === exp.revisitOfId) : null;
            return `
            <div class="feynman-saved-item">
                <div class="saved-header">
                    <h4>${escapeHtml(exp.conceptTitle)}${exp.revisitOfId ? ' <span class="feynman-revisit-badge">🔄 Revisited</span>' : ''}</h4>
                    <span class="saved-date">${formatDateMMDDYYYY(exp.date)}</span>
                </div>
                <p class="saved-book">From: ${escapeHtml(exp.book)}</p>
                <p class="saved-explanation">${escapeHtml(exp.explanation.substring(0, 200))}${exp.explanation.length > 200 ? '...' : ''}</p>
                ${exp.gaps ? `<p class="saved-explanation"><strong>Gaps noted:</strong> ${escapeHtml(exp.gaps.substring(0, 150))}${exp.gaps.length > 150 ? '...' : ''}</p>` : ''}
                ${exp.feedback ? `<p class="saved-explanation"><strong>🧑‍🏫 AI feedback:</strong> ${escapeHtml(exp.feedback.substring(0, 200))}${exp.feedback.length > 200 ? '...' : ''}</p>` : ''}
                ${original ? `<p class="saved-explanation" style="opacity:0.7;"><strong>Original (${formatDateMMDDYYYY(original.date)}):</strong> ${escapeHtml(original.explanation.substring(0, 150))}${original.explanation.length > 150 ? '...' : ''}</p>` : ''}
            </div>
        `;
        }).join('');
    }

    // ============================================
    // FAVORITES SHELF
    // ============================================

    renderFavorites() {
        const container = document.getElementById('favorites-shelf');
        if (!container) return;

        const favoriteBookIds = APP_DATA.user.favoriteBooks || [];
        const favoriteCategoryIds = APP_DATA.user.favoriteCategories || [];

        if (favoriteBookIds.length === 0 && favoriteCategoryIds.length === 0) {
            container.innerHTML = `
                <div class="no-favorites">
                    <p>No favorites yet. Add books from any book detail page, or pin a whole track from its category page!</p>
                </div>
            `;
            return;
        }

        const favoriteCategories = favoriteCategoryIds.map(id => APP_DATA.categories.find(c => c.id === id)).filter(c => c);
        const favoriteBooks = favoriteBookIds.map(id => getBookById(id)).filter(b => b);

        const categoryCardsHtml = favoriteCategories.map(cat => `
            <div class="favorite-book-card" onclick="app.showCategory('${cat.id}')">
                <div class="fav-book-cover" style="background: linear-gradient(135deg, ${cat.color} 0%, ${this.getCategoryColorDark(cat.id)} 100%); font-size: 1.75rem;">
                    ${cat.icon || '📚'}
                </div>
                <div class="fav-book-title">${escapeHtml(cat.name)}</div>
                <div class="fav-book-progress">${(cat.books || []).length} book${(cat.books || []).length === 1 ? '' : 's'}</div>
            </div>
        `).join('');

        const bookCardsHtml = favoriteBooks.map(book => `
            <div class="favorite-book-card" onclick="app.showBook('${book.id}')">
                <div class="fav-book-cover" style="background: linear-gradient(135deg, ${this.getCategoryColor(book.category)} 0%, ${this.getCategoryColorDark(book.category)} 100%)">
                    ${book.title.split(' ').slice(0, 2).map(w => w[0]).join('')}
                </div>
                <div class="fav-book-title">${book.title}</div>
                <div class="fav-book-progress">${book.progress}%</div>
            </div>
        `).join('');

        container.innerHTML = categoryCardsHtml + bookCardsHtml;
    }

    toggleFavorite(bookId) {
        if (!APP_DATA.user.favoriteBooks) {
            APP_DATA.user.favoriteBooks = [];
        }

        const index = APP_DATA.user.favoriteBooks.indexOf(bookId);
        if (index > -1) {
            APP_DATA.user.favoriteBooks.splice(index, 1);
        } else {
            if (APP_DATA.user.favoriteBooks.length >= 5) {
                toast('You can only have 5 favorite books. Remove one first!', 'info');
                return;
            }
            APP_DATA.user.favoriteBooks.push(bookId);
        }

        saveProgress();
        this.renderFavorites();
    }

    isFavorite(bookId) {
        return (APP_DATA.user.favoriteBooks || []).includes(bookId);
    }

    // Pinning a whole category (e.g. a multi-book course track) rather than
    // a single book — no per-book progress bar makes sense for a track, so
    // this is a separate list from favoriteBooks, not the same mechanism.
    toggleFavoriteCategory(categoryId) {
        if (!APP_DATA.user.favoriteCategories) {
            APP_DATA.user.favoriteCategories = [];
        }

        const index = APP_DATA.user.favoriteCategories.indexOf(categoryId);
        if (index > -1) {
            APP_DATA.user.favoriteCategories.splice(index, 1);
        } else {
            if (APP_DATA.user.favoriteCategories.length >= 3) {
                toast('You can only pin 3 tracks. Remove one first!', 'info');
                return;
            }
            APP_DATA.user.favoriteCategories.push(categoryId);
        }

        saveProgress();
        this.renderFavorites();
    }

    isFavoriteCategory(categoryId) {
        return (APP_DATA.user.favoriteCategories || []).includes(categoryId);
    }

    getCategoryColor(categoryId) {
        const category = APP_DATA.categories.find(c => c.id === categoryId);
        return category ? category.color : '#6366f1';
    }

    getCategoryColorDark(categoryId) {
        const colorMap = {
            'psychology': '#7c3aed',
            'productivity': '#2563eb',
            'philosophy': '#db2777',
            'personal-development': '#059669',
            'health': '#0f766e',
            'history': '#d97706',
            'business': '#4f46e5',
            'leadership': '#dc2626',
            'science': '#0891b2'
        };
        return colorMap[categoryId] || '#4f46e5';
    }
}

// (Active recall is initialized by app.js via new ActiveRecallSystem(this).)

window.ActiveRecallSystem = ActiveRecallSystem;
