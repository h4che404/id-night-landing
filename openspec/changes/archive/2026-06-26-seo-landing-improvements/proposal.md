# Proposal: SEO Landing Improvements

## Intent

Improve landing discoverability and social preview reliability for Spanish searches such as “software de control de acceso y gestión de incidentes para boliches y eventos” without overstating security outcomes. This first slice hardens technical SEO and aligns positioning copy with defensible promises.

## Scope

### In Scope
- Add route-level social metadata strategy, explicit Twitter image support, and stable canonical/social defaults.
- Add JSON-LD for visible content: Organization/SoftwareApplication, BreadcrumbList where applicable, and FAQPage only where FAQs are rendered.
- Improve sitemap/robots hygiene and SEO-safe positioning copy around nightlife access, incident management, and operational traceability.

### Out of Scope
- Broad content rewrite, new landing sections, blog/resource expansion, or performance overhaul.
- Claims of total security, fraud elimination, incident elimination, automatic blocking, staff replacement, or “listas negras”.

## Capabilities

### New Capabilities
- `landing-seo`: Landing pages expose accurate index metadata, social previews, structured data, sitemap entries, and compliant SEO positioning copy for nightlife access/incident management.

### Modified Capabilities
- None.

## Approach

Use Next.js App Router metadata patterns, reading Next.js 16 docs before implementation. Preserve the route structure, add small reusable metadata/schema helpers only if needed, and ensure every schema claim matches visible page content. Spanish keywords should appear naturally while following the rule that ID-NIGHT registers, organizes, and displays information so authorized staff decide with more context.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/layout.tsx` | Modified | Shared metadata defaults and social inheritance. |
| `app/**/page.tsx` | Modified | Route metadata and limited SEO-safe copy alignment. |
| `app/twitter-image.tsx` | New | Explicit Twitter/social fallback image support. |
| `app/opengraph-image.tsx` | Modified | Keep OG image strategy consistent with metadata. |
| `app/sitemap.ts`, `app/robots.ts` | Modified | Canonical route and crawl hygiene. |
| `app/recursos/*/page.tsx` | Modified | FAQ schema only for existing visible FAQs. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Next metadata shallow merge drops inherited social fields | Med | Centralize shared values and verify generated metadata. |
| Schema claims diverge from visible copy | Med | Emit JSON-LD only for rendered content. |
| Copy overpromises safety outcomes | Low | Use approved promises and forbidden-language guardrails. |
| Change exceeds review budget | Med | Keep to metadata/schema/sitemap/copy slice; defer performance/content overhaul. |

## Rollback Plan

Revert the implementation commit(s): remove schema helpers/Twitter image, restore prior metadata, sitemap/robots, and copy. No data migration or external service change is involved; redeploy restores previous behavior.

## Dependencies

- Next.js 16 metadata documentation under `node_modules/next/dist/docs/`.
- User-approved keyword, positioning, promise, and copy constraints.

## Success Criteria

- [ ] Root and relevant public routes expose canonical, Open Graph, and Twitter metadata.
- [ ] JSON-LD validates and matches visible page content.
- [ ] Sitemap/robots include intended canonical public routes only.
- [ ] Copy uses target positioning without forbidden promises.
