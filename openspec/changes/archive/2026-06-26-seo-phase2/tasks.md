# Tasks: SEO Phase 2 — Structured Data & Technical Hardening

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 260-360 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR; split into Unit 1 → Unit 2 only if diff grows past budget |
| Delivery strategy | auto-forecast |
| Chain strategy | single PR unless final diff exceeds budget |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: single PR unless final diff exceeds budget
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Add SEO builders, root wiring, and RED tests | PR 1 | Same branch; safe first slice if scope grows |
| 2 | Wire page breadcrumbs, 404, manifest, and heading fixes | PR 1 | Keep with verification unless review budget is exceeded |

### Planning Notes

- Planning artifacts have been reconciled: `themeColor` belongs in the Next.js viewport export, 404 indexing relies on Next.js 404/noindex behavior, and manifest icons are deferred until real manifest icon assets exist.
- `openspec/config.yaml` still reports no test runner while `tests/seo.test.ts` exists; verify command viability during apply without editing config yet.

## Phase 1: Foundation

- [x] 1.1 Read the relevant Next.js 16 docs in `node_modules/next/dist/docs/` for viewport, `not-found`, and manifest before touching `lib/seo.ts`, `app/layout.tsx`, `app/not-found.tsx`, or `app/manifest.ts`.
- [x] 1.2 Extend `lib/seo.ts` with `BreadcrumbItem`, `buildBreadcrumbJsonLd()`, `buildOrganizationJsonLd()`, and the doc-backed root theme-color export path.
- [x] 1.3 Add RED assertions in `tests/seo.test.ts` for Organization fields, BreadcrumbList ordering, root theme color, and manifest export shape.

## Phase 2: Structured Data Wiring

- [x] 2.1 Update `app/layout.tsx` to emit exactly one Organization JSON-LD `<script>` via `toJsonLd()` and expose the root theme-color export chosen in Phase 1.
- [x] 2.2 Add BreadcrumbList JSON-LD plus `aria-label="Breadcrumb"` to `app/legal/page.tsx`, `app/legal/privacidad/page.tsx`, `app/legal/terminos/page.tsx`, `app/recursos/page.tsx`, `app/recursos/empresa/page.tsx`, and `app/recursos/soporte/page.tsx`.
- [x] 2.3 Add the same breadcrumb updates to `app/recursos/aprender/page.tsx`, `app/productos/page.tsx`, `app/soluciones/page.tsx`, and `app/recursos/contacto/layout.tsx` for the client contact route.

## Phase 3: Technical Hardening

- [x] 3.1 Create `app/not-found.tsx` with branded home navigation and the 404 noindex behavior confirmed by the doc-backed design.
- [x] 3.2 Create `app/manifest.ts` with `name`, `short_name`, `theme_color`, `background_color`, `display`, and `start_url`, avoiding nonexistent icon paths.
- [x] 3.3 Change the first skipped `<h3>` subheads to `<h2>` in `components/ComoFunciona.tsx` and `components/Precios.tsx` without changing styling classes.

## Phase 4: Verification

- [x] 4.1 GREEN/REFACTOR `tests/seo.test.ts` until helper, manifest, and representative breadcrumb assertions pass via `node --import tsx --test tests/seo.test.ts`.
- [x] 4.2 Manually verify rendered HTML and metadata on `/productos`, `/recursos/aprender`, `/legal/privacidad`, the 404 route, and the manifest response against proposal/spec expectations.
- [x] 4.3 Check final diff size; if review scope exceeds ~400 changed lines, split apply work by the planned work units before opening PRs.
