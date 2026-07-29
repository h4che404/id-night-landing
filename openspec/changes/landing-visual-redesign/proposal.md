# Proposal: Landing Visual Redesign

## Intent

The landing sells B2B access-control software to nightclubs/events, yet its visual presentation reads as unfinished: the brand is a text "ID" box (no real logo), ~110 emojis stand in for icons across 20 files, the OG/Twitter card is a bare gradient square, favicon/PWA icons are Next defaults, and three divergent gradient definitions fracture the brand. A cohesive, professional identity is a direct sales asset. Real brand assets (shield logo, favicon/PWA set) already exist outside the repo, ready to wire in.

## Scope

### In Scope
- **Phase A (brand & metadata):** copy assets into the repo; real shield logo in Navbar + Footer (replaces "ID" text box); wire `app/icon.png` + `app/apple-icon.png` + favicon + `manifest.ts` `icons[]`; redesign OG/Twitter image with the shield monogram; consolidate the brand gradient (`#38bdf8 → #7c3aed`) into ONE token; deliberately rewrite the two blocking tests (manifest HAS icons; Organization JSON-LD HAS logo).
- **Phase B (icon sweep):** replace ~110 emojis with lucide-react icons tinted in the brand gradient, page by page, following the `fundador` pattern.
- Restyle 18 routes for visual consistency; preserve shared motion primitives.

### Out of Scope
- Copy/messaging changes; no team/plural framing (solo founder, Mendoza).
- Footer `🇦🇷` flag — kept as a locale marker, NOT migrated to the icon system.
- Layout/IA restructuring, new pages, performance/CWV work.
- The parent `ID-Night/` folder — read/copy assets only, never modify it.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `landing-seo`: manifest now includes brand `icons[]`; Organization JSON-LD now includes `logo`; OG/Twitter image asset redesigned (route/alt kept stable).

## Approach

Phase A before Phase B. A is small and test-touching (assets, logo, metadata, gradient token, two deliberate test-contract updates encoding the new intended state — Strict TDD: rewrite, do not delete). B is large and mechanical (emoji→lucide, following `app/recursos/fundador/page.tsx`). Grounded in `node_modules/next/dist/docs/`: file-based icon/manifest conventions unchanged in Next 16.2.9.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `public/`, `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` | New | Copied brand assets |
| `app/manifest.ts` | Modified | Add `icons[]` |
| `components/Navbar.tsx`, `components/Footer.tsx` | Modified | Real logo |
| `app/opengraph-image.tsx`, `twitter-image.tsx` | Modified | Shield monogram |
| `app/globals.css` + shared gradient constant | Modified | One gradient token |
| `lib/seo.ts` / layout | Modified | Organization `logo` |
| ~20 component/page files | Modified | Emoji → lucide (Phase B) |
| `tests/seo.test.ts` | Modified | Rewrite 2 guards; keep OG assertions |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| No visual-regression coverage for icon/logo/styling | High | Manual verification per route |
| OG image change is site-wide | Med | Keep route/alt stable; validate one card |
| Gradient consolidation shifts existing visuals | Med | Map all 3 defs to one token; spot-check |
| Phase B exceeds 400-line review budget | High | Chain/stack PRs per page group |

## Rollback Plan

Additive and revertible. Revert the PR/commit; copied assets and new icon files are removed, logo swaps and gradient token revert with no runtime coupling. Test-contract updates revert with their commit.

## Dependencies

- Brand assets present at the parent-folder paths (verified). Strict TDD: `node --import tsx --test tests/seo.test.ts`.

## Success Criteria

- [ ] Real shield logo renders in Navbar + Footer; no "ID" text box remains.
- [ ] `app/icon.png`, `app/apple-icon.png`, favicon, and manifest `icons[]` serve brand assets.
- [ ] OG/Twitter card shows the shield monogram; OG route/alt assertions still pass.
- [ ] Single brand gradient token used everywhere; three old defs removed.
- [ ] All ~110 emojis replaced with lucide icons (except Footer `🇦🇷` locale marker).
- [ ] `tests/seo.test.ts` passes with rewritten manifest-icons and Organization-logo contracts.
