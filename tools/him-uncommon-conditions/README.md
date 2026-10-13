# HIM Casebook: Uncommon Conditions

This folder builds `him-uncommon-conditions-data.js` (book id `him-uncommon-conditions`, global
`HIM_UNCOMMON_CONDITIONS_BOOK`, category `him`). Each case is a coding situation that comes up rarely,
such as a complaint seen outside the usual specialty, and is written up as one lesson.

| File | What it is |
|------|------------|
| `cases/NN-<slug>.json` | One case = one lesson: `id` (`uncommon-N`), `title`, `short`, `duration` (a number, in minutes), `cards`. |
| `build.py` | Turns the cases into the book module. Diagrams use the same renderer and size limits as `tools/icd10cm-guidelines/build.py`. |

## Adding a case

1. Copy `cases/01-jaw-pain.json` to `cases/NN-<slug>.json` and give it the next id (`uncommon-N`).
2. Write the cards. Content cards are `intro`, `concept`, `example` or `application`, each with a diagram
   spec (`{title, sub, cols, boxes:[{h,b}]}`). Quiz cards are `{question, options[], correct, explanation, visual:{topic, hint}}`.
3. Cite only codes and guideline text you checked in the current CMS files. Quote guideline sections by number.
   Put anything you could not confirm (payer policy, scope of practice, CPT details) on a "What We Could Not Confirm" card.
4. Build and check every cited code against the CMS code list:
   ```bash
   python3 tools/him-uncommon-conditions/build.py --codes <path>/icd10cm_order_YYYY.txt
   node --max-old-space-size=8192 tools/healthcheck.cjs
   ```
   `icd10cm_order_YYYY.txt` is in CMS's "Code Descriptions in Tabular Order" zip, on
   https://www.cms.gov/medicare/coding-billing/icd-10-codes.
5. Bump the `him-uncommon-conditions-data.js?v=` cache-buster in `index.html`.
