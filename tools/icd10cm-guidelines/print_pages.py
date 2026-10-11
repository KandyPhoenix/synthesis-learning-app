#!/usr/bin/env python3
"""Render the official guidelines PDF into page images for the book's print appendix.

    python3 tools/icd10cm-guidelines/print_pages.py <guidelines.pdf>

Writes (repo root) icd10cm-print/guidelines.pdf and icd10cm-print/p001.png ... (4-tone greyscale,
about 40 KB a page), and tools/icd10cm-guidelines/print_pages.json, which records which guideline
sections begin on each printed page. build.py turns that into the appendix lesson.
Needs pdftoppm/pdftotext (poppler-utils) and Pillow.
"""
import glob, json, os, re, shutil, subprocess, sys, tempfile
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
OUT = os.path.join(REPO, 'icd10cm-print')


def norm(s):
    return re.sub(r'[^a-z0-9]+', '', s.lower())


def main(pdf):
    os.makedirs(OUT, exist_ok=True)
    for f in glob.glob(os.path.join(OUT, 'p*.png')):
        os.remove(f)
    shutil.copyfile(pdf, os.path.join(OUT, 'guidelines.pdf'))
    with tempfile.TemporaryDirectory() as d:
        subprocess.run(['pdftoppm', '-r', '120', '-gray', '-png', pdf, os.path.join(d, 'p')], check=True)
        pages = sorted(glob.glob(os.path.join(d, 'p-*.png')))
        for i, p in enumerate(pages, 1):
            Image.open(p).quantize(4).save(os.path.join(OUT, f'p{i:03d}.png'), optimize=True)
        txt = os.path.join(d, 'all.txt')
        subprocess.run(['pdftotext', '-layout', pdf, txt], check=True)
        page_text = [norm(t) for t in open(txt, encoding='utf-8').read().split('\f')][:len(pages)]
    # Which sections start on which page: find each section's heading, in order, never moving backwards.
    chunks = json.load(open(os.path.join(HERE, 'chunks.json'), encoding='utf-8'))['chunks']
    body_start = next((i for i, t in enumerate(page_text) if norm('Section I. Conventions, general coding guidelines') in t and i > 2), 0)
    starts = {i + 1: [] for i in range(len(page_text))}
    pg = body_start
    for c in chunks:
        key = norm(c['title'])[:40]
        for j in range(pg, len(page_text)):
            if key and key in page_text[j]:
                pg = j
                starts[j + 1].append([c['id'], c['title']])
                break
    json.dump({'pages': len(page_text), 'starts': starts}, open(os.path.join(HERE, 'print_pages.json'), 'w'), ensure_ascii=False, indent=1)
    placed = sum(len(v) for v in starts.values())
    print(f'{len(page_text)} pages rendered to {OUT}; {placed}/{len(chunks)} section headings placed on pages')


if __name__ == '__main__':
    main(sys.argv[1])
