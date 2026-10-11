import re, json, sys
# Usage: python3 parse.py <layout text from pdftotext -layout> <out chunks.json>
raw=open(sys.argv[1],encoding='utf-8').read().replace('\x0c','\n').split('\n')
# drop page header/footer triplets
lines=[];i=0
while i<len(raw):
    s=raw[i].strip()
    if s=='ICD-10-CM Official Guidelines for Coding and Reporting' and i+2<len(raw) and re.match(r'FY 20\d\d',raw[i+1].strip()) and re.match(r'Page \d+ of \d+$',raw[i+2].strip()):
        while lines and lines[-1].strip()=='': lines.pop()
        lines.append('\x00PB'); i+=3
        while i<len(raw) and raw[i].strip()=='': i+=1
        continue
    lines.append(raw[i].rstrip()); i+=1
# preface: from top to the TOC heading line
toc=next(i for i,l in enumerate(lines) if re.match(r'\s*ICD-10-CM Official Guidelines for Coding and Reporting \.{4}',l))
start=next(i for i,l in enumerate(lines) if l.strip().startswith('Section I. Conventions') and '....' not in l)
pre=lines[:toc]; body=lines[start:]
SEC=re.compile(r'^Section (I|II|III|IV)\.\s+(.*)$')
LET=re.compile(r'^([A-Z])\.\s+(\S.*)$')
NUM=re.compile(r'^(\d{1,2})\.\s+(\S.*)$')
LOW=re.compile(r'^([a-z])\.\s+(\S.*)$')
items=[]; last={}  # last label seen per level, for sequence checks
def seq_ok(level,label):
    prev=last.get(level)
    if level in (2,4):
        exp='a' if level==4 else 'A'
        return (prev is None and label==exp) or (prev is not None and ord(label)==ord(prev)+1)
    if level==3:
        return (prev is None and label=='1') or (prev is not None and int(label)==int(prev)+1)
    return True
def reset_below(level):
    for k in list(last):
        if k>level: del last[k]
n=len(body);i=0
def title_cont(i,t):
    # heading titles that wrap: continuation line is next line, non-blank, and the title has an open paren or ends without terminal punct and next starts lowercase/paren
    j=i+1
    if j<n and body[j].strip() and body[j].strip()!='\x00PB':
        nx=body[j].strip()
        if (t.count('(')>t.count(')')) or (nx[:1].islower() and len(nx)<70) or (t.endswith(',') ) or re.match(r'^[A-Z0-9]\d?\d?[\.\-]',nx) and t.count('(')>t.count(')'):
            return t+' '+nx, j
    return t, i
while i<n:
    s=body[i].strip()
    m=SEC.match(s)
    if m and '....' not in s:
        t,i2=title_cont(i,m.group(2)); last.clear(); last[1]=m.group(1)
        items.append(('H',1,'Section '+m.group(1),t)); i=i2+1; continue
    if s=='Present on Admission Reporting Guidelines' and i>3000:
        while items and items[-1][0]=='T' and items[-1][1].strip() in ('','Appendix I','\x00PB'): items.pop()
        last.clear(); items.append(('H',1,'Appendix I',s)); i+=1; continue
    for lvl,rx in ((2,LET),(3,NUM),(4,LOW)):
        m=rx.match(s)
        if m and len(m.group(2))<150 and seq_ok(lvl,m.group(1)):
            t,i2=title_cont(i,m.group(2))
            last[lvl]=m.group(1); reset_below(lvl)
            items.append(('H',lvl,m.group(1),t)); i=i2+1; break
    else:
        items.append(('T',body[i])); i+=1
chunks=[];path={}
for it in items:
    if it[0]=='H':
        lvl,label,title=it[1],it[2],it[3]; path[lvl]=label
        for k in list(path):
            if k>lvl: del path[k]
        ids=[path[k] for k in sorted(path)]
        sec=ids[0].replace('Section ','').replace('Appendix I','APP')
        chunks.append({'id':'.'.join([sec]+ids[1:]),'level':lvl,'title':title.rstrip(':'),'lines':[]})
    else: chunks[-1]['lines'].append(it[1])
SUB=re.compile(r'^(\d{1,2}\)|\([a-z]\)|\([ivx]+\)|[a-z]\.)\s+(\S.*)$')
LBL=re.compile(r'^(\S{1,14}(?: \S{1,6})?)\s{3,}(\S.*)$')
def blocks(ls):
    out=[];cur=[]
    for l in ls:
        st=l.strip()
        if st=='':
            if cur: out.append(cur); cur=[]
            continue
        if l=='\x00PB': continue
        if cur and (SUB.match(st) or st.startswith(', ')):
            out.append(cur); cur=[]
        cur.append(l)
    if cur: out.append(cur)
    return out
def titleish(t,nxt):
    return len(t)<70 and not re.search(r'[\.,;:]$',t) and nxt[:1].isupper() and not SUB.match(t)
CODEROW=re.compile(r'^([A-Z]\d[\dA-Z][\w.\-]*(?:-[A-Z]?\d[\w.\-]*)?,?)\s{2,}(\S.*)$')
def J(parts):
    """Join wrapped lines; a line ending in a hyphen continues the same word (e.g. BIA-|ALCL, COVID-|19),
    except a code ending in a dash (T86.1-) followed by an ordinary word."""
    out=''
    for x in parts:
        if not out: out=x; continue
        if re.search(r'[A-Za-z0-9]-$',out) and not (re.search(r'[A-Z]\d[0-9A-Z]*\.[0-9A-Z]*-$|[A-Z]\d\d-$',out) and re.match(r'[A-Z][a-z]',x)):
            out+=x
        else: out+=' '+x
    return out
def render(ls):
    paras=[]
    for b in blocks(ls):
        b=[x.strip() for x in b]
        if sum(1 for x in b if CODEROW.match(x))>=1:
            pre=[];rows=[]
            for x in b:
                m=CODEROW.match(x)
                if m: rows.append('**'+m.group(1)+'** '+m.group(2))
                elif rows: rows[-1]+=' '+x
                else: pre.append(x)
            if pre: paras.append(J(pre))
            paras.append('\n'.join('• '+r for r in rows)); continue
        # leading unnumbered title lines
        while len(b)>1 and titleish(b[0],b[1]) and not LBL.match(b[0]):
            paras.append('**'+b[0]+'**'); b=b[1:]
        first=b[0]; rest=b[1:]
        if len(b)==1 and titleish(first,'X') and not LBL.match(first) and not SUB.match(first):
            paras.append('**'+first+'**'); continue
        if first.startswith(', '):
            paras.append('**,** — '+J([first[2:]]+rest)); continue
        m=SUB.match(first)
        if m and not rest and not first.endswith('.') and len(first)<100:
            paras.append('**'+first+'**'); continue
        if m:
            head=m.group(1)+' '+m.group(2)
            if rest and rest[0][:1].isupper() and not head.endswith('.'):
                paras.append('**'+head+'**')
                if rest: paras.append(J(rest))
            else:
                paras.append(J([head]+rest))
            continue
        m=LBL.match(first)
        if m and (not first.endswith('.') or len(m.group(1))<=6):
            paras.append('**'+m.group(1)+'** — '+J([m.group(2)]+rest)); continue
        paras.append(J([first]+rest))
    return [re.sub(r'[ \t]+',' ',p).strip() for p in paras]
for c in chunks:
    c['paras']=render(c.pop('lines')); c['words']=sum(len(p.split()) for p in c['paras'])
prefp=render(pre)
json.dump({'preface':prefp,'chunks':chunks},open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
for c in chunks: print(f"{c['id']:<14}{c['words']:>6}  {'  '*(c['level']-1)}{c['title'][:90]}")
print(sum(c['words'] for c in chunks),'body words;',sum(len(p.split()) for p in prefp),'preface')
