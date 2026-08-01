# Apply Progress: homepage-brand-repositioning

## Work Units
- Unit 1 (`contracts-content-contact`) — completed previously in Strict TDD.
- Unit 2 (`homepage-navigation-visual-structure`) — completed previously in Strict TDD.
- Unit 3 (`seo-build-visual-validation`) — completed in Strict TDD. Previous partial reduced-motion evidence is preserved below; the second/final remediation attempt removed the dead navbar CTA, restored zero horizontal scroll reach across the required sweep, and completed sufficient reduced-motion proof with Chrome DevTools Protocol only.

## Actual Changed-Line Count
- Unit 1: 218 authored runtime/test lines.
- Unit 2: 487 authored runtime/test lines.
- Unit 3: 319 authored lines for this slice (`lib/seo.ts`, `app/layout.tsx`, `app/opengraph-image.tsx`, `tests/seo.test.ts`, `components/Navbar.tsx`, `components/home/sections.tsx`, `openspec/changes/homepage-brand-repositioning/assets-and-contact.md`).
- Work Unit 3 bounded-remediation ledger before this final attempt: 260/320 lines used.
- Final attempt delta: 24 lines changed (`tests/seo.test.ts` +7/-1, `components/Navbar.tsx` -16, `app/layout.tsx` token-only overflow guard).
- Work Unit 3 bounded-remediation ledger after this final attempt: 284/320 lines used, 36 lines remaining.

## TDD Cycle Evidence
| Task | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|---|---|---|---|---|---|
| 1.2 partial + 2.1 | `npm test` → pass 14/14 | `npm test` → fail 0/1, `MODULE_NOT_FOUND` for `@/components/home/contact` | `npm test` → pass 16/16 | Added centralized content assertions plus 4 distinct CTA profile cases | Reduced to typed constants + pure href builder; tests stayed green |
| 1.2 rendered coverage + 2.2 + 2.3 + 2.4 | `npm test` → pass 16/16 | `npm test` → fail 16/17, homepage section id order `[]` instead of the required 9-section sequence | `npm test` → pass 18/18; `npx tsc --noEmit` → pass | Added rendered route assertions for one H1, fragment ids, `/productos`, `/legal/privacidad`, `#participar`, 5 real `wa.me` links, JSON-LD shell, and footer IA preservation | Collapsed homepage sections into server-first semantic components + shared card/title helpers; tests stayed green |
| 1.2 remainder + 3.1 | `npm test` → pass 18/18 | `npm test` → fail 13/18 with root title/description, WebPage JSON-LD, and Organization-field mismatches | `npm test` → pass 18/18 after metadata/schema/social updates | Added route-level checks for exact homepage title/description, canonical/social image alt defaults, `WebPage` JSON-LD, FAQ absence on `/`, and forbidden proof terms in rendered homepage/schema | Shortened the founder copy after the new guardrail test caught deploy/customer overclaim; later fixed mobile/tablet overflow with `overflow-x-hidden` + `xl` nav breakpoint and reran the full suite |
| 4.2 final remediation | `npm test` → pass 18/18 | `npm test` → fail 18/19 because `components/Navbar.tsx` still exposed a dead `PRÓXIMAMENTE` control in the primary nav | `npm test` → pass 19/19 after removing the desktop/mobile dead CTA chrome | Triangulated with a new bounded CDP rerun: required screenshots overwritten, `horizontalScrollReached` stayed `0` from 320 to 1920, and `matchMedia('(prefers-reduced-motion: reduce)')` stayed `true` while nav affordances reported `transitionDuration: 0s` | Added `motion-reduce:transition-none motion-reduce:duration-0` to navbar affordances plus `overflow-x-hidden` on `<html>`; reran freeze gates and browser evidence |

## Work Unit Evidence
| Unit | Evidence | Value |
|---|---|---|
| 1 | Focused test command and exact result | `npm test` → pass 16/16 |
| 1 | Runtime harness command/scenario and exact result | `N/A` — contract-first content/contact slice; no rendered homepage/runtime boundary implemented in that unit |
| 1 | Rollback boundary | `tests/seo.test.ts`, `components/home/homepage-content.ts`, `components/home/contact.ts` |
| 2 | Focused test command and exact result | `npm test` → pass 18/18 |
| 2 | Runtime harness command/scenario and exact result | `N/A` — current Node/static-markup harness cannot validate browser-only menu focus, outside click, Escape, scroll lock, reduced motion, or visual CSS; those remained for Work Unit 3 |
| 2 | Rollback boundary | `app/page.tsx`, `components/home/sections.tsx`, `components/home/HomePage.tsx`, `components/Navbar.tsx`, `components/Footer.tsx`, `tests/seo.test.ts` |
| 3 | Focused test command and exact result | `npm test` → pass 19/19 |
| 3 | Runtime harness command/scenario and exact result | `npm run dev -- --hostname 127.0.0.1 --port 3100` + local Chrome CDP on port `9222` → required screenshots overwritten, `browser-evidence.json` saved under `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/`, `desktopTextCheck.hasDeadSoonText === false`, every `horizontalScrollReached` value stayed `0` across 320–1920, and reduced-motion probes returned `matchMedia === true` with `transitionDuration: 0s`, `animationDuration: 0s`, `transform: none`, and empty `getAnimations()` arrays on the inspected navbar/mobile-menu elements |
| 3 | Rollback boundary | `app/layout.tsx`, `components/Navbar.tsx`, `tests/seo.test.ts` for the final remediation; reverting those files removes the dead-CTA regression guard, the overflow clamp, and the reduced-motion suppression without touching earlier SEO/schema/homepage content work |

## Commands and Results
- `npm install` → success; lockfile unchanged (`package-lock.json` SHA-256 stayed `2dc4e73ddfce894c12790b5c152b695c00815e2fcbf77e41f46baaacf903f18a`).
- Original unit normalization: `npx eslint --fix "app/page.tsx" "app/opengraph-image.tsx" "app/twitter-image.tsx" "components/Footer.tsx" "components/Navbar.tsx" "components/home/**/*.ts" "components/home/**/*.tsx" "lib/seo.ts" "tests/seo.test.ts"` → success.
- Final remediation normalization: `npx eslint --fix "app/layout.tsx" "components/Navbar.tsx" "tests/seo.test.ts"` → success.
- Final remediation freeze gates:
  - `npm test` → pass 19/19
  - `npm run lint` → pass
  - `npx tsc --noEmit` → pass
  - `npm run build` → pass
- Historical runtime HTML check from the first Work Unit 3 browser pass remains valid and was preserved:
  - `/` → `200`, title `ID-NIGHT | Construyendo una noche más segura`, canonical `https://idnight.app`, JSON-LD types `Organization`, `WebPage`
  - `/productos` → `200`, canonical `https://idnight.app/productos`, JSON-LD `Organization`, `BreadcrumbList`
  - `/soluciones` → `200`, canonical `https://idnight.app/soluciones`, JSON-LD `Organization`, `BreadcrumbList`
  - `/recursos/aprender` → `200`, canonical `https://idnight.app/recursos/aprender`, JSON-LD `Organization`, `BreadcrumbList`, `FAQPage`
  - `/legal/privacidad` → `200`, canonical `https://idnight.app/legal/privacidad`, JSON-LD `Organization`, `BreadcrumbList`

## Visual Evidence
- Screenshot paths:
  - `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/home-375x812.png`
  - `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/home-390x844.png`
  - `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/home-768x1024.png`
  - `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/home-1440x900.png`
- Final sweep: 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, and 1920 widths all ended with `horizontalScrollReached: 0` in `browser-evidence.json`, with `scrollWidth === clientWidth` at every width after adding the `<html>` overflow clamp.
- Visual findings:
  - First capture exposed horizontal overflow on mobile widths plus a 1024px desktop-nav spill.
  - Fix applied: `overflow-x-hidden` on the root body and desktop-nav / desktop-CTA breakpoint moved from `lg` to `xl`.
  - Final remediation removed the visible desktop/mobile `PRÓXIMAMENTE` navbar control instead of inventing a destination.
  - Final screenshots show no horizontal scrollbar, no CTA overlap, no clipped hero/founder placeholder media, and clear section hierarchy in the captured hero viewport.
  - Hero/founder placeholder honesty is visible in the rendered labels/ARIA text; no fake Mendoza photo or AI founder likeness was introduced.

## Menu / Interaction Evidence
- Real-browser automation was available through Chrome DevTools Protocol via the local Chrome binary.
- Verified on mobile viewport (`390x844`):
  - focus entry lands on `Cerrar menú`
  - outside click closes the menu (`aria-expanded` back to `false`)
  - Escape closes the menu (`aria-expanded` back to `false`)
  - body scroll lock activates on open (`document.body.style.overflow = "hidden"`)
  - close-button flow restores focus to the toggle (`focusReturnedToToggle: true`); the menu node was still present in the immediate post-click snapshot, so this evidence is state/focus-based rather than a full animation-end assertion
  - Final reduced-motion rerun is sufficient without new dependencies: `prefers-reduced-motion: reduce` was emulated successfully (`matchMediaReduce: true`), and the header, desktop dropdown affordance, mobile hamburger bars, mobile overlay/panel, and mobile accordion affordance all reported `transitionDuration: 0s`, `animationDuration: 0s`, `transform: none`, and `getAnimations(): []` in the saved CDP evidence.

## Files Changed
- `lib/seo.ts` — switched the homepage root title/description to the institutional wording, kept shared canonical/social defaults, narrowed Organization JSON-LD, and replaced route JSON-LD with a truthful `WebPage` block.
- `app/layout.tsx` — preserved viewport `themeColor` via `viewport`, kept Organization JSON-LD injection, and now clamps horizontal overflow on both `<html>` and `<body>` so the fixed header cannot recreate scrollable width.
- `app/opengraph-image.tsx` — updated the shared social image alt/copy to the institutional, in-development positioning.
- `components/Navbar.tsx` — moved desktop navigation to `xl`, removed dead desktop/mobile `PRÓXIMAMENTE` controls, and added `motion-reduce:transition-none motion-reduce:duration-0` so reduced-motion mode suppresses remaining navbar/menu transitions.
- `components/home/sections.tsx` — removed founder deploy/customer overclaim from the homepage copy while keeping first-person, in-development positioning.
- `tests/seo.test.ts` — completed RED→GREEN homepage SEO/schema guardrails for exact metadata, social defaults, truthful JSON-LD, forbidden proof, preserved secondary-route SEO, and the final no-dead-`PRÓXIMAMENTE` navbar regression.
- `openspec/changes/homepage-brand-repositioning/assets-and-contact.md` — documented verified WhatsApp config/messages plus honest placeholder replacement rules.
- `openspec/changes/homepage-brand-repositioning/tasks.md` — marked 4.2 complete and recorded that the final CDP rerun closed the earlier reduced-motion evidence gap without erasing the prior partial-history note.

## Task Progress
- Completed: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4
- Remaining: none

## Remaining Unavailable Checks
- None. The final CDP evidence is sufficient for the current no-new-dependency constraint, and the earlier partial state remains preserved in this artifact's history.

## Cleanup Evidence
- Dev server started with `npm run dev -- --hostname 127.0.0.1 --port 3100` → PID `41234` → ready check passed → terminated with `kill 41234`.
- Headless Chrome started from `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new --remote-debugging-port=9222 ...` → PID `41377` → screenshot/menu evidence captured → terminated with `kill 41377`.
- `ps -p 41377,41234` after cleanup returned only the header row, confirming both processes exited.
- Final remediation rerun: dev server started with `npm run dev -- --hostname 127.0.0.1 --port 3100` → PID `45874` → ready check passed → terminated with `kill 45874`.
- Final remediation rerun: headless Chrome started from `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new --remote-debugging-port=9222 ...` → PID `45990` → screenshots and `browser-evidence.json` captured → terminated with `kill 45990`.
- `ps -p 45874,45990` after cleanup returned only the header row, confirming both processes exited.

## Next Slice
- No apply tasks remain. Orchestrator can move this change to verify/archive with the updated screenshots and `browser-evidence.json` as the final Work Unit 3 evidence bundle.
