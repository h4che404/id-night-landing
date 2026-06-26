# Design: SEO Landing Improvements

## Technical Approach

Implement a narrow App Router SEO hardening pass for the existing public landing pages. The change adds route-aware metadata, sitemap and robots cleanup, and route-local JSON-LD only where the UI already renders matching content. This follows the `landing-seo` spec and avoids broader performance or content expansion.

## Architecture Decisions

| Decision | Option | Tradeoff | Decision |
|---|---|---|---|
| Metadata composition | Put all SEO values inline per page vs shared defaults plus route overrides | Inline duplication is simple but fragile; shared defaults reduce drift but Next.js shallow merge can drop nested fields | Use shared defaults in `app/layout.tsx` and route-level metadata objects/functions that restate nested `openGraph`/`twitter` fields when overridden |
| Social images | Reuse only `app/opengraph-image.tsx` vs add explicit Twitter image file | Reuse is smaller; explicit Twitter file avoids platform ambiguity | Keep `app/opengraph-image.tsx` and add `app/twitter-image.tsx` if the same visual is needed for deterministic Twitter cards |
| Schema placement | Central helper everywhere vs route-local JSON-LD blocks | Central helpers reduce repetition; route-local output is easier to keep aligned with visible content | Prefer small route-local JSON-LD objects, with a tiny shared helper only if duplication becomes noisy |

## Data Flow

Route content/components
  → route `metadata` export or `generateMetadata`
  → Next.js metadata resolution
  → `<head>` canonical/Open Graph/Twitter tags

Route JSX with visible breadcrumb/FAQ/content
  → inline JSON-LD object in route component
  → `<script type="application/ld+json">`

Static route inventory
  → `app/sitemap.ts` and `app/robots.ts`
  → crawl hints for search engines

## File Changes

| File | Action | Description |
|---|---|---|
| `app/layout.tsx` | Modify | Normalize shared metadata defaults, canonical base, and shared social fields |
| `app/page.tsx` | Modify | Add root route metadata and root JSON-LD aligned with visible sections |
| `app/productos/page.tsx` and selected `app/**/page.tsx` public routes | Modify | Add route-specific Open Graph/Twitter metadata and route-local schema where content supports it |
| `app/recursos/aprender/page.tsx` | Modify | Add FAQPage and breadcrumb-aligned JSON-LD only for rendered FAQs/breadcrumbs |
| `app/recursos/soporte/page.tsx` | Modify | Add FAQPage and breadcrumb-aligned JSON-LD only for rendered FAQs/breadcrumbs |
| `app/sitemap.ts` | Modify | Keep canonical public route list and stable crawl hints synchronized |
| `app/robots.ts` | Modify | Confirm host, sitemap, and crawl policy reflect production canonical behavior |
| `app/opengraph-image.tsx` | Modify | Keep shared OG image text aligned with approved positioning |
| `app/twitter-image.tsx` | Create | Provide explicit Twitter card image if separate file-based support is used |

## Interfaces / Contracts

- Route metadata MUST include canonical URL and route-appropriate title/description.
- Any route overriding nested `openGraph` or `twitter` data MUST restate required inherited fields to avoid shallow-merge loss.
- JSON-LD MUST only describe visible route content, especially FAQ answers, audience, and product claims.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Static quality | Metadata/schema code compiles cleanly | `npx tsc --noEmit` |
| Static quality | App Router files follow repo lint rules | `npm run lint` |
| Manual verification | Source output and route content alignment | Review route metadata exports, JSON-LD payloads, sitemap entries, and robots content in source; no test runner is configured |

## Migration / Rollout

No migration required. Deploy as a single slice; rollback is a normal code revert.

## Open Questions

- [ ] None blocking. Reuse the existing visual for `app/twitter-image.tsx` unless implementation reveals a platform-specific constraint.

## Risk Mitigations

- **Next.js metadata shallow merge**: whenever a route customizes nested social metadata, explicitly include inherited image/site fields instead of assuming deep merge.
- **Visible-content alignment**: generate FAQPage and breadcrumb schema only from arrays or labels already rendered on the page, and keep home-page Organization/SoftwareApplication text constrained to visible copy.
