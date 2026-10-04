# Ignite

A 28-day micro-initiation program for brains that struggle to start. Static web app, no build step, all data in the browser's localStorage.

Live (after merge): https://kandyphoenix.github.io/synthesis-learning-app/ignite/

## What it does
- **Pattern quiz** (14 questions) scores six starting patterns: Initiation-Blocked, Overthinker, Deadline-Powered, Interest-Filtered, Anxiety-Avoidant, Perfectionism-Blocked. Scoring is transparent (points / 20, shown as a percent) and the app says plainly it is not a clinical assessment.
- **28 daily lessons** (about 5 minutes each) plus one **micro-initiation** exercise with a timer, on a real task from the user's life. Chapters 1, 3 and 4 are universal; chapter 2 (days 8-14) is specific to the user's pattern.
- **Reflection** after each exercise, saved to the **Diary**.
- **Journey**: streak, days completed, chapter progress, activity calendar, weekly check-in history, pattern profile.
- **Weekly check-in** every seven days.
- **Explore**: seven research articles, every lesson (future ones locked), and the full source list.
- **Maintenance mode** after day 28: one short daily start, check-ins continue.
- Settings: name, switch pattern, allow more than one lesson a day, export/import backup, reset.

## Accuracy rules for content
All factual claims cite a source in `sources.js` (DOIs verified to resolve on 2026-10-03). Nothing in the lessons invents statistics, studies or experts. CBT techniques are described as practice, not as research findings, unless a cited source covers them. The app describes itself as self-help, not treatment, and makes no outcome promises.

## Files
- `index.html`, `styles.css`, `app.js` - the app
- `quiz.js` - questions, pattern descriptions, scoring
- `content-core.js` - chapters 1, 3, 4 (21 lessons)
- `content-pattern-*.js` - chapter 2, 7 lessons per pattern (42 lessons)
- `articles.js` - Explore articles
- `sources.js` - citation registry
- `manifest.json`, `sw.js`, `icons/` - installable PWA, works offline after first visit
