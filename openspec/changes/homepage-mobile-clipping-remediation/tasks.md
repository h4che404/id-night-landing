# Tasks: Homepage Mobile Clipping Remediation

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 140-260 |
| 400-line budget risk | Low |
| 800-line hard-cap risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR / single work unit |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Build production CDP proof, reject false CLI evidence, and apply a selector-level fix only if the harness proves one | PR 1 | `npm test && npm run lint && npx tsc --noEmit` | `rm -rf .next && npm run build && npm run start` + `node scripts/homepage-mobile-cdp-harness.mjs` | `scripts/homepage-mobile-cdp-harness.mjs`, optional `components/home/sections.tsx`, optional `tests/seo.test.ts`, `openspec/changes/homepage-mobile-clipping-remediation/{tasks.md,apply-progress.md}` |

## Phase 1: Foundation

- [x] 1.1 Create `scripts/homepage-mobile-cdp-harness.mjs` with Node built-ins + Chrome CDP only; enforce exact CSS viewports, deviceScaleFactor 1, selector geometry, screenshot capture, and cleanup traps.
- [x] 1.2 Keep OpenSpec evidence concise by storing runtime PNG/JSON/log artifacts only in the approved external temp directory and summarizing paths/hashes in `apply-progress.md`.

## Phase 2: RED Evidence

- [x] 2.1 Run a fresh production baseline with `rm -rf .next && npm run build` and `npm run start`, then use the harness for `320x812`, `360x800`, `375x812`, `390x844`, `430x932`, `768x1024`, `1024x768`, `1440x900`, and `1920x1080`.
- [x] 2.2 Capture the old Chrome CLI `--screenshot --window-size` path beside the harness and save proof that `innerWidth`/crop differs from the requested CSS viewport.
- [x] 2.3 If the harness finds a real offender, record a RED assertion/report naming the exact selector or text range before touching homepage layout; otherwise mark CSS as no-change.

## Phase 3: Conditional Remediation

- [x] 3.1 Only when Phase 2 names a real offender, apply the smallest mobile-only fix in `components/home/sections.tsx`; do not use `app/layout.tsx` or `app/globals.css` overflow masking as the remedy.
- [x] 3.2 Re-run the harness and preserve exact homepage copy, nine-section order, Golden Circle flow, CTA destinations, WhatsApp links, and SEO/static contracts; update `tests/seo.test.ts` only if a touched surface needs a guard.

## Phase 4: Verification and Closeout

- [x] 4.1 Run `npm test`, `npm run lint`, `npx tsc --noEmit`, a fresh production build, and the exact viewport harness; save final results and confirm no desktop/tablet regressions.
- [x] 4.2 Update `openspec/changes/homepage-mobile-clipping-remediation/tasks.md` and `apply-progress.md`, delete premature repo evidence payloads, and stop `next start`/Chrome temp processes cleanly.
