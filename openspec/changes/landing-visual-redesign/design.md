# Design: Landing Visual Redesign

## Technical Approach

Two phases. **Phase A** lands brand assets, one canonical gradient token, real logo, metadata (icons/manifest/OG/Organization JSON-LD), the reusable `BrandIcon` infrastructure, and the two rewritten TDD guards — all in one sub‑400‑line PR. Phase A is the foundation because Phase B's icon color depends on the gradient token and `BrandIcon`. **Phase B** is the mechanical emoji→lucide sweep, chained per page-group. Grounded in `node_modules/.../metadata/app-icons.md`: `app/icon.png` and `app/apple-icon.png` are auto-evaluated into `<head>` `<link rel="icon"|"apple-touch-icon">`; conventions unchanged in Next 16.2.9.

## Architecture Decisions

### Decision: Asset ingestion paths
**Choice** — copy, never modify sources:
| Source | Destination | Purpose |
|--------|-------------|---------|
| `Logo quitar fondo/2.png` | `public/logo.png` | Navbar/Footer via `next/image` |
| `IconKitchen/web/icon-512.png` | `app/icon.png` | tab + auto metadata |
| `IconKitchen/web/apple-touch-icon.png` | `app/apple-icon.png` | apple-touch |
| `web/icon-{192,512}.png`, `icon-{192,512}-maskable.png` | `public/icons/*` | `manifest.icons[]` |

**Alternatives** — SVG icon route (generative); referencing `public/` for tab icon. **Rationale** — file convention is zero-config and cache-correct; PNG already provided. Keep existing `app/favicon.ico` (no brand `.ico` source; `app/icon.png` supersedes it in modern browsers) — regen is an optional follow-up.

### Decision: One gradient token
**Choice** — canonical **cyan `#38bdf8` → violet `#7c3aed`, 135°**. TS is the single source: `lib/brand.ts` exports `BRAND_CYAN`, `BRAND_VIOLET`, `BRAND_GRADIENT_CSS`. `globals.css :root` mirrors the two hex values as `--brand-cyan`/`--brand-violet` + `--brand-gradient`, plus `@theme { --color-brand-cyan/violet }` so Tailwind utilities `from-brand-cyan to-brand-violet` exist. **Alternatives** — CSS-only (OG can't read CSS); Tailwind-only (JSON-LD/OG can't). **Rationale** — OG `ImageResponse` needs a JS value; CSS needs literals. Coupling documented via a sync comment in both files. Consumers rewritten: `.gradient-text`, `.gradient-border`, Navbar/Footer `from-violet-600 to-cyan-500` → brand utilities, OG box → constant.

### Decision: BrandIcon (Phase B color)
**Choice** — `components/BrandIcon.tsx` wraps a lucide component ref (fundador pattern): default renders a **solid brand tint** (`text-brand-cyan`, `strokeWidth={1.75}`, `aria-hidden`); optional `gradient` prop switches stroke to `stroke="url(#brand-icon-gradient)"`. One hidden `<BrandIconDefs/>` (a 0×0 svg with a `<linearGradient id="brand-icon-gradient" gradientUnits="objectBoundingBox">`) is rendered once in `app/layout.tsx`. **Alternatives** — `bg-clip-text` (glyphs only, not strokes); per-icon inline `<defs>` (110× duplication); pure solid (no gradient option). **Rationale** — solid default is robust everywhere and matches shipped fundador icons; shared-defs gradient works in RSC (pure markup) for emphasis spots without Safari per-icon quirks at scale.

### Decision: Emoji→lucide mapping strategy
**Choice** — **per-file component refs** (fundador already does this: `icon: Smartphone`), guided by a single emoji→lucide reference table in tasks. No runtime string map. **Alternatives** — central `Record<emoji, LucideIcon>` resolved at render. **Rationale** — direct refs tree-shake and match the established convention; a runtime map adds indirection and breaks static import. Navbar/Footer `icon: string` types become `icon: LucideIcon`.

### Decision: OG shield
**Choice** — draw the shield monogram as **inline SVG/JSX** filled with `BRAND_GRADIENT_CSS` inside the existing `ImageResponse`, replacing the 60px gradient box. **Alternatives** — embed `logo.png` as base64 data URI via `fs`. **Rationale** — no filesystem/fetch, deterministic at build. Route, `size`, `contentType`, and `SOCIAL_IMAGE_ALT` stay stable; `twitter-image.tsx` re-export unchanged.

### Decision: Test contract rewrite (TDD first)
**Choice** — rewrite both guards to encode the new intended state before implementation. Manifest (~521-531): replace `assert.equal("icons" in manifestValue, false)` with assertions that `icons` is an array of the four `{src,sizes,type,purpose}` entries (`/icons/icon-192.png` 192×192 any, 512 any, 192/512 maskable). Organization (~374-404): drop `"logo"` from the forbidden list, extend `Object.keys` deepEqual to `["@context","@type","logo","name","url"]`, assert `logo` equals the absolute `/icon.png` (or `/logo.png`) URL; keep `sameAs/address/…` forbidden. **Rationale** — Strict TDD: rewrite, never delete.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `public/logo.png`, `app/icon.png`, `app/apple-icon.png`, `public/icons/*` | Create | Copied brand assets |
| `lib/brand.ts` | Create | Gradient constants (TS source of truth) |
| `components/BrandIcon.tsx` | Create | Icon wrapper + `BrandIconDefs` |
| `app/globals.css` | Modify | Brand vars + `@theme`; rewrite `.gradient-text`/`.gradient-border` |
| `app/manifest.ts` | Modify | Add `icons[]` |
| `components/Navbar.tsx`, `components/Footer.tsx` | Modify | `next/image` logo; brand utilities |
| `app/opengraph-image.tsx` | Modify | Inline shield in gradient |
| `lib/seo.ts` | Modify | `buildOrganizationJsonLd` adds `logo` |
| `app/layout.tsx` | Modify | Render `<BrandIconDefs/>` |
| `tests/seo.test.ts` | Modify | Rewrite 2 guards |
| ~20 pages/components | Modify (Phase B) | Emoji → `BrandIcon` |

## Interfaces / Contracts

```ts
// lib/brand.ts
export const BRAND_CYAN = "#38bdf8";
export const BRAND_VIOLET = "#7c3aed";
export const BRAND_GRADIENT_CSS = `linear-gradient(135deg, ${BRAND_CYAN}, ${BRAND_VIOLET})`;
// components/BrandIcon.tsx
type BrandIconProps = { icon: LucideIcon; className?: string; gradient?: boolean };
// manifest.icons[] entry: { src, sizes, type: "image/png", purpose: "any"|"maskable" }
// Organization JSON-LD keys: ["@context","@type","logo","name","url"]
```

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | manifest `icons[]`, Organization `logo`, gradient/OG constants | rewritten `tests/seo.test.ts` (RED→GREEN) |
| Contract | OG route/alt stable | keep existing OG assertions |
| Manual | logo, icon tint, one social card | per-route visual check (no VR harness) |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. Asset copies are static files.

## Migration / Rollout

**Phase A** (single PR): assets, `lib/brand.ts`, globals, manifest, logo swap, OG, Organization logo, `BrandIcon` + defs, 2 test rewrites. **Phase B** chained per group: (1) Navbar+Footer, (2) productos+soluciones, (3) recursos/*, (4) legal+home+precios+remainder — each imports `BrandIcon`, autonomous and verifiable. Phase B exceeds the 400-line budget → chained PRs required. Additive/revertible; no runtime coupling.

## Open Questions

- [ ] Regenerate `app/favicon.ico` from the shield (no `.ico` source today) — defer as optional follow-up?
