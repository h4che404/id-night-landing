# Design: Homepage Mobile Clipping Remediation

## Technical Approach

Use the production evidence gap as the primary fix target. A fresh clean build plus CDP geometry at exact CSS viewports found no hero essential-content overflow at 320, 360, 375, 390, or 430. The apparent `home-prod-375x812.png` / `home-prod-390x844.png` clipping is caused by the capture mechanism: Chrome CLI `--screenshot --window-size=375,812` lays out the page at a 500px headless viewport (observed `innerWidth=500`, `visualViewport=485`) and crops the resulting image to 375px, making valid 500px line wrapping look clipped.

Implementation should therefore replace the unreliable capture proof with a production CDP screenshot/geometry harness. Do not change homepage copy, root overflow, or `sections.tsx` unless the new harness produces a real selector-level RED failure where a text range or essential element right edge exceeds the requested CSS viewport.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Offender source | Treat the old screenshot path as the offender, not current CSS | Guess at hero typography/grid pressure | CDP range geometry on a fresh build shows all required hero bounds inside exact viewports; CLI crop explains the visual artifact exactly. |
| CSS scope | Conditional `components/home/sections.tsx` change only if harness names a true offender | Root `overflow-x-hidden`, broad shell redesign | The spec rejects masking and requires preserving desktop rhythm/content. |
| Evidence | Node built-ins + existing Chrome CDP, deviceScaleFactor 1 | New Playwright/Puppeteer dependency; DOM scroll metrics only | Meets no-dependency constraint and proves pixels plus geometry. |

## Data Flow

`source` → `rm -rf .next && npm run build` → `npm run start` → `Chrome --headless --remote-debugging-port` → `Emulation.setDeviceMetricsOverride` → `Page.captureScreenshot` + `Runtime.evaluate` range geometry → pass/fail report → cleanup server/browser/temp profile.

## File Changes

| File | Action | Description |
|---|---|---|
| `openspec/changes/homepage-mobile-clipping-remediation/design.md` | Create | This technical design. |
| `components/home/sections.tsx` | Modify only if proven | Fix the exact class named by the harness, likely `min-w-0`, smaller mobile clamp, or wrapping/CTA pressure; otherwise leave untouched. |
| `tests/seo.test.ts` | Modify if useful | Preserve static copy, section order, H1, CTA hrefs, and no-content-removal contracts. |

## Interfaces / Contracts

Harness contract: for `320x812`, `360x800`, `375x812`, `390x844`, `430x932`, every selector for hero eyebrow, H1 text ranges, description, primary CTA, secondary CTA, status, context links, and media card MUST satisfy `left >= 0` and `right <= viewportWidth`. Regression screenshots run at `768x1024`, `1024x768`, `1440x900`, `1920x1080`. A passing `scrollWidth` alone is ignored.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit/static | Content, section order, H1, CTA/link/SEO preservation | `npm test`; add focused guards only if implementation touches these surfaces. |
| Check-only | Type/lint/build freshness | `npm run lint`, `npx tsc --noEmit`, `rm -rf .next && npm run build`. |
| Production visual/geometry | Exact viewport screenshots and essential-content bounds | Start `next start` from the fresh build, run CDP harness, save 1x screenshots/report, kill server/Chrome, remove temp profile. RED is either old CLI crop rejected (`innerWidth !== requested`) or a real selector overflow; GREEN is all required bounds within viewport. |

## Threat Matrix

| Boundary | Applicability | Design response | Planned RED tests |
|---|---|---|---|
| Documentation-like paths | N/A — no executable-file classification | None | None |
| Git repository selection | N/A — no git commands | Run commands from fixed project cwd only | None |
| Commit state | N/A — no commits | None | None |
| Push state | N/A — no pushes | None | None |
| PR commands | N/A — no PR automation | None | None |

Process safety: the harness uses fixed localhost URL/ports, no user-supplied shell interpolation, and mandatory cleanup traps.

## Migration / Rollout

No migration required. If no true CSS offender is found, rollout is verification-only; otherwise revert the narrow `sections.tsx` class change.

## Open Questions

None.
