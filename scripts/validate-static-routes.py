from pathlib import Path
from html.parser import HTMLParser
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://ifem-doctrine.github.io"
SLUGS = ["intent", "architecture", "interfaces", "contracts", "execution", "verification", "runtime"]
ROUTES = ["/"] + [f"/phase/{s}/" for s in SLUGS] + ["/fa/"] + [f"/fa/phase/{s}/" for s in SLUGS]

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.title = ''; self.h1 = []; self.text = []; self.links = []; self.lang = ''; self.dir = ''; self.canonical = ''; self.description = ''; self.hreflang = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang, self.dir = a.get('lang', ''), a.get('dir', '')
        if tag == 'link':
            if a.get('rel') == 'canonical': self.canonical = a.get('href', '')
            if a.get('rel') == 'alternate': self.hreflang.append((a.get('hreflang'), a.get('href')))
        if tag == 'meta' and a.get('name') == 'description': self.description = a.get('content', '')
        if tag == 'a' and a.get('href', '').startswith('/'): self.links.append(a['href'])
        self._capture = tag in ('title', 'h1')
        self._tag = tag
    def handle_endtag(self, tag): self._capture = False
    def handle_data(self, data):
        if getattr(self, '_capture', False):
            if self._tag == 'title': self.title += data
            if self._tag == 'h1': self.h1.append(data)
        self.text.append(data)

def file_for(route): return ROOT / (Path("index.html") if route == "/" else Path(route.strip("/")) / "index.html")
def main():
    errors = []
    for route in ROUTES:
        path = file_for(route)
        if not path.is_file(): errors.append(f"missing file: {route} -> {path}"); continue
        p = Page(); p.feed(path.read_text())
        word_count = len(re.findall(r"\w+", ' '.join(p.text), re.UNICODE))
        if not p.title.strip(): errors.append(f"empty title: {route}")
        if not p.description.strip(): errors.append(f"empty description: {route}")
        if len(p.h1) != 1: errors.append(f"H1 count {len(p.h1)}: {route}")
        if word_count < 20: errors.append(f"low meaningful text ({word_count} words): {route}")
        if not p.links: errors.append(f"no internal links: {route}")
        expected_lang = 'fa' if route.startswith('/fa') else 'en'
        if p.lang != expected_lang: errors.append(f"wrong lang {p.lang}: {route}")
        if expected_lang == 'fa' and p.dir != 'rtl': errors.append(f"wrong dir {p.dir}: {route}")
        if p.canonical != BASE + route: errors.append(f"wrong canonical {p.canonical}: {route}")
        for code in ('en', 'fa', 'x-default'):
            if not any(x[0] == code for x in p.hreflang): errors.append(f"missing hreflang {code}: {route}")
    sitemap = (ROOT / 'sitemap.xml').read_text()
    for route in ROUTES:
        if f'<loc>{BASE}{route}</loc>' not in sitemap: errors.append(f"missing sitemap URL: {route}")
    if errors:
        print('\n'.join(errors)); return 1
    print(f"Validated {len(ROUTES)} canonical routes: files, metadata, H1, text, links, language, canonical, hreflang, and sitemap.")
    return 0
if __name__ == '__main__': sys.exit(main())
