## Exploration: homepage-mobile-clipping-remediation

### Current State
- The homepage is composed server-first via `components/home/HomePage.tsx` → `components/home/sections.tsx`.
- The visible mobile risk is concentrated in the hero: `shell` uses `mx-auto max-w-6xl px-6`, the hero body uses `clamp()` typography, and the hero media column is only gated to `lg`.
- Root layout already clamps horizontal overflow on both `<html>` and `<body>`, which can hide the real offender from scroll-metric checks.
- Clean production screenshots at **375x812** and **390x844** show real right-edge clipping; desktop **1440x900** is clean.
- Earlier CDP/overflow checks likely false-passed because they relied on DOM metrics (`scrollWidth === clientWidth`) plus a screenshot pipeline that captured at a different scale/device setup than production.

### Affected Areas
- `components/home/sections.tsx` — hero typography, section shells, and CTA rows are the most likely source of the mobile crop.
- `app/layout.tsx` — global `overflow-x-hidden` can mask visible overflow and make metric-only checks lie.
- `components/Navbar.tsx` — fixed header and mobile menu should be kept in the regression set in case the crop is adjacent to the top chrome.
- `app/globals.css` — shared base styles and any future viewport/overflow resets belong in the audit path.
- `openspec/changes/homepage-mobile-clipping-remediation/*` — change artifacts must capture the remediation contract and evidence plan.

### Approaches
1. **Tighten the hero layout only** — keep copy/IA unchanged, reduce mobile hero width pressure, and ensure the hero/grid children can shrink cleanly (`min-w-0`, safer clamp values, no accidental wide intrinsic sizing).
   - Pros: narrowest likely fix; preserves content, SEO, and contact behavior.
   - Cons: if the real offender is outside the hero, this alone may miss it.
   - Effort: Low/Medium

2. **Broaden the responsive audit and add exact-viewport visual validation** — keep the code audit wide, but make the acceptance proof depend on exact production-size screenshots at 320, 360, 375, 390, 430, plus desktop regression.
   - Pros: catches the actual failure mode; avoids another scroll-metric false positive.
   - Cons: does not itself fix the layout.
   - Effort: Medium

3. **Global overflow hardening pass** — revisit root/header/menu wrappers and eliminate any width expansion sources across the page.
   - Pros: reduces the chance of hidden overflow elsewhere.
   - Cons: broader blast radius; easy to overcorrect and mask the symptom instead of fixing it.
   - Effort: Medium

### Recommendation
Use **Approach 1 + 2**: fix the narrow mobile pressure in `components/home/sections.tsx`, then verify with exact production screenshots at **320, 360, 375, 390, 430** and desktop **1440** (plus the existing 768/1024/1920 regression sweep). Preserve all copy, Golden Circle order, SEO, and contact behavior.

### Risks
- `overflow-x-hidden` on the root can keep producing false confidence if the next verification only checks scroll metrics.
- Retina/scale mismatches can make a 2x CDP capture look clean while a 1x production capture still clips.
- Over-broad fixes in layout wrappers could change the desktop rhythm or hide a different underlying offender.

### Ready for Proposal
Yes — there is enough evidence to define a narrow remediation proposal and a stricter acceptance harness.
