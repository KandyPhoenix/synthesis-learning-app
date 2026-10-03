/* Ignite - pattern quiz, pattern descriptions and scoring. */
window.IGNITE_PATTERNS = {
  initiation: {
    name: "The Initiation-Blocked Brain", short: "Initiation-Blocked", noun: "initiation",
    summary: "You know exactly what needs doing. You want to do it. You cannot make yourself begin. The gap between intention and action feels physical, like a wall you can see through but can't cross.",
    struggles: ["Knowing the step and not taking it", "Hours lost before the first move", "Restarting after any interruption", "Frustration aimed at yourself"],
    practices: ["Shrinking the first step", "If-then start plans", "Start rituals and cues", "Restart drills"]
  },
  overthinker: {
    name: "The Overthinker's Spiral", short: "Overthinker", noun: "overthinking",
    summary: "You think about the task so thoroughly, for so long, that the thinking replaces the doing. By the time you've processed every way to start, the energy is gone. Your brain mistakes planning for progress.",
    struggles: ["Planning that never becomes doing", "Energy spent before you begin", "Small decisions that stall everything", "Mental load you carry all day"],
    practices: ["The produced-anything test", "Time-boxed planning", "Draft zero", "Sixty-second decisions"]
  },
  deadline: {
    name: "The Deadline Brain", short: "Deadline-Powered", noun: "urgency dependence",
    summary: "You function brilliantly under external pressure and are nearly non-functional without it. Exceptional work at 11pm before a deadline, nothing for three weeks before that. The signal your brain needs is urgency.",
    struggles: ["Nothing happens until it's urgent", "Stress and lost sleep as the price", "No slack when something goes wrong", "Self-set deadlines that don't bite"],
    practices: ["Deadlines with real weight", "Checkpoints with deliverables", "Timers and sprints", "A borrowed audience"]
  },
  interest: {
    name: "The Interest Filter", short: "Interest-Filtered", noun: "interest dependence",
    summary: "You can hyperfocus for six hours on something that interests you and cannot spend six minutes on something that doesn't, even when the second thing matters more. Your attention isn't broken. It is very efficient at ignoring what it finds unrewarding.",
    struggles: ["Dull but important tasks pile up", "Hyperfocus that eats the day", "Guilt about what you can and can't focus on", "Orders your attention refuses"],
    practices: ["Adding interest, choice or challenge", "Temptation bundling", "Games and personal bests", "Using the edges of a focus wave"]
  },
  anxiety: {
    name: "The Anxiety Avoider", short: "Anxiety-Avoidant", noun: "avoidance",
    summary: "The task feels fine until you approach it. Then a wave of vague dread makes it suddenly too heavy to begin. The avoidance isn't about the task. It's about the anxiety the task has accumulated.",
    struggles: ["Dread that arrives on approach", "Relief from avoiding that feeds the loop", "Fog instead of specific fears", "A harsh inner voice after avoiding"],
    practices: ["Naming and rating the feeling", "The approach ladder", "The two-minute touch", "Self-forgiveness as fuel"]
  },
  perfectionism: {
    name: "The Perfectionism Paralytic", short: "Perfectionism-Blocked", noun: "perfectionism",
    summary: "You can't start because starting means possibly doing it wrong. The standard is so high that not beginning feels safer than beginning imperfectly. You need a different relationship with imperfect action, built through very small, very low-stakes completions.",
    struggles: ["Not starting feels safer than starting badly", "First drafts that get deleted", "Done that never arrives", "A miss that becomes a shame spiral"],
    practices: ["Two bars: low to start, high to finish", "Draft zero on purpose", "Done at the timer", "Repair after a miss"]
  }
};
window.IGNITE_PATTERN_ORDER = ["initiation", "overthinker", "deadline", "interest", "anxiety", "perfectionism"];

/* Scenario questions: each option adds weight to one or two patterns. */
window.IGNITE_QUIZ = [
  { id: "q1", type: "scenario", text: "When you think about organizing a cluttered room, what's your natural first step?",
    options: [
      { text: "Picture the finished room and plan the whole system before touching anything", w: { overthinker: 2, perfectionism: 1 } },
      { text: "Stand in the doorway wanting to start, and somehow not start", w: { initiation: 2 } },
      { text: "Leave it until guests are coming, then do it all in one burst", w: { deadline: 2 } },
      { text: "Get pulled into sorting one interesting box for an hour and ignore the rest", w: { interest: 2 } },
      { text: "Feel a wave of dread and go do something else", w: { anxiety: 2 } },
      { text: "Wait until I have a whole free day to do it properly", w: { perfectionism: 2 } }
    ] },
  { id: "q2", type: "scenario", text: "A task you've been avoiding is due in two weeks. Honestly, when does it get done?",
    options: [
      { text: "The night before, in one intense push", w: { deadline: 2 } },
      { text: "Once I've researched the best way to do it, which can take most of the two weeks", w: { overthinker: 2 } },
      { text: "Whenever I can finally make myself open it. I never know when that will be", w: { initiation: 2 } },
      { text: "When I've stopped feeling sick about it, which is usually late", w: { anxiety: 2 } },
      { text: "When I'm sure I can do it well. If I'm not sure, it slips", w: { perfectionism: 2 } },
      { text: "Right away if it's interesting. Otherwise it gets buried under things that are", w: { interest: 2 } }
    ] },
  { id: "q3", type: "scenario", text: "You sit down to start. What happens in the first thirty seconds?",
    options: [
      { text: "I open three tabs about how to do it instead of doing it", w: { overthinker: 2 } },
      { text: "Nothing. I know the step. My hands won't do it", w: { initiation: 2 } },
      { text: "My chest tightens and I find a reason to get up", w: { anxiety: 2 } },
      { text: "I rewrite the first line five times", w: { perfectionism: 2 } },
      { text: "I check whether it's really due yet. If not, I close it", w: { deadline: 2 } },
      { text: "I drift to something more interesting within a minute", w: { interest: 2 } }
    ] },
  { id: "q4", type: "scenario", text: "Which sentence sounds most like you?",
    options: [
      { text: "\"I can't start until I know it'll be right.\"", w: { perfectionism: 2 } },
      { text: "\"I do my best work with the clock running out.\"", w: { deadline: 2 } },
      { text: "\"If it's boring, I physically can't make myself do it.\"", w: { interest: 2 } },
      { text: "\"I want to do it and I can't begin, and I don't know why.\"", w: { initiation: 2 } },
      { text: "\"I've thought about it so much I'm exhausted before I start.\"", w: { overthinker: 2 } },
      { text: "\"The closer I get to it, the heavier it feels.\"", w: { anxiety: 2 } }
    ] },
  { id: "q5", type: "scenario", text: "What usually happens after you finally start something you'd put off?",
    options: [
      { text: "It's fine, often easier than I feared", w: { anxiety: 1, initiation: 1 } },
      { text: "I keep second-guessing and redoing parts", w: { perfectionism: 2 } },
      { text: "I realize the planning was the real work and the doing is fast", w: { overthinker: 2 } },
      { text: "I hyperfocus and lose hours", w: { interest: 2 } },
      { text: "I'm fast and good because the pressure is finally on", w: { deadline: 2 } },
      { text: "I keep going until I'm interrupted, then struggle to restart", w: { initiation: 2 } }
    ] },
  { id: "q6", type: "scenario", text: "Pick the thing that helps you most right now, even if it isn't ideal:",
    options: [
      { text: "Someone sitting with me while I work", w: { initiation: 2 } },
      { text: "A real deadline from someone else", w: { deadline: 2 } },
      { text: "Making it a game or pairing it with something fun", w: { interest: 2 } },
      { text: "Permission to do it badly", w: { perfectionism: 2 } },
      { text: "Someone telling me it's going to be okay", w: { anxiety: 2 } },
      { text: "Someone just telling me what to do first", w: { overthinker: 2 } }
    ] },
  { id: "q7", type: "scenario", text: "How do you feel about a task while you're avoiding it?",
    options: [
      { text: "Dread. I don't even want to think about it", w: { anxiety: 2 } },
      { text: "Guilty, but it's not urgent yet so I can't engage", w: { deadline: 2 } },
      { text: "Bored even imagining it", w: { interest: 2 } },
      { text: "Nervous it won't be good enough", w: { perfectionism: 2 } },
      { text: "Mentally busy. I'm working on it in my head constantly", w: { overthinker: 2 } },
      { text: "Frustrated with myself. I want to start and just don't", w: { initiation: 2 } }
    ] },
  { id: "q8", type: "scenario", text: "Which describes your to-do list?",
    options: [
      { text: "Full of things I've planned in detail but never begun", w: { overthinker: 2 } },
      { text: "Full of boring but important things. The interesting ones got done", w: { interest: 2 } },
      { text: "Everything gets done, but only at the last minute", w: { deadline: 2 } },
      { text: "Full of things that feel too big to touch", w: { anxiety: 1, initiation: 1 } },
      { text: "Full of things I'm waiting to have time to do properly", w: { perfectionism: 2 } },
      { text: "The next step is obvious on every item, and I still don't start", w: { initiation: 2 } }
    ] },
  /* Likert items: 0 Never .. 4 Almost always, each feeds one pattern. */
  { id: "l1", type: "likert", pattern: "initiation", text: "I know exactly what to do and still can't make myself begin." },
  { id: "l2", type: "likert", pattern: "overthinker", text: "I spend more time thinking about how to do a task than doing it." },
  { id: "l3", type: "likert", pattern: "deadline", text: "Without a hard deadline, I basically don't work on something." },
  { id: "l4", type: "likert", pattern: "interest", text: "I can focus for hours on what interests me and minutes on what doesn't." },
  { id: "l5", type: "likert", pattern: "anxiety", text: "Tasks I avoid feel worse the closer I get to doing them." },
  { id: "l6", type: "likert", pattern: "perfectionism", text: "I'd rather not start than do something imperfectly." }
];
window.IGNITE_LIKERT_LABELS = ["Never", "Rarely", "Sometimes", "Often", "Almost always"];

/* answers: { q1: optionIndex, ..., l1: 0..4 }
   Returns { scores: {pattern: 0..100}, top: pattern, ranked: [pattern,...] }
   Max raw per pattern = 8 scenario questions x 2 + likert 4 = 20. */
window.igniteScore = function (answers) {
  var raw = {}; IGNITE_PATTERN_ORDER.forEach(function (p) { raw[p] = 0; });
  var likert = {};
  IGNITE_QUIZ.forEach(function (q) {
    var a = answers[q.id];
    if (a === undefined || a === null) return;
    if (q.type === "scenario") {
      var opt = q.options[a]; if (!opt) return;
      Object.keys(opt.w).forEach(function (p) { raw[p] += opt.w[p]; });
    } else {
      raw[q.pattern] += a; likert[q.pattern] = a;
    }
  });
  var MAX = 20, scores = {};
  IGNITE_PATTERN_ORDER.forEach(function (p) { scores[p] = Math.round(raw[p] / MAX * 100); });
  var ranked = IGNITE_PATTERN_ORDER.slice().sort(function (a, b) {
    if (raw[b] !== raw[a]) return raw[b] - raw[a];
    var la = likert[a] || 0, lb = likert[b] || 0;
    if (lb !== la) return lb - la;
    return IGNITE_PATTERN_ORDER.indexOf(a) - IGNITE_PATTERN_ORDER.indexOf(b);
  });
  return { scores: scores, raw: raw, max: MAX, top: ranked[0], ranked: ranked };
};
window.igniteBand = function (score) {
  if (score >= 60) return { label: "High", tone: "high" };
  if (score >= 35) return { label: "Moderate", tone: "mid" };
  return { label: "Low", tone: "low" };
};
