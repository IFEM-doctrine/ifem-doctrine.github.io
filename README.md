# IFEM Doctrine

The source repository for **IFEM Doctrine**, the public technical site for **Interface-First Execution Methodology (IFEM)**.

The site is deployed as a dependency-free GitHub Pages website from the `main` branch and repository root. It uses semantic HTML, shared CSS, vanilla JavaScript, source-controlled SVG visual assets, and directory-based URLs.

## Local preview

Use any static server from the repository root. For example:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`. The site intentionally does not require a build step.

## Site map

| Route | Purpose |
| --- | --- |
| `/` | English doctrine overview and instructional IFEM sequence |
| `/doctrine/` | Principles and engineering rationale |
| `/how-it-works/` | Seven-phase execution model |
| `/ai-engineering/` | Bounded AI-assisted engineering model |
| `/examples/` | Clearly labelled illustrative cases |
| `/publications/` | Version-specific DOI and publication routes |
| `/about/` | Method identity and concise author attribution |
| `/fa/` | Persian-language entry route with parallel section pages |

## Authoritative references

| Source | Version / role | DOI |
| --- | --- | --- |
| Interface-First Execution Methodology (IFEM): A Unified Framework for High-Parallelism, AI-Assisted Software Engineering | Version 2.2; primary publication | [10.5281/zenodo.20621561](https://doi.org/10.5281/zenodo.20621561) |
| Operational Runtime Manual: Interface-First Execution Methodology — Contract Enforcement in Production (Phases 5 & 6) | Version 1.0; supplementary Runtime Manual | [10.5281/zenodo.21330255](https://doi.org/10.5281/zenodo.21330255) |

For citations to the reviewed v2.2 release, use the version-specific primary DOI. The concept DOI `10.5281/zenodo.20621560` identifies the Zenodo record family and remains valid for that purpose.

## Accessibility and enhancement

Core content is available in static HTML without JavaScript. JavaScript enhances mobile navigation, citation/DOI copy controls, and the instructional hero sequence. The sequence honors `prefers-reduced-motion`, provides direct phase controls, and can be paused.

## Content placeholders

The site deliberately contains one explicit future-content marker:

- **`[CONTENT REQUIRED]`** on the English Examples page identifies the location for permissioned, documented real-world cases. No adoption claims, performance claims, certifications, endorsements, or invented case studies are included.

## Deployment assets

Canonical tags and Open Graph metadata use `https://ifem-doctrine.github.io/`, the repository’s currently configured GitHub Pages origin. `sitemap.xml`, `robots.txt`, structured data, localized `hreflang` tags, social preview SVG, and `404.html` are included.
