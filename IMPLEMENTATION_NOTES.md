# IFEM Doctrine Replacement — Implementation Notes

## Verified authoritative metadata

The rebuilt site uses `https://ifem-doctrine.github.io/` as its production origin. GitHub Pages serves the repository root from the `main` branch, HTTPS is enforced, and no custom domain is configured.

The authoritative primary source is **Interface-First Execution Methodology (IFEM): A Unified Framework for High-Parallelism, AI-Assisted Software Engineering (Version 2.2)**, DOI `10.5281/zenodo.20621561`, published on Zenodo as a technical note. Its abstract frames IFEM as a methodology for high-parallelism projects and AI-assisted engineering teams that makes precise, frozen interface contracts the governing artifact before implementation, aligns implementation responsibilities to stable architectural boundaries, and continuously verifies contract compliance through automated pipelines.

The authoritative supplement is **Operational Runtime Manual: Interface-First Execution Methodology — Contract Enforcement in Production (Phases 5 & 6)**, DOI `10.5281/zenodo.21330255`, published on Zenodo as a project deliverable. Zenodo identifies it as a supplement to the v2.2 primary publication.

The persistent author identity is **Soheil Mozaffari**, linked to ORCID `0009-0001-2428-1295` and the personal site `https://smozaff.github.io/`. Zenodo currently displays a creator-name variation, but the site follows the requested public attribution while retaining the authoritative ORCID relationship.

## Implementation approach

The replacement will be a dependency-free, GitHub Pages-ready static site. It will adopt directory URLs such as `/doctrine/`, `/how-it-works/`, `/ai-engineering/`, `/examples/`, `/publications/`, and `/about/`, with Persian-ready parallel routes under `/fa/`. Shared CSS, JavaScript, semantic SVG diagrams, a fresh flat IFEM mark, social-preview SVG, JSON-LD, canonical tags, hreflang annotations, `sitemap.xml`, `robots.txt`, and a custom `404.html` will be included.

The visual system will be architectural rather than SaaS-like: deep navy frames, technical blue interface lines, teal verified states, sparse orange handoff/failure states, off-white surfaces, solid plane geometry, and an instructional sequence representing ambiguity → explicit boundaries → contracts → parallel execution → verification → controlled integration. JavaScript will enhance the diagram but all core content will remain present in static HTML.

## Placeholders

The examples area will contain labelled illustrative technical examples only. No adoption claims, case studies, certifications, benchmarks, commercial offers, or invented endorsements will be published.

## References

1. Zenodo, [IFEM v2.2 record](https://zenodo.org/records/20621561).
2. Zenodo, [IFEM Operational Runtime Manual record](https://zenodo.org/records/21330255).
3. GitHub Pages configuration, `IFEM-doctrine/ifem-doctrine.github.io`.

## Local preview findings

The local static preview successfully rendered the English homepage with its navigation, two-column instructional hero, explicit interface planes, phase controls, source pathways, and visible static content. The Persian homepage also rendered with `lang="fa"`, `dir="rtl"`, mirrored navigation placement, Persian technical copy, reciprocal English routing, and the same accessible static explanatory sequence. Both pages expose their meaningful content in extracted HTML rather than depending on client-side rendering.

The local Publications page renders both sources with version-specific DOIs, direct Zenodo and DOI pathways, copy controls, concept-DOI guidance, and clear source provenance. The local How It Works page renders the seven phases, contract-freezing model, static explanatory content, Runtime Manual pathway, and correct secondary navigation without client-side dependencies.

## Deployment validation

Commit `de47a3df26e78925e9b22f3bc1341943e8033ed8` was pushed to `main`. GitHub Pages reported the corresponding legacy-source build as `built` with no deployment error. Two immediate browser requests to the production origin still showed the prior page through an apparent cached response, so a cache-bypass production request is required before treating the new HTML as propagated.
A cache-bypassed request to `https://ifem-doctrine.github.io/?build=de47a3df26e78925e9b22f3bc1341943e8033ed8` successfully returned the new IFEM Doctrine homepage: the new title, directory navigation, explicit-interface hero, static phase content, and updated visual system were all present. The unparameterized origin was still serving a transient cached prior response immediately after build completion, but the cache-bypassed deployed artifact verified the successful replacement and HTTPS availability.
