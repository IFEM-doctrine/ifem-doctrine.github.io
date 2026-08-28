from __future__ import annotations

from html import escape
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://ifem-doctrine.github.io"

PHASES = [
    ("intent", "Intent", "مقصود", "Frame the engineering outcome before solution language takes over.", "پیش از غلبه زبان راه‌حل، نتیجه مهندسی را قاب‌بندی کنید.", "Intent establishes the outcome, constraints, stakeholders, and decisions that architecture must make accountable."),
    ("architecture", "Architecture", "معماری", "Make responsibility boundaries visible before implementation begins.", "پیش از آغاز پیاده‌سازی، مرزهای مسئولیت را آشکار کنید.", "Architecture makes ownership, dependencies, and system boundaries explicit so independent work can remain coherent."),
    ("interfaces", "Interfaces", "رابط‌ها", "Define what crosses each boundary and what must remain local.", "آنچه از هر مرز عبور می‌کند و آنچه باید محلی بماند را تعریف کنید.", "Interfaces expose the smallest dependable surface between responsibilities, with explicit inputs, outputs, and ownership."),
    ("contracts", "Contracts", "قرارداد", "Freeze the shared agreement that independent work must not reinterpret.", "توافق مشترکی را تثبیت کنید که کار مستقل نباید دوباره تفسیر کند.", "Contracts specify inputs, outputs, ownership, compatibility, errors, and acceptance criteria."),
    ("execution", "Execution", "اجرا", "Work independently behind stable rules.", "پشت قواعد پایدار، مستقل کار کنید.", "Contributors can move in parallel when they know exactly what their boundary promises and permits."),
    ("verification", "Verification", "اعتبارسنجی", "Turn agreement into evidence.", "توافق را به شواهد تبدیل کنید.", "Schema, compatibility, and integration checks test whether implementation remains within the contract."),
    ("runtime", "Runtime", "زمان اجرا", "Carry contract enforcement into production contexts.", "اجرای قرارداد را به زمینه‌های عملیاتی تولید منتقل کنید.", "Runtime makes the doctrine observable after release through operational checks, ownership, and feedback loops."),
]


def fallback(lang: str, slug: str | None) -> str:
    fa = lang == "fa"
    home = "/fa/" if fa else "/"
    phase_prefix = "/fa/phase/" if fa else "/phase/"
    if slug:
        record = next(p for p in PHASES if p[0] == slug)
        title = record[2] if fa else record[1]
        summary = record[4] if fa else record[3]
        detail = record[5] if not fa else {
            "intent": "مقصود، نتیجه، محدودیت‌ها، ذی‌نفعان و تصمیم‌هایی را مشخص می‌کند که معماری باید برای آن‌ها پاسخ‌گو باشد.",
            "architecture": "معماری مالکیت، وابستگی‌ها و مرزهای سیستم را آشکار می‌کند تا کار مستقل منسجم باقی بماند.",
            "interfaces": "رابط‌ها کوچک‌ترین سطح قابل‌اتکا میان مسئولیت‌ها را با ورودی، خروجی و مالکیت روشن مشخص می‌کنند.",
            "contracts": "قراردادها ورودی، خروجی، مالکیت، سازگاری، خطاها و معیارهای پذیرش را تعیین می‌کنند.",
            "execution": "مشارکت‌کنندگان وقتی دقیقاً بدانند مرزشان چه وعده و اجازه‌ای دارد، می‌توانند موازی حرکت کنند.",
            "verification": "بررسی‌های شِما، سازگاری و یکپارچه‌سازی می‌سنجند که پیاده‌سازی در محدوده قرارداد باقی مانده است.",
            "runtime": "زمان اجرا پس از انتشار، روش‌شناسی را با بررسی‌های عملیاتی، مالکیت و حلقه‌های بازخورد قابل مشاهده می‌کند.",
        }[slug]
        nav = "".join(f'<li><a href="{phase_prefix}{p[0]}/">{escape(p[2] if fa else p[1])}</a></li>' for p in PHASES)
        return f'''<header><nav aria-label="{'ناوبری فازها' if fa else 'Phase navigation'}"><a href="{home}">{'خانه' if fa else 'Home'}</a><ul>{nav}</ul></nav></header><main><article><p>{'فاز' if fa else 'IFEM phase'} {record[0]}</p><h1>{escape(title)}</h1><p>{escape(summary)}</p><h2>{'این فاز چه چیزی را قابل اتکا می‌کند؟' if fa else 'What does this phase make dependable?'}</h2><p>{escape(detail)}</p><h2>{'حرکت در مدل هفت‌فازی' if fa else 'Move through the seven-phase model'}</h2><p><a href="{home}">{'بازگشت به دکترین IFEM' if fa else 'Return to the IFEM Doctrine'}</a></p></article></main><footer><a href="{'/' if fa else '/fa/'}">{'English' if fa else 'فارسی'}</a><p>IFEM Doctrine · Soheil Mozaffari</p></footer>'''
    nav = "".join(f'<li><a href="{phase_prefix}{p[0]}/">{escape(p[2] if fa else p[1])}</a></li>' for p in PHASES)
    if fa:
        return f'''<header><nav aria-label="ناوبری اصلی"><a href="/fa/">دکترین IFEM</a><ul>{nav}</ul><a href="/">English</a></nav></header><main><article><p>روش‌شناسی و دکترین فنی</p><h1>روش‌شناسی اجرای رابط‌محور (IFEM)</h1><p>رابط‌های صریح، اجرای مطمئن. IFEM روشی برای تعریف مرزهای مسئولیت، قراردادها و اعتبارسنجی در مهندسی نرم‌افزار است.</p><h2>مدل هفت‌فازی</h2><p>از مقصود تا زمان اجرا، هر فاز ورودی فاز بعدی را تقویت می‌کند.</p><ol>{nav}</ol><h2>درباره نویسنده</h2><p>IFEM توسط سهیل مظفری، مهندس نرم‌افزار و معمار سامانه‌ها، تألیف شده است.</p><p><a href="https://github.com/IFEM-doctrine">GitHub</a> · <a href="https://smozaff.github.io/">وب‌سایت سهیل مظفری</a></p></article></main><footer><p>© 2026 دکترین IFEM</p></footer>'''
    return f'''<header><nav aria-label="Primary navigation"><a href="/">IFEM Doctrine</a><ul>{nav}</ul><a href="/fa/">فارسی</a></nav></header><main><article><p>Methodology and technical doctrine</p><h1>Interface-First Execution Methodology (IFEM)</h1><p>Explicit interfaces. Confident execution. IFEM is a methodology for defining responsibility boundaries, contracts, and verification in software engineering.</p><h2>Seven-phase execution model</h2><p>From intent to runtime, each phase strengthens the next phase’s input.</p><ol>{nav}</ol><h2>Authority and publications</h2><p>IFEM is authored by Soheil Mozaffari, software engineer and systems architect. It is presented as a methodology and technical doctrine, not as a certification scheme or adopted standard.</p><p><a href="https://github.com/IFEM-doctrine">GitHub</a> · <a href="https://smozaff.github.io/">Soheil Mozaffari’s personal site</a></p></article></main><footer><p>© 2026 IFEM Doctrine</p></footer>'''


def make_doc(template: str, lang: str, slug: str | None) -> str:
    fa = lang == "fa"
    path = ("/fa/" if fa else "/") if not slug else ("/fa/phase/" if fa else "/phase/") + slug + "/"
    other = ("/" if not slug else "/phase/" + slug + "/") if fa else ("/fa/" if not slug else "/fa/phase/" + slug + "/")
    if slug:
        record = next(p for p in PHASES if p[0] == slug)
        name = record[2] if fa else record[1]
        desc = record[4] if fa else record[3]
        title = f"{name} — IFEM Doctrine"
    else:
        title = "روش‌شناسی اجرای رابط‌محور (IFEM) — دکترین IFEM" if fa else "Interface-First Execution Methodology (IFEM) — IFEM Doctrine"
        desc = "وب‌سایت حرفه‌ای دکترین IFEM؛ مرزهای مسئولیت، قراردادها و اعتبارسنجی در مهندسی نرم‌افزار." if fa else "Interface-First Execution Methodology (IFEM): explicit interfaces, contracts, responsibility boundaries, and verification."
    doc = template
    doc = re.sub(r'<html[^>]*>', f'<html lang="{lang}" dir="{"rtl" if fa else "ltr"}">', doc, count=1)
    doc = re.sub(r'<title>.*?</title>', f'<title>{escape(title)}</title>', doc, count=1, flags=re.S)
    doc = re.sub(r'<meta name="description" content="[^"]*"', f'<meta name="description" content="{escape(desc)}"', doc, count=1)
    doc = re.sub(r'<link rel="canonical" href="[^"]*"', f'<link rel="canonical" href="{BASE}{path}"', doc, count=1)
    doc = re.sub(r'\s*<link rel="alternate"[^>]*>', '', doc)
    doc = doc.replace('</head>', f'<link rel="alternate" hreflang="en" href="{BASE}{path if not fa else other}" /><link rel="alternate" hreflang="fa" href="{BASE}{path if fa else other}" /><link rel="alternate" hreflang="x-default" href="{BASE}{path if not fa else other}" /></head>', 1)
    doc = doc.replace('<div id="root"></div>', f'<div id="root">{fallback(lang, slug)}</div>', 1)
    return doc


def main() -> None:
    template = (ROOT / "index.html").read_text()
    routes = [("", ""), ("fa", "")]
    routes += [("", slug) for slug, *_ in PHASES]
    routes += [("fa", slug) for slug, *_ in PHASES]
    for lang, slug in routes:
        out = ROOT
        if lang:
            out /= "fa"
        if slug:
            out = out / "phase" / slug
        out.mkdir(parents=True, exist_ok=True)
        (out / "index.html").write_text(make_doc(template, lang or "en", slug), newline="\n")
    (ROOT / "404.html").write_text('''<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Page not found — IFEM Doctrine</title><meta name="robots" content="noindex"><link rel="canonical" href="https://ifem-doctrine.github.io/404.html"></head><body><main><h1>Page not found</h1><p><a href="/">Return to IFEM Doctrine</a></p></main></body></html>\n''')
    print(f"Generated {len(routes)} canonical route documents.")

if __name__ == "__main__":
    main()
