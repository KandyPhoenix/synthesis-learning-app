// ============================================
// SYNTHESIS — FLOW (sequence ordering)
// Put the steps of a physiological, pathological or HIM process in order.
//   • Order It      — the chain fills as you tap the correct next step.
//   • Missing Link  — the chain is shown with one gap; pick the missing step.
// Data: flow-game-bank.js. State: APP_DATA.user.games.flow.
// ============================================

class FlowGame {
    constructor(app) {
        this.app = app;
        this.flows = Array.isArray(window.FLOW_BANK) ? window.FLOW_BANK : [];
        this.current = null;
    }
    ui() { return window.gamesUI; }
    store() {
        if (!APP_DATA.user.games) APP_DATA.user.games = {};
        const g = APP_DATA.user.games;
        if (!g.flow) g.flow = { flows: {}, link: { best: 0, rounds: 0 } };
        return g.flow;
    }
    flow(id) { return this.flows.find(f => f.id === id) || null; }
    stars(id) { const r = this.store().flows[id]; return r ? (r.stars || 0) : 0; }
    summary() {
        const s = this.store();
        const done = this.flows.filter(f => this.stars(f.id) > 0).length;
        return `${done}/${this.flows.length} flows · ${this.flows.reduce((a, f) => a + this.stars(f.id), 0)} stars`;
    }
    dailyFlow() {
        if (!this.flows.length) return null;
        const day = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000);
        return this.flows[day % this.flows.length];
    }
    host() { return document.getElementById('flow-content'); }
    back() {
        if (this.current) { this.current = null; this.ui().save(); this.render(); }
        else this.app.goBack();
    }

    // ============================================================
    // MENU
    // ============================================================
    render() {
        const host = this.host(); if (!host) return;
        this.current = null;
        const u = this.ui(); const s = this.store();
        const systems = [];
        this.flows.forEach(f => { if (!systems.includes(f.system)) systems.push(f.system); });
        const daily = this.dailyFlow();
        host.innerHTML = `
        <div class="gm-wrap">
            <div class="gm-hero" style="--gm-accent:#a78bfa">
                <h2>Physiology is a story. Tell it in order.</h2>
                <p>${this.flows.length} chains — blood through the heart, an action potential, a fracture healing, a claim through the revenue cycle. Tap the steps in sequence and read why each one comes next.</p>
            </div>
            <div class="ag-modes">
                ${daily ? `<button class="ag-mode-card ag-mode-today" style="--ag-accent:${daily.color}" onclick="window.flowGame.startOrder('${daily.id}')">
                    <span class="ag-mode-icon">${daily.icon}</span><span class="ag-mode-title">Flow of the day</span>
                    <span class="ag-mode-sub">${u.esc(daily.title)} · ${u.stars(this.stars(daily.id))}</span></button>` : ''}
                <button class="ag-mode-card" style="--ag-accent:#facc15" onclick="window.flowGame.startLink()">
                    <span class="ag-mode-icon">🔗</span><span class="ag-mode-title">Missing Link</span>
                    <span class="ag-mode-sub">10 gaps to fill · best ${s.link.best || 0}/10</span>
                </button>
                <button class="ag-mode-card" style="--ag-accent:#34d399" onclick="window.flowGame.startRandom()">
                    <span class="ag-mode-icon">🎲</span><span class="ag-mode-title">Random flow</span>
                    <span class="ag-mode-sub">Surprise me</span>
                </button>
            </div>
            ${systems.map(sys => `
            <h3 class="ag-section-title">${u.esc(sys)}</h3>
            <div class="fl-list">
                ${this.flows.filter(f => f.system === sys).map(f => { const st = this.stars(f.id); const r = s.flows[f.id]; return `
                <button class="fl-row" style="--gm-accent:${f.color}" onclick="window.flowGame.startOrder('${f.id}')">
                    <span class="fl-row-icon">${f.icon}</span>
                    <span class="fl-row-body"><b>${u.esc(f.title)}</b><span>${f.steps.length} steps${r && r.bestMs ? ` · best ${u.fmtTime(r.bestMs)}` : ''}</span></span>
                    <span class="fl-row-stars ${st ? 'on' : ''}">${u.stars(st)}</span>
                </button>`; }).join('')}
            </div>`).join('')}
        </div>`;
    }

    startDaily() { const f = this.dailyFlow(); if (f) this.startOrder(f.id); }
    startRandom() { const f = this.flows[Math.floor(Math.random() * this.flows.length)]; if (f) this.startOrder(f.id); }

    // ============================================================
    // ORDER IT
    // ============================================================
    startOrder(id) {
        const f = this.flow(id); if (!f) return;
        const u = this.ui();
        this.app.switchView('flow');   // renders the menu; the round below replaces it
        this.current = { mode: 'order', flow: f, next: 0, cards: u.shuffle(f.steps.map((s, i) => i)), mistakes: 0, hints: 0, start: Date.now(), locked: false, done: false };
        const host = this.host();
        host.innerHTML = `
        <div class="ag-play" style="--ag-accent:${f.color}">
            <div class="fl-title"><span class="fl-title-icon">${f.icon}</span><div><h2>${u.esc(f.title)}</h2><p>${u.esc(f.intro)}</p></div></div>
            <div class="ag-topbar">
                <span class="ag-chip-stat">🔗 <b id="fl-progress">0/${f.steps.length}</b></span>
                <span class="ag-chip-stat">❌ <b id="fl-miss">0</b></span>
                <button class="ag-btn ag-btn-ghost ag-btn-sm" onclick="window.flowGame.orderHint()">💡 Hint</button>
            </div>
            <div class="fl-chain" id="fl-chain">${f.steps.map((s, i) => `<div class="fl-link" data-i="${i}"><span class="fl-link-num">${i + 1}</span><span class="fl-link-text"></span></div>`).join('')}</div>
            <p class="ag-hint">Tap the step that comes <b>next</b>.</p>
            <div class="fl-cards" id="fl-cards">${this.current.cards.map(i => `<button class="fl-card" data-i="${i}">${u.esc(f.steps[i].t)}</button>`).join('')}</div>
        </div>`;
        host.querySelector('#fl-cards').addEventListener('click', e => { const b = e.target.closest('.fl-card'); if (b && !b.classList.contains('used')) this.orderTap(+b.getAttribute('data-i')); });
    }
    orderTap(i) {
        const c = this.current; if (!c || c.done || c.locked) return;
        const f = c.flow;
        const card = document.querySelector(`#fl-cards .fl-card[data-i="${i}"]`);
        if (i === c.next) {
            card.classList.add('used');
            const link = document.querySelector(`#fl-chain .fl-link[data-i="${i}"]`);
            link.classList.add('filled'); link.querySelector('.fl-link-text').textContent = f.steps[i].t;
            link.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
            c.next++;
            document.getElementById('fl-progress').textContent = `${c.next}/${f.steps.length}`;
            if (c.next === f.steps.length) this.orderFinish();
        } else {
            c.mistakes++;
            document.getElementById('fl-miss').textContent = c.mistakes;
            card.classList.add('bad'); setTimeout(() => card.classList.remove('bad'), 450);
        }
    }
    orderHint() {
        const c = this.current; if (!c || c.done || c.mode !== 'order') return;
        c.hints++;
        const card = document.querySelector(`#fl-cards .fl-card[data-i="${c.next}"]`);
        if (card) { card.classList.add('hint'); setTimeout(() => card.classList.remove('hint'), 1200); }
    }
    orderFinish() {
        const c = this.current; c.done = true; const u = this.ui(); const s = this.store(); const f = c.flow;
        const ms = Date.now() - c.start;
        const stars = u.starsFor(c.mistakes, c.hints);
        const rec = s.flows[f.id] || { stars: 0, bestMs: 0, plays: 0 };
        const first = rec.plays === 0;
        rec.plays++; rec.stars = Math.max(rec.stars || 0, stars);
        if (!rec.bestMs || ms < rec.bestMs) rec.bestMs = ms;
        s.flows[f.id] = rec;
        let xp = Math.round(f.steps.length * 3 * stars / 3) + (stars === 3 ? 10 : 0);
        if (!first) xp = Math.round(xp / 2);
        u.awardXP(xp, `Flow ordered: ${f.title}`);
        window.gamesHub?.credit('flow');
        u.save();
        // Reveal the "why" for every link, then the result card.
        const host = this.host();
        const cardsEl = host.querySelector('#fl-cards'); if (cardsEl) cardsEl.remove();
        const hint = host.querySelector('.ag-hint'); if (hint) hint.remove();
        host.querySelector('#fl-chain').insertAdjacentHTML('afterend', `
            <h3 class="ag-section-title">Why this order</h3>
            <div class="fl-why">${f.steps.map((st, i) => `<div class="fl-why-row"><span class="fl-link-num">${i + 1}</span><div><b>${u.esc(st.t)}</b><span>${u.esc(st.why)}</span></div></div>`).join('')}</div>
            <div class="ag-win-actions" style="margin-top:1rem">
                <button class="ag-btn" onclick="window.flowGame.startOrder('${f.id}')">🔁 Again</button>
                <button class="ag-btn" onclick="window.flowGame.startRandom()">🎲 Another flow</button>
                <button class="ag-btn ag-btn-primary" onclick="window.flowGame.back()">All flows</button>
            </div>`);
        u.win('flow-content', {
            title: stars === 3 ? 'Perfect chain!' : 'Chain complete',
            name: `${f.icon} ${f.title}`,
            rows: [u.stars(stars), `⏱ ${u.fmtTime(ms)}`, `❌ ${c.mistakes}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="this.closest('.ag-win-overlay').remove()">📖 Read why</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.flowGame.back()">All flows</button>`
        });
    }

    // ============================================================
    // MISSING LINK
    // ============================================================
    startLink() {
        const u = this.ui();
        this.app.switchView('flow');
        this.current = { mode: 'link', queue: u.shuffle(this.flows).slice(0, 10), i: 0, correct: 0, start: Date.now(), locked: false };
        this.linkNext();
    }
    linkNext() {
        const c = this.current; const u = this.ui();
        if (c.i >= c.queue.length) { this.linkFinish(); return; }
        const f = c.queue[c.i];
        const gap = Math.floor(Math.random() * f.steps.length);
        const others = u.pick(f.steps.map((s, i) => i).filter(i => i !== gap), 2);
        const opts = u.shuffle([gap, ...others]);
        c.flow = f; c.gap = gap; c.opts = opts;
        const host = this.host();
        host.innerHTML = `
        <div class="ag-play" style="--ag-accent:${f.color}">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🔗 <b>${c.i + 1}/${c.queue.length}</b></span>
                <span class="ag-chip-stat">✅ <b>${c.correct}</b></span>
            </div>
            <div class="fl-title"><span class="fl-title-icon">${f.icon}</span><div><h2>${u.esc(f.title)}</h2><p>Which step fills the gap?</p></div></div>
            <div class="fl-chain fl-chain-static">${f.steps.map((s, i) => `<div class="fl-link ${i === gap ? 'gap' : 'filled'}" data-i="${i}"><span class="fl-link-num">${i + 1}</span><span class="fl-link-text">${i === gap ? '?' : u.esc(s.t)}</span></div>`).join('')}</div>
            <div class="fl-cards" id="fl-cards">${opts.map(i => `<button class="fl-card" data-i="${i}">${u.esc(f.steps[i].t)}</button>`).join('')}</div>
            <div class="ag-fact" id="fl-fact" hidden></div>
            <div class="ag-win-actions" id="fl-next" hidden><button class="ag-btn ag-btn-primary" onclick="window.flowGame.current.i++; window.flowGame.linkNext()">Next →</button></div>
        </div>`;
        host.querySelector('#fl-cards').addEventListener('click', e => { const b = e.target.closest('.fl-card'); if (b) this.linkAnswer(+b.getAttribute('data-i')); });
    }
    linkAnswer(i) {
        const c = this.current; if (!c || c.locked) return;
        c.locked = true;
        const ok = i === c.gap;
        if (ok) c.correct++;
        document.querySelectorAll('#fl-cards .fl-card').forEach(b => {
            const k = +b.getAttribute('data-i'); b.disabled = true;
            if (k === c.gap) b.classList.add('ok'); else if (k === i) b.classList.add('bad');
        });
        const gapEl = document.querySelector('.fl-link.gap');
        if (gapEl) { gapEl.classList.remove('gap'); gapEl.classList.add('filled', ok ? 'ok' : 'bad'); gapEl.querySelector('.fl-link-text').textContent = c.flow.steps[c.gap].t; }
        const f = document.getElementById('fl-fact');
        f.hidden = false; f.innerHTML = `<b style="color:${ok ? '#34d399' : '#f87171'}">${this.ui().esc(c.flow.steps[c.gap].t)}</b> — ${this.ui().esc(c.flow.steps[c.gap].why)}`;
        document.getElementById('fl-next').hidden = false;
        c.locked = false;
    }
    linkFinish() {
        const c = this.current; const u = this.ui(); const s = this.store();
        s.link.rounds++; s.link.best = Math.max(s.link.best || 0, c.correct);
        const xp = c.correct * 2 + (c.correct === c.queue.length ? 10 : 0);
        u.awardXP(xp, 'Flow: missing link');
        window.gamesHub?.credit('flow');
        u.save();
        u.win('flow-content', {
            title: c.correct === c.queue.length ? 'Flawless!' : 'Round complete',
            name: `${c.correct}/${c.queue.length} links found`,
            rows: [`⏱ ${u.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.flowGame.startLink()">🔁 New round</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.flowGame.back()">All flows</button>`
        });
    }
}
