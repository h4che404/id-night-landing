# Exploration: Homepage Brand Repositioning

## Current State

- `app/page.tsx` renders only `Hero` plus home JSON-LD. The homepage is a single-screen, product-led entry point rather than an institutional narrative.
- `app/layout.tsx` provides the shared shell (`Navbar`, `Footer`, `BrandIconDefs`) and root Organization JSON-LD.
- The design system is already in place: canonical brand tokens in `lib/brand.ts`, shared SEO helpers in `lib/seo.ts`, and reusable motion utilities in `components/motion.ts`.
- Existing section components already cover most of the content universe the new homepage needs, but they are not composed into the homepage today: `Problema`, `ComoFunciona`, `Herramientas`, `Seguridad`, `CTAFinal`, and the supporting resource pages.
- Participation is not functional yet. The homepage CTA is a disabled span (`PRÓXIMAMENTE`), and the contact surface is a static mailto link.

## Affected Areas

- `app/page.tsx` — homepage composition and structured data.
- `components/Hero.tsx` — current homepage hero, motion-heavy and product-first.
- `components/Navbar.tsx` — global header, desktop mega-menu, mobile drawer behavior.
- `components/Footer.tsx` — global navigation and contact pathways.
- `app/layout.tsx` — shared shell, metadata, Organization JSON-LD.
- `lib/seo.ts` — root title/description, metadata helpers, JSON-LD builders.
- `app/manifest.ts`, `app/opengraph-image.tsx`, `app/twitter-image.tsx` — brand/SEO surfaces.
- `app/globals.css` — canonical visual tokens (`gradient-text`, `gradient-border`, `glass`, aurora animations).
- `components/Problema.tsx`, `components/ComoFunciona.tsx`, `components/Herramientas.tsx`, `components/Seguridad.tsx`, `components/CTAFinal.tsx`, `components/Precios.tsx` — reusable narrative/content blocks.
- `app/recursos/contacto/page.tsx`, `app/recursos/empresa/page.tsx`, `app/recursos/fundador/page.tsx`, `app/legal/*` — institutional proof, legal trust, and contact context.
- `public/logo.png` and the PWA icons in `public/` — brand assets already available in-repo.

## Approaches

1. **Compose a new homepage from existing primitives** — reuse the shared shell, SEO helpers, motion system, and the existing section components as a base for the new nine-section narrative.
   - Pros: fastest path, keeps existing architecture, minimizes churn, and preserves tested SEO contracts.
   - Cons: some current components are product-heavy and will need content/structure cleanup.
   - Effort: Medium.

2. **Build a homepage-specific section system** — create dedicated homepage sections and treat the existing pages/components as source material only.
   - Pros: strongest fit for the institutional repositioning, best control over narrative, accessibility, and responsive behavior.
   - Cons: more new code and more manual verification.
   - Effort: High.

## Recommendation

Use a hybrid of both: keep the shared shell, SEO layer, brand tokens, and motion primitives, but assemble a new homepage-specific narrative with dedicated sections. The page should be shaped as nine blocks with clear storytelling order: hero, problem, Mendoza/origin or mission, how it works, privacy/human review, technology/product capabilities, participation paths, institutional/company proof, and a final CTA/contact block.

This preserves the good infrastructure already present while removing the current hero-only, product-first feel. It also makes room for a real participation flow instead of disabled CTAs.

## Risks

- Root metadata, Open Graph, JSON-LD, and manifest changes are test-sensitive (`tests/seo.test.ts` covers these contracts).
- The homepage currently relies on Framer Motion, auto-rotating tab state, and hover-driven effects; a longer institutional homepage will need reduced-motion and keyboard-friendly behavior.
- There is no visual regression harness, so responsive verification at 375x812, 390x844, 768x1024, and 1440x900 must be manual.
- The global header/footer are shared by every route, so header/mobile changes have blast radius beyond the homepage.
- Participation CTAs cannot remain dead ends; they need a real destination or intake mechanism before launch.

## Ready for Proposal

Yes. The next phase should lock the section map, CTA mechanics, and content ownership for the new homepage without introducing invented customers, stats, pilots, or partnerships.
