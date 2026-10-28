# HIM Billing Desk: Codes by Provider Type

Builds `him-billing-desk-data.js` (book id `him-billing-desk`, global `HIM_BILLING_DESK_BOOK`, category `him`).
Each lesson is one provider type or billing topic (lesson 1: LCSW). It uses the same card format and builder as the
Uncommon Conditions casebook; see `tools/him-uncommon-conditions/README.md` for the card format.

| File | What it is |
|------|------------|
| `book.json` | Book id, title, description, global and output file. |
| `cases/NN-<slug>.json` | One lesson each, id `billdesk-N`, `duration` a number in minutes. |
| `../../downloads/lcsw-payer-code-matrix.docx` | The Word worksheet that lesson 1's first card links to. |

```bash
python3 tools/him-uncommon-conditions/build.py --dir tools/him-billing-desk
node --max-old-space-size=8192 tools/healthcheck.cjs
```

A card can show a download/open button with `"visual": {"link": {"title", "sub", "button", "href"}, "caption"}`.
Rules: Medicare items cite the CMS manual section; anything payer-specific or not verified goes on a
"What We Could Not Confirm" card. Bump the `him-billing-desk-data.js?v=` cache-buster in `index.html` after a rebuild.
