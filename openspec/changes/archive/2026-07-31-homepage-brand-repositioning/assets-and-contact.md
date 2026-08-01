# Assets and Contact Evidence

- **Verified WhatsApp source**: Engram topic `sdd/homepage-brand-repositioning/contact-config`; runtime source `components/home/contact.ts`.
- **Verified destination**: E.164 `+5492634616717`; `wa.me` digits `5492634616717`.
- **Verified CTA messages**:
  - `events`: `Hola, quiero participar desde la organización de eventos y compartir mi experiencia sobre accesos, listas, seguridad, excepciones e incidentes.`
  - `venue`: `Hola, administro un espacio y quiero conversar sobre los desafíos de mi operación y la posibilidad de futuros pilotos con ID-NIGHT.`
  - `institution`: `Hola, represento una institución y quiero explorar iniciativas, estándares y formas de colaboración para mejorar la nocturnidad con ID-NIGHT.`
  - `general`: `Hola, quiero contar mi experiencia y conocer más sobre ID-NIGHT.`
- **Link rule**: homepage CTAs must keep using `buildHomepageContact()` / `buildHomepageWhatsAppHref()`; do not introduce hardcoded `wa.me` URLs.
- **Founder photo**: still pending; current homepage uses an explicit premium initials placeholder.
- **Hero placeholder rule**: keep the current honest abstract Mendoza-night placeholder until a rights-cleared real asset exists; no fake Mendoza scene, no surveillance/police/hacker cues, no hero product screenshot.
- **Founder replacement rule**: only swap to a real founder photograph with similar framing; no AI likeness, no stock face presented as the founder, and no copy implying the placeholder is already real.
- **Layout-stability rule**: future hero/founder asset swaps should preserve the current aspect ratios and avoid unnecessary layout churn.
