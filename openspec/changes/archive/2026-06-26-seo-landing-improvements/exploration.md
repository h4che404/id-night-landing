## Exploration: SEO landing improvements

### Current State
The app already has a solid SEO base: `app/layout.tsx` sets `metadataBase`, root title/description, canonical `/`, Open Graph/Twitter text, and icons; most public routes export unique `title`, `description`, and canonical metadata. File-based SEO routes also exist for `app/sitemap.ts`, `app/robots.ts`, and `app/opengraph-image.tsx`.

The main gaps are completeness and specificity. Route pages do not define route-level `openGraph`/`twitter` metadata, there is no `twitter-image` file, and there is no JSON-LD/schema markup anywhere in the app. Headings and internal links are generally good, but a lot of the landing is built from client components with Framer Motion (`Hero`, `Navbar`, `AnimatedPage`, `AnimatedSection`, `app/template.tsx`), which is a visible performance-related SEO risk.

### Affected Areas
- `app/layout.tsx` — shared metadata defaults, canonical base, social metadata inheritance.
- `app/opengraph-image.tsx` — existing shared OG image that should be paired with route-aware social metadata strategy.
- `app/sitemap.ts` — manual route list and `lastModified: new Date()` for every URL.
- `app/robots.ts` — crawl directives and sitemap declaration.
- `app/page.tsx` and public route pages under `app/**/page.tsx` — route-specific metadata and indexable copy strategy.
- `app/recursos/aprender/page.tsx` and `app/recursos/soporte/page.tsx` — existing FAQ content that can support FAQ structured data.
- `components/Hero.tsx`, `components/Navbar.tsx`, `components/AnimatedPage.tsx`, `components/AnimatedSection.tsx`, `app/template.tsx` — client-side animation footprint that may affect crawl/performance signals.

### Approaches
1. **Metadata hardening first** — tighten metadata and technical SEO without changing much page content.
   - Pros: Directly addresses audit-style checks fast; lower implementation risk; fits the current route structure.
   - Cons: Leaves richer SERP opportunities and performance gains mostly untouched.
   - Effort: Medium

2. **Metadata + schema + content/performance pass** — combine metadata fixes with structured data, copy enrichment, and motion reduction.
   - Pros: Stronger SEO upside; better eligibility for rich results; can improve both discoverability and performance signals.
   - Cons: Broader scope, more content decisions, and higher risk of exceeding the 400-line review budget.
   - Effort: High

### Recommendation
Start with **Metadata hardening first**, but include the highest-value schema work that maps to content already on the site: Organization/SoftwareApplication at the root, BreadcrumbList on routed pages with breadcrumbs, and FAQPage where FAQs already exist. That gets concrete SEO wins without forcing a broad copy rewrite.

If the proposal forecast pushes past the review budget, split the follow-up work (content expansion and motion/performance reduction) into a second PR.

### Risks
- Next.js metadata is shallow-merged; adding nested `openGraph` or `twitter` objects incorrectly can accidentally drop inherited fields like shared images.
- Structured data must match visible content exactly, especially FAQ, pricing, and company claims.
- A combined SEO + performance + content rewrite can exceed the 400-line review budget quickly.

### Ready for Proposal
Yes — propose a first slice focused on route-level social metadata, explicit Twitter image support, schema for existing visible content, and sitemap hygiene; treat broader content/performance work as a second slice if needed.
