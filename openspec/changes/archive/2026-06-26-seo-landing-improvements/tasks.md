# Tasks: SEO Landing Improvements

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | 220-320 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|---|---|---|---|
| 1 | Metadata, schema, and crawl-hygiene slice | PR 1 | Keep all validations and copy guardrails in the same review |

## Phase 1: Metadata Foundation

- [x] 1.1 Update `app/layout.tsx` shared metadata defaults so canonical, Open Graph, and Twitter fields are explicit and reusable.
- [x] 1.2 Add root-route metadata in `app/page.tsx` and confirm the home page can express route-specific social copy without losing shared nested fields.
- [x] 1.3 Add or confirm route metadata for indexable public pages under `app/**/page.tsx`, prioritizing `/productos`, `/soluciones`, `/precios`, `/problema`, `/como-funciona`, `/herramientas`, and `/recursos`.

## Phase 2: Social Images and Structured Data

- [x] 2.1 Update `app/opengraph-image.tsx` so shared image text stays inside approved positioning guardrails.
- [x] 2.2 Create `app/twitter-image.tsx` if explicit Twitter file-based image support is needed to mirror the shared OG strategy.
- [x] 2.3 Add root JSON-LD in `app/page.tsx` for Organization or SoftwareApplication using only visible claims.
- [x] 2.4 Add FAQPage JSON-LD in `app/recursos/aprender/page.tsx` and `app/recursos/soporte/page.tsx` from the rendered FAQ arrays; breadcrumb JSON-LD on breadcrumbed routes was intentionally deferred from implementation scope because the final spec only says `BreadcrumbList` MAY be emitted.

## Phase 3: Crawl Hygiene and Copy Guardrails

- [x] 3.1 Update `app/sitemap.ts` so intended canonical public routes are listed once with stable priorities and frequencies.
- [x] 3.2 Update `app/robots.ts` so host and sitemap declarations match the production canonical domain.
- [x] 3.3 Review touched metadata, schema, and visible copy for the approved ID-Night framing and remove any forbidden claims or blacklist/listas negras wording.

## Phase 4: Validation

- [x] 4.1 Run `npm run lint` and resolve any issues caused by metadata or JSON-LD changes.
- [x] 4.2 Run `npx tsc --noEmit` and fix typing issues in route metadata or schema payloads.
- [x] 4.3 Manually verify source files: route canonicals, Open Graph/Twitter fields, sitemap entries, robots output, and FAQ/breadcrumb schema all match visible content.
