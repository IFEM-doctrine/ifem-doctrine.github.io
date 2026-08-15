# Persian Structural Parity Pass

This repository contains the revised Persian IFEM Doctrine pages with structural parity against the English site.

## What changed

- Mirrored the English section structure across all seven Persian pages.
- Restored missing homepage sections:
  - How IFEM Works
  - Why Interfaces First
  - Contract Model
  - Contracts & Verification
  - Audience
  - Publications
  - Author
- Restored richer component structures on inner pages:
  - page hero metadata
  - doctrine notes and section navigation
  - contract freeze handoff model
  - AI authority model and principle grid
  - step-by-step example cards
  - citation panels and DOI explanation
  - author/source link groups
- Preserved Persian RTL behavior through the existing `farsi` body class and `dir="rtl"` setup.
- Rewrote added content as native technical Persian rather than literal sentence-by-sentence translation.
- Preserved DOI values, ORCID links, external source links, CSS classes, JS hooks, canonical metadata, and language switching.
- Kept the English and Persian DOM/component class structure aligned so both versions should render with the same visual richness.

## Terminology policy

- Interface → رابط
- Contract → قرارداد
- Boundary → مرز
- Verification → راستی‌آزمایی
- Validation → اعتبارسنجی when the distinction is semantically relevant
- Evidence → شواهد
- Runtime enforcement → اعمال قرارداد در زمان اجرا
- AI coding agent → عامل کدنویسی هوش مصنوعی

English technical names, publication titles, DOI identifiers, ORCID, CI, API, BibTeX, RIS, and code-like identifiers remain in English where appropriate.

## Deployment

Replace the existing repository contents with the full package, or replace only `/fa/` with the FA-only package.

GitHub Pages should redeploy automatically after commit to the configured branch.
