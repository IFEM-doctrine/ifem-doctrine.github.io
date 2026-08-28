from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://ifem-doctrine.github.io"
SLUGS = ["intent", "architecture", "interfaces", "contracts", "execution", "verification", "runtime"]
ROUTES = ["/"] + [f"/phase/{s}/" for s in SLUGS] + ["/fa/"] + [f"/fa/phase/{s}/" for s in SLUGS]

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.title=''; self.h1=[]; self.text=[]; self.links=[]; self.lang=''; self.dir=''; self.canonical=''; self.description=''; self.alternates=[]; self.h2=0
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='html': self.lang, self.dir = a.get('lang',''), a.get('dir','')
        if tag=='link':
            if a.get('rel')=='canonical': self.canonical=a.get('href','')
            if a.get('rel')=='alternate': self.alternates.append((a.get('hreflang'),a.get('href')))
        if tag=='meta' and a.get('name')=='description': self.description=a.get('content','')
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag=='h2': self.h2 += 1
        if tag in ('title','h1'): self._capture=tag; self._buf=''
    def handle_endtag(self, tag):
        if getattr(self,'_capture',None)==tag:
            if tag=='title': self.title=self._buf
            else: self.h1.append(self._buf)
            self._capture=None
    def handle_data(self, data):
        if getattr(self,'_capture',None): self._buf += data
        self.text.append(data)

def file_for(route): return ROOT / (Path('index.html') if route=='/' else Path(route.strip('/'))/'index.html')
def words(p): return len(re.findall(r"\w+", ' '.join(p.text), re.UNICODE))
def body_signature(p): return re.sub(r'\s+', ' ', ' '.join(p.text)).strip().lower()

def main():
    errors=[]; pages={}; roots={}
    for route in ROUTES:
        path=file_for(route)
        if not path.is_file(): errors.append(f'missing file: {route} -> {path}'); continue
        raw=path.read_text(); p=Page(); p.feed(raw); pages[route]=p
        a=raw.find('<div id="root">'); b=raw.find('</div>', a); root=Page(); root.feed(raw[a:b]); roots[route]=root; count=words(root)
        if not p.title.strip(): errors.append(f'empty title: {route}')
        if not (70 <= len(p.description) <= 180): errors.append(f'description length {len(p.description)} outside 70-180: {route}')
        if len(p.h1)!=1: errors.append(f'H1 count {len(p.h1)}: {route}')
        if count < (300 if route in ('/','/fa/') else 200): errors.append(f'insufficient initial text ({count} words): {route}')
        if p.h2 < (3 if route in ('/','/fa/') else 5): errors.append(f'insufficient sections ({p.h2} H2): {route}')
        if not p.links: errors.append(f'no links: {route}')
        expected='fa' if route.startswith('/fa') else 'en'
        if p.lang != expected: errors.append(f'wrong lang {p.lang}: {route}')
        if expected=='fa' and p.dir!='rtl': errors.append(f'wrong dir {p.dir}: {route}')
        if p.canonical != BASE+route: errors.append(f'wrong canonical {p.canonical}: {route}')
        if '<meta name="robots" content="noindex"' in path.read_text(): errors.append(f'unexpected noindex: {route}')
        for code in ('en','fa','x-default'):
            if not any(x[0]==code for x in p.alternates): errors.append(f'missing hreflang {code}: {route}')
    signatures={route:body_signature(root) for route,root in roots.items()}
    seen={}
    for route,sig in signatures.items():
        if sig in seen: errors.append(f'duplicate normalized body: {route} == {seen[sig]}')
        else: seen[sig]=route
    if '/' in roots and '/fa/' in roots:
        en_text=body_signature(roots['/']); fa_text=body_signature(roots['/fa/'])
        if en_text == fa_text: errors.append('English and Persian homepage root text is identical')
        if sum(1 for c in en_text if '\u0600' <= c <= '\u06ff') > 20: errors.append('English homepage contains excessive Persian text')
        if sum(1 for c in fa_text if '\u0600' <= c <= '\u06ff') < 40: errors.append('Persian homepage lacks meaningful Persian text')
    for route,p in pages.items():
        if route.startswith('/fa/phase/') and not all(f'/fa/phase/{s}/' in p.links for s in SLUGS): errors.append(f'Persian phase graph incomplete: {route}')
        if route=='/fa/' and not all(f'/fa/phase/{s}/' in p.links for s in SLUGS): errors.append('Persian hub does not link all seven phases')
        if route.startswith('/phase/') and not all(f'/phase/{s}/' in p.links for s in SLUGS): errors.append(f'English phase graph incomplete: {route}')
    sitemap=(ROOT/'sitemap.xml').read_text()
    for route in ROUTES:
        if f'<loc>{BASE}{route}</loc>' not in sitemap: errors.append(f'missing sitemap URL: {route}')
    if errors: print('\n'.join(errors)); return 1
    print(f'Validated {len(ROUTES)} routes: crawler-visible root thresholds, 70-180 char descriptions, unique substantive bodies, homepage language separation, sections, H1, links, language, canonical, hreflang, noindex, Persian/English phase graphs, and sitemap.')
    return 0
if __name__=='__main__': sys.exit(main())
