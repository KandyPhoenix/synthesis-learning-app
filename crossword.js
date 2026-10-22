// ============================================
// SYNTHESIS — CROSSWORD PUZZLES
// An expansive crossword section that ties together every learning strand
// in the app — philosophy, physics, anatomy, history, psychology, business,
// health and more. Puzzles come in two flavors:
//   1. Curated themed puzzles, hand-authored across Easy / Medium / Hard.
//   2. "Library Mix" puzzles generated at runtime from the quiz questions of
//      EVERY book in APP_DATA, so the crosswords literally combine all parts
//      of the learning content.
//
// A self-contained crossword LAYOUT GENERATOR interlocks any word/clue list
// into a numbered grid (across + down), and an interactive PLAYER renders the
// grid, handles typing / keyboard navigation, checking, reveals, a timer, and
// awards XP on completion. Progress, best times, and solved state persist in
// APP_DATA.user.crossword via the existing saveProgress().
//
// Fully self-contained: only reads APP_DATA + a few tiny app.js/gamification
// hooks (saveProgress, escapeHtml, window.gamification, window.toast).
// ============================================

class CrosswordSystem {
    constructor(app) {
        this.app = app;
        this.current = null;       // active puzzle runtime state
        this._layoutCache = {};    // id:nonce -> generated layout
        this._libWords = null;     // cached library word bank
        this.libNonce = { easy: 0, medium: 0, hard: 0 };
        this.PUZZLES = this.buildCuratedLibrary();
        // Track-specific mega-puzzles come pre-built (layouts generated offline)
        // from separate data modules so the huge grids render instantly.
        this.himPuzzles = Array.isArray(window.CROSSWORD_HIM_PUZZLES) ? window.CROSSWORD_HIM_PUZZLES : [];
        this.himCoursePuzzles = Array.isArray(window.CROSSWORD_HIM_COURSE_PUZZLES) ? window.CROSSWORD_HIM_COURSE_PUZZLES : [];
        this.apPuzzles = Array.isArray(window.CROSSWORD_AP_PUZZLES) ? window.CROSSWORD_AP_PUZZLES : [];
        this.pathoPuzzles = Array.isArray(window.CROSSWORD_PATHO_PUZZLES) ? window.CROSSWORD_PATHO_PUZZLES : [];
        this.philPuzzles = Array.isArray(window.CROSSWORD_PHIL_PUZZLES) ? window.CROSSWORD_PHIL_PUZZLES : [];
        this.histPuzzles = Array.isArray(window.CROSSWORD_HIST_PUZZLES) ? window.CROSSWORD_HIST_PUZZLES : [];
        this.sciPuzzles = Array.isArray(window.CROSSWORD_SCI_PUZZLES) ? window.CROSSWORD_SCI_PUZZLES : [];
        this.mathPuzzles = Array.isArray(window.CROSSWORD_MATH_PUZZLES) ? window.CROSSWORD_MATH_PUZZLES : [];
        this.geoPuzzles = Array.isArray(window.CROSSWORD_GEO_PUZZLES) ? window.CROSSWORD_GEO_PUZZLES : [];
        this.laPuzzles = Array.isArray(window.CROSSWORD_LA_PUZZLES) ? window.CROSSWORD_LA_PUZZLES : [];
        this.vocabPuzzles = Array.isArray(window.CROSSWORD_VOCAB_PUZZLES) ? window.CROSSWORD_VOCAB_PUZZLES : [];
        this.hwPuzzles = Array.isArray(window.CROSSWORD_HW_PUZZLES) ? window.CROSSWORD_HW_PUZZLES : [];
        this.stePuzzles = Array.isArray(window.CROSSWORD_STE_PUZZLES) ? window.CROSSWORD_STE_PUZZLES : [];
        this.bfPuzzles = Array.isArray(window.CROSSWORD_BF_PUZZLES) ? window.CROSSWORD_BF_PUZZLES : [];
        this.tracks = [
            { key: 'him', icon: '🏥', heading: 'HIM Track — Mega Puzzles', label: 'Health Information Management', puzzles: this.himPuzzles },
            // One puzzle per college course book (HITT/BIOL/HPRS/AHIMA), each
            // built from that book's own lessons — a per-course exam review.
            { key: 'himCourse', icon: '🎓', heading: 'HIM College Courses — Course Puzzles', label: 'One mega-puzzle per college course book', puzzles: this.himCoursePuzzles },
            { key: 'ap', icon: '🫀', heading: 'A&P Track — Mega Puzzles', label: 'Anatomy & Physiology', puzzles: this.apPuzzles },
            // Sits next to A&P deliberately: that track covers the healthy body,
            // this one is the disease layer on top of the same systems.
            { key: 'patho', icon: '🦠', heading: 'Pathophysiology Track — Mega Puzzles', label: 'Pathophysiology & Disease', puzzles: this.pathoPuzzles },
            { key: 'sci', icon: '🔬', heading: 'Science Track — Mega Puzzles', label: 'Science (all branches)', puzzles: this.sciPuzzles },
            { key: 'ste', icon: '🛠️', heading: 'Science, Technology & Engineering Track — Mega Puzzles', label: 'Science, Technology & Engineering (all types)', puzzles: this.stePuzzles },
            { key: 'math', icon: '🔢', heading: 'Math Track — Mega Puzzles', label: 'Math (all branches)', puzzles: this.mathPuzzles },
            { key: 'geo', icon: '🌍', heading: 'Geography Track — Mega Puzzles', label: 'Geography (all types)', puzzles: this.geoPuzzles },
            { key: 'la', icon: '📖', heading: 'Language Arts Track — Mega Puzzles', label: 'Language Arts (all types)', puzzles: this.laPuzzles },
            // Word study pulled together: the roots puzzle moved here out of
            // Language Arts, which now keeps to grammar, writing and literature.
            { key: 'vocab', icon: '📚', heading: 'Vocabulary Track — Mega Puzzles', label: 'Vocabulary & Word Study', puzzles: this.vocabPuzzles },
            { key: 'hw', icon: '🩺', heading: 'Health & Wellness Track — Mega Puzzles', label: 'Health & Wellness (all types)', puzzles: this.hwPuzzles },
            { key: 'bf', icon: '💼', heading: 'Business & Finance Track — Mega Puzzles', label: 'Business & Finance (all types)', puzzles: this.bfPuzzles },
            { key: 'phil', icon: '📜', heading: 'Philosophy Track — Mega Puzzles', label: 'Philosophy', puzzles: this.philPuzzles },
            { key: 'hist', icon: '🏛️', heading: 'History Track — Mega Puzzles', label: 'History', puzzles: this.histPuzzles },
        ].filter(t => t.puzzles.length);
        this.trackPuzzles = this.tracks.reduce((a, t) => a.concat(t.puzzles), []);
    }

    findPuzzle(id) {
        return this.PUZZLES.find(x => x.id === id) || this.trackPuzzles.find(x => x.id === id) || null;
    }

    // Rebuild the sol/numAt lookups for a pre-built (stored) layout that only
    // carries its across/down entries, to keep the data file compact.
    hydrateLayout(L) {
        if (L.sol && L.numAt) return L;
        const sol = {}, numAt = {};
        [...(L.across || []), ...(L.down || [])].forEach(e => {
            numAt[e.r + ',' + e.c] = e.num;
            e.cells.forEach((cell, i) => { sol[cell.r + ',' + cell.c] = e.answer[i]; });
        });
        L.sol = sol; L.numAt = numAt;
        return L;
    }

    // ---------- persistence ----------
    store() {
        if (!APP_DATA.user) APP_DATA.user = {};
        if (!APP_DATA.user.crossword) {
            APP_DATA.user.crossword = { solved: {}, best: {}, progress: {} };
        }
        const cw = APP_DATA.user.crossword;
        cw.solved = cw.solved || {};
        cw.best = cw.best || {};
        cw.progress = cw.progress || {};
        cw.pinned = cw.pinned || [];   // puzzle ids pinned to the home screen
        return cw;
    }
    save() { if (typeof saveProgress === 'function') saveProgress(); }

    // ---------- pin to home ----------
    isPinned(id) { return this.store().pinned.includes(id); }
    togglePin(id) {
        const cw = this.store();
        const i = cw.pinned.indexOf(id);
        if (i >= 0) cw.pinned.splice(i, 1);
        else cw.pinned.unshift(id);    // newest pin shows first
        this.save();
        // Update the button label in place (don't re-render the whole board).
        const btn = document.getElementById('cw-pin-btn');
        if (btn) btn.innerHTML = this.isPinned(id) ? '📌 Pinned' : '📌 Pin to Home';
        // Refresh the home teaser row so the pin shows up there.
        this.renderCrosswordHomeStrip();
        if (window.toast) window.toast(this.isPinned(id) ? '📌 Pinned to your home screen' : 'Unpinned from home', 'success');
    }

    // ---------- small utils ----------
    cleanWord(w) {
        return String(w || '').toUpperCase().replace(/[^A-Z]/g, '');
    }
    cleanClue(s) {
        return String(s || '')
            .replace(/\*\*/g, '').replace(/\*/g, '').replace(/`/g, '')
            .replace(/\s*\n+\s*/g, ' ').replace(/\s+/g, ' ').trim();
    }
    seededShuffle(arr, seed) {
        const a = arr.slice();
        let s = (seed >>> 0) || 1;
        const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(rnd() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    fmtTime(sec) {
        sec = Math.max(0, Math.floor(sec));
        const m = Math.floor(sec / 60), s = sec % 60;
        return m + ':' + String(s).padStart(2, '0');
    }
    diffMeta(d) {
        return ({
            easy:   { label: 'Easy',   color: '#10b981', icon: '🌱', xp: 30 },
            medium: { label: 'Medium', color: '#f59e0b', icon: '🔥', xp: 60 },
            hard:   { label: 'Hard',   color: '#ef4444', icon: '💎', xp: 110 },
        })[d] || { label: 'Puzzle', color: '#6366f1', icon: '🧩', xp: 40 };
    }

    // ============================================================
    // LAYOUT GENERATOR
    // Interlocks a list of {answer, clue} into a numbered crossword.
    // ============================================================
    generateLayout(rawWords, seed) {
        const words = [];
        const seen = new Set();
        rawWords.forEach(w => {
            const a = this.cleanWord(w.answer);
            if (a.length < 3 || a.length > 15) return;
            if (seen.has(a)) return;
            seen.add(a);
            words.push({ answer: a, clue: w.clue });
        });
        if (!words.length) return null;

        // Seeded shuffle for variety, then longest-first for a strong skeleton.
        let list = this.seededShuffle(words.map((_, i) => i), seed).map(i => words[i]);
        list.sort((a, b) => b.answer.length - a.answer.length);

        const grid = new Map();              // "r,c" -> letter
        const key = (r, c) => r + ',' + c;
        const letAt = (r, c) => grid.get(key(r, c));
        const placed = [];

        // Place the first (longest) word across the origin.
        const first = list[0];
        for (let i = 0; i < first.answer.length; i++) grid.set(key(0, i), first.answer[i]);
        placed.push({ answer: first.answer, clue: first.clue, r: 0, c: 0, dir: 'A' });

        const canPlace = (word, r, c, dir) => {
            const L = word.length;
            let crosses = 0;
            if (dir === 'A') {
                if (letAt(r, c - 1) || letAt(r, c + L)) return -1;
                for (let i = 0; i < L; i++) {
                    const cc = c + i, ch = letAt(r, cc);
                    if (ch) { if (ch !== word[i]) return -1; crosses++; }
                    else if (letAt(r - 1, cc) || letAt(r + 1, cc)) return -1;
                }
            } else {
                if (letAt(r - 1, c) || letAt(r + L, c)) return -1;
                for (let i = 0; i < L; i++) {
                    const rr = r + i, ch = letAt(rr, c);
                    if (ch) { if (ch !== word[i]) return -1; crosses++; }
                    else if (letAt(rr, c - 1) || letAt(rr, c + 1)) return -1;
                }
            }
            return crosses;
        };

        for (let wi = 1; wi < list.length; wi++) {
            const w = list[wi].answer;
            let best = null;
            for (const [k, ch] of grid) {
                const parts = k.split(','); const gr = +parts[0], gc = +parts[1];
                for (let i = 0; i < w.length; i++) {
                    if (w[i] !== ch) continue;
                    // Across: word sits on row gr, starting at col gc-i
                    let r = gr, c = gc - i, cr = canPlace(w, r, c, 'A');
                    if (cr > 0) {
                        const score = cr * 100 - (Math.abs(r) + Math.abs(c));
                        if (!best || score > best.score) best = { r, c, dir: 'A', score };
                    }
                    // Down: word sits on col gc, starting at row gr-i
                    r = gr - i; c = gc; cr = canPlace(w, r, c, 'D');
                    if (cr > 0) {
                        const score = cr * 100 - (Math.abs(r) + Math.abs(c));
                        if (!best || score > best.score) best = { r, c, dir: 'D', score };
                    }
                }
            }
            if (best) {
                const L = w.length;
                if (best.dir === 'A') for (let i = 0; i < L; i++) grid.set(key(best.r, best.c + i), w[i]);
                else for (let i = 0; i < L; i++) grid.set(key(best.r + i, best.c), w[i]);
                placed.push({ answer: w, clue: list[wi].clue, r: best.r, c: best.c, dir: best.dir });
            }
        }

        // Normalize to a 0-based grid.
        let minR = Infinity, minC = Infinity, maxR = -Infinity, maxC = -Infinity;
        for (const k of grid.keys()) {
            const p = k.split(','); const r = +p[0], c = +p[1];
            minR = Math.min(minR, r); minC = Math.min(minC, c);
            maxR = Math.max(maxR, r); maxC = Math.max(maxC, c);
        }
        const rows = maxR - minR + 1, cols = maxC - minC + 1;
        const sol = {};
        for (const [k, ch] of grid) {
            const p = k.split(','); sol[(+p[0] - minR) + ',' + (+p[1] - minC)] = ch;
        }
        const norm = placed.map(p => ({ answer: p.answer, clue: p.clue, r: p.r - minR, c: p.c - minC, dir: p.dir }));
        return this.numberGrid(sol, norm, rows, cols);
    }

    numberGrid(sol, placements, rows, cols) {
        const isFilled = (r, c) => sol[r + ',' + c] !== undefined;
        let num = 0;
        const numAt = {};
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!isFilled(r, c)) continue;
                const startA = !isFilled(r, c - 1) && isFilled(r, c + 1);
                const startD = !isFilled(r - 1, c) && isFilled(r + 1, c);
                if (startA || startD) { num++; numAt[r + ',' + c] = num; }
            }
        }
        const across = [], down = [];
        placements.forEach(p => {
            const n = numAt[p.r + ',' + p.c];
            const cells = [];
            for (let i = 0; i < p.answer.length; i++) {
                cells.push(p.dir === 'A' ? { r: p.r, c: p.c + i } : { r: p.r + i, c: p.c });
            }
            const entry = { num: n, clue: p.clue, answer: p.answer, cells, r: p.r, c: p.c, dir: p.dir };
            (p.dir === 'A' ? across : down).push(entry);
        });
        across.sort((a, b) => a.num - b.num);
        down.sort((a, b) => a.num - b.num);

        // Crossing count for layout scoring.
        let crossings = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!isFilled(r, c)) continue;
                const h = isFilled(r, c - 1) || isFilled(r, c + 1);
                const v = isFilled(r - 1, c) || isFilled(r + 1, c);
                if (h && v) crossings++;
            }
        }
        return { rows, cols, sol, numAt, across, down, crossings, placedCount: across.length + down.length };
    }

    // Best-of several seeds: prefer more words placed, then more crossings, then compactness.
    buildLayout(id, words, nonce) {
        const cacheKey = id + ':' + (nonce || 0);
        if (this._layoutCache[cacheKey]) return this._layoutCache[cacheKey];
        let best = null;
        for (let s = 0; s < 14; s++) {
            const layout = this.generateLayout(words, (nonce || 0) * 9173 + s * 131 + 17);
            if (!layout) continue;
            const score = layout.placedCount * 100000 + layout.crossings * 500 - layout.rows * layout.cols;
            if (!best || score > best.score) best = { layout, score };
        }
        const layout = best ? best.layout : null;
        this._layoutCache[cacheKey] = layout;
        return layout;
    }

    // ============================================================
    // LIBRARY MIX — pull single-word answers from every book's quizzes
    // ============================================================
    buildLibraryWords() {
        if (this._libWords) return this._libWords;
        const out = [];
        const seen = new Set();
        (APP_DATA.categories || []).forEach(cat => {
            (cat.books || []).forEach(book => {
                (book.lessonList || []).forEach(lesson => {
                    (lesson.cards || []).forEach(card => {
                        if (card.type !== 'quiz' || !card.question || !Array.isArray(card.options)) return;
                        const correct = card.options.find(o => o && o.correct);
                        if (!correct || typeof correct.text !== 'string') return;
                        const trimmed = correct.text.trim();
                        if (trimmed.split(/\s+/).length > 1) return;   // single word only
                        const ans = this.cleanWord(trimmed);
                        if (ans.length < 3 || ans.length > 13) return;
                        if (seen.has(ans)) return;
                        seen.add(ans);
                        // Blank out the answer if it leaks into the question.
                        let clue = this.cleanClue(card.question);
                        const re = new RegExp('\\b' + trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'ig');
                        clue = clue.replace(re, '_____');
                        if (clue.length > 120) clue = clue.slice(0, 117).replace(/\s+\S*$/, '') + '…';
                        out.push({ answer: ans, clue, cat: cat.name });
                    });
                });
            });
        });
        this._libWords = out;
        return out;
    }

    libraryPuzzle(difficulty) {
        const cfg = ({
            easy:   { min: 3, max: 6,  feed: 16 },
            medium: { min: 4, max: 9,  feed: 24 },
            hard:   { min: 4, max: 13, feed: 36 },
        })[difficulty] || { min: 3, max: 13, feed: 24 };
        const pool = this.buildLibraryWords().filter(w => w.answer.length >= cfg.min && w.answer.length <= cfg.max);
        const nonce = this.libNonce[difficulty] || 0;
        const shuffled = this.seededShuffle(pool.map((_, i) => i), 4242 + nonce * 7).map(i => pool[i]);
        const words = shuffled.slice(0, cfg.feed);
        return { words, count: pool.length };
    }

    // ============================================================
    // MENU / HOME
    // ============================================================
    render() {
        const host = document.getElementById('crossword-content');
        if (!host) return;
        const cw = this.store();
        const solvedCount = Object.keys(cw.solved).filter(k => cw.solved[k]).length;
        const total = this.PUZZLES.length;

        const groups = [
            { d: 'easy',   title: '🌱 Easy',   sub: 'Warm up — common terms, smaller grids' },
            { d: 'medium', title: '🔥 Medium', sub: 'Step it up — bigger grids, richer vocabulary' },
            { d: 'hard',   title: '💎 Hard',   sub: 'Expert territory — advanced, specialized terms' },
        ];

        const cardsFor = (d) => this.PUZZLES.filter(p => p.difficulty === d).map(p => this.puzzleCard(p, cw)).join('');

        const libCard = (d) => {
            const meta = this.diffMeta(d);
            const id = 'lib-' + d;
            const best = cw.best[id];
            const solved = cw.solved[id];
            return `
                <button class="cw-card cw-lib-card" style="--cw-accent:${meta.color}" onclick="window.crossword.openLibrary('${d}')">
                    <div class="cw-card-top">
                        <span class="cw-card-icon">🎲</span>
                        <span class="cw-diff-pill" style="--cw-accent:${meta.color}">${meta.icon} ${meta.label}</span>
                    </div>
                    <div class="cw-card-title">Library Mix</div>
                    <div class="cw-card-desc">Fresh grid built from quizzes across every book</div>
                    <div class="cw-card-foot">
                        ${solved ? '<span class="cw-solved-tag">✓ Solved</span>' : '<span class="cw-card-meta">Randomized</span>'}
                        ${best ? `<span class="cw-card-meta">⏱ ${this.fmtTime(best)}</span>` : ''}
                    </div>
                </button>`;
        };

        // Track-specific mega-puzzles (100+ clues each), one section per track.
        const clueCount = p => p.wordCount || (p.layout ? (p.layout.across.length + p.layout.down.length) : 0);
        const trackSections = this.tracks.map(t => {
            const clues = t.puzzles.reduce((s, p) => s + clueCount(p), 0);
            return `
            <section class="cw-group cw-him-group">
                <div class="cw-group-head">
                    <h3>${t.icon} ${t.heading}</h3>
                    <span class="cw-group-sub">${t.label} only — ${clues.toLocaleString()} clues across ${t.puzzles.length} giant grids</span>
                </div>
                <div class="cw-grid-cards">
                    ${t.puzzles.map(p => this.trackCard(p, cw, t.icon)).join('')}
                </div>
            </section>`;
        }).join('');

        host.innerHTML = `
            <div class="cw-wrap">
                <div class="cw-intro">
                    <h2 class="cw-intro-title">🧩 Crossword Puzzles</h2>
                    <p class="cw-intro-sub">Test everything you've learned — philosophy, physics, anatomy, history, psychology, business and more — one interlocking grid at a time.</p>
                    <div class="cw-stat-row">
                        <div class="cw-stat"><span class="cw-stat-num">${solvedCount}</span><span class="cw-stat-lbl">Solved</span></div>
                        <div class="cw-stat"><span class="cw-stat-num">${total + this.trackPuzzles.length}</span><span class="cw-stat-lbl">Curated puzzles</span></div>
                        <div class="cw-stat"><span class="cw-stat-num">∞</span><span class="cw-stat-lbl">Library mixes</span></div>
                    </div>
                </div>

                ${trackSections}

                ${groups.map(g => `
                    <section class="cw-group">
                        <div class="cw-group-head">
                            <h3>${g.title}</h3>
                            <span class="cw-group-sub">${g.sub}</span>
                        </div>
                        <div class="cw-grid-cards">
                            ${cardsFor(g.d)}
                            ${libCard(g.d)}
                        </div>
                    </section>
                `).join('')}
            </div>
        `;
    }

    // Full-width teaser row on the home screen: a few puzzles across the
    // general set and each mega-track. app.renderHome() calls this.
    renderCrosswordHomeStrip() {
        const strip = document.getElementById('crossword-home-strip');
        if (!strip) return;
        const cw = this.store();
        const picks = [];
        const seen = new Set();
        const add = (p, pinned) => { if (p && !seen.has(p.id)) { picks.push({ p, pinned }); seen.add(p.id); } };
        // The strip has room for one puzzle per track, so which one it picks
        // decides what is reachable from the home page at all. Taking the first
        // of each track meant everything added afterwards — puzzles land at the
        // end — could never appear here. Rotate instead, so every puzzle gets
        // its turn. Keyed on the day so it is stable within a visit, and offset
        // by track index so the tracks don't all advance in lockstep.
        const day = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000);
        // Pinned puzzles first, in pin order, so what you're working on leads.
        (cw.pinned || []).forEach(id => add(this.findPuzzle(id), true));
        // A couple of quick general puzzles, rotating through the easy set...
        const easy = this.PUZZLES.filter(p => p.difficulty === 'easy');
        for (let i = 0; i < 2 && i < easy.length; i++) add(easy[(day + i) % easy.length], false);
        // ...then today's puzzle from each mega-track.
        this.tracks.forEach((t, ti) => {
            if (t.puzzles.length) add(t.puzzles[(day + ti) % t.puzzles.length], false);
        });
        if (!picks.length) { strip.innerHTML = ''; return; }
        strip.innerHTML = picks.slice(0, 12).map(({ p, pinned }) => {
            const meta = this.diffMeta(p.difficulty);
            const clues = p.wordCount || (p.layout ? (p.layout.across.length + p.layout.down.length) : (p.words ? p.words.length : 0));
            const solved = cw.solved[p.id];
            const inProgress = cw.progress && cw.progress[p.id] && Object.keys(cw.progress[p.id].grid || {}).length;
            const status = solved ? ' · ✓ solved' : (inProgress ? ' · resume' : '');
            return `
                <button class="cw-home-card ${pinned ? 'cw-home-pinned' : ''}" style="--cw-accent:${p.color || meta.color}" onclick="window.crossword.openPuzzle('${p.id}')">
                    <span class="cw-home-icon">${p.icon || '🧩'}${pinned ? '<span class="cw-home-pin">📌</span>' : ''}</span>
                    <span class="cw-home-title">${escapeHtml(p.title)}</span>
                    <span class="cw-home-meta">${clues} clues${status}</span>
                </button>`;
        }).join('');
    }

    trackCard(p, cw, trackIcon) {
        const meta = this.diffMeta(p.difficulty);
        const best = cw.best[p.id];
        const solved = cw.solved[p.id];
        const clues = p.wordCount || (p.layout ? (p.layout.across.length + p.layout.down.length) : 0);
        return `
            <button class="cw-card cw-him-card ${solved ? 'cw-card-solved' : ''}" style="--cw-accent:${p.color || meta.color}" onclick="window.crossword.openPuzzle('${p.id}')">
                <div class="cw-card-top">
                    <span class="cw-card-icon">${p.icon || trackIcon || '🧩'}</span>
                    <span class="cw-diff-pill" style="--cw-accent:${p.color || meta.color}">${trackIcon || '🧩'} ${clues} clues</span>
                </div>
                <div class="cw-card-title">${escapeHtml(p.title)}</div>
                <div class="cw-card-desc">${escapeHtml(p.desc || '')}</div>
                <div class="cw-card-foot">
                    ${solved ? '<span class="cw-solved-tag">✓ Solved</span>' : `<span class="cw-card-meta">${clues} across &amp; down</span>`}
                    ${best ? `<span class="cw-card-meta">⏱ ${this.fmtTime(best)}</span>` : ''}
                </div>
            </button>`;
    }

    puzzleCard(p, cw) {
        const meta = this.diffMeta(p.difficulty);
        const best = cw.best[p.id];
        const solved = cw.solved[p.id];
        return `
            <button class="cw-card ${solved ? 'cw-card-solved' : ''}" style="--cw-accent:${p.color || meta.color}" onclick="window.crossword.openPuzzle('${p.id}')">
                <div class="cw-card-top">
                    <span class="cw-card-icon">${p.icon || '🧩'}</span>
                    <span class="cw-diff-pill" style="--cw-accent:${meta.color}">${meta.icon} ${meta.label}</span>
                </div>
                <div class="cw-card-title">${escapeHtml(p.title)}</div>
                <div class="cw-card-desc">${escapeHtml(p.desc || '')}</div>
                <div class="cw-card-foot">
                    ${solved ? '<span class="cw-solved-tag">✓ Solved</span>' : `<span class="cw-card-meta">${p.words.length} words</span>`}
                    ${best ? `<span class="cw-card-meta">⏱ ${this.fmtTime(best)}</span>` : ''}
                </div>
            </button>`;
    }

    // ============================================================
    // OPEN A PUZZLE
    // ============================================================
    openPuzzle(id) {
        const p = this.findPuzzle(id);
        if (!p) return;
        // HIM mega-puzzles ship with a pre-built layout; small curated puzzles
        // are generated on the fly.
        const layout = p.layout ? this.hydrateLayout(p.layout) : this.buildLayout(p.id, p.words, 0);
        if (!layout) { if (window.toast) window.toast('Could not build that puzzle.', 'error'); return; }
        this.startPuzzle({
            id: p.id, title: p.title, difficulty: p.difficulty,
            icon: p.icon, color: p.color, layout, dynamic: false, xp: p.xp,
        });
    }

    openLibrary(difficulty) {
        const built = this.libraryPuzzle(difficulty);
        if (!built.words || built.words.length < 4) {
            if (window.toast) window.toast('Not enough library terms for this mix yet.', 'error');
            return;
        }
        const id = 'lib-' + difficulty;
        const nonce = this.libNonce[difficulty] || 0;
        // Cache-bust so a fresh nonce produces a fresh grid.
        delete this._layoutCache[id + ':' + nonce];
        const layout = this.buildLayout(id, built.words, nonce);
        if (!layout || layout.placedCount < 4) {
            if (window.toast) window.toast('Could not interlock a mix — try again.', 'error');
            return;
        }
        const meta = this.diffMeta(difficulty);
        this.startPuzzle({
            id, title: 'Library Mix', difficulty,
            icon: '🎲', color: meta.color, layout, dynamic: true,
        });
    }

    newLibraryMix() {
        if (!this.current || !this.current.dynamic) return;
        const d = this.current.difficulty;
        this.libNonce[d] = (this.libNonce[d] || 0) + 1;
        this.openLibrary(d);
    }

    startPuzzle(state) {
        this.stopTimer();
        const cw = this.store();
        const saved = cw.progress[state.id];
        const user = {};
        // Restore in-progress letters (not for freshly-generated library mixes).
        if (!state.dynamic && saved && saved.grid) {
            Object.keys(saved.grid).forEach(k => {
                if (state.layout.sol[k] !== undefined) user[k] = saved.grid[k];
            });
        }
        // First across entry as the initial active clue.
        const firstEntry = state.layout.across[0] || state.layout.down[0];
        this.current = {
            ...state,
            xp: state.xp,
            user,
            revealed: new Set(),
            pos: firstEntry ? { r: firstEntry.r, c: firstEntry.c } : { r: 0, c: 0 },
            dir: firstEntry ? firstEntry.dir : 'A',
            elapsed: (!state.dynamic && saved && saved.elapsed) ? saved.elapsed : 0,
            solvedNow: !!cw.solved[state.id],
            startStamp: Date.now(),
        };
        this.app.switchView('crossword-puzzle');
        this.renderPuzzle();
        this.startTimer();
        // Focus the first cell for immediate typing.
        setTimeout(() => { const el = this.cellInput(this.current.pos.r, this.current.pos.c); if (el) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } } }, 60);
    }

    // ============================================================
    // TIMER
    // ============================================================
    startTimer() {
        this.stopTimer();
        if (this.current && this.current.solvedNow) return;
        this._timer = setInterval(() => {
            if (!this.current) return this.stopTimer();
            this.current.elapsed++;
            const el = document.getElementById('cw-timer');
            if (el) el.textContent = '⏱ ' + this.fmtTime(this.current.elapsed);
        }, 1000);
    }
    stopTimer() { if (this._timer) { clearInterval(this._timer); this._timer = null; } }

    // Pin the active-clue banner exactly below the app header. The header's
    // height varies by device (notch/safe-area on phones), so measure it and
    // set the sticky offset from JS instead of hardcoding a value.
    positionActiveClue() {
        const banner = document.getElementById('cw-active-clue');
        if (!banner) return;
        // Desktop: sticky offset = header height.
        const header = document.querySelector('.main-header');
        const h = header ? Math.round(header.getBoundingClientRect().height) : 56;
        banner.style.setProperty('--cw-clue-top', h + 'px');
        // Phones: the clue is a fixed bottom bar — raise it above the on-screen
        // keyboard (the visual viewport shrinks when the keyboard is up) or,
        // when there's no keyboard, above the bottom nav.
        if (window.matchMedia('(max-width: 768px)').matches) {
            const vv = window.visualViewport;
            const keyboard = vv ? Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)) : 0;
            let offset = keyboard;
            if (keyboard < 4) {
                const nav = document.querySelector('.bottom-nav');
                offset = nav ? Math.round(nav.getBoundingClientRect().height) : 0;
            }
            banner.style.bottom = offset + 'px';
        } else {
            banner.style.bottom = '';
        }
        if (!this._clueReposBound) {
            this._clueReposBound = true;
            const reflow = () => this.positionActiveClue();
            window.addEventListener('resize', reflow);
            window.addEventListener('orientationchange', reflow);
            if (window.visualViewport) {
                window.visualViewport.addEventListener('resize', reflow);
                window.visualViewport.addEventListener('scroll', reflow);
            }
        }
    }

    // ---------- grid zoom ----------
    // Fixed, readable square cells; the user can size them to taste (persisted).
    cellSize() {
        let n = parseInt(localStorage.getItem('synthesis_cw_cell'), 10);
        if (!n || isNaN(n)) n = 40;
        return Math.max(24, Math.min(72, n));
    }
    zoom(dir) {
        const next = Math.max(24, Math.min(72, this.cellSize() + dir * 6));
        localStorage.setItem('synthesis_cw_cell', String(next));
        const scroll = document.getElementById('cw-board-scroll');
        if (scroll) scroll.style.setProperty('--cw-size', next + 'px');
    }

    // ============================================================
    // RENDER THE PLAYABLE PUZZLE
    // ============================================================
    renderPuzzle() {
        const host = document.getElementById('crossword-puzzle-content');
        if (!host || !this.current) return;
        const c = this.current;
        const L = c.layout;
        const meta = this.diffMeta(c.difficulty);

        // Build the board.
        let board = '';
        for (let r = 0; r < L.rows; r++) {
            for (let col = 0; col < L.cols; col++) {
                const k = r + ',' + col;
                if (L.sol[k] === undefined) {
                    board += `<div class="cw-cell cw-blank"></div>`;
                } else {
                    const num = L.numAt[k];
                    const val = c.user[k] ? escapeHtml(c.user[k]) : '';
                    const revealed = c.revealed.has(k) ? ' cw-revealed' : '';
                    board += `
                        <div class="cw-cell${revealed}" id="cw-cell-${r}-${col}">
                            ${num ? `<span class="cw-num">${num}</span>` : ''}
                            <input class="cw-input" id="cw-in-${r}-${col}" maxlength="1" autocomplete="off"
                                autocorrect="off" autocapitalize="characters" spellcheck="false"
                                inputmode="text" value="${val}"
                                onfocus="window.crossword.onFocus(${r},${col})"
                                onclick="window.crossword.onCellClick(${r},${col})"
                                oninput="window.crossword.onInput(${r},${col},this.value)"
                                onkeydown="window.crossword.onKey(event,${r},${col})">
                        </div>`;
                }
            }
        }

        const clueList = (entries, dirLabel) => `
            <div class="cw-clue-col">
                <h4 class="cw-clue-h">${dirLabel}</h4>
                <ol class="cw-clue-ol">
                    ${entries.map(e => `
                        <li class="cw-clue-li" id="cw-clue-${e.dir}-${e.num}"
                            onclick="window.crossword.gotoEntry('${e.dir}',${e.num})">
                            <span class="cw-clue-n">${e.num}</span>
                            <span class="cw-clue-t">${escapeHtml(e.clue)}</span>
                        </li>`).join('')}
                </ol>
            </div>`;

        host.innerHTML = `
            <div class="cw-play-wrap">
                <div class="cw-play-head">
                    <div class="cw-play-title">
                        <span class="cw-play-icon">${c.icon || '🧩'}</span>
                        <div>
                            <div class="cw-play-name">${escapeHtml(c.title)}</div>
                            <span class="cw-diff-pill" style="--cw-accent:${meta.color}">${meta.icon} ${meta.label}</span>
                        </div>
                    </div>
                    <div class="cw-timer" id="cw-timer">⏱ ${this.fmtTime(c.elapsed)}</div>
                </div>

                <div class="cw-active-clue" id="cw-active-clue"></div>

                <div class="cw-toolbar">
                    <button class="cw-tool" onclick="window.crossword.checkPuzzle()">✔ Check</button>
                    <button class="cw-tool" onclick="window.crossword.revealCell()">💡 Letter</button>
                    <button class="cw-tool" onclick="window.crossword.revealWord()">🔎 Word</button>
                    <button class="cw-tool cw-tool-danger" onclick="window.crossword.clearPuzzle()">✕ Clear</button>
                    ${c.dynamic ? `<button class="cw-tool" onclick="window.crossword.newLibraryMix()">🎲 New Mix</button>`
                        : `<button class="cw-tool" id="cw-pin-btn" onclick="window.crossword.togglePin('${c.id}')">${this.isPinned(c.id) ? '📌 Pinned' : '📌 Pin to Home'}</button>`}
                    <span class="cw-zoom">
                        <button class="cw-tool cw-zoom-btn" title="Smaller grid" aria-label="Smaller grid" onclick="window.crossword.zoom(-1)">🔍−</button>
                        <button class="cw-tool cw-zoom-btn" title="Bigger grid" aria-label="Bigger grid" onclick="window.crossword.zoom(1)">🔍+</button>
                    </span>
                </div>

                <div class="cw-board-scroll" id="cw-board-scroll" style="--cw-size:${this.cellSize()}px;">
                    <div class="cw-board" style="grid-template-columns:repeat(${L.cols}, var(--cw-size));">
                        ${board}
                    </div>
                </div>

                <div class="cw-clues">
                    ${clueList(L.across, 'Across')}
                    ${clueList(L.down, 'Down')}
                </div>
            </div>
        `;
        this.updateHighlight();
        this.positionActiveClue();
    }

    // ============================================================
    // NAVIGATION HELPERS
    // ============================================================
    cellInput(r, c) { return document.getElementById(`cw-in-${r}-${c}`); }
    hasCell(r, c) { return this.current && this.current.layout.sol[r + ',' + c] !== undefined; }

    entryAt(r, c, dir) {
        if (!this.current) return null;
        const list = dir === 'A' ? this.current.layout.across : this.current.layout.down;
        return list.find(e => e.cells.some(cell => cell.r === r && cell.c === c)) || null;
    }

    onFocus(r, c) {
        if (!this.current) return;
        // Ignore focus events we triggered ourselves (auto-advance, arrow keys).
        // Otherwise the programmatic focus() re-enters here and flips direction,
        // sending the next letters into the wrong squares.
        if (this._progFocus) return;
        this.current.pos = { r, c };
        if (!this.entryAt(r, c, this.current.dir)) {
            this.current.dir = this.current.dir === 'A' ? 'D' : 'A';
        }
        this._justFocused = r + ',' + c;
        this.updateHighlight();
    }

    // A real tap on the cell that already has focus toggles Across/Down.
    // (A first tap on a new cell fires focus, which we record so this click
    // doesn't also toggle.)
    onCellClick(r, c) {
        if (!this.current) return;
        const key = r + ',' + c;
        if (this._justFocused === key) { this._justFocused = null; return; }
        const other = this.current.dir === 'A' ? 'D' : 'A';
        if (this.entryAt(r, c, other)) { this.current.dir = other; this.updateHighlight(); }
    }

    onInput(r, c, val) {
        if (!this.current) return;
        const ch = (val || '').toUpperCase().replace(/[^A-Z]/g, '').slice(-1);
        const k = r + ',' + c;
        const input = this.cellInput(r, c);
        if (!ch) { delete this.current.user[k]; if (input) input.value = ''; this.persist(); return; }
        this.current.user[k] = ch;
        if (input) input.value = ch;
        this.current.revealed.delete(k);
        const cell = document.getElementById(`cw-cell-${r}-${c}`);
        if (cell) cell.classList.remove('cw-wrong', 'cw-right', 'cw-revealed');
        this.advance(r, c);
        this.persist();
        this.checkComplete();
    }

    onKey(e, r, c) {
        if (!this.current) return;
        const dir = this.current.dir;
        if (e.key === 'Backspace') {
            const k = r + ',' + c;
            if (this.current.user[k]) {
                delete this.current.user[k];
                const input = this.cellInput(r, c); if (input) input.value = '';
                const cell = document.getElementById(`cw-cell-${r}-${c}`);
                if (cell) cell.classList.remove('cw-wrong', 'cw-right', 'cw-revealed');
                this.persist();
            } else {
                this.retreat(r, c);
            }
            e.preventDefault();
            return;
        }
        if (e.key === 'ArrowLeft')  { this.current.dir = 'A'; this.move(r, c - 1, r, c, -1, 0); e.preventDefault(); }
        else if (e.key === 'ArrowRight') { this.current.dir = 'A'; this.move(r, c + 1, r, c, 1, 0); e.preventDefault(); }
        else if (e.key === 'ArrowUp')    { this.current.dir = 'D'; this.move(r - 1, c, r, c, 0, -1); e.preventDefault(); }
        else if (e.key === 'ArrowDown')  { this.current.dir = 'D'; this.move(r + 1, c, r, c, 0, 1); e.preventDefault(); }
        else if (e.key === ' ') {
            const other = dir === 'A' ? 'D' : 'A';
            if (this.entryAt(r, c, other)) { this.current.dir = other; this.updateHighlight(); }
            e.preventDefault();
        } else if (e.key === 'Tab') {
            this.gotoAdjacentEntry(e.shiftKey ? -1 : 1);
            e.preventDefault();
        }
    }

    // step in a direction, skipping blanks, staying in grid
    move(nr, nc, r, c, dc, dr) {
        let tr = nr, tc = nc;
        while (tr >= 0 && tc >= 0 && tr < this.current.layout.rows && tc < this.current.layout.cols) {
            if (this.hasCell(tr, tc)) { this.focusCell(tr, tc); return; }
            tr += dr; tc += dc;
        }
        this.updateHighlight();
    }

    advance(r, c) {
        const entry = this.entryAt(r, c, this.current.dir);
        if (!entry) return;
        const idx = entry.cells.findIndex(cell => cell.r === r && cell.c === c);
        for (let i = idx + 1; i < entry.cells.length; i++) {
            const cell = entry.cells[i];
            if (!this.current.user[cell.r + ',' + cell.c]) { this.focusCell(cell.r, cell.c); return; }
        }
        if (idx + 1 < entry.cells.length) {
            const cell = entry.cells[idx + 1];
            this.focusCell(cell.r, cell.c);
        } else {
            this.updateHighlight();
        }
    }

    retreat(r, c) {
        const entry = this.entryAt(r, c, this.current.dir);
        if (!entry) return;
        const idx = entry.cells.findIndex(cell => cell.r === r && cell.c === c);
        if (idx > 0) {
            const cell = entry.cells[idx - 1];
            const k = cell.r + ',' + cell.c;
            delete this.current.user[k];
            const input = this.cellInput(cell.r, cell.c); if (input) input.value = '';
            this.focusCell(cell.r, cell.c);
            this.persist();
        }
    }

    focusCell(r, c) {
        this.current.pos = { r, c };
        if (!this.entryAt(r, c, this.current.dir)) {
            this.current.dir = this.current.dir === 'A' ? 'D' : 'A';
        }
        const input = this.cellInput(r, c);
        if (input) {
            // Flag the focus as programmatic so onFocus doesn't re-toggle, and
            // suppress the browser's scroll-to-input so the page stays put.
            this._progFocus = true;
            try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
            this._progFocus = false;
            this._justFocused = r + ',' + c;
        }
        this.scrollCellIntoBoard(r, c);
        this.updateHighlight();
    }

    // Keep the active cell visible by scrolling ONLY the board's own scroll
    // box (never the page), so navigating to an off-screen cell doesn't move
    // the whole puzzle out from under you.
    scrollCellIntoBoard(r, c) {
        const cell = document.getElementById(`cw-cell-${r}-${c}`);
        const box = document.getElementById('cw-board-scroll');
        if (!cell || !box) return;
        const cR = cell.getBoundingClientRect();
        const bR = box.getBoundingClientRect();
        const pad = 6;
        let dx = 0, dy = 0;
        if (cR.left < bR.left + pad) dx = cR.left - (bR.left + pad);
        else if (cR.right > bR.right - pad) dx = cR.right - (bR.right - pad);
        if (cR.top < bR.top + pad) dy = cR.top - (bR.top + pad);
        else if (cR.bottom > bR.bottom - pad) dy = cR.bottom - (bR.bottom - pad);
        if (dx) box.scrollLeft += dx;
        if (dy) box.scrollTop += dy;
    }

    gotoEntry(dir, num) {
        const list = dir === 'A' ? this.current.layout.across : this.current.layout.down;
        const entry = list.find(e => e.num === num);
        if (!entry) return;
        this.current.dir = dir;
        this.focusCell(entry.r, entry.c);
    }

    gotoAdjacentEntry(step) {
        const c = this.current;
        const list = c.dir === 'A' ? c.layout.across : c.layout.down;
        const cur = this.entryAt(c.pos.r, c.pos.c, c.dir);
        let idx = cur ? list.indexOf(cur) : 0;
        idx = (idx + step + list.length) % list.length;
        const e = list[idx];
        this.focusCell(e.r, e.c);
    }

    // Scroll a clue into view within its own scrollable list box only — never
    // touching window scroll, so the board stays put when you tap a cell.
    scrollClueIntoView(li) {
        const ol = li.parentElement;
        if (!ol) return;
        const olR = ol.getBoundingClientRect();
        const liR = li.getBoundingClientRect();
        if (liR.top < olR.top || liR.bottom > olR.bottom) {
            ol.scrollTop += (liR.top - olR.top) - (ol.clientHeight - li.clientHeight) / 2;
        }
    }

    updateHighlight() {
        if (!this.current) return;
        document.querySelectorAll('.cw-cell.cw-active, .cw-cell.cw-inword').forEach(el => el.classList.remove('cw-active', 'cw-inword'));
        document.querySelectorAll('.cw-clue-li.cw-clue-active').forEach(el => el.classList.remove('cw-clue-active'));
        const c = this.current;
        const entry = this.entryAt(c.pos.r, c.pos.c, c.dir) || this.entryAt(c.pos.r, c.pos.c, c.dir === 'A' ? 'D' : 'A');
        if (entry) {
            entry.cells.forEach(cell => {
                const el = document.getElementById(`cw-cell-${cell.r}-${cell.c}`);
                if (el) el.classList.add('cw-inword');
            });
            const li = document.getElementById(`cw-clue-${entry.dir}-${entry.num}`);
            if (li) {
                li.classList.add('cw-clue-active');
                // Only pull the clue into view when the active clue actually
                // changes — and scroll ONLY its own list box, never the page,
                // so tapping a cell doesn't scroll the board away.
                const ek = entry.dir + entry.num;
                if (this._lastClueKey !== ek) this.scrollClueIntoView(li);
                this._lastClueKey = ek;
            }
            const banner = document.getElementById('cw-active-clue');
            if (banner) {
                banner.innerHTML = `<span class="cw-ac-num">${entry.num} ${entry.dir === 'A' ? 'Across' : 'Down'}</span>
                    <span class="cw-ac-text">${escapeHtml(entry.clue)}</span>`;
            }
        }
        const active = document.getElementById(`cw-cell-${c.pos.r}-${c.pos.c}`);
        if (active) active.classList.add('cw-active');
    }

    // ============================================================
    // CHECK / REVEAL / CLEAR
    // ============================================================
    checkPuzzle() {
        if (!this.current) return;
        const c = this.current, L = c.layout;
        let wrong = 0, filled = 0;
        Object.keys(L.sol).forEach(k => {
            const cell = document.getElementById(`cw-cell-${k.replace(',', '-')}`);
            if (!cell) return;
            cell.classList.remove('cw-wrong', 'cw-right');
            const u = c.user[k];
            if (!u) return;
            filled++;
            if (u === L.sol[k]) cell.classList.add('cw-right');
            else { cell.classList.add('cw-wrong'); wrong++; }
        });
        if (window.toast) {
            if (!filled) window.toast('Fill in some answers first!', 'info');
            else if (wrong === 0) window.toast('Everything filled so far is correct! ✓', 'success');
            else window.toast(`${wrong} letter${wrong > 1 ? 's' : ''} need${wrong > 1 ? '' : 's'} another look.`, 'error');
        }
        setTimeout(() => {
            document.querySelectorAll('.cw-cell.cw-right').forEach(el => el.classList.remove('cw-right'));
        }, 1400);
    }

    revealCell() {
        if (!this.current) return;
        const { r, c } = this.current.pos;
        const k = r + ',' + c;
        const sol = this.current.layout.sol[k];
        if (sol === undefined) return;
        this.current.user[k] = sol;
        this.current.revealed.add(k);
        const input = this.cellInput(r, c); if (input) input.value = sol;
        const cell = document.getElementById(`cw-cell-${r}-${c}`);
        if (cell) { cell.classList.remove('cw-wrong', 'cw-right'); cell.classList.add('cw-revealed'); }
        this.persist();
        this.advance(r, c);
        this.checkComplete();
    }

    revealWord() {
        if (!this.current) return;
        const c = this.current;
        const entry = this.entryAt(c.pos.r, c.pos.c, c.dir) || this.entryAt(c.pos.r, c.pos.c, c.dir === 'A' ? 'D' : 'A');
        if (!entry) return;
        entry.cells.forEach(cell => {
            const k = cell.r + ',' + cell.c;
            const sol = c.layout.sol[k];
            c.user[k] = sol;
            c.revealed.add(k);
            const input = this.cellInput(cell.r, cell.c); if (input) input.value = sol;
            const el = document.getElementById(`cw-cell-${cell.r}-${cell.c}`);
            if (el) { el.classList.remove('cw-wrong', 'cw-right'); el.classList.add('cw-revealed'); }
        });
        this.persist();
        this.checkComplete();
    }

    clearPuzzle() {
        if (!this.current) return;
        if (!confirm('Clear all your answers for this puzzle?')) return;
        const c = this.current;
        c.user = {};
        c.revealed = new Set();
        Object.keys(c.layout.sol).forEach(k => {
            const input = this.cellInput(...k.split(',').map(Number));
            if (input) input.value = '';
            const cell = document.getElementById(`cw-cell-${k.replace(',', '-')}`);
            if (cell) cell.classList.remove('cw-wrong', 'cw-right', 'cw-revealed');
        });
        this.persist();
    }

    // ============================================================
    // COMPLETION
    // ============================================================
    checkComplete() {
        if (!this.current) return;
        const c = this.current, L = c.layout;
        const keys = Object.keys(L.sol);
        for (const k of keys) {
            if (c.user[k] !== L.sol[k]) return;   // not done / has a mismatch
        }
        this.onSolved();
    }

    onSolved() {
        const c = this.current;
        this.stopTimer();
        const cw = this.store();
        const already = !!cw.solved[c.id];
        cw.solved[c.id] = true;
        // Best time only counts puzzles solved without a full reveal shortcut,
        // but we still record whichever time is lowest.
        const usedReveals = c.revealed.size;
        if (!usedReveals) {
            if (!cw.best[c.id] || c.elapsed < cw.best[c.id]) cw.best[c.id] = c.elapsed;
        }
        delete cw.progress[c.id];   // solved — no need to keep in-progress state

        // Award XP the first time each puzzle is solved cleanly.
        if (!already && !usedReveals && window.gamification && typeof window.gamification.awardXP === 'function') {
            const xp = c.xp || this.diffMeta(c.difficulty).xp;
            window.gamification.awardXP(xp, `Crossword solved: ${c.title}`);
        }
        window.gamesHub?.credit('crossword');
        this.save();
        c.solvedNow = true;
        this.showWin(usedReveals);
    }

    showWin(usedReveals) {
        const c = this.current;
        const meta = this.diffMeta(c.difficulty);
        const host = document.getElementById('crossword-puzzle-content');
        if (!host) return;
        const banner = document.createElement('div');
        banner.className = 'cw-win-overlay';
        banner.innerHTML = `
            <div class="cw-win-card">
                <div class="cw-win-burst">🎉</div>
                <h3>Puzzle Complete!</h3>
                <p class="cw-win-name">${escapeHtml(c.title)}</p>
                <div class="cw-win-stats">
                    <div><span>⏱</span> ${this.fmtTime(c.elapsed)}</div>
                    ${!usedReveals ? `<div><span>⭐</span> +${c.xp || meta.xp} XP</div>` : '<div><span>💡</span> Used reveals</div>'}
                </div>
                <div class="cw-win-actions">
                    ${c.dynamic ? `<button class="cw-win-btn" onclick="window.crossword.newLibraryMix()">🎲 New Mix</button>` : ''}
                    <button class="cw-win-btn cw-win-btn-primary" onclick="window.crossword.backToMenu()">Back to Puzzles</button>
                </div>
            </div>`;
        host.appendChild(banner);
        if (window.toast) window.toast('🧩 Crossword solved!', 'success');
    }

    // ============================================================
    // PERSISTENCE OF IN-PROGRESS STATE
    // ============================================================
    persist() {
        if (!this.current || this.current.dynamic) return;   // don't persist random mixes
        const cw = this.store();
        if (cw.solved[this.current.id]) return;
        cw.progress[this.current.id] = {
            grid: { ...this.current.user },
            elapsed: this.current.elapsed,
        };
        this._saveDebounced();
    }
    _saveDebounced() {
        clearTimeout(this._saveT);
        this._saveT = setTimeout(() => this.save(), 800);
    }

    backToMenu() {
        this.exitPuzzle();
        this.app.switchView('crossword');
    }

    exitPuzzle() {
        this.stopTimer();
        this.persist();
        this.save();
    }

    // ============================================================
    // CURATED PUZZLE LIBRARY
    // Themed word/clue banks spanning every learning strand in the app.
    // ============================================================
    buildCuratedLibrary() {
        return [
            // ---------------- EASY ----------------
            {
                id: 'easy-science', difficulty: 'easy', icon: '🔬', color: '#06b6d4',
                title: 'Everyday Science', desc: 'The building blocks of the physical world',
                words: [
                    { answer: 'ATOM', clue: 'Smallest unit of a chemical element' },
                    { answer: 'CELL', clue: 'Basic building block of all living things' },
                    { answer: 'GRAVITY', clue: 'Force that pulls objects toward Earth' },
                    { answer: 'ENERGY', clue: 'The capacity to do work' },
                    { answer: 'SOLID', clue: 'State of matter with a fixed shape' },
                    { answer: 'LIQUID', clue: 'State of matter that flows and takes its container\'s shape' },
                    { answer: 'OXYGEN', clue: 'Gas humans breathe in to survive' },
                    { answer: 'ORBIT', clue: 'Curved path a planet takes around the Sun' },
                    { answer: 'MASS', clue: 'Amount of matter in an object' },
                    { answer: 'LIGHT', clue: 'Form of energy the eye can detect' },
                    { answer: 'HEAT', clue: 'Energy transferred between hot and cold bodies' },
                ],
            },
            {
                id: 'easy-mind', difficulty: 'easy', icon: '🧠', color: '#8b5cf6',
                title: 'Mind & Emotions', desc: 'How the brain, mood, and memory work',
                words: [
                    { answer: 'HABIT', clue: 'Routine behavior done almost automatically' },
                    { answer: 'MEMORY', clue: 'Mental faculty of retaining information' },
                    { answer: 'FEAR', clue: 'Emotion triggered by danger' },
                    { answer: 'BRAIN', clue: 'Organ that controls thought and behavior' },
                    { answer: 'STRESS', clue: 'The body\'s response to pressure or threat' },
                    { answer: 'FOCUS', clue: 'Concentrated mental attention' },
                    { answer: 'SLEEP', clue: 'Nightly rest vital for consolidating memory' },
                    { answer: 'MOOD', clue: 'A temporary emotional state' },
                    { answer: 'REWARD', clue: 'Positive outcome that reinforces a behavior' },
                    { answer: 'CALM', clue: 'A relaxed, untroubled state' },
                    { answer: 'EMPATHY', clue: 'Ability to share another\'s feelings' },
                ],
            },
            {
                id: 'easy-history', difficulty: 'easy', icon: '🏛️', color: '#f59e0b',
                title: 'History Basics', desc: 'Empires, rulers, and the ancient world',
                words: [
                    { answer: 'EMPIRE', clue: 'Large territory ruled by a single authority' },
                    { answer: 'KING', clue: 'A male monarch' },
                    { answer: 'PYRAMID', clue: 'Ancient Egyptian tomb with a triangular profile' },
                    { answer: 'ROME', clue: 'Ancient empire centered on the Italian peninsula' },
                    { answer: 'TRADE', clue: 'The exchange of goods between peoples' },
                    { answer: 'CASTLE', clue: 'Fortified medieval stronghold' },
                    { answer: 'KNIGHT', clue: 'Medieval armored warrior on horseback' },
                    { answer: 'SCROLL', clue: 'Rolled sheet used as an ancient document' },
                    { answer: 'TREATY', clue: 'Formal agreement ending a conflict' },
                    { answer: 'PHARAOH', clue: 'Ruler of ancient Egypt' },
                    { answer: 'ARMY', clue: 'Organized military land force' },
                ],
            },
            {
                id: 'easy-body', difficulty: 'easy', icon: '❤️', color: '#14b8a6',
                title: 'Your Body', desc: 'Organs and systems that keep you alive',
                words: [
                    { answer: 'HEART', clue: 'Muscular organ that pumps blood' },
                    { answer: 'LUNG', clue: 'Organ you breathe with' },
                    { answer: 'BONE', clue: 'Rigid tissue forming the skeleton' },
                    { answer: 'BLOOD', clue: 'Red fluid that carries oxygen through the body' },
                    { answer: 'SKIN', clue: 'The body\'s largest organ, covering it all' },
                    { answer: 'NERVE', clue: 'Fiber that carries signals to and from the brain' },
                    { answer: 'MUSCLE', clue: 'Tissue that contracts to create movement' },
                    { answer: 'BRAIN', clue: 'Command center of the nervous system' },
                    { answer: 'KIDNEY', clue: 'Bean-shaped organ that filters the blood' },
                    { answer: 'STOMACH', clue: 'Organ where digestion begins in earnest' },
                ],
            },

            // ---------------- MEDIUM ----------------
            {
                id: 'med-philosophy', difficulty: 'medium', icon: '💭', color: '#ec4899',
                title: 'Philosophy & Ideas', desc: 'Big questions from the great thinkers',
                words: [
                    { answer: 'ETHICS', clue: 'The study of moral principles' },
                    { answer: 'LOGIC', clue: 'Reasoning conducted by strict, valid principles' },
                    { answer: 'STOIC', clue: 'One who calmly accepts what cannot be controlled' },
                    { answer: 'VIRTUE', clue: 'Moral excellence of character' },
                    { answer: 'REASON', clue: 'The faculty of rational thought' },
                    { answer: 'TRUTH', clue: 'Conformity with fact or reality' },
                    { answer: 'SOCRATES', clue: 'Greek philosopher famous for relentless questioning' },
                    { answer: 'WISDOM', clue: 'Deep understanding paired with good judgment' },
                    { answer: 'FREEDOM', clue: 'The power to act without external constraint' },
                    { answer: 'DOUBT', clue: 'Deliberate uncertainty used as a tool of inquiry' },
                    { answer: 'JUSTICE', clue: 'Giving each person their fair due' },
                    { answer: 'PLATO', clue: 'Student of Socrates who wrote the Republic' },
                ],
            },
            {
                id: 'med-anatomy', difficulty: 'medium', icon: '🫀', color: '#14b8a6',
                title: 'The Human Body', desc: 'A deeper look at anatomy and physiology',
                words: [
                    { answer: 'NEURON', clue: 'Basic signaling cell of the nervous system' },
                    { answer: 'ARTERY', clue: 'Vessel carrying blood away from the heart' },
                    { answer: 'SKELETON', clue: 'The body\'s framework of bones' },
                    { answer: 'HORMONE', clue: 'Chemical messenger released into the blood' },
                    { answer: 'KIDNEY', clue: 'Organ that filters blood into urine' },
                    { answer: 'IMMUNE', clue: 'The body\'s disease-defense system' },
                    { answer: 'LIVER', clue: 'Organ that detoxifies the blood' },
                    { answer: 'SPINE', clue: 'The column of stacked vertebrae' },
                    { answer: 'CORTEX', clue: 'Wrinkled outer layer of the brain' },
                    { answer: 'INSULIN', clue: 'Hormone that lowers blood sugar' },
                    { answer: 'TENDON', clue: 'Tissue connecting muscle to bone' },
                    { answer: 'ALVEOLI', clue: 'Tiny air sacs where the lungs exchange gases' },
                ],
            },
            {
                id: 'med-business', difficulty: 'medium', icon: '📈', color: '#6366f1',
                title: 'Business & Productivity', desc: 'Strategy, focus, and getting things done',
                words: [
                    { answer: 'STRATEGY', clue: 'A long-term plan to reach a goal' },
                    { answer: 'MARKET', clue: 'Where goods and services are bought and sold' },
                    { answer: 'PROFIT', clue: 'Financial gain left after costs' },
                    { answer: 'BRAND', clue: 'The identity and reputation of a product' },
                    { answer: 'LEADER', clue: 'One who guides and inspires a team' },
                    { answer: 'CAPITAL', clue: 'Wealth used to generate more wealth' },
                    { answer: 'STARTUP', clue: 'Young company built for rapid growth' },
                    { answer: 'CUSTOMER', clue: 'The person who buys your product' },
                    { answer: 'PRIORITY', clue: 'The one thing that matters most right now' },
                    { answer: 'NEGOTIATE', clue: 'Reach an agreement through discussion' },
                    { answer: 'REVENUE', clue: 'Total income before expenses' },
                    { answer: 'PITCH', clue: 'A concise sell of your idea to investors' },
                ],
            },
            {
                id: 'med-physics', difficulty: 'medium', icon: '🌌', color: '#3b82f6',
                title: 'Physics & the Cosmos', desc: 'From particles to galaxies',
                words: [
                    { answer: 'QUANTUM', clue: 'The physics of the very small' },
                    { answer: 'PHOTON', clue: 'A single particle of light' },
                    { answer: 'ENTROPY', clue: 'A measure of disorder in a system' },
                    { answer: 'GALAXY', clue: 'Vast gravitationally bound system of stars' },
                    { answer: 'NEUTRON', clue: 'Neutral particle in an atomic nucleus' },
                    { answer: 'VELOCITY', clue: 'Speed in a specified direction' },
                    { answer: 'FUSION', clue: 'Process that powers the Sun' },
                    { answer: 'SPECTRUM', clue: 'The full range of light wavelengths' },
                    { answer: 'INERTIA', clue: 'An object\'s resistance to a change in motion' },
                    { answer: 'COSMOS', clue: 'The universe seen as an ordered whole' },
                    { answer: 'ELECTRON', clue: 'Negatively charged particle orbiting a nucleus' },
                    { answer: 'FRICTION', clue: 'Force resisting sliding between surfaces' },
                ],
            },
            {
                id: 'med-literature', difficulty: 'medium', icon: '📚', color: '#a855f7',
                title: 'Literature & Drama', desc: 'Plays, poets, and storytelling craft',
                words: [
                    { answer: 'TRAGEDY', clue: 'A drama with a sorrowful ending' },
                    { answer: 'HAMLET', clue: 'Shakespeare\'s brooding Prince of Denmark' },
                    { answer: 'METAPHOR', clue: 'Describing one thing as if it were another' },
                    { answer: 'SONNET', clue: 'A 14-line poem, often about love' },
                    { answer: 'PLOT', clue: 'The sequence of events in a story' },
                    { answer: 'IRONY', clue: 'A gap between what is said and what is meant' },
                    { answer: 'THEME', clue: 'The central idea a work explores' },
                    { answer: 'COMEDY', clue: 'A drama meant to amuse, usually ending happily' },
                    { answer: 'VERSE', clue: 'Writing arranged in metrical lines' },
                    { answer: 'SYMBOL', clue: 'An object that stands for a larger idea' },
                    { answer: 'PROSE', clue: 'Ordinary written language, not verse' },
                ],
            },

            // ---------------- HARD ----------------
            {
                id: 'hard-philosophy', difficulty: 'hard', icon: '🏺', color: '#ec4899',
                title: 'Advanced Philosophy', desc: 'The technical vocabulary of the discipline',
                words: [
                    { answer: 'EPISTEMOLOGY', clue: 'The study of knowledge and justified belief' },
                    { answer: 'DIALECTIC', clue: 'Reasoning through dialogue and contradiction' },
                    { answer: 'NIHILISM', clue: 'The belief that life lacks inherent meaning' },
                    { answer: 'EMPIRICISM', clue: 'The view that knowledge comes from sensory experience' },
                    { answer: 'DEONTOLOGY', clue: 'Ethics grounded in duty and rules' },
                    { answer: 'HEDONISM', clue: 'The doctrine that pleasure is the highest good' },
                    { answer: 'SYLLOGISM', clue: 'A deductive argument from two premises' },
                    { answer: 'ONTOLOGY', clue: 'The philosophical study of being' },
                    { answer: 'RATIONALISM', clue: 'The view that reason is the chief source of knowledge' },
                    { answer: 'IDEALISM', clue: 'The view that reality is fundamentally mental' },
                    { answer: 'AESTHETICS', clue: 'The philosophy of beauty and art' },
                    { answer: 'PARADOX', clue: 'A statement that seems to contradict itself' },
                ],
            },
            {
                id: 'hard-cellbio', difficulty: 'hard', icon: '🧬', color: '#22c55e',
                title: 'Molecular & Cell Biology', desc: 'Inside the machinery of life',
                words: [
                    { answer: 'MITOCHONDRIA', clue: 'The powerhouse of the cell' },
                    { answer: 'RIBOSOME', clue: 'Cellular site of protein synthesis' },
                    { answer: 'ENZYME', clue: 'A protein that speeds up a reaction' },
                    { answer: 'NUCLEUS', clue: 'Membrane-bound control center of the cell' },
                    { answer: 'CHROMOSOME', clue: 'A structure that packages DNA and genes' },
                    { answer: 'MEMBRANE', clue: 'The boundary enclosing a cell' },
                    { answer: 'SYNAPSE', clue: 'The junction between two neurons' },
                    { answer: 'GLUCOSE', clue: 'Simple sugar the body burns for energy' },
                    { answer: 'ANTIBODY', clue: 'Protein that targets a specific pathogen' },
                    { answer: 'HEMOGLOBIN', clue: 'Blood protein that carries oxygen' },
                    { answer: 'METABOLISM', clue: 'The sum of chemical reactions in an organism' },
                    { answer: 'PROTEIN', clue: 'Macromolecule built from amino acids' },
                ],
            },
            {
                id: 'hard-cosmology', difficulty: 'hard', icon: '🔭', color: '#3b82f6',
                title: 'Astrophysics & Cosmology', desc: 'The extreme physics of the universe',
                words: [
                    { answer: 'SINGULARITY', clue: 'Point of infinite density at a black hole\'s core' },
                    { answer: 'REDSHIFT', clue: 'Stretching of light from receding galaxies' },
                    { answer: 'NEBULA', clue: 'Interstellar cloud of gas and dust' },
                    { answer: 'SUPERNOVA', clue: 'The explosive death of a massive star' },
                    { answer: 'PARALLAX', clue: 'Apparent shift used to gauge a star\'s distance' },
                    { answer: 'QUASAR', clue: 'Extremely luminous active galactic core' },
                    { answer: 'PULSAR', clue: 'Rapidly spinning, beaming neutron star' },
                    { answer: 'COSMOLOGY', clue: 'The study of the universe\'s origin and fate' },
                    { answer: 'ANTIMATTER', clue: 'The mirror-charge counterpart of ordinary matter' },
                    { answer: 'LUMINOSITY', clue: 'The intrinsic brightness of a star' },
                    { answer: 'WAVELENGTH', clue: 'Distance between successive wave crests' },
                    { answer: 'GRAVITON', clue: 'Hypothetical particle carrying the force of gravity' },
                ],
            },
            {
                id: 'hard-civilization', difficulty: 'hard', icon: '🌍', color: '#f59e0b',
                title: 'History & Civilization', desc: 'The forces that shaped human societies',
                words: [
                    { answer: 'RENAISSANCE', clue: 'European rebirth of art and classical learning' },
                    { answer: 'REVOLUTION', clue: 'A sudden, radical overthrow of a government' },
                    { answer: 'FEUDALISM', clue: 'Medieval system trading land for loyalty' },
                    { answer: 'DEMOCRACY', clue: 'Government by the people' },
                    { answer: 'COLONIALISM', clue: 'One nation\'s political control over another' },
                    { answer: 'MESOPOTAMIA', clue: 'Cradle of civilization between the Tigris and Euphrates' },
                    { answer: 'ENLIGHTENMENT', clue: '18th-century age of reason and science' },
                    { answer: 'ARISTOCRACY', clue: 'Rule by a hereditary privileged class' },
                    { answer: 'REPUBLIC', clue: 'A state where power rests with elected representatives' },
                    { answer: 'DIPLOMACY', clue: 'The art of managing relations between nations' },
                    { answer: 'DYNASTY', clue: 'A succession of rulers from the same family' },
                    { answer: 'EMPIRE', clue: 'A group of territories under one supreme ruler' },
                ],
            },
            {
                id: 'hard-critical', difficulty: 'hard', icon: '🧭', color: '#0ea5e9',
                title: 'Logic & Critical Thinking', desc: 'Fallacies, reasoning, and the scientific method',
                words: [
                    { answer: 'HYPOTHESIS', clue: 'A testable proposed explanation' },
                    { answer: 'FALLACY', clue: 'A flaw that undermines an argument\'s logic' },
                    { answer: 'INFERENCE', clue: 'A conclusion drawn from evidence and reasoning' },
                    { answer: 'DEDUCTION', clue: 'Reasoning from general rules to a specific case' },
                    { answer: 'INDUCTION', clue: 'Reasoning from specific cases to a general rule' },
                    { answer: 'PREMISE', clue: 'A statement offered to support a conclusion' },
                    { answer: 'BIAS', clue: 'A systematic tendency that skews judgment' },
                    { answer: 'EVIDENCE', clue: 'Facts that support or refute a claim' },
                    { answer: 'VALIDITY', clue: 'The property of an argument whose conclusion follows from its premises' },
                    { answer: 'CORRELATION', clue: 'A statistical association that need not imply causation' },
                    { answer: 'SKEPTICISM', clue: 'A questioning attitude toward claims and beliefs' },
                    { answer: 'ANALOGY', clue: 'An argument based on similarity between cases' },
                ],
            },
        ];
    }
}

// Expose for app.js
window.CrosswordSystem = CrosswordSystem;
