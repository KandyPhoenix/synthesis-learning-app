#!/usr/bin/env python3
"""ICD-10-CM Guidelines book builder.
  python3 build.py show NN        -> print the official text assigned to lesson NN
  python3 build.py check NN       -> validate specs/NN.json (exit 1 on errors)
  python3 build.py book           -> validate all and write the book module
"""
import json, re, sys, os, math
HERE=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,HERE)
from units import load
U=load(); PLAN={l[0]:l for l in json.load(open(os.path.join(HERE,'plan.json')))}
ALLTEXT=' '.join(' '.join(u['paras'])+' '+u['title'] for u in U.values())
CODES_IN_SOURCE=set(re.findall(r'\b[A-Z]\d[0-9A-Z](?:\.[0-9A-Z]{1,4})?',ALLTEXT))
CHANGES=open(os.path.join(HERE,'changes.md')).read()
SRC=json.load(open(os.path.join(HERE,'source.json')))
FY=f"FY {SRC['fy']}"
REPO=os.path.dirname(os.path.dirname(HERE))
OUT=os.path.join(REPO,'icd10cm-guidelines-fy2027-data.js')  # file name and book id stay fixed so saved progress survives updates
C={'indigo':['#6366f1','rgba(99,102,241,0.15)'],'violet':['#8b5cf6','rgba(139,92,246,0.15)'],'green':['#10b981','rgba(16,185,129,0.15)'],
   'amber':['#f59e0b','rgba(245,158,11,0.15)'],'blue':['#3b82f6','rgba(59,130,246,0.15)'],'pink':['#ec4899','rgba(236,72,153,0.1)'],
   'teal':['#14b8a6','rgba(20,184,166,0.15)'],'red':['#ef4444','rgba(239,68,68,0.1)']}
ORDER=['indigo','violet','green','amber','blue','pink','teal','red']
esc=lambda s:str(s).replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
def wrap(t,mx):
    out=[];line=''
    for w in str(t).split():
        if len((line+' '+w).strip())>mx:
            if line: out.append(line)
            line=w
        else: line=(line+' '+w).strip()
    if line: out.append(line)
    return out
class Overflow(Exception): pass
def grid(title,sub,boxes,cols=2):
    if len(title)>34: raise Overflow(f'visual title too long (max 34 chars): "{title}"')
    if sub and len(sub)>70: raise Overflow(f'visual sub too long (max 70 chars): "{sub}"')
    if not 1<=len(boxes)<=8: raise Overflow('visual needs 1-8 boxes')
    s=('<svg viewBox="0 0 1100 1100" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>'
       f'<text x="550" y="70" fill="#ffd700" font-size="36" text-anchor="middle" font-weight="bold" font-family="Arial,sans-serif">{esc(title)}</text>'
       +(f'<text x="550" y="115" fill="#cbd5e1" font-size="22" text-anchor="middle" font-family="Arial,sans-serif">{esc(sub)}</text>' if sub else ''))
    top,gap,W=160,24,1000; bw=(W-gap)/2 if cols==2 else W; mx=30 if cols==2 else 70; hmx=26 if cols==2 else 60
    rows=[boxes[i:i+cols] for i in range(0,len(boxes),cols)]
    rh=min((1100-top-40-gap*(len(rows)-1))//len(rows),300); used=len(rows)*rh+gap*(len(rows)-1); y0=top+(1100-top-40-used)//2
    for ri,row in enumerate(rows):
        y=y0+ri*(rh+gap)
        for ci,bx in enumerate(row):
            st,fi=C[ORDER[(ri*cols+ci)%8]]; x=50+ci*(bw+gap)
            if len(bx['h'])>hmx: raise Overflow(f'box heading too long (max {hmx}): "{bx["h"]}"')
            s+=f'<rect x="{x}" y="{y}" width="{bw}" height="{rh}" rx="20" fill="{fi}" stroke="{st}" stroke-width="3"/>'
            s+=f'<text x="{x+40}" y="{y+50}" fill="{st}" font-size="28" font-weight="bold" font-family="Arial,sans-serif">{esc(bx["h"])}</text>'
            ln=wrap(bx['b'],mx); ml=(rh-100)//36
            if len(ln)>ml: raise Overflow(f'box "{bx["h"]}" text too long: {len(ln)} lines > {ml} allowed (shorten it, or use fewer boxes)')
            for li,t in enumerate(ln): s+=f'<text x="{x+40}" y="{y+105+li*36}" fill="#ffffff" font-size="24" font-family="Arial,sans-serif">{esc(t)}</text>'
    return s+'</svg>'
def vis(v,fallback_caption):
    return {'type':'diagram','svg':grid(v['title'],v.get('sub',''),v['boxes'],v.get('cols',2)),'caption':v.get('caption') or fallback_caption}
def official_cards(ref):
    u=U[ref]
    if not u['paras']: return []
    groups=[];cur=[];w=0
    for p in u['paras']:
        pw=len(p.split())
        if cur and w+pw>320 and not (cur[-1].startswith('**') and cur[-1].endswith('**')):
            groups.append(cur);cur=[];w=0
        cur.append(p);w+=pw
    if cur: groups.append(cur)
    out=[]; label='Introduction' if ref=='PREFACE' else ('Appendix I' if ref=='APP' else 'Section '+ref)
    for i,g in enumerate(groups):
        part=f' (part {i+1} of {len(groups)})' if len(groups)>1 else ''
        title=f'Official Text: {label}{part}'
        content=f'**{label} — {u["title"]}**{part}\n\n'+'\n\n'.join(g)+'\n\n*Source: ICD-10-CM Official Guidelines for Coding and Reporting, '+FY+' (CMS & NCHS), verbatim.*'
        box={'h':label if len(label)<=60 else label[:60],'b':u['title'][:300]}
        svg=grid('OFFICIAL TEXT',FY+' ICD-10-CM Official Guidelines',[box,{'h':'How to study it','b':'Read the rule word for word first. The next card explains it in plain English.'}],1)
        out.append({'type':'concept','title':title,'content':content,'visual':{'type':'diagram','svg':svg,'caption':f'{label}: {u["title"]}'[:140]}})
    return out
CATS=set(c[:3] for c in CODES_IN_SOURCE)
def codes_ok(text):
    """Every ICD-10-CM code cited outside the official text must exist in the official text.
    Dotted codes must match exactly; bare 3-character categories must be a category the guidelines mention."""
    toks=set(re.findall(r'\b[A-Z]\d[0-9A-Z](?:\.[0-9A-Z]{1,4})?',text))
    return sorted(t for t in toks if t not in CODES_IN_SOURCE and ('.' in t or t not in CATS))
def build_lesson(nn,spec):
    errs=[];warn=[]
    plan=PLAN[nn]; refs=plan[2]
    cards=spec.get('cards',[]); out=[]
    seen=[c.get('ref') for c in cards if c.get('type')=='official']
    for r in refs:
        if seen.count(r)!=1: errs.append(f'official ref {r} must appear exactly once (found {seen.count(r)})')
    for r in seen:
        if r not in refs: errs.append(f'official ref {r} is not assigned to this lesson')
    if not cards or cards[0].get('type')!='intro': errs.append('first card must be type intro')
    nq=sum(1 for c in cards if c.get('type')=='quiz'); na=sum(1 for c in cards if c.get('type')=='application')
    minq=20 if nn=='39' else max(3,math.ceil(len([r for r in refs if U[r]['paras']])/2))
    if nq<minq: errs.append(f'need at least {minq} quiz cards (have {nq})')
    if na<1: errs.append('need at least 1 application card')
    for i,c in enumerate(cards):
        t=c.get('type'); where=f'card {i+1} ({t})'
        try:
            if t=='official':
                out+=official_cards(c['ref'])
            elif t in ('intro','concept','example','application','quote'):
                for k in ('title','content','visual'):
                    if not c.get(k): errs.append(f'{where}: missing {k}')
                if set(c)-{'type','title','content','visual'}: errs.append(f'{where}: extra keys {set(c)-{"type","title","content","visual"}}')
                bc=codes_ok(c.get('title','')+' '+c.get('content',''))
                if bc: errs.append(f'{where}: codes not found anywhere in the official guidelines text: {bc}')
                out.append({'type':t,'title':c['title'],'content':c['content'],'visual':vis(c['visual'],c['title'])})
            elif t=='quiz':
                for k in ('question','options','correct','explanation','visual'):
                    if k not in c: errs.append(f'{where}: missing {k}')
                if set(c)-{'type','question','options','correct','explanation','visual'}: errs.append(f'{where}: extra keys')
                o=c['options']
                if not (3<=len(o)<=4) or not all(isinstance(x,str) and x.strip() for x in o): errs.append(f'{where}: options must be 3-4 non-empty strings')
                if not (isinstance(c['correct'],int) and 0<=c['correct']<len(o)): errs.append(f'{where}: correct must be an index into options')
                if len(set(o))!=len(o): errs.append(f'{where}: duplicate options')
                bc=codes_ok(c['question']+' '+' '.join(o)+' '+c['explanation'])
                if bc: errs.append(f'{where}: codes not found anywhere in the official guidelines text: {bc}')
                v=c['visual']; 
                if set(v)-{'topic','hint'}: errs.append(f'{where}: quiz visual takes only topic and hint')
                svg=grid('KNOWLEDGE CHECK','ICD-10-CM Official Guidelines '+FY,[{'h':v['topic'],'b':v['hint']}],1)
                out.append({'type':'quiz','question':c['question'],'options':[{'text':x,'correct':j==c['correct']} for j,x in enumerate(o)],
                            'explanation':c['explanation'],'visual':{'type':'diagram','svg':svg,'caption':'Knowledge check: '+v['topic']}})
            else: errs.append(f'{where}: unknown type {t}')
        except Overflow as e: errs.append(f'{where}: VISUAL {e}')
        except (KeyError,TypeError) as e: errs.append(f'{where}: malformed ({e})')
    if len(out)<12: errs.append(f'only {len(out)} cards after expansion; need 12+')
    words=sum(len((c.get('content') or c.get('question','')+' '+c.get('explanation','')).split()) for c in out)
    mins=max(10,round(words/170+nq*0.5))
    lesson={'id':f'icd10-{int(nn)}','title':spec.get('title') or plan[1],'duration':mins,'completed':False,'cards':out}
    return lesson,errs,warn
def load_spec(nn):
    return json.load(open(os.path.join(HERE,'specs',f'{nn}.json'),encoding='utf-8'))
if __name__=='__main__':
    cmd=sys.argv[1]
    if cmd=='show':
        nn=sys.argv[2]; pl=PLAN[nn]
        print(f'LESSON {nn}: {pl[1]}\nNOTES: {pl[3]}\nASSIGNED REFS (each needs exactly one {{"type":"official","ref":...}} card): {pl[2]}\n')
        if 'FY2027' in pl[3] or 'change' in pl[3]: print('VERIFIED CHANGE LIST:\n'+CHANGES+'\n')
        for r in pl[2]:
            u=U[r]; print(f'===== {r} — {u["title"]} =====' ); print('\n\n'.join(u['paras']) or '(heading only — no text; still add its official card, the builder skips empty ones)'); print()
    elif cmd=='check':
        nn=sys.argv[2]
        try: spec=load_spec(nn)
        except Exception as e: print('ERROR: cannot read spec:',e); sys.exit(1)
        lesson,errs,_=build_lesson(nn,spec)
        print(f'{len(lesson["cards"])} cards, {sum(1 for c in lesson["cards"] if c["type"]=="quiz")} quizzes, {lesson["duration"]}')
        for e in errs: print('ERROR:',e)
        print('OK' if not errs else f'{len(errs)} errors'); sys.exit(1 if errs else 0)
    elif cmd=='book':
        lessons=[];bad=0
        for nn in sorted(PLAN):
            try: spec=load_spec(nn)
            except Exception as e: print(nn,'MISSING',e); bad+=1; continue
            l,errs,_=build_lesson(nn,spec)
            if errs: print(nn,'ERRORS',errs[:5]); bad+=1
            lessons.append(l)
        if bad: print('not writing book;',bad,'lessons with problems'); sys.exit(1)
        dur=sum(l['duration'] for l in lessons); ncards=sum(len(l['cards']) for l in lessons)
        book={'id':'icd10cm-guidelines-fy2027','title':f'ICD-10-CM Official Guidelines for Coding and Reporting ({FY})',
          'author':'CMS & NCHS · approved by the Cooperating Parties (AHA, AHIMA, CMS, NCHS)',
          'description':f"The complete {FY} ICD-10-CM Official Guidelines for Coding and Reporting (effective {SRC['effective_from']} – {SRC['effective_to']}), word for word, broken into "+str(len(lessons))+' lessons. Every section — conventions, general guidelines, all 22 chapter-specific guidelines, Sections II–IV and Appendix I (POA) — is shown as official text, then explained in plain English, with examples and quizzes after every topic and a capstone exam.',
          'lessons':len(lessons),'duration':dur,'progress':0,'category':'him','featured':True,'cards':ncards,'lessonList':lessons}
        js=f'// External book module: ICD-10-CM Official Guidelines for Coding and Reporting, {FY}.\n// GENERATED by tools/icd10cm-guidelines/build.py — do not edit by hand.\n// Official text is verbatim from the CMS/NCHS {FY} guidelines (public domain, U.S. Government work).\n// Loaded BEFORE data.js; integrated into the HIM category via externalBooks.\nwindow.ICD10CM_GUIDELINES_BOOK = '+json.dumps(book,ensure_ascii=False,indent=1)+';\n'
        out=sys.argv[2] if len(sys.argv)>2 else OUT
        open(out,'w',encoding='utf-8').write(js); print('wrote',out,len(lessons),'lessons',ncards,'cards',dur,'min')
