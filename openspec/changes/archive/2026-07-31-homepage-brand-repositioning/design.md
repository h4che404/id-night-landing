# Design: Homepage Brand Repositioning

## Technical Approach

Rebuild `/` server-first. Render exactly Hero → Problem → Beliefs → Actors → Current Stage → Technology → Participation → Founder → Final CTA, with Golden Circle rhythm WHY (1-4) → HOW (5-6) → WHAT (6) → INVITATION (7-9). Production copy stays exact Argentine Spanish from corrected specs; invent nothing.

## Architecture Decisions

| Area | Choice / rationale |
|---|---|
| Components | Create `components/home/*Section.tsx`, `HomePage.tsx`, typed `homepage-content.ts`; `app/page.tsx` composes JSON-LD + homepage. Avoids a monolith; makes order/copy testable. |
| Client boundary | Sections are Server Components. Keep `Navbar` client; tiny reveal wrapper only if Framer is required. Next 16: client files pull imports into bundle. |
| Visual system | Reuse tokens and `.gradient-text`/`.glass`; add restrained gradients/glow, space, varied surfaces, lines/nodes. No surveillance/hacker/police/excess-neon cues. |
| Media | Hero uses a lightweight abstract, non-photographic Mendoza-night placeholder; no product screenshot lead. Founder photo defaults to honest initials placeholder until the real founder photograph is supplied. |
| CTAs | Verified routes: `/productos`, `/legal/privacidad`, `#participar`. WhatsApp uses central typed contact config for `+5492634616717` / `5492634616717` from Engram `sdd/homepage-brand-repositioning/contact-config`, with distinct prefilled messages per profile/general CTA and no scattered hardcoded URLs. |
| SEO | Update `lib/seo.ts`, root page/layout JSON-LD, OG/Twitter copy; preserve secondary route SEO. |

## Section Map / Semantics

| # | Component | Semantics |
|---|---|---|
| 1 | `HeroSection` | `id="vision"`; only H1 `La noche que queremos se construye entre todos.` |
| 2 | `ProblemSection` | H2 `La noche todavía se gestiona con información fragmentada.` |
| 3 | `BeliefsSection` | H2 `Más seguridad no debería significar menos libertad ni menos privacidad.` |
| 4 | `ActorsSection` | H2 `Una mejor noche no puede construirse desde un solo lugar.` |
| 5 | `CurrentStageSection` | H2 `Escuchar, comprender, construir y probar.` |
| 6 | `TechnologySection` | H2 `Mejores herramientas para organizar, decidir y comprender.`; `/productos`. |
| 7 | `ParticipationSection` | `id="participar"`; three profile WhatsApp CTAs. |
| 8 | `FounderSection` | H2 `Una pregunta que empezó mucho antes que la tecnología.` |
| 9 | `FinalCtaSection` | H2 `La noche que queremos no se construye desde una sola mirada.` |

## Data Flow

`homepage-content.ts` → server sections → `HomePage` → `app/page.tsx`; `contact.ts` centralizes institutional WhatsApp config and builds profile/general CTA hrefs; `lib/seo.ts` exports strings/schema → page/layout/social/tests.

## File Changes

| File | Action | Description |
|---|---|---|
| `app/page.tsx` | Modify | Root metadata, route JSON-LD, `HomePage`. |
| `components/home/HomePage.tsx`, `*Section.tsx`, `homepage-content.ts`, `contact.ts` | Create | Ordered sections, typed content, centralized verified WhatsApp config, href builder, profile/general messages, release guard. |
| `components/Navbar.tsx` | Modify | Priority nav: `Visión`, `Qué creemos`, `Tecnología`, `Participar`, `Privacidad`; preserve routes; accessible mobile menu. |
| `components/Footer.tsx` | Modify | Institutional copy; links. |
| `lib/seo.ts` | Modify | Exact root title/description, homepage schema, Organization only `@context`, `@type`, `name`, `url`; keep viewport. |
| `app/opengraph-image.tsx`, `app/twitter-image.tsx` | Modify | Institutional social preview. |
| `tests/seo.test.ts` | Modify | Metadata/schema/copy/order/link/CTA contracts. |
| `openspec/changes/homepage-brand-repositioning/assets-and-contact.md` | Create | Pending real founder photograph note and verified WhatsApp destination evidence. |

## Interfaces / Contracts

```ts
type HomeSectionId = 'vision'|'problema'|'principios'|'actores'|'etapa'|'tecnologia'|'participar'|'fundador'|'cta-final';
type CtaProfile = 'events'|'venue'|'institution'|'general';
type WhatsAppContactConfig = { e164: '+5492634616717'; waMeDigits: '5492634616717'; source: 'sdd/homepage-brand-repositioning/contact-config' };
type ContactState = { enabled: true; href: string; profile: CtaProfile };
```
The CTA builder owns `https://wa.me/${waMeDigits}?text=${encodedMessage}` generation. Each profile/general CTA MUST receive a distinct prefilled message from typed content; application components consume `ContactState` only.

## Navigation / Accessibility / Motion

Mobile menu: focus entry/return, Escape, outside click, visible close, `aria-expanded`, `aria-controls`, scroll lock with scrollbar compensation, safe-area padding, no layout shift. Homepage: one H1, labelled sections, real links/buttons, truthful alt/ARIA, visible focus. `prefers-reduced-motion` disables transforms/autoplay/pulse/parallax.

## Responsive / Performance / Images

Use fluid `clamp()` type/spacing, responsive grids, no rigid absolute content. Verify 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920; manual 375x812, 390x844, 768x1024, 1440x900. Next Image 16.2.9: width/height or `fill`+`sizes`; avoid deprecated `priority`; `preload` only for real hero-photo LCP. No video/new library.

## Testing Strategy

| Layer | Approach |
|---|---|
| Contract | Extend `npm test` for metadata, Organization keys, JSON-LD, section order, strings, anchors, forbidden terms. |
| Link/CTA | Validate all generated `wa.me` hrefs use `5492634616717`, encode distinct profile/general messages, and come from `contact.ts`; checks no longer block for missing destination. |
| Gates | `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run dev`; manual viewport/focus/reduced-motion evidence. No Playwright/Cypress. |

## Threat Matrix

| Boundary | Applicability |
|---|---|
| Documentation-like paths | N/A: no executable-file classification. |
| Git repository selection | N/A: no git command integration. |
| Commit state | N/A: no commit automation. |
| Push state | N/A: no push automation. |
| PR commands | N/A: no PR automation. |

## Migration / Rollout

Replace only `/`, nav/footer consistency, SEO, tests, typed contact config, and asset/contact note. Rollback by reverting those files. Do not destructively modify secondary page bodies or add dependencies. Old unused visuals may remain.

## Open Questions / Risks

- Pending: real founder photograph.
- Release checks still validate functional WhatsApp links, but do not block on destination discovery; visual regression is manual only.
