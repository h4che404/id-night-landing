# Proposal: SEO Phase 2 Blocker Remediation

## Intent

Unblock the `seo-phase2` commit by addressing only the confirmed review blockers: weak SEO contract tests for breadcrumbs/JSON-LD, missing behavior coverage for the branded 404 page, and accidental exposure of generated `.atl/` local artifacts.

## Scope

### In Scope
- Add behavior-level coverage for `app/not-found.tsx` rendered recovery/navigation output.
- Replace breadcrumb/JSON-LD source-inspection tests with rendered-contract assertions for representative routes.
- Ignore generated `.atl/` local artifacts through `.gitignore`.

### Out of Scope
- Unrelated SEO, metadata, schema, copy, sitemap, or manifest changes.
- Existing lint debt cleanup outside this blocker set.
- Server-backed E2E crawl/noindex verification unless a new blocker proves it necessary.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `landing-seo`: tighten SEO contract testing so breadcrumb JSON-LD and breadcrumb navigation are verified from rendered route output, and branded 404 recovery behavior is covered.

## Approach

Keep the remediation as a test-and-hygiene slice. Update `tests/seo.test.ts` to render representative route components with `react-dom/server` and assert visible breadcrumb nav plus serialized `BreadcrumbList` JSON-LD from HTML, not source text. Render `app/not-found.tsx` and assert branded recovery links. Add `/.atl/` to `.gitignore`. Leave product code untouched unless a rendered contract mismatch is discovered.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `tests/seo.test.ts` | Modified | Rendered contract assertions for breadcrumbs/JSON-LD and 404 behavior. |
| `app/not-found.tsx` | Modified? | Only if current rendered output fails the intended recovery contract. |
| `.gitignore` | Modified | Ignore generated `.atl/` local artifacts. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Render helpers accidentally overfit implementation details | Med | Assert HTML-visible contracts and parsed JSON-LD only. |
| Reviewer expects framework `noindex` proof | Low | Document boundary; add heavier runtime coverage only if requested. |
| Scope expands into SEO cleanup | Med | Limit changes to the three confirmed blockers. |

## Rollback Plan

Revert the `tests/seo.test.ts` and `.gitignore` changes, plus any incidental `app/not-found.tsx` adjustment, restoring the previous `seo-phase2` working tree.

## Dependencies

- Existing `node --import tsx --test tests/seo.test.ts` SEO test command.
- Existing Next.js 16 App Router route components and `react-dom/server`.

## Success Criteria

- [ ] `node --import tsx --test tests/seo.test.ts` passes.
- [ ] Breadcrumb/JSON-LD tests assert rendered output, not source regexes.
- [ ] `app/not-found.tsx` has behavior-level recovery/navigation coverage.
- [ ] `.atl/` generated artifacts are ignored and excluded from commit scope.
