# Delta for Homepage Brand Narrative

## MODIFIED Requirements

### Requirement: Header, mobile behavior, preservation, and release quality meet the brief

The header MUST prioritize `Visión`, `Qué creemos`, `Tecnología`, `Participar`, and `Privacidad`, while preserving access to existing product, solution, pricing, resources, legal, privacy, user-app, security-app, admin-panel, credential, biometrics, integrations, and venues routes. Mobile navigation MUST support body scroll lock, visible close control, outside click, Escape, visible focus, predictable focus entry/return, and no layout jump or covered content. The homepage MUST remain usable at exact production CSS viewports 320x812, 360x800, 375x812, 390x844, and 430x932, plus regression viewports 768x1024, 1024x768, 1440x900, and 1920x1080. At the five mobile acceptance viewports, all hero label, title, body, primary and secondary CTAs, and context links MUST remain fully within the viewport, readable, and untruncated. The release proof MUST demonstrate that no horizontal clipping is merely hidden by root `overflow-x-hidden`; geometry or pixel evidence MUST identify rightmost essential-content bounds less than or equal to the viewport width. Production-server (`next start`) screenshots captured at deviceScaleFactor 1 SHALL be the authoritative mobile acceptance evidence; development-server screenshots, retina-scaled captures, or DOM `scrollWidth` checks alone SHALL NOT satisfy acceptance. The homepage MUST preserve exact approved copy, nine-section order, Golden Circle narrative flow, CTA destinations, honest placeholders, SEO metadata/JSON-LD contracts, and desktop visual hierarchy. It MUST avoid horizontal scroll and hidden essential content, use semantic landmarks with one H1, support keyboard and reduced motion, use real links/buttons and valid alt/ARIA labeling, avoid heavy video or unnecessary libraries, add no new dependency, and remove no content as a responsive workaround. Hero imagery MUST evoke a human, organized, positive Mendoza night, MUST NOT use product screenshots as the hero, and MAY use only an honest documented placeholder until a real image exists. Existing three archived WARNING follow-ups remain out of scope unless this remediation directly touches the same surface.
(Previously: manual responsive proof named fewer mobile viewports, allowed weaker acceptance evidence, and did not explicitly require geometry proof against overflow masking.)

#### Scenario: Production mobile hero content stays fully visible

- GIVEN the production server is running with exact CSS viewports 320x812, 360x800, 375x812, 390x844, and 430x932 at deviceScaleFactor 1
- WHEN authoritative screenshots and geometry are reviewed for the hero label, title, body, CTAs, and context links
- THEN each required element remains fully inside the viewport, readable, and untruncated
- AND no essential hero content is clipped on the right edge

#### Scenario: Overflow masking is rejected as acceptance proof

- GIVEN the root layout may apply `overflow-x-hidden`
- WHEN mobile acceptance evidence is evaluated
- THEN release proof MUST include pixel or geometry evidence showing rightmost essential-content bounds are less than or equal to the viewport width
- AND passing `scrollWidth` metrics alone does not qualify as acceptance

#### Scenario: Preservation contract survives the remediation

- GIVEN the clipping remediation is complete
- WHEN mobile and regression viewports are reviewed
- THEN exact copy, section order, Golden Circle flow, CTA destinations, placeholders, SEO, and desktop visual hierarchy remain unchanged
- AND no new dependency or responsive content-removal workaround is introduced

#### Scenario: Archived warnings stay out of scope unless directly touched

- GIVEN three archived WARNING follow-ups already exist outside this change
- WHEN the remediation is specified or verified
- THEN those follow-ups remain out of scope by default
- AND only directly touched surfaces may reopen them for this change
