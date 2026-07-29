# Delta for Landing SEO — landing-visual-redesign

## MODIFIED Requirements

### Requirement: Web App Manifest

`app/manifest.ts` MUST exist and export a manifest with `name`, `short_name`, `theme_color`, `background_color`, `display`, `start_url`, and `icons`. `icons` MUST be an array of exactly four entries referencing the real brand PWA assets: `{ src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" }`, `{ src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" }`, `{ src: "/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" }`, `{ src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" }`. Every referenced `src` MUST resolve to a file actually served under `public/`.
(Previously: manifest MUST NOT include `icons` until real assets were introduced)

#### Scenario: Manifest served with required fields

- GIVEN the manifest endpoint
- WHEN it is requested
- THEN all required scalar fields (`name`, `short_name`, `theme_color`, `background_color`, `display`, `start_url`) are present in the response

#### Scenario: Manifest icons reference real brand assets

- GIVEN the manifest endpoint
- WHEN `icons` is inspected
- THEN it contains the 192, 512, and maskable-192/512 entries with correct `sizes`, `type: "image/png"`, and `purpose`
- AND every `src` path resolves to a file that exists and is served

### Requirement: Structured data matches visible content

The system MUST emit a `BreadcrumbList` JSON-LD block on every inner page and MUST emit a standalone `Organization` JSON-LD block in `app/layout.tsx`. Organization MUST contain only `@type`, `name`, `url`, and `logo` — it MUST NOT include `sameAs`, `address`, `telephone`, `email`, `foundingDate`, `description`, or any ratings/review fields. `logo` MUST be an absolute URL built via `SITE_URL` (e.g. `${SITE_URL}/icon-512.png`) pointing to the brand shield mark. BreadcrumbList items MUST reflect the actual URL path hierarchy. All JSON-LD MUST be served at SSR time via `toJsonLd()`. Routes without visible FAQs MUST NOT emit FAQPage markup.
(Previously: Organization MUST NOT include `logo`; only `@type`, `name`, `url` were allowed)

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

#### Scenario: Organization JSON-LD includes brand logo

- GIVEN `app/layout.tsx`
- WHEN any page is rendered
- THEN exactly one `Organization` JSON-LD block is present containing `name`, `url`, and `logo`
- AND `logo` is an absolute URL under `SITE_URL` pointing to the brand mark
- AND no other invented fields appear in the block

### Requirement: Structured data contract tests

`tests/seo.test.ts` MUST assert Organization JSON-LD structure (including the required `logo`), viewport `themeColor`, and manifest export shape (including the required `icons` array). It MUST verify breadcrumb navigation and `BreadcrumbList` JSON-LD from server-rendered HTML for at least two representative inner pages, rather than from source-text inspection. It MUST also verify that `app/not-found.tsx` renders branded recovery navigation to the home route, and that the default OG/Twitter image route (`/opengraph-image`, `/twitter-image`) and `SOCIAL_IMAGE_ALT` remain unchanged. Tests MUST run via `node --import tsx --test tests/seo.test.ts`.
(Previously: asserted manifest had NO `icons` and Organization had NO `logo` — this change deliberately flips both guards)

#### Scenario: Rendered breadcrumb contracts pass

- GIVEN representative inner pages are server-rendered for the SEO suite
- WHEN breadcrumb assertions run
- THEN HTML includes a breadcrumb nav labeled `Breadcrumb`
- AND a `BreadcrumbList` JSON-LD block matching the route hierarchy

#### Scenario: Branded 404 recovery contract passes

- GIVEN `app/not-found.tsx` is server-rendered in the SEO suite
- WHEN recovery assertions run
- THEN branded navigation to the home route is present

#### Scenario: Manifest and Organization contracts flip to icons + logo

- GIVEN `tests/seo.test.ts`
- WHEN `manifest()` and `buildOrganizationJsonLd()` are asserted
- THEN `manifest().icons` contains the four brand entries
- AND the Organization JSON-LD contains a `logo` field pointing to the brand mark
- AND `openGraph.images`/`twitter.images` routes and `SOCIAL_IMAGE_ALT` remain unchanged

## ADDED Requirements

### Requirement: Brand favicon and touch icons

`app/favicon.ico`, `app/icon.png`, and `app/apple-icon.png` MUST exist and serve the real brand shield assets, not Next.js placeholder defaults, using unchanged Next.js file-based icon conventions.

#### Scenario: Brand icon files exist and are non-default

- GIVEN the `app/` directory
- WHEN `favicon.ico`, `icon.png`, and `apple-icon.png` are inspected
- THEN each file exists and matches the real brand PWA asset (not the Next.js default icon)

#### Scenario: Icons are served through Next.js file-based routing

- GIVEN a request to `/favicon.ico`, `/icon.png`, or `/apple-icon.png`
- WHEN Next.js resolves file-based metadata icons
- THEN the response returns the corresponding brand asset with the correct content type

## Acceptance Criteria — Manual Verification (No Automated Coverage)

- Navbar and Footer render the real shield logo asset in place of the "ID" text box, on every route.
- Exactly one brand gradient token (`#38bdf8` → `#7c3aed`) is defined and used by Navbar, Footer, the OG image, and `globals.css`; the three prior divergent definitions are removed.
- `/opengraph-image` and `/twitter-image` visually depict the shield monogram; `contentType`, `size`, route, and `SOCIAL_IMAGE_ALT` stay unchanged so existing image-route assertions keep passing.
- All ~110 emoji icons across the ~20 identified files are replaced with `lucide-react` icons tinted with the brand gradient, preserving each emoji's original semantic meaning (Phase B).
- Footer `🇦🇷` remains as a locale marker and is explicitly out of scope for icon migration.

## Non-Goals

- Copy/messaging changes, per-page OG images, layout/IA restructuring, new pages, or performance/CWV work.
- Automated visual-regression testing for logo/icon/gradient rendering.
