/* Ignite - universal lessons (chapters 1, 3 and 4).
   Chapter 2 is pattern-specific and lives in content-pattern-*.js.
   Source keys resolve against IGNITE_SOURCES in sources.js. */
window.IGNITE_CONTENT_CORE = [
  /* ---------------- Chapter 1: The first three seconds ---------------- */
  {
    id: "c1d1", chapter: 1, day: 1, pattern: null,
    title: "Starting is the whole problem",
    tagline: "You are not here because you can't do things. You are here because you can't begin them.",
    lesson: [
      "Think about the last thing you finally did after weeks of putting it off. Once you were in it, it probably went fine. Maybe it even went fast. The hard part was never the task. The hard part was the moment before the task, the few seconds where you had to cross from not-doing into doing.",
      "That is what this program works on. Not productivity systems, not a better to-do list. Just the first three seconds, practiced daily, in doses small enough that they don't need willpower.",
      "There is good reason to think this can be trained. A systematic review and meta-analysis by Rozental and colleagues found that psychological treatments, especially ones based on cognitive behavioral therapy, reduce procrastination. The techniques in these lessons come from that tradition: small graded steps, specific plans, and changing your relationship with the feelings a task produces.",
      "Each day you'll get one short lesson and one micro-initiation. The exercise is finished when you've started, not when the task is done. That rule matters. Starting is the skill. Keep it tiny."
    ],
    keyIdea: "The win is crossing the first three seconds. Everything after that is easier than you expect.",
    exercise: {
      title: "The three-second start", minutes: 2,
      intro: "Pick one thing you've been putting off. You are only going to do the first physical motion of it.",
      steps: [
        "Write the task in the box below, in plain words (\"email the landlord\", \"put the laundry in\").",
        "Start the timer. Do only the first physical movement: open the document, open the dishwasher, pick up the phone.",
        "Hold there for ten seconds. Notice what the feeling actually is, now that you're in it.",
        "You may keep going if you want to. You may also stop. Both count as done."
      ],
      done: "You performed the first physical motion of a task you had been avoiding."
    },
    reflect: "What did the first three seconds actually feel like, compared with how you expected them to feel?",
    sources: ["rozental2018"]
  },
  {
    id: "c1d2", chapter: 1, day: 2, pattern: null,
    title: "Why \"just do it\" doesn't work",
    tagline: "Procrastination is a feeling problem wearing a time-management costume.",
    lesson: [
      "If avoiding a task were about laziness, lazy people would avoid everything. They don't. You avoid specific things, and if you look closely, those things share a quality: thinking about them produces a bad feeling. Dread, boredom, doubt, a vague heaviness.",
      "Sirois and Pychyl describe procrastination as short-term mood repair. Putting the task off makes the bad feeling go away right now, and your brain learns that avoiding works. It does work, for about an hour. Then the task is still there, with more feeling attached.",
      "Steel's large meta-analysis points the same way: across many studies, procrastination is most strongly tied to how unpleasant a task feels, how far away its reward is, and how little you believe you can do it. Willpower barely features.",
      "So this program doesn't try to make you tougher. It tries to make the first step produce less feeling, so there's less to push through. Today's exercise is a measurement, not a performance."
    ],
    keyIdea: "You don't avoid tasks. You avoid the feeling the task produces. Shrink the feeling and the task gets easier.",
    exercise: {
      title: "Rate the dread", minutes: 3,
      intro: "You're going to measure how a task feels before and after a tiny approach. Nothing more.",
      steps: [
        "Pick a task you've been avoiding. Rate how it feels to think about it, 0 (nothing) to 10 (awful). Write the number.",
        "Start the timer. Open or touch the task for two minutes. Read it, look at it, lay out what it needs. Don't try to finish anything.",
        "When the timer ends, rate the feeling again and write the second number next to the first.",
        "Compare the two numbers. Whatever they are, you have real data about how this task actually behaves."
      ],
      done: "Two numbers are written down, and you touched the task for two minutes."
    },
    reflect: "What were your two numbers? Did the feeling change once you were actually in contact with the task?",
    sources: ["sirois2013", "steel2007"]
  },
  {
    id: "c1d3", chapter: 1, day: 3, pattern: null,
    title: "Make the first step embarrassingly small",
    tagline: "If a step produces resistance, it is still too big. Keep shrinking.",
    lesson: [
      "Most people set first steps that are secretly whole tasks. \"Start the report\" is not a step. It is the report. Your brain knows this, which is why it refuses.",
      "James Clear's two-minute rule says to scale any new behaviour down to a version that takes two minutes. B. J. Fogg's Tiny Habits goes further: make it so small it feels almost silly, anchor it to something you already do, and celebrate the moment you do it. The point of the smallness is that there is nothing to resist.",
      "A good test: if you imagine doing the step and feel any pull-back at all, shrink it again. \"Write the report\" becomes \"open the file\" becomes \"type the title\" becomes \"type one word\". Somewhere in that chain the resistance disappears. That is your real first step.",
      "This feels like cheating. It isn't. Starting at the tiny step almost always carries you past it, and when it doesn't, you still started."
    ],
    keyIdea: "Shrink the first step until there is nothing left to resist. That step is the real beginning.",
    exercise: {
      title: "Shrink it", minutes: 3,
      intro: "Take one avoided task and cut it down until the first step is smaller than your resistance.",
      steps: [
        "Write the task as you normally think of it.",
        "Under it, write a smaller first step. Then a smaller one. Keep going until you reach a step that takes under one minute and produces no pull-back.",
        "Start the timer and do that smallest step. Just that one.",
        "If you feel like continuing, continue. If not, close it. You're done either way."
      ],
      done: "You wrote a chain of shrinking steps and did the smallest one."
    },
    reflect: "How many times did you have to shrink the step before the resistance disappeared?",
    sources: ["clear2018", "fogg2020"]
  },
  {
    id: "c1d4", chapter: 1, day: 4, pattern: null,
    title: "If-then: a plan your brain can run",
    tagline: "Decide the when and where in advance, so the moment doesn't require a decision.",
    lesson: [
      "A lot of starting fails because the start has no time or place. \"I'll do it today\" leaves the decision open all day, and an open decision is something your brain can keep postponing.",
      "Peter Gollwitzer's research on implementation intentions, which are plans of the form \"When situation X happens, I will do Y\", found that people who form them are substantially more likely to follow through. A meta-analysis by Gollwitzer and Sheeran covering many studies found a medium-to-large effect on reaching goals. It is one of the most reliable tools in this whole field, and it takes thirty seconds.",
      "The trick is that the cue does the deciding. \"When I sit down with my coffee at 8:30, I will open the file and type one line.\" At 8:30 the coffee is the signal. You're not deciding whether to start; you're just doing what the plan says.",
      "Make the cue something that will definitely happen, and make the action tiny. A big action attached to a cue still gets resisted."
    ],
    keyIdea: "\"When X happens, I will do Y.\" Let the cue make the decision so you don't have to.",
    exercise: {
      title: "Write tomorrow's if-then", minutes: 3,
      intro: "You'll write one if-then plan for tomorrow and rehearse it once, right now.",
      steps: [
        "Pick a cue that will definitely happen tomorrow (pouring coffee, sitting at your desk, getting in the car).",
        "Write: \"When [cue], I will [tiny first step].\" Keep the step under two minutes.",
        "Put the sentence where you'll see it at the cue: a sticky note, a phone lock screen, a note on the keyboard.",
        "Start the timer. Go to the cue spot and physically act out the plan once, like a rehearsal."
      ],
      done: "Your if-then sentence is written, placed where the cue happens, and rehearsed once."
    },
    reflect: "What is your if-then sentence for tomorrow? Write it here so it's on record.",
    sources: ["gollwitzer1999", "gollwitzer2006"]
  },
  {
    id: "c1d5", chapter: 1, day: 5, pattern: null,
    title: "Set the stage tonight",
    tagline: "Tomorrow's start gets easier when today does the setup.",
    lesson: [
      "Every start has hidden steps before the real one. Find the file. Clear the desk. Remember where you left off. Each one is a small chance to stall. If you do them the night before, tomorrow's start is a continuation instead of a cold start.",
      "This is sometimes called reducing friction. The gym bag by the door, the document already open on the screen, the first line already written on a sticky note. None of it is impressive, which is exactly why it works: there is nothing to decide when you arrive.",
      "A useful version is to end today's work by writing the very next physical action, in one line. \"Resume at paragraph 3: add the budget numbers.\" Tomorrow you read the line and do it. The thinking was done when you were already warm.",
      "Tonight, preload one start. Make the morning version of you walk into a room where everything is ready."
    ],
    keyIdea: "Do the hidden setup steps today, so tomorrow's start is just the first real action.",
    exercise: {
      title: "Preload tomorrow", minutes: 5,
      intro: "Set up one task so that tomorrow it is already open, laid out, and labelled with its first move.",
      steps: [
        "Choose the first thing you want to start tomorrow.",
        "Start the timer. Gather or open everything it needs: file, tools, materials, the right tab, the right room.",
        "On a note, write the first physical action in one line, with a verb (\"type the title\", \"call the number\").",
        "Leave it all exactly in place. Close nothing. Tomorrow begins where this note is."
      ],
      done: "One task is physically laid out with its first action written on a note."
    },
    reflect: "What did you preload, and what is the one-line first action you wrote?",
    sources: []
  },
  {
    id: "c1d6", chapter: 1, day: 6, pattern: null,
    title: "What to do when you slip",
    tagline: "You will miss days. The skill is how fast you come back, not whether you leave.",
    lesson: [
      "At some point you'll avoid something anyway, or skip a day of this program. What you do next matters more than the slip. The usual response is self-criticism, and it feels responsible. It isn't. It adds more bad feeling to the task, and bad feeling is the thing that makes the next start harder.",
      "Wohl, Pychyl and Bennett studied students who had procrastinated before a first exam. Those who forgave themselves for it procrastinated less before the next one. Forgiveness wasn't letting themselves off the hook; it cleared the way to try again.",
      "Lally and colleagues, tracking people forming new daily habits, found that missing a single day did not materially derail the process. One miss is a miss. It only becomes a pattern if the next day is also a miss, and that is the day you can control.",
      "So the reset is short: name what happened, say the forgiving sentence, take the smallest step. Sixty seconds. No speech."
    ],
    keyIdea: "A slip costs one day. Self-criticism costs the next one too. Forgive, shrink, start.",
    exercise: {
      title: "The 60-second reset", minutes: 3,
      intro: "Practice the reset now on something real, so it's ready when you need it.",
      steps: [
        "Write one thing you've avoided recently, in one neutral sentence. No adjectives about yourself.",
        "Say, out loud or in writing: \"I avoided it, that's a normal thing humans do, and I'm starting again now.\"",
        "Write the smallest possible next step for it.",
        "Start the timer and do that step for two minutes."
      ],
      done: "You named the slip, said the forgiving line, and did the smallest next step."
    },
    reflect: "What was the forgiving sentence like to say? Did it feel like letting yourself off, or like clearing the road?",
    sources: ["wohl2010", "lally2010"]
  },
  {
    id: "c1d7", chapter: 1, day: 7, pattern: null,
    title: "Week one review",
    tagline: "Seven starts. Look at what worked before you move to your pattern.",
    lesson: [
      "You've now practiced six different ways in: the first motion, measuring the feeling, shrinking, if-then, preloading, and the reset. Some will have felt natural. One or two probably felt silly. That's useful information, because the next three weeks are built on what works for you, not on what works in general.",
      "Look back at your reflections from this week. Which exercise made the start easiest? Which one did you nearly skip? The easy one is your first go-to move. The one you nearly skipped might be the one you need most, or might just not be your style. Either is fine to notice.",
      "Tomorrow the program turns to your specific pattern, the way your brain in particular gets stuck. Week one gave you general tools; week two tunes them.",
      "Today's exercise is short on purpose. You're building a start log, and then starting one more thing."
    ],
    keyIdea: "You have six ways to start. Pick the one that felt easiest. That's your go-to move.",
    exercise: {
      title: "Your start log", minutes: 5,
      intro: "Write down this week's starts, choose a go-to move, then use it once.",
      steps: [
        "List the things you started this week (your reflections are in the Diary tab if you need them).",
        "Mark the start that felt easiest and write which move you used for it. That's your go-to move.",
        "Pick anything still pending. Start the timer.",
        "Use your go-to move on it for two minutes."
      ],
      done: "Your go-to move is written down, and you used it once on a real task."
    },
    reflect: "What is your go-to move, and why do you think it worked better than the others?",
    sources: []
  },

  /* ---------------- Chapter 3: Building momentum ---------------- */
  {
    id: "c3d15", chapter: 3, day: 15, pattern: null,
    title: "From starting to continuing",
    tagline: "A task is a series of starts. You've been practicing the first one. Now practice the second.",
    lesson: [
      "Two weeks in, you've started a lot of things. Some of them you also stopped, maybe mid-way, and then found that restarting was its own wall. That's normal. Every interruption creates a new first-three-seconds, and the restart can feel heavier than the original start because now there's a half-done thing attached.",
      "The fix is to treat restarting as the same skill. Same tools: shrink the re-entry step, give it a cue, forgive the gap. A task isn't one start followed by effort. It's a chain of small starts, each one cheap if you treat it that way.",
      "There's a quiet benefit here. Once you know you can restart easily, stopping stops being scary. You can take a break, answer the door, or run out of energy without feeling like the task is lost.",
      "Today you'll practice a deliberate stop and restart, so the restart becomes something you've done on purpose rather than something that happens to you."
    ],
    keyIdea: "Every interruption is just another start. Make the restart as small as the first start.",
    exercise: {
      title: "The two-start session", minutes: 5,
      intro: "You'll start a task, stop on purpose at the halfway bell, and start it again.",
      steps: [
        "Pick a real task. Write its first physical step.",
        "Start the timer and begin. Work until about two and a half minutes have passed.",
        "Stop completely. Stand up or look away for thirty seconds. Notice any pull to not go back.",
        "Sit back down and restart with the smallest motion. Continue until the timer ends."
      ],
      done: "You stopped on purpose and restarted once. The second start is the one that counts today."
    },
    reflect: "Was the restart harder or easier than the first start? What made the difference?",
    sources: []
  },
  {
    id: "c3d16", chapter: 3, day: 16, pattern: null,
    title: "Break it until the next step is obvious",
    tagline: "If you can't say what the next physical action is, you can't start it.",
    lesson: [
      "A lot of stalled tasks aren't really tasks. \"Sort out the insurance\" or \"plan the trip\" are outcomes, and you can't do an outcome. You can only do actions, and an action has a verb and a body movement: call, open, write, carry, send.",
      "The test is simple. Can you picture yourself physically doing the next step, right now, in under a few minutes? If not, break it again. \"Sort out the insurance\" becomes \"find the policy number\", which becomes \"open the email from the insurer\". That last one you can picture. That one you can start.",
      "You only ever need the next action, not the whole chain. Trying to map every step is one of the ways planning replaces doing. Write the next three at most, do the first, and the rest will be clearer once you're in motion.",
      "Today is about converting one vague item into something your hands can do."
    ],
    keyIdea: "Outcomes can't be started. Actions can. Find the verb.",
    exercise: {
      title: "Find the verb", minutes: 4,
      intro: "Turn one vague to-do into three physical actions, then do the first.",
      steps: [
        "Write one item from your list that has been sitting there because it's vague.",
        "Under it, write the next three physical actions, each starting with a verb you can picture doing.",
        "Check the first one: could you do it in the next two minutes without any further decisions? If not, break it again.",
        "Start the timer and do the first action."
      ],
      done: "A vague item now has three verb-first actions under it, and the first one is started."
    },
    reflect: "What was the vague item, and what did its real first action turn out to be?",
    sources: []
  },
  {
    id: "c3d17", chapter: 3, day: 17, pattern: null,
    title: "Boxes of time",
    tagline: "\"Done at the timer\" is a standard you can always meet.",
    lesson: [
      "An open-ended task has no finish line, which means every moment in it is a moment you could still be working. That's exhausting to even start. A time box changes the question from \"when will this be done?\" to \"can I do this for the next few minutes?\"",
      "The Pomodoro Technique, described by Francesco Cirillo, is the best-known version: twenty-five minutes of work, a five-minute break, repeat. The exact lengths matter less than the rule underneath them. You commit to a box, not to the task. When the timer rings you may stop with a clear conscience.",
      "For starting, the box can be much smaller than twenty-five minutes. Five minutes is plenty. The box also gives you a natural stopping point to practice yesterday's restart skill.",
      "One important detail today: stop when the timer rings, even if it's going well. You're teaching yourself that stopping is safe and restarting is cheap. That lesson is worth more than three extra minutes of work."
    ],
    keyIdea: "Commit to a box of time, not to finishing. When the bell rings, you've kept your promise.",
    exercise: {
      title: "One honest box", minutes: 5,
      intro: "A single five-minute box on a real task. Start at the beep, stop at the beep.",
      steps: [
        "Choose a task and write the first physical action.",
        "Start the timer. Begin, and stay with the task for the whole box. Nothing else counts as the task.",
        "If you drift, come back without comment. Drifting and returning is part of the box.",
        "When the timer ends, stop, even mid-sentence. Write one line about where to resume."
      ],
      done: "You worked one full box and stopped at the bell with a resume note."
    },
    reflect: "How did it feel to stop at the bell? Was there a pull to keep going, or relief?",
    sources: ["cirillo"]
  },
  {
    id: "c3d18", chapter: 3, day: 18, pattern: null,
    title: "Pair it with something you want",
    tagline: "If the task has no reward in it, bring one.",
    lesson: [
      "Some tasks will never be interesting. Filing, forms, folding laundry. Waiting for motivation to arrive for those is a long wait. Instead, attach something you already want to the moment of doing them.",
      "Milkman, Minson and Volpp tested this idea, which they called temptation bundling. In their study, people who could only listen to tempting audiobooks while at the gym went to the gym more often. The pleasure was bundled with the chore, and only available there.",
      "The key word is only. If you can have the podcast anytime, it stops being a reason to start the laundry. If it lives with the laundry, the laundry gains a reason.",
      "This works especially well for recurring dull tasks, because the bundle becomes a routine. Today, build one bundle and begin it."
    ],
    keyIdea: "Bundle a dull task with a treat you only get during it. The treat makes the start.",
    exercise: {
      title: "Build a bundle", minutes: 5,
      intro: "Choose a treat, attach it to a dull task, and start the pair now.",
      steps: [
        "Write three things you enjoy that can run alongside a task: a show, a podcast, a particular drink, a playlist.",
        "Write one recurring task you avoid because it's dull.",
        "Pair them: \"I only get [treat] while I do [task].\" Write the rule.",
        "Start the timer. Begin the task and the treat together."
      ],
      done: "A bundle rule is written and you began the bundled task."
    },
    reflect: "What's your bundle? Do you believe you can keep the treat only for that task?",
    sources: ["milkman2014"]
  },
  {
    id: "c3d19", chapter: 3, day: 19, pattern: null,
    title: "Borrow a body",
    tagline: "Starting next to someone is often easier than starting alone.",
    lesson: [
      "Many people find that simply having another person present, working on their own thing, makes starting easier. In ADHD communities this is called body doubling. It can be in person, on a video call, or even a voice note saying \"I'm starting now\". To be clear, formal research on body doubling is limited; what we have is a widely shared experience that it helps.",
      "A lighter version is a simple announcement. Telling one person \"I'm starting the report at 2pm, I'll message you when I've begun\" turns a private intention into a small social commitment. The message you owe them is the cue.",
      "Notice that neither version asks the other person to do anything. They don't check up on you or motivate you. They just exist, and that's enough to tip the first three seconds.",
      "Today, pick whichever version is available to you and use it on a real start."
    ],
    keyIdea: "Another person in the room, or on the other end of a message, can carry you across the start.",
    exercise: {
      title: "Announce and begin", minutes: 5,
      intro: "Tell one person you're starting, then start, then tell them you did.",
      steps: [
        "Choose a task and a person who won't mind a two-line message.",
        "Send: \"Starting [task] now, will tell you when I've begun.\" If a video or in-person body double is possible, set that up instead.",
        "Start the timer and do the first physical step.",
        "Send the second message: \"Started.\" That's the whole report."
      ],
      done: "Two messages sent, with a real start in between."
    },
    reflect: "Did knowing someone would get the \"Started\" message change how the start felt?",
    sources: ["bodydoubling"]
  },
  {
    id: "c3d20", chapter: 3, day: 20, pattern: null,
    title: "The mid-task dip",
    tagline: "Energy drops in the middle. Plan for it so the drop isn't a stop.",
    lesson: [
      "Somewhere in most tasks there's a dip. The novelty is gone, the end isn't visible, and your attention starts looking for exits. This is where a lot of started tasks quietly die, not from a decision to quit but from a drift that never comes back.",
      "Two moves help. The first is to notice the dip and name it: \"this is the middle\". The middle is a place, not a verdict on the task. The second is to apply the shrink rule from week one to the next step. In the dip, the next step should be as small as the first step was.",
      "The third move is for when you really do need to stop: stop at a point you've chosen, and leave a one-line note that tells future-you exactly where to resume. Stopping mid-step, with the next move obvious, makes restarting almost free. Some writers stop mid-sentence for exactly this reason.",
      "Today you'll practice stopping in the dip on purpose, with a resume note."
    ],
    keyIdea: "The middle is a place, not a verdict. Shrink the next step, or stop with a resume note.",
    exercise: {
      title: "Park on the slope", minutes: 5,
      intro: "Work into a task, stop deliberately mid-step, and leave a note that makes the restart easy.",
      steps: [
        "Pick a task with some length to it. Start the timer and begin.",
        "Around the four-minute mark, stop in the middle of a step, not at a clean break.",
        "Write a one-line resume note: \"Next: [exact physical action].\"",
        "Close it. The note is the restart. Tomorrow, or later today, read it and do it."
      ],
      done: "You stopped mid-step on purpose and wrote the exact next action."
    },
    reflect: "What's your resume note? And did stopping mid-step feel uncomfortable or oddly freeing?",
    sources: []
  },
  {
    id: "c3d21", chapter: 3, day: 21, pattern: null,
    title: "Week three review",
    tagline: "Three weeks of starts. Build the menu you'll actually use.",
    lesson: [
      "This week added continuing to starting: restarts, finding the verb, time boxes, bundling, borrowing a body, and parking on the slope. Together with week one's tools and your pattern week, you now have more moves than you'll ever use at once. That's fine. Nobody needs the whole toolbox in their pocket.",
      "What you need is a short menu, three moves you reach for without thinking. One for cold starts, one for the middle, and one for when you've slipped. Everything else stays in the lessons for when you want it.",
      "Look through your reflections from the last three weeks. Which moves show up in the starts that felt best? Those are your menu. Don't choose the ones you think you should like.",
      "Next week turns these into defaults, so they happen without the app. Today, write the menu and use one item from it."
    ],
    keyIdea: "Three moves you reach for without thinking: one for cold starts, one for the middle, one for slips.",
    exercise: {
      title: "Your momentum menu", minutes: 5,
      intro: "Write a three-item menu from the moves that worked, then use one right now.",
      steps: [
        "Write \"Cold start:\" and the move that worked best for beginning (from weeks one and two).",
        "Write \"Middle:\" and the move that helped you continue (from this week).",
        "Write \"Slip:\" and what you'll do after a missed day (week one, day six is a good default).",
        "Start the timer and use the cold-start move on anything pending."
      ],
      done: "A three-line menu is written and one item was used on a real task."
    },
    reflect: "Write your three-line menu here so it's in your diary.",
    sources: []
  },

  /* ---------------- Chapter 4: Making it the default ---------------- */
  {
    id: "c4d22", chapter: 4, day: 22, pattern: null,
    title: "Anchor it to something you already do",
    tagline: "New behaviours stick when they ride on old ones.",
    lesson: [
      "You already have dozens of automatic routines: the coffee, the commute, the moment you sit down at the desk, the kettle at four. None of them need willpower. They happen because something before them triggers them. B. J. Fogg's Tiny Habits method uses this directly: after an existing routine, do a tiny new behaviour, then celebrate it.",
      "For starting, this means attaching your go-to move to an anchor you can't miss. \"After I pour my coffee, I open today's task and do the first action.\" The coffee carries the start.",
      "A realistic timeline helps here. Lally and colleagues found that new daily behaviours took a median of about 66 days to feel automatic, with a very wide range between people. Twenty-eight days of this program is a strong beginning, not the finish line. Anchoring is how the behaviour keeps going after the app stops reminding you.",
      "Today, choose one anchor and rehearse the link."
    ],
    keyIdea: "After [something you already do], I will [tiny start]. Let the old routine carry the new one.",
    exercise: {
      title: "Choose your anchor", minutes: 4,
      intro: "Pick a daily routine you never skip, attach a tiny start to it, and rehearse once.",
      steps: [
        "List three things you do every single day without thinking.",
        "Pick the one that happens closest to when you want to start work. That's your anchor.",
        "Write: \"After I [anchor], I will [tiny first action].\"",
        "Start the timer. Go to where the anchor happens and act out the pair once, start to finish."
      ],
      done: "Your anchor sentence is written and rehearsed once in the real spot."
    },
    reflect: "What is your anchor sentence? Where will you put it so you see it at the anchor moment?",
    sources: ["fogg2020", "lally2010"]
  },
  {
    id: "c4d23", chapter: 4, day: 23, pattern: null,
    title: "A starting routine",
    tagline: "The same three steps every time, so starting stops being a decision.",
    lesson: [
      "Athletes and performers use fixed pre-start routines for a reason: they turn a nervous moment into a sequence. You don't decide to start; you do step one, and step one leads to step two, and step three is the task. The routine does the deciding.",
      "Your routine should be short, physical, and the same every time. Clear the desk. Fill the water glass. Open the one file. Three steps is plenty. The last step should be the tiny first action itself, so the routine ends inside the task.",
      "Keep it boring. A routine you have to think about isn't a routine yet. The goal is that by the time you notice you're doing it, you're already working.",
      "Today, design it and run it once. Then run it again tomorrow at your anchor."
    ],
    keyIdea: "Three physical steps, always the same, ending inside the task. The routine decides, not you.",
    exercise: {
      title: "Design your three steps", minutes: 4,
      intro: "Write a three-step physical start routine and run it once now.",
      steps: [
        "Write step one: a physical reset (clear the surface, close other tabs, put the phone face down).",
        "Write step two: a physical ready signal (sit, water, headphones, timer on).",
        "Write step three: the tiny first action of today's task.",
        "Start the timer and run all three steps in order, without stopping between them."
      ],
      done: "Your three-step routine is written and you ran it once, ending inside a real task."
    },
    reflect: "Write your three steps here. Which one do you think will be easiest to skip?",
    sources: []
  },
  {
    id: "c4d24", chapter: 4, day: 24, pattern: null,
    title: "When life blows up the plan",
    tagline: "The plan will break. Have a one-minute version ready for those days.",
    lesson: [
      "Illness, travel, a bad night, a week that's just too much. The plan you built doesn't survive those days, and if your only options are \"the full routine\" or \"nothing\", you'll choose nothing and then feel like you've lost the thread.",
      "The answer is a never-zero rule: on a bad day, do the one-minute version. Open the file and type one word. Put one dish in the dishwasher. Read the resume note. It keeps the thread alive, and it keeps your identity as someone who starts intact.",
      "The research on habit formation supports being relaxed about this. Lally and colleagues found that a single missed day didn't materially derail people forming new habits. The danger is not the missed day; it's the story you tell afterwards. A one-minute version makes that story \"I kept going, barely\" instead of \"I stopped\".",
      "Today, define your one-minute versions in advance, while you're calm."
    ],
    keyIdea: "Never zero. On the worst days, do the one-minute version and keep the thread.",
    exercise: {
      title: "Write your never-zero list", minutes: 4,
      intro: "Define the one-minute version of three things you want to keep doing, and do one now.",
      steps: [
        "Write three recurring things that matter to you (work task, home task, something for yourself).",
        "Next to each, write a version that takes one minute or less and still counts.",
        "Keep this list where you'll find it on a bad day.",
        "Start the timer and do one of the one-minute versions right now, as a rehearsal."
      ],
      done: "Three never-zero versions are written and one was rehearsed."
    },
    reflect: "What are your three never-zero versions?",
    sources: ["lally2010"]
  },
  {
    id: "c4d25", chapter: 4, day: 25, pattern: null,
    title: "Decide less",
    tagline: "Every decision is a place to stall. Make the common ones in advance.",
    lesson: [
      "Look at where your starts actually stall and you'll often find a decision hiding there. Which task first? Where should I work? Do I answer this message now? Each one is small, and each one is an exit.",
      "The fix is defaults: rules you set once, so the moment doesn't require a choice. \"First task of the day is always the one on the resume note.\" \"If I don't know what to do, I do the two-minute version of the oldest item.\" \"Messages wait until the first box is done.\"",
      "Defaults are not rigid. You can break them any time you have a good reason. Their job is only to answer the question when you don't have a reason, which is most of the time.",
      "Today, write three defaults for the decisions that most often stall you, and apply one."
    ],
    keyIdea: "A default is a decision you made once so you never have to make it at the start line.",
    exercise: {
      title: "Three defaults", minutes: 4,
      intro: "Find your three most common stalling decisions and pre-answer them.",
      steps: [
        "Write three questions that often come up right when you're trying to start (which task, where, what about messages, how long).",
        "Answer each with a one-line rule that will be right most of the time.",
        "Start the timer.",
        "Apply one default right now: do whatever it says, for two minutes."
      ],
      done: "Three default rules are written and one was applied to a real start."
    },
    reflect: "What are your three defaults? Which decision were you most relieved to stop making?",
    sources: []
  },
  {
    id: "c4d26", chapter: 4, day: 26, pattern: null,
    title: "Starting as who you are now",
    tagline: "Twenty-five days of evidence. Let it update the story you tell about yourself.",
    lesson: [
      "For a long time you may have carried a label: procrastinator, lazy, all-or-nothing, can't-get-started. Labels like that aren't neutral. They predict what you'll do next, and they add dread to every start, because each start becomes a test of whether the label is true.",
      "You now have twenty-five days of starts logged in this app. That's evidence. Not evidence that you're fixed, but evidence that the label was never the whole story. Someone who has started something small on most days for nearly a month is, as a plain description, a person who starts things.",
      "This isn't positive thinking. It's reading your own record accurately. The exercise today is to go and look at it.",
      "Then start one more thing, as that person."
    ],
    keyIdea: "Read your own record. Twenty-five days of starts is a more accurate label than the old one.",
    exercise: {
      title: "Collect the evidence", minutes: 5,
      intro: "Pull five real examples from your diary, write one honest sentence, then start something.",
      steps: [
        "Open the Diary tab and find five starts you made in the last 25 days. Write them as a list.",
        "Under the list, write one plain sentence that describes what the list shows. No hype, just accurate.",
        "Start the timer.",
        "Start one pending task with your go-to move, for two minutes."
      ],
      done: "Five examples and one accurate sentence are written, and you started one more thing."
    },
    reflect: "What was your one accurate sentence?",
    sources: []
  },
  {
    id: "c4d27", chapter: 4, day: 27, pattern: null,
    title: "Your relapse plan",
    tagline: "You'll drift at some point. Decide now what brings you back.",
    lesson: [
      "Relapse is a normal part of any behaviour change, and it tends to happen quietly: a stressful week, a few missed days, and then the old pattern is back without a decision ever being made. The people who recover fastest are the ones who decided in advance what recovery looks like.",
      "A relapse plan has three parts. A sign: how you'll know you've drifted (three days without a start, the resume note untouched for a week). A first move: the smallest thing that counts as coming back, usually day one's exercise. And a forgiveness line, because Wohl and colleagues' study suggests that self-forgiveness after procrastinating is linked to less procrastination afterwards, while self-criticism tends to add weight to the next start.",
      "Write it as an if-then, the tool from day four. \"If I notice three days without a start, I will do the three-second start on anything, and say the line.\"",
      "Today, write the plan. You'll hopefully not need it for a while. It needs to exist before you do."
    ],
    keyIdea: "If I notice [sign], I will [smallest return move] and say [forgiving line].",
    exercise: {
      title: "Write the if-then for drifting", minutes: 4,
      intro: "Three lines: the sign, the return move, the forgiving line. Then a two-minute start.",
      steps: [
        "Write your sign: how you'll know you've drifted (be specific: days, or a thing left undone).",
        "Write your return move: the smallest action that counts as back, ideally day one's three-second start.",
        "Write your forgiving line from day six, in your own words.",
        "Start the timer and do a two-minute start on anything, so the return move is already rehearsed."
      ],
      done: "Your relapse plan is written as an if-then and the return move was rehearsed."
    },
    reflect: "Write your relapse plan here in full so it's saved.",
    sources: ["wohl2010", "gollwitzer1999"]
  },
  {
    id: "c4d28", chapter: 4, day: 28, pattern: null,
    title: "Graduation, and what happens next",
    tagline: "Twenty-eight days of starts. Here's how to keep them without the daily lesson.",
    lesson: [
      "You've completed the program. That means twenty-eight lessons and twenty-eight micro-initiations, which is twenty-eight more deliberate starts than most people make in a month. The point was never the lessons. It was the reps.",
      "An honest word about what comes next. Lally and colleagues found new habits took a median of about 66 days to feel automatic, with a wide range between people. Twenty-eight days is a good foundation and probably not the finish. So this app doesn't end today. From tomorrow it moves into maintenance mode: one short micro-initiation each day, no lesson, plus your weekly check-in. Keep the streak if the streak helps you. Ignore it if it doesn't.",
      "You can also retake the quiz and run the pattern week for a different pattern, since most people have more than one. And your diary holds every reflection you've written, which is the most personal manual on starting that exists for your brain.",
      "Today's exercise is to write that manual's one-page version."
    ],
    keyIdea: "The lessons were the scaffolding. Your start protocol is the building. Write it down.",
    exercise: {
      title: "Your one-page start protocol", minutes: 5,
      intro: "Pull the pieces you've built into one note you can read in thirty seconds.",
      steps: [
        "Write your go-to move (day 7) and your momentum menu (day 21).",
        "Write your anchor sentence (day 22) and your three-step routine (day 23).",
        "Write your never-zero list (day 24) and your relapse plan (day 27).",
        "Start the timer. Read the whole page once, then use the go-to move on one real thing."
      ],
      done: "Your start protocol is on one page, and you used it once."
    },
    reflect: "Paste or write your full start protocol here. This is the entry you'll come back to.",
    sources: ["lally2010"]
  }
];
