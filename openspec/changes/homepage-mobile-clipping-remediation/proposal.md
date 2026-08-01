# Proposal: Homepage Mobile Clipping Remediation

## Intent

Fix the production-only mobile clipping exposed by clean 1x captures at 375x812 and 390x844. The archived `homepage-brand-repositioning` verification is superseded for mobile visual proof: it passed with scaled/dev evidence that later masked right-edge clipping, and this change remediates that gap.

## Scope

### In Scope
- Remove the true mobile width pressure, likely in `components/home/sections.tsx` hero/layout sizing, without relying on `overflow-x-hidden` as the fix.
- Prove 1x production-server screenshots and pixel/geometry inspection at 320, 360, 375, 390, 430; regress 768, 1024, 1440, 1920.
- Preserve all approved homepage behavior: exact nine sections, Golden Circle order, copy, SEO, WhatsApp links, routes, reduced-motion/mobile behavior, and desktop visual rhythm.

### Out of Scope
- New content, sections, routes, dependencies, major redesigns, or SEO/contact rewrites.
- Fixing archived non-blocking warnings unrelated to clipping.

## Proposal Question Round

- Assumption: production-server 1x captures are the visual acceptance authority even when scroll metrics pass.
- Assumption: source/test changes stay minimal and may only touch layout/verification surfaces needed to remove clipping.
- Assumption: any copy/SEO/route change is a regression unless strictly required to preserve the existing contract.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `homepage-brand-narrative`: strengthen release-quality evidence for mobile usability so production 1x pixel/geometry proof replaces the unreliable prior visual proof.

## Approach

Audit the hero and section shells for non-shrinking or oversized children (`min-w-0`, grid/card intrinsic width, clamp values, mobile padding). Apply the narrowest responsive layout correction, then verify from a production server with exact CSS viewport captures and geometry/pixel inspection rather than scroll metrics alone.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `components/home/sections.tsx` | Modified | Narrow hero/section width-pressure fix. |
| `app/layout.tsx`, `app/globals.css` | Reviewed | Ensure root overflow does not become the claimed fix. |
| `tests/seo.test.ts` | Modified if useful | Preserve copy/route/contact/SEO contracts. |
| `openspec/changes/homepage-mobile-clipping-remediation/*` | New/Modified | Spec and verification evidence contract. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Masking instead of fixing overflow | Med | Require production 1x pixel/geometry proof. |
| Desktop rhythm regression | Low | Include 768/1024/1440/1920 sweep. |
| Accidental content/SEO drift | Low | Keep tests/contracts focused on preservation. |

## Rollback Plan

Revert the narrow layout/test/spec commits for this change; the archived homepage remains the previous functional baseline, with the known mobile clipping bug restored.

## Dependencies

- Existing Next.js/Tailwind stack only; no new dependencies.

## Success Criteria

- [ ] 320/360/375/390/430 production 1x captures show no right-edge clipping or hidden essential content.
- [ ] 768/1024/1440/1920 regression captures preserve tablet/desktop rhythm.
- [ ] Copy, nine-section order, Golden Circle, SEO, WhatsApp, routes, and behavior remain unchanged.
