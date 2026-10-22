// ============================================
// SYNTHESIS — GAMES HUB
// The front door for every game in the app (Anatomy Arcade, Word Lab, Flow,
// Code Sprint, Crosswords) plus the Daily Quest that ties them together:
// finish one round of each game today for a bonus and a quest streak.
//
// Also exports window.gamesUI — tiny helpers (shuffle, escape, timers, the
// result overlay) shared by the game modules so they stay consistent.
// State lives in APP_DATA.user.games via saveProgress().
// ============================================

window.gamesUI = {
    esc(s) { return (typeof escapeHtml === 'function') ? escapeHtml(String(s)) : String(s); },
    shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
        return a;
    },
    pick(arr, n, exclude) {
        const pool = arr.filter(x => !exclude || !exclude.includes(x));
        return this.shuffle(pool).slice(0, n);
    },
    fmtTime(ms) { const s = Math.max(0, Math.round(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; },
    stars(n) { return '★'.repeat(n) + '☆'.repeat(Math.max(0, 3 - n)); },
    starsFor(mistakes, hints) { return (mistakes === 0 && !hints) ? 3 : (mistakes <= 2) ? 2 : 1; },
    save() { if (typeof saveProgress === 'function') saveProgress(); },
    awardXP(amount, reason) {
        if (!amount) return;
        if (window.gamification && typeof window.gamification.awardXP === 'function') window.gamification.awardXP(amount, reason);
    },
    toast(msg, type) { if (window.toast) window.toast(msg, type || 'info'); },
    // Result overlay appended inside a host element. `actions` is extra HTML.
    win(hostId, { title, name, rows, actions, back }) {
        const host = document.getElementById(hostId);
        if (!host) return;
        host.querySelectorAll('.ag-win-overlay').forEach(o => o.remove());
        const o = document.createElement('div');
        o.className = 'ag-win-overlay';
        o.innerHTML = `
            <div class="ag-win-card">
                <div class="ag-win-burst">🎉</div>
                <h3>${this.esc(title)}</h3>
                <p class="ag-win-name">${this.esc(name)}</p>
                <div class="ag-win-stats">${(rows || []).map(r => `<div>${this.esc(r)}</div>`).join('')}</div>
                <div class="ag-win-actions">${actions || ''}${back || ''}</div>
            </div>`;
        host.appendChild(o);
    }
};

class GamesHub {
    constructor(app) {
        this.app = app;
        this.QUESTS = [
            { key: 'anatomy', icon: '🫀', label: 'Finish an Anatomy Arcade round', go: () => { const b = window.anatomyGame?.todaysBoard(); if (b) window.anatomyGame.startLabel(b.id); } },
            { key: 'wordlab', icon: '🧬', label: 'Finish a Word Lab round', go: () => window.wordLab?.startBuild() },
            { key: 'flow', icon: '🔁', label: 'Put one Flow in order', go: () => window.flowGame?.startDaily() },
            { key: 'code', icon: '🧾', label: 'Finish a Code Sprint round', go: () => window.codeSprint?.startChapters() },
            { key: 'crossword', icon: '🧩', label: 'Solve a crossword', go: () => this.app.switchView('crossword') }
        ];
        this.BONUS_XP = 40;
    }

    store() {
        if (!APP_DATA.user.games) APP_DATA.user.games = {};
        const g = APP_DATA.user.games;
        if (!g.daily) g.daily = { date: '', done: {}, bonusGiven: false };
        if (!g.quest) g.quest = { streak: 0, last: '', total: 0 };
        return g;
    }
    today() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    daily() {
        const g = this.store();
        if (g.daily.date !== this.today()) g.daily = { date: this.today(), done: {}, bonusGiven: false };
        return g.daily;
    }
    doneCount() { const d = this.daily(); return this.QUESTS.filter(q => d.done[q.key]).length; }

    // Called by each game when a round is finished.
    credit(key) {
        const d = this.daily();
        const g = this.store();
        if (!d.done[key]) {
            d.done[key] = true;
            const n = this.doneCount();
            if (n < this.QUESTS.length) window.gamesUI.toast(`Daily Quest: ${n}/${this.QUESTS.length} done`, 'info');
        }
        if (this.doneCount() === this.QUESTS.length && !d.bonusGiven) {
            d.bonusGiven = true;
            const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
            const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
            g.quest.streak = (g.quest.last === yKey) ? g.quest.streak + 1 : 1;
            g.quest.last = this.today();
            g.quest.total = (g.quest.total || 0) + 1;
            window.gamesUI.awardXP(this.BONUS_XP, 'Daily Quest complete');
            window.gamesUI.toast(`🏆 Daily Quest complete! +${this.BONUS_XP} XP · ${g.quest.streak}-day streak`, 'success');
        }
        window.gamesUI.save();
    }

    games() {
        const ag = window.anatomyGame, wl = window.wordLab, fl = window.flowGame, cs = window.codeSprint, cw = window.crossword;
        const agS = ag ? ag.store() : null;
        const agStars = ag ? ag.boards.reduce((a, b) => a + ag.labelStars(b.id), 0) : 0;
        return [
            { key: 'anatomy', icon: '🫀', title: 'Anatomy Arcade', color: '#ef4444', view: 'anatomy-game',
              blurb: 'Label vibrant anatomy boards, race the clock, flip memory cards, and map where diseases live.',
              stat: ag ? `${agStars}/${ag.boards.length * 3} stars · lightning best ${agS.lightning.best || 0}` : '' },
            { key: 'wordlab', icon: '🧬', title: 'Word Lab', color: '#38bdf8', view: 'word-lab',
              blurb: 'Build medical terms from prefix, root and suffix tiles. Sort word parts at speed. Define on sight.',
              stat: wl ? wl.summary() : '' },
            { key: 'flow', icon: '🔁', title: 'Flow', color: '#a78bfa', view: 'flow',
              blurb: 'Put physiology, pathology and HIM processes in order — blood through the heart to the revenue cycle.',
              stat: fl ? fl.summary() : '' },
            { key: 'code', icon: '🧾', title: 'Code Sprint', color: '#10b981', view: 'code-sprint',
              blurb: 'ICD-10-CM chapters and guidelines, PCS code builder, CPT modifiers and surgical package, HCPCS, MS-DRG lab — misses become flashcards.',
              stat: cs ? cs.summary() : '' },
            { key: 'crossword', icon: '🧩', title: 'Crosswords', color: '#f59e0b', view: 'crossword',
              blurb: 'Hundreds of puzzles across every track in the library.',
              stat: cw ? `${Object.keys((cw.store().solved) || {}).length} solved` : '' }
        ];
    }

    render() {
        const host = document.getElementById('games-content');
        if (!host) return;
        const d = this.daily(); const g = this.store();
        const n = this.doneCount();
        const pct = Math.round(n / this.QUESTS.length * 100);
        host.innerHTML = `
        <div class="gm-wrap">
            <div class="gm-quest" style="--gm-pct:${pct}">
                <div class="gm-quest-ring"><span>${n}/${this.QUESTS.length}</span></div>
                <div class="gm-quest-body">
                    <h2>Daily Quest</h2>
                    <p>${n === this.QUESTS.length ? `All done for today — +${this.BONUS_XP} XP banked.` : `One round of each game today earns +${this.BONUS_XP} XP.`}
                       ${g.quest.streak ? `<b>🔥 ${g.quest.streak}-day streak</b>` : ''}</p>
                    <div class="gm-quest-list">
                        ${this.QUESTS.map((q, i) => `
                        <button class="gm-quest-item ${d.done[q.key] ? 'done' : ''}" onclick="window.gamesHub.QUESTS[${i}].go()">
                            <span class="gm-quest-check">${d.done[q.key] ? '✓' : q.icon}</span>
                            <span>${q.label}</span>
                        </button>`).join('')}
                    </div>
                </div>
            </div>

            <h3 class="ag-section-title">Pick a game</h3>
            <div class="gm-grid">
                ${this.games().map(gm => `
                <button class="gm-card" style="--gm-accent:${gm.color}" onclick="app.switchView('${gm.view}')">
                    <span class="gm-card-icon">${gm.icon}</span>
                    <span class="gm-card-title">${gm.title}</span>
                    <span class="gm-card-blurb">${gm.blurb}</span>
                    <span class="gm-card-stat">${window.gamesUI.esc(gm.stat || 'New')}</span>
                </button>`).join('')}
            </div>
        </div>`;
    }

    renderHomeStrip() {
        const strip = document.getElementById('games-home-strip');
        if (!strip) return;
        const n = this.doneCount();
        const today = window.anatomyGame?.todaysBoard();
        const fl = window.flowGame?.dailyFlow();
        const cards = [
            { color: '#facc15', icon: n === this.QUESTS.length ? '🏆' : '🎯', title: 'Daily Quest', meta: `${n}/${this.QUESTS.length} games today`, go: "app.switchView('games')" },
            today ? { color: today.color, icon: today.icon, title: today.title, meta: 'Anatomy · Label It', go: `window.anatomyGame.startLabel('${today.id}')` } : null,
            { color: '#38bdf8', icon: '🧬', title: 'Word Lab', meta: 'Build 8 medical terms', go: 'window.wordLab.startBuild()' },
            fl ? { color: fl.color, icon: fl.icon, title: fl.title, meta: 'Flow of the day', go: `window.flowGame.startOrder('${fl.id}')` } : null,
            { color: '#10b981', icon: '🧾', title: 'Code Sprint', meta: 'CM · PCS builder · CPT · HCPCS · DRG', go: "app.switchView('code-sprint')" },
            { color: '#ef4444', icon: '🦠', title: 'Patho Map', meta: 'Tap where disease lives', go: "window.anatomyGame.startPatho('mix')" }
        ].filter(Boolean);
        strip.innerHTML = cards.map(c => `
            <button class="gm-home-card" style="--gm-accent:${c.color}" onclick="${c.go}">
                <span class="gm-home-icon">${c.icon}</span>
                <span class="gm-home-title">${window.gamesUI.esc(c.title)}</span>
                <span class="gm-home-meta">${window.gamesUI.esc(c.meta)}</span>
            </button>`).join('');
    }
}
