# ICD-10-CM Official Guidelines book: source, build and updates

This folder builds `icd10cm-guidelines-fy2027-data.js` (book id `icd10cm-guidelines-fy2027`).
The file name and book id never change, so saved progress survives yearly updates; the title shows the current fiscal year.

| File | What it is |
|------|------------|
| `source.json` | The guidelines PDF the book is built from (fiscal year, "updated" date, effective dates, URL, SHA-256). |
| `chunks.json` | The PDF's text split into its numbered sections (I.A.1 … Appendix I), verbatim. Made by `parse.py`. |
| `units.py` | Loads `chunks.json` as addressable sections (splits the long Z-code section into 5 parts). |
| `plan.json` | Which sections each of the 39 lessons covers. |
| `specs/NN.json` | Each lesson's teaching cards (plain-English breakdowns, examples, quizzes) plus `{"type":"official","ref":...}` placeholders. |
| `build.py` | Turns specs + official text into the book module and validates it. |
| `changes.md` | The verified list of what changed versus the previous version. Lessons may only teach these as "what's new". |
| `watch.py` | Checks cms.gov for a newer PDF and updates everything that can be updated automatically. |
| `AGENT_GUIDE.md` | Rules for writing or revising lesson specs (accuracy rules, card formats, visual limits). |

## Commands

```bash
python3 tools/icd10cm-guidelines/build.py show 18     # print lesson 18's official text and notes
python3 tools/icd10cm-guidelines/build.py check 18    # validate specs/18.json
python3 tools/icd10cm-guidelines/build.py book        # rebuild the book module
python3 tools/icd10cm-guidelines/watch.py --dry-run   # is there a newer PDF on cms.gov?
```

`build.py` enforces: every section appears exactly once as official text, in order; every ICD-10-CM code cited in a teaching or quiz card exists in the official text; one correct answer per quiz; diagram text fits its boxes.

## Automatic updates

`.github/workflows/icd10cm-guidelines-watch.yml` runs `watch.py` every Monday (and on demand from the Actions tab).
It looks at every ICD-10-CM guideline PDF linked from https://www.cms.gov/medicare/coding-billing/icd-10-codes, reads the
"FY YYYY -- UPDATED <date>" line on page 1, and picks the newest. If that is newer than `source.json`, it:

1. re-parses the new PDF into `chunks.json` (verbatim official text),
2. writes `changes.md` from a section-by-section comparison with the old text,
3. rebuilds the book if the section list still matches `plan.json`,
4. opens a draft pull request and an issue containing the change report and the list of lessons to review.

It does **not** merge anything and it does **not** rewrite explanations or quizzes.

## Finishing an update (teaching cards)

For each lesson listed in the report:

1. `python3 tools/icd10cm-guidelines/build.py show NN` and read the changed sections.
2. Edit `specs/NN.json` so every explanation, example and quiz matches the new text (follow `AGENT_GUIDE.md`; only claim changes that appear in `changes.md`).
3. Update any card that names the old fiscal year (lesson 01's "What changed" card, and lessons whose notes mention FY changes).
4. If sections were added or removed (`status=needs-restructure`), add or remove the refs in `plan.json` first.
5. `build.py check NN` for each edited lesson, then `build.py book`, then `node --max-old-space-size=8192 tools/healthcheck.cjs`.
6. Commit to the update branch, merge the PR, and confirm the live site serves the new version.
