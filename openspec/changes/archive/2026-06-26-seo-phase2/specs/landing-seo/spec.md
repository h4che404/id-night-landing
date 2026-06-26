# Delta for Landing SEO — seo-phase2

## MODIFIED Requirements

### Requirement: Route metadata and social sharing

The system MUST expose canonical metadata for indexable public landing routes and SHOULD provide route-specific Open Graph and Twitter fields that preserve shared defaults while reflecting each route's visible topic. The root layout MUST expose a `themeColor` matching the brand color through the Next.js `viewport` export, not through deprecated metadata fields.
(Previously: root theme color was not required)

#### Scenario: Route-specific sharing data exists

- GIVEN a public landing route such as `/`, `/productos`, or `/recursos/aprender`
- WHEN its metadata is generated
- THEN the route includes a canonical URL for itself
- AND Open Graph/Twitter title or description matches the visible route topic without dropping shared site defaults

#### Scenario: Shared social defaults stay intact

- GIVEN a route overrides nested social metadata
- WHEN metadata is composed in Next.js
- THEN shared fields such as site identity and fallback image remain present

#### Scenario: themeColor present in root viewport

- GIVEN the root layout viewport configuration is generated
- WHEN Next.js composes the document head
- THEN a `themeColor` field is present through the viewport API and matches the brand color

### Requirement: Structured data matches visible content

The system MUST emit a `BreadcrumbList` JSON-LD block on every inner page and MUST emit a standalone `Organization` JSON-LD block in `app/layout.tsx`. Organization MUST contain only `@type`, `name`, and `url` — it MUST NOT include `logo`, `sameAs`, `address`, `telephone`, `email`, `foundingDate`, `description`, or any ratings/review fields. BreadcrumbList items MUST reflect the actual URL path hierarchy. All JSON-LD MUST be served at SSR time via `toJsonLd()`. Routes without visible FAQs MUST NOT emit FAQPage markup.
(Previously: Organization and BreadcrumbList were MAY — not required; no field exclusions specified)

#### Scenario: Root schema reflects visible positioning

- GIVEN the home page rendered to the user
- WHEN JSON-LD is emitted for the route
- THEN schema fields describe the same product, audience, and capabilities shown on the page

#### Scenario: FAQ schema is limited to visible FAQs

- GIVEN a route with rendered FAQ entries
- WHEN FAQ structured data is generated
- THEN each question/answer matches visible copy on that route
- AND routes without visible FAQs do not emit FAQPage markup

#### Scenario: BreadcrumbList on inner pages

- GIVEN any inner page (productos, soluciones, recursos/*, legal/*)
- WHEN the page is server-rendered
- THEN a `BreadcrumbList` JSON-LD `<script type="application/ld+json">` is present in the HTML
- AND items reflect the hierarchy: home → section → subsection

#### Scenario: Organization JSON-LD in root layout

- GIVEN `app/layout.tsx`
- WHEN any page is rendered
- THEN exactly one `Organization` JSON-LD block is present containing only `name` and `url`
- AND no invented fields appear in the block

## ADDED Requirements

### Requirement: Heading hierarchy integrity

Pages MUST NOT skip heading levels. Step titles in `ComoFunciona.tsx` and plan names in `Precios.tsx` MUST render as `<h2>` when they are the first sub-heading under the page `<h1>`.

#### Scenario: No heading level skipped

- GIVEN any landing page with an `<h1>` heading
- WHEN the heading order is inspected
- THEN no h1→h3 jump exists (every `<h3>` is preceded by an `<h2>`)

### Requirement: Breadcrumb navigation accessibility

Every `<nav>` element used as a breadcrumb trail MUST carry `aria-label="Breadcrumb"`.

#### Scenario: Breadcrumb nav is labeled

- GIVEN a page rendering a breadcrumb navigation element
- WHEN the `<nav>` is inspected
- THEN `aria-label="Breadcrumb"` is present on that element

### Requirement: Branded 404 page

`app/not-found.tsx` MUST exist and render branded navigation to the home route. Indexing control MUST rely on Next.js 404/noindex behavior rather than a custom `robots` metadata export. It MUST NOT be included in the sitemap.

#### Scenario: 404 excluded from indexing

- GIVEN a request to a non-existent route
- WHEN the 404 page renders
- THEN the response is not indexable through Next.js 404/noindex handling
- AND the page includes navigation to the home route

### Requirement: Web App Manifest

`app/manifest.ts` MUST exist and export a manifest with `name`, `short_name`, `theme_color`, `background_color`, `display`, and `start_url`. It MUST NOT include `icons` until real manifest icon assets are introduced.

#### Scenario: Manifest served with required fields

- GIVEN the manifest endpoint
- WHEN it is requested
- THEN all required fields (`name`, `short_name`, `theme_color`, `background_color`, `display`, `start_url`) are present in the response
- AND no nonexistent icon paths are referenced

### Requirement: Structured data contract tests

`tests/seo.test.ts` MUST assert: Organization JSON-LD structure (correct fields, no forbidden fields), BreadcrumbList presence for at least 2 representative inner pages, `themeColor` through the root viewport path, and manifest export shape. Tests MUST run via `node --import tsx --test tests/seo.test.ts`.

#### Scenario: New contract tests pass

- GIVEN all tests in `tests/seo.test.ts`
- WHEN run via `node --import tsx --test tests/seo.test.ts`
- THEN Organization, BreadcrumbList, viewport themeColor, and manifest assertions all pass with no failures

## Technical Constraints

- Next.js 16.2.9 has breaking changes — implementer MUST read `node_modules/next/dist/docs/` before writing metadata, routing, or manifest code
- All JSON-LD MUST use `toJsonLd()` from `lib/seo.ts` for XSS safety
- Client components cannot export `metadata` — use the `layout.tsx` pattern for client-component pages
- Test runner is `node:test`, not vitest

## Non-Goals

- Core Web Vitals / performance optimization
- FAQPage JSON-LD on additional pages
- Per-page OG images
- GSC verification meta tag (no token exists)
- Any schema data not verifiable in the codebase (`sameAs`, `logo`, ratings, etc.)
