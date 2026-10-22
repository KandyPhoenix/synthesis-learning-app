// ============================================
// SYNTHESIS — CODE SPRINT (medical coding)
//   • Chapter Sprint — which ICD-10-CM chapter does this condition belong to?
//                      10 questions, 4 chapter choices, the code category
//                      shown after each answer.
//   • Code Set Sort  — ICD-10-CM, ICD-10-PCS, CPT or HCPCS Level II?
//   • Chapter Map    — study the 22 chapters with example conditions.
// Data: code-sprint-bank.js. State: APP_DATA.user.games.code.
// ============================================

class CodeSprint {
    constructor(app) {
        this.app = app;
        this.chapters = Array.isArray(window.CODE_CHAPTERS) ? window.CODE_CHAPTERS : [];
        this.conditions = Array.isArray(window.CODE_CONDITIONS) ? window.CODE_CONDITIONS : [];
        this.sets = Array.isArray(window.CODE_SETS) ? window.CODE_SETS : [];
        this.items = Array.isArray(window.CODE_SET_ITEMS) ? window.CODE_SET_ITEMS : [];
        this.current = null;
        this.ROUND = 10;
    }
    ui() { return window.gamesUI; }
    store() {
        if (!APP_DATA.user.games) APP_DATA.user.games = {};
        const g = APP_DATA.user.games;
        if (!g.code) g.code = { chapters: { rounds: 0, best: 0, total: 0, correct: 0 }, sets: { rounds: 0, best: 0 }, missed: {} };
        return g.code;
    }
    chapter(n) { return this.chapters.find(c => c.n === n); }
    summary() {
        const s = this.store();
        const acc = s.chapters.total ? Math.round(s.chapters.correct / s.chapters.total * 100) : 0;
        return `${s.chapters.rounds || 0} chapter rounds · ${acc}% accuracy`;
    }
    host() { return document.getElementById('code-sprint-content'); }
    back() {
        if (this.current) { this.current = null; this.ui().save(); this.render(); }
        else this.app.goBack();
    }
    chapterBtn(ch, k) {
        return `<button class="cs-option" data-k="${k}" style="--gm-accent:${ch.color}"><span class="cs-range">${ch.range}</span><span class="cs-name">${this.ui().esc(ch.name)}</span></button>`;
    }

    // ============================================================
    // MENU
    // ============================================================
    render() {
        const host = this.host(); if (!host) return;
        this.current = null;
        const u = this.ui(); const s = this.store();
        const missed = Object.entries(s.missed).map(([n, v]) => ({ ch: this.chapter(+n), miss: v })).filter(r => r.ch && r.miss > 0).sort((a, b) => b.miss - a.miss).slice(0, 5);
        host.innerHTML = `
        <div class="gm-wrap">
            <div class="gm-hero" style="--gm-accent:#10b981">
                <h2>Know the chapter, find the code.</h2>
                <p>Every ICD-10-CM code lives in one of 22 chapters. Knowing which one a condition belongs to is half of every lookup — and the Tabular List is organized by it.</p>
            </div>
            <div class="ag-modes">
                <button class="ag-mode-card ag-mode-today" style="--ag-accent:#10b981" onclick="window.codeSprint.startChapters()">
                    <span class="ag-mode-icon">🧾</span><span class="ag-mode-title">Chapter Sprint</span>
                    <span class="ag-mode-sub">${this.ROUND} conditions · best ${s.chapters.best || 0}/${this.ROUND} · ${this.conditions.length} in the bank</span>
                </button>
                <button class="ag-mode-card" style="--ag-accent:#a855f7" onclick="window.codeSprint.startSets()">
                    <span class="ag-mode-icon">🗂️</span><span class="ag-mode-title">Code Set Sort</span>
                    <span class="ag-mode-sub">CM · PCS · CPT · HCPCS · best ${s.sets.best || 0}/${this.ROUND}</span>
                </button>
                <button class="ag-mode-card" style="--ag-accent:#38bdf8" onclick="window.codeSprint.showMap()">
                    <span class="ag-mode-icon">🗺️</span><span class="ag-mode-title">Chapter Map</span>
                    <span class="ag-mode-sub">All 22 chapters, with examples</span>
                </button>
            </div>
            ${missed.length ? `
            <h3 class="ag-section-title">Chapters to review</h3>
            <div class="cs-missed">${missed.map(r => `<button class="cs-missed-row" style="--gm-accent:${r.ch.color}" onclick="window.codeSprint.showMap(${r.ch.n})"><span class="cs-range">${r.ch.range}</span><span>${u.esc(r.ch.name)}</span><span class="cs-missed-n">${r.miss} missed</span></button>`).join('')}</div>` : ''}
        </div>`;
    }

    showMap(focus) {
        const host = this.host(); if (!host) return;
        this.current = { mode: 'map' };
        const u = this.ui();
        host.innerHTML = `
        <div class="gm-wrap">
            <p class="ag-hint">Tap a chapter to see example conditions and their code categories.</p>
            <div class="cs-map">${this.chapters.map(ch => `
                <details class="cs-ch" style="--gm-accent:${ch.color}" ${focus === ch.n ? 'open' : ''} id="cs-ch-${ch.n}">
                    <summary><span class="cs-ch-n">${ch.n}</span><span class="cs-range">${ch.range}</span><span class="cs-name">${u.esc(ch.name)}</span></summary>
                    <div class="cs-ch-body">${this.conditions.filter(c => c[1] === ch.n).map(c => `<div class="cs-ex"><span>${u.esc(c[0])}</span><code>${u.esc(c[2])}</code></div>`).join('') || '<div class="cs-ex"><span>No examples yet.</span></div>'}</div>
                </details>`).join('')}</div>
            <div class="ag-win-actions" style="margin-top:1rem"><button class="ag-btn ag-btn-primary" onclick="window.codeSprint.startChapters()">🧾 Chapter Sprint</button></div>
        </div>`;
        if (focus) { const el = document.getElementById(`cs-ch-${focus}`); if (el) el.scrollIntoView({ block: 'center' }); }
    }

    // ============================================================
    // CHAPTER SPRINT
    // ============================================================
    startChapters() {
        const u = this.ui();
        this.app.switchView('code-sprint');   // renders the menu; the round below replaces it
        this.current = { mode: 'chapters', queue: u.shuffle(this.conditions).slice(0, this.ROUND), i: 0, correct: 0, start: Date.now(), locked: false };
        this.chapterNext();
    }
    chapterNext() {
        const c = this.current; const u = this.ui();
        if (c.i >= c.queue.length) { this.chapterFinish(); return; }
        const [name, n, code] = c.queue[c.i];
        const right = this.chapter(n);
        const opts = u.shuffle([right, ...u.pick(this.chapters.filter(ch => ch.n !== n), 3)]);
        c.q = { name, n, code, opts };
        const host = this.host();
        host.innerHTML = `
        <div class="ag-play" style="--ag-accent:#10b981">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🧾 <b>${c.i + 1}/${c.queue.length}</b></span>
                <span class="ag-chip-stat">✅ <b>${c.correct}</b></span>
            </div>
            <div class="wl-meaning"><span>Which ICD-10-CM chapter?</span><b>${u.esc(name)}</b></div>
            <div class="cs-options" id="cs-options">${opts.map((ch, k) => this.chapterBtn(ch, k)).join('')}</div>
            <div class="ag-fact" id="cs-fact" hidden></div>
            <div class="ag-win-actions" id="cs-next" hidden><button class="ag-btn ag-btn-primary" onclick="window.codeSprint.current.i++; window.codeSprint.chapterNext()">Next →</button></div>
        </div>`;
        host.querySelector('#cs-options').addEventListener('click', e => { const b = e.target.closest('.cs-option'); if (b) this.chapterAnswer(+b.getAttribute('data-k')); });
    }
    chapterAnswer(k) {
        const c = this.current; if (!c || c.locked) return;
        c.locked = true;
        const q = c.q; const s = this.store();
        const ok = q.opts[k].n === q.n;
        s.chapters.total++;
        if (ok) { c.correct++; s.chapters.correct++; } else s.missed[q.n] = (s.missed[q.n] || 0) + 1;
        document.querySelectorAll('#cs-options .cs-option').forEach((b, i) => {
            b.disabled = true;
            if (q.opts[i].n === q.n) b.classList.add('ok'); else if (i === k) b.classList.add('bad');
        });
        const right = this.chapter(q.n);
        const f = document.getElementById('cs-fact');
        f.hidden = false;
        f.innerHTML = `<b style="color:${ok ? '#34d399' : '#f87171'}">${this.ui().esc(q.name)}</b> → Chapter ${right.n} (${right.range}) · code category <code class="cs-code">${this.ui().esc(q.code)}</code>`;
        document.getElementById('cs-next').hidden = false;
        c.locked = false;
    }
    chapterFinish() {
        const c = this.current; const u = this.ui(); const s = this.store();
        s.chapters.rounds++; s.chapters.best = Math.max(s.chapters.best || 0, c.correct);
        const xp = c.correct * 3 + (c.correct === c.queue.length ? 15 : 0);
        u.awardXP(xp, 'Code Sprint: chapters');
        window.gamesHub?.credit('code');
        u.save();
        u.win('code-sprint-content', {
            title: c.correct === c.queue.length ? 'Coder’s eye!' : 'Round complete',
            name: `${c.correct}/${c.queue.length} chapters right`,
            rows: [`⏱ ${u.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.codeSprint.startChapters()">🔁 New round</button><button class="ag-btn" onclick="window.codeSprint.showMap()">🗺️ Chapter Map</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.codeSprint.back()">Code Sprint</button>`
        });
    }

    // ============================================================
    // CODE SET SORT
    // ============================================================
    startSets() {
        const u = this.ui();
        this.app.switchView('code-sprint');
        this.current = { mode: 'sets', queue: u.shuffle(this.items).slice(0, this.ROUND), i: 0, correct: 0, start: Date.now(), locked: false };
        this.setNext();
    }
    setNext() {
        const c = this.current; const u = this.ui();
        if (c.i >= c.queue.length) { this.setFinish(); return; }
        const [item, setId, code] = c.queue[c.i];
        c.q = { item, setId, code };
        const host = this.host();
        host.innerHTML = `
        <div class="ag-play" style="--ag-accent:#a855f7">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🗂️ <b>${c.i + 1}/${c.queue.length}</b></span>
                <span class="ag-chip-stat">✅ <b>${c.correct}</b></span>
            </div>
            <div class="wl-meaning"><span>Which code set reports this?</span><b>${u.esc(item)}</b></div>
            <div class="cs-options" id="cs-options">${this.sets.map(st => `<button class="cs-option" data-id="${st.id}" style="--gm-accent:${st.color}"><span class="cs-range">${u.esc(st.name)}</span><span class="cs-name">${u.esc(st.sub)}</span></button>`).join('')}</div>
            <div class="ag-fact" id="cs-fact" hidden></div>
            <div class="ag-win-actions" id="cs-next" hidden><button class="ag-btn ag-btn-primary" onclick="window.codeSprint.current.i++; window.codeSprint.setNext()">Next →</button></div>
        </div>`;
        host.querySelector('#cs-options').addEventListener('click', e => { const b = e.target.closest('.cs-option'); if (b) this.setAnswer(b.getAttribute('data-id')); });
    }
    setAnswer(id) {
        const c = this.current; if (!c || c.locked) return;
        c.locked = true;
        const q = c.q; const ok = id === q.setId;
        if (ok) c.correct++;
        document.querySelectorAll('#cs-options .cs-option').forEach(b => {
            const k = b.getAttribute('data-id'); b.disabled = true;
            if (k === q.setId) b.classList.add('ok'); else if (k === id) b.classList.add('bad');
        });
        const st = this.sets.find(x => x.id === q.setId);
        const f = document.getElementById('cs-fact');
        f.hidden = false;
        f.innerHTML = `<b style="color:${ok ? '#34d399' : '#f87171'}">${this.ui().esc(st.name)}</b> · e.g. <code class="cs-code">${this.ui().esc(q.code)}</code><br><span>${this.ui().esc(st.tip)}</span>`;
        document.getElementById('cs-next').hidden = false;
        c.locked = false;
    }
    setFinish() {
        const c = this.current; const u = this.ui(); const s = this.store();
        s.sets.rounds++; s.sets.best = Math.max(s.sets.best || 0, c.correct);
        const xp = c.correct * 2 + (c.correct === c.queue.length ? 10 : 0);
        u.awardXP(xp, 'Code Sprint: code sets');
        window.gamesHub?.credit('code');
        u.save();
        u.win('code-sprint-content', {
            title: c.correct === c.queue.length ? 'Perfect sort!' : 'Round complete',
            name: `${c.correct}/${c.queue.length} correct`,
            rows: [`⏱ ${u.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.codeSprint.startSets()">🔁 New round</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.codeSprint.back()">Code Sprint</button>`
        });
    }
}
