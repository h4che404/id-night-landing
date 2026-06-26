## Exploration: seo-phase2-blocker-remediation

### Current State
`seo-phase2` already added breadcrumb JSON-LD, `app/not-found.tsx`, and `app/manifest.ts`, and the SEO suite runs via `node --import tsx --test tests/seo.test.ts`. The two confirmed blockers are real: `tests/seo.test.ts` currently proves breadcrumb/JSON-LD by helper assertions plus raw source regexes (`buildBreadcrumbJsonLd(`, `application/ld+json`, `aria-label="Breadcrumb"`), not by rendered route output, and `app/not-found.tsx` has no automated contract assertion for its visible recovery/navigation behavior. `.atl/skill-registry.md` and `.atl/.skill-registry.cache.json` are generated local artifacts and are currently unignored/untracked. Local Next.js 16 docs confirm root `app/not-found.tsx` handles unmatched URLs and framework 404s inject `noindex`; that framework behavior is not directly asserted by the current suite.

### Affected Areas
- `tests/seo.test.ts` — replace source-inspection assertions with rendered HTML contract checks and add 404 UI coverage.
- `app/not-found.tsx` — likely no logic change; becomes the subject of new behavior-level assertions.
- `app/productos/page.tsx` — representative inner route to assert rendered breadcrumb nav + `BreadcrumbList` script output.
- `app/recursos/aprender/page.tsx` — representative nested route to assert rendered breadcrumb hierarchy in actual HTML.
- `.gitignore` — best place to prevent `.atl/` generated artifacts from entering the commit.

### Approaches
1. **Refactor the existing SEO contract test** — Keep `tests/seo.test.ts` as the single suite, render representative route modules with `react-dom/server`, and assert visible breadcrumb/nav + serialized JSON-LD + rendered 404 links.
   - Pros: Smallest diff, no new runner, no product-code churn, directly addresses both test blockers.
   - Cons: Does not end-to-end prove framework-injected `noindex` unless one extra runtime test is added.
   - Effort: Low

2. **Add server-backed integration coverage** — Start the built Next app in tests and fetch representative routes plus a missing route.
   - Pros: Can prove `404`/`noindex` and emitted HTML exactly as the browser/crawler receives it.
   - Cons: Slower, more brittle, larger review footprint, overkill unless the reviewer explicitly requires automated `noindex` proof.
   - Effort: Medium

### Recommendation
Use Approach 1. The smallest safe remediation is to refactor `tests/seo.test.ts` so breadcrumb assertions inspect rendered HTML from representative pages instead of source text, and add a rendered `app/not-found.tsx` contract assertion for branded recovery links (at minimum the home route, optionally `/productos`). Do not add a new test file. For `.atl/`, prefer adding `/.atl/` to `.gitignore` rather than relying on manual exclusion; it is clearly generated local tooling output and is already showing as untracked. Keep route SEO implementation unchanged unless a test reveals a real mismatch. Scope boundary: no lint-debt cleanup, no SEO copy changes, no OpenSpec/spec rewrites beyond this remediation artifact.

### Risks
- If the reviewer insists on automated proof of framework-injected `noindex`, a heavier server-backed test may still be required.
- The current `tsx` import shape returns route modules as namespace objects, so rendered contract tests must render `Module.default`, not the module object.

### Ready for Proposal
Yes — the remediation scope is clear and should stay limited to `tests/seo.test.ts`, `.gitignore`, and only incidental `app/not-found.tsx` edits if a real contract mismatch appears.
