# Authoring guide: ICD-10-CM Official Guidelines (FY 2027) lessons

You are writing lessons for SYNTHESIS, a study app used by an HIT (Health Information Technology) student preparing for coding exams and the RHIT. The book teaches the **complete FY 2027 ICD-10-CM Official Guidelines for Coding and Reporting**: every section is shown word for word, then broken down so it is easy to learn, then quizzed.

Working directory: `tools/icd10cm-guidelines` (run the commands from there)

## Workflow for each lesson NN you are assigned

1. `python3 build.py show NN` — prints the lesson title, notes, the refs assigned to it, and the **verbatim official text** for each ref. Read all of it before writing.
2. Write `specs/NN.json` (format below). Write the file with a Python script or the Write tool; make sure it is valid JSON (escape quotes and use `\n` for newlines).
3. `python3 build.py check NN` — fix every ERROR and re-run until it prints `OK`.
4. Do not edit `build.py`, `units.py`, `plan.json`, `chunks.json`, `changes.md` or other people's spec files.

## Accuracy rules (most important — the student will be tested on this)

- Base every explanation, example and quiz answer **only on the official text printed by `show`** (or other lessons' text via `show` on their numbers). Do not add rules from memory, coding clinics, payer policy, or other sources. If you are not sure the text supports a statement, leave it out.
- **ICD-10-CM codes:** only cite codes/categories that appear in the official guidelines text. The checker rejects any code not found there. Never invent a code, and never pair a code with a description different from the one in the text.
- No statistics, dates, or facts that are not in the text. No invented quotes.
- Scenarios may describe made-up patients, but the coding conclusion must follow directly from a specific guideline. Name the guideline (e.g., "Section I.A.12.a") in the explanation.
- If the notes mention FY 2027 changes, use only the verified change list that `show` prints.

## Writing style

- Plain, clear English for a first/second-year HIT student. Short sentences. Define jargon the first time.
- Use `**bold**` for key terms, `•` bullets, and blank lines (`\n\n`) between paragraphs. Markdown headings are allowed but rarely needed.
- No hype, no emojis.

## Lesson structure (spec format)

`specs/NN.json`:

```json
{
  "title": "optional override; omit to use the plan title",
  "cards": [ ...cards in display order... ]
}
```

Card types:

1. **Intro** (must be the first card): why this part of the guidelines matters, what the lesson covers.
   `{"type":"intro","title":"...","content":"...","visual":VISUAL}`
2. **Official text**: `{"type":"official","ref":"I.A.12.a"}` — the builder inserts the verbatim text (split into parts if long). **Every assigned ref must appear exactly once, in guideline order.** Include heading-only refs too (the builder skips empty ones).
3. **Breakdown/teaching cards**: `{"type":"concept"|"example"|"application","title":"...","content":"...","visual":VISUAL}`
   - After EACH official card (or small group of very short related refs), add at least one **"In Plain English: …"** concept card that explains the rule: what it says, when it applies, and what it does NOT mean. Long refs (300+ words) need 2–4 breakdown cards, one per sub-rule.
   - Add **example** cards with worked scenarios: the documentation → which guideline applies → the coding/sequencing decision (codes only if they appear in the text).
   - Add "Exam trap" content where students commonly confuse two rules (e.g., Excludes1 vs Excludes2, inpatient vs outpatient uncertain diagnoses).
   - At least one **application** card near the end: numbered steps for applying the lesson's rules on a real record.
   - End with a **"Key Takeaways"** concept card (5–8 bullets) before the final quiz(zes).
4. **Quiz**: `{"type":"quiz","question":"...","options":["A","B","C","D"],"correct":1,"explanation":"...","visual":{"topic":"short topic","hint":"one-sentence hint without giving away the answer"}}`
   - 4 options (3 allowed), exactly one correct (`correct` is the 0-based index). Vary the position of the correct answer.
   - Mix recall ("According to Section I.B.8, …") and scenario questions (documentation → what should the coder do?).
   - The explanation must say why the right answer is right (cite the section) AND why each wrong option is wrong.
   - Place quizzes throughout the lesson, after the material they test — not all at the end.
   - Minimum quiz count is enforced by the checker (at least 3, or one per two non-empty refs). More is better: aim for 1–2 per section taught.

### VISUAL (for intro/concept/example/application cards)

The builder draws the SVG from this spec — you never write SVG.

```json
{"title":"Excludes1 vs Excludes2","sub":"Two notes, two opposite rules","cols":2,
 "boxes":[{"h":"Excludes1","b":"NOT CODED HERE. The two conditions cannot be reported together."},
          {"h":"Excludes2","b":"NOT INCLUDED HERE. Both may be coded when both exist."}]}
```

Limits (the checker enforces them): `title` ≤ 34 characters; `sub` ≤ 70; 1–8 boxes; `cols` 2 (default) or 1. With `cols:2`: box heading ≤ 26 characters and body roughly ≤ 30 characters × the allowed lines (2 rows of boxes ≈ 5 lines; 3 rows ≈ 4 lines; 4 rows ≈ 3 lines). With `cols:1`: heading ≤ 60, body lines ≈ 70 characters. Keep box text short — a diagram summarizes, the card content explains. Make the visual specific to the card (a comparison, a sequence, a decision rule), never generic. Optional `"caption"`.

## Size

College-depth category: no maximum. Typical lesson = 25–60 cards after expansion. Cover every rule in the assigned text; do not skip sub-rules.

## When done

Reply with: lesson numbers completed, card and quiz counts per lesson (from `check`), and any place where the official text was ambiguous or where you chose not to make a claim.
