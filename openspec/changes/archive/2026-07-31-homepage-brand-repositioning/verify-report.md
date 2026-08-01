```yaml
schema: gentle-ai.verify-result/v1
evidence_revision: sha256:28231f34f3b95d8f5b5c9e983c3e6bcf71bdf02bacd524fee4b5e099a7fb55e1
verdict: pass
blockers: 0
critical_findings: 0
requirements: 8/8
scenarios: 14/14
test_command: npm test
test_exit_code: 0
test_output_hash: sha256:a510f1d51e31ee648c95b509f70438cbd1b05799628dd26966d9485462bee862
build_command: npm run build
build_exit_code: 0
build_output_hash: sha256:d5577c859a2e29e75fc53c843867834770dd1f5c63ba5760ff15ec66b0a37e41
```

## Verification Report

**Change**: homepage-brand-repositioning  
**Version**: N/A  
**Mode**: Strict TDD  
**Mirror step**: This OpenSpec artifact mirrors the already-completed independent verification. No tests, lint, typecheck, build, or dev-server commands were re-executed during this reconciliation.  
**Frozen target identity**: `sha256:e43f65def5ea998a454194c53418e2f2cd9e141a4ff35b36d272559374802c03`  
**Frozen candidate tree**: `788cc89cc80b9eca202d44043d8d203d9c750b1a`

### Review Gate Facts
```yaml
reviewGate.gate: post-apply
reviewGate.result: allow
reviewGate.approvedLineage: review-e43f65def5ea998a
reviewGate.receiptHash: sha256:e28304bf89e030d45a886abbba00afbcb5564090e68082f9f9542c4e4b4b9c5e
reviewGate.authorityRevision: sha256:4f7103fec8dc710546e1f39cf50eebb4ac5bd3642ceda85c7953949dc627e102
reviewGate.evidenceHash: sha256:d31dd38c08e90e028a6ceff38ea3532bff69800fbd4d1033d38aaa833c9d99fd
reviewGate.sddReviewBindingRevision: sha256:60879311b6f38dcc3928a8af59fca32b07a11bdb27cdd12e523e8b2c6ba22632
```

### Candidate Identity / Freeze Check
| Check | Result | Evidence |
|---|---|---|
| `git rev-parse HEAD^{tree}` matches review base tree | ✅ | Live git base tree = `a4ff6b16acd2e529ad18a3c8ec5ce666a2ae22bf`; review-state `current_snapshot.base_tree` = `a4ff6b16acd2e529ad18a3c8ec5ce666a2ae22bf` |
| Frozen candidate authority matches current review-state | ✅ | `.git/gentle-ai/review-transactions/v2/review-e43f65def5ea998a/review-state.json` records identity `sha256:e43f65def5ea998a454194c53418e2f2cd9e141a4ff35b36d272559374802c03` and tree `788cc89cc80b9eca202d44043d8d203d9c750b1a` |
| Current changed-path manifest still matches frozen candidate manifest | ✅ | `git status --porcelain --untracked-files=all` returned 19 paths; review-state `current_snapshot.paths` also lists 19 paths; sorted comparison returned `paths_match_sorted=True` |
| Verification edited the frozen workspace candidate | ✅ No | No source, test, dependency, or OpenSpec changes were made during the independent verification; only raw evidence was written under `.git/gentle-ai/` |

### Completeness
| Metric | Value |
|---|---|
| Tasks total | 14 |
| Tasks complete | 14 |
| Tasks incomplete | 0 |
| Spec requirements | 8 |
| Spec scenarios | 14 |
| Docs requested for review | proposal, 2 specs, design, tasks, apply-progress, assets/contact |

### Build & Tests Execution
Fresh command results captured from the authoritative independent verification evidence:

**Tests**: ✅ 19 passed / 0 failed / 0 skipped  
Command: `npm test`  
Exit: `0`  
Hash: `sha256:a510f1d51e31ee648c95b509f70438cbd1b05799628dd26966d9485462bee862`

```text
> id-night-landing@0.1.0 test
> node --import tsx --test tests/seo.test.ts

1..19
# tests 19
# pass 19
# fail 0
# skipped 0
```

**Lint**: ✅ Passed  
Command: `npm run lint`  
Exit: `0`  
Hash: `sha256:bcc16c03a12ea2cb8f0d87442074d870435f7dc1a7127b3cae592c7f85dfcabb`

```text
> id-night-landing@0.1.0 lint
> eslint
```

**Type Checker**: ✅ Passed  
Command: `npx tsc --noEmit`  
Exit: `0`  
Hash: `sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

```text
(no output)
```

**Build**: ✅ Passed  
Command: `npm run build`  
Exit: `0`  
Hash: `sha256:d5577c859a2e29e75fc53c843867834770dd1f5c63ba5760ff15ec66b0a37e41`

```text
▲ Next.js 16.2.9 (Turbopack)
✓ Compiled successfully
✓ Generating static pages using 11 workers (27/27)
○ /, /productos, /soluciones, /recursos/aprender, /legal/privacidad, /twitter-image, /opengraph-image, ...
```

**Coverage**: ➖ Coverage analysis skipped — no coverage tool detected in the active gate set.

### TDD Compliance
| Check | Result | Details |
|---|---|---|
| TDD Evidence reported | ✅ | `apply-progress.md` contains a 4-row `TDD Cycle Evidence` table |
| All tasks have tests | ✅ | 4/4 TDD rows map to an existing changed test file: `tests/seo.test.ts` |
| RED confirmed (tests exist) | ✅ | The reported RED regressions are represented by current assertions guarding contact config, section order, SEO/schema, and dead CTA regression |
| GREEN confirmed (tests pass) | ✅ | The captured `npm test` run passed 19/19 against the frozen candidate |
| Triangulation adequate | ✅ | Contact config uses 4 distinct CTA cases; homepage/SEO coverage spans metadata, JSON-LD, anchors, route rendering, forbidden terms, and footer contracts |
| Safety Net for modified files | ✅ | Every TDD row reports a pre-change `npm test` safety net; the captured suite still passes |

**TDD Compliance**: 6/6 checks passed

### Test Layer Distribution
| Layer | Tests | Files | Tools |
|---|---:|---:|---|
| Unit / contract | 13 | 1 | `node:test` + `tsx` |
| Integration / SSR render | 6 | 1 | `react-dom/server` |
| E2E | 0 | 0 | not installed / not used |
| **Total** | **19** | **1** | |

### Changed File Coverage
Coverage analysis skipped — no coverage tool detected.

### Assertion Quality
**Assertion quality**: ✅ All assertions verify real behavior. No tautologies, ghost loops, orphan smoke-only tests, or assertion-without-execution patterns were found in `tests/seo.test.ts`.

### Quality Metrics
**Linter**: ✅ No errors  
**Type Checker**: ✅ No errors

### Runtime Route Verification
Bounded local server command used by the independent verification: `npm run dev -- --hostname 127.0.0.1 --port 3101`  
Log: `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/dev-server-verify-3101.log`

| Route | Status | Title | Canonical | JSON-LD types |
|---|---:|---|---|---|
| `/` | 200 | `ID-NIGHT \| Construyendo una noche más segura` | `https://idnight.app` | `Organization`, `WebPage` |
| `/productos` | 200 | `Productos de ID-Night \| Acceso, identidad y trazabilidad` | `https://idnight.app/productos` | `Organization`, `BreadcrumbList` |
| `/soluciones` | 200 | `Soluciones de ID-Night para boliches, eventos y cadenas` | `https://idnight.app/soluciones` | `Organization`, `BreadcrumbList` |
| `/recursos/aprender` | 200 | `Aprender — ID-Night` | `https://idnight.app/recursos/aprender` | `Organization`, `BreadcrumbList`, `FAQPage` |
| `/legal/privacidad` | 200 | `Política de privacidad — ID-Night` | `https://idnight.app/legal/privacidad` | `Organization`, `BreadcrumbList` |

Homepage CTA/runtime checks from the live server:

- `home_wa_links=5`
- `home_wa_unique=4`
- `home_has_productos=True`
- `home_has_privacidad=True`
- `home_has_participar=True`

Cleanup evidence:

- Local dev server reached ready state in `218ms`.
- Requested routes returned `200` in the server log.
- The spawned dev-server PID was terminated; `ps -p <pid>` returned only the header row after cleanup.

### Screenshot & Browser Evidence
Browser evidence JSON: `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/browser-evidence.json`  
Hash: `sha256:e8e413a1fa8993f0c4571d2903f88bbfb535a7d083f5c4f3dd0179cd287a03b5`

| Evidence path | Expected viewport | Stored image size | Hash | Observation |
|---|---|---|---|---|
| `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/home-375x812.png` | 375×812 | 750×1624 (`scale: 2`) | `sha256:d3464db05272a280264965e15489894efa14ef45ab7a187c5ce2a61820a23e5c` | Mobile hero fits without clipping; CTA stack and utility links remain visible in the captured fold |
| `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/home-390x844.png` | 390×844 | 780×1688 (`scale: 2`) | `sha256:12272baa61e32dfc54a22122277b7f9d370845bdf3a92db2faf37697610f3cbd` | Mobile hero remains readable with no overlap; placeholder panel begins below the links |
| `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/home-768x1024.png` | 768×1024 | 1536×2048 (`scale: 2`) | `sha256:1a4aa218271d051ff4ab84bf0eb0779dfd857394643bd8b6c285f89365aaec05` | Tablet layout shows wider text flow and no visible horizontal overflow in the captured area |
| `/var/folders/pc/fh2zn9b94lz1wsfn_9bwz3hc0000gn/T/opencode/id-night-homepage-evidence/home-1440x900.png` | 1440×900 | 1440×900 (`scale: 1`) | `sha256:aa0b6a48063b667adc31fc79b0de43f431fcc5405b09d40d6b06d5e970df5dbd` | Desktop layout shows full primary nav, hero copy, and honest placeholder artwork with no visible overlap |

Visible-quality limits:

- All four screenshots are upper-fold captures only; they visually confirm hero/header quality but do not alone prove lower sections.
- The PNG dimensions correctly correspond to the requested CSS viewports because browser evidence records `scale: 2` for the 375, 390, and 768 captures.
- No screenshot shows obvious clipping, CTA collision, or product-screenshot hero misuse.

Browser evidence validation:

- **Overflow sweep**: `horizontalScrollReached` remained `0` for every width from `320` through `1920`; `scrollWidth === clientWidth` at each recorded width.
- **Reduced motion**: `matchMedia('(prefers-reduced-motion: reduce)') === true`; desktop header/chevron/panel and mobile bars/overlay/panel/accordion report `transitionDuration: 0s`, `animationDuration: 0s`, `transform: none`, and empty animation arrays.
- **Mobile menu evidence**: focus entry lands on `Cerrar menú`; outside click closes the menu; Escape closes the menu; `document.body.style.overflow = 'hidden'` confirms scroll lock; close-button flow returns focus to the toggle. The saved `browser-evidence.json` directly proves reduced-motion and overflow data, while the close/focus behaviors remain source-backed plus prior runtime-note evidence from `apply-progress.md`, not standalone JSON-only proof.

### Spec Compliance Matrix
| Requirement | Scenario | Test / runtime evidence | Result |
|---|---|---|---|
| Homepage narrative order and Golden Circle binding | Required sequence is preserved | `tests/seo.test.ts` → `homepage route renders the approved narrative order, copy anchors, and JSON-LD shell`; source `components/home/HomePage.tsx` | ✅ COMPLIANT |
| Sections 1–3 use the approved purpose-first copy | Hero, problem, and beliefs copy matches the brief | `tests/seo.test.ts` → `homepage content is centralized with the approved section order and exact CTA copy` + rendered-homepage test; source `components/home/homepage-content.ts` and `components/home/sections.tsx` | ✅ COMPLIANT |
| Sections 4–6 describe shared actors, current stage, and technology without overclaiming | Shared actors, stage, and technology stay accurate | Rendered-homepage runtime pass + source inspection of actor/stage/capability blocks and `/productos` CTA | ✅ COMPLIANT |
| Sections 7–9 use approved participation, founder, and closing contracts | Participation, founder, and final CTA stay authorized | `tests/seo.test.ts` → contact-config test + rendered-homepage test; source inspection of founder text and placeholder treatment | ✅ COMPLIANT |
| Header, mobile behavior, preservation, and release quality meet the brief | Navigation and release behavior are verifiable | `npm test` (footer/homepage/nav guards), live route fetches, screenshots, browser evidence JSON, source inspection of mobile menu behavior | ✅ COMPLIANT *(see 3 warnings below)* |
| Route metadata and social sharing | Route-specific sharing data exists | `tests/seo.test.ts` → route metadata contract; live fetch of `/`, `/productos`, `/soluciones`, `/recursos/aprender`, `/legal/privacidad` | ✅ COMPLIANT |
| Route metadata and social sharing | Shared social defaults stay intact | `tests/seo.test.ts` → root metadata + route metadata contracts; source `lib/seo.ts`, `app/opengraph-image.tsx`, `app/twitter-image.tsx` | ✅ COMPLIANT |
| Route metadata and social sharing | `themeColor` present in root viewport | `tests/seo.test.ts` → organization JSON-LD and viewport contract; source `app/layout.tsx` / `lib/seo.ts` | ✅ COMPLIANT |
| Structured data matches visible content | Root schema reflects visible positioning | `tests/seo.test.ts` → JSON-LD helper contract + rendered-homepage test; live `/` fetch returns `Organization` + `WebPage` | ✅ COMPLIANT |
| Structured data matches visible content | FAQ schema is limited to visible FAQs | Live fetch: `/recursos/aprender` returns `FAQPage`; `/` does not; `tests/seo.test.ts` asserts FAQ absence on `/` | ✅ COMPLIANT |
| Structured data matches visible content | BreadcrumbList on inner pages | `tests/seo.test.ts` → breadcrumb render tests; live fetches of `/productos`, `/soluciones`, `/recursos/aprender`, `/legal/privacidad` | ✅ COMPLIANT |
| Structured data matches visible content | Organization JSON-LD in root layout | `tests/seo.test.ts` → organization key-limit contract; live fetches return exactly one `Organization` block in SSR HTML | ✅ COMPLIANT |
| SEO-safe positioning guardrails | Metadata and schema follow approved positioning | Metadata tests, JSON-LD tests, live route fetches, source inspection of `lib/seo.ts` and homepage copy | ✅ COMPLIANT |
| SEO-safe positioning guardrails | Visible landing copy stays within guardrails | `tests/seo.test.ts` → forbidden-terms guards + rendered-homepage test; screenshots/source confirm honest placeholders and no surveillance marketing | ✅ COMPLIANT |

**Compliance summary**: 14/14 scenarios compliant

### Correctness (Static Evidence)
| Requirement | Status | Notes |
|---|---|---|
| Exact nine-section homepage contract | ✅ Implemented | `HomePage.tsx` renders the nine approved sections once, in order |
| Exact Argentine-Spanish positioning copy | ✅ Implemented | Centralized in `components/home/homepage-content.ts`; rendered through server sections |
| Verified WhatsApp destination/messages | ✅ Implemented | `components/home/contact.ts` uses typed `5492634616717` config and four distinct prefilled messages |
| Honest placeholder treatment | ✅ Implemented | Hero and founder placeholders explicitly disclose their temporary/non-photographic status |
| Secondary route preservation | ✅ Implemented | Navbar/footer keep access to products, solutions, pricing, resources, legal, and privacy routes; sampled routes served 200 locally |
| SEO / JSON-LD / social alignment | ✅ Implemented | Root metadata, WebPage JSON-LD, Organization JSON-LD, OG/Twitter copy, and viewport themeColor align with the visible homepage |
| No invented claims | ✅ Implemented | Copy guardrail tests passed; source uses in-development / listening language and avoids deployments, guarantees, or surveillance claims |
| Responsive/manual verification bundle | ✅ Implemented | Four screenshots, overflow sweep, reduced-motion computed-style proof, and local route fetches were all present and consistent |

### Coherence (Design)
| Decision | Followed? | Notes |
|---|---|---|
| Server-first homepage composed from `components/home/*` | ✅ Yes | `HomePage.tsx` + `sections.tsx` follow the designed split |
| Typed central content and contact config | ✅ Yes | `homepage-content.ts` and `contact.ts` match the design contract |
| One H1 with semantic section IDs | ✅ Yes | Hero contains the only `h1`; sections use `vision`, `problema`, `principios`, `actores`, `etapa`, `tecnologia`, `participar`, `fundador`, `cta-final` |
| Verified route strategy for CTAs | ✅ Yes | Internal CTAs point to `/productos`, `/legal/privacidad`, and `#participar`; WhatsApp links come from central config |
| Honest abstract hero and founder placeholder | ✅ Yes | No product screenshot hero, no fake founder photo, no AI likeness |
| Accessible/reduced-motion navigation | ⚠️ Partial | Escape, focus entry/return, close control, outside click, and scroll lock are present; full Tab/Shift+Tab trap is still missing |

### Issues Found
**CRITICAL**: None.

**WARNING**:

1. `components/Footer.tsx:8` — footer homepage fragment links use `#vision`, `#principios`, and `#participar`, so they do not route back to homepage sections from inner routes.
2. `components/Navbar.tsx:151` — the full-screen mobile menu handles focus entry/return and Escape, but it does not implement complete Tab/Shift+Tab focus trapping or inert the background.
3. `components/Navbar.tsx:219` — multiple homepage fragment navigation items can appear active simultaneously because active-state logic compares only the pathname, not the current fragment/section.

**SUGGESTION**:

- Add a future browser-level regression harness for focus trapping and section-active state if those warnings are ever promoted beyond native-review info.

### Residual Limits / Non-Claims
- This verification does **not** claim formal WCAG conformance; it only confirms the specific manual/source-backed behaviors listed above.
- This verification does **not** claim Core Web Vitals compliance; `npm run build` passed and the captured UI is visually clean, but no Lighthouse/RUM measurement was run.
- `browser-evidence.json` proves overflow and reduced-motion computed styles directly; it does not independently encode the mobile focus-return / outside-click / Escape assertions, which were corroborated through source inspection and prior runtime notes.
- This terminal mirror writes the OpenSpec report without re-running verification commands.

### Verdict
PASS WITH WARNINGS

The frozen `homepage-brand-repositioning` candidate satisfies the proposal/spec/design/task contract and all required check-only gates passed (`npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`), but three previously recorded non-blocking warnings remain valid and were not fixed by this mirror step.
