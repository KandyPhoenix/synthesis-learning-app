#!/usr/bin/env python3
"""Check CMS for a newer ICD-10-CM Official Guidelines PDF and, if one is out,
regenerate the book's verbatim "Official Text" cards from it.

Run by .github/workflows/icd10cm-guidelines-watch.yml (weekly), or by hand:
    python3 tools/icd10cm-guidelines/watch.py            # check + update files
    python3 tools/icd10cm-guidelines/watch.py --dry-run  # check only

Needs `pdftotext` (poppler-utils). Writes these GitHub Actions outputs:
    changed=true|false   fy=2028   updated=<date>   status=rebuilt|needs-restructure
    report=<path to the markdown change report>

What it can and cannot do automatically
- It CAN replace the official text word for word (it comes straight from the PDF)
  and produce an exact list of which sections changed.
- It CANNOT rewrite the plain-English explanations, examples and quizzes. Lessons
  whose sections changed are listed in the report for review (see README.md).
"""
import hashlib, json, os, re, subprocess, sys, tempfile, urllib.request, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
CMS_PAGE = 'https://www.cms.gov/medicare/coding-billing/icd-10-codes'
UA = {'User-Agent': 'Mozilla/5.0 (synthesis-learning-app guideline watcher)'}
DRY = '--dry-run' in sys.argv


def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read()


def out(**kw):
    path = os.environ.get('GITHUB_OUTPUT')
    for k, v in kw.items():
        print(f'{k}={v}')
        if path:
            with open(path, 'a') as f:
                f.write(f'{k}={v}\n')


def pdf_text(pdf_bytes, first_page_only=False):
    with tempfile.TemporaryDirectory() as d:
        p = os.path.join(d, 'g.pdf'); t = os.path.join(d, 'g.txt')
        open(p, 'wb').write(pdf_bytes)
        args = ['pdftotext', '-layout'] + (['-l', '1'] if first_page_only else []) + [p, t]
        subprocess.run(args, check=True)
        return open(t, encoding='utf-8').read()


def header_info(text):
    m = re.search(r'FY (\d{4})\s*--\s*UPDATED ([A-Za-z]+ \d{1,2}, \d{4})', text)
    e = re.search(r'\(([A-Za-z]+ \d{1,2}, \d{4})\s*-\s*([A-Za-z]+ \d{1,2}, \d{4})\)', text)
    if not m:
        return None
    upd = datetime.datetime.strptime(m.group(2), '%B %d, %Y').date()
    return {'fy': int(m.group(1)), 'updated': m.group(2), 'updated_date': upd.isoformat(),
            'effective_from': e.group(1) if e else '', 'effective_to': e.group(2) if e else ''}


def discover(current):
    html = fetch(CMS_PAGE).decode('utf-8', 'ignore')
    links = sorted(set(re.findall(r'href="(/files/document/[^"]+?\.pdf)"', html)))
    cands = [l for l in links if 'icd-10-cm' in l.lower() and 'guideline' in l.lower() and 'pcs' not in l.lower()]
    if not cands:
        raise SystemExit('ERROR: no ICD-10-CM guideline PDFs found on the CMS page; the page layout may have changed.')
    def fy_of(l):
        m = re.search(r'(?:fy-?)?(20\d\d)', l)
        return int(m.group(1)) if m else 0
    # Only look at this fiscal year and later; the PDF header decides which is newest.
    urls = ['https://www.cms.gov' + l for l in cands if fy_of(l) >= current['fy']]
    if current['url'] not in urls:
        urls.append(current['url'])
    best = None
    for u in urls:
        try:
            b = fetch(u)
        except Exception as ex:  # a dead link should not stop the check
            print('skip', u, ex); continue
        info = header_info(pdf_text(b, first_page_only=True))
        if not info:
            print('skip (no FY header)', u); continue
        info.update(url=u, sha256=hashlib.sha256(b).hexdigest(), bytes=len(b), _pdf=b)
        key = (info['fy'], info['updated_date'])
        if best is None or key > (best['fy'], best['updated_date']):
            best = info
    if not best:
        raise SystemExit('ERROR: could not read any guideline PDF header.')
    return best


def sentences(paras):
    t = ' '.join(p.replace('**', '') for p in paras)
    return [s.strip() for s in re.split(r'(?<=[.;:])\s+(?=[A-Z(“])', t) if s.strip()]


def diff(old, new):
    a = {c['id']: c for c in old['chunks']}; b = {c['id']: c for c in new['chunks']}
    added = [k for k in b if k not in a]; removed = [k for k in a if k not in b]
    changed = {}
    for k in b:
        if k not in a:
            continue
        ent = {}
        if a[k]['title'] != b[k]['title']:
            ent['title'] = (a[k]['title'], b[k]['title'])
        sa, sb = sentences(a[k]['paras']), sentences(b[k]['paras'])
        gone = [s for s in sa if s not in set(sb)]; new_ = [s for s in sb if s not in set(sa)]
        if gone or new_:
            ent['removed'] = gone; ent['added'] = new_
        if ent:
            changed[k] = ent
    if old.get('preface') != new.get('preface'):
        sa, sb = sentences(old['preface']), sentences(new['preface'])
        changed['PREFACE'] = {'removed': [s for s in sa if s not in set(sb)], 'added': [s for s in sb if s not in set(sa)]}
    return added, removed, changed


def main():
    src = json.load(open(os.path.join(HERE, 'source.json')))
    latest = discover(src)
    print(f"current: FY {src['fy']} updated {src['updated']}  sha {src['sha256'][:12]}")
    print(f"latest : FY {latest['fy']} updated {latest['updated']}  sha {latest['sha256'][:12]}  {latest['url']}")
    if latest['sha256'] == src['sha256'] or (latest['fy'], latest['updated_date']) < (src['fy'], datetime.datetime.strptime(src['updated'], '%B %d, %Y').date().isoformat()):
        out(changed='false'); return
    if DRY:
        out(changed='true', fy=latest['fy'], updated=latest['updated'], status='dry-run'); return

    # 1) Parse the new PDF into sections (same parser that built the book).
    with tempfile.TemporaryDirectory() as d:
        txt = os.path.join(d, 'g.txt'); open(txt, 'w', encoding='utf-8').write(pdf_text(latest['_pdf']))
        newchunks = os.path.join(d, 'chunks.json')
        subprocess.run([sys.executable, os.path.join(HERE, 'parse.py'), txt, newchunks], check=True, stdout=subprocess.DEVNULL)
        new = json.load(open(newchunks, encoding='utf-8'))
    old = json.load(open(os.path.join(HERE, 'chunks.json'), encoding='utf-8'))
    added, removed, changed = diff(old, new)

    # 2) Save the new text, the version record, and an exact change list.
    json.dump(new, open(os.path.join(HERE, 'chunks.json'), 'w'), ensure_ascii=False, indent=1)
    oldlabel = f"FY {src['fy']} (updated {src['updated']})"
    newlabel = f"FY {latest['fy']} (updated {latest['updated']})"
    lines = [f'Verified by comparing the {newlabel} guidelines with the {oldlabel} guidelines, section by section. '
             'Only these differences were found; do not claim any others.']
    for k in added: lines.append(f'- NEW section {k}: {next(c["title"] for c in new["chunks"] if c["id"] == k)}')
    for k in removed: lines.append(f'- REMOVED section {k}: {next(c["title"] for c in old["chunks"] if c["id"] == k)}')
    for k, e in changed.items():
        if 'title' in e: lines.append(f'- Section {k} title: "{e["title"][0]}" -> "{e["title"][1]}"')
        for s in e.get('added', []): lines.append(f'- Section {k} now reads: "{s}"')
        for s in e.get('removed', []): lines.append(f'- Section {k} no longer reads: "{s}"')
    open(os.path.join(HERE, 'changes.md'), 'w').write('\n'.join(lines) + '\n')
    src_new = {k: latest[k] for k in ('fy', 'updated', 'effective_from', 'effective_to', 'url', 'sha256', 'bytes')}
    json.dump(src_new, open(os.path.join(HERE, 'source.json'), 'w'), indent=1)

    # 3) Which lessons does this touch?
    sys.path.insert(0, HERE)
    from units import load
    U = load(); plan = json.load(open(os.path.join(HERE, 'plan.json')))
    planned = {r for l in plan for r in l[2]}
    unplanned = [k for k in U if k not in planned]; missing = [r for r in planned if r not in U]
    touched = {k.split('.c.')[0] if k.startswith('I.C.21.c') else k for k in list(changed) + added + removed}
    affected = []
    for l in plan:
        refs = set(l[2]); hit = [r for r in refs if r in touched or any(r.startswith('I.C.21.c') and t == 'I.C.21.c' for t in touched)]
        spec = open(os.path.join(HERE, 'specs', f'{l[0]}.json'), encoding='utf-8').read()
        if hit or f"FY {src['fy']}" in spec or f"FY{src['fy']}" in spec:
            affected.append((l[0], l[1], sorted(hit)))

    status = 'needs-restructure' if (unplanned or missing) else 'rebuilt'
    build_errors = ''
    if status == 'rebuilt':
        r = subprocess.run([sys.executable, os.path.join(HERE, 'build.py'), 'book'], capture_output=True, text=True)
        print(r.stdout[-2000:], r.stderr[-2000:])
        if r.returncode != 0:
            status = 'build-failed'
            build_errors = r.stdout[-3000:]
        else:
            idx = os.path.join(REPO, 'index.html'); h = open(idx, encoding='utf-8').read()
            h = re.sub(r'icd10cm-guidelines-fy2027-data\.js\?v=[0-9a-z]+', 'icd10cm-guidelines-fy2027-data.js?v=' + datetime.date.today().strftime('%Y%m%d') + 'g', h)
            open(idx, 'w', encoding='utf-8').write(h)

    # 4) Report for the PR / issue.
    rep = [f"## New ICD-10-CM Official Guidelines: {newlabel}", '',
           f"Source: {latest['url']}  ",
           f"Effective {latest['effective_from']} – {latest['effective_to']}. Replaces {oldlabel}.", '',
           '**Status:** ' + {'rebuilt': 'Official Text cards regenerated word for word; the book builds.',
                             'needs-restructure': 'Sections were added, removed or renumbered, so the lesson plan needs updating before the book can be rebuilt. Only the source text was updated.',
                             'build-failed': 'The new text was saved, but the book did not rebuild (usually a teaching card cites a code or section that changed). Build output is below.'}[status], '',
           f"### Sections that changed ({len(changed)} changed, {len(added)} new, {len(removed)} removed)", '']
    rep += [l for l in lines[1:]] or ['(none)']
    if unplanned: rep += ['', '**New sections not yet in any lesson:** ' + ', '.join(unplanned)]
    if missing: rep += ['', '**Lesson plan refers to sections that no longer exist:** ' + ', '.join(missing)]
    rep += ['', '### Lessons whose explanations and quizzes need review', '',
            'The official text updates automatically. The plain-English cards, examples and quizzes below were written for the old text, '
            'and any card that says "FY ' + str(src['fy']) + '" needs its year and change list refreshed. '
            'Ask Claude: *"Update the ICD-10-CM guidelines lessons for the new version (see tools/icd10cm-guidelines/README.md)."*', '']
    rep += [f"- Lesson {n}: {t}" + (f" — sections {', '.join(h)}" if h else ' — mentions the old fiscal year') for n, t, h in affected] or ['(none)']
    if build_errors: rep += ['', '### Build output', '', '```', build_errors, '```']
    text = '\n'.join(rep) + '\n'
    if len(text) > 50000:  # GitHub caps PR/issue bodies at 65,536 characters
        keep = [l for l in rep if not l.startswith('- Section ')]
        text = '\n'.join(keep).replace('### Lessons whose', f'(The full list of {sum(1 for l in rep if l.startswith("- Section "))} changed sentences is in tools/icd10cm-guidelines/changes.md.)\n\n### Lessons whose', 1) + '\n'
    rp = os.path.join(HERE, 'last-update-report.md'); open(rp, 'w').write(text)
    out(changed='true', fy=latest['fy'], updated=latest['updated'].replace(' ', '-').replace(',', ''), status=status, report=os.path.relpath(rp, REPO))


if __name__ == '__main__':
    main()
