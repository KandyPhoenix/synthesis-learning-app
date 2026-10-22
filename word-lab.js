// ============================================
// SYNTHESIS — WORD LAB (medical terminology)
// Three ways to play the word-part bank in word-lab-bank.js:
//   • Build  — a meaning is shown; assemble the term from color-coded
//              prefix / root / suffix tiles (with distractors).
//   • Sort   — 45-second sprint: is this word part a prefix, root or suffix?
//   • Define — term → meaning or meaning → term, 4 choices; every answer
//              shows the term dissected with each part's meaning.
// Plus a searchable word-part glossary. Missed parts are tallied so the menu
// can show "parts to review". State: APP_DATA.user.games.wordlab.
// ============================================

class WordLab {
    constructor(app) {
        this.app = app;
        this.parts = Array.isArray(window.WORD_LAB_PARTS) ? window.WORD_LAB_PARTS : [];
        this.terms = Array.isArray(window.WORD_LAB_TERMS) ? window.WORD_LAB_TERMS : [];
        this.byId = {};
        this.parts.forEach(p => { this.byId[p.id] = p; });
        this.buildable = this.terms.filter(t => !t.skipBuild && t.parts.length >= 2 && t.parts.every(id => this.byId[id]));
        this.current = null;
        this._timer = null;
        this.SORT_SECONDS = 45;
        this.TYPE = { prefix: { label: 'Prefix', color: '#60a5fa' }, root: { label: 'Root', color: '#fb923c' }, suffix: { label: 'Suffix', color: '#34d399' } };
    }
    ui() { return window.gamesUI; }
    store() {
        if (!APP_DATA.user.games) APP_DATA.user.games = {};
        const g = APP_DATA.user.games;
        if (!g.wordlab) g.wordlab = { build: { rounds: 0, best: 0, terms: 0 }, sort: { best: 0, plays: 0 }, define: { rounds: 0, best: 0 }, parts: {} };
        return g.wordlab;
    }
    tally(id, ok) {
        const s = this.store();
        if (!s.parts[id]) s.parts[id] = { ok: 0, miss: 0 };
        s.parts[id][ok ? 'ok' : 'miss']++;
    }
    summary() {
        const s = this.store();
        return `${s.build.terms || 0} terms built · sort best ${s.sort.best || 0}`;
    }
    tile(p, extraCls) {
        const t = this.TYPE[p.type];
        return `<span class="wl-tile ${extraCls || ''}" style="--wl-c:${t.color}">${this.ui().esc(p.form)}</span>`;
    }
    dissect(term) {
        if (term.skipBuild) return `<div class="wl-dissect"><em>${this.ui().esc(term.term)}</em> — ${this.ui().esc(term.meaning)}</div>`;
        return `<div class="wl-dissect">${term.parts.map(id => {
            const p = this.byId[id]; const t = this.TYPE[p.type];
            return `<span class="wl-dissect-part" style="--wl-c:${t.color}"><b>${this.ui().esc(p.form)}</b><span>${this.ui().esc(p.meaning)}</span></span>`;
        }).join('<span class="wl-plus">+</span>')}</div>`;
    }

    stop() { if (this._timer) { clearInterval(this._timer); this._timer = null; } }
    back() {
        if (this.current) { this.stop(); this.current = null; this.ui().save(); this.render(); }
        else this.app.goBack();
    }
    host() { return document.getElementById('word-lab-content'); }

    // ============================================================
    // MENU
    // ============================================================
    render() {
        const host = this.host(); if (!host) return;
        this.stop(); this.current = null;
        const s = this.store();
        const weak = Object.entries(s.parts).map(([id, v]) => ({ id, ...v }))
            .filter(r => r.miss > 0 && this.byId[r.id]).sort((a, b) => b.miss - a.miss || a.ok - b.ok).slice(0, 8);
        host.innerHTML = `
        <div class="gm-wrap">
            <div class="gm-hero" style="--gm-accent:#38bdf8">
                <h2>Every medical term is just Lego.</h2>
                <p>Prefix + root + suffix. Learn ${this.parts.length} word parts and you can read thousands of terms you have never seen. <span class="wl-legend">${Object.values(this.TYPE).map(t => `<span style="--wl-c:${t.color}">${t.label}</span>`).join('')}</span></p>
            </div>
            <div class="ag-modes">
                <button class="ag-mode-card" style="--ag-accent:#fb923c" onclick="window.wordLab.startBuild()">
                    <span class="ag-mode-icon">🧱</span><span class="ag-mode-title">Build</span>
                    <span class="ag-mode-sub">8 terms from tiles · ${s.build.terms || 0} built</span>
                </button>
                <button class="ag-mode-card" style="--ag-accent:#facc15" onclick="window.wordLab.startSort()">
                    <span class="ag-mode-icon">⚡</span><span class="ag-mode-title">Sort</span>
                    <span class="ag-mode-sub">${this.SORT_SECONDS}s prefix/root/suffix · best ${s.sort.best || 0}</span>
                </button>
                <button class="ag-mode-card" style="--ag-accent:#34d399" onclick="window.wordLab.startDefine()">
                    <span class="ag-mode-icon">🔍</span><span class="ag-mode-title">Define</span>
                    <span class="ag-mode-sub">10 questions · best ${s.define.best || 0}/10</span>
                </button>
                <button class="ag-mode-card" style="--ag-accent:#a78bfa" onclick="window.wordLab.showGlossary()">
                    <span class="ag-mode-icon">📖</span><span class="ag-mode-title">Word parts</span>
                    <span class="ag-mode-sub">Browse & search all ${this.parts.length}</span>
                </button>
            </div>
            ${weak.length ? `
            <h3 class="ag-section-title">Parts to review <span>tap to flip</span></h3>
            <div class="wl-weak">${weak.map(r => { const p = this.byId[r.id]; const t = this.TYPE[p.type]; return `
                <button class="wl-flip" style="--wl-c:${t.color}" onclick="this.classList.toggle('on')">
                    <span class="wl-flip-front">${this.ui().esc(p.form)}</span>
                    <span class="wl-flip-back">${this.ui().esc(p.meaning)}</span>
                    <span class="wl-flip-miss">${r.miss} miss${r.miss === 1 ? '' : 'es'}</span>
                </button>`; }).join('')}</div>` : ''}
        </div>`;
    }

    showGlossary() {
        const host = this.host(); if (!host) return;
        this.current = { mode: 'glossary' };
        const groups = ['prefix', 'root', 'suffix'];
        host.innerHTML = `
        <div class="gm-wrap">
            <input class="wl-search" id="wl-search" type="search" placeholder="Search a part or meaning… e.g. kidney, -itis" autocomplete="off">
            ${groups.map(g => `
            <h3 class="ag-section-title" style="color:${this.TYPE[g].color}">${this.TYPE[g].label}es</h3>
            <div class="wl-gloss" data-type="${g}">
                ${this.parts.filter(p => p.type === g).map(p => `<div class="wl-gloss-row" data-q="${this.ui().esc((p.form + ' ' + p.meaning).toLowerCase())}" style="--wl-c:${this.TYPE[g].color}"><b>${this.ui().esc(p.form)}</b><span>${this.ui().esc(p.meaning)}</span></div>`).join('')}
            </div>`).join('')}
        </div>`;
        host.querySelector('#wl-search').addEventListener('input', e => {
            const q = e.target.value.trim().toLowerCase();
            host.querySelectorAll('.wl-gloss-row').forEach(r => { r.style.display = (!q || r.getAttribute('data-q').includes(q)) ? '' : 'none'; });
        });
    }

    // ============================================================
    // BUILD
    // ============================================================
    startBuild() {
        if (!this.buildable.length) return;
        const u = this.ui();
        this.app.switchView('word-lab');   // renders the menu; the round below replaces it
        this.current = { mode: 'build', queue: u.shuffle(this.buildable).slice(0, 8), i: 0, correct: 0, mistakes: 0, reveals: 0, start: Date.now(), done: false };
        this.buildNext();
    }
    buildNext() {
        const c = this.current; const u = this.ui();
        if (c.i >= c.queue.length) { this.buildFinish(); return; }
        const term = c.queue[c.i];
        const needed = term.parts.map(id => this.byId[id]);
        // Distractors: one extra part of each needed type, plus one wildcard.
        const distract = [];
        needed.forEach(p => { const d = u.pick(this.parts.filter(x => x.type === p.type && !term.parts.includes(x.id)), 1); distract.push(...d); });
        distract.push(...u.pick(this.parts.filter(x => !term.parts.includes(x.id) && !distract.includes(x)), 1));
        c.tray = u.shuffle([...needed, ...distract]);
        c.slots = []; c.attempted = false;
        const host = this.host();
        host.innerHTML = `
        <div class="ag-play" style="--ag-accent:#fb923c">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🧱 <b>${c.i + 1}/${c.queue.length}</b></span>
                <span class="ag-chip-stat">✅ <b id="wl-ok">${c.correct}</b></span>
                <span class="ag-chip-stat">❌ <b id="wl-miss">${c.mistakes}</b></span>
                <button class="ag-btn ag-btn-ghost ag-btn-sm" onclick="window.wordLab.buildReveal()">👁 Show me</button>
            </div>
            <div class="wl-meaning"><span>Build the term that means</span><b>${u.esc(term.meaning)}</b></div>
            <div class="wl-slots" id="wl-slots">${term.parts.map(() => `<span class="wl-slot"></span>`).join('')}</div>
            <div class="wl-tray" id="wl-tray">${c.tray.map((p, k) => `<button class="wl-tile" data-k="${k}" style="--wl-c:${this.TYPE[p.type].color}">${u.esc(p.form)}</button>`).join('')}</div>
            <div class="ag-fact" id="wl-fact" hidden></div>
            <p class="ag-hint">Tap tiles in order. Tap a placed tile to put it back. <span class="wl-legend">${Object.values(this.TYPE).map(t => `<span style="--wl-c:${t.color}">${t.label}</span>`).join('')}</span></p>
        </div>`;
        host.querySelector('#wl-tray').addEventListener('click', e => { const b = e.target.closest('.wl-tile'); if (b && !b.disabled) this.buildPlace(+b.getAttribute('data-k')); });
        host.querySelector('#wl-slots').addEventListener('click', e => { const s = e.target.closest('.wl-slot.filled'); if (s) this.buildUnplace(+s.getAttribute('data-k')); });
    }
    buildPlace(k) {
        const c = this.current; if (!c || c.locked) return;
        const term = c.queue[c.i];
        if (c.slots.length >= term.parts.length) return;
        c.slots.push(k);
        this.buildRefresh();
        if (c.slots.length === term.parts.length) this.buildCheck();
    }
    buildUnplace(k) {
        const c = this.current; if (!c || c.locked) return;
        c.slots = c.slots.filter(x => x !== k);
        this.buildRefresh();
    }
    buildRefresh() {
        const c = this.current; const u = this.ui();
        const slots = document.querySelectorAll('#wl-slots .wl-slot');
        slots.forEach((s, i) => {
            const k = c.slots[i];
            if (k === undefined) { s.className = 'wl-slot'; s.innerHTML = ''; s.removeAttribute('data-k'); s.style.removeProperty('--wl-c'); }
            else { const p = c.tray[k]; s.className = 'wl-slot filled'; s.setAttribute('data-k', k); s.style.setProperty('--wl-c', this.TYPE[p.type].color); s.textContent = p.form; }
        });
        document.querySelectorAll('#wl-tray .wl-tile').forEach(b => { b.disabled = c.slots.includes(+b.getAttribute('data-k')); });
    }
    buildCheck() {
        const c = this.current; const term = c.queue[c.i]; const u = this.ui();
        const placed = c.slots.map(k => c.tray[k].id);
        const ok = placed.every((id, i) => id === term.parts[i]);
        const slotsEl = document.getElementById('wl-slots');
        const fact = document.getElementById('wl-fact');
        if (ok) {
            if (!c.attempted) c.correct++;
            term.parts.forEach(id => this.tally(id, !c.attempted));
            slotsEl.classList.add('ok');
            fact.hidden = false;
            fact.innerHTML = `<b style="color:#34d399">${u.esc(term.term)}</b> ${this.dissect(term)}`;
            document.getElementById('wl-ok').textContent = c.correct;
            c.locked = true;
            setTimeout(() => { if (this.current !== c) return; c.locked = false; c.i++; this.buildNext(); }, 1600);
        } else {
            c.mistakes++; c.attempted = true;
            placed.forEach((id, i) => { if (id !== term.parts[i]) this.tally(term.parts[i], false); });
            document.getElementById('wl-miss').textContent = c.mistakes;
            slotsEl.classList.add('bad');
            c.locked = true;
            setTimeout(() => { if (this.current !== c) return; slotsEl.classList.remove('bad'); c.slots = []; c.locked = false; this.buildRefresh(); }, 500);
        }
    }
    buildReveal() {
        const c = this.current; if (!c || c.locked || c.mode !== 'build') return;
        const term = c.queue[c.i]; const u = this.ui();
        c.reveals++; c.attempted = true;
        term.parts.forEach(id => this.tally(id, false));
        c.slots = term.parts.map(id => c.tray.findIndex(p => p.id === id));
        this.buildRefresh();
        const fact = document.getElementById('wl-fact');
        fact.hidden = false; fact.innerHTML = `<b style="color:#facc15">${u.esc(term.term)}</b> ${this.dissect(term)}`;
        c.locked = true;
        setTimeout(() => { if (this.current !== c) return; c.locked = false; c.i++; this.buildNext(); }, 2200);
    }
    buildFinish() {
        const c = this.current; c.done = true; const u = this.ui(); const s = this.store();
        const stars = u.starsFor(c.mistakes, c.reveals);
        s.build.rounds++; s.build.terms = (s.build.terms || 0) + c.correct; s.build.best = Math.max(s.build.best || 0, c.correct);
        const xp = c.correct * 3 + (stars === 3 ? 10 : 0);
        u.awardXP(xp, 'Word Lab: terms built');
        window.gamesHub?.credit('wordlab');
        u.save();
        u.win('word-lab-content', {
            title: stars === 3 ? 'Word wizard!' : 'Round complete',
            name: `${c.correct}/${c.queue.length} built first try`,
            rows: [u.stars(stars), `⏱ ${u.fmtTime(Date.now() - c.start)}`, `❌ ${c.mistakes}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.wordLab.startBuild()">🔁 New round</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.wordLab.back()">Word Lab</button>`
        });
    }

    // ============================================================
    // SORT (timed)
    // ============================================================
    startSort() {
        const u = this.ui();
        this.app.switchView('word-lab');
        this.current = { mode: 'sort', queue: u.shuffle(this.parts), score: 0, streak: 0, best: 0, hits: 0, misses: 0, msLeft: this.SORT_SECONDS * 1000, last: Date.now(), locked: false, done: false };
        const host = this.host();
        host.innerHTML = `
        <div class="ag-play" style="--ag-accent:#facc15">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🏆 <b id="wl-score">0</b></span>
                <span class="ag-chip-stat">🔥 <b id="wl-streak">0</b></span>
            </div>
            <div class="ag-clock"><div class="ag-clock-fill" id="wl-clock"></div><span id="wl-clock-text">${this.SORT_SECONDS}.0</span></div>
            <div class="wl-sort-card" id="wl-sort-card"><span class="wl-sort-part" id="wl-sort-part"></span><span class="wl-sort-meaning" id="wl-sort-meaning"></span></div>
            <div class="wl-buckets">${['prefix', 'root', 'suffix'].map(t => `<button class="wl-bucket" data-t="${t}" style="--wl-c:${this.TYPE[t].color}">${this.TYPE[t].label}</button>`).join('')}</div>
            <p class="ag-hint">Prefixes sit at the front (hyper-), suffixes at the end (-itis), roots carry the body part (cardi/o).</p>
        </div>`;
        host.querySelector('.wl-buckets').addEventListener('click', e => { const b = e.target.closest('.wl-bucket'); if (b) this.sortAnswer(b.getAttribute('data-t')); });
        this.sortNext();
        this._timer = setInterval(() => this.sortTick(), 100);
    }
    sortNext() {
        const c = this.current;
        if (!c.queue.length) c.queue = this.ui().shuffle(this.parts);
        c.part = c.queue.shift();
        document.getElementById('wl-sort-part').textContent = c.part.form;
        const m = document.getElementById('wl-sort-meaning'); m.textContent = ''; m.style.color = '';
        document.getElementById('wl-sort-card').className = 'wl-sort-card';
    }
    sortAnswer(t) {
        const c = this.current; if (!c || c.done || c.locked) return;
        const ok = t === c.part.type;
        this.tally(c.part.id, ok);
        const card = document.getElementById('wl-sort-card');
        const m = document.getElementById('wl-sort-meaning');
        if (ok) {
            c.hits++; c.streak++; c.best = Math.max(c.best, c.streak);
            c.score += 10 * (c.streak >= 10 ? 3 : c.streak >= 5 ? 2 : 1);
            c.msLeft += 700;
            card.classList.add('ok');
            m.textContent = c.part.meaning; m.style.color = this.TYPE[c.part.type].color;
            c.locked = true; setTimeout(() => { if (this.current !== c || c.done) return; c.locked = false; this.sortNext(); }, 350);
        } else {
            c.misses++; c.streak = 0;
            card.classList.add('bad');
            m.textContent = `${this.TYPE[c.part.type].label} — ${c.part.meaning}`; m.style.color = this.TYPE[c.part.type].color;
            c.locked = true; setTimeout(() => { if (this.current !== c || c.done) return; c.locked = false; this.sortNext(); }, 1000);
        }
        document.getElementById('wl-score').textContent = c.score;
        document.getElementById('wl-streak').textContent = c.streak;
    }
    sortTick() {
        const c = this.current; if (!c || c.mode !== 'sort' || c.done) return;
        const now = Date.now(); c.msLeft -= now - c.last; c.last = now;
        const f = document.getElementById('wl-clock'); const t = document.getElementById('wl-clock-text');
        if (f) { f.style.width = `${Math.max(0, Math.min(100, c.msLeft / (this.SORT_SECONDS * 1000) * 100))}%`; f.classList.toggle('low', c.msLeft < 8000); }
        if (t) t.textContent = (Math.max(0, c.msLeft) / 1000).toFixed(1);
        if (c.msLeft <= 0) this.sortFinish();
    }
    sortFinish() {
        const c = this.current; c.done = true; this.stop(); const u = this.ui(); const s = this.store();
        const newBest = c.score > (s.sort.best || 0);
        s.sort.best = Math.max(s.sort.best || 0, c.score); s.sort.plays++;
        const acc = c.hits + c.misses ? Math.round(c.hits / (c.hits + c.misses) * 100) : 0;
        const xp = Math.min(60, Math.floor(c.score / 10) + (newBest && c.score ? 10 : 0));
        u.awardXP(xp, 'Word Lab: sort sprint');
        window.gamesHub?.credit('wordlab');
        u.save();
        u.win('word-lab-content', {
            title: newBest && c.score ? 'New best!' : "Time's up!",
            name: `⚡ ${c.score} points`,
            rows: [`✅ ${c.hits}`, `❌ ${c.misses}`, `🎯 ${acc}%`, `🔥 best streak ${c.best}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.wordLab.startSort()">🔁 Go again</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.wordLab.back()">Word Lab</button>`
        });
    }

    // ============================================================
    // DEFINE (multiple choice, both directions)
    // ============================================================
    startDefine() {
        const u = this.ui();
        this.app.switchView('word-lab');
        this.current = { mode: 'define', queue: u.shuffle(this.terms).slice(0, 10), i: 0, correct: 0, start: Date.now(), locked: false };
        this.defineNext();
    }
    defineNext() {
        const c = this.current; const u = this.ui();
        if (c.i >= c.queue.length) { this.defineFinish(); return; }
        const term = c.queue[c.i];
        const dir = Math.random() < 0.5 ? 't2m' : 'm2t';
        const others = u.pick(this.terms.filter(t => t !== term && t.meaning !== term.meaning), 3);
        const opts = u.shuffle([term, ...others]);
        c.term = term; c.dir = dir;
        const host = this.host();
        host.innerHTML = `
        <div class="ag-play" style="--ag-accent:#34d399">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🔍 <b>${c.i + 1}/${c.queue.length}</b></span>
                <span class="ag-chip-stat">✅ <b>${c.correct}</b></span>
            </div>
            <div class="wl-meaning"><span>${dir === 't2m' ? 'What does this mean?' : 'Which term means'}</span><b>${u.esc(dir === 't2m' ? term.term : term.meaning)}</b></div>
            <div class="wl-options" id="wl-options">${opts.map((o, k) => `<button class="wl-option" data-k="${k}">${u.esc(dir === 't2m' ? o.meaning : o.term)}</button>`).join('')}</div>
            <div class="ag-fact" id="wl-fact" hidden></div>
            <div class="ag-win-actions" id="wl-next" hidden><button class="ag-btn ag-btn-primary" onclick="window.wordLab.current.i++; window.wordLab.defineNext()">Next →</button></div>
        </div>`;
        c.opts = opts;
        host.querySelector('#wl-options').addEventListener('click', e => { const b = e.target.closest('.wl-option'); if (b) this.defineAnswer(+b.getAttribute('data-k')); });
    }
    defineAnswer(k) {
        const c = this.current; if (!c || c.locked) return;
        c.locked = true;
        const ok = c.opts[k] === c.term;
        if (ok) c.correct++;
        if (!c.term.skipBuild) c.term.parts.forEach(id => this.tally(id, ok));
        document.querySelectorAll('#wl-options .wl-option').forEach((b, i) => {
            b.disabled = true;
            if (c.opts[i] === c.term) b.classList.add('ok');
            else if (i === k) b.classList.add('bad');
        });
        const f = document.getElementById('wl-fact');
        f.hidden = false; f.innerHTML = `<b style="color:${ok ? '#34d399' : '#f87171'}">${this.ui().esc(c.term.term)}</b> — ${this.ui().esc(c.term.meaning)} ${this.dissect(c.term)}`;
        document.getElementById('wl-next').hidden = false;
        c.locked = false;
    }
    defineFinish() {
        const c = this.current; const u = this.ui(); const s = this.store();
        s.define.rounds++; s.define.best = Math.max(s.define.best || 0, c.correct);
        const xp = c.correct * 2 + (c.correct === c.queue.length ? 10 : 0);
        u.awardXP(xp, 'Word Lab: define');
        window.gamesHub?.credit('wordlab');
        u.save();
        u.win('word-lab-content', {
            title: c.correct === c.queue.length ? 'Perfect!' : 'Round complete',
            name: `${c.correct}/${c.queue.length} correct`,
            rows: [`⏱ ${u.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.wordLab.startDefine()">🔁 New round</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.wordLab.back()">Word Lab</button>`
        });
    }
}
