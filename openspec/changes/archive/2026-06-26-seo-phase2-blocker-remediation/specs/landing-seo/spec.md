# Delta for landing-seo

## ADDED Requirements

### Requirement: Generated local SEO artifacts stay out of version control

Generated local `/.atl/` artifacts used during SEO remediation MUST be ignored by version control so they do not expand commit scope or reviewer noise.

#### Scenario: Generated local artifacts are excluded

- GIVEN generated files exist under `/.atl/`
- WHEN repository status is inspected
- THEN `.atl/` contents are excluded from candidate changes

#### Scenario: Real source edits remain visible

- GIVEN `/.atl/` is ignored and tracked SEO files change
- WHEN repository status is inspected
- THEN tracked source and test edits still appear normally

## MODIFIED Requirements

### Requirement: Structured data contract tests

`tests/seo.test.ts` MUST assert Organization JSON-LD structure, viewport `themeColor`, and manifest export shape. It MUST verify breadcrumb navigation and `BreadcrumbList` JSON-LD from server-rendered HTML for at least two representative inner pages, rather than from source-text inspection. It MUST also verify that `app/not-found.tsx` renders branded recovery navigation to the home route. Tests MUST run via `node --import tsx --test tests/seo.test.ts`.
(Previously: tests only had to prove Organization JSON-LD, BreadcrumbList presence, viewport themeColor, and manifest shape, without requiring rendered breadcrumb or 404 recovery contracts.)

#### Scenario: Rendered breadcrumb contracts pass

- GIVEN representative inner pages are server-rendered for the SEO suite
- WHEN breadcrumb assertions run
- THEN HTML includes a breadcrumb nav labeled `Breadcrumb`
- AND a `BreadcrumbList` JSON-LD block matching the route hierarchy

#### Scenario: Branded 404 recovery contract passes

- GIVEN `app/not-found.tsx` is server-rendered in the SEO suite
- WHEN recovery assertions run
- THEN branded navigation to the home route is present
- AND the contract is proven from rendered output

#### Scenario: SEO contract suite remains runnable

- GIVEN all assertions in `tests/seo.test.ts`
- WHEN run via `node --import tsx --test tests/seo.test.ts`
- THEN rendered breadcrumb, 404, Organization, viewport, and manifest assertions pass
