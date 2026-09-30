// ============================================
// SYNTHESIS LEARNING APP - MAIN APPLICATION
// ============================================

class SynthesisApp {
    constructor() {
        this.currentView = 'home';
        this.currentCategory = null;
        this.currentBook = null;
        this.currentLesson = null;
        this.currentCard = 0;
        this.viewHistory = [];
        this._suppressHistoryPush = false;
        this.init();
    }

    init() {
        // Apply saved accessibility preferences before anything renders, so
        // there's no flash of default-sized/default-spaced content.
        this.applyAccessibilityPreferences();

        // Rehydrate per-lesson completed flag from the persisted user store.
        // saveProgress() only persists APP_DATA.user (not the static categories),
        // so on a fresh page load we have to re-apply completions to the
        // in-memory lesson objects that drive the UI.
        this.rehydrateLessonCompletions();

        // Show the app once everything is loaded and initialized.
        // Use requestAnimationFrame to ensure the browser has painted the
        // loading screen at least once before we swap to the app content,
        // then a short delay so the loading animation is briefly visible.
        const showApp = () => {
            const loadingScreen = document.getElementById('loading-screen');
            const appEl = document.getElementById('app');
            appEl.style.display = 'flex';
            this.render();
            this.updateGreeting();
            this.updateDailyInsight();

            // Fade out loading screen via CSS transition (set in styles.css)
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.style.display = 'none';
            }, { once: true });

            // Restore last view from localStorage
            this.restoreLastView();

            // Nudge if it's evening and today's activity hasn't happened yet;
            // re-check periodically in case the tab stays open past the hour
            // threshold. No-ops entirely if reminders aren't enabled.
            this.checkStreakReminder();
            setInterval(() => this.checkStreakReminder(), 60 * 1000);
        };
        requestAnimationFrame(() => setTimeout(showApp, 300));

        // Set up event listeners
        this.setupEventListeners();

        // Update streak
        this.updateStreak();
        
        // Initialize premium features
        if (typeof PremiumFeatures !== 'undefined') {
            window.premiumFeatures = new PremiumFeatures(this);
        }

        // Initialize gamification system
        if (typeof GamificationSystem !== 'undefined') {
            window.gamification = new GamificationSystem(this);
            this.updateHeaderXP();
        }

        // Initialize active recall system
        if (typeof ActiveRecallSystem !== 'undefined') {
            window.activeRecall = new ActiveRecallSystem(this);
        }

        // Initialize exam center
        if (typeof ExamCenter !== 'undefined') {
            window.examCenter = new ExamCenter(this);
            examCenter = window.examCenter;
        }

        // Initialize fitness tracker
        if (typeof FitnessTracker !== 'undefined') {
            window.fitnessTracker = new FitnessTracker(this);
        }

        // Initialize Deepstash-style ideas feed
        if (typeof DeepstashFeed !== 'undefined') {
            window.deepstash = new DeepstashFeed(this);
        }

        // Initialize crossword puzzles
        if (typeof CrosswordSystem !== 'undefined') {
            window.crossword = new CrosswordSystem(this);
        }
    }

    updateHeaderXP() {
        if (!window.gamification) return;

        const user = APP_DATA.user;
        const title = window.gamification.getLevelTitle();

        const levelIcon = document.getElementById('header-level-icon');
        const levelText = document.getElementById('header-level');

        if (levelIcon) levelIcon.textContent = title.icon;
        if (levelText) levelText.textContent = `Lv.${user.level}`;
    }

    // Greeting name: the signed-in Google account's first name, else the name
    // remembered on this device (see the migration at the top of data.js).
    getDisplayName() {
        const u = window.firebaseSync && window.firebaseSync.user;
        if (u && u.displayName) return u.displayName.split(' ')[0];
        try { return localStorage.getItem('ownerName') || ''; } catch (e) { return ''; }
    }

    updateGreeting() {
        const hour = new Date().getHours();
        let greeting;

        if (hour >= 5 && hour < 12) {
            greeting = 'Good morning';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const name = this.getDisplayName();
            heroTitle.textContent = name ? `${greeting}, ${name} 👋` : `${greeting} 👋`;
        }
    }

    updateDailyInsight() {
        // Collect all lessons with actual content that haven't been completed
        const availableLessons = [];

        APP_DATA.categories.forEach(category => {
            category.books.forEach(book => {
                if (book.lessonList) {
                    book.lessonList.forEach(lesson => {
                        // Only include lessons that have cards (actual content)
                        if (lesson.cards && lesson.cards.length > 0) {
                            availableLessons.push({
                                bookId: book.id,
                                bookTitle: book.title,
                                bookAuthor: book.author,
                                lessonId: lesson.id,
                                lessonTitle: lesson.title,
                                duration: lesson.duration,
                                completed: lesson.completed,
                                category: category.name,
                                categoryIcon: category.icon,
                                // Get excerpt from first card content
                                excerpt: this.getExcerptFromLesson(lesson)
                            });
                        }
                    });
                }
            });
        });

        // Prefer incomplete lessons, but fall back to any lesson if all complete
        let lessonsPool = availableLessons.filter(l => !l.completed);
        if (lessonsPool.length === 0) {
            lessonsPool = availableLessons;
        }

        if (lessonsPool.length === 0) {
            // Fallback if no lessons have content yet
            return;
        }

        // Try a data-driven recommendation first (continue in-progress work,
        // or reinforce a category you're struggling with); fall back to the
        // original seeded-random "something new" pick if neither applies —
        // e.g. a brand-new user with no history yet.
        let todayLesson = this.getRecommendedLesson();
        let insightReason = todayLesson ? todayLesson.reason : null;

        if (!todayLesson) {
            // Use day of year as seed for consistent daily random selection
            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 0);
            const diff = now - start;
            const oneDay = 1000 * 60 * 60 * 24;
            const dayOfYear = Math.floor(diff / oneDay);

            // Seeded random selection - same lesson all day, different each day
            const randomIndex = this.seededRandom(dayOfYear, lessonsPool.length);
            todayLesson = lessonsPool[randomIndex];
        }

        // Store for startDailyLesson to use
        this.todayInsightLesson = todayLesson;

        // Update the UI
        const insightTitle = document.querySelector('.insight-title');
        const insightExcerpt = document.querySelector('.insight-excerpt');
        const insightTime = document.querySelector('.insight-time');
        const insightBadge = document.querySelector('.insight-badge');
        const insightReasonEl = document.querySelector('.insight-reason');

        if (insightReasonEl) {
            insightReasonEl.textContent = insightReason || '';
            insightReasonEl.style.display = insightReason ? 'block' : 'none';
        }

        if (insightTitle) {
            insightTitle.textContent = todayLesson.lessonTitle;
        }
        if (insightExcerpt) {
            insightExcerpt.textContent = todayLesson.excerpt;
        }
        if (insightTime) {
            insightTime.textContent = `${todayLesson.duration || 11} min • ${todayLesson.bookTitle}`;
        }
        if (insightBadge) {
            insightBadge.textContent = `${todayLesson.categoryIcon} ${todayLesson.category}`;
        }
    }

    // ============================================
    // RECOMMENDATIONS ENGINE
    // Replaces pure day-of-year random selection with a simple, explainable
    // priority order built entirely from data already tracked: (1) resume
    // the book you were most recently working in, (2) if nothing's in
    // progress, reinforce whichever category your recent quiz scores are
    // weakest in, (3) otherwise fall back to the original "something new"
    // random pick. Returns null (defer to caller's fallback) when neither
    // condition applies — e.g. a brand-new user with no history at all.
    // ============================================
    getRecommendedLesson() {
        const continuing = this.getContinueInProgressPick();
        if (continuing) return continuing;

        const reinforcement = this.getWeakCategoryPick();
        if (reinforcement) return reinforcement;

        return null;
    }

    getContinueInProgressPick() {
        const inProgress = getBooksInProgress();
        if (inProgress.length === 0) return null;

        const completions = APP_DATA.user.lessonCompletions || {};
        let targetBook = null;
        let mostRecentTime = 0;
        for (const book of inProgress) {
            for (const lesson of (book.lessonList || [])) {
                const ts = completions[book.id + '::' + lesson.id];
                if (!ts) continue;
                const t = new Date(ts).getTime();
                if (t > mostRecentTime) { mostRecentTime = t; targetBook = book; }
            }
        }
        if (!targetBook) targetBook = inProgress[0];

        const nextLesson = (targetBook.lessonList || []).find(l => !l.completed && l.cards && l.cards.length > 0);
        if (!nextLesson) return null;

        return this.buildInsightFromLesson(targetBook, nextLesson, `📚 Continue where you left off in "${targetBook.title}"`);
    }

    getWeakCategoryPick() {
        const history = APP_DATA.user.learningStats?.quizHistory || [];
        if (history.length < 3) return null; // not enough data to draw a conclusion yet

        const byCategory = {};
        for (const q of history) {
            const book = getBookById(q.bookId);
            if (!book || !book.category) continue;
            if (!byCategory[book.category]) byCategory[book.category] = { sum: 0, count: 0 };
            byCategory[book.category].sum += q.percentage;
            byCategory[book.category].count++;
        }

        let weakest = null;
        for (const [categoryId, stats] of Object.entries(byCategory)) {
            if (stats.count < 2) continue; // need at least 2 quizzes to call it a trend
            const avg = stats.sum / stats.count;
            if (avg < 70 && (!weakest || avg < weakest.avg)) {
                weakest = { categoryId, avg };
            }
        }
        if (!weakest) return null;

        const category = APP_DATA.categories.find(c => c.id === weakest.categoryId);
        if (!category) return null;

        for (const book of (category.books || [])) {
            const lesson = (book.lessonList || []).find(l => !l.completed && l.cards && l.cards.length > 0);
            if (lesson) {
                return this.buildInsightFromLesson(book, lesson, `🎯 Strengthen ${category.name} — your recent quiz average there is ${Math.round(weakest.avg)}%`);
            }
        }
        return null;
    }

    buildInsightFromLesson(book, lesson, reason) {
        const category = APP_DATA.categories.find(c => c.id === book.category);
        return {
            bookId: book.id,
            bookTitle: book.title,
            bookAuthor: book.author,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            duration: lesson.duration,
            completed: lesson.completed,
            category: category ? category.name : (book.category || ''),
            categoryIcon: category ? category.icon : '📘',
            excerpt: this.getExcerptFromLesson(lesson),
            reason
        };
    }

    // Get a preview excerpt from the lesson's first card
    getExcerptFromLesson(lesson) {
        if (!lesson.cards || lesson.cards.length === 0) {
            return 'Discover new insights in this lesson...';
        }

        // Find first card with content
        for (const card of lesson.cards) {
            if (card.content) {
                // Clean up markdown and get first ~120 chars
                let excerpt = card.content
                    .replace(/\*\*/g, '') // Remove bold markers
                    .replace(/\n/g, ' ')  // Replace newlines with spaces
                    .replace(/•/g, '')    // Remove bullets
                    .replace(/\s+/g, ' ') // Collapse multiple spaces
                    .trim();

                if (excerpt.length > 120) {
                    excerpt = excerpt.substring(0, 117) + '...';
                }
                return excerpt;
            }
        }
        return 'Explore this lesson to expand your knowledge...';
    }

    // Seeded random number generator for consistent daily selection
    seededRandom(seed, max) {
        const x = Math.sin(seed * 9999) * 10000;
        return Math.floor((x - Math.floor(x)) * max);
    }

    setupEventListeners() {
        // Bottom navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
                this.updateActiveNav(e.currentTarget);
            });
        });

        // Header buttons
        document.getElementById('search-btn').addEventListener('click', () => {
            this.showSearch();
        });

        document.getElementById('profile-btn').addEventListener('click', () => {
            this.switchView('profile');
        });

        document.getElementById('daily-lesson-btn').addEventListener('click', () => {
            this.startDailyLesson();
        });

        // Back buttons — all return to wherever the user actually came from
        document.getElementById('category-back-btn').addEventListener('click', () => {
            this.goBack();
        });

        document.getElementById('book-back-btn').addEventListener('click', () => {
            this.goBack();
        });

        document.getElementById('lesson-back-btn').addEventListener('click', () => {
            this.goBack();
        });

        document.getElementById('profile-back-btn').addEventListener('click', () => {
            this.goBack();
        });

        document.getElementById('glossary-back-btn')?.addEventListener('click', () => {
            this.goBack();
        });

        const examBackBtn = document.getElementById('exam-back-btn');
        if (examBackBtn) {
            examBackBtn.addEventListener('click', () => {
                this.goBack();
            });
        }

        // Lesson navigation
        document.getElementById('prev-card-btn').addEventListener('click', () => {
            this.previousCard();
        });

        document.getElementById('next-card-btn').addEventListener('click', () => {
            this.nextCard();
        });
    }

    updateActiveNav(activeItem) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        activeItem.classList.add('active');
    }

    switchView(viewName) {
        // Record where we're navigating away from, so any "back" button can
        // return here regardless of which page that actually is — unless
        // this call is itself goBack() replaying a popped history entry.
        if (!this._suppressHistoryPush && this.currentView && this.currentView !== viewName) {
            const prevState = this.captureViewState();
            const top = this.viewHistory[this.viewHistory.length - 1];
            if (!top || JSON.stringify(top) !== JSON.stringify(prevState)) {
                this.viewHistory.push(prevState);
                if (this.viewHistory.length > 50) this.viewHistory.shift();
            }
        }

        // Always scroll to top when switching views
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewName;
            // Also scroll the view container to top
            targetView.scrollTop = 0;
            // Save current view to localStorage
            this.saveCurrentView();
        }

        // Update Recipe Assistant visibility (only shows in nutrition hub)
        if (typeof updateRecipeAssistantVisibility === 'function') {
            updateRecipeAssistantVisibility(viewName);
        }

        // Update AI Tutor visibility (only shows while reading a lesson)
        this.updateAiTutorVisibility(viewName);

        // Render specific view content
        if (viewName === 'profile') {
            this.renderProfile();
        } else if (viewName === 'home') {
            this.renderHome();
        } else if (viewName === 'vision-board') {
            window.premiumFeatures?.renderVisionBoard();
        } else if (viewName === 'manifestation') {
            window.premiumFeatures?.renderManifestation();
        } else if (viewName === 'shadow-work') {
            window.premiumFeatures?.renderShadowWork();
        } else if (viewName === 'workout') {
            window.fitnessTracker?.renderWorkoutHub();
        } else if (viewName === 'flashcards') {
            window.activeRecall?.renderFlashcards();
        } else if (viewName === 'quick-quiz') {
            window.activeRecall?.renderQuickQuiz();
        } else if (viewName === 'exam') {
            window.examCenter?.renderExamHome();
        } else if (viewName === 'feynman') {
            window.activeRecall?.renderFeynman();
        } else if (viewName === 'body-metrics') {
            window.fitnessTracker?.renderBodyMetrics();
        } else if (viewName === 'trt') {
            window.fitnessTracker?.renderTRT();
        } else if (viewName === 'supplements') {
            window.fitnessTracker?.renderSupplements();
        } else if (viewName === 'nutrition') {
            window.fitnessTracker?.renderNutrition();
        } else if (viewName === 'nutrition-research') {
            window.fitnessTracker?.renderNutritionResearch();
        } else if (viewName === 'glossary') {
            this.renderGlossary();
        } else if (viewName === 'deepstash') {
            window.deepstash?.render();
        } else if (viewName === 'crossword') {
            window.crossword?.render();
        }
    }

    // Snapshot of "where we are right now" — used both to persist across
    // reloads and as one frame in the in-memory back-button history stack.
    captureViewState() {
        return {
            view: this.currentView,
            categoryId: this.currentCategory?.id || null,
            bookId: this.currentBook?.id || null,
            lessonId: this.currentLesson?.id || null,
            cardIndex: this.currentCard
        };
    }

    // Save current view state to localStorage for persistence on refresh
    saveCurrentView() {
        localStorage.setItem('synthesis_last_view', JSON.stringify(this.captureViewState()));
    }

    // Restore last view from localStorage
    restoreLastView() {
        try {
            const savedState = localStorage.getItem('synthesis_last_view');
            if (!savedState) return;

            const state = JSON.parse(savedState);

            // Don't restore if we're already on home
            if (!state.view || state.view === 'home') return;

            this.restoreState(state);
        } catch (e) {
            console.log('Could not restore last view:', e);
        }
    }

    // Applies a captured view-state snapshot (from history or localStorage),
    // re-deriving whatever context object (category/book/lesson) that view
    // needs before switching to it.
    restoreState(state) {
        if (!state || !state.view || state.view === 'home') {
            this.switchView('home');
            return;
        }

        if (state.view === 'category' && state.categoryId) {
            const category = APP_DATA.categories.find(c => c.id === state.categoryId);
            if (category) {
                this.showCategory(state.categoryId);
            } else {
                this.switchView('home');
            }
        } else if (state.view === 'book' && state.bookId) {
            const book = this.findBookById(state.bookId);
            if (book) {
                this.showBook(state.bookId);
            } else {
                this.switchView('home');
            }
        } else if (state.view === 'lesson' && state.bookId && state.lessonId) {
            const book = this.findBookById(state.bookId);
            const lesson = book?.lessonList?.find(l => String(l.id) === String(state.lessonId));
            if (book && lesson) {
                this.currentBook = book;
                this.currentLesson = lesson;
                this.currentCard = state.cardIndex || 0;
                this.switchView('lesson');
                this.renderLesson();
            } else {
                this.switchView('home');
            }
        } else if (state.view === 'crossword-puzzle') {
            // The crossword player holds runtime-only state, so a reload lands
            // back on the puzzle menu rather than an empty grid.
            this.switchView('crossword');
        } else {
            // Other views (profile, glossary, flashcards, feynman, premium
            // features, fitness sub-pages, etc.) carry no extra context.
            this.switchView(state.view);
        }
    }

    // Universal "back" — returns to whatever page was actually visited
    // before the current one, not a hardcoded parent. Every back button in
    // the app should call this instead of switchView() directly.
    goBack() {
        const state = this.viewHistory.pop();
        if (state) {
            this._suppressHistoryPush = true;
            this.restoreState(state);
            this._suppressHistoryPush = false;
            return;
        }

        // No recorded history — e.g. the app was reloaded straight into this
        // view. Fall back to this view's logical parent.
        if (this.currentView === 'lesson' && this.currentBook) {
            if (this.isMBCBook(this.currentBook.id)) this.goToMBCHub();
            else this.showBook(this.currentBook.id);
        } else if (this.currentView === 'book' && this.currentCategory) {
            this.showCategory(this.currentCategory.id);
        } else if (this.currentView === 'exam' && this.currentBook && this.isMBCBook(this.currentBook.id)) {
            this.goToMBCHub();
        } else if (['body-metrics', 'trt', 'supplements', 'nutrition', 'nutrition-research'].includes(this.currentView)) {
            this.switchView('workout');
        } else {
            this.switchView('home');
        }
    }

    // Helper to find a book by ID across all categories
    findBookById(bookId) {
        for (const category of APP_DATA.categories) {
            const book = category.books?.find(b => b.id === bookId);
            if (book) return book;
        }
        return null;
    }

    updateStreak() {
        const el = document.getElementById('streak-count');
        if (el) el.textContent = APP_DATA.user.currentStreak || 0;
    }

    render() {
        this.renderHome();
    }

    renderHome() {
        this.renderDailyDashboard();
        this.renderContinueLearning();
        this.renderCategories();
        this.renderFeaturedBooks();
        this.renderWhatsNewBooks();
        this.renderFeaturedPicks();

        // Render daily challenges
        if (window.gamification) {
            window.gamification.renderDailyChallenges();
        }

        // Render favorites shelf
        if (window.activeRecall) {
            window.activeRecall.renderFavorites();
            window.activeRecall.updateDueBadge();
        }

        this.renderSavedLessons();
        this.updateExamDueBadge();

        // Deepstash-style "Ideas for You" strip
        window.deepstash?.renderHomeStrip();
        window.crossword?.renderCrosswordHomeStrip();
    }

    updateExamDueBadge() {
        const badge = document.getElementById('exam-due-badge');
        if (!badge) return;
        const dueCount = (window.examCenter && typeof window.examCenter.dailyQueueSize === 'function')
            ? window.examCenter.dailyQueueSize() : 0;
        badge.textContent = `${dueCount} due`;
        badge.style.display = dueCount > 0 ? 'block' : 'none';
    }

    // ---------------- Daily Dashboard ----------------
    // Everything that's actually "due today" — streak, flashcards, exam
    // prep, and the next lesson to resume — in one glanceable row, instead
    // of scattered across separate cards/badges the user has to hunt for.
    renderDailyDashboard() {
        const container = document.getElementById('daily-dashboard');
        if (!container) return;

        const streak = APP_DATA.user?.currentStreak || 0;
        const streakActive = typeof this.streakIsActive === 'function' ? this.streakIsActive() : true;
        const streakOn = streakActive && streak > 0;

        const dueFlashcards = window.activeRecall && typeof window.activeRecall.getDueFlashcards === 'function'
            ? window.activeRecall.getDueFlashcards().length : 0;
        const dueExam = window.examCenter && typeof window.examCenter.dailyQueueSize === 'function'
            ? window.examCenter.dailyQueueSize() : 0;

        const inProgress = getBooksInProgress();
        const nextBook = inProgress[0] || null;
        const nextLesson = nextBook ? ((nextBook.lessonList || []).find(l => !l.completed) || (nextBook.lessonList || [])[0]) : null;

        const tiles = [];

        tiles.push(`
            <div class="dashboard-tile ${streakOn ? 'tile-hot' : ''}">
                <span class="dashboard-tile-icon">${streakOn ? '🔥' : '⏳'}</span>
                <div class="dashboard-tile-body">
                    <div class="dashboard-tile-value">${streak}</div>
                    <div class="dashboard-tile-label">Day Streak</div>
                </div>
            </div>
        `);

        tiles.push(`
            <div class="dashboard-tile ${dueFlashcards > 0 ? 'tile-actionable' : ''}" ${dueFlashcards > 0 ? `onclick="app.switchView('flashcards')"` : ''}>
                <span class="dashboard-tile-icon">🗂️</span>
                <div class="dashboard-tile-body">
                    <div class="dashboard-tile-value">${dueFlashcards}</div>
                    <div class="dashboard-tile-label">Flashcards Due</div>
                </div>
                <span class="dashboard-tile-cta ${dueFlashcards > 0 ? '' : 'done'}">${dueFlashcards > 0 ? 'Review →' : '✓ Caught up'}</span>
            </div>
        `);

        tiles.push(`
            <div class="dashboard-tile ${dueExam > 0 ? 'tile-actionable' : ''}" ${dueExam > 0 ? `onclick="app.switchView('exam')"` : ''}>
                <span class="dashboard-tile-icon">📝</span>
                <div class="dashboard-tile-body">
                    <div class="dashboard-tile-value">${dueExam}</div>
                    <div class="dashboard-tile-label">Exam Prep Due</div>
                </div>
                <span class="dashboard-tile-cta ${dueExam > 0 ? '' : 'done'}">${dueExam > 0 ? 'Practice →' : '✓ Caught up'}</span>
            </div>
        `);

        if (nextBook && nextLesson) {
            tiles.push(`
                <div class="dashboard-tile tile-actionable tile-wide" onclick="app.startLesson('${nextBook.id}', '${nextLesson.id}')">
                    <span class="dashboard-tile-icon">📖</span>
                    <div class="dashboard-tile-body">
                        <div class="dashboard-tile-value dashboard-tile-value-text">${escapeHtml(nextLesson.title)}</div>
                        <div class="dashboard-tile-label">Continue: ${escapeHtml(nextBook.title)}</div>
                    </div>
                    <span class="dashboard-tile-cta">Resume →</span>
                </div>
            `);
        } else {
            tiles.push(`
                <div class="dashboard-tile tile-actionable tile-wide" onclick="app.showAllBooks()">
                    <span class="dashboard-tile-icon">📖</span>
                    <div class="dashboard-tile-body">
                        <div class="dashboard-tile-value dashboard-tile-value-text">No lesson in progress</div>
                        <div class="dashboard-tile-label">Browse the library to start one</div>
                    </div>
                    <span class="dashboard-tile-cta">Browse →</span>
                </div>
            `);
        }

        container.innerHTML = tiles.join('');
    }

    // ---------------- Streak + activity heatmap ----------------
    todayKey() {
        const d = new Date();
        return d.toISOString().slice(0, 10);
    }

    recordDailyActivity() {
        if (!APP_DATA.user) APP_DATA.user = {};
        if (!APP_DATA.user.activityDays) APP_DATA.user.activityDays = {};
        if (APP_DATA.user.currentStreak == null) APP_DATA.user.currentStreak = 0;
        if (APP_DATA.user.longestStreak == null) APP_DATA.user.longestStreak = 0;

        const today = this.todayKey();
        APP_DATA.user.activityDays[today] = (APP_DATA.user.activityDays[today] || 0) + 1;

        if (APP_DATA.user.lastActivityDate !== today) {
            const last = APP_DATA.user.lastActivityDate;
            if (last) {
                const diffDays = Math.round((new Date(today) - new Date(last)) / 86400000);
                if (diffDays === 1) APP_DATA.user.currentStreak += 1;
                else if (diffDays > 1) APP_DATA.user.currentStreak = 1;
            } else {
                APP_DATA.user.currentStreak = 1;
            }
            APP_DATA.user.longestStreak = Math.max(
                APP_DATA.user.longestStreak || 0,
                APP_DATA.user.currentStreak
            );
            APP_DATA.user.lastActivityDate = today;
        }
        if (typeof saveProgress === 'function') saveProgress();
    }

    streakIsActive() {
        const last = APP_DATA.user?.lastActivityDate;
        if (!last) return false;
        const diff = Math.round((new Date(this.todayKey()) - new Date(last)) / 86400000);
        return diff <= 1; // active if last activity was today or yesterday
    }

    // ============================================
    // STREAK REMINDERS
    // ============================================
    // This is a static app with no backend/push server, so this can only
    // fire a Notification while Synthesis is open in a browser tab
    // (foreground or backgrounded) via the service worker — it cannot
    // reach the user after the tab is fully closed. Still useful: leave a
    // tab open and it nudges you in the evening if you haven't studied yet.
    streakRemindersSupported() {
        return typeof Notification !== 'undefined';
    }

    streakRemindersEnabled() {
        return localStorage.getItem('synthesis_streak_reminders_enabled') === '1'
            && this.streakRemindersSupported()
            && Notification.permission === 'granted';
    }

    async enableStreakReminders() {
        if (!this.streakRemindersSupported()) {
            toast("Notifications aren't supported in this browser.", 'error');
            return;
        }
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            toast('Notification permission denied — enable it in your browser settings to use this.', 'info');
            this.renderStreakReminderControls();
            return;
        }
        localStorage.setItem('synthesis_streak_reminders_enabled', '1');
        toast('🔔 Streak reminders enabled!', 'success');
        this.renderStreakReminderControls();
        this.checkStreakReminder();
    }

    disableStreakReminders() {
        localStorage.setItem('synthesis_streak_reminders_enabled', '0');
        toast('Streak reminders turned off.', 'info');
        this.renderStreakReminderControls();
    }

    renderStreakReminderControls() {
        const container = document.getElementById('streak-reminder-controls');
        if (!container) return;

        if (!this.streakRemindersSupported()) {
            container.innerHTML = `<p class="backup-section-desc" style="margin:0;">Notifications aren't supported in this browser.</p>`;
            return;
        }

        const on = this.streakRemindersEnabled();
        const msg = (localStorage.getItem('synthesis_reminder_message') || '').replace(/"/g, '&quot;');
        container.innerHTML = on
            ? `<label class="reminder-field">Remind me at <input type="time" id="reminder-time" value="${this.reminderTime()}" onchange="app.setReminderTime(this.value)"></label>
               <label class="reminder-field">Message <input type="text" id="reminder-message" maxlength="120" placeholder="Time to study! 📚" value="${msg}" onchange="app.setReminderMessage(this.value)"></label>
               <button class="backup-btn backup-btn-primary" onclick="app.sendTestReminder()">🔔 Send a test now</button>
               <button class="backup-btn backup-btn-secondary" onclick="app.disableStreakReminders()">🔕 Turn Off Reminders</button>`
            : `<button class="backup-btn backup-btn-primary" onclick="app.enableStreakReminders()">🔔 Enable Daily Reminder</button>`;
    }

    reminderTime() {
        const t = localStorage.getItem('synthesis_reminder_time');
        return /^\d{2}:\d{2}$/.test(t || '') ? t : '19:00';
    }

    setReminderTime(value) {
        if (!/^\d{2}:\d{2}$/.test(value || '')) return;
        localStorage.setItem('synthesis_reminder_time', value);
        // A new time means today's nudge may not have fired yet.
        localStorage.removeItem('synthesis_streak_reminder_shown_' + this.todayKey());
        toast('Reminder set for ' + this.formatReminderTime(value), 'success');
    }

    setReminderMessage(value) {
        localStorage.setItem('synthesis_reminder_message', (value || '').trim());
        toast('Reminder message saved.', 'success');
    }

    formatReminderTime(t) {
        const [h, m] = t.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        return ((h % 12) || 12) + ':' + String(m).padStart(2, '0') + ' ' + ampm;
    }

    sendTestReminder() {
        const custom = (localStorage.getItem('synthesis_reminder_message') || '').trim();
        this.showStreakReminderNotification('📚 Synthesis reminder (test)', custom || 'This is what your daily reminder will look like.');
    }

    // Called at boot and on a periodic timer while the tab stays open.
    checkStreakReminder() {
        if (!this.streakRemindersEnabled()) return;

        const today = this.todayKey();
        if (APP_DATA.user?.lastActivityDate === today) return; // already studied today
        if (localStorage.getItem('synthesis_streak_reminder_shown_' + today) === '1') return; // already nudged today
        // Nudge at (or after) the time the user picked; default 7:00 PM.
        const [rh, rm] = this.reminderTime().split(':').map(Number);
        const now = new Date();
        if (now.getHours() * 60 + now.getMinutes() < rh * 60 + rm) return;

        const streak = APP_DATA.user?.currentStreak || 0;
        const title = streak > 0 ? `🔥 Don't lose your ${streak}-day streak!` : '📚 Keep the habit going';
        const custom = (localStorage.getItem('synthesis_reminder_message') || '').trim();
        const body = custom || (streak > 0
            ? "You haven't studied today yet — a few minutes keeps your streak alive."
            : "You haven't studied today yet — even one lesson counts.");

        this.showStreakReminderNotification(title, body);
        localStorage.setItem('synthesis_streak_reminder_shown_' + today, '1');
    }

    async showStreakReminderNotification(title, body) {
        try {
            if ('serviceWorker' in navigator) {
                const reg = await navigator.serviceWorker.getRegistration();
                if (reg) {
                    await reg.showNotification(title, { body, icon: 'icon.svg', tag: 'streak-reminder' });
                    return;
                }
            }
            new Notification(title, { body, icon: 'icon.svg' });
        } catch (err) {
            console.error('Failed to show streak reminder notification:', err);
        }
    }

    manageFavorites() {
        toast('You can add books to your favorites from any book detail page! Look for the star icon.', 'info');
    }

    // Re-apply persisted per-lesson completions to the in-memory lesson
    // objects on app boot. Without this, the progress bar resets to 0 every
    // page load even though the user store knows the lessons are done.
    rehydrateLessonCompletions() {
        const map = APP_DATA.user && APP_DATA.user.lessonCompletions;
        if (!map || typeof map !== 'object') return;
        for (const cat of APP_DATA.categories || []) {
            for (const book of (cat.books || [])) {
                let completedLessons = 0;
                for (const lesson of (book.lessonList || [])) {
                    if (map[book.id + '::' + lesson.id]) {
                        lesson.completed = true;
                        completedLessons++;
                    }
                }
                if (book.lessonList && book.lessonList.length) {
                    book.progress = Math.round((completedLessons / book.lessonList.length) * 100);
                }
            }
        }
    }

    // ---------------- Goals & Deadline pacing ----------------
    // A goal is a per-category target end-date. Pace = lessonsRemaining /
    // daysRemaining. Drives the "X lessons/day to finish by Y" tracker on
    // each course hub.
    ensureGoalsStore() {
        if (!APP_DATA.user) APP_DATA.user = {};
        if (!Array.isArray(APP_DATA.user.goals)) APP_DATA.user.goals = [];
    }

    getGoalForCategory(categoryId) {
        this.ensureGoalsStore();
        return APP_DATA.user.goals.find(g => g.categoryId === categoryId) || null;
    }

    setGoal(categoryId, targetDate, label) {
        this.ensureGoalsStore();
        const existing = APP_DATA.user.goals.findIndex(g => g.categoryId === categoryId);
        const goal = {
            id: 'goal-' + categoryId + '-' + Date.now(),
            categoryId,
            targetDate, // YYYY-MM-DD
            createdDate: this.todayKey(),
            label: label || null,
        };
        if (existing >= 0) APP_DATA.user.goals[existing] = goal;
        else APP_DATA.user.goals.push(goal);
        if (typeof saveProgress === 'function') saveProgress();
        return goal;
    }

    removeGoal(categoryId) {
        this.ensureGoalsStore();
        APP_DATA.user.goals = APP_DATA.user.goals.filter(g => g.categoryId !== categoryId);
        if (typeof saveProgress === 'function') saveProgress();
    }

    // Compute pace for a goal against current course stats.
    // Returns { daysRemaining, lessonsRemaining, perDayNeeded, perDayCurrent,
    //          paceStatus: 'ahead'|'on-track'|'behind'|'overdue'|'done', pctElapsed }
    computeGoalPace(goal, stats) {
        const today = new Date(this.todayKey() + 'T00:00:00');
        const target = new Date(goal.targetDate + 'T00:00:00');
        const started = new Date(goal.createdDate + 'T00:00:00');
        const totalDays = Math.max(1, Math.round((target - started) / 86400000));
        const daysElapsed = Math.max(0, Math.round((today - started) / 86400000));
        const daysRemaining = Math.round((target - today) / 86400000);
        const lessonsRemaining = Math.max(0, (stats.lessonsTotal || 0) - (stats.lessonsPassed || 0));
        const perDayNeeded = daysRemaining > 0 ? lessonsRemaining / daysRemaining : lessonsRemaining;
        const perDayCurrent = daysElapsed > 0 ? (stats.lessonsPassed / daysElapsed) : 0;

        let paceStatus;
        if (lessonsRemaining === 0) paceStatus = 'done';
        else if (daysRemaining < 0) paceStatus = 'overdue';
        else {
            // Expected lessons by now = (daysElapsed / totalDays) * lessonsTotal
            const expectedByNow = (daysElapsed / totalDays) * (stats.lessonsTotal || 0);
            const gap = (stats.lessonsPassed || 0) - expectedByNow;
            if (gap >= 1) paceStatus = 'ahead';
            else if (gap <= -1) paceStatus = 'behind';
            else paceStatus = 'on-track';
        }
        return {
            daysRemaining, lessonsRemaining,
            perDayNeeded, perDayCurrent,
            paceStatus,
            pctElapsed: Math.round((daysElapsed / totalDays) * 100),
        };
    }

    promptSetGoal(categoryId) {
        const cat = APP_DATA.categories.find(c => c.id === categoryId);
        if (!cat) return;
        // Default suggestion: 90 days out (or however many days × 1 lesson/day for the remaining lessons).
        const stats = this.getCourseStats(cat);
        const remaining = Math.max(1, (stats.lessonsTotal || 0) - (stats.lessonsPassed || 0));
        const suggestedDays = Math.max(30, Math.min(365, remaining));
        const suggested = new Date();
        suggested.setDate(suggested.getDate() + suggestedDays);
        const suggestedStr = suggested.toISOString().slice(0, 10);

        const input = prompt(
            `Set a finish-by date for ${cat.name}\n\n` +
            `${remaining} lessons remaining. Format: YYYY-MM-DD (e.g. ${suggestedStr})`,
            suggestedStr
        );
        if (!input) return;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(input.trim())) {
            toast('Please enter the date as YYYY-MM-DD.', 'error');
            return;
        }
        const d = new Date(input.trim() + 'T00:00:00');
        if (isNaN(d.getTime())) { toast('Invalid date.', 'error'); return; }
        if (d <= new Date()) { toast('Target date must be in the future.', 'info'); return; }
        this.setGoal(categoryId, input.trim(), null);
        this.renderCourseHub(this.currentCategory);
    }

    confirmRemoveGoal(categoryId) {
        if (!confirm('Remove your finish-by goal for this course?')) return;
        this.removeGoal(categoryId);
        this.renderCourseHub(this.currentCategory);
    }

    toggleFavorite(bookId) {
        if (window.activeRecall) {
            window.activeRecall.toggleFavorite(bookId);
            this.showBook(bookId); // Refresh the view
        }
    }

    toggleFavoriteCategory(categoryId) {
        if (window.activeRecall) {
            window.activeRecall.toggleFavoriteCategory(categoryId);
            this.updateCategoryFavoriteButton(categoryId);
        }
    }

    updateCategoryFavoriteButton(categoryId) {
        const btn = document.getElementById('category-favorite-btn');
        if (!btn) return;
        const pinned = window.activeRecall && window.activeRecall.isFavoriteCategory(categoryId);
        btn.classList.toggle('favorited', !!pinned);
        btn.textContent = pinned ? '⭐ Pinned to Favorites' : '☆ Pin Track to Favorites';
        btn.setAttribute('onclick', `app.toggleFavoriteCategory('${categoryId}')`);
    }

    // ============================================
    // SAVED LESSONS ("bookmark this specific lesson to come back to")
    // Distinct from book-level Favorites (capped at 5, links to the book's
    // lesson list): this saves an exact lesson and jumps straight into it,
    // with no cap, since it's meant as a genuine "get back to this" list.
    // ============================================
    isLessonBookmarked(bookId, lessonId) {
        return (APP_DATA.user.savedLessons || []).some(s => s.bookId === bookId && s.lessonId === lessonId);
    }

    toggleLessonBookmark() {
        if (!this.currentBook || !this.currentLesson) return;
        if (!APP_DATA.user.savedLessons) APP_DATA.user.savedLessons = [];

        const bookId = this.currentBook.id;
        const lessonId = this.currentLesson.id;
        const existingIndex = APP_DATA.user.savedLessons.findIndex(s => s.bookId === bookId && s.lessonId === lessonId);

        if (existingIndex > -1) {
            APP_DATA.user.savedLessons.splice(existingIndex, 1);
            toast('Removed from Saved for Later.', 'info');
        } else {
            APP_DATA.user.savedLessons.unshift({
                bookId,
                lessonId,
                bookTitle: this.currentBook.title,
                lessonTitle: this.currentLesson.title,
                category: this.currentBook.category,
                savedAt: new Date().toISOString()
            });
            toast('🔖 Saved for later!', 'success');
        }

        saveProgress();
        this.updateLessonBookmarkButton();
    }

    updateLessonBookmarkButton() {
        const btn = document.getElementById('lesson-bookmark-btn');
        if (!btn || !this.currentBook || !this.currentLesson) return;
        const bookmarked = this.isLessonBookmarked(this.currentBook.id, this.currentLesson.id);
        btn.classList.toggle('bookmarked', bookmarked);
        btn.title = bookmarked ? 'Remove from Saved for Later' : 'Save this lesson for later';
    }

    removeSavedLesson(bookId, lessonId) {
        APP_DATA.user.savedLessons = (APP_DATA.user.savedLessons || []).filter(
            s => !(s.bookId === bookId && s.lessonId === lessonId)
        );
        saveProgress();
        this.renderSavedLessons();
        if (this.currentBook?.id === bookId && this.currentLesson?.id === lessonId) {
            this.updateLessonBookmarkButton();
        }
    }

    renderSavedLessons() {
        const section = document.getElementById('saved-lessons-section');
        const container = document.getElementById('saved-lessons-shelf');
        if (!section || !container) return;

        const saved = APP_DATA.user.savedLessons || [];
        if (saved.length === 0) {
            section.style.display = 'none';
            return;
        }
        section.style.display = '';

        container.innerHTML = saved.map(s => `
            <div class="favorite-book-card" onclick="app.startLesson('${s.bookId}', '${s.lessonId}')">
                <div class="fav-book-cover" style="background: linear-gradient(135deg, ${this.getCategoryColor(s.category)} 0%, ${this.getCategoryColorDark(s.category)} 100%); position: relative;">
                    🔖
                    <button onclick="event.stopPropagation(); app.removeSavedLesson('${s.bookId}', '${s.lessonId}')" title="Remove" aria-label="Remove from saved" style="position:absolute; top:-6px; right:-6px; width:20px; height:20px; border-radius:50%; background:#1a1a2e; border:1px solid rgba(255,255,255,0.2); color:#fff; font-size:0.7rem; cursor:pointer; display:flex; align-items:center; justify-content:center; padding:0;">✕</button>
                </div>
                <div class="fav-book-title">${escapeHtml(s.lessonTitle)}</div>
                <div class="fav-book-progress">${escapeHtml(s.bookTitle)}</div>
            </div>
        `).join('');
    }

    // ============================================
    // LESSON NOTES ("jot a note on this lesson to review later")
    // Scoped deliberately to whole-lesson free-text notes rather than
    // in-passage highlighting — highlighting would require tracking DOM
    // text-selection ranges across re-renders, which is fragile against
    // this app's markdown-ish card content. A note gets you most of the
    // value ("review this before the exam") far more robustly.
    // ============================================
    lessonNoteKey(bookId, lessonId) {
        return `${bookId}::${lessonId}`;
    }

    getLessonNote(bookId, lessonId) {
        return (APP_DATA.user.lessonNotes || {})[this.lessonNoteKey(bookId, lessonId)] || null;
    }

    updateLessonNotesButton() {
        const btn = document.getElementById('lesson-notes-btn');
        if (!btn || !this.currentBook || !this.currentLesson) return;
        const hasNote = !!this.getLessonNote(this.currentBook.id, this.currentLesson.id);
        btn.classList.toggle('bookmarked', hasNote);
        btn.title = hasNote ? 'Edit your note for this lesson' : 'Add a note to this lesson';
    }

    openLessonNotes() {
        if (!this.currentBook || !this.currentLesson) return;
        const existing = this.getLessonNote(this.currentBook.id, this.currentLesson.id);

        const modal = document.createElement('div');
        modal.className = 'premium-modal-overlay';
        modal.innerHTML = `
            <div class="premium-modal">
                <h3>📝 ${escapeHtml(this.currentLesson.title)}</h3>
                <div class="premium-form">
                    <div class="form-group">
                        <label>Your Note</label>
                        <textarea id="lesson-note-input" class="fitness-input" rows="6" placeholder="Anything worth remembering — a key term, something to review before the exam...">${escapeHtml(existing ? existing.text : '')}</textarea>
                    </div>
                    <div class="modal-buttons">
                        ${existing ? '<button class="btn-secondary" id="lesson-note-delete-btn" style="border-color:#ef4444;color:#ef4444;">Delete</button>' : ''}
                        <button class="btn-secondary" id="lesson-note-cancel-btn">Cancel</button>
                        <button class="btn-primary" id="lesson-note-save-btn">Save</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('#lesson-note-input').focus();

        modal.querySelector('#lesson-note-cancel-btn').onclick = () => modal.remove();

        const deleteBtn = modal.querySelector('#lesson-note-delete-btn');
        if (deleteBtn) {
            deleteBtn.onclick = () => {
                this.deleteLessonNote(this.currentBook.id, this.currentLesson.id);
                modal.remove();
            };
        }

        modal.querySelector('#lesson-note-save-btn').onclick = () => {
            const text = modal.querySelector('#lesson-note-input').value.trim();
            if (!text) {
                this.deleteLessonNote(this.currentBook.id, this.currentLesson.id);
                modal.remove();
                return;
            }
            if (!APP_DATA.user.lessonNotes) APP_DATA.user.lessonNotes = {};
            APP_DATA.user.lessonNotes[this.lessonNoteKey(this.currentBook.id, this.currentLesson.id)] = {
                bookId: this.currentBook.id,
                lessonId: this.currentLesson.id,
                bookTitle: this.currentBook.title,
                lessonTitle: this.currentLesson.title,
                text,
                updatedAt: new Date().toISOString()
            };
            saveProgress();
            toast('📝 Note saved!', 'success');
            this.updateLessonNotesButton();
            modal.remove();
        };
    }

    deleteLessonNote(bookId, lessonId) {
        if (!APP_DATA.user.lessonNotes) return;
        delete APP_DATA.user.lessonNotes[this.lessonNoteKey(bookId, lessonId)];
        saveProgress();
        this.updateLessonNotesButton();
        this.renderMyNotes();
        toast('Note deleted.', 'info');
    }

    renderMyNotes() {
        const section = document.getElementById('my-notes-section');
        const container = document.getElementById('my-notes-list');
        if (!section || !container) return;

        const notes = Object.values(APP_DATA.user.lessonNotes || {})
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        if (notes.length === 0) {
            section.style.display = 'none';
            return;
        }
        section.style.display = '';

        container.innerHTML = notes.map(n => `
            <div class="notes-list-item" onclick="app.startLesson('${n.bookId}', '${n.lessonId}')">
                <div style="flex:1; min-width:0;">
                    <div class="notes-list-item-title">${escapeHtml(n.lessonTitle)}</div>
                    <div class="notes-list-item-book">${escapeHtml(n.bookTitle)}</div>
                    <div class="notes-list-item-text">${escapeHtml(n.text)}</div>
                </div>
                <button class="notes-list-item-remove" onclick="event.stopPropagation(); app.deleteLessonNote('${n.bookId}', '${n.lessonId}')" title="Delete note" aria-label="Delete note">✕</button>
            </div>
        `).join('');
    }

    // ============================================
    // MISTAKES LOG
    // Unified log of wrong quiz/exam answers, aggregated in one place with
    // the question, your answer, and the correct one — distinct from
    // flashcards (which review everything evenly) and Exam Center's own
    // spaced-repetition scheduler (which already resurfaces exam questions
    // on its own schedule): this specifically targets known weak points,
    // including from regular lesson quizzes, which had no retest mechanism
    // of any kind before this.
    // ============================================
    logMistake(entry) {
        if (!APP_DATA.user.mistakesLog) APP_DATA.user.mistakesLog = [];
        const key = 'mistake::' + (entry.qid || `${entry.bookId}::${entry.lessonId}::${entry.question}`);
        const existingIndex = APP_DATA.user.mistakesLog.findIndex(m => m.key === key);
        const missCount = existingIndex > -1 ? (APP_DATA.user.mistakesLog[existingIndex].missCount || 1) + 1 : 1;
        const record = { ...entry, key, missCount, updatedAt: new Date().toISOString() };

        if (existingIndex > -1) {
            APP_DATA.user.mistakesLog[existingIndex] = record;
        } else {
            APP_DATA.user.mistakesLog.unshift(record);
        }
        saveProgress();
        this.renderMistakesLog();
    }

    dismissMistake(key, silent) {
        APP_DATA.user.mistakesLog = (APP_DATA.user.mistakesLog || []).filter(m => m.key !== key);
        saveProgress();
        this.renderMistakesLog();
        if (!silent) toast('Nice — marked as reviewed.', 'success');
    }

    renderMistakesLog() {
        const section = document.getElementById('mistakes-log-section');
        const container = document.getElementById('mistakes-log-list');
        if (!section || !container) return;

        const mistakes = APP_DATA.user.mistakesLog || [];
        const quizBtn = document.getElementById('mistakes-quiz-me-btn');

        if (mistakes.length === 0) {
            section.style.display = 'none';
            return;
        }
        section.style.display = '';
        if (quizBtn) quizBtn.textContent = `🔁 Quiz Me on These (${mistakes.length})`;

        container.innerHTML = mistakes.map(m => `
            <div class="notes-list-item" onclick="${m.source === 'lesson' ? `app.startLesson('${m.bookId}', '${m.lessonId}')` : `app.switchView('exam')`}">
                <div style="flex:1; min-width:0;">
                    <div class="notes-list-item-title">${escapeHtml(m.question)}</div>
                    <div class="notes-list-item-book">${escapeHtml(m.bookTitle)}${m.lessonTitle ? ' · ' + escapeHtml(m.lessonTitle) : ''}${m.missCount > 1 ? ` · missed ${m.missCount}×` : ''}</div>
                    <div style="font-size: 0.85rem; margin-top: 0.5rem;">
                        <div style="color:#ef4444;">✗ You said: ${escapeHtml(m.chosenText)}</div>
                        <div style="color:#10b981; margin-top: 0.15rem;">✓ Correct: ${escapeHtml(m.correctText)}</div>
                    </div>
                </div>
                <button class="notes-list-item-remove" data-key="${escapeHtml(m.key)}" onclick="event.stopPropagation(); app.dismissMistake(this.dataset.key)" title="I've got this now" aria-label="Mark reviewed" style="color:#10b981;">✓</button>
            </div>
        `).join('');
    }

    startMistakesRetest() {
        const queue = (APP_DATA.user.mistakesLog || []).filter(m => m.options && m.options.length > 0);
        if (queue.length === 0) {
            toast('No mistakes to review right now!', 'info');
            return;
        }
        this._retestQueue = queue;
        this._retestIndex = 0;
        this._retestCorrectCount = 0;
        this.showRetestQuestion();
    }

    showRetestQuestion() {
        if (!this._retestQueue || this._retestIndex >= this._retestQueue.length) {
            this.finishRetest();
            return;
        }
        const item = this._retestQueue[this._retestIndex];

        let modal = document.getElementById('retest-modal-overlay');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'retest-modal-overlay';
            modal.className = 'premium-modal-overlay';
            document.body.appendChild(modal);
        }
        modal.innerHTML = `
            <div class="premium-modal">
                <h3>🔁 Quiz Me: ${this._retestIndex + 1} of ${this._retestQueue.length}</h3>
                <div class="quiz-question" style="margin-bottom: 1rem;">${escapeHtml(item.question)}</div>
                <div class="quiz-options" id="retest-options">
                    ${item.options.map(opt => `
                        <div class="quiz-option" data-correct="${!!opt.correct}" onclick="app.answerRetest(this)">${escapeHtml(opt.text)}</div>
                    `).join('')}
                </div>
                <div class="modal-buttons">
                    <button class="btn-secondary" id="retest-close-btn">Stop</button>
                    <button class="btn-primary" id="retest-next-btn" style="display:none;">Next →</button>
                </div>
            </div>
        `;
        modal.querySelector('#retest-close-btn').onclick = () => this.finishRetest();
    }

    answerRetest(el) {
        const options = el.closest('#retest-options').querySelectorAll('.quiz-option');
        options.forEach(o => {
            o.style.pointerEvents = 'none';
            if (o.dataset.correct === 'true') o.classList.add('correct');
        });

        const gotItRight = el.dataset.correct === 'true';
        if (!gotItRight) {
            el.classList.add('incorrect');
        } else {
            this._retestCorrectCount++;
            const item = this._retestQueue[this._retestIndex];
            this.dismissMistake(item.key, true);
        }

        const nextBtn = document.getElementById('retest-next-btn');
        if (nextBtn) {
            nextBtn.style.display = 'block';
            nextBtn.textContent = (this._retestIndex < this._retestQueue.length - 1) ? 'Next →' : 'Finish';
            nextBtn.onclick = () => {
                this._retestIndex++;
                this.showRetestQuestion();
            };
        }
    }

    finishRetest() {
        const modal = document.getElementById('retest-modal-overlay');
        if (modal) modal.remove();
        if (this._retestQueue && this._retestQueue.length > 0) {
            toast(`Review complete! ${this._retestCorrectCount}/${this._retestQueue.length} correct.`, 'success');
        }
        this._retestQueue = null;
        this._retestIndex = 0;
        this._retestCorrectCount = 0;
    }

    // ============================================
    // ACCESSIBILITY
    // Text size scales the whole app via the root font-size, since every
    // other size in this stylesheet is in rem. Dyslexia-friendly mode
    // widens letter/word spacing and line height rather than pulling in an
    // external font — measurable readability gains without a new
    // dependency this static app would need to fetch reliably.
    // ============================================
    applyAccessibilityPreferences() {
        const textSize = localStorage.getItem('synthesis_text_size') || 'normal';
        document.documentElement.classList.remove('text-size-large', 'text-size-xlarge');
        if (textSize === 'large') document.documentElement.classList.add('text-size-large');
        if (textSize === 'xlarge') document.documentElement.classList.add('text-size-xlarge');

        const dyslexiaFriendly = localStorage.getItem('synthesis_dyslexia_friendly') === '1';
        document.documentElement.classList.toggle('dyslexia-friendly', dyslexiaFriendly);
    }

    setTextSize(size) {
        localStorage.setItem('synthesis_text_size', size);
        this.applyAccessibilityPreferences();
        this.renderAccessibilityControls();
    }

    toggleDyslexiaFriendly() {
        const current = localStorage.getItem('synthesis_dyslexia_friendly') === '1';
        localStorage.setItem('synthesis_dyslexia_friendly', current ? '0' : '1');
        this.applyAccessibilityPreferences();
        this.renderAccessibilityControls();
    }

    renderAccessibilityControls() {
        const container = document.getElementById('accessibility-controls');
        if (!container) return;
        const textSize = localStorage.getItem('synthesis_text_size') || 'normal';
        const dyslexiaFriendly = localStorage.getItem('synthesis_dyslexia_friendly') === '1';

        container.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <label style="display:block; font-weight:600; font-size:0.85rem; color: var(--color-text-secondary); margin-bottom: 0.5rem;">Text Size</label>
                <div class="backup-btn-row">
                    <button class="backup-btn ${textSize === 'normal' ? 'backup-btn-primary' : 'backup-btn-secondary'}" onclick="app.setTextSize('normal')" aria-pressed="${textSize === 'normal'}">A</button>
                    <button class="backup-btn ${textSize === 'large' ? 'backup-btn-primary' : 'backup-btn-secondary'}" onclick="app.setTextSize('large')" aria-pressed="${textSize === 'large'}" style="font-size:1.15em;">A</button>
                    <button class="backup-btn ${textSize === 'xlarge' ? 'backup-btn-primary' : 'backup-btn-secondary'}" onclick="app.setTextSize('xlarge')" aria-pressed="${textSize === 'xlarge'}" style="font-size:1.3em;">A</button>
                </div>
            </div>
            <button class="backup-btn ${dyslexiaFriendly ? 'backup-btn-primary' : 'backup-btn-secondary'}" onclick="app.toggleDyslexiaFriendly()" style="width:100%;" aria-pressed="${dyslexiaFriendly}">
                ${dyslexiaFriendly ? '✅ Dyslexia-Friendly Spacing: On' : 'Enable Dyslexia-Friendly Spacing'}
            </button>
        `;
    }

    // ============================================
    // AI TUTOR CHAT
    // Bring-your-own Anthropic API key: this is a static app with no
    // backend to proxy the request, and Anthropic's API blocks direct
    // browser calls by default specifically to stop keys from leaking out
    // of client-side apps. The "anthropic-dangerous-direct-browser-access"
    // header is Anthropic's own documented opt-in for exactly this
    // scenario — a personal, single-user tool where the key living in
    // this browser's localStorage is an acceptable tradeoff. It is NOT
    // safe for a multi-user product; the Profile copy says so.
    // Chat history is intentionally NOT persisted to APP_DATA — it's
    // in-memory only for the session, so it can't bloat exported backups
    // or leak lesson-adjacent conversation into a shared/synced device.
    // ============================================
    getAnthropicApiKey() {
        return localStorage.getItem('synthesis_anthropic_api_key') || '';
    }

    saveAnthropicApiKey(key) {
        const trimmed = (key || '').trim();
        if (!trimmed) {
            toast('Enter a key first.', 'info');
            return;
        }
        localStorage.setItem('synthesis_anthropic_api_key', trimmed);
        toast('🔑 API key saved on this device.', 'success');
        this.renderAiTutorSettings();
    }

    clearAnthropicApiKey() {
        if (!confirm('Remove your saved API key from this browser?')) return;
        localStorage.removeItem('synthesis_anthropic_api_key');
        toast('API key removed.', 'info');
        this.renderAiTutorSettings();
    }

    renderAiTutorSettings() {
        const container = document.getElementById('ai-tutor-settings');
        if (!container) return;
        const hasKey = !!this.getAnthropicApiKey();

        container.innerHTML = hasKey ? `
            <p style="color: var(--color-success); font-size: 0.85rem; margin-bottom: 0.75rem;">✅ API key saved on this device — look for the 💬 button while reading a lesson.</p>
            <button class="backup-btn backup-btn-secondary" onclick="app.clearAnthropicApiKey()">Remove API Key</button>
        ` : `
            <div class="form-group" style="margin-bottom: 0.75rem;">
                <input type="password" id="ai-tutor-key-input" class="fitness-input" placeholder="sk-ant-..." autocomplete="off">
            </div>
            <button class="backup-btn backup-btn-primary" onclick="app.saveAnthropicApiKey(document.getElementById('ai-tutor-key-input').value)">Save API Key</button>
        `;
    }

    // Shows/hides the chat FAB — only makes sense while actually reading a
    // lesson, since the tutor is grounded in that lesson's content.
    updateAiTutorVisibility(viewName) {
        const fab = document.getElementById('ai-tutor-fab');
        if (!fab) return;
        const shouldShow = viewName === 'lesson' && !!this.getAnthropicApiKey();
        fab.classList.toggle('visible', shouldShow);
        if (!shouldShow) this.closeAiTutorChat();
    }

    openAiTutorChat() {
        if (!this.getAnthropicApiKey()) {
            toast('Add your Anthropic API key in Profile > AI Tutor first.', 'info');
            return;
        }
        const panel = document.getElementById('ai-tutor-panel');
        if (!panel) return;
        panel.classList.add('open');
        this.renderAiTutorMessages();
        document.getElementById('ai-tutor-input')?.focus();
    }

    closeAiTutorChat() {
        document.getElementById('ai-tutor-panel')?.classList.remove('open');
    }

    renderAiTutorMessages() {
        const container = document.getElementById('ai-tutor-messages');
        if (!container) return;

        if (!this._aiTutorMessages || this._aiTutorMessages.length === 0) {
            const lessonName = this.currentLesson ? this.currentLesson.title : 'this lesson';
            container.innerHTML = `<div class="ai-tutor-empty">Ask me anything about "${escapeHtml(lessonName)}" — explain a concept differently, quiz you on it, or dig into something the lesson glossed over.</div>`;
            return;
        }

        container.innerHTML = this._aiTutorMessages.map(m =>
            `<div class="ai-tutor-msg ai-tutor-msg-${m.role}">${escapeHtml(m.content)}</div>`
        ).join('');
        container.scrollTop = container.scrollHeight;
    }

    async sendAiTutorMessage() {
        const input = document.getElementById('ai-tutor-input');
        const text = (input?.value || '').trim();
        if (!text) return;
        input.value = '';

        if (!this._aiTutorMessages) this._aiTutorMessages = [];
        this._aiTutorMessages.push({ role: 'user', content: text });

        const sendBtn = document.getElementById('ai-tutor-send-btn');
        if (sendBtn) sendBtn.disabled = true;
        this._aiTutorMessages.push({ role: 'assistant', content: '…', pending: true });
        this.renderAiTutorMessages();

        try {
            const reply = await this.callAnthropicApi(this._aiTutorMessages.filter(m => !m.pending));
            this._aiTutorMessages = this._aiTutorMessages.filter(m => !m.pending);
            this._aiTutorMessages.push({ role: 'assistant', content: reply });
        } catch (err) {
            this._aiTutorMessages = this._aiTutorMessages.filter(m => !m.pending);
            this._aiTutorMessages.push({ role: 'assistant', content: `⚠️ ${err.message}` });
        }

        if (sendBtn) sendBtn.disabled = false;
        this.renderAiTutorMessages();
    }

    async callAnthropicApi(messages, systemPromptOverride) {
        const apiKey = this.getAnthropicApiKey();
        if (!apiKey) throw new Error('No API key saved. Add one in Profile > AI Tutor.');

        let system = systemPromptOverride;
        if (!system) {
            const lessonContext = this.currentLesson
                ? `The user is currently studying the lesson "${this.currentLesson.title}" from "${this.currentBook?.title || 'a book'}" on Synthesis, a personal learning app. Here is the lesson content read so far, for grounding:\n\n${(this.currentLesson.cards || []).slice(0, this.currentCard + 1).map(c => c.content || c.question || '').join('\n\n').slice(0, 3000)}`
                : 'The user is browsing Synthesis, a personal learning app, and hasn\'t started a specific lesson yet.';
            system = `You are a friendly, encouraging tutor helping a student inside the Synthesis learning app. ${lessonContext}\n\nKeep answers focused and conversational — this is a chat, not an essay. Ground your answers in the lesson content when relevant, but you can go beyond it if the student asks something adjacent.`;
        }

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-5',
                max_tokens: 1024,
                system,
                messages: messages.map(m => ({ role: m.role, content: m.content }))
            })
        });

        if (!response.ok) {
            const body = await response.text().catch(() => '');
            if (response.status === 401) throw new Error('Invalid API key — check it in Profile > AI Tutor.');
            if (response.status === 429) throw new Error('Rate limited by Anthropic — try again in a moment.');
            throw new Error(`API error (${response.status}): ${body.slice(0, 200)}`);
        }

        const data = await response.json();
        const text = data?.content?.find(c => c.type === 'text')?.text;
        if (!text) throw new Error('Unexpected response shape from the API.');
        return text;
    }

    // ============================================
    // PERSONAL GLOSSARY
    // Auto-collected from lessons you've actually completed — bold terms
    // already exist in the source content, this just surfaces them as a
    // personal, growing reference instead of re-reading three books to
    // recall a term. Fully derived from existing data, computed on demand
    // (not persisted) so it can't drift out of sync or bloat backups.
    // ============================================
    buildPersonalGlossary() {
        const completions = APP_DATA.user.lessonCompletions || {};
        const terms = new Map(); // lowercased term -> { term, entries: [] }

        for (const cat of APP_DATA.categories) {
            for (const book of (cat.books || [])) {
                for (const lesson of (book.lessonList || [])) {
                    if (!completions[book.id + '::' + lesson.id]) continue;
                    for (const card of (lesson.cards || [])) {
                        if (typeof card.content !== 'string') continue;
                        for (const { term, definition } of this.extractBoldTerms(card.content)) {
                            const lowerKey = term.toLowerCase();
                            if (!terms.has(lowerKey)) terms.set(lowerKey, { term, entries: [] });
                            const entry = terms.get(lowerKey);
                            const alreadyHasThisLesson = entry.entries.some(e => e.bookId === book.id && e.lessonId === lesson.id);
                            if (!alreadyHasThisLesson && entry.entries.length < 3) {
                                entry.entries.push({ bookId: book.id, bookTitle: book.title, lessonId: lesson.id, lessonTitle: lesson.title, definition });
                            }
                        }
                    }
                }
            }
        }

        return [...terms.values()].sort((a, b) => a.term.localeCompare(b.term));
    }

    // Pulls **bolded** phrases that are genuine glossary material — a
    // vocabulary term the text actually defines, a proper name, or a date —
    // and skips bolded emphasis like "most people", "56% of Americans", or
    // "money flows out". Returns { term, definition } where the definition is
    // the sentence that explains the term.
    extractBoldTerms(content) {
        const results = [];
        const seen = new Set();
        const regex = /\*\*([^*]{2,50})\*\*/g;
        let m;
        while ((m = regex.exec(content)) !== null) {
            const term = m[1].trim();
            if (!this.isGlossaryTerm(term)) continue;

            // Position of the term inside the plain (marker-free) text.
            const plain = content.replace(/\*\*/g, '');
            const plainIdx = content.slice(0, m.index).replace(/\*\*/g, '').length;
            const sentence = this.sentenceAround(plain, plainIdx, term.length);
            const definition = this.definitionFor(term, sentence);
            if (!definition) continue;

            const key = term.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key);
            results.push({ term, definition });
        }
        return results;
    }

    // A bold phrase earns a glossary slot only if it reads like a term, a
    // name, or a date — not an emphasis phrase, statistic, or clause.
    isGlossaryTerm(term) {
        const t = (term || '').trim();
        if (!t) return false;
        if (/[.!?:;,]$/.test(t)) return false;                 // sentence fragment
        const words = t.split(/\s+/).filter(Boolean);
        if (words.length > 5) return false;                    // too long to be a term
        if (/%|\bpercent\b/i.test(t)) return false;            // a statistic
        // Numbers are allowed only when the phrase is a date/year; reject
        // quantities like "56", "1.9 million", "20,000 breaths".
        const isYearish = /\b(1[0-9]{3}|20[0-9]{2})\b/.test(t) || /^\d{1,4}(?:s|st|nd|rd|th)?(?:[-–]\d{1,4}(?:s|st|nd|rd|th)?)?$/.test(t);
        if (/\d/.test(t) && !isYearish) return false;
        if (/[.,]/.test(t) && !isYearish) return false;
        if (/\b(million|billion|thousand|trillion|dozen|hundreds?)\b/i.test(t)) return false;
        // Leading quantifier / pronoun / connective signals an emphasis clause.
        const STOP = new Set(['most','many','much','some','few','fewer','all','every','more','less','several','both','either','neither','each','any','no','not','when','why','how','where','what','who','whom','whose','if','because','since','while','although','though','however','therefore','thus','so','but','and','or','yet','also','even','just','only','still','now','then','here','there','this','that','these','those','it','its','they','their','them','we','our','us','you','your','he','she','his','her','about','over','under','up','down','out','in','on','at','by','for','with','from','into','onto','as','of','to','a','an','the']);
        if (STOP.has(words[0].toLowerCase().replace(/[^a-z]/g, ''))) return false;
        return true;
    }

    // Returns the sentence in `text` that contains the span at [idx, idx+len].
    sentenceAround(text, idx, len) {
        let s = idx;
        while (s > 0 && !/[.!?]/.test(text[s - 1])) s--;
        let e = idx + len;
        while (e < text.length && !/[.!?]/.test(text[e])) e++;
        if (e < text.length) e++;                              // include the terminator
        return text.slice(s, e).replace(/\s+/g, ' ').trim();
    }

    // A term is glossary-worthy if it is a name, a date, or is genuinely
    // defined in its sentence (followed by a definitional cue). Returns the
    // definition sentence, or null to skip the term.
    definitionFor(term, sentence) {
        if (!sentence || sentence.split(/\s+/).length < 3) return null;
        const isName = this.looksLikeName(term);
        const isDate = /\b(1[0-9]{3}|20[0-9]{2})\b/.test(term) || /^\d{1,4}(?:s|st|nd|rd|th)?(?:[-–]\d{1,4}(?:s|st|nd|rd|th)?)?$/.test(term);
        const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const defCue = new RegExp(esc + '\\s*(?:\\(|,|—|–|:| is | are | was | were | means | refers to | describes | is called | are called | is a | is an | is the | are the )', 'i');
        if (isName || isDate || defCue.test(sentence)) return sentence;
        return null;
    }

    // True for proper names: every significant word is capitalised (small
    // connectors like "of"/"the"/"von" are allowed to be lowercase).
    looksLikeName(term) {
        const words = term.split(/\s+/).filter(Boolean);
        if (!words.length) return false;
        // Eponyms are terms in their own right: "Newton's third law",
        // "Crohn's disease", "Broca's area", "Parkinson's".
        if (/^[A-Z][A-Za-z.\-]*['’]s$/.test(words[0])) return true;
        const CONNECT = new Set(['of','the','and','de','van','von','der','da','di','la','le','du','del','el','al']);
        let caps = 0;
        for (const w of words) {
            const clean = w.replace(/[^A-Za-z]/g, '');
            if (!clean) continue;
            if (CONNECT.has(clean.toLowerCase())) continue;
            if (/^[A-Z]/.test(clean)) caps++;
            else return false;                                 // a significant lowercase word
        }
        return caps >= 1;
    }

    renderGlossary(filterQuery) {
        const container = document.getElementById('glossary-content');
        if (!container) return;

        if (!this._glossaryTerms) {
            this._glossaryTerms = this.buildPersonalGlossary();
        }
        const q = (filterQuery || '').trim().toLowerCase();
        const terms = q ? this._glossaryTerms.filter(t => t.term.toLowerCase().includes(q)) : this._glossaryTerms;

        if (this._glossaryTerms.length === 0) {
            container.innerHTML = `<div class="no-favorites"><p>Your glossary builds itself as you complete lessons — key terms from lessons you finish will show up here.</p></div>`;
            return;
        }
        if (terms.length === 0) {
            container.innerHTML = `<div class="no-favorites"><p>No terms match "${escapeHtml(filterQuery)}".</p></div>`;
            return;
        }

        container.innerHTML = `
            <p style="color: var(--color-text-secondary); margin-bottom: 1rem;">${this._glossaryTerms.length} term${this._glossaryTerms.length === 1 ? '' : 's'} collected from lessons you've completed.</p>
            ${terms.map(t => `
                <div class="notes-list-item" style="cursor: default;">
                    <div style="flex:1; min-width:0;">
                        <div class="notes-list-item-title">${escapeHtml(t.term)}</div>
                        ${t.entries.map(e => `
                            <div style="margin-top: 0.5rem;">
                                <div class="notes-list-item-text">${escapeHtml(e.definition)}</div>
                                <div class="notes-list-item-book" style="cursor:pointer; color: var(--color-primary-light);" onclick="app.startLesson('${e.bookId}', '${e.lessonId}')">${escapeHtml(e.bookTitle)} &middot; ${escapeHtml(e.lessonTitle)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        `;
    }

    filterGlossary(query) {
        this.renderGlossary(query);
    }

    renderContinueLearning() {
        const container = document.getElementById('continue-learning');
        const booksInProgress = getBooksInProgress();

        if (booksInProgress.length === 0) {
            container.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; padding: 2rem;">No books in progress. Start learning below!</p>';
            return;
        }

        container.innerHTML = booksInProgress.map(book => `
            <div class="book-progress-card" onclick="app.showBook('${book.id}')">
                <div class="book-thumbnail" style="background: linear-gradient(135deg, ${this.getCategoryColor(book.category)} 0%, ${this.getCategoryColorDark(book.category)} 100%)">
                    ${this.getBookInitials(book.title)}
                </div>
                <div class="book-progress-info">
                    <div class="book-progress-title">${book.title}</div>
                    <div class="book-progress-author">${book.author}</div>
                    <div class="progress-container">
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" style="width: ${book.progress}%"></div>
                        </div>
                        <span class="progress-percent">${book.progress}% complete • ${book.lessons} lessons</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderCategories() {
        const container = document.getElementById('categories-grid');
        // Display order: categories with the newest additions first, so a
        // just-shipped section (e.g. Languages) is not buried at the bottom.
        // Recency = the latest BOOK_ADDED_ON date across a category's books;
        // that map only covers external modules, so long-static categories
        // have no date and keep their original relative order at the end.
        // Sorts a copy — APP_DATA.categories itself must keep its order,
        // which book lookup and cross-listing rely on.
        const addedOn = window.BOOK_ADDED_ON || {};
        const display = APP_DATA.categories
            .map((category, index) => {
                let newest = '';
                category.books.forEach(book => {
                    const d = addedOn[book.id];
                    if (d && d > newest) newest = d;
                });
                return { category, newest, index };
            })
            .sort((a, b) => b.newest.localeCompare(a.newest) || (a.index - b.index));
        container.innerHTML = display.map(({ category }) => `
            <div class="category-card" style="--category-color: ${category.color}" onclick="app.showCategory('${category.id}')">
                <span class="category-icon">${category.icon}</span>
                <div class="category-name">${category.name}</div>
                <div class="category-count">${category.books.length} books</div>
            </div>
        `).join('');
    }

    // Renders the "Trending This Week" shelf. The element id is historical —
    // the books come from getTrendingBooks(), not the `featured` flag.
    // The `featured` flag drives renderFeaturedPicks() below.
    renderFeaturedBooks() {
        const container = document.getElementById('featured-books');
        const featured = getTrendingBooks();

        container.innerHTML = featured.map(book => `
            <div class="featured-book-card" onclick="app.showBook('${book.id}')">
                <div class="book-cover" style="background: linear-gradient(135deg, ${this.getCategoryColor(book.category)} 0%, ${this.getCategoryColorDark(book.category)} 100%)">
                    <div class="book-cover-text">${book.title}</div>
                </div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-meta">
                        <span class="book-lessons">${book.lessons} lessons</span>
                        <span class="book-time">${book.duration} min</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // "Featured Picks" — the editorial shelf, driven by the `featured` flag.
    // Same row length as Trending, and getFeaturedBooks() excludes anything
    // already on that shelf so no book shows up twice on the home page.
    renderFeaturedPicks() {
        const container = document.getElementById('featured-picks');
        if (!container) return;
        const books = (typeof getFeaturedBooks === 'function') ? getFeaturedBooks() : [];
        if (books.length === 0) {
            container.innerHTML = '';
            return;
        }
        container.innerHTML = books.map(book => `
            <div class="featured-book-card" onclick="app.showBook('${book.id}')">
                <div class="book-cover" style="background: linear-gradient(135deg, ${this.getCategoryColor(book.category)} 0%, ${this.getCategoryColorDark(book.category)} 100%)">
                    <div class="book-cover-text">${book.title}</div>
                </div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-meta">
                        <span class="book-lessons">${book.lessons} lessons</span>
                        <span class="book-time">${book.duration} min</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderWhatsNewBooks() {
        const container = document.getElementById('whats-new-books');
        if (!container) return;
        const books = (typeof getWhatsNewBooks === 'function') ? getWhatsNewBooks() : [];
        if (books.length === 0) {
            container.innerHTML = '';
            return;
        }
        container.innerHTML = books.map(book => `
            <div class="featured-book-card" onclick="app.showBook('${book.id}')">
                <div class="book-cover" style="background: linear-gradient(135deg, ${this.getCategoryColor(book.category)} 0%, ${this.getCategoryColorDark(book.category)} 100%)">
                    <div class="book-cover-text">${book.title}</div>
                </div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-meta">
                        <span class="book-lessons">${book.lessons} lessons</span>
                        <span class="book-time">${book.duration} min</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showCategory(categoryId) {
        this.currentCategory = getCategoryById(categoryId);
        if (!this.currentCategory) return;

        document.getElementById('category-title').textContent = this.currentCategory.name;
        this.updateCategoryFavoriteButton(categoryId);

        const container = document.getElementById('category-books');
        // Any category flagged as a "course hub" (legacy MBC, or any of the
        // new tracks via `courseHub: true`) gets the rich course-page layout.
        const isCourseHub = categoryId === 'medical-billing-coding' || this.currentCategory.courseHub;
        container.classList.toggle('mbc-mode', !!isCourseHub);

        if (isCourseHub) {
            this.renderCourseHub(this.currentCategory);
            this.switchView('category');
            return;
        }

        // Exam Center track banner — explains how the curriculum + Exam Center
        // work together, shows direct links to the exam modes.
        let banner = '';
        if (this.currentCategory.examCenterTrack) {
            banner = `
                <div class="exam-track-banner" style="background: linear-gradient(135deg, #0ea5e9, #0369a1); color: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">📘 How This Course Works</h3>
                    <p style="margin: 0 0 1rem 0; opacity: 0.95; line-height: 1.5;">
                        This is a <strong>10-book curriculum</strong> paired with the <strong>Exam Center</strong>. Start at the top book (US Healthcare & Insurance 101) and work down. After each lesson, take its quiz in the Exam Center. <strong>Score 80% or higher to unlock the next lesson.</strong>
                    </p>
                    <ul style="margin: 0 0 1rem 1.25rem; padding: 0; opacity: 0.95; line-height: 1.6;">
                        <li><strong>Lesson mode:</strong> one lesson's quiz — gating exam, must pass 80%</li>
                        <li><strong>Unit mode:</strong> one book's unlocked questions, mixed</li>
                        <li><strong>Comprehensive:</strong> ALL unlocked questions across the whole track</li>
                        <li><strong>Daily mode:</strong> spaced-repetition queue of due + previously-missed questions</li>
                    </ul>
                    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                        <button onclick="app.switchView('exam')" style="background: white; color: #0369a1; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
                            Open Exam Center →
                        </button>
                        <button onclick="app.switchView('exam'); if(window.examCenter){window.examCenter.startDaily();}" style="background: rgba(255,255,255,0.18); color: white; border: 1px solid rgba(255,255,255,0.4); padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
                            Start Today's Spaced Review
                        </button>
                    </div>
                </div>
            `;
        }

        container.innerHTML = banner + this.currentCategory.books.map(book => `
            <div class="featured-book-card" onclick="app.showBook('${book.id}')">
                <div class="book-cover" style="background: linear-gradient(135deg, ${this.currentCategory.color} 0%, ${this.getCategoryColorDark(book.category)} 100%)">
                    <div class="book-cover-text">${book.title}</div>
                </div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-meta">
                        <span class="book-lessons">${book.lessons} lessons</span>
                        <span class="book-time">${book.duration} min</span>
                    </div>
                    ${book.progress > 0 ? `
                        <div class="progress-container" style="margin-top: 0.5rem;">
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill" style="width: ${book.progress}%"></div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');

        this.switchView('category');
    }

    // ============================================================
    // Medical Billing, Coding & HIM Track — dedicated course page
    // ============================================================
    getCourseStats(category) {
        const books = category.books || [];
        const ec = window.examCenter;
        // The exam-center unlock logic only knows about the MBC curriculum.
        // For non-MBC tracks, treat every lesson as unlocked (no strict gating yet).
        const examGated = category.examCenterTrack === true;
        let lessonsTotal = 0, lessonsPassed = 0;
        let nextBookId = null, nextLessonId = null;
        let questionsTotal = 0, questionsMastered = 0;
        const bookStats = [];

        for (const book of books) {
            const lessons = book.lessonList || [];
            let bookLessonsPassed = 0;
            let bookLessonsUnlocked = 0;
            for (const lesson of lessons) {
                lessonsTotal++;
                const unlocked = examGated && ec ? ec.isLessonUnlocked(book.id, lesson.id) : true;
                // Treat a lesson as "passed" if either the exam-center has it
                // gated-passed (MBC) OR the user read through to the end and
                // it was marked completed. Lets non-gated tracks advance their
                // progress bars from plain reading.
                const passedExam = ec ? ec.isLessonPassed(book.id, lesson.id) : false;
                const passed = passedExam || lesson.completed === true;
                if (unlocked) bookLessonsUnlocked++;
                if (passed) { lessonsPassed++; bookLessonsPassed++; }
                if (unlocked && !passed && !nextBookId) {
                    nextBookId = book.id;
                    nextLessonId = lesson.id;
                }
            }
            let pool = [];
            if (ec) {
                try { pool = ec.harvestPool({ bookId: book.id }); } catch (_) { pool = []; }
            }
            const bookMastered = pool.filter(q =>
                ec && ec.masteryOf(q.id) >= 0.85 && ec.getStat(q.id).seen > 0
            ).length;
            questionsTotal += pool.length;
            questionsMastered += bookMastered;
            const pct = lessons.length ? Math.round((bookLessonsPassed / lessons.length) * 100) : 0;
            bookStats.push({
                book,
                lessons: lessons.length,
                passed: bookLessonsPassed,
                unlocked: bookLessonsUnlocked,
                percent: pct,
                pool: pool.length,
                mastered: bookMastered,
            });
        }

        const booksCompleted = bookStats.filter(s => s.lessons > 0 && s.passed === s.lessons).length;
        const percentComplete = lessonsTotal ? Math.round((lessonsPassed / lessonsTotal) * 100) : 0;
        const examHistory = (APP_DATA.user && APP_DATA.user.examHistory) || [];
        const examsTaken = examHistory.length;
        const avgScore = examsTaken
            ? Math.round(examHistory.reduce((a, e) => a + e.pct, 0) / examsTaken)
            : 0;

        return {
            books, bookStats,
            lessonsTotal, lessonsPassed, percentComplete,
            booksTotal: books.length, booksCompleted,
            questionsTotal, questionsMastered,
            examsTaken, avgScore,
            nextBookId, nextLessonId,
        };
    }

    // Default curriculum split for the legacy MBC track, retained so the
    // track keeps its familiar Part I / Part II layout without needing
    // a `parts` array on the category.
    defaultMBCParts() {
        return [
            { romanNum: 'Part I', title: 'Billing & Coding Core',
              bookIds: ['him-insurance-101','him-revenue-cycle','him-coding-fundamentals','him-claim-forms','him-compliance'] },
            { romanNum: 'Part II', title: 'HIM, Data & Quality',
              bookIds: ['him-foundations','him-statistics','him-data-analytics','him-health-it','him-quality-reporting'] },
        ];
    }

    renderCourseHub(category) {
        const cat = category || this.currentCategory;
        const s = this.getCourseStats(cat);
        const container = document.getElementById('category-books');
        const ecReady = !!window.examCenter;
        const isMBC = cat.id === 'medical-billing-coding';
        const examGated = cat.examCenterTrack === true;

        const continueLabel = s.lessonsPassed === 0 ? 'Start the Course' : 'Continue Course';
        const continueTarget = s.nextBookId && s.nextLessonId
            ? `app.startLesson('${s.nextBookId}','${s.nextLessonId}')`
            : (s.books[0] ? `app.showBook('${s.books[0].id}')` : '');

        // Resolve curriculum parts. Categories can declare a custom split
        // via `parts: [{romanNum, title, bookIds: [...]}]`. MBC falls back
        // to the legacy two-part default. Everything else falls back to a
        // single "Curriculum" part containing all books.
        let parts = Array.isArray(cat.parts) && cat.parts.length ? cat.parts
            : (isMBC ? this.defaultMBCParts()
                     : [{ romanNum: 'Curriculum', title: 'Track Books', bookIds: cat.books.map(b => b.id) }]);
        // Resolve parts → bookStat groups in declared order.
        const seen = new Set();
        const partGroups = parts.map(p => {
            const stats = (p.bookIds || [])
                .map(id => s.bookStats.find(bs => bs.book.id === id))
                .filter(Boolean);
            stats.forEach(bs => seen.add(bs.book.id));
            return { ...p, stats };
        });
        // Books not assigned to any part fall into a final "Additional Books" part.
        const orphans = s.bookStats.filter(bs => !seen.has(bs.book.id));
        if (orphans.length) {
            partGroups.push({ romanNum: 'Extras', title: 'Additional Books', stats: orphans });
        }

        const renderModule = (entry, indexInCourse) => {
            const b = entry.book;
            const pct = entry.percent;
            let statusPill;
            if (entry.lessons === 0) statusPill = '<span class="mbc-pill mbc-pill-locked">No content</span>';
            else if (entry.passed === entry.lessons) statusPill = '<span class="mbc-pill mbc-pill-done">✓ Completed</span>';
            else if (entry.passed > 0) statusPill = `<span class="mbc-pill mbc-pill-active">In Progress · ${entry.passed}/${entry.lessons}</span>`;
            else if (entry.unlocked > 0) statusPill = '<span class="mbc-pill mbc-pill-ready">Ready to Start</span>';
            else statusPill = '<span class="mbc-pill mbc-pill-locked">🔒 Locked</span>';

            const unitBtn = (ecReady && entry.pool > 0)
                ? `<button class="mbc-mod-btn mbc-mod-btn-secondary" onclick="event.stopPropagation(); window.examCenter && (app.switchView('exam'), window.examCenter.startUnit('${b.id}'))">Unit Quiz</button>`
                : '';

            return `
                <div class="mbc-module" onclick="app.showBook('${b.id}')">
                    <div class="mbc-mod-number">${indexInCourse}</div>
                    <div class="mbc-mod-body">
                        <div class="mbc-mod-head">
                            <div class="mbc-mod-title">${b.title}</div>
                            ${statusPill}
                        </div>
                        <div class="mbc-mod-meta">
                            <span>${entry.lessons} lessons</span>
                            <span>·</span>
                            <span>${b.duration} min</span>
                            ${entry.pool > 0 ? `<span>·</span><span>${entry.mastered}/${entry.pool} Qs mastered</span>` : ''}
                        </div>
                        <div class="mbc-mod-progress">
                            <div class="mbc-mod-progress-bar" style="width:${pct}%"></div>
                        </div>
                    </div>
                    <div class="mbc-mod-actions">
                        <button class="mbc-mod-btn mbc-mod-btn-primary" onclick="event.stopPropagation(); app.showBook('${b.id}')">Open</button>
                        ${unitBtn}
                    </div>
                </div>`;
        };

        let cursor = 0;
        const partsHtml = partGroups.map(p => {
            const modules = p.stats.map(e => renderModule(e, ++cursor)).join('');
            return `
                <div class="mbc-part">
                    <div class="mbc-part-header">
                        <span class="mbc-part-num">${p.romanNum || ''}</span>
                        <span class="mbc-part-title">${p.title}</span>
                        <span class="mbc-part-count">${p.stats.length} book${p.stats.length === 1 ? '' : 's'}</span>
                    </div>
                    <div class="mbc-modules">${modules}</div>
                </div>`;
        }).join('');
        const dueToday = (ecReady && window.examCenter.dailyQueueSize)
            ? window.examCenter.dailyQueueSize() : 0;
        // Goal block — shows the finish-by-date tracker if a goal is set
        // for this category; otherwise shows a "Set a goal" prompt.
        const goal = this.getGoalForCategory(cat.id);
        let goalHtml = '';
        if (goal) {
            const pace = this.computeGoalPace(goal, s);
            const statusInfo = {
                done:     { icon: '🎉', label: 'Course Complete',  color: '#10b981' },
                ahead:    { icon: '🚀', label: 'Ahead of Pace',    color: '#10b981' },
                'on-track':{icon: '✅', label: 'On Track',         color: '#0ea5e9' },
                behind:   { icon: '⚠️', label: 'Behind Pace',      color: '#f59e0b' },
                overdue:  { icon: '⏰', label: 'Past Target Date', color: '#ef4444' },
            }[pace.paceStatus];
            const niceTarget = new Date(goal.targetDate + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
            const lessonsPerDay = pace.perDayNeeded.toFixed(pace.perDayNeeded >= 1 ? 1 : 2);
            const daysLabel = pace.daysRemaining === 1 ? '1 day' : `${pace.daysRemaining} days`;
            goalHtml = `
                <div class="mbc-goal" style="border-left-color:${statusInfo.color};">
                    <div class="mbc-goal-row">
                        <span class="mbc-goal-icon">${statusInfo.icon}</span>
                        <div class="mbc-goal-body">
                            <div class="mbc-goal-headline">
                                <strong style="color:${statusInfo.color}">${statusInfo.label}</strong>
                                <span class="mbc-goal-target">Finish by ${niceTarget}</span>
                            </div>
                            <div class="mbc-goal-meta">
                                ${pace.daysRemaining >= 0 ? `${daysLabel} left · ${pace.lessonsRemaining} lessons remaining` : `${Math.abs(pace.daysRemaining)} days overdue · ${pace.lessonsRemaining} lessons remaining`}
                                ${pace.lessonsRemaining > 0 && pace.daysRemaining > 0 ? ` · ${lessonsPerDay} lesson${lessonsPerDay === '1.0' ? '' : 's'}/day needed` : ''}
                            </div>
                        </div>
                        <button class="mbc-goal-edit" onclick="event.stopPropagation(); app.promptSetGoal('${cat.id}')" title="Change target date">✏️</button>
                        <button class="mbc-goal-clear" onclick="event.stopPropagation(); app.confirmRemoveGoal('${cat.id}')" title="Remove goal">×</button>
                    </div>
                </div>`;
        } else {
            goalHtml = `
                <div class="mbc-goal mbc-goal-empty">
                    <button class="mbc-goal-set-btn" onclick="event.stopPropagation(); app.promptSetGoal('${cat.id}')">
                        🎯 Set a finish-by date — get a daily pace tracker
                    </button>
                </div>`;
        }
        const eyebrow = examGated
            ? 'Full Course · Exam-Gated Curriculum'
            : 'Full Course · Sequential Curriculum';
        const roadmapNote = examGated
            ? `${s.booksTotal} books, ${s.lessonsTotal} lessons — work top to bottom. Pass each lesson's quiz (80%) to unlock the next.`
            : `${s.booksTotal} books, ${s.lessonsTotal} lessons — work top to bottom. The first book of each track is seeded; the rest are being built out.`;

        container.innerHTML = `
            <div class="mbc-page">
                <section class="mbc-hero" style="${cat.color ? `background: linear-gradient(135deg, ${cat.color}33 0%, ${cat.color}88 50%, ${cat.color} 100%);` : ''}">
                    <div class="mbc-hero-top">
                        <span class="mbc-hero-icon">${cat.icon || '🩺'}</span>
                        <div class="mbc-hero-title-block">
                            <div class="mbc-hero-eyebrow">${eyebrow}</div>
                            <h1 class="mbc-hero-title">${cat.name}</h1>
                        </div>
                    </div>
                    <p class="mbc-hero-desc">${cat.description || ''}</p>
                    <div class="mbc-hero-progress">
                        <div class="mbc-hero-progress-row">
                            <span class="mbc-hero-progress-label">Course Progress</span>
                            <span class="mbc-hero-progress-pct">${s.percentComplete}%</span>
                        </div>
                        <div class="mbc-hero-progress-bar-bg">
                            <div class="mbc-hero-progress-bar-fill" style="width:${s.percentComplete}%"></div>
                        </div>
                        <div class="mbc-hero-progress-meta">
                            ${s.lessonsPassed}/${s.lessonsTotal} lessons passed · ${s.booksCompleted}/${s.booksTotal} books completed${s.questionsTotal ? ` · ${s.questionsMastered}/${s.questionsTotal} questions mastered` : ''}
                        </div>
                    </div>
                    ${goalHtml}
                    <div class="mbc-hero-actions">
                        <button class="mbc-cta mbc-cta-primary" onclick="${continueTarget}">
                            <span class="mbc-cta-icon">▶</span> ${continueLabel}
                        </button>
                        <button class="mbc-cta mbc-cta-secondary" onclick="app.switchView('exam'); window.examCenter && window.examCenter.startDaily && window.examCenter.startDaily();">
                            <span class="mbc-cta-icon">🔁</span> Today's Spaced Review
                        </button>
                        <button class="mbc-cta mbc-cta-tertiary" onclick="app.switchView('exam')">
                            Open Exam Center →
                        </button>
                    </div>
                </section>

                <section class="mbc-stats">
                    <div class="mbc-stat-tile">
                        <span class="mbc-stat-val">${s.booksTotal}</span>
                        <span class="mbc-stat-lbl">Books</span>
                    </div>
                    <div class="mbc-stat-tile">
                        <span class="mbc-stat-val">${s.lessonsTotal}</span>
                        <span class="mbc-stat-lbl">Lessons</span>
                    </div>
                    <div class="mbc-stat-tile">
                        <span class="mbc-stat-val">${s.examsTaken}</span>
                        <span class="mbc-stat-lbl">Exams Taken</span>
                    </div>
                    <div class="mbc-stat-tile">
                        <span class="mbc-stat-val">${s.avgScore}%</span>
                        <span class="mbc-stat-lbl">Avg Score</span>
                    </div>
                </section>

                ${examGated ? `
                <section class="mbc-exam-panel">
                    <div class="mbc-section-head">
                        <h2 class="mbc-section-title">🎓 Exam Center</h2>
                        <p class="mbc-section-sub">Retrieval practice — get tested, miss some, repeat.</p>
                    </div>
                    <div class="mbc-exam-grid">
                        <button class="mbc-exam-tile mbc-exam-lesson" onclick="app.switchView('exam')">
                            <span class="mbc-exam-tile-icon">📝</span>
                            <span class="mbc-exam-tile-title">Lesson Quizzes</span>
                            <span class="mbc-exam-tile-desc">80% to unlock the next lesson</span>
                        </button>
                        <button class="mbc-exam-tile mbc-exam-unit" onclick="app.switchView('exam')">
                            <span class="mbc-exam-tile-icon">📚</span>
                            <span class="mbc-exam-tile-title">Unit Exams</span>
                            <span class="mbc-exam-tile-desc">One book's unlocked questions, mixed</span>
                        </button>
                        <button class="mbc-exam-tile mbc-exam-comp" onclick="app.switchView('exam'); window.examCenter && window.examCenter.chooseComprehensive && window.examCenter.chooseComprehensive();">
                            <span class="mbc-exam-tile-icon">🎓</span>
                            <span class="mbc-exam-tile-title">Comprehensive</span>
                            <span class="mbc-exam-tile-desc">Every unlocked question across the track</span>
                        </button>
                        <button class="mbc-exam-tile mbc-exam-daily" onclick="app.switchView('exam'); window.examCenter && window.examCenter.startDaily && window.examCenter.startDaily();">
                            <span class="mbc-exam-tile-icon">🔁</span>
                            <span class="mbc-exam-tile-title">Daily Review${dueToday > 0 ? ` <span class="mbc-due-badge">${dueToday} due</span>` : ''}</span>
                            <span class="mbc-exam-tile-desc">Spaced repetition — due + missed first</span>
                        </button>
                        <button class="mbc-exam-tile mbc-exam-mock" onclick="app.switchView('exam'); window.examCenter && window.examCenter.chooseMockExam && window.examCenter.chooseMockExam();">
                            <span class="mbc-exam-tile-icon">🏆</span>
                            <span class="mbc-exam-tile-title">Mock Cert Exams</span>
                            <span class="mbc-exam-tile-desc">Full-length, timed or untimed (pausable)</span>
                        </button>
                    </div>
                </section>
                ` : `
                <section class="mbc-exam-panel mbc-coming-soon">
                    <div class="mbc-section-head">
                        <h2 class="mbc-section-title">🎓 Exam Center — Coming Soon for This Track</h2>
                        <p class="mbc-section-sub">Daily Review, Unit Exams, and Mock Cert Exams turn on once enough lesson content lands to make a fair question bank. In the meantime, the seed book's lesson quizzes already count toward your study streak.</p>
                    </div>
                </section>
                `}

                <section class="mbc-roadmap">
                    <div class="mbc-section-head">
                        <h2 class="mbc-section-title">📚 Curriculum Roadmap</h2>
                        <p class="mbc-section-sub">${roadmapNote}</p>
                    </div>
                    ${partsHtml}
                </section>
            </div>
        `;
    }

    // Back-compat alias — earlier code paths still call renderMedicalBillingCourse.
    renderMedicalBillingCourse() { this.renderCourseHub(this.currentCategory); }

    showAllBooks() {
        this.currentCategory = null;

        const allBooks = APP_DATA.categories.flatMap(c => c.books || []);
        document.getElementById('category-title').textContent = `All Books (${allBooks.length})`;

        const container = document.getElementById('category-books');
        container.classList.remove('mbc-mode');
        container.innerHTML = allBooks.map(book => `
            <div class="featured-book-card" onclick="app.showBook('${book.id}')">
                <div class="book-cover" style="background: linear-gradient(135deg, ${this.getCategoryColor(book.category)} 0%, ${this.getCategoryColorDark(book.category)} 100%)">
                    <div class="book-cover-text">${book.title}</div>
                </div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-meta">
                        <span class="book-lessons">${book.lessons} lessons</span>
                        <span class="book-time">${book.duration} min</span>
                    </div>
                    ${book.progress > 0 ? `
                        <div class="progress-container" style="margin-top: 0.5rem;">
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill" style="width: ${book.progress}%"></div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');

        this.switchView('category');
    }

    // Optional read-along plan for books that pair with a real book you can read
    // (book.readingPlan). It is a side panel only: it never locks or unlocks
    // lessons, and every lesson still teaches the book on its own.
    renderReadingPlan(book) {
        // A book may offer several paces (book.readingPlans); a single
        // book.readingPlan is treated as a one-item list.
        const plans = (book && (book.readingPlans || (book.readingPlan ? [book.readingPlan] : []))) || [];
        if (!plans.length) return '';
        const user = APP_DATA.user;
        const choice = Math.min(((user.readingPlanChoice || {})[book.id]) || 0, plans.length - 1);
        const plan = plans[choice];
        if (!plan || !Array.isArray(plan.steps) || !plan.steps.length) return '';
        // Plan 0 keeps the plain book id as its progress key; others get "#n".
        const doneKey = this.readingPlanKey(book.id, choice);
        const done = new Set(((user.readingPlanDone || {})[doneKey]) || []);
        const lessonFirst = user.readingPlanMode === 'lesson-first';
        const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        // Plan steps name lessons by their 1-based position in lessonList.
        const lessonChip = n => {
            const list = book.lessonList || [];
            const lesson = list[Number(n) - 1];
            if (!lesson) return '';
            const unlocked = window.examCenter ? window.examCenter.isLessonUnlocked(book.id, lesson.id) : true;
            const click = unlocked ? `app.startLesson('${book.id}', '${lesson.id}')` : `window.examCenter && window.examCenter.toast('Locked — pass the previous lesson\\'s quiz (80%) to unlock this.')`;
            return `<button class="rp-lesson" onclick="event.stopPropagation(); ${click}">${unlocked ? '▶' : '🔒'} Lesson ${Number(n)}: ${esc(lesson.title)}</button>`;
        };
        const steps = plan.steps.map((s, i) => {
            const readPart = s.read ? `<div class="rp-read">📖 <strong>Read:</strong> ${esc(s.read)}${s.pages ? ` <span class="rp-meta">· ${esc(s.pages)}</span>` : ''}${s.readDetail ? `<div class="rp-detail">${esc(s.readDetail)}</div>` : ''}</div>` : '';
            const lessonPart = (s.lessons || []).length ? `<div class="rp-lessons"><strong>🎓 Course:</strong> ${(s.lessons || []).map(lessonChip).join('')}</div>` : '';
            const body = lessonFirst ? lessonPart + readPart : readPart + lessonPart;
            return `
                <div class="rp-step ${done.has(i) ? 'rp-done' : ''}">
                    <label class="rp-check"><input type="checkbox" ${done.has(i) ? 'checked' : ''} onchange="app.toggleReadingStep('${book.id}', ${i}, ${choice})"></label>
                    <div class="rp-body">
                        <div class="rp-label">${esc(s.label || ('Step ' + (i + 1)))}</div>
                        ${body}
                        ${s.discuss && s.discuss.length ? `<details class="rp-discuss"><summary>💬 Reading-club questions</summary><ol>${s.discuss.map(q => `<li>${esc(q)}</li>`).join('')}</ol></details>` : ''}
                        ${s.tip ? `<div class="rp-tip">💡 ${esc(s.tip)}</div>` : ''}
                    </div>
                </div>`;
        }).join('');
        const openState = user.readingPlanOpen && user.readingPlanOpen[book.id] ? 'open' : '';
        return `
            <details class="reading-plan" ${openState} ontoggle="app.rememberReadingPlanOpen('${book.id}', this.open)">
                <summary>
                    <span>📚 ${esc(plan.title || 'Read-Along Plan')} <span class="rp-optional">optional</span></span>
                    <span class="rp-progress">${done.size} / ${plan.steps.length} steps</span>
                </summary>
                <div class="rp-inner">
                    <p class="rp-intro">${esc(plan.intro || 'Reading the book is optional — every lesson teaches it on its own. If you want to read along, follow these steps.')}</p>
                    ${plan.edition ? `<p class="rp-meta">${esc(plan.edition)}</p>` : ''}
                    ${plans.length > 1 ? `
                    <div class="rp-mode rp-pace">
                        <span>Pace:</span>
                        ${plans.map((p, k) => `<button class="${k === choice ? 'active' : ''}" onclick="app.setReadingPlanChoice('${book.id}', ${k})">${esc(p.name || ('Plan ' + (k + 1)))}</button>`).join('')}
                    </div>` : ''}
                    ${plan.pace ? `<p class="rp-meta">⏱️ ${esc(plan.pace)}</p>` : ''}
                    <div class="rp-mode">
                        <span>Order:</span>
                        <button class="${lessonFirst ? '' : 'active'}" onclick="app.setReadingPlanMode('read-first')">Read → then lesson</button>
                        <button class="${lessonFirst ? 'active' : ''}" onclick="app.setReadingPlanMode('lesson-first')">Lesson → then read</button>
                    </div>
                    ${steps}
                </div>
            </details>`;
    }

    readingPlanKey(bookId, choice) {
        return choice ? bookId + '#' + choice : bookId;
    }

    toggleReadingStep(bookId, i, choice = 0) {
        const user = APP_DATA.user;
        user.readingPlanDone = user.readingPlanDone || {};
        const key = this.readingPlanKey(bookId, choice);
        const set = new Set(user.readingPlanDone[key] || []);
        set.has(i) ? set.delete(i) : set.add(i);
        user.readingPlanDone[key] = [...set].sort((a, b) => a - b);
        if (typeof saveProgress === 'function') saveProgress();
        this.showBook(bookId);
    }

    setReadingPlanChoice(bookId, k) {
        const user = APP_DATA.user;
        user.readingPlanChoice = user.readingPlanChoice || {};
        user.readingPlanChoice[bookId] = k;
        if (typeof saveProgress === 'function') saveProgress();
        this.showBook(bookId);
    }

    setReadingPlanMode(mode) {
        APP_DATA.user.readingPlanMode = mode;
        if (typeof saveProgress === 'function') saveProgress();
        if (this.currentBook) this.showBook(this.currentBook.id);
    }

    rememberReadingPlanOpen(bookId, open) {
        const user = APP_DATA.user;
        user.readingPlanOpen = user.readingPlanOpen || {};
        if (!!user.readingPlanOpen[bookId] === !!open) return;
        user.readingPlanOpen[bookId] = !!open;
        if (typeof saveProgress === 'function') saveProgress();
    }

    showBook(bookId) {
        this.currentBook = getBookById(bookId);
        if (!this.currentBook) return;
        this.saveCurrentView();

        const categoryColor = this.getCategoryColor(this.currentBook.category);
        const categoryColorDark = this.getCategoryColorDark(this.currentBook.category);

        const detailHtml = `
            <div class="book-detail-header">
                <div class="book-detail-cover" style="background: linear-gradient(135deg, ${categoryColor} 0%, ${categoryColorDark} 100%)">
                    <div class="book-cover-text">${this.currentBook.title}</div>
                </div>
                <div class="book-detail-info">
                    <h1>${this.currentBook.title}</h1>
                    <div class="book-detail-author">by ${this.currentBook.author}</div>
                    <div class="book-stats">
                        <div class="stat">
                            <span class="stat-value">${this.currentBook.lessons}</span>
                            <span class="stat-label">Lessons</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${this.currentBook.duration}</span>
                            <span class="stat-label">Minutes</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${this.currentBook.progress}%</span>
                            <span class="stat-label">Complete</span>
                        </div>
                    </div>
                    <p class="book-description">${this.currentBook.description}</p>
                    <div class="book-actions">
                        <button class="start-book-btn" onclick="app.startBook('${this.currentBook.id}')">
                            ${this.currentBook.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                        </button>
                        <button class="favorite-btn ${window.activeRecall?.isFavorite(this.currentBook.id) ? 'favorited' : ''}"
                                onclick="app.toggleFavorite('${this.currentBook.id}')">
                            ${window.activeRecall?.isFavorite(this.currentBook.id) ? '⭐ Favorited' : '☆ Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>

            ${this.renderReadingPlan(this.currentBook)}

            ${this.currentBook.lessonList ? `
                <div class="lessons-list">
                    <h2>Lessons</h2>
                    ${this.currentBook.lessonList.map((lesson, index) => {
                        const bookId = this.currentBook.id;
                        const unlocked = window.examCenter ? window.examCenter.isLessonUnlocked(bookId, lesson.id) : true;
                        const passed = window.examCenter ? window.examCenter.isLessonPassed(bookId, lesson.id) : false;
                        let statusHtml = '';
                        if (passed) statusHtml = '<span class="lesson-status">✓ Passed</span>';
                        else if (lesson.completed) statusHtml = '<span class="lesson-status" style="color:#3bafbf">Read</span>';
                        else if (!unlocked) statusHtml = '<span class="lesson-status" style="color:#888">🔒 Locked</span>';
                        const click = unlocked
                            ? `app.startLesson('${bookId}', '${lesson.id}')`
                            : `window.examCenter && window.examCenter.toast('Locked — pass the previous lesson\\'s quiz (80%) to unlock this.')`;
                        return `
                        <div class="lesson-item" style="${unlocked ? '' : 'opacity:0.55;'}" onclick="${click}">
                            <div style="display: flex; align-items: center; flex: 1;">
                                <div class="lesson-number">${unlocked ? (index + 1) : '🔒'}</div>
                                <div class="lesson-item-info">
                                    <div class="lesson-item-title">${lesson.title}</div>
                                    <div class="lesson-item-duration">${lesson.duration || 11} min</div>
                                </div>
                            </div>
                            ${statusHtml}
                        </div>`;
                    }).join('')}
                </div>
            ` : ''}
        `;

        document.getElementById('book-detail').innerHTML = detailHtml;
        this.switchView('book');
    }

    startBook(bookId) {
        const book = getBookById(bookId);
        if (!book || !book.lessonList || book.lessonList.length === 0) return;

        // Find first incomplete lesson or start from lesson 1
        const firstIncompleteLesson = book.lessonList.find(l => !l.completed) || book.lessonList[0];
        this.startLesson(bookId, firstIncompleteLesson.id);
    }

    startLesson(bookId, lessonId) {
        const book = getBookById(bookId);
        if (!book || !book.lessonList) return;

        // Strict gating: block locked curriculum lessons
        if (window.examCenter && !window.examCenter.isLessonUnlocked(bookId, lessonId)) {
            window.examCenter.toast('Locked — pass the previous lesson\'s quiz (80%) to unlock this.');
            return;
        }

        this.recordDailyActivity();

        // A new lesson means a new grounding context — don't carry the
        // previous lesson's chat into this one.
        if (this.currentLesson?.id !== lessonId || this.currentBook?.id !== bookId) {
            this._aiTutorMessages = [];
        }

        this.currentBook = book;
        this.currentLesson = book.lessonList.find(l => String(l.id) === String(lessonId));
        if (!this.currentLesson) return;

        // If lesson doesn't have cards, create placeholder content
        if (!this.currentLesson.cards || this.currentLesson.cards.length === 0) {
            this.currentLesson.cards = [
                {
                    type: "intro",
                    title: this.currentLesson.title,
                    content: "This lesson is being developed! Check back soon for full content, or try Lesson 1 which is complete with interactive cards, examples, and quizzes."
                },
                {
                    type: "concept",
                    title: "Coming Soon",
                    content: `The full content for "${this.currentLesson.title}" is currently being created. \n\nIn the meantime:\n• Go back and complete other available lessons\n• Explore different books in the library\n• Try the fully-developed lessons in Atomic Habits\n• Use the Vision Board and Journal features\n\nNew lessons are added regularly!`
                }
            ];
        }

        this.currentCard = 0;

        if (this.shouldShowPretest(this.currentLesson)) {
            this.showPretestPrompt(() => {
                this.renderLesson();
                this.switchView('lesson');
            });
        } else {
            this.renderLesson();
            this.switchView('lesson');
        }
    }

    // ============================================
    // PRE-TEST PROMPT (the "pretesting effect")
    // Guessing before you've read the material — even wrong guesses —
    // measurably improves later retention vs. reading cold. Reuses several
    // of the lesson's own quiz questions rather than requiring new content;
    // shown once per lesson, purely for priming (not graded, no XP).
    // ============================================
    PRETEST_MAX_QUESTIONS = 3;

    shouldShowPretest(lesson) {
        if (!lesson || lesson.completed) return false;
        if (!APP_DATA.user.pretestsShown) APP_DATA.user.pretestsShown = {};
        const key = `${this.currentBook.id}::${lesson.id}`;
        if (APP_DATA.user.pretestsShown[key]) return false;
        return this.findPretestCards(lesson).length > 0;
    }

    // Pulls up to PRETEST_MAX_QUESTIONS quiz cards from the lesson, spread
    // across it rather than just the first few, so the pretest previews the
    // range of what the lesson covers instead of only its opening topic.
    findPretestCards(lesson) {
        const quizCards = (lesson.cards || []).filter(c => c.type === 'quiz' && c.question && c.options && c.options.length > 0);
        const max = this.PRETEST_MAX_QUESTIONS;
        if (quizCards.length <= max) return quizCards;

        const picked = [];
        for (let i = 0; i < max; i++) {
            picked.push(quizCards[Math.floor(i * (quizCards.length - 1) / (max - 1))]);
        }
        return [...new Set(picked)];
    }

    showPretestPrompt(onContinue) {
        const cards = this.findPretestCards(this.currentLesson);
        const key = `${this.currentBook.id}::${this.currentLesson.id}`;
        if (!APP_DATA.user.pretestsShown) APP_DATA.user.pretestsShown = {};
        APP_DATA.user.pretestsShown[key] = true;
        saveProgress();

        if (cards.length === 0) { onContinue(); return; }

        this._pretestCards = cards;
        this._pretestIndex = 0;
        this._pretestOnContinue = onContinue;

        const modal = document.createElement('div');
        modal.className = 'premium-modal-overlay';
        modal.id = 'pretest-modal';
        // Let the user back out: click the dark area outside the card, or Esc.
        modal.addEventListener('click', (e) => { if (e.target === modal) this.closePretest(); });
        this._pretestEsc = (e) => { if (e.key === 'Escape') this.closePretest(); };
        document.addEventListener('keydown', this._pretestEsc);
        document.body.appendChild(modal);
        this.renderPretestStep();
    }

    // Dismiss the pre-test overlay without entering the lesson, so tapping a
    // Discover card (or any lesson) is never a one-way trap.
    closePretest() {
        const modal = document.getElementById('pretest-modal');
        if (modal) modal.remove();
        if (this._pretestEsc) { document.removeEventListener('keydown', this._pretestEsc); this._pretestEsc = null; }
        this._pretestCards = null;
        this._pretestIndex = 0;
        this._pretestOnContinue = null;
    }

    renderPretestStep() {
        const modal = document.getElementById('pretest-modal');
        if (!modal) return;

        const cards = this._pretestCards;
        const i = this._pretestIndex;
        const card = cards[i];
        const isLast = i === cards.length - 1;

        modal.innerHTML = `
            <div class="premium-modal" style="position:relative;">
                <button onclick="app.closePretest()" aria-label="Close" title="Close"
                    style="position:absolute; top:8px; right:10px; width:32px; height:32px; border:none; border-radius:50%; background:rgba(255,255,255,0.1); color:var(--color-text-secondary); font-size:1.4rem; line-height:1; cursor:pointer; display:flex; align-items:center; justify-content:center;">&times;</button>
                <h3>🎯 Quick Guess${cards.length > 1 ? ` <span style="opacity:0.6; font-size:0.8em;">(${i + 1}/${cards.length})</span>` : ''}</h3>
                <p style="color: var(--color-text-secondary); text-align:center; margin-bottom: 1rem; font-size: 0.9rem;">
                    Before you read this lesson, take a guess. Just attempting it — right or wrong — helps it stick.
                </p>
                <div class="quiz-question" style="margin-bottom: 1rem;">${escapeHtml(card.question)}</div>
                <div class="quiz-options" id="pretest-options">
                    ${card.options.map((opt) => `
                        <div class="quiz-option" data-correct="${!!opt.correct}" onclick="app.answerPretest(this)">${escapeHtml(opt.text)}</div>
                    `).join('')}
                </div>
                <div class="modal-buttons">
                    <button class="btn-primary" id="pretest-continue-btn" style="width:100%;">${isLast ? 'Continue to Lesson →' : 'Next Question →'}</button>
                </div>
            </div>
        `;
        modal.querySelector('#pretest-continue-btn').onclick = () => {
            if (isLast) {
                modal.remove();
                if (this._pretestEsc) { document.removeEventListener('keydown', this._pretestEsc); this._pretestEsc = null; }
                const onContinue = this._pretestOnContinue;
                this._pretestCards = null;
                this._pretestOnContinue = null;
                onContinue();
            } else {
                this._pretestIndex++;
                this.renderPretestStep();
            }
        };
    }

    answerPretest(el) {
        const options = el.closest('#pretest-options').querySelectorAll('.quiz-option');
        options.forEach(o => {
            o.style.pointerEvents = 'none';
            if (o.dataset.correct === 'true') o.classList.add('correct');
        });
        if (el.dataset.correct !== 'true') el.classList.add('incorrect');
    }

    renderLesson() {
        if (!this.currentLesson || !this.currentLesson.cards) return;

        const totalCards = this.currentLesson.cards.length;
        const progress = ((this.currentCard + 1) / totalCards) * 100;

        this.updateLessonBookmarkButton();
        this.updateLessonNotesButton();

        // Update progress bar
        document.getElementById('lesson-progress-fill').style.width = `${progress}%`;
        // Format: "HITT 1305 • Lesson 11 • Card 3 of 6"
        const lessonId = String(this.currentLesson.id); // e.g. "hitt1305-11"
        const parts = lessonId.split('-');
        const bookCode = parts[0].replace(/([a-z]+)(\d+)/i, (_, letters, nums) =>
            letters.toUpperCase() + ' ' + nums).trim(); // "HITT 1305"
        const lessonNum = parts[1] || '';
        document.getElementById('lesson-progress-text').textContent =
            `${bookCode} • Lesson ${lessonNum} • Card ${this.currentCard + 1} of ${totalCards}`;

        // Render current card
        const card = this.currentLesson.cards[this.currentCard];
        const contentHtml = this.renderCard(card);

        document.getElementById('lesson-content').innerHTML = contentHtml;

        // Update navigation buttons
        const prevBtn = document.getElementById('prev-card-btn');
        const nextBtn = document.getElementById('next-card-btn');

        console.log('Updating buttons - prevBtn exists:', !!prevBtn, 'nextBtn exists:', !!nextBtn);

        // Make sure buttons are visible
        if (prevBtn) {
            prevBtn.style.display = 'block';
            prevBtn.disabled = this.currentCard === 0;
            prevBtn.style.opacity = this.currentCard === 0 ? '0.5' : '1';
        }

        if (nextBtn) {
            console.log('Setting Next button visible');
            nextBtn.style.display = 'block';
            nextBtn.style.visibility = 'visible';
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
            
            if (this.currentCard === totalCards - 1) {
                nextBtn.textContent = 'Complete Lesson';
            } else {
                nextBtn.textContent = 'Next';
            }
            console.log('Next button text:', nextBtn.textContent);
        } else {
            console.error('ERROR: Next button not found!');
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    getVisualHtml(visual) {
        if (!visual) return '';
        const svg = typeof visual === 'string' ? visual : visual.svg;
        const caption = typeof visual === 'object' ? visual.caption : '';
        if (!svg) return '';
        return `<div class="visual-diagram" style="margin-top:1.5rem;">${svg}</div>${caption ? `<p class="visual-caption">${caption}</p>` : ''}`;
    }

    renderCard(card) {
        const badgeColors = {
            intro: '#6366f1',
            concept: '#8b5cf6',
            visual: '#3b82f6',
            example: '#10b981',
            quote: '#ec4899',
            application: '#f59e0b',
            quiz: '#ef4444'
        };

        const badgeColor = badgeColors[card.type] || '#6366f1';

        let html = `<div class="lesson-card active">`;

        // Type badge
        html += `<span class="card-type-badge" style="background: ${badgeColor}">${card.type}</span>`;

        // Title
        if (card.title) {
            html += `<h2>${card.title}</h2>`;
        }

        // Main content based on type
        if (card.type === 'quote') {
            html += `
                <div class="quote-card">
                    "${card.content}"
                    ${card.author ? `<div style="margin-top: 1rem; text-align: right; font-style: normal; font-size: 1rem;">— ${card.author}</div>` : ''}
                </div>
                ${this.getVisualHtml(card.visual)}
            `;
        } else if (card.type === 'example') {
            html += `
                <div class="example-card">
                    <div class="example-label">Example</div>
                    ${this.formatContent(card.content)}
                    ${this.getVisualHtml(card.visual)}
                </div>
            `;
        } else if (card.type === 'visual') {
            html += `
                <div class="visual-card">
                    ${this.getVisualHtml(card.visual)}
                    ${card.content ? this.formatContent(card.content) : ''}
                </div>
            `;
        } else if (card.type === 'quiz' && card.options) {
            html += this.getVisualHtml(card.visual);
            html += this.renderQuiz(card);
        } else if (card.type === 'quiz' && card.content) {
            html += this.getVisualHtml(card.visual);
            html += this.renderContentQuiz(card);
        } else {
            html += this.formatContent(card.content);
            html += this.getVisualHtml(card.visual);
        }

        html += `</div>`;
        return html;
    }

    renderQuiz(card) {
        return `
            <div class="quiz-card">
                <div class="quiz-question">${card.question}</div>
                <div class="quiz-options">
                    ${card.options.map((option, index) => `
                        <div class="quiz-option" onclick="app.selectQuizOption(${index}, ${option.correct})" id="quiz-option-${index}">
                            ${option.text}
                        </div>
                    `).join('')}
                </div>
                <div id="quiz-explanation" style="display: none; margin-top: 1.5rem; padding: 1.5rem; background: var(--color-bg-secondary); border-radius: var(--radius-lg);">
                    <strong style="color: var(--color-success);">✓ Correct!</strong>
                    <p style="margin-top: 0.5rem; color: var(--color-text-secondary);">${card.explanation || ''}</p>
                </div>
            </div>
        `;
    }

    renderContentQuiz(card) {
        const content = (card.content || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        // Find correct answer letter anywhere in content
        const answerMatch = content.match(/answer:\s*\*{0,2}([A-D])\*{0,2}/i);
        const correctLetter = answerMatch ? answerMatch[1].toUpperCase() : null;

        // Find all option lines (A. / A) / **A)** formats)
        const optionRegex = /^[ \t]*\*{0,2}([A-D])[.)]\*{0,2}[ \t]+(.+)/gm;
        const parsedOptions = [];
        let m;
        while ((m = optionRegex.exec(content)) !== null) {
            parsedOptions.push({ letter: m[1].toUpperCase(), text: m[2].trim() });
        }
        if (parsedOptions.length === 0) return this.formatContent(content);

        // Question = everything before the first option line
        const firstOptPos = content.search(/^[ \t]*\*{0,2}[A-D][.)]/m);
        const questionRaw = content.substring(0, firstOptPos)
            .replace(/^#+\s+(Quiz\b.*|Question\s*\d*)\s*$/gim, '')
            .trim();

        // Explanation = everything after last option, minus the answer header
        const allMatches = [...content.matchAll(/^[ \t]*\*{0,2}[A-D][.)]\*{0,2}[ \t]+.+$/gm)];
        const lastM = allMatches[allMatches.length - 1];
        const afterOptions = lastM ? content.substring(lastM.index + lastM[0].length) : '';
        const explanationText = afterOptions
            .replace(/-{3,}/g, '')
            .replace(/\*\*Answer:[^*\n]*\*\*/gi, '')
            .replace(/^#+\s+Answer[^\n]*/gim, '')
            .replace(/^\*\*Explanation:\*\*\s*/im, '')
            .trim();

        this._cqId = (this._cqId || 0) + 1;
        const expId = `cq-explanation-${this._cqId}`;

        const optionsHtml = parsedOptions.map(({ letter, text }) => {
            const isCorrect = letter === correctLetter;
            return `<div class="quiz-option" data-correct="${isCorrect}" data-letter="${letter}" onclick="app.selectContentQuizOption(this, '${expId}')">
                <span style="font-weight:700;color:#3bafbf;margin-right:0.5rem">${letter})</span>${text}
            </div>`;
        }).join('');

        const visualHtml = this.getVisualHtml(card.visual);

        return `
            <div class="quiz-card">
                <div class="quiz-question">${this.formatContent(questionRaw)}</div>
                <div class="quiz-options">${optionsHtml}</div>
                <div id="${expId}" style="display:none;margin-top:1.5rem;padding:1.5rem;background:var(--color-bg-secondary);border-radius:var(--radius-lg)">
                    <strong class="exp-result" style="color:var(--color-success)">✓ Correct!</strong>
                    <div style="margin-top:0.75rem;color:var(--color-text-secondary)">${this.formatContent(explanationText)}</div>
                </div>
                ${visualHtml}
            </div>`;
    }

    selectContentQuizOption(el, explanationId) {
        const isCorrect = el.dataset.correct === 'true';
        const optionsContainer = el.closest('.quiz-options');
        optionsContainer.querySelectorAll('.quiz-option').forEach(opt => {
            opt.style.pointerEvents = 'none';
            if (opt.dataset.correct === 'true') opt.classList.add('correct');
        });
        if (!isCorrect) el.classList.add('incorrect');

        const exp = document.getElementById(explanationId);
        if (exp) {
            exp.style.display = 'block';
            const label = exp.querySelector('.exp-result');
            if (!isCorrect && label) {
                label.textContent = '✗ Incorrect — see explanation below';
                label.style.color = 'var(--color-error, #ef4444)';
            }
        }

        if (!isCorrect && this.currentBook && this.currentLesson) {
            const stripPrefix = (text) => text.trim().replace(/^[A-D]\)\s*/, '').trim();
            const questionText = el.closest('.quiz-card')?.querySelector('.quiz-question')?.textContent.trim() || '';
            const options = [...optionsContainer.querySelectorAll('.quiz-option')].map(opt => ({
                text: stripPrefix(opt.textContent),
                correct: opt.dataset.correct === 'true'
            }));
            const correctOpt = options.find(o => o.correct);
            this.logMistake({
                source: 'lesson',
                bookId: this.currentBook.id,
                bookTitle: this.currentBook.title,
                lessonId: this.currentLesson.id,
                lessonTitle: this.currentLesson.title,
                question: questionText,
                options,
                chosenText: stripPrefix(el.textContent),
                correctText: correctOpt ? correctOpt.text : '',
                explanation: exp?.querySelector('div')?.textContent.trim() || ''
            });
        }
    }

    selectQuizOption(index, isCorrect) {
        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.style.pointerEvents = 'none';
        });

        const selectedOption = document.getElementById(`quiz-option-${index}`);

        if (isCorrect) {
            selectedOption.classList.add('correct');
            document.getElementById('quiz-explanation').style.display = 'block';

            // Record perfect quiz result via gamification
            if (window.gamification && this.currentBook && this.currentLesson) {
                window.gamification.recordQuizResult(
                    this.currentBook.id,
                    this.currentLesson.id,
                    1, // got it right
                    1  // out of 1
                );
            }
        } else {
            selectedOption.classList.add('incorrect');
            const card = this.currentLesson.cards[this.currentCard];
            // Show correct answer
            document.querySelectorAll('.quiz-option').forEach((opt, i) => {
                if (card.options[i].correct) {
                    opt.classList.add('correct');
                }
            });

            // Record failed quiz result
            if (window.gamification && this.currentBook && this.currentLesson) {
                window.gamification.recordQuizResult(
                    this.currentBook.id,
                    this.currentLesson.id,
                    0, // got it wrong
                    1  // out of 1
                );
            }

            if (this.currentBook && this.currentLesson) {
                const correctOpt = card.options.find(o => o.correct);
                this.logMistake({
                    source: 'lesson',
                    bookId: this.currentBook.id,
                    bookTitle: this.currentBook.title,
                    lessonId: this.currentLesson.id,
                    lessonTitle: this.currentLesson.title,
                    question: card.question,
                    options: card.options,
                    chosenText: card.options[index].text,
                    correctText: correctOpt ? correctOpt.text : '',
                    explanation: card.explanation || ''
                });
            }
        }
    }

    formatContent(content) {
        if (!content) return '';
        content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        const inlineFormat = (text) => text
            .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code style="background:#1c2833;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.9em">$1</code>');

        const lines = content.split('\n');
        let html = '';
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];
            const trimmed = line.trim();

            // Headings
            if (/^#{1,6}\s/.test(trimmed)) {
                const level = trimmed.match(/^(#+)/)[1].length;
                const text = inlineFormat(trimmed.replace(/^#+\s+/, ''));
                const sizes = ['2em','1.5em','1.2em','1.1em','1em','1em'];
                const margins = ['1.2rem 0 0.5rem','1rem 0 0.4rem','0.8rem 0 0.3rem','0.6rem 0 0.2rem','0.5rem 0 0.2rem','0.5rem 0 0.2rem'];
                html += `<h${level} style="font-size:${sizes[level-1]};margin:${margins[level-1]};color:#e8e8e8;font-weight:700">${text}</h${level}>`;
                i++; continue;
            }

            // Horizontal rule
            if (/^---+$/.test(trimmed) || /^\*\*\*+$/.test(trimmed)) {
                html += `<hr style="border:none;border-top:1px solid #2a3545;margin:1rem 0">`;
                i++; continue;
            }

            // Blockquote
            if (trimmed.startsWith('>')) {
                let bqLines = [];
                while (i < lines.length && lines[i].trim().startsWith('>')) {
                    bqLines.push(inlineFormat(lines[i].trim().replace(/^>\s?/, '')));
                    i++;
                }
                html += `<blockquote style="border-left:4px solid #3bafbf;padding:0.5rem 1rem;margin:0.8rem 0;background:#1c2833;border-radius:0 8px 8px 0;color:#a8b2c1;font-style:italic">${bqLines.join('<br>')}</blockquote>`;
                continue;
            }

            // Table
            if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
                let tableLines = [];
                while (i < lines.length && lines[i].trim().startsWith('|')) {
                    tableLines.push(lines[i].trim());
                    i++;
                }
                const isSeparator = (row) => /^\|[\s\-:|]+\|$/.test(row);
                let tableHtml = `<div style="overflow-x:auto;margin:0.8rem 0"><table style="border-collapse:collapse;width:100%;font-size:0.9em">`;
                let inBody = false;
                for (const row of tableLines) {
                    if (isSeparator(row)) { inBody = true; continue; }
                    const cells = row.split('|').slice(1, -1).map(c => c.trim());
                    const tag = !inBody ? 'th' : 'td';
                    const style = !inBody
                        ? 'background:#1c2833;color:#3bafbf;padding:8px 12px;text-align:left;font-weight:700;border:1px solid #2a3545'
                        : 'padding:7px 12px;border:1px solid #2a3545;color:#e8e8e8;vertical-align:top';
                    tableHtml += `<tr>${cells.map(c => `<${tag} style="${style}">${inlineFormat(c)}</${tag}>`).join('')}</tr>`;
                }
                tableHtml += `</table></div>`;
                html += tableHtml;
                continue;
            }

            // Unordered list
            if (/^[-•*]\s/.test(trimmed)) {
                let listHtml = `<ul style="margin:0.5rem 0 0.5rem 1.2rem;padding:0">`;
                while (i < lines.length && /^[-•*]\s/.test(lines[i].trim())) {
                    listHtml += `<li style="margin:0.25rem 0;color:#e8e8e8">${inlineFormat(lines[i].trim().replace(/^[-•*]\s+/, ''))}</li>`;
                    i++;
                }
                listHtml += `</ul>`;
                html += listHtml;
                continue;
            }

            // Ordered list
            if (/^\d+\.\s/.test(trimmed)) {
                let listHtml = `<ol style="margin:0.5rem 0 0.5rem 1.2rem;padding:0">`;
                while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
                    listHtml += `<li style="margin:0.25rem 0;color:#e8e8e8">${inlineFormat(lines[i].trim().replace(/^\d+\.\s+/, ''))}</li>`;
                    i++;
                }
                listHtml += `</ol>`;
                html += listHtml;
                continue;
            }

            // Empty line
            if (trimmed === '') {
                i++; continue;
            }

            // Plain paragraph
            html += `<p style="margin:0.4rem 0;color:#e8e8e8;line-height:1.6">${inlineFormat(trimmed)}</p>`;
            i++;
        }

        return html;
    }

    previousCard() {
        if (this.currentCard > 0) {
            this.currentCard--;
            this.renderLesson();
            this.saveCurrentView();
        }
    }

    nextCard() {
        const totalCards = this.currentLesson.cards.length;

        if (this.currentCard < totalCards - 1) {
            this.currentCard++;
            this.renderLesson();
            this.saveCurrentView();
        } else {
            // Complete lesson
            this.completeLesson();
        }
    }

    completeLesson() {
        // Mark lesson as completed — both in-memory (used for the lesson list
        // UI within this session) and in the user store (which is the only
        // thing saveProgress persists across reloads).
        this.currentLesson.completed = true;
        if (!APP_DATA.user) APP_DATA.user = {};
        if (!APP_DATA.user.lessonCompletions) APP_DATA.user.lessonCompletions = {};
        const lessonKey = this.currentBook.id + '::' + this.currentLesson.id;
        if (!APP_DATA.user.lessonCompletions[lessonKey]) {
            APP_DATA.user.lessonCompletions[lessonKey] = new Date().toISOString();
            this._glossaryTerms = null; // newly-completed lesson may add glossary terms
        }

        // Update book progress
        const completedLessons = this.currentBook.lessonList.filter(l => l.completed).length;
        this.currentBook.progress = Math.round((completedLessons / this.currentBook.lessonList.length) * 100);

        // Update user stats
        APP_DATA.user.totalLearningTime += (this.currentLesson.duration || 11);

        // Check if book is completed
        const bookJustCompleted = this.currentBook.progress === 100 && completedLessons === this.currentBook.lessonList.length;
        if (bookJustCompleted) {
            APP_DATA.user.booksCompleted++;
        }

        // Save progress
        saveProgress();

        // Award XP and update challenges via gamification system
        if (window.gamification) {
            // Record study session (updates challenges and stats)
            window.gamification.recordStudySession(
                this.currentLesson.duration,
                this.currentBook.category,
                1 // 1 lesson completed
            );

            // Award lesson completion XP
            window.gamification.awardXP(
                APP_DATA.user.xpRewards.lessonComplete,
                `Completed: ${this.currentLesson.title}`
            );

            // Bonus XP for completing a book
            if (bookJustCompleted) {
                window.gamification.awardXP(
                    APP_DATA.user.xpRewards.bookComplete,
                    `Book Complete: ${this.currentBook.title}! 📚`
                );
            }

            // Generate flashcards from this lesson
            window.gamification.addFlashcardsFromLesson(this.currentBook.id, this.currentLesson);

            // Check all badges
            window.gamification.checkBadges();

            // Update header display
            this.updateHeaderXP();
        }

        // Show completion message with styled modal
        const xpEarned = APP_DATA.user.xpRewards.lessonComplete + (bookJustCompleted ? APP_DATA.user.xpRewards.bookComplete : 0);
        this.showLessonCompleteModal(this.currentLesson.title, xpEarned, this.currentBook.progress, bookJustCompleted, this.currentBook.id, this.currentLesson.id);
    }

    showLessonCompleteModal(lessonTitle, xpEarned, bookProgress, bookCompleted, bookId, lessonId) {
        // Does this lesson have a gating quiz? (curriculum lessons)
        const hasQuiz = !!(window.examCenter && window.examCenter.lessonHasContent(
            (getBookById(bookId)?.lessonList || []).find(l => String(l.id) === String(lessonId)) || {}
        ));
        const alreadyPassed = !!(window.examCenter && window.examCenter.isLessonPassed(bookId, lessonId));
        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'lesson-complete-modal';
        modal.innerHTML = `
            <div class="lesson-complete-content">
                <div class="lesson-complete-icon">🎉</div>
                <h2 class="lesson-complete-title">Lesson Complete!</h2>
                <p class="lesson-complete-subtitle">You've finished "${lessonTitle}"</p>

                <div class="lesson-complete-xp-container">
                    <div class="lesson-complete-xp">+${xpEarned} XP</div>
                    <div class="lesson-complete-xp-label">Experience Earned</div>
                </div>

                <div class="lesson-complete-progress">
                    <div class="lesson-complete-progress-label">Book Progress</div>
                    <div class="lesson-complete-progress-bar">
                        <div class="lesson-complete-progress-fill" style="width: ${bookProgress}%"></div>
                    </div>
                    <div class="lesson-complete-progress-text">${bookProgress}% Complete</div>
                </div>

                ${bookCompleted ? '<div class="lesson-complete-bonus">📚 Book Completed! Bonus XP Earned!</div>' : ''}

                ${hasQuiz && !alreadyPassed ? '<div class="lesson-complete-bonus" style="background:rgba(99,102,241,0.18);color:#c7d2fe;">📝 Pass the lesson quiz (80%) to unlock the next lesson.</div>' : ''}

                ${hasQuiz && !alreadyPassed ? '<button class="lesson-complete-btn lesson-complete-quiz-btn" style="background:#6366f1;margin-bottom:0.6rem;">Take Quiz to Unlock Next →</button>' : ''}
                <button class="lesson-complete-btn">Continue</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Trigger animation with slight delay to ensure transition
        setTimeout(() => {
            modal.classList.add('active');
        }, 50);

        // Handle continue button click
        const continueBtn = modal.querySelector('.lesson-complete-btn:not(.lesson-complete-quiz-btn)');
        const self = this;
        continueBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                // Return to book view showing all lessons
                self.showBook(bookId);
            }, 300);
        });

        // Handle "Take Quiz" button — launch the gating lesson quiz
        const quizBtn = modal.querySelector('.lesson-complete-quiz-btn');
        if (quizBtn) {
            quizBtn.addEventListener('click', function() {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                    self.switchView('exam');
                    window.examCenter.startLessonQuiz(bookId, lessonId);
                }, 300);
            });
        }
    }

    startDailyLesson() {
        // Use the lesson selected by updateDailyInsight
        if (this.todayInsightLesson) {
            this.startLesson(this.todayInsightLesson.bookId, this.todayInsightLesson.lessonId);
        } else {
            // Fallback: find any lesson with content
            for (const category of APP_DATA.categories) {
                for (const book of category.books) {
                    if (book.lessonList) {
                        const lessonWithContent = book.lessonList.find(l => l.cards && l.cards.length > 0);
                        if (lessonWithContent) {
                            this.startLesson(book.id, lessonWithContent.id);
                            return;
                        }
                    }
                }
            }
            toast('No lessons available yet. Check back soon!', 'info');
        }
    }

    renderProfile() {
        this.renderStreakReminderControls();
        this.renderMyNotes();
        this.renderMistakesLog();
        this.renderAiTutorSettings();
        this.renderAccessibilityControls();

        // Render gamification stats overview
        if (window.gamification) {
            window.gamification.renderStatsOverview();
            window.gamification.renderHeatMap();
            window.gamification.renderBadges();
        } else {
            // Fallback if gamification not loaded
            const html = `
                <div class="profile-stats-grid">
                    <div class="profile-stat-card">
                        <span class="profile-stat-value">${APP_DATA.user.booksCompleted}</span>
                        <span class="profile-stat-label">Books Completed</span>
                    </div>
                    <div class="profile-stat-card">
                        <span class="profile-stat-value">${APP_DATA.user.currentStreak || 0}</span>
                        <span class="profile-stat-label">Day Streak</span>
                    </div>
                    <div class="profile-stat-card">
                        <span class="profile-stat-value">${Math.round(APP_DATA.user.totalLearningTime / 60)}</span>
                        <span class="profile-stat-label">Hours Learned</span>
                    </div>
                    <div class="profile-stat-card">
                        <span class="profile-stat-value">${getBooksInProgress().length}</span>
                        <span class="profile-stat-label">In Progress</span>
                    </div>
                </div>

                <div class="achievements-section">
                    <h2>Achievements</h2>
                    <div class="achievements-grid">
                        ${APP_DATA.user.achievements.map(achievement => `
                            <div class="achievement-badge ${!achievement.unlocked ? 'locked' : ''}">
                                <span class="achievement-icon">${achievement.icon}</span>
                                <div class="achievement-name">${achievement.name}</div>
                                <div class="achievement-description">${achievement.description}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-top: 3rem; padding: 2rem; background: var(--color-bg-secondary); border-radius: var(--radius-xl);">
                    <h3 style="margin-bottom: 1rem;">Learning Goal</h3>
                    <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem;">${APP_DATA.user.currentGoal}</p>
                    <button class="btn-primary" style="width: 100%;">Update Goal</button>
                </div>
            `;

            document.getElementById('profile-content').innerHTML = html;
        }
    }

    showSearch() {
        // Build the search overlay once, then reuse it
        let overlay = document.getElementById('search-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'search-overlay';
            overlay.innerHTML = `
                <style>
                    #search-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:9999; display:flex; align-items:flex-start; justify-content:center; padding-top:8vh; }
                    #search-overlay .search-modal { background:var(--color-bg, #fff); width:min(640px, 92vw); max-height:80vh; border-radius:16px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 24px 60px rgba(0,0,0,0.4); }
                    #search-overlay .search-input-row { display:flex; align-items:center; gap:12px; padding:18px 22px; border-bottom:1px solid rgba(0,0,0,0.08); }
                    #search-overlay .search-input-row svg { flex-shrink:0; opacity:0.5; }
                    #search-overlay input { flex:1; border:none; outline:none; font-size:1.05rem; background:transparent; color:var(--color-text, #111); }
                    #search-overlay .search-close { background:none; border:none; font-size:1.4rem; cursor:pointer; color:var(--color-text-secondary, #666); padding:4px 8px; }
                    #search-overlay .search-results { overflow-y:auto; padding:8px 0; flex:1; }
                    #search-overlay .search-result-item { padding:12px 22px; cursor:pointer; transition:background 0.15s; }
                    #search-overlay .search-result-item:hover { background:rgba(0,0,0,0.04); }
                    #search-overlay .search-result-title { font-weight:600; color:var(--color-text, #111); margin:0 0 2px; font-size:0.95rem; }
                    #search-overlay .search-result-meta { color:var(--color-text-secondary, #666); font-size:0.82rem; }
                    #search-overlay .search-empty { text-align:center; padding:32px 22px; color:var(--color-text-secondary, #666); font-size:0.9rem; }
                </style>
                <div class="search-modal" onclick="event.stopPropagation()">
                    <div class="search-input-row">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
                        <input id="search-input" type="text" placeholder="Search books and authors..." autocomplete="off">
                        <button class="search-close" onclick="app.closeSearch()" aria-label="Close">&times;</button>
                    </div>
                    <div class="search-results" id="search-results">
                        <div class="search-empty">Start typing to search ${getAllBooks().length} books</div>
                    </div>
                </div>
            `;
            overlay.addEventListener('click', () => this.closeSearch());
            document.body.appendChild(overlay);
            const input = overlay.querySelector('#search-input');
            input.addEventListener('input', (e) => this.renderSearchResults(e.target.value));
            input.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeSearch(); });
        }
        overlay.style.display = 'flex';
        setTimeout(() => document.getElementById('search-input').focus(), 50);
    }

    closeSearch() {
        const overlay = document.getElementById('search-overlay');
        if (overlay) {
            overlay.style.display = 'none';
            const input = document.getElementById('search-input');
            if (input) input.value = '';
        }
    }

    renderSearchResults(query) {
        const results = document.getElementById('search-results');
        const q = (query || '').trim().toLowerCase();
        if (!q) {
            results.innerHTML = `<div class="search-empty">Start typing to search ${getAllBooks().length} books</div>`;
            return;
        }

        const scored = [];
        const seenBookIds = new Set(); // some books are cross-listed in multiple categories
        for (const b of getAllBooks()) {
            if (seenBookIds.has(b.id)) continue;
            seenBookIds.add(b.id);
            const title = (b.title || '').toLowerCase();
            const author = (b.author || '').toLowerCase();
            const description = (b.description || '').toLowerCase();
            let score = 0;
            let matchedLesson = null;

            if (title === q) score = 100;
            else if (title.startsWith(q)) score = 90;
            else if (title.includes(q)) score = 70;
            else {
                const lesson = (b.lessonList || []).find(l => (l.title || '').toLowerCase().includes(q));
                if (lesson) { score = 60; matchedLesson = lesson; }
                else if (author.includes(q)) score = 50;
                else if (description.includes(q)) score = 30;
            }

            // Typo-tolerant fallback: every character of the query appears in
            // order somewhere in the title (a cheap subsequence match, not
            // true semantic search, but catches "thnking fast slow" ->
            // "Thinking, Fast and Slow" without needing an embeddings API).
            if (score === 0 && q.length >= 3 && this.fuzzySubsequenceMatch(title, q)) {
                score = 10;
            }

            if (score > 0) scored.push({ book: b, score, matchedLesson });
        }

        scored.sort((a, b) => b.score - a.score);
        const matches = scored.slice(0, 25);

        if (matches.length === 0) {
            results.innerHTML = `<div class="search-empty">No books match "${escapeHtml(query)}"</div>`;
            return;
        }
        results.innerHTML = matches.map(({ book: b, matchedLesson }) => `
            <div class="search-result-item" onclick="app.closeSearch(); app.showBook('${b.id}')">
                <div class="search-result-title">${escapeHtml(b.title || '')}</div>
                <div class="search-result-meta">${escapeHtml(b.author || '')} &middot; ${b.lessons || 0} lessons${matchedLesson ? ` &middot; found in "${escapeHtml(matchedLesson.title)}"` : ''}</div>
            </div>
        `).join('');
    }

    // Subsequence match: every character of `query` appears in `text` in
    // order (not necessarily adjacent) — cheap typo/fuzzy tolerance with no
    // external dependency.
    fuzzySubsequenceMatch(text, query) {
        let ti = 0;
        for (let qi = 0; qi < query.length; qi++) {
            ti = text.indexOf(query[qi], ti);
            if (ti === -1) return false;
            ti++;
        }
        return true;
    }

    // ============================================
    // FULL APP RESET
    // ============================================
    confirmReset() {
        const confirmed = confirm(
            '⚠️ FULL APP RESET\n\n' +
            'This will permanently delete ALL your progress:\n\n' +
            '• XP and Level (back to Level 1)\n' +
            '• Day Streak (back to 0)\n' +
            '• All completed lessons\n' +
            '• All badges and achievements\n' +
            '• Flashcard progress\n' +
            '• Workout history\n' +
            '• Vision board and journal entries\n\n' +
            'Are you sure you want to start fresh?'
        );

        if (confirmed) {
            const doubleConfirm = confirm(
                '🔴 FINAL CONFIRMATION\n\n' +
                'This action CANNOT be undone!\n\n' +
                'Click OK to reset everything to Day 0.'
            );

            if (doubleConfirm) {
                this.performReset();
            }
        }
    }

    performReset() {
        // Call the reset function from data.js
        if (typeof resetAllProgress === 'function') {
            resetAllProgress();

            // Update UI elements
            this.updateStreak();
            this.updateHeaderXP();

            // Refresh gamification if loaded
            if (window.gamification) {
                window.gamification.generateDailyChallenges();
                window.gamification.renderDailyChallenges();
            }

            // Show success message
            toast('✅ RESET COMPLETE!\n\n' +
                'Your app has been reset to Day 0.\n\n' +
                '• All progress cleared\n' +
                '• All lessons unmarked\n' +
                '• Starting fresh!\n\n' +
                'The page will now reload.', 'success');

            // Reload the page to ensure clean state
            window.location.reload();
        } else {
            toast('Error: Reset function not found. Please refresh the page and try again.', 'error');
        }
    }

    // ============================================
    // BACKUP & RESTORE (export/import progress as a JSON file)
    // ============================================
    // Progress lives only in this browser's localStorage unless the user
    // signs in with Google (see firebase-sync.js). This is the safety net
    // for everyone else: a manual download/restore so clearing browser
    // data, switching browsers, or moving to a new device doesn't mean
    // losing every completed lesson, journal entry, and reflection.
    exportData() {
        const raw = localStorage.getItem('synthesisProgress');
        if (!raw) {
            toast('No progress to export yet — complete a lesson first!', 'info');
            return;
        }

        const blob = new Blob([raw], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const dateStr = new Date().toISOString().split('T')[0];
        const a = document.createElement('a');
        a.href = url;
        a.download = `synthesis-backup-${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        toast('📦 Backup downloaded! Keep it somewhere safe.', 'success');
    }

    triggerImport() {
        document.getElementById('backup-import-input')?.click();
    }

    importData(fileInput) {
        const file = fileInput.files && fileInput.files[0];
        fileInput.value = ''; // allow re-selecting the same file later
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            let parsed;
            try {
                parsed = JSON.parse(e.target.result);
            } catch (err) {
                toast('That file isn\'t valid backup data.', 'error');
                return;
            }
            if (!parsed || typeof parsed !== 'object' || !parsed.user) {
                toast('That file doesn\'t look like a Synthesis backup.', 'error');
                return;
            }
            if (!confirm('Import this backup? It will replace your current progress on this device — this cannot be undone.')) {
                return;
            }

            localStorage.setItem('synthesisProgress', JSON.stringify(parsed));
            if (typeof loadProgress === 'function') loadProgress();
            this.rehydrateLessonCompletions();
            toast('✅ Backup restored! Reloading…', 'success');
            setTimeout(() => window.location.reload(), 1200);
        };
        reader.onerror = () => toast('Could not read that file.', 'error');
        reader.readAsText(file);
    }

    // MBC track helpers — when the user is anywhere in the Medical Billing,
    // Coding & HIM Track, the "back" buttons land them on the course hub
    // rather than the global home.
    isMBCBook(bookId) {
        const cat = APP_DATA.categories.find(c => c.id === 'medical-billing-coding');
        return !!(cat && cat.books && cat.books.some(b => b.id === bookId));
    }

    goToMBCHub() {
        const cat = APP_DATA.categories.find(c => c.id === 'medical-billing-coding');
        if (!cat) { this.switchView('home'); return; }
        this.currentCategory = cat;
        this.showCategory('medical-billing-coding');
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

    getBookInitials(title) {
        return title
            .split(' ')
            .filter(word => word.length > 2)
            .slice(0, 2)
            .map(word => word[0])
            .join('');
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SynthesisApp();
});
