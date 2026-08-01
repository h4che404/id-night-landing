# Proposal: Homepage Brand Repositioning

## Intent
Redesign `/` as an institutional homepage for ID-NIGHT. Binding story: Golden Circle always sells the idea — WHY → HOW → WHAT → INVITATION — without invented proof.

## Scope
In: nine-section homepage, nav, WhatsApp CTAs, SEO, conservative motion, responsive/manual checks, secondary pages unchanged.

Out: backend, proven outcomes, invented customers/stats/partnerships, centralized biometrics, AI founder image, fake Mendoza imagery.

## Scope / Narrative Architecture
Golden Circle is binding across proposal, specs, design, tasks, copy hierarchy, and CTA order. It organizes — but MUST NOT add/remove/rename/reorder — the exact sections:

1. Hero: positive Mendoza night, invitation; origin optional.
2. El problema actual / punto de partida.
3. Lo que creemos / nuestros principios.
4. Una noche, muchas personas / mirada compartida.
5. Qué estamos haciendo / etapa actual.
6. La tecnología / tecnología con propósito.
7. Participación (`id="participar"` or equivalent).
8. Fundador.
9. CTA final.

Map:
- WHY (1-4): nightlife can be safer without ceasing to be free, human, and private.
- HOW (5-6): listen to the ecosystem; prevent before reacting; minimize/protect data; support, not surveil; strengthen human decisions; clarify/trace processes.
- WHAT (6): in-development ecosystem for identity/age verification, events/lists, access staff, decisions/exceptions, incidents, traceability/reporting, and data protection; biometrics only contextual with safeguards.
- INVITATION (7-9): profile-specific WhatsApp, first-person founder context, final active WhatsApp.

No separate “origin/mission”, “how it works”, or “privacy/trust” sections.

## Capabilities
New: `homepage-brand-narrative` — section order, CTAs, navigation, accessibility, visual/performance.

Modified: `landing-seo` — root metadata, social previews, JSON-LD align with visible positioning.

## Approach / CTA Strategy
Use App Router shell, brand tokens, SEO helpers, and motion primitives. Specs/design/tasks MUST preserve the map. Copy leads with WHY; production copy later in Argentine Spanish. Technology remains secondary and in development. CTAs appear after HOW/WHAT and use distinct profile messages.

## Affected Areas
`app/page.tsx`, `components/Hero.tsx`; `components/Navbar.tsx`, `components/Footer.tsx`; `lib/seo.ts`, `app/layout.tsx`, OG/Twitter/manifest.

## Dependencies
- Real founder photo pending.
- Use honest Mendoza-night placeholder until real asset exists.
- WhatsApp destination verified via Engram `sdd/homepage-brand-repositioning/contact-config`: E.164 `+5492634616717`, wa.me digits `5492634616717`; use central typed config with distinct prefilled messages and no scattered hardcoded URLs.
- Preflight: interactive, hybrid, ask-on-risk, 800-line review budget.

## Risks / Mitigations
- Overclaiming maturity → use in-development/research language.
- Feature-first story → enforce Golden Circle in specs/design/tasks/headings/CTAs.
- Visual harness absent → manually check 375/390/768/1440 and secondary pages.
- Contact drift → keep WhatsApp URLs generated from central typed config, with verified digits and distinct prefilled messages only.

## Rollback Plan
Revert homepage/SEO/navigation edits to prior hero-only state; keep secondary/legal unchanged.

## Success Criteria
- [ ] Exact nine sections render accessibly/responsively.
- [ ] Golden Circle traceable across artifacts, copy hierarchy, CTA order.
- [ ] Profile WhatsApp CTAs use verified destination/messages.
- [ ] SEO/schema/social match visible claims.
- [ ] No invented proof, fake assets, centralized biometrics, or dead-end CTAs.
