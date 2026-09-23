---
name: synthesis-lesson
description: Add a new lesson (or full book) to the SYNTHESIS learning app with the correct card layout, SVG standards, and data.js structure. Use when the user wants to add a lesson to Synthesis.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
---

# /synthesis-lesson — Add a Lesson to SYNTHESIS

**App root:** `C:\Users\kandy\GitHub\synthesis-learning-app\`  
**Data files:** `data.js` holds `APP_DATA.categories[] → books[] → lessonList[] → cards[]`, but **most large books now live in their own module** (`<slug>-data.js`, exporting `window.<GLOBAL>_BOOK`), because `data.js` hit GitHub's 100 MB per-file cap. Before editing a book, check whether a `<slug>-data.js` exists for it — **edit that file, not `data.js`**, or the module will overwrite your change at load time. External books are registered in the `externalBooks` array in `integrateExternalCategories()` and loaded by `index.html` before `data.js`.  
**Standards:** `docs/LESSON-CREATION-STANDARDS.md` and `docs/BOOK-CREATION-TEMPLATE.md`  
**CLAUDE.md:** Read `CLAUDE.md` in the app root before any changes.

Arguments: `$ARGUMENTS` — the lesson topic, book name, and/or category (e.g. "add lesson on Medicare Parts to HITT1253" or "new lesson: Python lists, category: data-analytics")

---

## Step 1 — Read Standards First

Before writing a single card, read:
1. `docs/LESSON-CREATION-STANDARDS.md`
2. `CLAUDE.md` (app root)

Do not skip this — the standards define everything below.

---

## Step 2 — Backup data.js

```bash
cp "C:/Users/kandy/GitHub/synthesis-learning-app/data.js" \
   "C:/Users/kandy/GitHub/synthesis-learning-app/data.js.bak_before_$(date +%Y%m%d_%H%M%S)"
```

---

## Step 3 — Identify Target Book and Category

Parse `$ARGUMENTS` to determine:
- **Category** (e.g. `him`, `data-analytics`, `anatomy-physiology`, or another)
- **Book** (existing book to add to, or new book to create)
- **Lesson topic**

If unclear, ask the user before proceeding.

**College-depth categories (no limits on cards or lessons):** `him`, `data-analytics`, `anatomy-physiology`  
All other categories: minimum 10 cards per lesson, minimum 12 lessons per book.

---

## Step 4 — Write the Lesson

### Lesson wrapper structure
```javascript
{
  title: "Compelling Lesson Title — Not Academic",
  duration: 12,   // estimated minutes
  cards: [ /* all cards here */ ]
}
```

### Card format — EXACTLY 4 keys, no more, no less
```javascript
{
  type: "intro",        // intro | concept | example | quiz | application
  title: "Card Title",
  content: `markdown content here`,
  visual: {
    type: "svg",
    svg: `<svg viewBox="0 0 1100 1100" xmlns="http://www.w3.org/2000/svg">
  <rect width="1100" height="1100" fill="#1a1a2e"/>
  <!-- content here -->
</svg>`,
    caption: "Caption text"
  }
}
```

**BANNED extra keys on CONTENT cards:** heading, body — these go inside `content`.

**Quiz cards are different.** A quiz card MUST expose `question`, `options` and
`explanation` as sibling keys, because `exam-center.js` harvests exam questions from
those keys and cannot read a question embedded in `content`:

```js
// exam-center.js — harvestLessonQuestions()
if (card.type === 'quiz' && card.question && card.options) { ...harvest... }
```

A quiz card written with the question inside `content` still *displays* correctly —
app.js falls back to `renderContentQuiz()` — but contributes **zero** exam questions.
30 cards were authored that way and had to be repaired later; do not add more.

### Quiz card format

Exactly these keys. No `title`, no `content`:

```javascript
{
  type: "quiz",
  question: "The full question stem, as plain text.",
  options: [
    { text: "First option",  correct: false },
    { text: "Second option", correct: true  },
    { text: "Third option",  correct: false },
    { text: "Fourth option", correct: false }
  ],
  explanation: "Why the correct answer is right AND why each distractor is wrong.",
  visual: { type: "svg", svg: `<svg .../>`, caption: "..." }
}
```

- Exactly **one** option may have `correct: true`.
- 3–4 options.
- The explanation should address every distractor, not just the right answer.

### SVG standards (mandatory for every card)
- `viewBox="0 0 1100 1100"` — use the FULL canvas
- Background: `<rect width="1100" height="1100" fill="#1a1a2e"/>`
- Palette: teal `#3bafbf` | gold `#f0c040` | orange `#e87040` | green `#50c878` | mauve `#c06080` | dark box `#1c2833`
- **BANNED text colors:** `#e8e8e8` and `#a8b2c1` — use bright palette colors or `#ffffff`
- `font-family="Arial,sans-serif"`
- Fill the full canvas — no cramming into a corner
- Size text boxes to fit all content — text must not overflow its box

### Required card progression (10 minimum, more is better)
| Position | Type | Purpose |
|----------|------|---------|
| 1 | intro | Emotional hook, why this matters |
| 2 | concept | First core concept |
| 3 | concept or example | Deeper layer or visual reinforcement |
| 4 | example | Real-world application |
| 5 | quiz | Mid-lesson knowledge check |
| 6 | concept | Second core concept |
| 7 | concept or example | Deeper layer |
| 8 | example | Real-world application |
| 9 | application | "How to apply this TODAY" — numbered steps |
| 10 | quiz | Final knowledge check |
| 11+ | any | More depth — more examples, concepts, quizzes |

**College-depth categories:** exceed 10 freely. If the topic needs 15-20 cards, write 15-20.

---

## Step 5 — Insert into the book's file

Since 2026-09-23 `data.js` holds no books. A book lives in exactly one of:
- its own module `<slug>-data.js` (most books), or
- its category's `inline-books-<category-id>.js` (older books split out of data.js).

Grep the repo root for `"id": "<book-id>"` / `id: "<book-id>"` to find which file.
**Do NOT do a full file rewrite** — use targeted insertion:

1. Find the target book using Grep on the book `id` field
2. Find the end of `lessonList: [` array in that book
3. Append the new lesson (with proper comma separation)
4. Validate with the health check (Step 6)

If adding a new book entirely, do NOT append it to a category array — ship it as its own `<slug>-data.js` module registered in `externalBooks` (see CLAUDE.md).

### Update the book's header scalars

A book header carries `lessons`, `duration` and `cards`, and `app.js` renders all
three on the book card. They are NOT derived at runtime — if you add a lesson and
leave them alone, the book advertises the wrong numbers forever.

After adding or removing a lesson, set:

| field | value |
|-------|-------|
| `lessons` | `lessonList.length` |
| `duration` | sum of every lesson's `duration` |
| `cards` | total cards across every lesson |

All 22 `figure-*` books were expanded 6 -> 12 lessons without this and displayed
"6 lessons / 120 min" for months. The health check in Step 6 catches it.

---

## Step 6 — Validate

```bash
cd "C:/Users/kandy/GitHub/synthesis-learning-app"
node --max-old-space-size=8192 tools/healthcheck.cjs
```

This must report **0 errors**. It loads every data module exactly the way
`index.html` does and checks the things that have actually broken before:

- quiz cards the Exam Center cannot harvest (the sibling-key rule above)
- book `lessons` / `duration` / `cards` that disagree with `lessonList`
- quiz cards without exactly one correct option
- cards with no visual
- duplicate lesson ids, and real book-id collisions
- crossword word banks that have fallen behind their book

Warnings are advisory. **Errors are not** — if the run reports any error, fix it
or restore from the Step 2 backup before reporting done. A syntax error shows up
here too, since the file cannot load at all.

---

## Step 7 — Report

Tell the user:
- What lesson was added (title, card count, estimated duration)
- Which book and category it went into
- That they can open `index.html` in the browser to verify it appears correctly
