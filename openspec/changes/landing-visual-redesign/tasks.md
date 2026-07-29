# Tasks: Landing Visual Redesign

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | Phase A ~280-380; Phase B ~900-1200 total (5 groups) |
| 400-line budget risk | A: Medium; B overall: High |
| Chained PRs recommended | Yes |
| Suggested split | PR1 (A) → PR2 (B1) → PR3 (B2) → PR4 (B3) → PR5 (B4) → PR6 (B5) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending — user decision needed |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: Medium (Phase A) / High (Phase B overall)

Note: PR1 is a hard dependency for B1-B5 (`lib/brand.ts`, `BrandIcon`). Spec/design conflict: spec requires manifest icon `src` at `public/` root (`/icon-192.png` etc.); design named `public/icons/*`. Tasks below follow spec (test-enforced).

### Suggested Work Units

| Unit | Goal | PR | Focused test | Runtime harness | Rollback |
|------|------|----|--------------|-----------------|----------|
| A | Assets, gradient token, logo, icons/manifest/OG/Organization, BrandIcon, guards | 1 | `npm test` | Manual `/`, manifest route, `/opengraph-image` | Revert PR1 |
| B1 | Navbar+Footer icons | 2 | `npm test` | Manual navbar+footer | Revert PR2 |
| B2 | soluciones icons | 3 | `npm test` | Manual `/soluciones` | Revert PR3 |
| B3 | productos+Herramientas icons | 4 | `npm test` | Manual `/productos`,`/herramientas` | Revert PR4 |
| B4 | Seguridad/Problema/ComoFunciona+Visual*/CredentialCard/Precios/CTAFinal icons | 5 | `npm test` | Manual affected routes | Revert PR5 |
| B5 | Remaining pages (empresa/recursos/soporte/contacto/legal) icons | 6 | `npm test` | Manual affected routes | Revert PR6 |

## Phase A.1: Asset Ingestion

- [x] A.1.1 Copy `Iconos/IconKitchen-Output/web/favicon.ico` → `app/favicon.ico` (replace default).
- [x] A.1.2 Copy `.../icon-512.png` → `app/icon.png`.
- [x] A.1.3 Copy `.../apple-touch-icon.png` → `app/apple-icon.png`.
- [x] A.1.4 Copy `.../icon-192.png`, `icon-512.png`, `icon-192-maskable.png`, `icon-512-maskable.png` → `public/` root (per spec, not `public/icons/`).
- [x] A.1.5 Copy `Iconos/Logo quitar fondo/2.png` → `public/logo.png`.

## Phase A.2: RED — Rewrite Guards (`tests/seo.test.ts`)

- [x] A.2.1 (~521-531) Rewrite manifest-icons test: assert `manifest().icons` deep-equals the 4 spec entries.
- [x] A.2.2 (~374-404) Rewrite Organization test: drop `logo` from forbidden list; keys = `["@context","@type","logo","name","url"]`; assert `logo === \`${EXPECTED_SITE_URL}/icon-512.png\``.
- [x] A.2.3 Confirm OG/Twitter route+`SOCIAL_IMAGE_ALT` assertions (~328/335) stay unchanged.
- [x] A.2.4 `npm test` — confirm A.2.1/A.2.2 fail (RED), nothing else regresses.

## Phase A.3: GREEN — Implement

- [x] A.3.1 Create `lib/brand.ts`: `BRAND_CYAN`, `BRAND_VIOLET`, `BRAND_GRADIENT_CSS`.
- [x] A.3.2 `app/manifest.ts`: add `icons[]` matching A.2.1.
- [x] A.3.3 `lib/seo.ts` `buildOrganizationJsonLd()`: add `logo` matching A.2.2.
- [x] A.3.4 `npm test` — confirm GREEN.

## Phase A.4: Gradient Token Consolidation

- [x] A.4.1 `app/globals.css` `:root`: add `--brand-cyan/--brand-violet/--brand-gradient` + `@theme` color tokens; comment noting sync with `lib/brand.ts`.
- [x] A.4.2 Rewrite `.gradient-text`/`.gradient-border` to use `var(--brand-gradient)`.
- [x] A.4.3 `components/Navbar.tsx` (~136,238,343): replace `from-violet-600 to-cyan-500` with brand utility.
- [x] A.4.4 `components/Footer.tsx`: replace equivalent divergent gradient with same brand utility.

## Phase A.5: Real Logo

- [x] A.5.1 `components/Navbar.tsx` (~134-140): replace `<div>ID</div>` box with `next/image` of `public/logo.png`.
- [x] A.5.2 `components/Footer.tsx`: replace equivalent "ID" box the same way.

## Phase A.6: BrandIcon Infra

- [x] A.6.1 Create `components/BrandIcon.tsx`: `{icon: LucideIcon; className?; gradient?}`, default solid `text-brand-cyan`, `strokeWidth={1.75}`, `aria-hidden`; `gradient` → `stroke="url(#brand-icon-gradient)"`.
- [x] A.6.2 Same file: export `BrandIconDefs()` — hidden 0x0 svg with `linearGradient#brand-icon-gradient` from `lib/brand.ts`.
- [x] A.6.3 Render `<BrandIconDefs/>` once in `app/layout.tsx`.

## Phase A.7: OG/Twitter Shield

- [x] A.7.1 `app/opengraph-image.tsx`: replace gradient box (~24-31) with inline shield SVG filled via `BRAND_GRADIENT_CSS`.
- [x] A.7.2 Keep `alt`/`size`/`contentType` unchanged; `twitter-image.tsx` re-export untouched.
- [x] A.7.3 `npm test` — confirm OG stability assertion still passes.

## Phase A.8: Verification

- [x] A.8.1 `npm test` full suite green.
- [x] A.8.2 Manual: `/` — favicon, logo, consistent gradient.
- [x] A.8.3 Manual: manifest route — 4 icons resolve 200.
- [x] A.8.4 Manual: `/opengraph-image`, `/twitter-image` — shield renders.
- [x] A.8.5 Manual: view-source `/` — icon links point to brand assets.

## Phase B1: Navbar + Footer (~18 icons + footer)

- [x] B1.1 Map Navbar emoji → lucide refs; `icon: string` → `icon: LucideIcon`; render via `BrandIcon`.
- [x] B1.2 Same for Footer; keep `🇦🇷` unchanged. (Footer had no UI-icon emoji beyond the flag — nothing else to convert.)
- [x] B1.3 `npm test`; manual-verify desktop+mobile.

## Phase B2: app/soluciones (~24 icons)

- [x] B2.1 Map+replace all emoji in `app/soluciones/page.tsx` with `BrandIcon`.
- [x] B2.2 `npm test`; manual-verify `/soluciones`.

## Phase B3: app/productos + Herramientas (~11+11)

- [x] B3.1 Map+replace emoji in `app/productos/page.tsx`.
- [x] B3.2 Map+replace emoji in `components/Herramientas.tsx`.
- [x] B3.3 `npm test`; manual-verify both routes.

## Phase B4: Seguridad/Problema/ComoFunciona + Visual*/CredentialCard/Precios/CTAFinal

- [x] B4.1 Map+replace emoji in `Seguridad.tsx`, `Problema.tsx`, `ComoFunciona.tsx`.
- [x] B4.2 Map+replace emoji in `visuals/VisualDashboard.tsx`, `VisualCredencial.tsx`, `VisualBiometrico.tsx`, `VisualAcceso.tsx`, `CredentialCard.tsx`.
- [x] B4.3 Map+replace emoji in `Precios.tsx`, `CTAFinal.tsx`.
- [x] B4.4 `npm test`; manual-verify affected routes.

## Phase B5: Remaining pages

- [x] B5.1 Map+replace emoji in `app/recursos/{empresa,page,soporte,contacto}` pages (`fundador`/`aprender` had none — no emoji present, `legal/privacidad`/`legal/terminos`/`not-found.tsx` had none either).
- [x] B5.2 Map+replace emoji in `app/legal/page.tsx` (only file in this set with emoji; `privacidad`/`terminos`/`not-found.tsx` confirmed emoji-free).
- [x] B5.3 `npm test`; manual-verify each route.
- [x] B5.4 Repo-wide grep confirms no leftover emoji outside Footer's `🇦🇷` (one additional exception found and confirmed in-scope-to-keep: a `✓` inside a copy string in `VisualBiometrico.tsx`'s status label, not a rendered icon field — copy is out of Phase B scope).
