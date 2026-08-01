# Delta for Landing SEO

## MODIFIED Requirements

### Requirement: Route metadata and social sharing

The system MUST expose canonical metadata for indexable public landing routes and SHOULD provide route-specific Open Graph and Twitter fields that preserve shared defaults while reflecting each route's visible topic. For `/`, the exact title MUST be `ID-NIGHT | Construyendo una noche más segura` and the exact description MUST be `ID-NIGHT es una iniciativa tecnológica nacida en Mendoza que trabaja junto con quienes salen, organizan, trabajan y cuidan para construir una nocturnidad más segura, responsable y respetuosa de la privacidad.`. Canonical, Open Graph, and Twitter fields for `/` MUST align with that same positioning, MUST remain consistent with the visible homepage H1 and narrative, and MUST NOT claim deployments, customers, results, or surveillance. The root layout MUST expose a `themeColor` matching the brand color through the Next.js `viewport` export, not through deprecated metadata fields.
(Previously: `/` metadata only needed to reflect the generic software positioning.)

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

### Requirement: Structured data matches visible content

The system MUST emit a `BreadcrumbList` JSON-LD block on every inner page and MUST emit a standalone `Organization` JSON-LD block in `app/layout.tsx`. Organization MUST contain only `@type`, `name`, and `url` and MUST NOT include invented profile, contact, founder, customer, or location fields. The homepage route MUST emit one route-level JSON-LD block whose title, description, current-stage language, and capability framing match the visible homepage brief, including Mendoza origin, in-development stage, privacy-first positioning, and the approved technology scope. BreadcrumbList items MUST reflect the actual URL path hierarchy. All JSON-LD MUST be served at SSR time via `toJsonLd()`. Routes without visible FAQs MUST NOT emit FAQPage markup.
(Previously: the requirement did not explicitly bind homepage schema to the approved institutional brief and founder/contact constraints.)

#### Scenario: Root schema reflects visible positioning

- GIVEN the home page rendered to the user
- WHEN JSON-LD is emitted for the route
- THEN schema fields describe the same narrative, stage, and capability limits shown on the page
- AND the route-level schema avoids fabricated proof, founder facts, contact numbers, or rollout claims

#### Scenario: FAQ schema is limited to visible FAQs

- GIVEN a route with rendered FAQ entries
- WHEN FAQ structured data is generated
- THEN each question and answer matches visible copy on that route
- AND routes without visible FAQs do not emit FAQPage markup

#### Scenario: BreadcrumbList on inner pages

- GIVEN any inner page (`/productos`, `/soluciones`, `/recursos/*`, `/legal/*`)
- WHEN the page is server-rendered
- THEN a `BreadcrumbList` JSON-LD script is present in the HTML
- AND items reflect the hierarchy `home → section → subsection`

#### Scenario: Organization JSON-LD in root layout

- GIVEN `app/layout.tsx`
- WHEN any page is rendered
- THEN exactly one `Organization` JSON-LD block is present containing only `name` and `url`
- AND no invented fields appear in the block

### Requirement: SEO-safe positioning guardrails

The system MUST present `/` as an institutional invitation organized around WHY first, HOW second, WHAT later, and INVITATION last. Homepage SEO surfaces MUST stay aligned with the approved visible H1, preserve natural discoverability for access-control software on technology and secondary routes, include functional internal links to approved destinations such as the technology route and privacy route, and use truthful image alt text where metadata or content exposes it. The system MUST NOT claim guarantees, total control, dangerous-person detection, surveillance marketing, invented statistics, testimonials, customers, alliances, pilots, government implementations, results, autonomous decisions, or security-staff replacement.
(Previously: the positioning guardrail only described the software framing, not the homepage institutional split and forbidden proof set.)

#### Scenario: Metadata and schema follow approved positioning

- GIVEN metadata, social copy, or structured data for a public route
- WHEN positioning text is inspected
- THEN `/` follows the institutional narrative while secondary routes keep operational software framing
- AND forbidden promises, invented proof, and surveillance wording are absent

#### Scenario: Visible landing copy stays within guardrails

- GIVEN a public landing route updated for SEO
- WHEN the route is manually reviewed
- THEN the homepage, H1, internal links, and exposed alt text stay aligned with the approved brief
- AND no page overstates maturity beyond staff-assisted, in-development workflows
