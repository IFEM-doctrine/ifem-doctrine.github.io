# Case Study Integration Notes

**Updated:** 2026-08-21  
**Scope:** IFEM applications, engineering evidence, cross-site identity graph, and discoverability

## What changed

- Rebuilt `/applications/` and `/fa/applications/` as evidence-led case-study chapters instead of shallow directory cards.
- Added five project records with explicit sections for:
  - engineering problem;
  - IFEM lens;
  - evidence and status;
  - full external case study;
  - GitHub source.
- Linked every case study directly to its dedicated project site instead of routing through personal-site anchors.
- Polished the homepage case-study preview in English and Persian and connected each preview to both the full project record and its IFEM methodology entry.
- Added **Applications / کاربردها** to primary navigation and relevant footer navigation site-wide.
- Added `/applications/` and `/fa/applications/` to the sitemap with reciprocal `hreflang` relationships.
- Added structured `ItemList` data for the five case studies on the Applications pages.
- Replaced broad production/adoption wording with evidence-bounded project-status language.
- Standardized author positioning as **software engineer and systems architect** / **مهندس نرم‌افزار و معمار سامانه‌ها**.
- Standardized the ONYX public label as **ONYX Framework** while keeping its mission-operations architecture context.

## Current external case-study destinations

- ONYX Framework — https://onyxcase-bxl5ndbk.manus.space/
- Raven Metadata Extractor — https://ravenmeta-b9c2fz9g.manus.space/
- Rezvan Mesh — https://rezvanmesh-ctebutsc.manus.space/
- Watermelon MediaPlayer — https://watermelonmp-b828xakc.manus.space/
- Watermelon Vector Graphics Converter — https://watervector-hz2inn6j.manus.space/

## Evidence language

The site intentionally uses language such as **demonstrates IFEM principles in practice** and **IFEM lens** instead of implying that IFEM is a software dependency, certification, adopted standard, or proof of production deployment.

## Future URL migration

The `manus.space` URLs should eventually be migrated to stable project URLs under controlled infrastructure. When that occurs, update the Applications pages, homepage previews, structured data, and the personal-site case-study graph together so search engines continue to see one coherent identity network.

## Navigation, media, and motion refinement

A second refinement pass addressed visual evidence and long-page navigation across the doctrine site:

- Added a prominent, full-width **فارسی / English** language banner to every HTML page and preserved route-specific language switching where a counterpart exists.
- Added an explicit **Home / خانه** link to primary navigation site-wide while retaining the IFEM wordmark as a home link.
- Added a floating **Back to top / بالا** control for long doctrine, publication, and case-study pages.
- Added scroll-triggered reveal motion with `IntersectionObserver`, while retaining reduced-motion accessibility behavior.
- Added project media to the homepage case-study preview and to both `/applications/` and `/fa/applications/`:
  - Raven Metadata Extractor — real interface capture;
  - Watermelon MediaPlayer — real design/interface artifact;
  - Watermelon Vector Graphics Converter — real interface capture;
  - Rezvan Mesh — clearly labeled conceptual boundary diagram;
  - ONYX Framework — clearly labeled conceptual architecture diagram.
- The conceptual diagrams are intentionally presented as diagrams, not as screenshots or evidence of unimplemented behavior.
- Kept the methodology/site hierarchy intact: IFEM explains the method; the project sites carry the full technical records; the Applications page provides the methodology-focused interpretation.
