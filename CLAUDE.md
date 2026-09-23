# Synthesis Learning App — Claude Instructions

## FIRST THING TO DO
Before making ANY changes to this app, ALWAYS read these files first:
1. `docs/LESSON-CREATION-STANDARDS.md` — The gold standard for all book/lesson/card creation
2. `docs/BOOK-CREATION-TEMPLATE.md` — Step-by-step playbook for creating new books

These files define ALL requirements: card minimums, SVG standards, color palette, text padding rules, college-depth category rules, and quality checklists.

## Key Architecture
- **Static HTML/JS app** — no build system, no package.json
- **Main data file**: `data.js` (loaded via `<script>` tag in `index.html`) — now only
  ~130 KB: the `APP_DATA` skeleton (categories, user state, settings) plus
  `integrateExternalCategories()`.
- **Legacy inline books** live in `inline-books-<category-id>.js` (one file per
  category, split out of data.js verbatim on 2026-09-23). Each sets
  `window.SYN_INLINE_BOOKS["<category-id>"] = [ ...books ]`, and the category's
  `books` in data.js reads that array back **in place**, so shelf order is unchanged.
  To edit an older book, edit it in its category's `inline-books-*.js` file.
  These files deliberately do NOT end in `-data.js`, so `gen-book-added-on.cjs`
  does not treat the old books as new.
- Do NOT edit `booksData.ts` — it's unused TypeScript source
- App renders from `APP_DATA.categories` in `data.js`

## File size: GitHub's 100 MB hard cap (50 MB warning)
GitHub rejects any file over **100 MB**. data.js hit 99.5 MB in Aug 2026 and 57 MB
in Sep 2026 before being split. Largest file is now an `inline-books-*.js` at ~8 MB.
**Never add a new book inline** (not to data.js, not to an inline-books file).
New books ship as their own external module:

1. Write the book to `<book-id>-data.js` in the repo root, assigning a single global:
   ```javascript
   window.MY_BOOK = { id: "...", title: "...", category: "him", lessonList: [...] };
   ```
2. Register it in the `externalBooks` array inside `integrateExternalCategories()`
   in `data.js`: `{ global: 'MY_BOOK', categoryId: 'him' }`
3. Add a `<script>` tag in `index.html` **before** the `data.js` tag.
4. After committing, run `node tools/gen-book-added-on.cjs` and commit the
   regenerated `book-added-on-data.js`. It reads git for the commit that added
   each book module, and "What's New" on the home page sorts on it — a book with
   no entry never shows up there. Run it *after* the commit, since that is where
   the date comes from.

A missing global is skipped safely, so the app still loads if a module is absent.

## Home-page shelves
`SHELF_SIZE` in `data.js` sets how many books Trending, Featured Picks and
What's New each show — change it once and all three follow. Trending rotates
every 3 days and Featured daily, both over the whole library; Featured excludes
whatever is on Trending so no cover appears twice.

## Data Structure
```
APP_DATA.categories[] → books[] → lessonList[] → cards[]
```
- Card types: intro, concept, visual, example, quiz, application, quote
- EVERY card must have `visual: { type: "diagram", svg: \`<svg>...</svg>\`, caption: "..." }`
- Quiz cards: `{ type: "quiz", question, options: [{text, correct}], explanation, visual }`

## College-Depth Categories (NO limits)
These categories have NO lesson maximum and NO card maximum:
- `him` (Health Information Management)
- `data-analytics` (Data Analytics & Microsoft 365)
- `anatomy-physiology` (Anatomy & Physiology)
- Medical Coding (within `him`)

## Workflow for Recreating a Book
1. Write lessons to temp files (use parallel agents for speed)
2. Assemble into one file, validate with `new vm.Script()`
3. Find old book boundaries in data.js (brace-depth tracking)
4. Splice new content in, verify comma between books
5. Clean up temp files, open app to test
