// ============================================
// SYNTHESIS — CODE SPRINT (medical coding)
// One generic 10-question runner drives every bank:
//   ICD-10-CM  · Chapter Sprint · Guidelines Quiz · Fill the Guideline (verbatim
//                cloze, checked against the official-text book) · Chapter Map
//   ICD-10-PCS · Root Operations · Sections · Approaches · PCS Guidelines
//   CPT        · Section Sort · Surgery Subsections · Modifiers · CPT Rules
//   HCPCS      · Letter Sort
//   MS-DRG     · MDC Sort · Grouper Quiz · DRG Lab (MDC → tier → payment)
//   Code sets  · ICD-10-CM / ICD-10-PCS / CPT / HCPCS Level II
//   Custom     · E/M Level Builder · Anesthesia Units · Sequence It · Surgical
//                Package sort · ICD-10-PCS 7-character Code Builder
//   Flashcards · every miss (when enabled) becomes a card in the "Code Sprint
//                misses" deck of the app's spaced-repetition flashcards
//   Review     · the Missed Pile — anything you get wrong comes back until you
//                answer it correctly twice in a row · Marathon across all banks
// Data: code-sprint-bank.js + coding-bank.js + coding-bank-2.js. State: APP_DATA.user.games.code.
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
        this.surgPkg = W.SURG_PKG_QUESTIONS || [];
        this.surgItems = W.SURG_PKG_ITEMS || [];
        this.surgBuckets = W.SURG_PKG_BUCKETS || [];
        this.mdcs = W.MDC_LIST || [];
        this.mdcItems = W.MDC_ITEMS || [];
        this.drgQ = W.DRG_QUESTIONS || [];
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

        const neoCats = window.NEOPLASM_CATEGORIES || []; const neoItems = window.NEOPLASM_ITEMS || [];
        B.neoplasm = mk('neoplasm', 'Neoplasm Table', '🧫', '#f472b6', 'ICD-10-CM', neoItems.length, i => {
            const [stmt, id, why] = neoItems[i];
            const right = neoCats.find(x => x.id === id);
            const opts = catOpts(neoCats, right, x => x.name);
            return { id: `neoplasm:${i}`, kind: 'Which column of the Neoplasm Table?', prompt: stmt, opts, a: opts.findIndex(o => o.ref === right), why: `${right.name}. ${why} ${right.tip}` };
        }, 'Primary, secondary, in situ, benign, uncertain, unspecified — or not the Table at all.');

        B.surgpkg = mk('surgpkg', 'Surgical Package', '📦', '#fb923c', 'CPT', this.surgPkg.length, i => {
            const q = this.surgPkg[i];
            const order = u.shuffle(q.opts.map((o, k) => k));
            return { id: `surgpkg:${i}`, kind: 'Surgical package & global period', prompt: q.q, opts: order.map(k => ({ label: q.opts[k] })), a: order.indexOf(q.a), why: q.why, cite: q.cite };
        }, 'What the package includes, 0/10/90-day globals, 24-25-57, 58-78-79, split care 54/55/56.');

        B.surgsort = mk('surgsort', 'In the Package?', '🧰', '#fdba74', 'CPT', this.surgItems.length, i => {
            const [scen, id, why] = this.surgItems[i];
            const opts = this.surgBuckets.map(b => ({ label: b.name, sub: b.sub, ref: b.id }));
            return { id: `surgsort:${i}`, kind: 'During the global period, this service is…', prompt: scen, opts, a: opts.findIndex(o => o.ref === id), why, cite: 'CPT Surgery Guidelines; CMS MLN907166 Global Surgery' };
        }, 'Included, separately reportable with a modifier, or simply outside the package?');

        B.mdc = mk('mdc', 'MDC Sort', '🗂️', '#f59e0b', 'MS-DRG', this.mdcItems.length, i => {
            const [dx, n] = this.mdcItems[i];
            const right = this.mdcs.find(m => m.n === n);
            const opts = catOpts(this.mdcs, right, m => `MDC ${String(m.n).padStart(2, '0')} · ${m.name}`);
            return { id: `mdc:${i}`, kind: 'Which Major Diagnostic Category?', prompt: `Principal diagnosis: ${dx}`, opts, a: opts.findIndex(o => o.ref === right), why: `MDC ${String(right.n).padStart(2, '0')} — ${right.name}. The principal diagnosis drives the MDC (except Pre-MDC cases such as transplants).`, cite: 'CMS MS-DRG Definitions Manual' };
        }, 'The principal diagnosis picks one of 25 Major Diagnostic Categories.');

        B.drgq = mk('drgq', 'Grouper Quiz', '🏥', '#fbbf24', 'MS-DRG', this.drgQ.length, i => {
            const q = this.drgQ[i];
            const order = u.shuffle(q.opts.map((o, k) => k));
            return { id: `drgq:${i}`, kind: 'MS-DRG and IPPS basics', prompt: q.q, opts: order.map(k => ({ label: q.opts[k] })), a: order.indexOf(q.a), why: q.why, cite: q.cite };
        }, 'How the grouper thinks: MDC, surgical partition, MCC/CC, CC exclusions, weights, CMI, POA, outliers, transfers.');
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
        const groups = ['ICD-10-CM', 'ICD-10-PCS', 'CPT', 'HCPCS', 'MS-DRG', 'Code sets'];
        const study = {
            'ICD-10-CM': [['🗺️ Chapter Map', 'showMap()'], ['📜 Guideline sheet', "showTable('cloze')"]],
            'ICD-10-PCS': [['🔪 Root-operation table', "showTable('pcsroot')"], ['🚪 Approach table', "showTable('pcsapp')"], ['📚 Section table', "showTable('pcssect')"], ['🔢 7 characters', "showTable('pcschars')"]],
            'CPT': [['📙 Section ranges', "showTable('cptsect')"], ['🩻 Surgery ranges', "showTable('cptsurg')"], ['🏷️ Modifier table', "showTable('cptmod')"], ['🧮 MDM table', "showTable('emtable')"], ['📦 Global period sheet', "showTable('global')"]],
            'HCPCS': [['🔤 Letter table', "showTable('hcpcs')"]],
            'MS-DRG': [['🗂️ MDC table', "showTable('mdc')"]],
            'Code sets': []
        };
        const custom = {
            'ICD-10-CM': [{ icon: '🔗', title: 'Sequence It', color: '#f97316', blurb: 'Order the codes for a short case, principal first — with trap codes that must not be reported.', go: 'showSeqMenu()', key: 'seq', size: (window.SEQ_CASES || []).length, unit: 'cases' }],
            'ICD-10-PCS': [{ icon: '🔢', title: 'PCS Code Builder', color: '#a78bfa', blurb: 'Build the full 7-character code for a procedure, one axis at a time: section, body system, root operation, body part, approach, device, qualifier.', go: 'startPcsBuild()', key: 'pcsb', size: (window.PCS_BUILD_CASES || []).length, unit: 'procedures' }],
            'MS-DRG': [{ icon: '🏥', title: 'DRG Lab', color: '#f59e0b', blurb: 'A discharge with its diagnoses: pick the MDC, the severity tier (with MCC / with CC / without), then the payment from base rate × weight.', go: 'startDrg()', key: 'drg', size: (window.DRG_CASES || []).length, unit: 'cases' }],
            'CPT': [
                { icon: '🧮', title: 'E/M Level Builder', color: '#38bdf8', blurb: 'Read a mini chart note, rate problems, data and risk, then pick the office visit code.', go: 'startEM()', key: 'em', size: (window.EM_CASES || []).length, unit: 'cases' },
                { icon: '💉', title: 'Anesthesia Units', color: '#a855f7', blurb: 'Time units, modifying units, total units and the fee — step by step from a case card.', go: 'startAnes()', key: 'anes', size: (window.ANES_CODES || []).length, unit: 'codes · endless cases' }
            ]
        };
        const customCard = m => { const r = this.rec(m.key); return `<button class="cs-mode" style="--gm-accent:${m.color}" onclick="window.codeSprint.${m.go}">
                <span class="cs-mode-icon">${m.icon}</span>
                <span class="cs-mode-body"><b>${u.esc(m.title)}</b><span>${u.esc(m.blurb)}</span><em>${m.size} ${m.unit}${r.plays ? ` · ${r.plays} played · ${r.total ? Math.round(r.correct / r.total * 100) : 0}%` : ''}</em></span></button>`; };
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
                <p>ICD-10-CM chapters and the Official Guidelines (quoted word for word), ICD-10-PCS root operations and a 7-character code builder, CPT sections, modifiers and the surgical package, HCPCS letters, MS-DRG grouping. Everything you miss lands in the Review pile until you get it right twice.</p>
                <button class="ag-btn ag-btn-ghost ag-btn-sm cs-flash" onclick="window.codeSprint.toggleFlash()">📇 Misses → Flashcards: <b>${this.flashOn() ? 'ON' : 'off'}</b>${this.flashCount() ? ` · ${this.flashCount()} cards in the deck` : ''}</button>
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
                <div class="cs-modes">${banks.map(card).join('')}${(custom[g] || []).map(customCard).join('')}</div>
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
        } else if (kind === 'emtable') {
            const T = window.EM_TABLE; title = 'Office/outpatient E/M: medical decision making (2021 table)'; play = 'cptrules';
            hint = T.note + ' Time minimums: 99202 15 · 99203 30 · 99204 45 · 99205 60 · 99212 10 · 99213 20 · 99214 30 · 99215 40 minutes.';
            rows = [['problems', 'Problems addressed'], ['data', 'Data reviewed and analyzed'], ['risk', 'Risk of patient management']].map(([el, label]) => `<h4 class="cs-tgroup">${label}</h4>` + T[el].map((o, k) => row(['#94a3b8', '#34d399', '#facc15', '#f87171'][k], u.esc(o.label), `MDM: ${T.mdm[k]} → ${T.codes.new[T.mdm[k]]} new / ${T.codes.est[T.mdm[k]]} established`, u.esc(o.text))).join('')).join('');
        } else if (kind === 'mdc') {
            title = 'The 25 Major Diagnostic Categories'; play = 'mdc';
            hint = 'Assigned from the principal diagnosis. Pre-MDC DRGs (transplants, ECMO, tracheostomy with ventilation >96 hours) are assigned before this step.';
            rows = this.mdcs.map(m => row(m.color, `MDC ${String(m.n).padStart(2, '0')}`, u.esc(m.name), u.esc(this.mdcItems.filter(r => r[1] === m.n).map(r => r[0]).slice(0, 3).join(' · ')))).join('');
        } else if (kind === 'global') {
            title = 'Global surgery cheat sheet (CMS)'; play = 'surgpkg';
            hint = 'Sources: CPT Surgery Guidelines (surgical package definition) and CMS MLN907166 "Global Surgery". Payer rules on complications differ: CPT excludes them, Medicare includes those not needing a return to the OR.';
            const R = [
                ['#94a3b8', '000', 'Minor / endoscopy', 'Day of the procedure only. Same-day E/M needs modifier 25.'],
                ['#94a3b8', '010', 'Minor', 'Day of + 10 days (11 days). No preoperative day. Same-day E/M needs 25.'],
                ['#94a3b8', '090', 'Major', '1 day before + day of + 90 days (92 days). Decision visit the day before/of needs 57.'],
                ['#94a3b8', 'XXX / ZZZ / MMM', 'Indicators', 'XXX global concept does not apply · ZZZ add-on, follows the primary · MMM maternity · YYY contractor-priced.'],
                ['#2dd4bf', 'Included', 'In the package', 'Post-decision E/M day before/of (H&P) · local/topical/digital-block anesthesia · immediate post-op care, op note, family, orders, PACU · typical follow-up (99024) · dressings, suture/staple removal, routine lines, tubes, catheters · surgeon’s routine pain management · Medicare: complications not needing a return to the OR.'],
                ['#fbbf24', '24', 'Unrelated E/M in the post-op period', 'Documentation must show it is unrelated to the surgery.'],
                ['#fbbf24', '25', 'Significant, separately identifiable same-day E/M', 'Minor procedures (000/010).'],
                ['#fbbf24', '57', 'Decision for surgery', 'Major procedures (090), the day before or day of.'],
                ['#fbbf24', '58', 'Staged or related, planned', 'Planned, more extensive, or therapy after a diagnostic procedure. New global starts.'],
                ['#fbbf24', '78', 'Unplanned return to the OR, related', 'Intraoperative portion only; the original global continues.'],
                ['#fbbf24', '79', 'Unrelated procedure in the post-op period', 'New global starts.'],
                ['#fbbf24', '54 · 55 · 56', 'Split care', 'Surgical care only · post-op management only · pre-op management only.'],
                ['#34d399', 'Not included', 'Separately payable', 'The decision visit (57) · other physicians without transfer of care · unrelated visits (24) · underlying-condition treatment, chemo, immunosuppression · diagnostic tests and radiology · distinct unrelated procedures (79) · return to the OR (78) · a more extensive procedure after a failed lesser one · unrelated critical care.']
            ];
            rows = R.map(r => row(r[0], u.esc(r[1]), u.esc(r[2]), u.esc(r[3]))).join('');
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
            <div class="ag-win-actions" style="margin-top:1rem"><button class="ag-btn ag-btn-primary" onclick="${kind === 'emtable' ? 'window.codeSprint.startEM()' : `window.codeSprint.startRound('${play}')`}">▶ Drill this</button><button class="ag-btn" onclick="window.codeSprint.back()">Code Sprint</button></div>
        </div>`;
        window.scrollTo(0, 0);
    }

    // ============================================================
    // E/M LEVEL BUILDER — office/outpatient 99202–99215
    // ============================================================
    startEM() {
        const u = this.ui(); const cases = window.EM_CASES || [];
        if (!cases.length) return;
        this.app.switchView('code-sprint');
        this.current = { mode: 'em', queue: u.shuffle(cases).slice(0, 5), i: 0, points: 0, max: 0, start: Date.now(), picks: {}, scored: false, locked: false };
        this.emNext();
    }
    emNext() {
        const c = this.current; const u = this.ui(); const T = window.EM_TABLE;
        if (c.i >= c.queue.length) { this.emFinish(); return; }
        const cs = c.queue[c.i]; c.picks = {}; c.scored = false; c.locked = false;
        const picker = (el, label) => `
            <div class="em-el" data-el="${el}">
                <div class="em-el-title">${label} <button class="ag-btn ag-btn-ghost ag-btn-sm" onclick="window.codeSprint.emHelp('${el}')">?</button></div>
                <div class="em-el-opts">${T[el].map(o => `<button class="em-opt" data-el="${el}" data-level="${o.level}">${o.label}</button>`).join('')}</div>
                <div class="em-el-why" id="em-why-${el}" hidden></div>
            </div>`;
        this.host().innerHTML = `
        <div class="ag-play" style="--ag-accent:#38bdf8">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🧮 E/M Builder</span>
                <span class="ag-chip-stat"><b>${c.i + 1}/${c.queue.length}</b></span>
                <span class="ag-chip-stat">⭐ <b>${c.points}</b>/${c.max}</span>
            </div>
            <div class="em-note"><span class="em-status">${cs.status === 'new' ? 'NEW patient' : 'ESTABLISHED patient'}</span><b>${u.esc(cs.title)}</b><p>${u.esc(cs.note)}</p></div>
            <p class="ag-hint">Rate each element of medical decision making, then score it.</p>
            ${picker('problems', 'Problems addressed')}${picker('data', 'Data reviewed and analyzed')}${picker('risk', 'Risk of management')}
            <div class="ag-win-actions"><button class="ag-btn ag-btn-primary" id="em-score" disabled onclick="window.codeSprint.emScore()">Score it</button></div>
            <div id="em-code" hidden></div>
            <div class="ag-fact" id="em-fact" hidden></div>
            <div class="ag-win-actions" id="em-next" hidden><button class="ag-btn ag-btn-primary" onclick="window.codeSprint.current.i++; window.codeSprint.emNext()">Next case →</button></div>
        </div>`;
        this.host().querySelectorAll('.em-opt').forEach(b => b.addEventListener('click', () => this.emPick(b.getAttribute('data-el'), b.getAttribute('data-level'))));
        window.scrollTo(0, 0);
    }
    emHelp(el) {
        const T = window.EM_TABLE; const u = this.ui();
        const box = document.getElementById(`em-why-${el}`); if (!box) return;
        box.hidden = !box.hidden;
        if (!box.hidden) box.innerHTML = T[el].map(o => `<div><b>${u.esc(o.label)}</b> — ${u.esc(o.text)}</div>`).join('');
    }
    emPick(el, level) {
        const c = this.current; if (!c || c.scored) return;
        c.picks[el] = level;
        document.querySelectorAll(`.em-opt[data-el="${el}"]`).forEach(b => b.classList.toggle('sel', b.getAttribute('data-level') === level));
        document.getElementById('em-score').disabled = !(c.picks.problems && c.picks.data && c.picks.risk);
    }
    emLevel(cs) {
        const T = window.EM_TABLE; const rank = { minimal: 0, low: 1, moderate: 2, high: 3, limited: 1, extensive: 3 };
        const lv = [rank[cs.problems], rank[cs.data], rank[cs.risk]].sort((a, b) => b - a);
        return T.mdm[lv[1]];
    }
    emScore() {
        const c = this.current; if (!c || c.scored) return;
        c.scored = true;
        const cs = c.queue[c.i]; const T = window.EM_TABLE; const u = this.ui();
        let got = 0;
        ['problems', 'data', 'risk'].forEach(el => {
            const ok = c.picks[el] === cs[el]; if (ok) got++;
            document.querySelectorAll(`.em-opt[data-el="${el}"]`).forEach(b => { b.disabled = true; const l = b.getAttribute('data-level'); if (l === cs[el]) b.classList.add('ok'); else if (l === c.picks[el]) b.classList.add('bad'); });
            const box = document.getElementById(`em-why-${el}`); const def = T[el].find(o => o.level === cs[el]);
            box.hidden = false; box.innerHTML = `<div><b style="color:${ok ? '#34d399' : '#f87171'}">${ok ? 'Correct' : 'Expected'}: ${u.esc(def.label)}</b> — ${u.esc(def.text)}</div>`;
        });
        c.points += got; c.max += 3;
        const mdm = cs.code === '99211' ? 'n/a (clinical staff visit)' : this.emLevel(cs);
        const codes = cs.status === 'new' ? ['99202', '99203', '99204', '99205'] : ['99211', '99212', '99213', '99214', '99215'];
        const box = document.getElementById('em-code');
        box.hidden = false;
        box.innerHTML = `<div class="wl-meaning"><span>MDM by 2 of 3 elements: <b>${u.esc(mdm)}</b>${cs.time ? ` · total time documented: <b>${cs.time} min</b>` : ''}</span><b>Which code?</b></div>
            <div class="cs-options" id="em-codes">${codes.map(k => `<button class="cs-option" data-code="${k}"><span class="cs-range">${k}</span></button>`).join('')}</div>`;
        box.querySelectorAll('.cs-option').forEach(b => b.addEventListener('click', () => this.emCode(b.getAttribute('data-code'))));
        document.getElementById('em-score').disabled = true;
        box.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    emCode(code) {
        const c = this.current; if (!c || c.locked) return; c.locked = true;
        const cs = c.queue[c.i]; const u = this.ui();
        const ok = code === cs.code; if (ok) c.points++; c.max++;
        document.querySelectorAll('#em-codes .cs-option').forEach(b => { b.disabled = true; const k = b.getAttribute('data-code'); if (k === cs.code) b.classList.add('ok'); else if (k === code) b.classList.add('bad'); });
        const f = document.getElementById('em-fact'); f.hidden = false;
        f.innerHTML = `<b style="color:${ok ? '#34d399' : '#f87171'}">${cs.code}</b> — ${u.esc(cs.why)}<br><span class="cs-cite">${u.esc(window.EM_TABLE.note)}</span>`;
        document.getElementById('em-next').hidden = false;
        const t = document.querySelector('.ag-topbar .ag-chip-stat:last-child b'); if (t) t.textContent = c.points;
    }
    emFinish() {
        const c = this.current; const u = this.ui();
        const r = this.rec('em'); r.plays++; r.correct += c.points; r.total += c.max; r.best = Math.max(r.best || 0, c.points);
        const xp = c.points * 2 + (c.points === c.max ? 15 : 0);
        u.awardXP(xp, 'Code Sprint: E/M builder'); window.gamesHub?.credit('code'); u.save();
        u.win('code-sprint-content', { title: c.points === c.max ? 'Leveled perfectly!' : 'Round complete', name: `${c.points}/${c.max} points`,
            rows: [`⏱ ${u.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.codeSprint.startEM()">🔁 New cases</button><button class="ag-btn" onclick="window.codeSprint.showTable('emtable')">📋 MDM table</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.codeSprint.back()">Code Sprint</button>` });
    }

    // ============================================================
    // ANESTHESIA UNITS CALCULATOR
    // ============================================================
    anesCase() {
        const codes = window.ANES_CODES || []; const QC = window.ANES_QC || [];
        const code = codes[Math.floor(Math.random() * codes.length)];
        const minutes = 15 * (2 + Math.floor(Math.random() * 11));         // 30–180 min
        const ps = ['P1', 'P2', 'P3', 'P4', 'P5'][Math.floor(Math.random() * 5)];
        const qc = Math.random() < 0.45 ? QC[Math.random() < 0.6 ? 0 : 3] : null;
        const medicare = Math.random() < 0.35;
        const cf = 20 + Math.floor(Math.random() * 6);
        const timeUnits = minutes / 15;
        const psUnits = window.ANES_PS[ps]; const qcUnits = qc ? qc[2] : 0;
        const modUnits = medicare ? 0 : psUnits + qcUnits;
        const total = code[2] + timeUnits + modUnits;
        return { code: code[0], desc: code[1], base: code[2], minutes, ps, qc, medicare, cf, timeUnits, psUnits, qcUnits, modUnits, total, fee: total * cf };
    }
    startAnes() {
        this.app.switchView('code-sprint');
        this.current = { mode: 'anes', queue: Array.from({ length: 5 }, () => this.anesCase()), i: 0, step: 0, points: 0, max: 0, start: Date.now(), locked: false };
        this.anesNext();
    }
    anesSteps(a) {
        const u = this.ui();
        const opts = (right, wrongs, fmt) => { const set = [right]; wrongs.forEach(w => { if (w !== right && !set.includes(w) && w >= 0) set.push(w); }); while (set.length < 4) set.push(right + set.length); return u.shuffle(set.slice(0, 4)).map(v => ({ v, label: fmt(v) })); };
        return [
            { q: 'How many time units?', right: a.timeUnits, opts: opts(a.timeUnits, [a.timeUnits + 1, a.timeUnits - 1, Math.round(a.minutes / 10)], v => `${v} units`),
              why: `${a.minutes} minutes ÷ 15 = ${a.timeUnits} time units (one unit per 15 minutes; CMS carries fractions to one decimal).` },
            { q: 'How many modifying units (physical status + qualifying circumstances)?', right: a.modUnits, opts: opts(a.modUnits, [a.psUnits + a.qcUnits, a.psUnits, a.qcUnits, 0, a.modUnits + 1], v => `${v} units`),
              why: a.medicare ? `Medicare does not pay for physical status or qualifying circumstances, so modifying units = 0 (${a.ps} would be ${a.psUnits}${a.qc ? `, ${a.qc[0]} would be ${a.qcUnits}` : ''} for a payer that recognizes them).`
                               : `${a.ps} = ${a.psUnits} unit${a.psUnits === 1 ? '' : 's'}${a.qc ? ` + ${a.qc[0]} (${a.qc[1]}) = ${a.qcUnits}` : ''} → ${a.modUnits}. (P1 0 · P2 0 · P3 1 · P4 2 · P5 3 · P6 0; 99100 +1 · 99116 +5 · 99135 +5 · 99140 +2.)` },
            { q: 'Total units?', right: a.total, opts: opts(a.total, [a.base + a.timeUnits, a.total + a.psUnits + a.qcUnits, a.total - 1, a.base + a.modUnits], v => `${v} units`),
              why: `Base ${a.base} + time ${a.timeUnits} + modifying ${a.modUnits} = ${a.total} units.` },
            { q: `Allowed amount at a conversion factor of $${a.cf}.00?`, right: a.fee, opts: opts(a.fee, [a.base * a.cf, (a.base + a.timeUnits) * a.cf, a.fee + a.cf, a.fee - a.cf], v => `$${v.toFixed(2)}`),
              why: `${a.total} units × $${a.cf}.00 = $${a.fee.toFixed(2)}.` }
        ];
    }
    anesNext() {
        const c = this.current; const u = this.ui();
        if (c.i >= c.queue.length) { this.anesFinish(); return; }
        const a = c.queue[c.i]; const steps = this.anesSteps(a); const st = steps[c.step];
        c.locked = false; c.st = st;
        this.host().innerHTML = `
        <div class="ag-play" style="--ag-accent:#a855f7">
            <div class="ag-topbar">
                <span class="ag-chip-stat">💉 Anesthesia units</span>
                <span class="ag-chip-stat">case <b>${c.i + 1}/${c.queue.length}</b> · step ${c.step + 1}/4</span>
                <span class="ag-chip-stat">⭐ <b>${c.points}</b>/${c.max}</span>
            </div>
            <div class="em-note">
                <span class="em-status">${a.medicare ? 'MEDICARE' : 'COMMERCIAL PAYER (recognizes modifying units)'}</span>
                <b>${a.code} · ${u.esc(a.desc)}</b>
                <p>Base units: <b>${a.base}</b> · Anesthesia time: <b>${a.minutes} minutes</b> · Physical status: <b>${a.ps}</b>${a.qc ? ` · Qualifying circumstance: <b>${a.qc[0]} ${u.esc(a.qc[1])}</b>` : ''} · Conversion factor: <b>$${a.cf}.00</b></p>
            </div>
            <div class="wl-meaning"><span>Step ${c.step + 1}</span><b>${u.esc(st.q)}</b></div>
            <div class="cs-options" id="cs-options">${st.opts.map((o, k) => `<button class="cs-option" data-k="${k}"><span class="cs-range">${u.esc(o.label)}</span></button>`).join('')}</div>
            <div class="ag-fact" id="cs-fact" hidden></div>
            <div class="ag-win-actions" id="cs-next" hidden><button class="ag-btn ag-btn-primary" onclick="window.codeSprint.anesAdvance()">Next →</button></div>
            <p class="ag-hint">Formula: (base + time + modifying units) × conversion factor. Time unit = 15 minutes.</p>
        </div>`;
        this.host().querySelector('#cs-options').addEventListener('click', e => { const b = e.target.closest('.cs-option'); if (b) this.anesAnswer(+b.getAttribute('data-k')); });
        window.scrollTo(0, 0);
    }
    anesAnswer(k) {
        const c = this.current; if (!c || c.locked) return; c.locked = true;
        const st = c.st; const ok = st.opts[k].v === st.right; const u = this.ui();
        if (ok) c.points++; c.max++;
        document.querySelectorAll('#cs-options .cs-option').forEach((b, i) => { b.disabled = true; if (st.opts[i].v === st.right) b.classList.add('ok'); else if (i === k) b.classList.add('bad'); });
        const f = document.getElementById('cs-fact'); f.hidden = false;
        f.innerHTML = `<b style="color:${ok ? '#34d399' : '#f87171'}">${ok ? 'Correct' : 'Not quite'}</b> — ${u.esc(st.why)}`;
        document.getElementById('cs-next').hidden = false;
    }
    anesAdvance() { const c = this.current; if (!c || c.mode !== 'anes') return; c.step++; if (c.step >= 4) { c.step = 0; c.i++; } this.anesNext(); }
    anesFinish() {
        const c = this.current; const u = this.ui();
        const r = this.rec('anes'); r.plays++; r.correct += c.points; r.total += c.max; r.best = Math.max(r.best || 0, c.points);
        const xp = c.points * 2 + (c.points === c.max ? 15 : 0);
        u.awardXP(xp, 'Code Sprint: anesthesia units'); window.gamesHub?.credit('code'); u.save();
        u.win('code-sprint-content', { title: c.points === c.max ? 'Unit master!' : 'Round complete', name: `${c.points}/${c.max} steps right`,
            rows: [`⏱ ${u.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="window.codeSprint.startAnes()">🔁 New cases</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.codeSprint.back()">Code Sprint</button>` });
    }

    // ============================================================
    // SEQUENCE IT — order the codes for a case
    // ============================================================
    seqStars(id) { const r = this.store().seq && this.store().seq[id]; return r ? (r.stars || 0) : 0; }
    showSeqMenu() {
        const host = this.host(); if (!host) return;
        this.current = { mode: 'study' };
        const u = this.ui(); const cases = window.SEQ_CASES || [];
        host.innerHTML = `
        <div class="gm-wrap">
            <div class="gm-hero" style="--gm-accent:#f97316"><h2>Sequence It</h2><p>A short case, a shuffled set of codes — and a few traps that should not be reported. Tap the codes in order, principal first. Codes in the same group can go in any order.</p></div>
            <div class="ag-win-actions" style="justify-content:flex-start;margin-bottom:0.8rem"><button class="ag-btn ag-btn-primary" onclick="window.codeSprint.startSeq()">🎲 Random case</button></div>
            <div class="fl-list">${cases.map(cs => { const st = this.seqStars(cs.id); return `
                <button class="fl-row" style="--gm-accent:${cs.setting === 'Inpatient' ? '#f97316' : '#38bdf8'}" onclick="window.codeSprint.startSeq('${cs.id}')">
                    <span class="fl-row-icon">${cs.setting === 'Inpatient' ? '🏥' : '🩺'}</span>
                    <span class="fl-row-body"><b>${u.esc(cs.title)}</b><span>${cs.setting} · ${cs.steps.flat().length} codes${cs.traps.length ? ` · ${cs.traps.length} trap${cs.traps.length === 1 ? '' : 's'}` : ''} · Guideline ${u.esc(cs.cite)}</span></span>
                    <span class="fl-row-stars ${st ? 'on' : ''}">${u.stars(st)}</span>
                </button>`; }).join('')}</div>
        </div>`;
        window.scrollTo(0, 0);
    }
    startSeq(id) {
        const cases = window.SEQ_CASES || []; if (!cases.length) return;
        const cs = cases.find(c => c.id === id) || cases[Math.floor(Math.random() * cases.length)];
        const u = this.ui();
        this.app.switchView('code-sprint');
        const cards = [];
        cs.steps.forEach((grp, g) => grp.forEach(([code, desc]) => cards.push({ code, desc, group: g })));
        cs.traps.forEach(([code, desc, why]) => cards.push({ code, desc, trap: true, why }));
        this.current = { mode: 'seq', cs, cards: u.shuffle(cards), group: 0, placed: 0, mistakes: 0, start: Date.now(), done: false };
        const c = this.current; const total = cs.steps.flat().length;
        this.host().innerHTML = `
        <div class="ag-play" style="--ag-accent:#f97316">
            <div class="fl-title"><span class="fl-title-icon">${cs.setting === 'Inpatient' ? '🏥' : '🩺'}</span><div><h2>${u.esc(cs.title)}</h2><p>${cs.setting} · tap the codes in order, principal first</p></div></div>
            <div class="em-note"><p>${u.esc(cs.case)}</p></div>
            <div class="ag-topbar"><span class="ag-chip-stat">🔗 <b id="seq-progress">0/${total}</b></span><span class="ag-chip-stat">❌ <b id="seq-miss">0</b></span></div>
            <div class="fl-chain" id="seq-chain">${cs.steps.map((grp, g) => grp.map((_, k) => `<div class="fl-link" data-slot="${g}-${k}"><span class="fl-link-num">${g + 1}</span><span class="fl-link-text">${k === 0 && grp.length > 1 ? `group ${g + 1} (any order)` : ''}</span></div>`).join('')).join('')}</div>
            <div class="fl-cards" id="seq-cards">${c.cards.map((cd, i) => `<button class="fl-card seq-card" data-i="${i}"><b>${u.esc(cd.code)}</b><span>${u.esc(cd.desc)}</span></button>`).join('')}</div>
            <div class="ag-fact" id="seq-fact" hidden></div>
        </div>`;
        this.host().querySelector('#seq-cards').addEventListener('click', e => { const b = e.target.closest('.seq-card'); if (b && !b.classList.contains('used') && !b.classList.contains('trapped')) this.seqTap(+b.getAttribute('data-i')); });
        window.scrollTo(0, 0);
    }
    seqTap(i) {
        const c = this.current; if (!c || c.mode !== 'seq' || c.done) return;
        const cd = c.cards[i]; const cs = c.cs; const u = this.ui();
        const card = document.querySelector(`#seq-cards .seq-card[data-i="${i}"]`);
        const fact = document.getElementById('seq-fact');
        if (cd.trap) {
            c.mistakes++; card.classList.add('trapped');
            fact.hidden = false; fact.innerHTML = `<b style="color:#f87171">Trap — ${u.esc(cd.code)} is not reported.</b> ${u.esc(cd.why)}`;
        } else if (cd.group === c.group) {
            const slot = cs.steps[c.group].findIndex((_, k) => !document.querySelector(`.fl-link[data-slot="${c.group}-${k}"]`).classList.contains('filled'));
            const link = document.querySelector(`.fl-link[data-slot="${c.group}-${slot}"]`);
            link.classList.add('filled'); link.querySelector('.fl-link-text').innerHTML = `<b>${u.esc(cd.code)}</b> ${u.esc(cd.desc)}`;
            card.classList.add('used'); c.placed++;
            if (cs.steps[c.group].every((_, k) => document.querySelector(`.fl-link[data-slot="${c.group}-${k}"]`).classList.contains('filled'))) c.group++;
            fact.hidden = true;
        } else {
            c.mistakes++; card.classList.add('bad'); setTimeout(() => card.classList.remove('bad'), 450);
            fact.hidden = false; fact.innerHTML = `<b style="color:#f87171">Not yet.</b> ${u.esc(cd.code)} belongs ${cd.group < c.group ? 'earlier' : 'later'} in the sequence — fill group ${c.group + 1} first.`;
        }
        document.getElementById('seq-progress').textContent = `${c.placed}/${cs.steps.flat().length}`;
        document.getElementById('seq-miss').textContent = c.mistakes;
        if (c.placed === cs.steps.flat().length) this.seqFinish();
    }
    seqFinish() {
        const c = this.current; c.done = true; const u = this.ui(); const s = this.store(); const cs = c.cs;
        const stars = c.mistakes === 0 ? 3 : c.mistakes <= 2 ? 2 : 1;
        if (!s.seq) s.seq = {};
        const rec = s.seq[cs.id] || { stars: 0, plays: 0 }; const first = rec.plays === 0;
        rec.plays++; rec.stars = Math.max(rec.stars || 0, stars); s.seq[cs.id] = rec;
        const r = this.rec('seq'); r.plays++; r.correct += stars; r.total += 3; r.best = Math.max(r.best || 0, stars);
        let xp = cs.steps.flat().length * 3 + (stars === 3 ? 10 : 0); if (!first) xp = Math.round(xp / 2);
        u.awardXP(xp, `Code Sprint: sequenced ${cs.title}`); window.gamesHub?.credit('code'); u.save();
        const fact = document.getElementById('seq-fact'); fact.hidden = false;
        fact.innerHTML = `<b style="color:#34d399">Why this order</b> — ${u.esc(cs.why)}<br><span class="cs-cite">Guideline ${u.esc(cs.cite)}</span>${cs.traps.length ? `<br><br><b>Traps:</b> ${cs.traps.map(t => `<br>• <b>${u.esc(t[0])}</b> ${u.esc(t[1])} — ${u.esc(t[2])}`).join('')}` : ''}`;
        u.win('code-sprint-content', { title: stars === 3 ? 'Perfect sequence!' : 'Case complete', name: cs.title,
            rows: [u.stars(stars), `❌ ${c.mistakes}`, `⏱ ${u.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`],
            actions: `<button class="ag-btn" onclick="this.closest('.ag-win-overlay').remove()">📖 Read why</button><button class="ag-btn" onclick="window.codeSprint.startSeq()">🎲 Another case</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.codeSprint.showSeqMenu()">All cases</button>` });
    }

    // ============================================================
    // FLASHCARDS — misses become spaced-repetition cards (deck "Code Sprint misses")
    // ============================================================
    flashOn() { const s = this.store(); return s.flash !== false; }
    toggleFlash() { const s = this.store(); s.flash = !this.flashOn(); this.ui().save(); this.ui().toast(s.flash ? 'Misses will be added to Flashcards.' : 'Flashcard capture off.', 'info'); this.render(); }
    addFlashcard(id, front, back) {
        if (!this.flashOn()) return false;
        const u = APP_DATA.user;
        if (!u.flashcards) u.flashcards = { cards: [], settings: { newCardsPerDay: 20, reviewsPerDay: 100 }, stats: {} };
        if (!u.flashcards.cards) u.flashcards.cards = [];
        const cid = `cs-${id}`;
        if (u.flashcards.cards.some(c => c.id === cid)) return false;
        const esc = this.ui().esc;
        u.flashcards.cards.push({ id: cid, bookId: 'code-sprint', deck: 'Code Sprint misses', lessonId: id.split(':')[0], front: esc(front), back: esc(back),
            stability: 0, difficulty: 0, interval: 1, nextReview: new Date().toISOString(), lastReviewed: null, reviewCount: 0 });
        if (!u.flashcards.stats) u.flashcards.stats = {};
        u.flashcards.stats.totalCards = u.flashcards.cards.length;
        if (this.current) this.current.fc = (this.current.fc || 0) + 1;
        window.activeRecall?.updateDueBadge?.();
        return true;
    }
    flashCount() { return (APP_DATA.user.flashcards?.cards || []).filter(c => c.bookId === 'code-sprint').length; }
    fcRow(c) { return c.fc ? `📇 +${c.fc} flashcard${c.fc === 1 ? '' : 's'}` : null; }

    // ============================================================
    // ICD-10-PCS CODE BUILDER — one character at a time
    // ============================================================
    pcsOptions(cs, i) {
        const u = this.ui(); const ch = cs.chars[i]; const W = window;
        let wrong = ch.wrong;
        if (!wrong) {
            const pools = [W.PCS_SECTIONS.map(s => [s.ch, s.name]), W.PCS_BODY_SYSTEMS, W.PCS_ROOT_OPS.map(r => [r.ch, r.op]), null, W.PCS_APPROACHES.map(a => [a.ch, a.name]), W.PCS_DEVICES, W.PCS_QUALIFIERS];
            wrong = u.pick((pools[i] || []).filter(p => p[0] !== ch.v), 3);
        }
        return u.shuffle([[ch.v, ch.n], ...wrong]).map(o => ({ v: o[0], n: o[1] }));
    }
    startPcsBuild() {
        const u = this.ui(); const cases = window.PCS_BUILD_CASES || []; if (!cases.length) return;
        this.app.switchView('code-sprint');
        this.current = { mode: 'pcsb', queue: u.shuffle(cases).slice(0, 4), i: 0, step: 0, points: 0, max: 0, start: Date.now(), locked: false, picked: [], misses: [] };
        this.pcsNext();
    }
    pcsNext() {
        const c = this.current; const u = this.ui();
        if (c.i >= c.queue.length) { this.pcsFinish(); return; }
        const cs = c.queue[c.i]; const axes = cs.axes || window.PCS_AXES; const i = c.step;
        c.locked = false; c.opts = this.pcsOptions(cs, i);
        this.host().innerHTML = `
        <div class="ag-play" style="--ag-accent:#a78bfa">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🔢 PCS Builder</span>
                <span class="ag-chip-stat">case <b>${c.i + 1}/${c.queue.length}</b></span>
                <span class="ag-chip-stat">⭐ <b>${c.points}</b>/${c.max}</span>
            </div>
            <div class="em-note"><span class="em-status">PROCEDURE</span><b>${u.esc(cs.proc)}</b></div>
            <div class="pb-slots">${axes.map((ax, k) => `<div class="pb-slot ${k < i ? 'filled' : ''} ${k === i ? 'cur' : ''}"><b>${k < i ? u.esc(cs.chars[k].v) : (k === i ? '?' : '·')}</b><span>${k + 1}</span><em>${u.esc(ax)}</em></div>`).join('')}</div>
            <div class="wl-meaning"><span>Character ${i + 1} of 7</span><b>${u.esc(axes[i])}</b></div>
            <div class="cs-options" id="cs-options">${c.opts.map((o, k) => `<button class="cs-option" data-k="${k}"><span class="cs-range">${u.esc(o.v)}</span><span class="cs-name">${u.esc(o.n)}</span></button>`).join('')}</div>
            <div class="ag-fact" id="cs-fact" hidden></div>
            <div class="ag-win-actions" id="cs-next" hidden><button class="ag-btn ag-btn-primary" onclick="window.codeSprint.pcsAdvance()">Next →</button></div>
            <p class="ag-hint">Build the code left to right. Characters 2–4 depend on the section; the letters O and I are never used.</p>
        </div>`;
        this.host().querySelector('#cs-options').addEventListener('click', e => { const b = e.target.closest('.cs-option'); if (b) this.pcsAnswer(+b.getAttribute('data-k')); });
        window.scrollTo(0, 0);
    }
    pcsAnswer(k) {
        const c = this.current; if (!c || c.mode !== 'pcsb' || c.locked) return; c.locked = true;
        const cs = c.queue[c.i]; const ch = cs.chars[c.step]; const axes = cs.axes || window.PCS_AXES; const u = this.ui();
        const ok = c.opts[k].v === ch.v; if (ok) c.points++; c.max++;
        document.querySelectorAll('#cs-options .cs-option').forEach((b, i) => { b.disabled = true; if (c.opts[i].v === ch.v) b.classList.add('ok'); else if (i === k) b.classList.add('bad'); });
        const f = document.getElementById('cs-fact'); f.hidden = false;
        const last = c.step === 6;
        f.innerHTML = `<b style="color:${ok ? '#34d399' : '#f87171'}">${ok ? 'Correct' : 'Not quite'}</b> — character ${c.step + 1} (${u.esc(axes[c.step])}) = <b>${u.esc(ch.v)}</b> ${u.esc(ch.n)}.${last ? `<br><br><b>Complete code: <span class="cs-code">${u.esc(cs.code)}</span></b><br>${u.esc(cs.why)}` : ''}`;
        if (!ok) { c.misses.push(cs.id); this.addFlashcard(`pcsb:${cs.id}:${c.step}`, `ICD-10-PCS: ${cs.proc} — character ${c.step + 1} (${axes[c.step]})?`, `${ch.v} = ${ch.n}. Full code ${cs.code}. ${cs.why}`); }
        document.getElementById('cs-next').hidden = false;
        const t = document.querySelector('.ag-topbar .ag-chip-stat:last-child b'); if (t) t.textContent = c.points;
    }
    pcsAdvance() { const c = this.current; if (!c || c.mode !== 'pcsb') return; c.step++; if (c.step >= 7) { c.step = 0; c.i++; } this.pcsNext(); }
    pcsFinish() {
        const c = this.current; const u = this.ui();
        const r = this.rec('pcsb'); r.plays++; r.correct += c.points; r.total += c.max; r.best = Math.max(r.best || 0, c.points);
        const xp = c.points * 2 + (c.points === c.max ? 20 : 0);
        u.awardXP(xp, 'Code Sprint: PCS builder'); window.gamesHub?.credit('code'); u.save();
        u.win('code-sprint-content', { title: c.points === c.max ? 'Seven for seven!' : 'Round complete', name: `${c.points}/${c.max} characters right`,
            rows: [`⏱ ${u.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`, this.fcRow(c)].filter(Boolean),
            actions: `<button class="ag-btn" onclick="window.codeSprint.startPcsBuild()">🔁 New cases</button><button class="ag-btn" onclick="window.codeSprint.showTable('pcschars')">🔢 7 characters</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.codeSprint.back()">Code Sprint</button>` });
    }

    // ============================================================
    // DRG LAB — MDC → severity tier → payment, one case at a time
    // ============================================================
    startDrg() {
        const u = this.ui(); const cases = window.DRG_CASES || []; if (!cases.length) return;
        this.app.switchView('code-sprint');
        const base = 5500 + 100 * Math.floor(Math.random() * 26);   // illustrative hospital base rate $5,500–$8,000
        this.current = { mode: 'drg', queue: u.shuffle(cases).slice(0, 5), i: 0, step: 0, points: 0, max: 0, start: Date.now(), locked: false, base };
        this.drgNext();
    }
    drgSteps(cs) {
        const u = this.ui(); const W = window; const fam = W.DRG_FAMILIES[cs.fam]; const c = this.current;
        const mdc = W.MDC_LIST.find(m => m.n === cs.mdc);
        const mdcOpts = u.shuffle([mdc, ...u.pick(W.MDC_LIST.filter(m => m.n !== cs.mdc), 3)]).map(m => ({ v: m.n, label: `MDC ${String(m.n).padStart(2, '0')}`, sub: m.name }));
        const tierOpts = fam.tiers.map((t, k) => ({ v: k, label: `MS-DRG ${t[0]}`, sub: `${fam.name}, ${t[1]}` }));
        const pay = Math.round(c.base * cs.w);
        const payOpts = u.shuffle([pay, Math.round(c.base * (cs.w + 0.5)), Math.round(c.base * Math.max(0.3, cs.w - 0.4)), Math.round(c.base + cs.w * 1000)].filter((v, i, a) => a.indexOf(v) === i)).map(v => ({ v, label: `$${v.toLocaleString()}` }));
        while (payOpts.length < 4) payOpts.push({ v: pay + 1000 * payOpts.length, label: `$${(pay + 1000 * payOpts.length).toLocaleString()}` });
        const flags = cs.sec.map(s => `${s[0]} ${s[1]} → ${s[3] ? 'CC excluded (' + s[3] + ')' : (s[2] || 'non-CC')}`).join(' · ');
        return [
            { q: 'Which Major Diagnostic Category?', opts: mdcOpts, right: cs.mdc, why: `The principal diagnosis (${cs.pdx}) places the case in MDC ${String(cs.mdc).padStart(2, '0')} — ${mdc.name}.` },
            { q: `Which severity tier? (${fam.tiers.length === 3 ? 'three-way split' : 'two-way split — a CC alone does not move the case up'})`, opts: tierOpts, right: cs.tier, why: `${flags}. → MS-DRG ${fam.tiers[cs.tier][0]}, ${fam.tiers[cs.tier][1]}.` },
            { q: `Payment at a base rate of $${c.base.toLocaleString()} and an illustrative relative weight of ${cs.w.toFixed(2)}?`, opts: payOpts, right: pay, why: `$${c.base.toLocaleString()} × ${cs.w.toFixed(2)} = $${pay.toLocaleString()} (before IME, DSH, outlier and other adjustments). Weights here are illustrative, not the current CMS table.` }
        ];
    }
    drgNext() {
        const c = this.current; const u = this.ui();
        if (c.i >= c.queue.length) { this.drgFinish(); return; }
        const cs = c.queue[c.i]; const steps = this.drgSteps(cs); const st = steps[c.step];
        c.locked = false; c.st = st;
        this.host().innerHTML = `
        <div class="ag-play" style="--ag-accent:#f59e0b">
            <div class="ag-topbar">
                <span class="ag-chip-stat">🏥 DRG Lab</span>
                <span class="ag-chip-stat">case <b>${c.i + 1}/${c.queue.length}</b> · step ${c.step + 1}/3</span>
                <span class="ag-chip-stat">⭐ <b>${c.points}</b>/${c.max}</span>
            </div>
            <div class="em-note">
                <span class="em-status">INPATIENT DISCHARGE</span><b>${u.esc(cs.title)}</b>
                <p><b>Principal dx:</b> ${u.esc(cs.pdx)}${cs.proc ? `<br><b>Procedure:</b> ${u.esc(cs.proc)}` : ''}<br><b>Secondary dx:</b> ${cs.sec.map(s => `${u.esc(s[0])} ${u.esc(s[1])}`).join('; ')}</p>
            </div>
            <div class="wl-meaning"><span>Step ${c.step + 1}</span><b>${u.esc(st.q)}</b></div>
            <div class="cs-options" id="cs-options">${st.opts.map((o, k) => `<button class="cs-option" data-k="${k}"><span class="cs-range">${u.esc(o.label)}</span>${o.sub ? `<span class="cs-name">${u.esc(o.sub)}</span>` : ''}</button>`).join('')}</div>
            <div class="ag-fact" id="cs-fact" hidden></div>
            <div class="ag-win-actions" id="cs-next" hidden><button class="ag-btn ag-btn-primary" onclick="window.codeSprint.drgAdvance()">Next →</button></div>
            <p class="ag-hint">Grouper order: principal diagnosis → MDC → medical or surgical → MCC / CC / none. Payment = base rate × relative weight.</p>
        </div>`;
        this.host().querySelector('#cs-options').addEventListener('click', e => { const b = e.target.closest('.cs-option'); if (b) this.drgAnswer(+b.getAttribute('data-k')); });
        window.scrollTo(0, 0);
    }
    drgAnswer(k) {
        const c = this.current; if (!c || c.mode !== 'drg' || c.locked) return; c.locked = true;
        const st = c.st; const cs = c.queue[c.i]; const ok = st.opts[k].v === st.right; const u = this.ui();
        if (ok) c.points++; c.max++;
        document.querySelectorAll('#cs-options .cs-option').forEach((b, i) => { b.disabled = true; if (st.opts[i].v === st.right) b.classList.add('ok'); else if (i === k) b.classList.add('bad'); });
        const f = document.getElementById('cs-fact'); f.hidden = false;
        f.innerHTML = `<b style="color:${ok ? '#34d399' : '#f87171'}">${ok ? 'Correct' : 'Not quite'}</b> — ${u.esc(st.why)}`;
        if (!ok && c.step < 2) this.addFlashcard(`drg:${cs.fam}:${cs.tier}:${c.step}`, `MS-DRG: ${cs.title} — principal ${cs.pdx}; secondary ${cs.sec.map(s => s[0] + ' ' + s[1]).join(', ')}. ${c.step === 0 ? 'Which MDC?' : 'Which severity tier / MS-DRG?'}`, st.why);
        document.getElementById('cs-next').hidden = false;
        const t = document.querySelector('.ag-topbar .ag-chip-stat:last-child b'); if (t) t.textContent = c.points;
    }
    drgAdvance() { const c = this.current; if (!c || c.mode !== 'drg') return; c.step++; if (c.step >= 3) { c.step = 0; c.i++; } this.drgNext(); }
    drgFinish() {
        const c = this.current; const u = this.ui();
        const r = this.rec('drg'); r.plays++; r.correct += c.points; r.total += c.max; r.best = Math.max(r.best || 0, c.points);
        const xp = c.points * 2 + (c.points === c.max ? 15 : 0);
        u.awardXP(xp, 'Code Sprint: DRG lab'); window.gamesHub?.credit('code'); u.save();
        u.win('code-sprint-content', { title: c.points === c.max ? 'Grouper-grade!' : 'Round complete', name: `${c.points}/${c.max} steps right`,
            rows: [`⏱ ${u.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`, this.fcRow(c)].filter(Boolean),
            actions: `<button class="ag-btn" onclick="window.codeSprint.startDrg()">🔁 New cases</button><button class="ag-btn" onclick="window.codeSprint.showTable('mdc')">🗂️ MDC table</button>`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.codeSprint.back()">Code Sprint</button>` });
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
        if (!ok) this.addFlashcard(q.id, `${q.kind}: ${q.prompt}`, `${q.opts[q.a].label}${q.opts[q.a].sub ? ' — ' + q.opts[q.a].sub : ''}. ${q.why}${q.cite ? ' (' + q.cite + ')' : ''}`);
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
            rows: [`⏱ ${u.fmtTime(Date.now() - c.start)}`, `⭐ +${xp} XP`, pile ? `🔁 ${pile} to review` : '🔁 pile clear', this.fcRow(c)].filter(Boolean),
            actions: `${c.key === 'review' || c.key === 'marathon' ? `<button class="ag-btn" onclick="window.codeSprint.${c.key === 'review' ? 'startReview' : 'startMarathon'}()">🔁 Again</button>` : `<button class="ag-btn" onclick="window.codeSprint.startRound('${c.key}')">🔁 New round</button>`}${pile && c.key !== 'review' ? `<button class="ag-btn" onclick="window.codeSprint.startReview()">🔁 Review pile (${pile})</button>` : ''}`,
            back: `<button class="ag-btn ag-btn-primary" onclick="window.codeSprint.back()">Code Sprint</button>`
        });
    }
}
