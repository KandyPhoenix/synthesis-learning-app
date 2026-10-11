# Builds the addressable "units" of official text, including Z-code sub-units.
import json, re, os
HERE=os.path.dirname(os.path.abspath(__file__))
def load():
    d=json.load(open(os.path.join(HERE,'chunks.json'),encoding='utf-8'))
    U={}
    U['PREFACE']={'title':'Introduction to the Official Guidelines','paras':d['preface']}
    for c in d['chunks']:
        if c['id']=='I.C.21.c':
            p=[]
            for x in c['paras']:
                h='15) Z Codes That May Only be Principal/First-Listed Diagnosis'
                if x.startswith(h+' '): p+=['**'+h+'**',x[len(h)+1:]]
                else: p.append(x)
            idx=[i for i,x in enumerate(p) if re.match(r'\*\*\d+\)',x)]
            groups=[(1,3),(4,6),(7,10),(11,13),(14,17)]
            for a,b in groups:
                s=idx[a-1]; e=idx[b] if b<len(idx) else len(p)
                U[f'I.C.21.c.{a}-{b}']={'title':'Categories of Z Codes: '+', '.join(re.sub(r'\*\*\d+\)\s*|\*\*','',p[idx[k-1]]) for k in range(a,b+1)),'paras':p[s:e]}
            continue
        U[c['id']]={'title':c['title'],'paras':c['paras']}
    return U
