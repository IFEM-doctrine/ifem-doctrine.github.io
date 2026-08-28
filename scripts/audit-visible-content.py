from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
ROUTES = ['/','/fa/'] + [f'/phase/{s}/' for s in ['intent','architecture','interfaces','contracts','execution','verification','runtime']] + [f'/fa/phase/{s}/' for s in ['intent','architecture','interfaces','contracts','execution','verification','runtime']]
class P(HTMLParser):
    def __init__(self): super().__init__(); self.text=[]; self.skip=0
    def handle_starttag(self,t,a):
        if t in ('script','style'): self.skip+=1
    def handle_endtag(self,t):
        if t in ('script','style') and self.skip: self.skip-=1
    def handle_data(self,d):
        if not self.skip: self.text.append(d)
def path(r): return ROOT/'index.html' if r=='/' else ROOT/r.strip('/')/'index.html'
def main():
    sigs={}
    for r in ROUTES:
        p=P(); p.feed(path(r).read_text()); text=' '.join(p.text); words=re.findall(r'\w+',text,re.UNICODE); pers=sum(1 for c in text if '\u0600'<=c<='\u06ff'); english=sum(1 for c in text if ('a'<=c.lower()<='z'))
        # focus on article/main fallback content, excluding shared nav/footer where practical
        body=path(r).read_text(); start=body.find('<div id="root">'); end=body.find('</div>',start); q=P(); q.feed(body[start:end]); meaningful=' '.join(q.text); msig=re.sub(r'\s+',' ',meaningful).strip().lower(); sigs[r]=msig
        print(f'{r}\tall_words={len(words)}\tmain_words={len(re.findall(r"\w+",meaningful,re.UNICODE))}\tpersian_chars={pers}\tenglish_chars={english}')
    print('unique_main_signatures=',len(set(sigs.values())),'of',len(sigs))
    print('homepage_main_equal=',sigs['/']==sigs['/fa/'])
if __name__=='__main__': main()
