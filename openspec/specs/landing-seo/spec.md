# Landing SEO Specification

## Purpose

Define the SEO behavior for public landing routes so ID-Night is discoverable and shareable without making unsupported security claims.

## Requirements

### Requirement: Route metadata and social sharing

The system MUST expose canonical metadata for indexable public landing routes and SHOULD provide route-specific Open Graph and Twitter fields that preserve shared defaults while reflecting each route's visible topic. For `/`, the exact title MUST be `ID-NIGHT | Construyendo una noche más segura` and the exact description MUST be `ID-NIGHT es una iniciativa tecnológica nacida en Mendoza que trabaja junto con quienes salen, organizan, trabajan y cuidan para construir una nocturnidad más segura, responsable y respetuosa de la privacidad.`. Canonical, Open Graph, and Twitter fields for `/` MUST align with that same positioning, MUST remain consistent with the visible homepage H1 and narrative, and MUST NOT claim deployments, customers, results, or surveillance. The root layout MUST expose a `themeColor` matching the brand color through the Next.js `viewport` export, not through deprecated metadata fields.

#### Scenario: Route-specific sharing data exists

- GIVEN a public landing route such as `/`, `/productos`, or `/recursos/aprender`
- WHEN its metadata is generated
- THEN the route includes a canonical URL for itself
- AND homepage metadata matches the approved institutional title/description while secondary routes keep their visible topic

#### Scenario: Shared social defaults stay intact

- GIVEN a route overrides nested social metadata
- WHEN metadata is composed in Next.js
- THEN shared fields such as site identity and fallback image remain present

#### Scenario: themeColor present in root viewport

- GIVEN the root layout viewport configuration is generated
- WHEN Next.js composes the document head
- THEN a `themeColor` field is present through the viewport API and matches the brand color

### Requirement: Sitemap, robots, and canonical hygiene

The system MUST publish a sitemap and robots policy that reference only intended canonical public routes, and it MUST keep canonical URLs aligned with those routes.

#### Scenario: Indexable routes are listed consistently

- GIVEN the public landing route inventory
- WHEN `sitemap.xml` and route canonicals are reviewed
- THEN each intended indexable route appears once with its canonical URL
- AND non-canonical duplicates are not introduced

#### Scenario: Crawl hints remain explicit

- GIVEN the robots endpoint
- WHEN a crawler requests `robots.txt`
- THEN the response includes the production host and sitemap URL

### Requirement: Structured data matches visible content

The system MUST emit a `BreadcrumbList` JSON-LD block on every inner page and MUST emit a standalone `Organization` JSON-LD block in `app/layout.tsx`. Organization MUST contain only `@type`, `name`, and `url` and MUST NOT include invented profile, contact, founder, customer, or location fields. The homepage route MUST emit one route-level JSON-LD block whose title, description, current-stage language, and capability framing match the visible homepage brief, including Mendoza origin, in-development stage, privacy-first positioning, and the approved technology scope. BreadcrumbList items MUST reflect the actual URL path hierarchy. All JSON-LD MUST be served at SSR time via `toJsonLd()`. Routes without visible FAQs MUST NOT emit FAQPage markup.

#### Scenario: Root schema reflects visible positioning

- GIVEN the home page rendered to the user
- WHEN JSON-LD is emitted for the route
- THEN schema fields describe the same narrative, stage, and capability limits shown on the page
- AND the route-level schema avoids fabricated proof, founder facts, contact numbers, or rollout claims

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

### Requirement: SEO-safe positioning guardrails

The system MUST present `/` as an institutional invitation organized around WHY first, HOW second, WHAT later, and INVITATION last. Homepage SEO surfaces MUST stay aligned with the approved visible H1, preserve natural discoverability for access-control software on technology and secondary routes, include functional internal links to approved destinations such as the technology route and privacy route, and use truthful image alt text where metadata or content exposes it. The system MUST NOT claim guarantees, total control, dangerous-person detection, surveillance marketing, invented statistics, testimonials, customers, alliances, pilots, government implementations, results, autonomous decisions, or security-staff replacement.

#### Scenario: Metadata and schema follow approved positioning

- GIVEN landing metadata, social copy, or structured data
- WHEN positioning text is authored
- THEN `/` follows the institutional narrative while secondary routes keep operational software framing
- AND forbidden promises, invented proof, and surveillance wording are absent

#### Scenario: Visible landing copy stays within guardrails

- GIVEN a public landing route updated for SEO
- WHEN the route is manually reviewed
- THEN the homepage, H1, internal links, and exposed alt text stay aligned with the approved brief
- AND no page overstates maturity beyond staff-assisted, in-development workflows

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

`tests/seo.test.ts` MUST assert Organization JSON-LD structure, viewport `themeColor`, and manifest export shape. It MUST verify breadcrumb navigation and `BreadcrumbList` JSON-LD from server-rendered HTML for at least two representative inner pages, rather than from source-text inspection. It MUST also verify that `app/not-found.tsx` renders branded recovery navigation to the home route. Tests MUST run via `node --import tsx --test tests/seo.test.ts`.

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
