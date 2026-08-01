# Homepage Brand Narrative Specification

## Purpose

Define the homepage contract for `/` so the brand repositioning is purpose-led, privacy-safe, and free of fabricated claims while preserving approved secondary routes.

## Requirements

### Requirement: Homepage narrative order and Golden Circle binding

The homepage MUST render exactly nine sections, once each, in this order: Hero, Problem, Beliefs, Actors, Current Stage, Technology, Participation, Founder, Final CTA. The narrative MUST express WHY before HOW, HOW before WHAT, and INVITATION last, without adding standalone mission, origin, privacy, or how-it-works sections outside that order.

#### Scenario: Required sequence is preserved

- GIVEN the homepage is inspected from top to bottom
- WHEN labels and section headings are reviewed
- THEN the nine approved sections appear exactly once in the approved order
- AND no extra standalone narrative section interrupts the sequence

### Requirement: Sections 1–3 use the approved purpose-first copy

The Hero MUST use exactly `Desde Mendoza, construyendo una nueva forma de pensar la noche.`, `La noche que queremos se construye entre todos.`, `ID-NIGHT es una iniciativa tecnológica que trabaja junto con quienes salen, organizan, trabajan y cuidan para construir una nocturnidad más segura, responsable y respetuosa de la privacidad.`, `Contanos tu experiencia`, `Conocé lo que estamos construyendo`, and `Actualmente estamos conversando con productores, espacios, trabajadores y referentes del sector.`. The Problem section MUST use exactly `EL PUNTO DE PARTIDA`, `La noche todavía se gestiona con información fragmentada.`, `En accesos, listas, excepciones e incidentes se toman decisiones importantes en pocos segundos. Muchas veces la información está distribuida entre documentos, papeles, mensajes y distintas personas.`, the six approved problem situations by meaning, and `El desafío no es controlar más personas. Es contar con mejores herramientas, información limitada y procesos más claros.`. The Beliefs section MUST use exactly `NUESTROS PRINCIPIOS`, `Más seguridad no debería significar menos libertad ni menos privacidad.`, and the four approved principles with concise explanatory lines.

#### Scenario: Hero, problem, and beliefs copy matches the brief

- GIVEN sections 1 to 3 are rendered
- WHEN visible labels, headings, body copy, CTAs, and principles are compared with the approved brief
- THEN each required string matches exactly where specified
- AND the problem framing stays non-accusatory and non-criminalizing

### Requirement: Sections 4–6 describe shared actors, current stage, and technology without overclaiming

The Actors section MUST use exactly `UNA MIRADA COMPARTIDA`, `Una mejor noche no puede construirse desde un solo lugar.`, `Cada actor vive problemas, responsabilidades y necesidades diferentes. Por eso ID-NIGHT está comenzando por escuchar antes de imponer una respuesta.`, and the six approved actor groups with equal narrative priority. The Current Stage section MUST use exactly `LA ETAPA ACTUAL`, `Escuchar, comprender, construir y probar.`, and the four approved heading/body pairs for `Escuchamos`, `Investigamos`, `Construimos`, and `Probamos`. The Technology section MUST use exactly `TECNOLOGÍA CON PROPÓSITO`, `Mejores herramientas para organizar, decidir y comprender.`, `ID-NIGHT está desarrollando un ecosistema tecnológico orientado a identidad, accesos, decisiones e incidentes, manteniendo la privacidad y la intervención humana como principios centrales.`, the seven approved capability meanings, and a CTA labeled `Explorar la tecnología` that points only to a verified existing product or solution route. Biometrics MUST appear at most once, only as a bounded verification aid with safeguards.

#### Scenario: Shared actors, stage, and technology stay accurate

- GIVEN sections 4 to 6 are reviewed
- WHEN group coverage, stage wording, capabilities, and CTA destination are inspected
- THEN all approved groups, stage blocks, and capability meanings are present
- AND the page does not imply mass deployment, proven results, or surveillance-first technology

### Requirement: Sections 7–9 use approved participation, founder, and closing contracts

The Participation section MUST expose `id="participar"` or an equivalent fragment target and MUST use exactly `SUMATE A LA CONVERSACIÓN`, `Queremos escuchar a quienes viven la noche desde adentro.`, and exactly three cards with these strings: `Trabajo u organizo eventos` / `Compartí tu experiencia sobre accesos, listas, seguridad, excepciones e incidentes.` / `Quiero participar`; `Administro un espacio` / `Conversemos sobre los desafíos de tu operación y la posibilidad de futuros pilotos.` / `Hablar con ID-NIGHT`; `Represento una institución` / `Exploremos iniciativas, estándares y formas de colaboración para mejorar la nocturnidad.` / `Contacto institucional`. Each participation CTA MUST use a verified real WhatsApp destination with profile-specific prefilled messaging; release MUST be blocked if the destination is unverified. The Founder section MUST use exactly `QUIÉN ESTÁ DETRÁS`, `Una pregunta que empezó mucho antes que la tecnología.`, and only the approved first-person founder text from the brief, plus an honest real-photo slot or documented temporary placeholder. The Final CTA MUST use exactly `La noche que queremos no se construye desde una sola mirada.`, `Estamos empezando desde Mendoza y queremos sumar experiencias, preguntas y personas dispuestas a transformar la manera en que pensamos la noche.`, `Contanos tu experiencia`, `Conocé ID-NIGHT`, and `Cuidarnos también es parte de salir.`.

#### Scenario: Participation, founder, and final CTA stay authorized

- GIVEN sections 7 to 9 are rendered
- WHEN visible copy, founder facts, image treatment, and CTA destinations are inspected
- THEN only the approved strings and founder facts appear
- AND no fabricated biography, pilots, contact numbers, or replacement copy is introduced

### Requirement: Header, mobile behavior, preservation, and release quality meet the brief

The header MUST prioritize `Visión`, `Qué creemos`, `Tecnología`, `Participar`, and `Privacidad`, while preserving access to existing product, solution, pricing, resources, legal, privacy, user-app, security-app, admin-panel, credential, biometrics, integrations, and venues routes. Mobile navigation MUST support body scroll lock, visible close control, outside click, Escape, visible focus, predictable focus entry/return, and no layout jump or covered content. The homepage MUST remain usable at 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, and 1920 widths, pass manual inspection at 375x812, 390x844, 768x1024, and 1440x900, avoid horizontal scroll and hidden essential content, use semantic landmarks with one H1, support keyboard and reduced motion, use real links/buttons and valid alt/ARIA labeling, and avoid heavy video or unnecessary libraries. Hero imagery MUST evoke a human, organized, positive Mendoza night, MUST NOT use product screenshots as the hero, and MAY use only an honest documented placeholder until a real image exists.

#### Scenario: Navigation and release behavior are verifiable

- GIVEN desktop and mobile homepage review across the approved breakpoints
- WHEN navigation, accessibility, media, and preserved routes are inspected
- THEN the interaction and responsive contracts pass without broken links or dead buttons
- AND forbidden visuals, guarantees, surveillance marketing, invented proof, and unsupported validation claims are absent
