/* Ignite - app logic. Plain JS, no build step. State lives in localStorage ("ignite.v1"). */
(function () {
  "use strict";
  var STORE_KEY = "ignite.v1";
  var TOTAL_DAYS = 28;
  var CHAPTERS = [
    { n: 1, title: "The first three seconds", days: [1, 7], blurb: "Why starting is the hard part, and six universal ways across it." },
    { n: 2, title: "Your pattern", days: [8, 14], blurb: "Seven lessons tuned to how your brain in particular gets stuck." },
    { n: 3, title: "Building momentum", days: [15, 21], blurb: "Restarts, time boxes, bundling, borrowed company, the mid-task dip." },
    { n: 4, title: "Making it the default", days: [22, 28], blurb: "Anchors, routines, never-zero days, and your own start protocol." }
  ];

  /* ---------- state ---------- */
  var S = load();
  function fresh() {
    return { v: 1, name: "", pattern: null, quiz: null, startedOn: null, finishedOn: null,
      days: {}, maint: {}, diary: [], checkins: [], settings: { multiPerDay: false },
      ui: { screen: "welcome", tab: "today" } };
  }
  function load() {
    try { var raw = localStorage.getItem(STORE_KEY); if (raw) { var o = JSON.parse(raw); if (o && o.v === 1) { o.ui = o.ui || { screen: "welcome", tab: "today" }; o.ui.sheet = null; return o; } } } catch (e) {}
    return fresh();
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) {} }

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]; }); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dateKey(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parseKey(k) { var p = k.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function daysBetween(a, b) { return Math.round((parseKey(b) - parseKey(a)) / 86400000); }
  function fmtDate(k) { var d = parseKey(k); return d.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" }); }
  function fmtShort(k) { var d = parseKey(k); return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function hashStr(s) { var h = 0; for (var i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; } return Math.abs(h); }

  var ICON = {
    flame: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2c.5 3.5-2 5-3.5 7.2C7 11.4 6.5 13 6.5 14.5A5.5 5.5 0 0 0 12 20a5.5 5.5 0 0 0 5.5-5.5c0-2.2-1.1-3.9-2.3-5.4-.3 1.3-1 2.2-1.8 2.7.4-2.6-.2-5.9-1.4-9.8z"/></svg>',
    today: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/></svg>',
    journey: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 17l5-5 4 4 8-8"/><path d="M14 8h6v6"/></svg>',
    explore: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/></svg>',
    diary: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>'
  };

  /* ---------- content ---------- */
  function patternContent(p) {
    var g = { initiation: "IGNITE_CONTENT_INITIATION", overthinker: "IGNITE_CONTENT_OVERTHINKER", deadline: "IGNITE_CONTENT_DEADLINE", interest: "IGNITE_CONTENT_INTEREST", anxiety: "IGNITE_CONTENT_ANXIETY", perfectionism: "IGNITE_CONTENT_PERFECTIONISM" }[p];
    return (g && window[g]) || [];
  }
  function lessonForDay(n, pattern) {
    pattern = pattern || S.pattern;
    if (n >= 8 && n <= 14) {
      var pc = patternContent(pattern);
      for (var i = 0; i < pc.length; i++) if (pc[i].day === n) return pc[i];
    }
    var core = window.IGNITE_CONTENT_CORE || [];
    for (var j = 0; j < core.length; j++) if (core[j].day === n) return core[j];
    return null;
  }
  function lessonById(id) {
    var all = (window.IGNITE_CONTENT_CORE || []).slice();
    IGNITE_PATTERN_ORDER.forEach(function (p) { all = all.concat(patternContent(p)); });
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }
  function exercisePool() {
    var pool = (window.IGNITE_CONTENT_CORE || []).slice().concat(patternContent(S.pattern));
    return pool.filter(function (l) { return l.exercise; });
  }

  /* ---------- progress ---------- */
  function completedDays() { var c = 0; Object.keys(S.days).forEach(function (k) { if (S.days[k].completedOn) c++; }); return c; }
  function currentDay() { return Math.min(TOTAL_DAYS, completedDays() + 1); }
  function isFinished() { return completedDays() >= TOTAL_DAYS; }
  function completedToday() { var t = dateKey(); return Object.keys(S.days).some(function (k) { return S.days[k].completedOn === t; }); }
  function activityDays() {
    var set = {};
    Object.keys(S.days).forEach(function (k) { if (S.days[k].completedOn) set[S.days[k].completedOn] = true; });
    Object.keys(S.maint).forEach(function (k) { if (S.maint[k].done) set[k] = true; });
    return set;
  }
  function streak() {
    var act = activityDays(), d = new Date(), n = 0;
    if (!act[dateKey(d)]) d.setDate(d.getDate() - 1);
    while (act[dateKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function totalStarts() { return Object.keys(activityDays()).length; }
  function dueCheckinWeek() {
    var done = completedDays(), base = Math.floor(done / 7);
    if (isFinished() && S.finishedOn) base += Math.floor(Math.max(0, daysBetween(S.finishedOn, dateKey())) / 7);
    if (base < 1) return 0;
    var have = S.checkins.some(function (c) { return c.week === base; });
    return have ? 0 : base;
  }
  function maintToday() {
    var k = dateKey();
    if (!S.maint[k]) { var pool = exercisePool(); if (!pool.length) return null; var l = pool[hashStr(k) % pool.length]; S.maint[k] = { id: l.id, done: false }; save(); }
    return S.maint[k];
  }

  /* ---------- rendering ---------- */
  var root = document.getElementById("app");
  function render() {
    stopTimer(false);
    var html;
    switch (S.ui.screen) {
      case "welcome": html = viewWelcome(); break;
      case "quiz": html = viewQuiz(); break;
      case "results": html = viewResults(); break;
      case "profile": html = viewProfile(); break;
      case "plan": html = viewPlan(); break;
      case "name": html = viewName(); break;
      default: html = viewMain();
    }
    root.innerHTML = html;
    if (S.ui.sheet) { var sh = document.createElement("div"); sh.className = "sheet"; sh.innerHTML = viewSheet(S.ui.sheet); root.appendChild(sh); }
    document.body.classList.toggle("sheet-open", !!S.ui.sheet);
    window.scrollTo(0, S.ui.keepScroll ? window.scrollY : 0); S.ui.keepScroll = false;
    bind();
  }
  function go(screen) { S.ui.screen = screen; save(); render(); }
  function openSheet(sheet) { S.ui.sheet = sheet; render(); }
  function closeSheet() { S.ui.sheet = null; render(); }
  function toast(msg) { var t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200); }

  function brand() { return '<span class="brand"><span class="flame accent">' + ICON.flame + '</span>Ignite</span>'; }
  function segs(n, total) { var s = '<div class="progress-segs">'; for (var i = 0; i < total; i++) s += '<span class="' + (i < n ? "on" : "") + '"></span>'; return s + '</div>'; }

  /* ----- onboarding ----- */
  function viewWelcome() {
    return '<div class="screen onboard stack">' +
      '<div class="welcome-art"><span class="logo-mark accent">' + ICON.flame + '</span><h1>Ignite</h1><p class="muted">For brains that can\'t start.</p></div>' +
      '<div class="card hero stack"><h2>You don\'t need to fix the whole problem. You need to solve the first three seconds.</h2>' +
      '<p>Ignite is a 28-day program of five-minute lessons and micro-initiations: tiny daily starts, small enough to need almost no willpower, that practice the exact moment where you get stuck.</p></div>' +
      '<div class="card stack"><p class="eyebrow">How it works</p>' +
      '<p><b>1. A two-minute quiz</b> finds your starting pattern, because not every brain gets stuck the same way.</p>' +
      '<p><b>2. One lesson a day</b> explains one idea in plain language, with its sources.</p>' +
      '<p><b>3. One micro-initiation</b> on a real task from your own life. It\'s finished when you\'ve started, not when the task is done.</p></div>' +
      '<p class="notice">Ignite draws on cognitive behavioral therapy, behavioral activation and the habit research it cites. It is a self-help tool, not treatment, and it makes no promises about results. If anxiety, attention or mood are affecting your daily life, a clinician can help.</p>' +
      '<button class="btn primary block" data-act="start-quiz">Find your pattern</button>' +
      (S.quiz ? '<button class="btn ghost block" data-act="skip-to-app">Continue where I left off</button>' : '') +
      '</div>';
  }
  function viewQuiz() {
    var i = S.ui.qi || 0, q = IGNITE_QUIZ[i], ans = (S.ui.answers || {})[q.id];
    var h = '<div class="screen onboard stack"><div class="row spread"><button class="iconbtn" data-act="quiz-back" aria-label="Back">' + ICON.back + '</button><span class="small muted">' + (i + 1) + ' of ' + IGNITE_QUIZ.length + '</span></div>' +
      segs(i + 1, IGNITE_QUIZ.length) +
      '<p class="eyebrow">' + (q.type === "likert" ? "How often is this true?" : "Question " + (i + 1)) + '</p><h2>' + esc(q.text) + '</h2><div class="stack">';
    if (q.type === "scenario") {
      q.options.forEach(function (o, idx) { h += '<button class="opt' + (ans === idx ? " selected" : "") + '" data-act="answer" data-idx="' + idx + '">' + esc(o.text) + '</button>'; });
    } else {
      h += '<div class="likert">';
      IGNITE_LIKERT_LABELS.forEach(function (l, idx) { h += '<button class="opt' + (ans === idx ? " selected" : "") + '" data-act="answer" data-idx="' + idx + '">' + esc(l) + '</button>'; });
      h += '</div>';
    }
    return h + '</div></div>';
  }
  function viewResults() {
    var p = IGNITE_PATTERNS[S.pattern];
    var h = '<div class="screen onboard stack">' + segs(1, 4) +
      '<p class="eyebrow center">Your starting pattern</p><h1 class="center">' + esc(p.name) + '</h1><p class="center">' + esc(p.summary) + '</p>' +
      '<div class="two-col"><div><div class="col-head red">What tends to happen</div><div class="col-list">' + p.struggles.map(function (s) { return '<div>' + esc(s) + '</div>'; }).join("") + '</div></div>' +
      '<div><div class="col-head teal">What you\'ll practice</div><div class="col-list">' + p.practices.map(function (s) { return '<div>' + esc(s) + '</div>'; }).join("") + '</div></div></div>' +
      '<p class="notice">This is the pattern your answers matched most strongly. Most people have more than one. You can switch patterns any time in Settings, and run the pattern week again for another one.</p>' +
      '<button class="btn primary block" data-act="go" data-to="profile">Continue</button></div>';
    return h;
  }
  function scoreRows() {
    var sc = S.quiz.scores, h = '';
    S.quiz.ranked.forEach(function (p) {
      var b = igniteBand(sc[p]);
      h += '<div class="score-row"><span class="name">' + esc(IGNITE_PATTERNS[p].short) + ' <span class="chip ' + b.tone + '">' + b.label + '</span></span><span class="pct">' + sc[p] + '%</span><div class="bar"><span style="width:' + sc[p] + '%"></span></div></div>';
    });
    return h;
  }
  function viewProfile() {
    return '<div class="screen onboard stack">' + segs(2, 4) +
      '<h1 class="center">Your profile</h1><p class="center muted">How strongly each pattern showed up in your answers.</p>' +
      '<div class="card">' + scoreRows() + '</div>' +
      '<p class="notice">How this is calculated: each answer adds points to one or two patterns. A pattern\'s score is its points divided by the maximum it could have received (20), shown as a percentage. It reflects only today\'s answers. It is not a diagnosis or a clinical assessment.</p>' +
      '<button class="btn primary block" data-act="go" data-to="plan">Continue</button></div>';
  }
  function viewPlan() {
    var p = IGNITE_PATTERNS[S.pattern];
    var h = '<div class="screen onboard stack">' + segs(3, 4) + '<h1 class="center">Your 28-day plan</h1><p class="center muted">One five-minute lesson and one micro-initiation a day. Nothing else.</p><div class="chapters">';
    CHAPTERS.forEach(function (c) {
      h += '<div class="chapter"><div class="row spread"><b>' + c.n + '. ' + esc(c.title) + '</b><span class="chip">Days ' + c.days[0] + '-' + c.days[1] + '</span></div><p class="small muted">' + esc(c.n === 2 ? "Seven lessons for " + p.name.toLowerCase() + ": " + p.practices.join(", ").toLowerCase() + "." : c.blurb) + '</p></div>';
    });
    h += '</div><div class="card tint stack"><p class="eyebrow">Also included</p><p class="small">A weekly check-in every seven days, a diary for your reflections, a journey view with your streak and calendar, and short articles on the research behind the method.</p></div>' +
      '<p class="notice">An honest note on timelines: in Lally and colleagues\' 2010 study, new daily habits took a median of about 66 days to feel automatic, with a wide range between people. Twenty-eight days is a strong start, not a finish. After day 28 the app keeps going with one short daily start and your check-ins.</p>' +
      '<button class="btn primary block" data-act="go" data-to="name">Continue</button></div>';
    return h;
  }
  function viewName() {
    return '<div class="screen onboard stack">' + segs(4, 4) + '<h1 class="center">What should we call you?</h1>' +
      '<input id="name-input" type="text" maxlength="30" placeholder="Your first name" value="' + esc(S.name) + '" autocomplete="given-name">' +
      '<p class="small muted">Everything stays on this device. Nothing is sent anywhere.</p>' +
      '<button class="btn primary block" data-act="finish-onboarding">Start day 1</button></div>';
  }

  /* ----- main app ----- */
  function viewMain() {
    var tab = S.ui.tab || "today", body;
    if (tab === "today") body = viewToday(); else if (tab === "journey") body = viewJourney(); else if (tab === "explore") body = viewExplore(); else body = viewDiary();
    var tabs = [["today", "Today", ICON.today], ["journey", "Journey", ICON.journey], ["explore", "Explore", ICON.explore], ["diary", "Diary", ICON.diary]];
    return '<div class="screen"><div class="topbar">' + brand() + '<button class="iconbtn" data-act="settings" aria-label="Settings">' + ICON.gear + '</button></div>' + body + '</div>' +
      '<nav class="tabbar"><div class="inner">' + tabs.map(function (t) { return '<button class="tab' + (tab === t[0] ? " active" : "") + '" data-act="tab" data-tab="' + t[0] + '">' + t[2] + '<span>' + t[1] + '</span></button>'; }).join("") + '</div></nav>';
  }
  function greeting() { var h = new Date().getHours(); var g = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; return g + (S.name ? ", " + esc(S.name) : ""); }
  function viewToday() {
    var h = '<div class="stack">';
    var st = streak();
    h += '<div class="row spread"><h1>' + greeting() + '</h1><span class="chip ' + (st > 0 ? "accent" : "") + '">' + ICON.flame.replace("<svg", '<svg style="width:14px;height:14px"') + ' ' + st + '-day streak</span></div>';
    var due = dueCheckinWeek();
    if (due) h += '<button class="card warn-tint stack" style="text-align:left;cursor:pointer;border:0" data-act="checkin"><p class="eyebrow">Weekly check-in due</p><b>Week ' + due + ' check-in</b><p class="small">Four quick questions. About a minute.</p></button>';

    if (isFinished()) {
      var m = maintToday(), ml = m ? lessonById(m.id) : null;
      h += '<div class="card hero stack"><p class="eyebrow">Maintenance mode</p><h2>' + (m && m.done ? "Started. That\'s today." : "One small start today") + '</h2><p class="small">You finished the 28 days. Each day now brings one micro-initiation from your program, and a check-in every week.</p></div>';
      if (ml) h += '<div class="card stack"><p class="eyebrow">Today\'s micro-initiation</p><h3>' + esc(ml.exercise.title) + '</h3><p class="small muted">From day ' + ml.day + ': ' + esc(ml.title) + '</p>' +
        (m.done ? '<span class="chip done">Done today</span>' : '<button class="btn primary" data-act="open-lesson" data-id="' + ml.id + '" data-mode="maint">Start it</button>') + '</div>';
    } else {
      var n = currentDay(), L = lessonForDay(n), D = S.days[n] || {};
      var doneToday = completedToday(), blocked = doneToday && !S.settings.multiPerDay && !D.completedOn;
      var chap = CHAPTERS.filter(function (c) { return n >= c.days[0] && n <= c.days[1]; })[0];
      h += '<div class="card hero stack"><div class="row spread"><span class="eyebrow">Day ' + n + ' of ' + TOTAL_DAYS + '</span><span class="chip">Chapter ' + chap.n + '</span></div><div class="bar"><span style="width:' + Math.round(completedDays() / TOTAL_DAYS * 100) + '%"></span></div>' +
        '<p class="small">Today\'s progress: <b>' + ((D.read ? 1 : 0) + (D.exercise ? 1 : 0) + (D.reflect ? 1 : 0)) + ' of 3</b></p></div>';
      if (blocked) {
        var nextL = L;
        h += '<div class="card done-tint stack"><p class="eyebrow">Done for today</p><h3>You started something today. That\'s the whole job.</h3><p class="small">Tomorrow: day ' + n + ', ' + esc(nextL ? nextL.title : "") + '. If you really want to do more than one lesson a day, you can turn that on in Settings.</p></div>';
      } else if (L) {
        h += '<div class="card stack"><p class="eyebrow">Today\'s lesson</p><h2>' + esc(L.title) + '</h2><p class="muted">' + esc(L.tagline) + '</p><div class="task-list">' +
          taskItem("Read the lesson", "About 5 minutes", D.read, "open-lesson", L.id, "read") +
          taskItem("Micro-initiation: " + L.exercise.title, L.exercise.minutes + " minutes, on a real task", D.exercise, "open-lesson", L.id, "exercise") +
          taskItem("Reflect", "One question, one minute", D.reflect, "open-lesson", L.id, "reflect") +
          '</div></div>';
      }
    }
    h += '<div class="card tint stack"><p class="eyebrow">Your pattern</p><div class="row spread"><b>' + esc(IGNITE_PATTERNS[S.pattern].name) + '</b><button class="btn ghost sm" data-act="settings">Change</button></div></div>';
    return h + '</div>';
  }
  function taskItem(title, sub, done, act, id, step) {
    return '<button class="task-item' + (done ? " done" : "") + '" data-act="' + act + '" data-id="' + id + '" data-step="' + step + '"><span class="tick">' + (done ? ICON.check : "") + '</span><span style="min-width:0"><b>' + esc(title) + '</b><br><span class="small muted">' + esc(sub) + '</span></span></button>';
  }

  function viewJourney() {
    var done = completedDays(), pct = done / TOTAL_DAYS, r = 46, C = 2 * Math.PI * r;
    var h = '<div class="stack"><h1>Your journey</h1>';
    h += '<div class="card hero ringwrap"><svg class="bigring" viewBox="0 0 110 110" aria-label="' + done + ' of 28 days complete"><circle class="track" cx="55" cy="55" r="' + r + '"/><circle class="fill" cx="55" cy="55" r="' + r + '" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + (C * (1 - pct)).toFixed(1) + '" transform="rotate(-90 55 55)"/><text x="55" y="63" text-anchor="middle">' + done + '</text></svg>' +
      '<div class="stack" style="gap:6px"><b>' + done + ' of ' + TOTAL_DAYS + ' days</b><p class="small muted">' + (isFinished() ? "Program complete. Maintenance mode is on." : "Next: day " + currentDay() + ", " + esc((lessonForDay(currentDay()) || {}).title || "")) + '</p></div></div>';
    h += '<div class="stat-grid"><div class="stat"><b>' + streak() + '</b><span class="tiny muted">day streak</span></div><div class="stat"><b>' + totalStarts() + '</b><span class="tiny muted">days with a start</span></div><div class="stat"><b>' + S.diary.length + '</b><span class="tiny muted">diary entries</span></div></div>';
    h += '<p class="eyebrow">Chapters</p><div class="chapters">';
    CHAPTERS.forEach(function (c) {
      var dots = ''; for (var d = c.days[0]; d <= c.days[1]; d++) { var st = (S.days[d] && S.days[d].completedOn) ? "done" : (d === currentDay() && !isFinished() ? "now" : ""); dots += '<span class="' + st + '"></span>'; }
      var cnt = 0; for (var k = c.days[0]; k <= c.days[1]; k++) if (S.days[k] && S.days[k].completedOn) cnt++;
      h += '<div class="chapter"><div class="row spread"><b>' + c.n + '. ' + esc(c.title) + '</b><span class="small muted">' + cnt + ' of 7</span></div><div class="dots">' + dots + '</div></div>';
    });
    h += '</div>';
    h += '<p class="eyebrow">Activity</p><div class="card">' + calendar() + '</div>';
    if (S.checkins.length) {
      h += '<p class="eyebrow">Weekly check-ins</p><div class="card checkins"><div class="checkin-row tiny muted"><span></span><span>Started things</span><span>Ease of starting</span><span>Calm</span></div>';
      S.checkins.slice().sort(function (a, b) { return a.week - b.week; }).forEach(function (c) {
        h += '<div class="checkin-row"><span>Wk ' + c.week + '</span>' + ["started", "ease", "calm"].map(function (k) { return '<div class="bar done"><span style="width:' + (c[k] * 20) + '%"></span></div>'; }).join("") + '</div>';
        if (c.note) h += '<p class="tiny muted" style="padding-left:5ch">' + esc(c.note) + '</p>';
      });
      h += '</div>';
    }
    if (S.quiz) h += '<p class="eyebrow">Pattern profile (' + fmtShort(S.quiz.takenOn) + ')</p><div class="card">' + scoreRows() + '</div><button class="btn secondary block" data-act="retake">Retake the quiz</button>';
    return h + '</div>';
  }
  function calendar() {
    var act = activityDays(), now = new Date(), y = now.getFullYear(), m = now.getMonth();
    var first = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate(), offset = (first.getDay() + 6) % 7; /* Monday first */
    var h = '<p class="small" style="margin-bottom:8px"><b>' + first.toLocaleDateString(undefined, { month: "long", year: "numeric" }) + '</b></p><div class="cal">';
    ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].forEach(function (d) { h += '<div class="dow">' + d + '</div>'; });
    for (var i = 0; i < offset; i++) h += '<div class="day blank"></div>';
    for (var d = 1; d <= days; d++) { var k = y + "-" + pad(m + 1) + "-" + pad(d); h += '<div class="day' + (act[k] ? " on" : "") + (k === dateKey() ? " today" : "") + '">' + d + '</div>'; }
    return h + '</div>';
  }

  function viewExplore() {
    var h = '<div class="stack"><h1>Explore</h1><p class="eyebrow">Articles</p><div class="list">';
    (window.IGNITE_ARTICLES || []).forEach(function (a) { h += '<button class="item" data-act="open-article" data-id="' + a.id + '"><span class="t">' + esc(a.title) + '</span><span class="small muted">' + esc(a.summary) + '</span><span class="tiny muted">' + a.readMinutes + ' min read</span></button>'; });
    h += '</div><p class="eyebrow">All lessons</p>';
    CHAPTERS.forEach(function (c) {
      h += '<p class="small"><b>' + c.n + '. ' + esc(c.title) + '</b></p><div class="list">';
      for (var d = c.days[0]; d <= c.days[1]; d++) {
        var L = lessonForDay(d), unlocked = isFinished() || d <= currentDay();
        if (!L) continue;
        h += '<button class="item' + (unlocked ? "" : " locked") + '" ' + (unlocked ? 'data-act="open-lesson" data-id="' + L.id + '" data-mode="browse"' : 'disabled') + '><span class="row spread"><span class="t">Day ' + d + ': ' + esc(L.title) + '</span>' + (unlocked ? (S.days[d] && S.days[d].completedOn ? '<span class="chip done">Done</span>' : '') : '<span class="chip">' + ICON.lock.replace("<svg", '<svg style="width:12px;height:12px"') + ' Locked</span>') + '</span><span class="small muted">' + esc(L.tagline) + '</span></button>';
      }
      h += '</div>';
    });
    h += '<p class="eyebrow">Sources</p><div class="card sources">' + Object.keys(IGNITE_SOURCES).map(function (k) { var s = IGNITE_SOURCES[k]; return '<p>' + esc(s.cite) + (s.url ? ' <a href="' + esc(s.url) + '" target="_blank" rel="noopener">Link</a>' : '') + '</p>'; }).join("") + '</div>';
    return h + '</div>';
  }

  function viewDiary() {
    var h = '<div class="stack"><h1>Diary</h1><div class="card stack"><input id="diary-title" type="text" placeholder="Title (optional)" maxlength="80"><textarea id="diary-body" placeholder="Write a few notes. What did you start today? What got in the way?"></textarea><button class="btn primary" data-act="diary-save">Save to diary</button></div>';
    if (!S.diary.length) h += '<p class="notice">Your reflections after each micro-initiation land here automatically, alongside anything you write yourself.</p>';
    var entries = S.diary.slice().reverse(), lastDate = null;
    entries.forEach(function (e) {
      if (e.date !== lastDate) { h += '<p class="eyebrow">' + esc(fmtDate(e.date)) + '</p>'; lastDate = e.date; }
      h += '<div class="entry"><div class="meta"><span class="row" style="gap:6px">' + (e.kind === "reflection" ? '<span class="chip accent">Day ' + e.day + ' reflection</span>' : (e.kind === "checkin" ? '<span class="chip">Week ' + e.week + ' check-in</span>' : '')) + (e.title ? '<b>' + esc(e.title) + '</b>' : '') + '</span><button class="del" data-act="diary-del" data-id="' + e.id + '">Delete</button></div>' + (e.prompt ? '<p class="small muted">' + esc(e.prompt) + '</p>' : '') + '<p class="body">' + esc(e.body) + '</p>' + (e.mood ? '<span class="tiny muted">Starting felt: ' + esc(MOODS[e.mood - 1]) + '</span>' : '') + '</div>';
    });
    return h + '</div>';
  }
  var MOODS = ["Heavy", "Hard", "Okay", "Lighter", "Easy"];

  /* ----- sheets ----- */
  function sheetTop(title, act) { return '<div class="topbar"><button class="iconbtn" data-act="' + (act || "close-sheet") + '" aria-label="Close">' + ICON.back + '</button><span class="small muted">' + esc(title) + '</span><span style="width:40px"></span></div>'; }
  function viewSheet(sh) {
    if (sh.type === "lesson") return viewLessonFlow(sh);
    if (sh.type === "article") return viewArticle(sh);
    if (sh.type === "settings") return viewSettings();
    if (sh.type === "checkin") return viewCheckin(sh);
    return '';
  }
  function sourcesBlock(keys) {
    if (!keys || !keys.length) return '';
    return '<div class="sources"><p class="eyebrow">Sources cited</p>' + keys.map(function (k) { var s = IGNITE_SOURCES[k]; if (!s) return ''; return '<p>' + esc(s.cite) + (s.url ? ' <a href="' + esc(s.url) + '" target="_blank" rel="noopener">Open</a>' : '') + '</p>'; }).join("") + '</div>';
  }
  function viewLessonFlow(sh) {
    var L = lessonById(sh.id); if (!L) return '<div class="inner">' + sheetTop("") + '<p>Lesson not found.</p></div>';
    var step = sh.step || "read", mode = sh.mode || "day", D = (mode === "day" && S.days[L.day]) || {};
    var h = '<div class="inner reader stack">' + sheetTop("Day " + L.day + (mode === "browse" ? " (reading)" : mode === "maint" ? " (maintenance)" : ""));
    if (step === "read") {
      h += '<p class="eyebrow">Lesson</p><h1>' + esc(L.title) + '</h1><p class="muted">' + esc(L.tagline) + '</p><div class="lesson-text">' + L.lesson.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("") + '</div>' +
        '<div class="keyidea">' + esc(L.keyIdea) + '</div>' + sourcesBlock(L.sources) +
        (mode === "browse" ? '<button class="btn secondary block" data-act="lesson-step" data-step="exercise">See the micro-initiation</button>' : '<button class="btn primary block" data-act="lesson-read-done">' + (D.exercise ? "Back to today" : "I\'ve read it. On to the micro-initiation") + '</button>');
    } else if (step === "exercise") {
      var ex = L.exercise, secs = ex.minutes * 60, stepsDone = sh.stepsDone || [];
      h += '<p class="eyebrow">Micro-initiation, ' + ex.minutes + ' min</p><h1>' + esc(ex.title) + '</h1><p>' + esc(ex.intro) + '</p>' +
        '<label class="small muted" for="task-input">The real task you\'ll use (optional)</label><input id="task-input" type="text" maxlength="120" placeholder="e.g. email the landlord" value="' + esc(sh.task || D.task || "") + '">' +
        '<div class="steps">' + ex.steps.map(function (s, i) { return '<button class="step' + (stepsDone[i] ? " done" : "") + '" data-act="toggle-step" data-i="' + i + '"><span class="num">' + (stepsDone[i] ? ICON.check : (i + 1)) + '</span><span class="txt">' + esc(s) + '</span></button>'; }).join("") + '</div>' +
        '<div class="card tint timer"><svg class="ring" id="ring" viewBox="0 0 100 100"><circle class="track" cx="50" cy="50" r="44"/><circle class="fill" id="ring-fill" cx="50" cy="50" r="44" stroke-dasharray="276.5" stroke-dashoffset="0" transform="rotate(-90 50 50)"/></svg><div class="clock" id="clock">' + pad(Math.floor(secs / 60)) + ':' + pad(secs % 60) + '</div><div class="row"><button class="btn primary sm" id="timer-btn" data-act="timer-toggle" data-secs="' + secs + '">Start timer</button><button class="btn ghost sm" data-act="timer-reset" data-secs="' + secs + '">Reset</button></div></div>' +
        '<div class="card done-tint stack"><p class="eyebrow">Done means</p><p>' + esc(ex.done) + '</p></div>' +
        (mode === "browse" ? '<button class="btn secondary block" data-act="lesson-step" data-step="read">Back to the lesson</button>' : '<button class="btn done block" data-act="exercise-done" data-mode="' + mode + '">I started. Mark it done</button>');
    } else if (step === "reflect") {
      h += '<p class="eyebrow">Reflect</p><h1>One minute, one question</h1><p class="keyidea">' + esc(L.reflect) + '</p><textarea id="reflect-input" placeholder="A sentence or two is plenty.">' + esc(sh.reflectDraft || "") + '</textarea>' +
        '<p class="small muted">How did starting feel?</p><div class="mood">' + MOODS.map(function (m, i) { return '<button data-act="mood" data-m="' + (i + 1) + '" class="' + (sh.mood === i + 1 ? "selected" : "") + '"><span class="dot"></span>' + m + '</button>'; }).join("") + '</div>' +
        '<button class="btn primary block" data-act="reflect-save">Save and finish day ' + L.day + '</button><button class="btn ghost block" data-act="reflect-skip">Skip for today</button>';
    } else if (step === "done") {
      var fin = isFinished();
      h += '<div class="celebrate"><span class="flame-big accent">' + ICON.flame + '</span><h1>' + (fin && L.day === TOTAL_DAYS ? "Twenty-eight starts." : "Day " + L.day + " started.") + '</h1><p class="muted">' + (fin && L.day === TOTAL_DAYS ? "You finished the program. From tomorrow, maintenance mode gives you one small start a day." : "The exercise was finished the moment you began. Your streak is " + streak() + (streak() === 1 ? " day." : " days.")) + '</p>' +
        '<button class="btn primary" data-act="close-sheet">Back to today</button></div>';
    }
    return h + '</div>';
  }
  function viewArticle(sh) {
    var a = (window.IGNITE_ARTICLES || []).filter(function (x) { return x.id === sh.id; })[0]; if (!a) return '<div class="inner">' + sheetTop("") + '</div>';
    return '<div class="inner reader stack">' + sheetTop(a.readMinutes + " min read") + '<h1>' + esc(a.title) + '</h1><p class="muted">' + esc(a.summary) + '</p><div class="lesson-text">' + a.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("") + '</div><div class="card done-tint stack"><p class="eyebrow">Try this</p><p>' + esc(a.tryThis) + '</p></div>' + sourcesBlock(a.sources) + '</div>';
  }
  function viewSettings() {
    var h = '<div class="inner stack">' + sheetTop("Settings") + '<h1>Settings</h1>' +
      '<div class="card stack"><label class="small muted" for="set-name">Your name</label><input id="set-name" type="text" maxlength="30" value="' + esc(S.name) + '">' +
      '<label class="small muted" for="set-pattern">Pattern (chapter 2 lessons follow this)</label><select id="set-pattern">' + IGNITE_PATTERN_ORDER.map(function (p) { return '<option value="' + p + '"' + (p === S.pattern ? " selected" : "") + '>' + esc(IGNITE_PATTERNS[p].name) + '</option>'; }).join("") + '</select>' +
      '<label class="row" style="gap:10px"><input type="checkbox" id="set-multi" style="width:auto"' + (S.settings.multiPerDay ? " checked" : "") + '> <span class="small">Allow more than one lesson per day (off by default: one start a day is the method)</span></label>' +
      '<button class="btn primary" data-act="settings-save">Save</button></div>' +
      '<div class="card stack"><p class="eyebrow">Your data</p><p class="small muted">Everything is stored only in this browser. Export a copy to move it to another device or keep a backup.</p><div class="row"><button class="btn secondary sm" data-act="export-copy">Copy backup to clipboard</button>' + (window.IGNITE_NO_SW ? '' : '<a class="btn secondary sm" id="export-link" href="#" download="ignite-backup.json">Download backup</a>') + '</div>' +
      '<textarea id="import-box" placeholder="Paste a backup here to restore it"></textarea><button class="btn secondary sm" data-act="import">Restore from pasted backup</button></div>' +
      '<div class="card stack"><p class="eyebrow">Start over</p><p class="small muted">Erases your quiz, progress, diary and check-ins on this device.</p>' + (S.ui.confirmReset ? '<div class="row"><button class="btn primary sm" data-act="reset-yes">Yes, erase everything</button><button class="btn ghost sm" data-act="reset-no">Cancel</button></div>' : '<button class="btn secondary sm" data-act="reset-ask">Reset the app</button>') + '</div>' +
      '<p class="tiny muted">Ignite is a self-help tool built on cited research. It is not medical or psychological treatment and makes no promises about outcomes. If you are struggling, a clinician can help.</p></div>';
    return h;
  }
  function viewCheckin(sh) {
    var w = sh.week, a = sh.a || {};
    function scale(key, label, lo, hi) {
      var h = '<div class="stack" style="gap:6px"><b>' + label + '</b><div class="likert">';
      for (var i = 1; i <= 5; i++) h += '<button class="opt' + (a[key] === i ? " selected" : "") + '" data-act="ci-answer" data-key="' + key + '" data-v="' + i + '">' + i + '</button>';
      return h + '</div><div class="row spread tiny muted"><span>' + lo + '</span><span>' + hi + '</span></div></div>';
    }
    return '<div class="inner stack">' + sheetTop("Week " + w) + '<h1>Week ' + w + ' check-in</h1><p class="muted">Looking back over the last seven days.</p>' +
      scale("started", "How often did you start things you had been avoiding?", "Rarely", "Most days") +
      scale("ease", "How hard was starting, on average?", "Very hard", "Easy") +
      scale("calm", "How calm did you feel about your tasks?", "Not at all", "Very") +
      '<textarea id="ci-note" placeholder="Anything worth remembering from this week? (optional)">' + esc(a.note || "") + '</textarea>' +
      '<button class="btn primary block" data-act="ci-save" ' + (a.started && a.ease && a.calm ? "" : "disabled") + '>Save check-in</button></div>';
  }

  /* ---------- timer ---------- */
  var T = { iv: null, left: 0, total: 0, running: false };
  function stopTimer(keep) { if (T.iv) clearInterval(T.iv); T.iv = null; T.running = false; if (!keep) { T.left = 0; T.total = 0; } }
  function drawTimer() {
    var c = document.getElementById("clock"), f = document.getElementById("ring-fill"), b = document.getElementById("timer-btn");
    if (c) c.textContent = pad(Math.floor(T.left / 60)) + ":" + pad(T.left % 60);
    if (f && T.total) f.setAttribute("stroke-dashoffset", (276.5 * (1 - T.left / T.total)).toFixed(1));
    if (b) b.textContent = T.running ? "Pause" : (T.left > 0 && T.left < T.total ? "Resume" : "Start timer");
  }
  function beep() {
    try { var ctx = new (window.AudioContext || window.webkitAudioContext)(); var o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = 660; g.gain.value = 0.08; o.start(); setTimeout(function () { o.frequency.value = 880; }, 180); setTimeout(function () { o.stop(); ctx.close(); }, 420); } catch (e) {}
    try { if (navigator.vibrate) navigator.vibrate([120, 80, 120]); } catch (e) {}
  }
  function timerToggle(secs) {
    if (T.running) { stopTimer(true); drawTimer(); return; }
    if (!T.total || T.left <= 0) { T.total = secs; T.left = secs; }
    T.running = true; drawTimer();
    T.iv = setInterval(function () {
      T.left--; if (T.left <= 0) { T.left = 0; stopTimer(true); drawTimer(); var r = document.getElementById("ring"); if (r) r.classList.add("done"); beep(); toast("Time. If you started, you\'re done."); return; }
      drawTimer();
    }, 1000);
  }

  /* ---------- actions ---------- */
  function completeExercise(L, mode) {
    var today = dateKey();
    if (mode === "maint") { var m = maintToday(); if (m) m.done = true; save(); return; }
    var D = S.days[L.day] || (S.days[L.day] = { lessonId: L.id });
    D.exercise = true; D.read = true;
    if (!D.completedOn) D.completedOn = today;
    if (!S.startedOn) S.startedOn = today;
    if (isFinished() && !S.finishedOn) S.finishedOn = today;
    save();
  }
  function bind() {
    root.onclick = function (ev) {
      var el = ev.target.closest("[data-act]"); if (!el) return;
      var act = el.getAttribute("data-act"), sh = S.ui.sheet;
      switch (act) {
        case "start-quiz": S.ui.qi = 0; S.ui.answers = {}; go("quiz"); break;
        case "skip-to-app": go("app"); break;
        case "quiz-back": if ((S.ui.qi || 0) > 0) { S.ui.qi--; render(); } else go("welcome"); break;
        case "answer": {
          var q = IGNITE_QUIZ[S.ui.qi || 0]; S.ui.answers[q.id] = +el.getAttribute("data-idx");
          if ((S.ui.qi || 0) < IGNITE_QUIZ.length - 1) { S.ui.qi++; save(); render(); }
          else { var r = igniteScore(S.ui.answers); var wasNew = !S.quiz; S.quiz = { answers: S.ui.answers, scores: r.scores, ranked: r.ranked, takenOn: dateKey() }; S.pattern = r.top; save(); go(wasNew ? "results" : "results"); }
          break; }
        case "go": go(el.getAttribute("data-to")); break;
        case "finish-onboarding": { var inp = document.getElementById("name-input"); S.name = (inp && inp.value.trim()) || ""; if (!S.startedOn) S.startedOn = dateKey(); S.ui.tab = "today"; go("app"); break; }
        case "tab": S.ui.tab = el.getAttribute("data-tab"); save(); render(); break;
        case "settings": openSheet({ type: "settings" }); break;
        case "close-sheet": S.ui.confirmReset = false; closeSheet(); break;
        case "open-lesson": {
          var id = el.getAttribute("data-id"), mode = el.getAttribute("data-mode") || "day", step = el.getAttribute("data-step") || "read", L = lessonById(id);
          if (mode === "maint") step = "exercise";
          if (mode === "day" && L) { var D = S.days[L.day] || {}; if (step === "read" && D.read && !D.exercise) step = "exercise"; }
          openSheet({ type: "lesson", id: id, mode: mode, step: step, stepsDone: [] }); break; }
        case "lesson-step": sh.step = el.getAttribute("data-step"); S.ui.keepScroll = false; render(); break;
        case "lesson-read-done": { var L2 = lessonById(sh.id); var D2 = S.days[L2.day] || (S.days[L2.day] = { lessonId: L2.id }); D2.read = true; save(); if (D2.exercise) closeSheet(); else { sh.step = "exercise"; render(); } break; }
        case "toggle-step": { var i = +el.getAttribute("data-i"); sh.stepsDone = sh.stepsDone || []; sh.stepsDone[i] = !sh.stepsDone[i]; var ti = document.getElementById("task-input"); if (ti) sh.task = ti.value; S.ui.keepScroll = true; stopTimer(true); var left = T.left, total = T.total, running = T.running; render(); T.left = left; T.total = total; if (running) timerToggle(total); else drawTimer(); break; }
        case "timer-toggle": timerToggle(+el.getAttribute("data-secs")); break;
        case "timer-reset": stopTimer(false); T.total = +el.getAttribute("data-secs"); T.left = T.total; drawTimer(); var rg = document.getElementById("ring"); if (rg) rg.classList.remove("done"); break;
        case "exercise-done": {
          var L3 = lessonById(sh.id), md = el.getAttribute("data-mode"); var ti2 = document.getElementById("task-input");
          if (md === "day") { var D3 = S.days[L3.day] || (S.days[L3.day] = { lessonId: L3.id }); if (ti2) D3.task = ti2.value.trim(); }
          completeExercise(L3, md); stopTimer(false);
          if (md === "maint") { sh.step = "done"; } else { sh.step = "reflect"; }
          render(); break; }
        case "mood": { var ri = document.getElementById("reflect-input"); if (ri) sh.reflectDraft = ri.value; sh.mood = +el.getAttribute("data-m"); S.ui.keepScroll = true; render(); break; }
        case "reflect-save": {
          var L4 = lessonById(sh.id), ri2 = document.getElementById("reflect-input"), txt = ri2 ? ri2.value.trim() : "";
          var D4 = S.days[L4.day] || (S.days[L4.day] = { lessonId: L4.id }); D4.reflect = true; if (sh.mood) D4.mood = sh.mood;
          if (txt || sh.mood) S.diary.push({ id: uid(), date: dateKey(), kind: "reflection", day: L4.day, prompt: L4.reflect, body: txt, mood: sh.mood || 0 });
          save(); sh.step = "done"; render(); break; }
        case "reflect-skip": sh.step = "done"; render(); break;
        case "open-article": openSheet({ type: "article", id: el.getAttribute("data-id") }); break;
        case "checkin": openSheet({ type: "checkin", week: dueCheckinWeek(), a: {} }); break;
        case "ci-answer": { sh.a[el.getAttribute("data-key")] = +el.getAttribute("data-v"); var nb = document.getElementById("ci-note"); if (nb) sh.a.note = nb.value; S.ui.keepScroll = true; render(); break; }
        case "ci-save": {
          var nb2 = document.getElementById("ci-note"), note = nb2 ? nb2.value.trim() : "";
          S.checkins.push({ week: sh.week, date: dateKey(), started: sh.a.started, ease: sh.a.ease, calm: sh.a.calm, note: note });
          if (note) S.diary.push({ id: uid(), date: dateKey(), kind: "checkin", week: sh.week, body: note });
          save(); closeSheet(); toast("Check-in saved."); break; }
        case "diary-save": {
          var tb = document.getElementById("diary-title"), bb = document.getElementById("diary-body"); var body = bb ? bb.value.trim() : "";
          if (!body) { toast("Write something first."); break; }
          S.diary.push({ id: uid(), date: dateKey(), kind: "entry", title: tb ? tb.value.trim() : "", body: body }); save(); render(); toast("Saved."); break; }
        case "diary-del": { var did = el.getAttribute("data-id"); S.diary = S.diary.filter(function (e) { return e.id !== did; }); save(); S.ui.keepScroll = true; render(); break; }
        case "settings-save": {
          var sn = document.getElementById("set-name"), sp = document.getElementById("set-pattern"), sm = document.getElementById("set-multi");
          S.name = sn.value.trim(); S.pattern = sp.value; S.settings.multiPerDay = !!sm.checked; save(); closeSheet(); toast("Saved."); break; }
        case "export-copy": {
          var json = JSON.stringify(S);
          var fallback = function () { var ta = document.createElement("textarea"); ta.value = json; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); toast("Copied."); } catch (e) { toast("Select and copy the text manually."); } ta.remove(); };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json).then(function () { toast("Backup copied."); }, fallback); else fallback();
          break; }
        case "import": {
          try { var o = JSON.parse(document.getElementById("import-box").value); if (!o || o.v !== 1 || !o.days) throw new Error("bad"); o.ui = { screen: o.quiz ? "app" : "welcome", tab: "today" }; S = o; save(); render(); toast("Restored."); } catch (e) { toast("That doesn\'t look like an Ignite backup."); }
          break; }
        case "reset-ask": S.ui.confirmReset = true; render(); break;
        case "reset-no": S.ui.confirmReset = false; render(); break;
        case "reset-yes": S = fresh(); save(); render(); break;
        case "retake": S.ui.qi = 0; S.ui.answers = {}; go("quiz"); break;
      }
    };
    var link = document.getElementById("export-link");
    if (link) { try { link.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: "application/json" })); } catch (e) {} }
  }

  /* ---------- boot ---------- */
  if (S.ui.screen === "app" && !S.pattern) S.ui.screen = "welcome";
  render();
  try { if (!window.IGNITE_NO_SW && "serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(function () {}); } catch (e) {}
})();
