# Apply Progress: SEO Landing Improvements

## Status

- Mode: Standard
- Delivery: Single PR slice
- Tasks complete: 13/13

## Completed Work

- Centralized reusable metadata defaults in `lib/seo.ts` and updated landing/resource/legal routes to keep canonical, Open Graph, and Twitter fields explicit.
- Added home-page `SoftwareApplication` JSON-LD plus FAQ JSON-LD on the rendered FAQ routes under `recursos`.
- Added explicit `app/twitter-image.tsx`, updated the shared OG image copy, and aligned hero/security wording with the approved human-in-the-loop framing.
- Stabilized `app/sitemap.ts` last-modified values and shared domain usage across `app/sitemap.ts` and `app/robots.ts`.
- Remediation reduced scope by reverting the SEO-driven home section split, large hero redesign, generated app icon/public asset additions, and other non-essential UI rewrites so the slice stays focused on metadata, crawl hygiene, social images, and copy guardrails.
- Strengthened `tests/seo.test.ts` after the reliability review so all changed public routes now use hardcoded external title/description/canonical contracts, social alignment assertions, and robots assertions no longer import implementation constants for private disallow paths.
- Intentionally kept breadcrumb JSON-LD out of implementation scope even on breadcrumbed routes because the final spec only says `BreadcrumbList` MAY be emitted; FAQ JSON-LD was the only structured-data route slice completed here.

## Validation

- `npm test` ✅
  - Added deterministic SEO contract coverage for root metadata, all changed-route metadata/canonical/social contracts, sitemap, robots, JSON-LD helpers, and copy guardrails using the Node test runner via `tsx --test`.
- `npm run lint` ❌
  - Pre-existing failures remain in `app/legal/terminos/page.tsx` (`react/no-unescaped-entities`), `app/legal/privacidad/page.tsx` (`react/no-unescaped-entities`), and `components/Navbar.tsx` (`react-hooks/set-state-in-effect`).
  - `components/visuals/VisualDashboard.tsx` also keeps the pre-existing `@typescript-eslint/no-unused-vars` warning.
  - No remediation-specific lint failures were introduced by the reduced SEO slice.
- `npx tsc --noEmit` ✅
- `npm audit` / PR risk review ⚠️
  - Existing PostCSS XSS advisory remains via the current Next.js dependency chain.
  - Dependency upgrades were intentionally left out of this SEO PR to avoid broadening the slice beyond test/artifact remediation.

## Manual Verification

- Confirmed route metadata now uses explicit canonical, Open Graph, and Twitter values through `createPageMetadata()`.
- Confirmed automated tests lock the root metadata, public sitemap routes, robots sitemap/private-path rules, JSON-LD serialization, and banned SEO claims.
- Confirmed all changed public routes in scope (`/`, `/productos`, `/soluciones`, `/seguridad`, `/recursos/aprender`, `/recursos/soporte`, `/precios`, `/problema`, `/como-funciona`, `/herramientas`, `/recursos`, `/recursos/empresa`, `/recursos/contacto`, `/legal`, `/legal/terminos`, `/legal/privacidad`) now assert exact hardcoded canonical/title/description contracts plus Open Graph/Twitter alignment directly from exported metadata.
- Confirmed `app/page.tsx` JSON-LD stays aligned with visible home-page claims.
- Confirmed FAQ JSON-LD uses the rendered FAQ arrays on `/recursos/aprender` and `/recursos/soporte`.
- Confirmed `app/sitemap.ts` and `app/robots.ts` share the production domain constants.
- Confirmed breadcrumb JSON-LD remains intentionally deferred and documented as optional/out-of-scope rather than implemented.

## Notes

- Existing repo changes outside this change set were left untouched.
- Remediation intentionally reverted broad UI/content changes that were not required for SEO contracts.
- Known PostCSS advisory via Next.js remains open and explicitly out of scope for this SEO PR.
