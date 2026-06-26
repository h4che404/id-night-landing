# Tasks: SEO Phase 2 Blocker Remediation

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 80-180 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | auto-chain |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Land rendered SEO contract coverage and `/.atl/` ignore | PR 1 | Keep test updates, any required 404 fix, and verification together |

## Phase 1: Foundation

- [x] 1.1 Update `.gitignore` to ignore `/.atl/` without changing other ignore rules.
- [x] 1.2 In `tests/seo.test.ts`, add local render/HTML parsing helpers for route modules, JSON-LD extraction, and anchor assertions.

## Phase 2: Rendered SEO Contracts

- [x] 2.1 Replace source-regex breadcrumb checks in `tests/seo.test.ts` with rendered assertions for `app/productos/page.tsx` breadcrumb nav labels, links, and `BreadcrumbList` JSON-LD.
- [x] 2.2 Add the same rendered contract coverage in `tests/seo.test.ts` for `app/recursos/aprender/page.tsx`, proving nested route hierarchy order and absolute URLs.
- [x] 2.3 Add rendered 404 assertions in `tests/seo.test.ts` for `app/not-found.tsx` heading/copy plus recovery links to `/` and `/productos`.
- [x] 2.4 Modify `app/not-found.tsx` only if task 2.3 exposes a missing rendered contract; keep branding and server-component behavior unchanged.

## Phase 3: Verification

- [x] 3.1 Run `node --import tsx --test tests/seo.test.ts` and confirm rendered breadcrumb, 404, Organization, viewport, and manifest scenarios all pass.
- [x] 3.2 Inspect `git status` after creating a temporary `/.atl/` artifact and confirm ignored files stay hidden while tracked edits remain visible.

## Phase 4: Cleanup

- [x] 4.1 Remove any temporary debug helpers or fixture code added during test refactoring so `tests/seo.test.ts` keeps a single SEO-suite convention.
- [x] 4.2 Update `openspec/changes/seo-phase2-blocker-remediation/tasks.md` checklist state during apply instead of expanding scope into unrelated SEO or lint work.
