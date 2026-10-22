// ============================================
// SYNTHESIS — CODE SPRINT (medical coding)
// One generic 10-question runner drives every bank:
//   ICD-10-CM  · Chapter Sprint · Guidelines Quiz · Fill the Guideline (verbatim
//                cloze, checked against the official-text book) · Chapter Map
//   ICD-10-PCS · Root Operations · Sections · Approaches · PCS Guidelines
//   CPT        · Section Sort · Surgery Subsections · Modifiers · CPT Rules
//   HCPCS      · Letter Sort
//   Code sets  · ICD-10-CM / ICD-10-PCS / CPT / HCPCS Level II
//   Review     · the Missed Pile — anything you get wrong comes back until you
//                answer it correctly twice in a row · Marathon across all banks
// Data: code-sprint-bank.js + coding-bank.js. State: APP_DATA.user.games.code.
// ============================================

class CodeSprint {
    constructor(app) {
        this.app = app;
        this.ROUND = 10;
        this.current = null;
        const W = window;
        this.chapters = W.CODE_CHAPTERS || [];
        this.conditions = W.CODE_CONDITIONS || [];
        this.sets = W.CODE_SETS || [];
        this.items = W.CODE_SET_ITEMS || [];
        this.guide = W.CODING_GUIDELINE_QUESTIONS || [];
        this.cloze = W.CODING_CLOZE || [];
        this.pcsChars = W.PCS_CHARACTERS || [];
        this.pcsSections = W.PCS_SECTIONS || [];
        this.pcsSectionItems = W.PCS_SECTION_ITEMS || [];
        this.pcsRoots = W.PCS_ROOT_OPS || [];
        this.pcsRootScen = W.PCS_ROOT_SCENARIOS || [];
        this.pcsApproaches = W.PCS_APPROACHES || [];
        this.pcsApproachItems = W.PCS_APPROACH_ITEMS || [];
        this.pcsGuide = W.PCS_GUIDELINE_QUESTIONS || [];
        this.cptSections = W.CPT_SECTIONS || [];
        this.cptSectionItems = W.CPT_SECTION_ITEMS || [];
        this.cptSurg = W.CPT_SURGERY_SUBSECTIONS || [];
        this.cptSurgItems = W.CPT_SURGERY_ITEMS || [];
        this.cptMods = W.CPT_MODIFIERS || [];
        this.cptModScen = W.CPT_MODIFIER_SCENARIOS || [];
        this.cptRules = W.CPT_RULES_QUESTIONS || [];
        this.hcpcsSections = W.HCPCS_SECTIONS || [];
        this.hcpcsItems = W.HCPCS_ITEMS || [];
        this.verifyCloze();
        this.banks = this.buildBanks();
    }
    ui() { return window.gamesUI; }
    host() { return document.getElementById('code-sprint-content'); }

    // ============================================================
    // STATE
    // ============================================================
    store() {
        if (!APP_DATA.user.games) APP_DATA.user.games = {};
        const g = APP_DATA.user.games;
        if (!g.code) g.code = {};
        const s = g.code;
        if (!s.chapters) s.chapters = { rounds: 0, best: 0, total: 0, correct: 0 };
        if (!s.sets) s.sets = { rounds: 0, best: 0 };
        if (!s.missed) s.missed = {};      // chapter number -> misses (Chapters to review)
        if (!s.rounds) s.rounds = {};      // bank key -> { plays, best, correct, total }
        if (!s.pile) s.pile = {};          // question id -> { miss, okSince, due }
        return s;
    }
    rec(key) { const s = this.store(); if (!s.rounds[key]) s.rounds[key] = { plays: 0, best: 0, correct: 0, total: 0 }; return s.rounds[key]; }
    summary() {
        const s = this.store();
        const plays = Object.values(s.rounds).reduce((a, r) => a + (r.plays || 0), 0) + (s.chapters.rounds || 0) + (s.sets.rounds || 0);
        const total = Object.values(s.rounds).reduce((a, r) => a + (r.total || 0), 0) + (s.chapters.total || 0);
        const correct = Object.values(s.rounds).reduce((a, r) => a + (r.correct || 0), 0) + (s.chapters.correct || 0);
        const acc = total ? Math.round(correct / total * 100) : 0;
        return `${plays} rounds · ${acc}% accuracy · ${this.pileIds().length} to review`;
    }
    pileIds() { const s = this.store(); return Object.keys(s.pile).filter(id => s.pile[id].due); }
    recordAnswer(id, ok) {
        const s = this.store();
        const p = s.pile[id] || { miss: 0, okSince: 0, due: false };
        if (ok) { if (p.due) { p.okSince++; if (p.okSince >= 2) { p.due = false; } } }
        else { p.miss++; p.okSince = 0; p.due = true; }
        s.pile[id] = p;
    }

    // Verbatim check: does each cloze sentence appear word for word in the
    // official-text cards of the guidelines book loaded in this app?
    verifyCloze() {
        const book = window.ICD10CM_GUIDELINES_BOOK;
        let corpus = '';
        if (book && Array.isArray(book.lessonList)) {
            book.lessonList.forEach(l => (l.cards || []).forEach(c => { if (/^Official Text/.test(c.title || '')) corpus += '\n' + (c.content || ''); }));
        }
        const norm = s => s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
        const C = norm(corpus);
        this.cloze.forEach(cz => { cz.verified = !!C && C.includes(norm(cz.text)); });
        this.clozeVerified = this.cloze.filter(c => c.verified).length;
    }

    // ============================================================
    // BANKS — every mode is a list of question builders. A question is
    // { id, prompt, kind, opts: [{label, sub}], a, why, cite, badge }
    // ============================================================
    buildBanks() {
        const u = this.ui();
        const pick = (arr, n, exclude) => u.pick(arr, n, exclude);
        const catOpts = (cats, right, label) => u.shuffle([right, ...pick(cats.filter(c => c !== right), 3)]).map(c => ({ label: label(c), ref: c }));
        const mk = (key, title, icon, color, group, size, build, blurb) => ({ key, title, icon, color, group, size, build, blurb });
        const B = {};

        B.chapters = mk('chapters', 'Chapter Sprint', '🧾', '#10b981', 'ICD-10-CM', this.conditions.length, i => {
            const [name, n, code] = this.conditions[i];
            const right = this.chapters.find(c => c.n === n);
            const opts = catOpts(this.chapters, right, c => `${c.range} · ${c.name}`);
            return { id: `chapters:${i}`, kind: 'Which ICD-10-CM chapter?', prompt: name, opts, a: opts.findIndex(o => o.ref === right),
                     why: `Chapter ${right.n} (${right.range}) · code category ${code}`, meta: { chapter: n } };
        }, 'Which of the 22 chapters does this condition belong to?');

        B.sets = mk('sets', 'Code Set Sort', '🗂️', '#a855f7', 'Code sets', this.items.length, i => {
            const [item, setId, code] = this.items[i];
            const opts = this.sets.map(st => ({ label: `${st.name} · ${st.sub}`, ref: st.id }));
            const st = this.sets.find(x => x.id === setId);
            return { id: `sets:${i}`, kind: 'Which code set reports this?', prompt: item, opts, a: opts.findIndex(o => o.ref === setId), why: `${st.name} · e.g. ${code}. ${st.tip}` };
        }, 'ICD-10-CM, ICD-10-PCS, CPT or HCPCS Level II?');

        B.guide = mk('guide', 'Guidelines Quiz', '📘', '#38bdf8', 'ICD-10-CM', this.guide.length, i => {
            const q = this.guide[i];
            const order = u.shuffle(q.opts.map((o, k) => k));
            return { id: `guide:${i}`, kind: 'Official Guidelines', prompt: q.q, opts: order.map(k => ({ label: q.opts[k] })), a: order.indexOf(q.a), why: q.why, cite: `Guideline ${q.cite}` };
        }, 'Scenario questions from the Official Guidelines, with the section cited.');

        B.cloze = mk('cloze', 'Fill the Guideline', '✍️', '#60a5fa', 'ICD-10-CM', this.cloze.length, i => {
            const cz = this.cloze[i];
            const order = u.shuffle([cz.blank, ...cz.opts]);
            return { id: `cloze:${i}`, kind: 'Fill in the official text', prompt: cz.text.replace(cz.blank, '______'), opts: order.map(t => ({ label: t })), a: order.indexOf(cz.blank),
                     why: cz.text.replace(cz.blank, `«${cz.blank}»`), cite: `Guideline ${cz.sec}`, badge: cz.verified ? 'Verbatim · FY 2027' : 'Quoted', cloze: true };
        }, 'The exact wording of the guidelines with one phrase missing.');

        B.pcsroot = mk('pcsroot', 'Root Operations', '🔪', '#ef4444', 'ICD-10-PCS', this.pcsRootScen.length + this.pcsRoots.length, i => {
            if (i < this.pcsRootScen.length) {
                const [scen, op, note] = this.pcsRootScen[i];
                const right = this.pcsRoots.find(r => r.op === op);
                const opts = catOpts(this.pcsRoots, right, r => r.op);
                return { id: `pcsroot:${i}`, kind: 'Which PCS root operation?', prompt: scen, opts, a: opts.findIndex(o => o.ref === right), why: `${right.op} (character ${right.ch}): ${right.def} ${note}` };
            }
            const r = this.pcsRoots[i - this.pcsRootScen.length];
            const opts = catOpts(this.pcsRoots, r, x => x.op);
            return { id: `pcsroot:${i}`, kind: 'Which root operation is defined as…', prompt: r.def, opts, a: opts.findIndex(o => o.ref === r), why: `${r.op} (character ${r.ch}). Examples: ${r.eg}.` };
        }, 'Excision or Resection? Extirpation or Fragmentation? Scenarios and definitions for all 31.');

        B.pcssect = mk('pcssect', 'PCS Sections', '📚', '#f97316', 'ICD-10-PCS', this.pcsSectionItems.length, i => {
            const [proc, ch] = this.pcsSectionItems[i];
            const right = this.pcsSections.find(s => s.ch === ch);
            const opts = catOpts(this.pcsSections, right, s => `${s.ch} · ${s.name}`);
            return { id: `pcssect:${i}`, kind: 'Which PCS section (1st character)?', prompt: proc, opts, a: opts.findIndex(o => o.ref === right), why: `Section ${right.ch} — ${right.name}. Examples: ${right.eg}.` };
        }, 'Medical and Surgical, Obstetrics, Imaging, Administration… the first character.');

        B.pcsapp = mk('pcsapp', 'Approaches', '🚪', '#fbbf24', 'ICD-10-PCS', this.pcsApproachItems.length, i => {
            const [proc, ch] = this.pcsApproachItems[i];
            const right = this.pcsApproaches.find(s => s.ch === ch);
            const opts = catOpts(this.pcsApproaches, right, s => `${s.ch} · ${s.name}`);
            return { id: `pcsapp:${i}`, kind: 'Which approach (5th character)?', prompt: proc, opts, a: opts.findIndex(o => o.ref === right), why: `${right.name} (${right.ch}): ${right.def}` };
        }, 'Open, Percutaneous, Percutaneous Endoscopic, Via Natural Opening, External…');

        B.pcsguide = mk('pcsguide', 'PCS Guidelines', '📗', '#c084fc', 'ICD-10-PCS', this.pcsGuide.length, i => {
            const q = this.pcsGuide[i];
            const order = u.shuffle(q.opts.map((o, k) => k));
            return { id: `pcsguide:${i}`, kind: 'ICD-10-PCS guidelines', prompt: q.q, opts: order.map(k => ({ label: q.opts[k] })), a: order.indexOf(q.a), why: q.why, cite: q.cite };
        }, 'Structure, biopsies, bypass, discontinued procedures, devices.');

        B.cptsect = mk('cptsect', 'CPT Section Sort', '📙', '#f59e0b', 'CPT', this.cptSectionItems.length, i => {
            const [desc, id] = this.cptSectionItems[i];
            const right = this.cptSections.find(s => s.id === id);
            const opts = catOpts(this.cptSections, right, s => `${s.name} · ${s.range}`);
            return { id: `cptsect:${i}`, kind: 'Which CPT section?', prompt: desc, opts, a: opts.findIndex(o => o.ref === right), why: `${right.name} (${right.range}). ${right.tip}` };
        }, 'E/M, Anesthesia, Surgery, Radiology, Path/Lab, Medicine, Category II and III.');

        B.cptsurg = mk('cptsurg', 'Surgery Subsections', '🩻', '#fb7185', 'CPT', this.cptSurgItems.length, i => {
            const [desc, id] = this.cptSurgItems[i];
            const right = this.cptSurg.find(s => s.id === id);
            const opts = catOpts(this.cptSurg, right, s => `${s.name} · ${s.range}`);
            return { id: `cptsurg:${i}`, kind: 'Which surgery subsection?', prompt: desc, opts, a: opts.findIndex(o => o.ref === right), why: `${right.name} (${right.range}).` };
        }, 'Integumentary through Auditory — know the number ranges.');

        B.cptmod = mk('cptmod', 'Modifiers', '🏷️', '#2dd4bf', 'CPT', this.cptModScen.length + this.cptMods.length, i => {
            if (i < this.cptModScen.length) {
                const [scen, m] = this.cptModScen[i];
                const right = this.cptMods.find(x => x.m === m);
                const opts = catOpts(this.cptMods, right, x => `${x.m} · ${x.name}`);
                return { id: `cptmod:${i}`, kind: 'Which modifier?', prompt: scen, opts, a: opts.findIndex(o => o.ref === right), why: `Modifier ${right.m} — ${right.name}. ${right.tip}` };
            }
            const r = this.cptMods[i - this.cptModScen.length];
            const opts = catOpts(this.cptMods, r, x => x.name);
            return { id: `cptmod:${i}`, kind: 'What does this modifier mean?', prompt: `Modifier ${r.m}`, opts, a: opts.findIndex(o => o.ref === r), why: `${r.m} — ${r.name}. ${r.tip}` };
        }, '24 vs 25 vs 57, 58 vs 78 vs 79, 26 vs TC — scenarios and definitions.');

        B.cptrules = mk('cptrules', 'CPT Rules', '📏', '#ec4899', 'CPT', this.cptRules.length, i => {
            const q = this.cptRules[i];
            const order = u.shuffle(q.opts.map((o, k) => k));
            return { id: `cptrules:${i}`, kind: 'CPT conventions and guidelines', prompt: q.q, opts: order.map(k => ({ label: q.opts[k] })), a: order.indexOf(q.a), why: q.why, cite: q.cite };
        }, 'Symbols, E/M leveling, the surgical package, anesthesia, radiology and lab rules.');

        B.hcpcs = mk('hcpcs', 'HCPCS Letter Sort', '🔤', '#84cc16', 'HCPCS', this.hcpcsItems.length, i => {
            const [item, ch, code] = this.hcpcsItems[i];
            const right = this.hcpcsSections.find(s => s.ch === ch);
            const opts = catOpts(this.hcpcsSections, right, s => `${s.ch} · ${s.name}`);
            return { id: `hcpcs:${i}`, kind: 'Which HCPCS Level II section?', prompt: item, opts, a: opts.findIndex(o => o.ref === right), why: `${code} — section ${right.ch}, ${right.name} (${right.range}).` };
        }, 'A for ambulance and supplies, E for equipment, J for injectables, L for braces…');

        return B;
    }
    question(id) {
        const [key, idx] = id.split(':');
        const b = this.banks[key]; const i = parseInt(idx, 10);
        if (!b || isNaN(i) || i < 0 || i >= b.size) return null;
        return b.build(i);
    }

    // ============================================================
    // NAVIGATION
    // ============================================================
    back() {
        if (this.current) { this.current = null; this.ui().save(); this.render(); }
        else this.app.goBack();
    }
    // Entry points used by the Games hub and home strip.
    startChapters() { this.startRound('chapters'); }
    startSets() { this.startRound('sets'); }

    // ============================================================
    // MENU
    // ============================================================
    render() {
        const host = this.host(); if (!host) return;
        this.current = null;
        const u = this.ui(); const s = this.store();
        const pile = this.pileIds().length;
        const groups = ['ICD-10-CM', 'ICD-10-PCS', 'CPT', 'HCPCS', 'Code sets'];
        const study = {
            'ICD-10-CM': [['🗺️ Chapter Map', 'showMap()'], ['📜 Guideline sheet', "showTable('cloze')"]],
            'ICD-10-PCS': [['🔪 Root-operation table', "showTable('pcsroot')"], ['🚪 Approach table', "showTable('pcsapp')"], ['📚 Section table', "showTable('pcssect')"], ['🔢 7 characters', "showTable('pcschars')"]],
            'CPT': [['📙 Section ranges', "showTable('cptsect')"], ['🩻 Surgery ranges', "showTable('cptsurg')"], ['🏷️ Modifier table', "showTable('cptmod')"]],
            'HCPCS': [['🔤 Letter table', "showTable('hcpcs')"]],
            'Code sets': []
        };
        const card = b => {
            const r = this.rec(b.key); const acc = r.total ? Math.round(r.correct / r.total * 100) : null;
            return `<button class="cs-mode" style="--gm-accent:${b.color}" onclick="window.codeSprint.startRound('${b.key}')">
                <span class="cs-mode-icon">${b.icon}</span>
                <span class="cs-mode-body"><b>${u.esc(b.title)}</b><span>${u.esc(b.blurb)}</span>
                <em>${b.size} in the bank${r.plays ? ` · best ${r.best}/${this.ROUND} · ${acc}% overall` : ''}</em></span>
            </button>`;
        };
        const missed = Object.entries(s.missed).map(([n, v]) => ({ ch: this.chapters.find(c => c.n === +n), miss: v })).filter(r => r.ch && r.miss > 0).sort((a, b) => b.miss - a.miss).slice(0, 5);
        host.innerHTML = `
        <div class="gm-wrap">
            <div class="gm-hero" style="--gm-accent:#10b981">
                <h2>Know the chapter, find the code.</h2>
                <p>ICD-10-CM chapters and the Official Guidelines (quoted word for word), ICD-10-PCS root operations and approaches, CPT sections and modifiers, HCPCS letters. Everything you miss lands in the Review pile until you get it right twice.</p>
            </div>
            <div class="ag-modes cs-top">
                <button class="ag-mode-card ag-mode-today" style="--ag-accent:${pile ? '#f87171' : '#34d399'}" onclick="window.codeSprint.startReview()" ${pile ? '' : 'disabled'}>
                    <span class="ag-mode-icon">${pile ? '🔁' : '✅'}</span><span class="ag-mode-title">Review pile</span>
                    <span class="ag-mode-sub">${pile ? `${pile} missed item${pile === 1 ? '' : 's'} waiting — clear them` : 'Nothing to review. Miss something and it lands here.'}</span>
                </button>
                <button class="ag-mode-card" style="--ag-accent:#facc15" onclick="window.codeSprint.startMarathon()">
                    <span class="ag-mode-icon">🏃</span><span class="ag-mode-title">Marathon</span>
                    <span class="ag-mode-sub">20 questions across every bank${this.rec('marathon').plays ? ` · best ${this.rec('marathon').best}/20` : ''}</span>
                </button>
            </div>
            ${groups.map(g => {
                const banks = Object.values(this.banks).filter(b => b.group === g);
                if (!banks.length) return '';
                return `<h3 class="ag-section-title">${g}</h3>
                <div class="cs-modes">${banks.map(card).join('')}</div>
                ${study[g].length ? `<div class="cs-study">${study[g].map(([l, fn]) => `<button class="ag-btn ag-btn-ghost ag-btn-sm" onclick="window.codeSprint.${fn}">${l}</button>`).join('')}</div>` : ''}`;
            }).join('')}
            ${missed.length ? `
            <h3 class="ag-section-title">Chapters to review</h3>
            <div class="cs-missed">${missed.map(r => `<button class="cs-missed-row" style="--gm-accent:${r.ch.color}" onclick="window.codeSprint.showMap(${r.ch.n})"><span class="cs-range">${r.ch.range}</span><span>${u.esc(r.ch.name)}</span><span class="cs-missed-n">${r.miss} missed</span></button>`).join('')}</div>` : ''}
            <p class="ag-hint" style="margin-top:1rem">Guideline quotes: ${this.clozeVerified}/${this.cloze.length} verified word-for-word against the FY 2027 Official Guidelines book in this app. CPT, HCPCS and PCS example codes are illustrative — confirm specifics in your current code books.</p>
        </div>`;
    }

    // ============================================================
    // STUDY SCREENS
    // ============================================================
    showMap(focus) {
        const host = this.host(); if (!host) return;
        this.current = { mode: 'study' };
        const u = this.ui();
        host.innerHTML = `
        <div class="gm-wrap">
            <p class="ag-hint">Tap a chapter to see example conditions and their code categories.</p>
            <div class="cs-map">${this.chapters.map(ch => `
                <details class="cs-ch" style="--gm-accent:${ch.color}" ${focus === ch.n ? 'open' : ''} id="cs-ch-${ch.n}">
                    <summary><span class="cs-ch-n">${ch.n}</span><span class="cs-range">${ch.range}</span><span class="cs-name">${u.esc(ch.name)}</span></summary>
                    <div class="cs-ch-body">${this.conditions.filter(c => c[1] === ch.n).map(c => `<div class="cs-ex"><span>${u.esc(c[0])}</span><code>${u.esc(c[2])}</code></div>`).join('') || '<div class="cs-ex"><span>No examples yet.</span></div>'}</div>
                </details>`).join('')}</div>
            <div class="ag-win-actions" style="margin-top:1rem"><button class="ag-btn ag-btn-primary" onclick="window.codeSprint.startRound('chapters')">🧾 Chapter Sprint</button></div>
        </div>`;
        if (focus) { const el = document.getElementById(`cs-ch-${focus}`); if (el) el.scrollIntoView({ block: 'center' }); }
    }

    showTable(kind) {
        const host = this.host(); if (!host) return;
        this.current = { mode: 'study' };
        const u = this.ui();
        let title = '', rows = '', play = '', hint = '';
        const row = (color, a, b, c) => `<div class="cs-trow" style="--gm-accent:${color}"><span class="cs-tkey">${a}</span><span class="cs-tbody"><b>${b}</b>${c ? `<span>${c}</span>` : ''}</span></div>`;
        if (kind === 'pcsroot') {
            title = 'ICD-10-PCS root operations (Medical and Surgical)'; play = 'pcsroot';
            hint = 'Grouped the way the PCS manual groups them. Character = the 3rd character of the code.';
            const groups = ['Take out some or all of a body part', 'Take out solids, fluids or gases', 'Cutting or separation only', 'Put in, put back or move some or all of a body part', 'Alter the diameter or route of a tubular body part', 'Always involve a device', 'Examination only', 'Other repairs', 'Other objectives'];
            this.pcsRoots.forEach(r => { if (!groups.includes(r.group)) groups.push(r.group); });
            rows = groups.map(g => `<h4 class="cs-tgroup">${u.esc(g)}</h4>` + this.pcsRoots.filter(r => r.group === g).map(r => row('#ef4444', r.ch, u.esc(r.op), `${u.esc(r.def)}<br><em>e.g. ${u.esc(r.eg)}</em>`)).join('')).join('');
        } else if (kind === 'pcsapp') {
            title = 'ICD-10-PCS approaches (5th character)'; play = 'pcsapp';
            rows = this.pcsApproaches.map(a => row(a.color, a.ch, u.esc(a.name), `${u.esc(a.def)}<br><em>e.g. ${u.esc(a.eg)}</em>`)).join('');
        } else if (kind === 'pcssect') {
            title = 'ICD-10-PCS sections (1st character)'; play = 'pcssect';
            rows = this.pcsSections.map(s => row(s.color, s.ch, u.esc(s.name), u.esc(s.eg))).join('');
        } else if (kind === 'pcschars') {
            title = 'The 7 characters of a Medical and Surgical PCS code'; play = 'pcsguide';
            hint = 'Every PCS code has exactly 7 characters; the letters O and I are never used.';
            rows = this.pcsChars.map(c => row('#a78bfa', c.n, u.esc(c.name), u.esc(c.eg))).join('');
        } else if (kind === 'cptsect') {
            title = 'CPT sections and number ranges'; play = 'cptsect';
            rows = this.cptSections.map(s => row(s.color, u.esc(s.range), u.esc(s.name), u.esc(s.tip))).join('');
        } else if (kind === 'cptsurg') {
            title = 'CPT Surgery subsections'; play = 'cptsurg';
            rows = this.cptSurg.map(s => row(s.color, u.esc(s.range), u.esc(s.name), '')).join('');
        } else if (kind === 'cptmod') {
            title = 'Modifiers'; play = 'cptmod';
            hint = 'Memory hooks: 57 = decided (major surgery), 58 = planned (staged), 78 = back to the OR, 79 = new problem; 24 = unrelated E/M in the global, 25 = same-day E/M; 26 = the reading, TC = the machine.';
            rows = this.cptMods.map(m => row('#2dd4bf', u.esc(m.m), u.esc(m.name), u.esc(m.tip))).join('');
        } else if (kind === 'hcpcs') {
            title = 'HCPCS Level II letter sections'; play = 'hcpcs';
            rows = this.hcpcsSections.map(s => row(s.color, s.ch, `${u.esc(s.name)} <small>${u.esc(s.range)}</small>`, u.esc(s.eg))).join('');
        } else if (kind === 'cloze') {
            title = 'Guideline sheet — the sentences worth memorizing'; play = 'cloze';
            hint = `${this.clozeVerified}/${this.cloze.length} verified word-for-word against the FY 2027 guidelines book. The key phrase is highlighted.`;
            rows = this.cloze.map(c => row(c.verified ? '#60a5fa' : '#94a3b8', u.esc(c.sec), u.esc(c.text).replace(u.esc(c.blank), `<mark>${u.esc(c.blank)}</mark>`), '')).join('');
        }
        host.innerHTML = `
        <div class="gm-wrap">
            <h2 class="cs-ttitle">${u.esc(title)}</h2>
            ${hint ? `<p class="ag-hint">${hint}</p>` : ''}
            <div class="cs-table">${rows}</div>
            <div class="ag-win-actions" style="margin-top:1rem"><button class="ag-btn ag-btn-primary" onclick="window.codeSprint.startRound('${play}')">▶ Drill this</button><button class="ag-btn" onclick="window.codeSprint.back()">Code Sprint</button></div>
        </div>`;
        window.scrollTo(0, 0);
    }

    // ============================================================
    // ROUNDS
    // ============================================================
    startRound(key) {
        const b = this.banks[key]; if (!b || !b.size) return;
        const u = this.ui();
        const ids = u.shuffle(Array.from({ length: b.size }, (_, i) => `${key}:${i}`)).slice(0, this.ROUND);
        this.play({ key, title: `${b.icon} ${b.title}`, color: b.color, ids });
    }
    startReview() {
        const ids = this.ui().shuffle(this.pileIds()).slice(0, this.ROUND);
        if (!ids.length) { this.ui().toast('Nothing in the review pile — nice.', 'success'); return; }
        this.play({ key: 'review', title: '🔁 Review pile', color: '#f87171', ids });
    }
    startMarathon() {
        const u = this.ui();
        const keys = Object.keys(this.banks);
        const ids = [];
        for (let n = 0; n < 20; n++) {
            const b = this.banks[keys[n % keys.length]];
            ids.push(`${b.key}:${Math.floor(Math.random() * b.size)}`);
        }
        this.play({ key: 'marathon', title: '🏃 Marathon', color: '#facc15', ids: u.shuffle(ids) });
    }
    play(cfg) {
        this.app.switchView('code-sprint');   // renders the menu; the round below replaces it
        this.current = { mode: 'round', ...cfg, i: 0, correct: 0, start: Date.now(), locked: false, q: null };
        this.next();
    }
    next() {
        const c = this.current; const u = this.ui();
        if (c.i >= c.ids.length) { this.finish(); return; }
        const q = this.question(c.ids[c.i]);
        if (!q) { c.i++; this.next(); return; }
        c.q = q;
        const host = this.host();
        host.innerHTML = `
        <div class="ag-play" style="--ag-accent:${c.color}">
            <div class="ag-topbar">
                <span class="ag-chip-stat">${u.esc(c.title)}</span>
                <span class="ag-chip-stat"><b>${c.i + 1}/${c.ids.length}</b></span>
                <span class="ag-chip-stat">✅ <b>${c.correct}</b></span>
            </div>
            <div class="wl-meaning ${q.cloze ? 'cs-cloze' : ''}"><span>${u.esc(q.kind)}${q.badge ? ` <i class="cs-badge">${u.esc(q.badge)}</i>` : ''}</span><b>${u.esc(q.prompt)}</b></div>
            <div class="cs-options" id="cs-options">${q.opts.map((o, k) => `<button class="cs-option" data-k="${k}"><span class="cs-range">${u.esc(o.label)}</span>${o.sub ? `<span class="cs-name">${u.esc(o.sub)}</span>` : ''}</button>`).join('')}</div>
            <div class="ag-fact" id="cs-fact" hidden></div>
            <div class="ag-win-actions" id="cs-next" hidden><button class="ag-btn ag-btn-primary" onclick="window.codeSprint.advance()">Next →</button></div>
        </div>`;
        host.querySelector('#cs-options').addEventListener('click', e => { const b = e.target.closest('.cs-option'); if (b) this.answer(+b.getAttribute('data-k')); });
        window.scrollTo(0, 0);
    }
    answer(k) {
        const c = this.current; if (!c || c.mode !== 'round' || c.locked || !c.q) return;
        c.locked = true;
        const q = c.q; const ok = k === q.a; const u = this.ui(); const s = this.store();
        if (ok) c.correct++;
        this.recordAnswer(q.id, ok);
        if (q.meta && q.meta.chapter && !ok) s.missed[q.meta.chapter] = (s.missed[q.meta.chapter] || 0) + 1;
        if (q.id.startsWith('chapters:')) { s.chapters.total++; if (ok) s.chapters.correct++; }
        document.querySelectorAll('#cs-options .cs-option').forEach((b, i) => { b.disabled = true; if (i === q.a) b.classList.add('ok'); else if (i === k) b.classList.add('bad'); });
        const f = document.getElementById('cs-fact');
        f.hidden = false;
        f.innerHTML = `<b style="color:${ok ? '#34d399' : '#f87171'}">${ok ? 'Correct' : 'Not quite'}</b> — ${u.esc(q.why)}${q.cite ? `<br><span class="cs-cite">${u.esc(q.cite)}</span>` : ''}`;
        document.getElementById('cs-next').hidden = false;
        c.locked = false;
    }
    advance() { const c = this.current; if (!c || c.mode !== 'round') return; c.i++; this.next(); }
    finish() {
        const c = this.current; const u = this.ui(); const s = this.store();
        const n = c.ids.length;
        const r = this.rec(c.key);
        r.plays++; r.best = Math.max(r.best || 0, c.correct); r.correct += c.correct; r.total += n;
        if (c.key === 'chapters') { s.chapters.rounds++; s.chapters.best = Math.max(s.chapters.best || 0, c.correct); }
        if (c.key === 'sets') { s.sets.rounds++; s.sets.best = Math.max(s.sets.best || 0, c.correct); }
        const perfect = c.correct === n;
        const xp = c.correct * 3 + (perfect ? 15 : 0);
        u.awardXP(xp, `Code Sprint: ${c.title.replace(/^\S+\s/, '')}`);
        window.gamesHub?.credit('code');
        u.save();
        const pile = this.pileIds().length;
        u.win('code-sprint-content', {
            title: perfect ? 'Coder’s eye!' : 'Round complete',
            name: `${c.correct}/${n} correct`,
            rows: [`⏱ ${u.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`, pile ? `🔁 ${pile} to review` : '🔁 pile clear'],
            actions: `${c.key === 'review' || c.key === 'marathon' ? `<button class="ag-btn" onclick="window.codeSprint.${c.key === 'review' ? 'startReview' : 'startMarathon'}()">🔁 Again</button>` : `<button class="ag-btn" onclick="window.codeSprint.startRound('${c.key}')">🔁 New round</button>`}${pile && c.key !== 'review' ? `<button class="ag-btn" onclick="window.codeSprint.startReview()">🔁 Review pile (${pile})</button>` : ''}`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.codeSprint.back()">Code Sprint</button>`
        });
    }
}
