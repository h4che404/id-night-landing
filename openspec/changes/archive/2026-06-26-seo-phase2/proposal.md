# Proposal: SEO Phase 2 — Structured Data & Technical Hardening

## Intent

Cycle 1 shipped metadata, sitemap, robots, OG/Twitter, and SoftwareApplication + FAQPage JSON-LD. The SEOtimer audit still flags structured-data and technical gaps that suppress rich results and Knowledge Panel eligibility. For an Argentina-first SaaS (es-AR) selling access control to boliches/eventos, SERP visibility is the primary sales funnel, so closing these gaps directly affects lead discovery.

## Scope

### In Scope
- `buildBreadcrumbJsonLd(items)` in `lib/seo.ts` + `BreadcrumbList` JSON-LD on all 10 inner pages
- `buildOrganizationJsonLd()` in `lib/seo.ts` + standalone Organization JSON-LD in `app/layout.tsx`
- Heading hierarchy fix (h1→h2) in `ComoFunciona.tsx` and `Precios.tsx`
- `aria-label="Breadcrumb"` on every breadcrumb `<nav>`
- `app/not-found.tsx` — branded navigation; rely on Next.js 404/noindex handling
- `app/manifest.ts` — `theme_color`, `name`, no icon paths until real manifest icon assets exist
- `themeColor` through the Next.js `viewport` export, not metadata
- Extended contract tests in `tests/seo.test.ts`
- GSC verification meta tag ONLY if a token already exists (none found → omit)

### Out of Scope
- Core Web Vitals / Framer Motion performance (separate ticket)
- Per-page OG images; FAQPage on additional pages
- `WebSite`/SearchAction schema
- Any invented schema data: no reviews, ratings, address, legal name, or `sameAs` (no social URLs exist in codebase)

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `landing-seo`: add structured-data requirements (BreadcrumbList, standalone Organization), heading-hierarchy integrity, breadcrumb accessibility, branded 404, web app manifest, and viewport `themeColor`.

## Approach

Extend `lib/seo.ts` with pure builder helpers returning `JsonLd`; render via existing `toJsonLd()` (XSS-safe) in `<script>` blocks. Organization uses ONLY verifiable data: `name`, `url` (no logo URL/`sameAs` exist). Contacto route injects BreadcrumbList in `layout.tsx` (page is `"use client"`). Next.js 16 docs place `themeColor` in `viewport`, and 404 indexing is handled by Next's 404/noindex behavior. Tests-first per Strict TDD.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `lib/seo.ts` | Modified | Add breadcrumb/org builders and viewport helper |
| `app/layout.tsx` | Modified | Inject Organization JSON-LD; export viewport |
| 10 inner page/layout files | Modified | BreadcrumbList + `aria-label` |
| `components/ComoFunciona.tsx`, `Precios.tsx` | Modified | Heading hierarchy |
| `app/not-found.tsx`, `app/manifest.ts` | New | Branded 404 + manifest without icons |
| `tests/seo.test.ts` | Modified | New schema/viewport themeColor assertions |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Next.js 16.2.9 metadata/routing API drift | Med | Read bundled docs before coding |
| Heading change alters visual styling | Med | Preserve classes; change tag only |
| Invented schema data | Low | Hard constraint: verifiable fields only |
| 400-line budget breach (~17-20 files) | Med | Forecast in sdd-tasks; chain if needed |

## Rollback Plan

Pure-additive change. Revert the PR/commit; new files (`not-found.tsx`, `manifest.ts`) are removed and helper additions reverted with no runtime coupling to cycle-1 behavior.

## Dependencies

- None external. Strict TDD active: `node --import tsx --test tests/seo.test.ts`.

## Success Criteria

- [ ] All `tests/seo.test.ts` pass, including new Organization/BreadcrumbList/viewport themeColor assertions
- [ ] BreadcrumbList + `aria-label` present on all 10 inner pages
- [ ] Standalone Organization JSON-LD validates (Rich Results Test) with no invented fields
- [ ] No h1→h3 skips remain in `ComoFunciona.tsx` / `Precios.tsx`
- [ ] `not-found.tsx` relies on Next.js 404/noindex behavior; `manifest.ts` is served with theme color and no nonexistent icon paths
- [ ] SEOtimer Structured Data + Technical categories improve on re-audit
