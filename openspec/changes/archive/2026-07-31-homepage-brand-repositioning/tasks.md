# Tasks: Homepage Brand Repositioning

## Review Workload Forecast

| Field | Value |
|---|---|
| estimated changed lines | 820-1050 |
| risk level | High |
| Chained PRs recommended | Yes |
| 800-line budget risk | High |
| Delivery strategy | ask-on-risk → resolved to chained delivery for this change |
| Chain strategy | feature-branch-chain |
| Decision needed before apply | No |
| recommended boundaries | 1) next autonomous slice: tests+content/contact scaffold (220-300) 2) next autonomous slice: homepage/nav/footer (360-470) 3) next autonomous slice: SEO/social/docs/freeze+evidence (240-280); keep each slice reviewable, but do not create commits, branches, pushes, or PRs without a later explicit Git-delivery request |
| rationale | New homepage architecture, nav/footer rewiring, SEO/social updates, contract tests, and manual evidence likely exceed both the 400-line default and the 800-line session budget. |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

Current permission: planning boundary only — apply may implement the next autonomous slice and preserve reviewable boundaries, but this does NOT authorize commits, branches, pushes, or PR creation.

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|---|---|---|---|---|---|
| 1 | Lock contracts and central content/contact data | Future PR 1 if later requested (Feature Branch Chain base = tracker branch) | `npm test` | `N/A` — contract-first unit | `tests/seo.test.ts`, `components/home/homepage-content.ts`, `components/home/contact.ts` |
| 2 | Ship the ordered homepage plus nav/footer behavior | Future PR 2 if later requested (base = PR 1 branch) | `npm test` | `npm run dev` homepage + mobile menu checks | `app/page.tsx`, `components/home/*`, `components/Navbar.tsx`, `components/Footer.tsx` |
| 3 | Finish SEO/social/docs and freeze verification | Future PR 3 if later requested (base = PR 2 branch) | `npm test && npm run lint && npx tsc --noEmit` | `npm run dev` metadata/manual viewport review | `lib/seo.ts`, `app/layout.tsx`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `openspec/.../assets-and-contact.md` |

## Phase 1: Contracts and preflight

- [x] 1.1 Read `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`, `12-images.md`, `14-metadata-and-og-images.md`, `03-api-reference/04-functions/generate-metadata.md`, `generate-viewport.md`, and `03-file-conventions/01-metadata/opengraph-image.md` before touching App Router, metadata, or image routes.
- [x] 1.2 Add RED coverage in `tests/seo.test.ts` for the exact nine-section order, exact approved Argentine-Spanish strings, typed WhatsApp href/message generation, Organization key limits, homepage metadata/schema wording, preserved route links, and dead CTA/broken-link guards.
- [x] 1.3 Confirm `package-lock.json` already covers required dependencies; do not install or add libraries unless a missing import or verified Next 16 requirement forces it.

1.2 completion note: RED → GREEN coverage now also locks the exact homepage title/description, canonical/social defaults, root Organization key limits, route-level WebPage JSON-LD wording, and homepage SEO guardrails without regressing preserved secondary-route metadata.

## Phase 2: Homepage structure and content

- [x] 2.1 Create `components/home/homepage-content.ts` and `components/home/contact.ts` with the exact production strings, verified `+5492634616717` / `5492634616717`, and distinct encoded messages for `events`, `venue`, `institution`, and `general` CTAs.
- [x] 2.2 Create `components/home/HomePage.tsx` plus nine ordered `*Section.tsx` server components for Hero → Problem → Beliefs → Actors → Current Stage → Technology → Participation → Founder → Final CTA, preserving IDs, one H1, truthful placeholder copy, and no extra sections.
- [x] 2.3 Replace `app/page.tsx` to render the new homepage and route JSON-LD from shared typed content while leaving approved secondary route bodies unchanged.
- [x] 2.4 Update `components/Navbar.tsx` and `components/Footer.tsx` for priority IA, preserved secondary-route access, accessible mobile menu behavior, reduced-motion safety, and real CTA/link behavior.

## Phase 3: SEO, assets, and normalization

- [x] 3.1 Update `lib/seo.ts`, `app/layout.tsx`, `app/opengraph-image.tsx`, and `app/twitter-image.tsx` for the exact homepage title/description, root `Organization` JSON-LD (`name` + `url` only), viewport `themeColor`, institutional OG/Twitter copy, and truthful alt text.
- [x] 3.2 Create `openspec/changes/homepage-brand-repositioning/assets-and-contact.md` documenting the verified WhatsApp source, encoded CTA messages, pending real founder photo, and the honest premium placeholder replacement plan with no layout churn and no AI likeness.
- [x] 3.3 Run source-mutating normalization on touched files before freeze (targeted autofix/import cleanup/dead-code cleanup only); after this checkpoint, allow check-only lint/typecheck/tests/build/manual verification.

## Phase 4: Verification and handoff evidence

- [x] 4.1 Run `npm test` to GREEN, then `npm run lint`, `npx tsc --noEmit`, and `npm run build` after freeze; fix failures before recording evidence.
- [x] 4.2 Run `npm run dev` and capture manual evidence at 375x812, 390x844, 768x1024, and 1440x900, plus a 320–1920 layout sweep for overflow, section order, CTA destinations, reduced motion, and founder/hero placeholder honesty.
- [x] 4.3 Manually verify mobile menu focus entry/return, Escape, outside click, scroll lock, close control, broken links/buttons, metadata/JSON-LD output, and smoke secondary routes `/productos`, `/soluciones`, `/recursos/aprender`, and `/legal/privacidad`.
- [x] 4.4 Gather final deliverables for review: changed-file list, command results, viewport evidence, pending founder-photo note, and the recommended work-unit/chain boundaries for apply handoff.

4.2 completion note: the prior partial reduced-motion state remains preserved in apply-progress history; the final CDP rerun captured the four required screenshots again, confirmed no horizontal scroll reached any width from 320 to 1920, removed the dead `PRÓXIMAMENTE` navbar control, and proved `prefers-reduced-motion: reduce` via `matchMedia === true` plus computed `transitionDuration: 0s`, `animationDuration: 0s`, `transform: none`, and empty `getAnimations()` results for the header, desktop dropdown affordance, mobile hamburger bars, overlay, panel, and mobile accordion affordance.
