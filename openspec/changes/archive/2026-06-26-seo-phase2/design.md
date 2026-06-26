# Design: SEO Phase 2 — Structured Data & Technical Hardening

## Technical Approach

Pure-additive extension of the existing SEO layer. All structured data flows through `lib/seo.ts` builder functions returning the existing `JsonLd` type, rendered via the existing XSS-safe `toJsonLd()` into `<script type="application/ld+json">` blocks. New Next.js file-convention routes (`not-found.tsx`, `manifest.ts`) follow App Router conventions verified against the bundled v16.2.9 docs. Strict TDD: assertions added to `tests/seo.test.ts` (`node:test`) before implementation. No runtime coupling to cycle-1 behavior.

## Architecture Decisions

| # | Decision | Choice | Rejected | Rationale |
|---|----------|--------|----------|-----------|
| D-1 | Breadcrumb builder location | `buildBreadcrumbJsonLd(items)` in `lib/seo.ts`; injected in server `page.tsx`/`layout.tsx` per route | Per-component helper; client-side render | Mirrors existing `buildHomePageJsonLd`/`buildFaqJsonLd` pattern; JSON-LD must be SSR'd |
| D-2 | Organization builder | `buildOrganizationJsonLd()` → `name` + `url` ONLY, injected in `app/layout.tsx` | Adding logo/sameAs/address | No verifiable social/logo/address data exists; inventing fields violates proposal constraint |
| D-3 | Heading hierarchy | Rename `<h3>`→`<h2>` in `ComoFunciona.tsx` L81 and `Precios.tsx` L78, keep all Tailwind classes | Restructure markup; add new headings | Page has `<h1>` then `<h3>` (skip). Tag-only swap preserves visuals |
| D-4 | Breadcrumb a11y | Add `aria-label="Breadcrumb"` to the 10 breadcrumb `<nav>` elements | Add `role`/`<ol>` restructure | Purely additive; minimal diff |
| D-5 | 404 page | Server Component `app/not-found.tsx`, branded UI + `<Link href="/">`. Rely on Next's 404/noindex behavior | Manual `robots` metadata export | Bundled docs: `notFound()` injects `<meta name="robots" content="noindex" />`; streamed 404 responses also receive `noindex`, while non-streamed 404s return HTTP 404 |
| D-6 | Manifest | `app/manifest.ts` → `MetadataRoute.Manifest`, NO `icons` in this phase | Include `icons` | Manifest docs support icons, but this phase has no manifest-ready brand icon assets; existing `app/favicon.ico` remains file-convention favicon |
| D-7 | themeColor placement | `viewport` export, NOT `metadata`. Add `createRootViewport(): Viewport` to `lib/seo.ts`; export `viewport` from `app/layout.tsx` | `themeColor` inside `createRootMetadata()` or any `metadata` field | Bundled v16.2.9 `generate-viewport.md`: `themeColor` lives in the `Viewport` type; placing it in `metadata` is deprecated/ignored |
| D-8 | Tests | Extend `tests/seo.test.ts` with builder + viewport + manifest assertions | New test file | Existing contract-test file already imports all SEO modules |

## Data Flow

    lib/seo.ts builders ──→ toJsonLd() ──→ <script ld+json>  (SSR'd server components)
         │
         ├─ buildOrganizationJsonLd() ──→ app/layout.tsx
         ├─ buildBreadcrumbJsonLd()   ──→ each inner page/layout.tsx
         └─ createRootViewport()      ──→ app/layout.tsx (viewport export)

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `lib/seo.ts` | Modify | Add `buildBreadcrumbJsonLd`, `buildOrganizationJsonLd`, `createRootViewport` |
| `app/layout.tsx` | Modify | Inject Organization `<script>`; add `export const viewport` |
| `app/not-found.tsx` | Create | Branded 404 Server Component (auto-noindex) |
| `app/manifest.ts` | Create | Web manifest, no icons |
| `components/ComoFunciona.tsx` | Modify | L81 `<h3>`→`<h2>` |
| `components/Precios.tsx` | Modify | L78 `<h3>`→`<h2>` |
| 10 breadcrumb pages/layouts | Modify | BreadcrumbList JSON-LD + `aria-label="Breadcrumb"` |
| `tests/seo.test.ts` | Modify | New assertions |

Breadcrumb `<nav>` locations: `app/legal/page.tsx`, `app/legal/privacidad/page.tsx`, `app/legal/terminos/page.tsx`, `app/recursos/page.tsx`, `app/recursos/empresa/page.tsx`, `app/recursos/soporte/page.tsx`, `app/recursos/aprender/page.tsx`, `app/recursos/contacto/page.tsx`, `app/productos/page.tsx`, `app/soluciones/page.tsx`. Contacto page is `"use client"` → BreadcrumbList JSON-LD injected in `app/recursos/contacto/layout.tsx`.

## Interfaces / Contracts

```ts
// lib/seo.ts
export type BreadcrumbItem = { name: string; url: string };

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd; // @type ItemList "BreadcrumbList", itemListElement: ListItem[] with position
export function buildOrganizationJsonLd(): JsonLd; // { "@type": "Organization", name: SITE_NAME, url: SITE_URL } only
export function createRootViewport(): Viewport; // { themeColor: "#7C3AED" }
```

Brand color `#7C3AED` (`--color-accent-violet`); manifest `background_color: "#08080F"` (`--background`), `theme_color: "#7C3AED"`, `display: "standalone"`, `start_url: "/"`, and no `icons` field until real manifest icon assets exist.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `buildOrganizationJsonLd()` → `@type`/`name`/`url`, no invented fields | Import + assert keys |
| Unit | `buildBreadcrumbJsonLd(sample)` → BreadcrumbList + position ordering | Import + assert structure |
| Unit | `createRootViewport().themeColor === "#7C3AED"` | Import + assert |
| Integration | `app/manifest.ts` default export shape (name/theme_color/display/no icons) | Import module + assert |

## Migration / Rollout

No migration required. Pure-additive; revert PR to roll back.

## Open Questions

- None.
