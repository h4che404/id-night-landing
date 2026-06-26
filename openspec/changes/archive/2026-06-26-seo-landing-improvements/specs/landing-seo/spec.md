# Landing SEO Specification

## Purpose

Define the SEO behavior for public landing routes so ID-Night is discoverable and shareable without making unsupported security claims.

## Requirements

### Requirement: Route metadata and social sharing

The system MUST expose canonical metadata for indexable public landing routes and SHOULD provide route-specific Open Graph and Twitter fields that preserve shared defaults while reflecting each route's visible topic.

#### Scenario: Route-specific sharing data exists

- GIVEN a public landing route such as `/`, `/productos`, or `/recursos/aprender`
- WHEN its metadata is generated
- THEN the route includes a canonical URL for itself
- AND Open Graph/Twitter title or description matches the visible route topic without dropping shared site defaults

#### Scenario: Shared social defaults stay intact

- GIVEN a route overrides nested social metadata
- WHEN metadata is composed in Next.js
- THEN shared fields such as site identity and fallback image remain present

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

The system SHOULD emit JSON-LD only for content visibly rendered on the route. It MAY use Organization or SoftwareApplication on the root route, BreadcrumbList on routes that visibly show breadcrumbs, and FAQPage only where FAQ entries are rendered.

#### Scenario: Root schema reflects visible positioning

- GIVEN the home page content rendered to the user
- WHEN JSON-LD is emitted for the route
- THEN schema fields describe the same product, audience, and capabilities shown on the page

#### Scenario: FAQ schema is limited to visible FAQs

- GIVEN a route with rendered FAQ entries such as `/recursos/aprender` or `/recursos/soporte`
- WHEN FAQ structured data is generated
- THEN each question and accepted answer matches visible copy on that route
- AND routes without visible FAQs do not emit FAQPage markup

### Requirement: SEO-safe positioning guardrails

The system MUST present ID-Night as software that registers, organizes, and displays information so authorized staff can decide with more context. It MUST NOT claim autonomous decisions, total safety, zero fraud, incident elimination, automatic blocking, security staff replacement, or use blacklist or listas negras wording.

#### Scenario: Metadata and schema follow approved positioning

- GIVEN landing metadata, social copy, or structured data
- WHEN positioning text is authored
- THEN it uses operational traceability and staff-decision framing
- AND it avoids forbidden promises and forbidden wording

#### Scenario: Visible landing copy stays within guardrails

- GIVEN a public landing route updated for SEO
- WHEN the route is manually reviewed
- THEN the copy can target nightlife access and incident-management searches
- AND it does not overstate outcomes beyond what staff-assisted workflows support
