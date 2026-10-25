// ============================================
// SYNTHESIS — ANATOMY ARCADE
// A tap-to-learn anatomy game built for a phone screen: vibrant, color-coded
// SVG boards (see anatomy-game-boards.js) and four ways to play them.
//
//   • Label It     — match every name to its structure on one board. Stars,
//                    best time and XP per board.
//   • Lightning    — 60-second sprint: a name flashes up, tap it on the
//                    board. Streak multiplier, boards rotate, best score.
//   • Memory Match — flip cards to pair each highlighted structure with
//                    its name.
//   • Study        — every label on, tap a structure to read its fact.
//
// Every miss/hit is tallied per structure so the menu can surface your
// "weak spots". State persists in APP_DATA.user.anatomyGame through the
// app's existing saveProgress(); XP goes through window.gamification.
//
// Self-contained: reads window.ANATOMY_BOARDS + APP_DATA, and uses the small
// app.js hooks (switchView, saveProgress, escapeHtml, gamification, toast).
// ============================================

class AnatomyGame {
    constructor(app) {
        this.app = app;
        this.boards = Array.isArray(window.ANATOMY_BOARDS) ? window.ANATOMY_BOARDS : [];
        this.current = null;      // runtime state of the mode being played
        this._timer = null;       // interval handle (label timer / lightning clock)
        this._peekT = null;       // label-peek timeout
        this.LIGHTNING_SECONDS = 60;
    }

    // ============================================================
    // PERSISTENCE
    // ============================================================
    store() {
        if (!APP_DATA.user.anatomyGame) APP_DATA.user.anatomyGame = {};
        const s = APP_DATA.user.anatomyGame;
        if (!s.label) s.label = {};            // boardId -> { stars, bestMs, plays }
        if (!s.lightning) s.lightning = { best: 0, plays: 0, bestStreak: 0 };
        if (!s.memory) s.memory = {};          // boardId -> { bestMoves, plays }
        if (!s.parts) s.parts = {};            // "board:part" -> { ok, miss }
        if (!s.totalXp) s.totalXp = 0;
        if (!s.patho) s.patho = { best: 0, rounds: 0 };
        return s;
    }
    save() { if (typeof saveProgress === 'function') saveProgress(); }

    tally(boardId, partId, ok) {
        const s = this.store();
        const k = boardId + ':' + partId;
        if (!s.parts[k]) s.parts[k] = { ok: 0, miss: 0 };
        s.parts[k][ok ? 'ok' : 'miss']++;
    }

    awardXP(amount, reason) {
        if (!amount) return;
        const s = this.store();
        s.totalXp += amount;
        if (window.gamification && typeof window.gamification.awardXP === 'function') {
            window.gamification.awardXP(amount, reason);
        }
    }

    // ============================================================
    // HELPERS
    // ============================================================
    board(id) { return this.boards.find(b => b.id === id) || null; }
    esc(s) { return (typeof escapeHtml === 'function') ? escapeHtml(String(s)) : String(s); }
    shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    fmtTime(ms) {
        const s = Math.max(0, Math.round(ms / 1000));
        return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    }
    todaysBoard() {
        if (!this.boards.length) return null;
        const day = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000);
        return this.boards[day % this.boards.length];
    }
    stars(n) { return '★'.repeat(n) + '☆'.repeat(Math.max(0, 3 - n)); }
    // Accent used for chips, badges and fact text — a part can override its
    // drawn color (e.g. the near-black pupil) with a readable `ui` color.
    ui(p) { return p.ui || p.color; }

    // Build one board as inline SVG. Options:
    //   pins:   numbered badges on every part (Label It / Study)
    //   mini:   tiny card version — everything dimmed except `hl`
    //   hl:     part id to spotlight in mini mode
    // Decorative base/over art never takes pointer events, so a tap always
    // resolves to the structure underneath it.
    boardSvg(board, opts = {}) {
        const parts = board.parts.map((p, i) => {
            const shape = p.shape.replace(/"C"/g, `"${p.color}"`);
            const cls = 'ag-part' + (opts.mini && opts.hl === p.id ? ' hl' : '');
            return `<g class="${cls}" data-part="${p.id}">${shape}</g>`;
        }).join('');
        let pins = '';
        if (opts.pins) {
            pins = board.parts.map((p, i) => `
                <g class="ag-pin" data-part="${p.id}">
                    <circle cx="${p.pin[0]}" cy="${p.pin[1]}" r="13"/>
                    <text x="${p.pin[0]}" y="${p.pin[1]}" dy="0.36em" text-anchor="middle">${i + 1}</text>
                </g>`).join('');
        }
        return `<svg class="ag-board${opts.mini ? ' ag-mini' : ''}${board.img ? ' ag-img' : ''}" viewBox="${board.viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${this.esc(board.title)}">
            <g pointer-events="none">${board.base || ''}</g>${parts}<g pointer-events="none">${board.over || ''}</g>${pins}</svg>${this.credit(board, opts)}`;
    }
    // Attribution for open-licensed artwork (shown under every image board).
    credit(board, opts = {}) {
        const c = board.credit; if (!c || opts.mini || opts.credit === false) return '';
        return `<p class="ag-credit">Artwork: <a href="${this.esc(c.url)}" target="_blank" rel="noopener">${this.esc(c.title)}</a> by ${this.esc(c.author)} · ${this.esc(c.license)}${c.note ? ` · ${this.esc(c.note)}` : ''}</p>`;
    }

    // Resolve a tap anywhere inside a board to a part id (or null).
    partFromEvent(e) {
        const g = e.target.closest ? e.target.closest('.ag-part, .ag-pin') : null;
        return g ? g.getAttribute('data-part') : null;
    }

    setPartClass(host, partId, cls, on) {
        host.querySelectorAll(`.ag-part[data-part="${partId}"], .ag-pin[data-part="${partId}"]`)
            .forEach(el => el.classList.toggle(cls, on));
    }
    flashPart(host, partId, cls, ms) {
        this.setPartClass(host, partId, cls, true);
        setTimeout(() => this.setPartClass(host, partId, cls, false), ms);
    }

    labelStars(boardId) { const r = this.store().label[boardId]; return r ? (r.stars || 0) : 0; }

    // ============================================================
    // MENU
    // ============================================================
    render() {
        const host = document.getElementById('anatomy-game-content');
        if (!host) return;
        const s = this.store();
        const today = this.todaysBoard();
        const totalStars = this.boards.reduce((a, b) => a + this.labelStars(b.id), 0);
        const done = this.boards.filter(b => this.labelStars(b.id) > 0).length;

        const boardCards = this.boards.map(b => {
            const st = this.labelStars(b.id);
            const rec = s.label[b.id];
            const mem = s.memory[b.id];
            return `
            <div class="ag-board-card" style="--ag-accent:${b.color}">
                <div class="ag-board-thumb">${this.boardSvg(b, { credit: false })}</div>
                <div class="ag-board-info">
                    <div class="ag-board-title">${b.icon} ${this.esc(b.title)}</div>
                    <div class="ag-board-meta">${b.parts.length} structures · ${this.esc(b.system)}</div>
                    <div class="ag-board-stars ${st ? 'on' : ''}">${this.stars(st)}${rec && rec.bestMs ? ` <span>best ${this.fmtTime(rec.bestMs)}</span>` : ''}${mem && mem.bestMoves ? ` <span>· memory ${mem.bestMoves} moves</span>` : ''}</div>
                    <div class="ag-board-actions">
                        <button class="ag-btn ag-btn-primary" onclick="window.anatomyGame.startLabel('${b.id}')">🏷️ Label It</button>
                        <button class="ag-btn" onclick="window.anatomyGame.startMemory('${b.id}')">🃏 Memory</button>
                        <button class="ag-btn" onclick="window.anatomyGame.startLightning('${b.id}')">⚡ Lightning</button>
                        ${(window.PATHO_MAP && window.PATHO_MAP[b.id]) ? `<button class="ag-btn" onclick="window.anatomyGame.startPatho('${b.id}')">🦠 Patho</button>` : ''}
                        <button class="ag-btn ag-btn-ghost" onclick="window.anatomyGame.startStudy('${b.id}')">📖 Study</button>
                    </div>
                </div>
            </div>`;
        }).join('');

        host.innerHTML = `
        <div class="ag-wrap">
            <div class="ag-hero">
                <div class="ag-hero-text">
                    <h2>Tap. Match. Remember.</h2>
                    <p>Twelve color-coded anatomy boards, built for a thumb and a few spare minutes. Every structure you miss gets tracked, so the game keeps showing you what you still need.</p>
                </div>
                <div class="ag-hero-stats">
                    <div><strong>${totalStars}</strong><span>/ ${this.boards.length * 3} stars</span></div>
                    <div><strong>${done}</strong><span>/ ${this.boards.length} boards</span></div>
                    <div><strong>${s.lightning.best || 0}</strong><span>lightning best</span></div>
                    <div><strong>${s.totalXp || 0}</strong><span>XP earned</span></div>
                </div>
            </div>

            <div class="ag-modes">
                ${today ? `
                <button class="ag-mode-card ag-mode-today" style="--ag-accent:${today.color}" onclick="window.anatomyGame.startLabel('${today.id}')">
                    <span class="ag-mode-icon">${today.icon}</span>
                    <span class="ag-mode-title">Today's board</span>
                    <span class="ag-mode-sub">${this.esc(today.title)} · Label It</span>
                </button>` : ''}
                <button class="ag-mode-card" style="--ag-accent:#facc15" onclick="window.anatomyGame.startLightning('mix')">
                    <span class="ag-mode-icon">⚡</span>
                    <span class="ag-mode-title">Lightning round</span>
                    <span class="ag-mode-sub">${this.LIGHTNING_SECONDS}s · all boards · best ${s.lightning.best || 0}</span>
                </button>
                <button class="ag-mode-card" style="--ag-accent:#a78bfa" onclick="window.anatomyGame.startMemory('${(today || this.boards[0] || {}).id}')">
                    <span class="ag-mode-icon">🃏</span>
                    <span class="ag-mode-title">Memory match</span>
                    <span class="ag-mode-sub">Pair structures with names</span>
                </button>
                <button class="ag-mode-card" style="--ag-accent:#84cc16" onclick="window.anatomyGame.startPatho('mix')">
                    <span class="ag-mode-icon">🦠</span>
                    <span class="ag-mode-title">Patho Map</span>
                    <span class="ag-mode-sub">Tap where the disease lives · best ${s.patho && s.patho.best || 0}/10</span>
                </button>
            </div>

            ${this.weakSpotsHtml()}

            <h3 class="ag-section-title">All boards</h3>
            <div class="ag-board-grid">${boardCards}</div>
        </div>`;
    }

    weakSpotsHtml() {
        const s = this.store();
        const rows = Object.entries(s.parts)
            .map(([k, v]) => ({ k, ok: v.ok || 0, miss: v.miss || 0 }))
            .filter(r => r.miss > 0 && r.ok + r.miss >= 2)
            .map(r => ({ ...r, rate: r.miss / (r.ok + r.miss) }))
            .sort((a, b) => b.rate - a.rate || b.miss - a.miss)
            .slice(0, 6)
            .map(r => {
                const [bid, pid] = r.k.split(':');
                const b = this.board(bid); const p = b && b.parts.find(x => x.id === pid);
                return (b && p) ? { b, p, ...r } : null;
            }).filter(Boolean);
        if (!rows.length) return '';
        return `
        <h3 class="ag-section-title">Weak spots <span>structures you miss most</span></h3>
        <div class="ag-weak">
            ${rows.map(r => `
            <button class="ag-weak-row" style="--ag-accent:${this.ui(r.p)}" onclick="window.anatomyGame.startStudy('${r.b.id}','${r.p.id}')">
                <span class="ag-weak-dot"></span>
                <span class="ag-weak-name">${this.esc(r.p.name)}</span>
                <span class="ag-weak-board">${r.b.icon} ${this.esc(r.b.title)}</span>
                <span class="ag-weak-rate">${Math.round(r.rate * 100)}% missed</span>
            </button>`).join('')}
        </div>`;
    }

    // ============================================================
    // SHARED PLAYER PLUMBING
    // ============================================================
    openPlayer(title) {
        this.stopTimers();
        const h = document.getElementById('anatomy-game-play-title');
        if (h) h.textContent = title;
        this.app.switchView('anatomy-game-play');
        return document.getElementById('anatomy-game-play-content');
    }
    stopTimers() {
        if (this._timer) { clearInterval(this._timer); this._timer = null; }
        if (this._peekT) { clearTimeout(this._peekT); this._peekT = null; }
    }
    backToMenu() {
        this.stopTimers();
        this.current = null;
        this.save();
        this.app.switchView('anatomy-game');
    }

    // ============================================================
    // MODE 1 — LABEL IT
    // ============================================================
    startLabel(boardId) {
        const b = this.board(boardId);
        if (!b) return;
        this.current = {
            mode: 'label', board: b,
            order: this.shuffle(b.parts),       // chip order
            matched: new Set(), selPart: null, selChip: null,
            mistakes: 0, peeks: 0, start: Date.now(), elapsed: 0, done: false
        };
        const host = this.openPlayer(`${b.icon} ${b.title} — Label It`);
        host.innerHTML = `
        <div class="ag-play" style="--ag-accent:${b.color}">
            <div class="ag-topbar">
                <span class="ag-chip-stat">⏱ <b id="ag-timer">0:00</b></span>
                <span class="ag-chip-stat">✅ <b id="ag-progress">0/${b.parts.length}</b></span>
                <span class="ag-chip-stat">❌ <b id="ag-mistakes">0</b></span>
                <button class="ag-btn ag-btn-ghost ag-btn-sm" onclick="window.anatomyGame.peekLabels()">👁 Peek (3s)</button>
            </div>
            <p class="ag-hint" id="ag-hint">Tap a structure, then tap its name — or the other way round.</p>
            <div class="ag-board-host" id="ag-board-host">${this.boardSvg(b, { pins: true })}</div>
            <div class="ag-fact" id="ag-fact" hidden></div>
            <div class="ag-chips" id="ag-chips">
                ${this.current.order.map(p => `<button class="ag-chip" data-chip="${p.id}" style="--ag-accent:${this.ui(p)}">${this.esc(p.name)}</button>`).join('')}
            </div>
        </div>`;
        host.querySelector('#ag-board-host').addEventListener('click', e => this.labelTapBoard(e));
        host.querySelector('#ag-chips').addEventListener('click', e => this.labelTapChip(e));
        this._timer = setInterval(() => {
            if (!this.current || this.current.done) return;
            this.current.elapsed = Date.now() - this.current.start;
            const t = document.getElementById('ag-timer');
            if (t) t.textContent = this.fmtTime(this.current.elapsed);
        }, 500);
    }

    labelTapBoard(e) {
        const c = this.current; if (!c || c.mode !== 'label' || c.done) return;
        const pid = this.partFromEvent(e);
        if (!pid || c.matched.has(pid)) return;
        const host = document.getElementById('ag-board-host');
        if (c.selPart) this.setPartClass(host, c.selPart, 'sel', false);
        c.selPart = pid;
        this.setPartClass(host, pid, 'sel', true);
        if (c.selChip) this.labelResolve();
    }

    labelTapChip(e) {
        const c = this.current; if (!c || c.mode !== 'label' || c.done) return;
        const btn = e.target.closest('.ag-chip');
        if (!btn || btn.classList.contains('done')) return;
        const id = btn.getAttribute('data-chip');
        document.querySelectorAll('#ag-chips .ag-chip.sel').forEach(x => x.classList.remove('sel'));
        c.selChip = id;
        btn.classList.add('sel');
        if (c.selPart) this.labelResolve();
    }

    labelResolve() {
        const c = this.current;
        const host = document.getElementById('ag-board-host');
        const chipEl = document.querySelector(`#ag-chips .ag-chip[data-chip="${c.selChip}"]`);
        const b = c.board;
        const ok = c.selPart === c.selChip;
        const part = b.parts.find(p => p.id === c.selPart);
        this.tally(b.id, c.selChip, ok);     // the NAME asked is what you did or didn't know
        this.setPartClass(host, c.selPart, 'sel', false);
        if (chipEl) chipEl.classList.remove('sel');

        if (ok) {
            c.matched.add(c.selPart);
            this.setPartClass(host, c.selPart, 'done', true);
            this.flashPart(host, c.selPart, 'hit-ok', 700);
            if (chipEl) {
                chipEl.classList.add('done');
                const n = b.parts.findIndex(p => p.id === c.selPart) + 1;
                chipEl.innerHTML = `<span class="ag-chip-num">${n}</span>${this.esc(part.name)}`;
            }
            const f = document.getElementById('ag-fact');
            if (f) { f.hidden = false; f.innerHTML = `<b style="color:${this.ui(part)}">${this.esc(part.name)}</b> — ${this.esc(part.fact)}`; }
        } else {
            c.mistakes++;
            this.flashPart(host, c.selPart, 'hit-bad', 500);
            if (chipEl) { chipEl.classList.add('bad'); setTimeout(() => chipEl.classList.remove('bad'), 500); }
            const m = document.getElementById('ag-mistakes'); if (m) m.textContent = c.mistakes;
        }
        c.selPart = null; c.selChip = null;
        const pr = document.getElementById('ag-progress'); if (pr) pr.textContent = `${c.matched.size}/${b.parts.length}`;
        if (c.matched.size === b.parts.length) this.labelFinish();
    }

    // Peek: for 3 seconds every unmatched chip shows the number of its pin.
    peekLabels() {
        const c = this.current; if (!c || c.mode !== 'label' || c.done || this._peekT) return;
        c.peeks++;
        const chips = document.querySelectorAll('#ag-chips .ag-chip:not(.done)');
        chips.forEach(ch => {
            const n = c.board.parts.findIndex(p => p.id === ch.getAttribute('data-chip')) + 1;
            ch.insertAdjacentHTML('afterbegin', `<span class="ag-chip-num ag-chip-peek">${n}</span>`);
        });
        if (window.toast) window.toast('Peeking costs a star — look fast!', 'info');
        this._peekT = setTimeout(() => {
            this._peekT = null;
            document.querySelectorAll('#ag-chips .ag-chip-peek').forEach(el => el.remove());
        }, 3000);
    }

    labelFinish() {
        const c = this.current; c.done = true;
        this.stopTimers();
        c.elapsed = Date.now() - c.start;
        const b = c.board;
        const stars = (c.mistakes === 0 && c.peeks === 0) ? 3 : (c.mistakes <= 2 && c.peeks <= 1) ? 2 : 1;
        const s = this.store();
        const rec = s.label[b.id] || { stars: 0, bestMs: 0, plays: 0 };
        const first = rec.plays === 0;
        rec.plays++;
        rec.stars = Math.max(rec.stars || 0, stars);
        if (!rec.bestMs || c.elapsed < rec.bestMs) rec.bestMs = c.elapsed;
        s.label[b.id] = rec;
        // XP: 4 per structure scaled by stars; full on the first clear of a
        // board, half on replays so there is always a reason to come back.
        let xp = Math.round(b.parts.length * 4 * stars / 3);
        if (!first) xp = Math.round(xp / 2);
        if (stars === 3) xp += 15;
        this.awardXP(xp, `Anatomy labelled: ${b.title}`);
        window.gamesHub?.credit('anatomy');
        this.save();
        this.showWin({
            title: stars === 3 ? 'Flawless!' : 'Board complete!',
            name: `${b.icon} ${b.title}`,
            rows: [`⏱ ${this.fmtTime(c.elapsed)}`, `${this.stars(stars)}`, `❌ ${c.mistakes} miss${c.mistakes === 1 ? '' : 'es'}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.anatomyGame.startLabel('${b.id}')">🔁 Play again</button>
                      <button class="ag-btn" onclick="window.anatomyGame.startLightning('${b.id}')">⚡ Lightning</button>`
        });
        if (window.toast) window.toast(`🫀 ${b.title} labelled!`, 'success');
    }

    // ============================================================
    // MODE 2 — LIGHTNING (timed sprint)
    // ============================================================
    startLightning(boardId) {
        const pool = (boardId === 'mix' || !this.board(boardId)) ? this.boards.slice() : [this.board(boardId)];
        if (!pool.length) return;
        this.current = {
            mode: 'lightning', pool, mix: pool.length > 1,
            board: null, queue: [], target: null,
            score: 0, streak: 0, bestStreak: 0, hits: 0, misses: 0,
            msLeft: this.LIGHTNING_SECONDS * 1000, lastTick: Date.now(), locked: false, done: false
        };
        const host = this.openPlayer(this.current.mix ? '⚡ Lightning — all boards' : `⚡ Lightning — ${pool[0].title}`);
        host.innerHTML = `
        <div class="ag-play ag-play-lightning">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🏆 <b id="ag-score">0</b></span>
                <span class="ag-chip-stat">🔥 <b id="ag-streak">0</b> streak</span>
                <span class="ag-chip-stat" id="ag-mult">×1</span>
            </div>
            <div class="ag-clock"><div class="ag-clock-fill" id="ag-clock-fill"></div><span id="ag-clock-text">${this.LIGHTNING_SECONDS}.0</span></div>
            <div class="ag-prompt">Tap the… <b id="ag-target">—</b></div>
            <div class="ag-board-host" id="ag-board-host"></div>
            <p class="ag-hint">Correct taps add 1 second. Three in a row doubles your points, six triples them.</p>
        </div>`;
        host.querySelector('#ag-board-host').addEventListener('click', e => this.lightningTap(e));
        this.lightningNextBoard();
        this._timer = setInterval(() => this.lightningTick(), 100);
    }

    lightningNextBoard() {
        const c = this.current;
        let next;
        if (c.pool.length === 1) next = c.pool[0];
        else { do { next = c.pool[Math.floor(Math.random() * c.pool.length)]; } while (next === c.board); }
        c.board = next;
        c.queue = this.shuffle(next.parts);
        const host = document.getElementById('ag-board-host');
        host.innerHTML = this.boardSvg(next, {});
        host.style.setProperty('--ag-accent', next.color);
        const tag = document.getElementById('anatomy-game-play-title');
        if (tag && c.mix) tag.textContent = `⚡ Lightning — ${next.icon} ${next.title}`;
        this.lightningNextTarget();
    }

    lightningNextTarget() {
        const c = this.current;
        if (!c.queue.length) {
            if (c.mix) { this.lightningNextBoard(); return; }
            c.queue = this.shuffle(c.board.parts);
        }
        c.target = c.queue.shift();
        const t = document.getElementById('ag-target');
        if (t) { t.textContent = c.target.name; t.style.color = this.ui(c.target); }
    }

    multiplier() { const s = this.current.streak; return s >= 6 ? 3 : s >= 3 ? 2 : 1; }

    lightningTap(e) {
        const c = this.current; if (!c || c.mode !== 'lightning' || c.done || c.locked) return;
        const pid = this.partFromEvent(e);
        if (!pid) return;
        const host = document.getElementById('ag-board-host');
        const ok = pid === c.target.id;
        this.tally(c.board.id, c.target.id, ok);
        if (ok) {
            c.hits++; c.streak++; c.bestStreak = Math.max(c.bestStreak, c.streak);
            c.score += 100 * this.multiplier();
            c.msLeft += 1000;
            this.flashPart(host, pid, 'hit-ok', 350);
            this.lightningNextTarget();
        } else {
            c.misses++; c.streak = 0;
            this.flashPart(host, pid, 'hit-bad', 450);
            // Teach, don't just punish: light up the right answer for a beat.
            c.locked = true;
            this.setPartClass(host, c.target.id, 'reveal', true);
            setTimeout(() => {
                if (!this.current || this.current !== c) return;
                this.setPartClass(host, c.target.id, 'reveal', false);
                c.locked = false;
                this.lightningNextTarget();
            }, 900);
        }
        const sc = document.getElementById('ag-score'); if (sc) sc.textContent = c.score;
        const st = document.getElementById('ag-streak'); if (st) st.textContent = c.streak;
        const mu = document.getElementById('ag-mult'); if (mu) { mu.textContent = `×${this.multiplier()}`; mu.classList.toggle('hot', this.multiplier() > 1); }
    }

    lightningTick() {
        const c = this.current; if (!c || c.mode !== 'lightning' || c.done) return;
        const now = Date.now();
        c.msLeft -= now - c.lastTick; c.lastTick = now;
        const total = this.LIGHTNING_SECONDS * 1000;
        const fill = document.getElementById('ag-clock-fill');
        const txt = document.getElementById('ag-clock-text');
        if (fill) {
            fill.style.width = `${Math.max(0, Math.min(100, c.msLeft / total * 100))}%`;
            fill.classList.toggle('low', c.msLeft < 10000);
        }
        if (txt) txt.textContent = (Math.max(0, c.msLeft) / 1000).toFixed(1);
        if (c.msLeft <= 0) this.lightningFinish();
    }

    lightningFinish() {
        const c = this.current; c.done = true;
        this.stopTimers();
        const s = this.store();
        const newBest = c.score > (s.lightning.best || 0);
        s.lightning.best = Math.max(s.lightning.best || 0, c.score);
        s.lightning.bestStreak = Math.max(s.lightning.bestStreak || 0, c.bestStreak);
        s.lightning.plays = (s.lightning.plays || 0) + 1;
        const acc = c.hits + c.misses ? Math.round(c.hits / (c.hits + c.misses) * 100) : 0;
        const xp = Math.min(80, Math.floor(c.score / 100) * 2 + (newBest && c.score > 0 ? 10 : 0));
        this.awardXP(xp, 'Anatomy lightning round');
        window.gamesHub?.credit('anatomy');
        this.save();
        this.showWin({
            title: newBest && c.score > 0 ? 'New best score!' : "Time's up!",
            name: `⚡ ${c.score} points`,
            rows: [`✅ ${c.hits} hits`, `❌ ${c.misses} misses`, `🎯 ${acc}% accuracy`, `🔥 best streak ${c.bestStreak}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.anatomyGame.startLightning('${c.mix ? 'mix' : c.board.id}')">🔁 Go again</button>`
        });
    }

    // ============================================================
    // MODE 3 — MEMORY MATCH
    // ============================================================
    startMemory(boardId) {
        const b = this.board(boardId) || this.todaysBoard();
        if (!b) return;
        const picked = this.shuffle(b.parts).slice(0, 8);
        const cards = this.shuffle([
            ...picked.map(p => ({ kind: 'img', part: p })),
            ...picked.map(p => ({ kind: 'name', part: p }))
        ]);
        this.current = { mode: 'memory', board: b, cards, open: [], matched: new Set(), moves: 0, lock: false, done: false, start: Date.now() };
        const host = this.openPlayer(`${b.icon} ${b.title} — Memory`);
        host.innerHTML = `
        <div class="ag-play" style="--ag-accent:${b.color}">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🃏 <b id="ag-moves">0</b> moves</span>
                <span class="ag-chip-stat">✅ <b id="ag-progress">0/${picked.length}</b></span>
            </div>
            <p class="ag-hint">Flip two cards: pair each highlighted structure with its name.</p>
            <div class="ag-memory" id="ag-memory">
                ${cards.map((cd, i) => `
                <button class="ag-card" data-i="${i}" style="--ag-accent:${this.ui(cd.part)}" aria-label="card">
                    <span class="ag-card-back">?</span>
                    <span class="ag-card-face">${cd.kind === 'img' ? this.boardSvg(b, { mini: true, hl: cd.part.id }) : `<span class="ag-card-name">${this.esc(cd.part.name)}</span>`}</span>
                </button>`).join('')}
            </div>
            <div class="ag-fact" id="ag-fact" hidden></div>
        </div>`;
        host.querySelector('#ag-memory').addEventListener('click', e => this.memoryFlip(e));
    }

    memoryFlip(e) {
        const c = this.current; if (!c || c.mode !== 'memory' || c.done || c.lock) return;
        const btn = e.target.closest('.ag-card');
        if (!btn || btn.classList.contains('open') || btn.classList.contains('matched')) return;
        const i = +btn.getAttribute('data-i');
        btn.classList.add('open');
        c.open.push(i);
        if (c.open.length < 2) return;
        c.moves++;
        const mv = document.getElementById('ag-moves'); if (mv) mv.textContent = c.moves;
        const [a, bIdx] = c.open;
        const A = c.cards[a], B = c.cards[bIdx];
        const els = [a, bIdx].map(k => document.querySelector(`#ag-memory .ag-card[data-i="${k}"]`));
        const ok = A.part.id === B.part.id && A.kind !== B.kind;
        this.tally(c.board.id, A.part.id, ok);
        if (ok) {
            c.matched.add(A.part.id);
            els.forEach(el => el && el.classList.add('matched'));
            c.open = [];
            const f = document.getElementById('ag-fact');
            if (f) { f.hidden = false; f.innerHTML = `<b style="color:${this.ui(A.part)}">${this.esc(A.part.name)}</b> — ${this.esc(A.part.fact)}`; }
            const pr = document.getElementById('ag-progress'); if (pr) pr.textContent = `${c.matched.size}/${c.cards.length / 2}`;
            if (c.matched.size === c.cards.length / 2) this.memoryFinish();
        } else {
            c.lock = true;
            setTimeout(() => {
                els.forEach(el => el && el.classList.remove('open'));
                c.open = []; c.lock = false;
            }, 800);
        }
    }

    memoryFinish() {
        const c = this.current; c.done = true;
        const s = this.store();
        const pairs = c.cards.length / 2;
        const rec = s.memory[c.board.id] || { bestMoves: 0, plays: 0 };
        const first = rec.plays === 0;
        rec.plays++;
        if (!rec.bestMoves || c.moves < rec.bestMoves) rec.bestMoves = c.moves;
        s.memory[c.board.id] = rec;
        const sharp = c.moves <= pairs + 3;
        let xp = first ? 20 : 10;
        if (sharp) xp += 10;
        this.awardXP(xp, `Anatomy memory: ${c.board.title}`);
        window.gamesHub?.credit('anatomy');
        this.save();
        this.showWin({
            title: sharp ? 'Sharp memory!' : 'All pairs found!',
            name: `${c.board.icon} ${c.board.title}`,
            rows: [`🃏 ${c.moves} moves`, `⏱ ${this.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.anatomyGame.startMemory('${c.board.id}')">🔁 Shuffle again</button>
                      <button class="ag-btn" onclick="window.anatomyGame.startLabel('${c.board.id}')">🏷️ Label It</button>`
        });
    }

    // ============================================================
    // MODE 4 — STUDY (no scoring; every label shown, tap for the fact)
    // ============================================================
    startStudy(boardId, focusPartId) {
        const b = this.board(boardId); if (!b) return;
        this.current = { mode: 'study', board: b };
        const host = this.openPlayer(`${b.icon} ${b.title} — Study`);
        host.innerHTML = `
        <div class="ag-play" style="--ag-accent:${b.color}">
            <p class="ag-hint">Tap any numbered structure to read about it. Ready? Try <b>Label It</b>.</p>
            <div class="ag-board-host ag-study-host" id="ag-board-host">${this.boardSvg(b, { pins: true })}</div>
            <div class="ag-fact" id="ag-fact" hidden></div>
            <div class="ag-study-list" id="ag-study-list">
                ${b.parts.map((p, i) => `<button class="ag-study-row" data-part="${p.id}" style="--ag-accent:${this.ui(p)}"><span class="ag-study-num">${i + 1}</span><b>${this.esc(p.name)}</b><span>${this.esc(p.fact)}</span></button>`).join('')}
            </div>
            <div class="ag-win-actions" style="margin-top:1rem">
                <button class="ag-btn ag-btn-primary" onclick="window.anatomyGame.startLabel('${b.id}')">🏷️ Label It</button>
                <button class="ag-btn" onclick="window.anatomyGame.startLightning('${b.id}')">⚡ Lightning</button>
            </div>
        </div>`;
        const show = pid => {
            const p = b.parts.find(x => x.id === pid); if (!p) return;
            const hostEl = document.getElementById('ag-board-host');
            hostEl.querySelectorAll('.ag-part.sel, .ag-pin.sel').forEach(el => el.classList.remove('sel'));
            this.setPartClass(hostEl, pid, 'sel', true);
            const f = document.getElementById('ag-fact');
            if (f) { f.hidden = false; f.innerHTML = `<b style="color:${this.ui(p)}">${this.esc(p.name)}</b> — ${this.esc(p.fact)}`; }
            document.querySelectorAll('#ag-study-list .ag-study-row').forEach(r => r.classList.toggle('sel', r.getAttribute('data-part') === pid));
        };
        host.querySelector('#ag-board-host').addEventListener('click', e => { const pid = this.partFromEvent(e); if (pid) show(pid); });
        host.querySelector('#ag-study-list').addEventListener('click', e => { const r = e.target.closest('.ag-study-row'); if (r) show(r.getAttribute('data-part')); });
        if (focusPartId) show(focusPartId);
    }

    // ============================================================
    // MODE 5 — PATHO MAP (where does this disease live?)
    // ============================================================
    startPatho(boardId) {
        const bank = window.PATHO_MAP || {};
        let queue;
        if (boardId === 'mix' || !bank[boardId]) {
            queue = [];
            Object.entries(bank).forEach(([bid, list]) => { if (this.board(bid)) list.forEach(cd => queue.push({ bid, cd })); });
            queue = this.shuffle(queue).slice(0, 10);
        } else {
            queue = this.shuffle(bank[boardId]).slice(0, 10).map(cd => ({ bid: boardId, cd }));
        }
        if (!queue.length) return;
        const mix = boardId === 'mix' || !bank[boardId];
        this.current = { mode: 'patho', queue, i: 0, correct: 0, mistakes: 0, boardId: null, locked: false, start: Date.now(), done: false, mix };
        const host = this.openPlayer(mix ? '🦠 Patho Map — all boards' : `🦠 Patho Map — ${this.board(boardId).title}`);
        host.innerHTML = `
        <div class="ag-play ag-play-patho">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🦠 <b id="ag-progress">1/${queue.length}</b></span>
                <span class="ag-chip-stat">✅ <b id="ag-ok">0</b></span>
                <span class="ag-chip-stat">❌ <b id="ag-mistakes">0</b></span>
            </div>
            <div class="ag-prompt">Where does this live? <b id="ag-target">—</b></div>
            <div class="ag-board-host" id="ag-board-host"></div>
            <div class="ag-fact" id="ag-fact" hidden></div>
            <div class="ag-win-actions" id="ag-next" hidden><button class="ag-btn ag-btn-primary" onclick="window.anatomyGame.pathoAdvance()">Next →</button></div>
        </div>`;
        host.querySelector('#ag-board-host').addEventListener('click', e => this.pathoTap(e));
        this.pathoNext();
    }
    pathoNext() {
        const c = this.current;
        if (c.i >= c.queue.length) { this.pathoFinish(); return; }
        const { bid, cd } = c.queue[c.i];
        const host = document.getElementById('ag-board-host');
        if (c.boardId !== bid) {
            const b = this.board(bid);
            host.innerHTML = this.boardSvg(b, {});
            host.style.setProperty('--ag-accent', b.color);
            c.boardId = bid;
            const tag = document.getElementById('anatomy-game-play-title');
            if (tag && c.mix) tag.textContent = `🦠 Patho Map — ${b.icon} ${b.title}`;
        } else {
            host.querySelectorAll('.ag-part.reveal, .ag-part.sel').forEach(el => el.classList.remove('reveal', 'sel'));
        }
        const t = document.getElementById('ag-target'); if (t) t.textContent = cd.name;
        const pr = document.getElementById('ag-progress'); if (pr) pr.textContent = `${c.i + 1}/${c.queue.length}`;
        document.getElementById('ag-fact').hidden = true;
        document.getElementById('ag-next').hidden = true;
        c.locked = false;
    }
    pathoTap(e) {
        const c = this.current; if (!c || c.mode !== 'patho' || c.done || c.locked) return;
        const pid = this.partFromEvent(e); if (!pid) return;
        const { bid, cd } = c.queue[c.i];
        const b = this.board(bid);
        const host = document.getElementById('ag-board-host');
        const ok = cd.parts.includes(pid);
        this.tally(bid, ok ? pid : cd.parts[0], ok);
        c.locked = true;
        if (ok) { c.correct++; this.flashPart(host, pid, 'hit-ok', 600); }
        else { c.mistakes++; this.flashPart(host, pid, 'hit-bad', 500); }
        cd.parts.forEach(id => this.setPartClass(host, id, 'reveal', true));
        const names = cd.parts.map(id => (b.parts.find(p => p.id === id) || {}).name).filter(Boolean).join(' / ');
        const f = document.getElementById('ag-fact');
        f.hidden = false;
        f.innerHTML = `<b style="color:${ok ? '#34d399' : '#f87171'}">${this.esc(cd.name)}</b> → ${this.esc(names)}<br><span>${this.esc(cd.why)}</span>`;
        document.getElementById('ag-ok').textContent = c.correct;
        document.getElementById('ag-mistakes').textContent = c.mistakes;
        document.getElementById('ag-next').hidden = false;
    }
    pathoAdvance() { const c = this.current; if (!c || c.mode !== 'patho') return; c.i++; this.pathoNext(); }
    pathoFinish() {
        const c = this.current; c.done = true;
        const s = this.store();
        const stars = c.mistakes === 0 ? 3 : c.mistakes <= 2 ? 2 : 1;
        s.patho.rounds = (s.patho.rounds || 0) + 1;
        s.patho.best = Math.max(s.patho.best || 0, c.correct);
        const xp = c.correct * 3 + (stars === 3 ? 15 : 0);
        this.awardXP(xp, 'Anatomy patho map');
        window.gamesHub?.credit('anatomy');
        this.save();
        this.showWin({
            title: stars === 3 ? 'Diagnostic eye!' : 'Round complete',
            name: `🦠 ${c.correct}/${c.queue.length} located`,
            rows: [this.stars(stars), `⏱ ${this.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.anatomyGame.startPatho('${c.mix ? 'mix' : c.boardId}')">🔁 Go again</button>`
        });
    }

    // ============================================================
    // RESULT OVERLAY
    // ============================================================
    showWin({ title, name, rows, actions }) {
        const host = document.getElementById('anatomy-game-play-content');
        if (!host) return;
        const o = document.createElement('div');
        o.className = 'ag-win-overlay';
        o.innerHTML = `
            <div class="ag-win-card">
                <div class="ag-win-burst">🎉</div>
                <h3>${this.esc(title)}</h3>
                <p class="ag-win-name">${this.esc(name)}</p>
                <div class="ag-win-stats">${rows.map(r => `<div>${this.esc(r)}</div>`).join('')}</div>
                <div class="ag-win-actions">
                    ${actions || ''}
                    <button class="ag-btn ag-btn-primary" onclick="window.anatomyGame.backToMenu()">Back to boards</button>
                </div>
            </div>`;
        host.appendChild(o);
    }
}
