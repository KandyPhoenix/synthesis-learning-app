#!/usr/bin/env node
// ============================================
// SYNTHESIS — content health check
//
// Catches the classes of problem that have actually bitten this repo, each of
// which was previously found only by accident:
//
//   1. Quiz cards the Exam Center cannot harvest (question/options missing).
//      These display fine and contribute zero exam questions, so nothing
//      surfaces them at runtime.
//   2. Course crossword word banks that have fallen behind their book — a book
//      gains lessons, the puzzle keeps testing only the old material.
//   3. Cards missing a visual.
//   4. Quiz cards without exactly one correct option.
//   5. Books whose `lessons` / `duration` fields disagree with lessonList.
//   6. Duplicate book ids and duplicate lesson ids within a book.
//
// Usage:
//   node tools/healthcheck.cjs           report, exit 1 if any error-level issue
//   node tools/healthcheck.cjs --warn-only   always exit 0
// ============================================

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const WARN_ONLY = process.argv.includes('--warn-only');

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ---- load the full app data the way index.html does -------------------
function loadApp() {
  const sandbox = {
    window: {}, document: { addEventListener() {}, querySelector: () => null },
    localStorage: { getItem: () => '1', setItem() {}, removeItem() {} },
    console: { log() {}, warn() {}, error() {} },
    navigator: { userAgent: '' }, location: { href: '' },
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);

  // External modules must load before data.js, same as index.html.
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"?]+)(?:\?[^"]*)?"><\/script>/g)]
    .map(m => m[1])
    .filter(f => /-data\.js$|^data\.js$|^inline-books-[a-z0-9-]+\.js$/.test(f));

  for (const f of scripts) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) { warn('index.html references a missing file: ' + f); continue; }
    try { vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f }); }
    catch (e) { err(f + ' failed to parse: ' + e.message); }
  }
  try { vm.runInContext('globalThis.__APP = typeof APP_DATA !== "undefined" ? APP_DATA : null;', sandbox); }
  catch (e) { /* ignore */ }
  const D = sandbox.__APP;
  if (!D) { err('APP_DATA did not load'); return null; }

  // NOTE: do NOT call integrateExternalCategories() here — data.js already
  // invokes it at the bottom of the file. Calling it again pushes every
  // external book into its category a second time and produces phantom
  // "duplicate book id" errors.
  return D;
}

const D = loadApp();
if (!D) { report(); process.exit(1); }

// ---- walk every book ---------------------------------------------------
const seenBookIds = new Map();
const crossListed = [];
let totalCards = 0, quizCards = 0, harvestable = 0;

for (const cat of D.categories || []) {
  for (const book of (cat.books || [])) {
    // The SAME book object shelved in two categories is deliberate cross-listing
    // and fine. A real collision is two DIFFERENT book objects sharing an id —
    // that is the bug that made four books unreachable (#361).
    const prior = seenBookIds.get(book.id);
    if (prior) {
      if (prior.book !== book) {
        err('book id COLLISION "' + book.id + '": different books in '
          + prior.cat + ' and ' + cat.id + ' — one will be unreachable');
      } else {
        crossListed.push(book.id + ' (' + prior.cat + ' + ' + cat.id + ')');
      }
      continue; // already validated this object under its first category
    }
    seenBookIds.set(book.id, { cat: cat.id, book });

    const lessons = book.lessonList || [];

    // book scalar fields vs reality
    if (book.lessons !== undefined && Number(book.lessons) !== lessons.length) {
      err(book.id + ': book.lessons=' + book.lessons + ' but lessonList has ' + lessons.length);
    }
    const mins = lessons.reduce((s, l) => s + (parseInt(l.duration, 10) || 0), 0);
    if (book.duration !== undefined && Number(book.duration) !== mins) {
      warn(book.id + ': book.duration=' + book.duration + ' but lessons sum to ' + mins);
    }

    const seenLessonIds = new Set();
    for (const l of lessons) {
      if (l.id === undefined || l.id === null || l.id === '') err(book.id + ': a lesson has no id');
      else if (seenLessonIds.has(String(l.id))) err(book.id + ': duplicate lesson id ' + l.id);
      else seenLessonIds.add(String(l.id));

      for (const [i, card] of (l.cards || []).entries()) {
        totalCards++;
        const at = book.id + ' / lesson ' + l.id + ' / card[' + i + ']';

        if (!card.visual || !card.visual.svg) warn(at + ': no visual');

        if (card.type === 'quiz') {
          quizCards++;
          if (card.question && card.options) {
            harvestable++;
            const n = card.options.filter(o => o && o.correct).length;
            if (n !== 1) err(at + ': ' + n + ' correct options (need exactly 1)');
            if (card.options.length < 3) warn(at + ': only ' + card.options.length + ' options');
            if (!card.explanation) warn(at + ': no explanation');
          } else {
            err(at + ': quiz card is NOT harvestable by the Exam Center '
              + '(needs sibling question + options; content-only quizzes yield no exam questions)');
          }
        }
      }
    }
  }
}

// ---- crossword word banks vs their books -------------------------------
const bankDir = path.join(ROOT, 'tools', 'word-banks');
const puzzleFile = path.join(ROOT, 'him-course-crossword-data.js');
if (fs.existsSync(bankDir) && fs.existsSync(puzzleFile)) {
  const sb = { window: {} };
  vm.createContext(sb);
  try {
    vm.runInContext(fs.readFileSync(puzzleFile, 'utf8'), sb);
  } catch (e) { warn('could not load ' + path.basename(puzzleFile) + ': ' + e.message); }
  const puzzles = sb.window.CROSSWORD_HIM_COURSE_PUZZLES || [];

  for (const p of puzzles) {
    // course-hitt-1211 -> cwb-hitt-1211.js
    const slug = String(p.id).replace(/^course-/, '');
    const bankPath = path.join(bankDir, 'cwb-' + slug + '.js');
    if (!fs.existsSync(bankPath)) continue;

    let bank;
    try { bank = vm.runInNewContext('(' + fs.readFileSync(bankPath, 'utf8') + ')'); }
    catch (e) { err('cwb-' + slug + '.js failed to parse: ' + e.message); continue; }

    if (bank.length !== p.wordCount) {
      warn('crossword "' + p.id + '" has ' + p.wordCount + ' words but its bank has '
        + bank.length + ' entries — regenerate with tools/gen-him-crosswords.cjs');
    }

    // Does the book have lessons the bank never mentions?
    const book = [...seenBookIds.keys()].includes(slug)
      ? (D.categories.flatMap(c => c.books || []).find(b => b.id === slug))
      : null;
    if (book) {
      const bankText = fs.readFileSync(bankPath, 'utf8').toLowerCase();
      const missing = (book.lessonList || []).filter(l => {
        const words = String(l.title).toLowerCase().match(/[a-z]{5,}/g) || [];
        return words.length && !words.some(w => bankText.includes(w));
      });
      if (missing.length) {
        warn('crossword bank cwb-' + slug + '.js may not cover ' + missing.length
          + ' lesson(s): ' + missing.slice(0, 3).map(l => '"' + l.title + '"').join(', ')
          + (missing.length > 3 ? ' …' : ''));
      }
    }
  }
}

function report() {
  console.log('SYNTHESIS content health check');
  console.log('  books ' + seenBookIds.size + '  cards ' + totalCards
    + '  quiz ' + quizCards + '  harvestable ' + harvestable);
  console.log('');
  if (errors.length) {
    console.log('ERRORS (' + errors.length + '):');
    errors.slice(0, 40).forEach(e => console.log('  x ' + e));
    if (errors.length > 40) console.log('  … and ' + (errors.length - 40) + ' more');
    console.log('');
  }
  if (warnings.length) {
    console.log('WARNINGS (' + warnings.length + '):');
    warnings.slice(0, 25).forEach(w => console.log('  ! ' + w));
    if (warnings.length > 25) console.log('  … and ' + (warnings.length - 25) + ' more');
    console.log('');
  }
  console.log(errors.length ? 'FAILED' : (warnings.length ? 'PASSED with warnings' : 'PASSED'));
}

report();
process.exit(errors.length && !WARN_ONLY ? 1 : 0);
