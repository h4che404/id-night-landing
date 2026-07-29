# Exploration: Landing Visual Redesign

> Captured post-hoc: the explore phase ran read-only (no write access). This file records its authoritative findings so downstream phases have them on disk.

## Next.js 16.2.9 grounding

- File-based icon/manifest conventions are UNCHANGED from Next 13.3+: `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, and `manifest` `icons[]` array all behave as documented.
- The only v16 change (`params` as a Promise for dynamic icon routes) is irrelevant here — no dynamic icon routes are used.
- Any metadata/favicon/manifest/icon/OG claim is grounded in `node_modules/next/dist/docs/`.

## Emoji-as-icon inventory (~110 usages across 20 files)

| File | Count | Notes |
|------|-------|-------|
| `app/soluciones/page.tsx` | 24 | heaviest |
| `components/Navbar.tsx` | 18 | mega-menu items |
| `app/productos/page.tsx` | 11 | |
| `components/Herramientas.tsx` | 11 | |
| `components/Seguridad.tsx` | 7 | incl. standalone `🛡` hero badge (line 40) |
| `components/Problema.tsx` | 6 | |
| `app/recursos/empresa/page.tsx` | 4 | |
| `app/recursos/page.tsx` | 4 | |
| `components/ComoFunciona.tsx` | 4 | |
| `app/recursos/soporte/page.tsx` | 3 | |
| `components/VisualAcceso.tsx` | 3 | |
| `components/CredentialCard.tsx` | 3 | |
| `app/legal/page.tsx` | 2 | |
| `components/VisualDashboard.tsx` | 2 | |
| `components/VisualBiometrico.tsx` | 2 | incl. conditional `😊`/`😐` |
| `components/VisualCredencial.tsx` | 2 | |
| `components/Precios.tsx` | 1 | |
| `components/CTAFinal.tsx` | 1 | |
| `app/recursos/contacto/page.tsx` | 1 | |
| `components/Footer.tsx` | 1 | `🇦🇷` flag — locale marker, NOT a UI icon |

- Reference already migrated to lucide-react: `app/recursos/fundador/page.tsx` — pattern is `icon: Component` in data arrays, then `const Icon = x.icon; <Icon className=... />` in render.

## Brand state (today)

- Brand is TEXT not a logo: `Navbar.tsx:135-140` and `Footer.tsx:50-55` render an 8x8 `bg-gradient-to-br from-violet-600 to-cyan-500` div with literal text `"ID"`.
- OG image `app/opengraph-image.tsx:23-34` (re-exported by `twitter-image.tsx`) is a bare 60x60 gradient square, no monogram.
- Three divergent gradient definitions: `globals.css .gradient-text` = `#A78BFA → #67E8F9`; Navbar/Footer/OG = `violet-600 → cyan-500`; confirmed brand gradient = `#38bdf8` (cyan) → `#7c3aed` (violet). Consolidate to ONE token.
- Favicon/manifest: `app/favicon.ico` exists (likely Next default). NO `app/icon.*` / `app/apple-icon.*`. `app/manifest.ts` returns name/short_name/start_url/display/background_color `#08080F`/theme_color `#7C3AED` with NO `icons` array (deliberate today).

## Routes to restyle (18)

`/`, `/productos`, `/soluciones`, `/precios`, `/problema`, `/como-funciona`, `/herramientas`, `/seguridad`, `/legal`, `/legal/terminos`, `/legal/privacidad`, `/recursos`, `/recursos/aprender`, `/recursos/empresa`, `/recursos/fundador`, `/recursos/soporte`, `/recursos/contacto`, plus `not-found`.

## Test guards (Strict TDD)

- `tests/seo.test.ts` ~521-531: asserts manifest has NO icons (`"icons" in manifestValue === false`). MUST be deliberately rewritten to encode new contract.
- `tests/seo.test.ts` ~374-404: asserts Organization JSON-LD has NO logo (`"logo" in organizationJsonLd === false`). MUST be deliberately rewritten.
- `tests/seo.test.ts` ~326-336: `openGraph.images == [{url:"/opengraph-image", alt: SOCIAL_IMAGE_ALT}]` and `twitter.images == ["/twitter-image"]` — keep route/alt stable or update deliberately.
- Test command: `npm test` → `node --import tsx --test tests/seo.test.ts`. Strict TDD scoped to SEO/metadata/JSON-LD contracts and static-rendered copy/anchors; pure visual swaps (icon/logo images, styling) have NO automated coverage → manual verification.

## Shared primitives to preserve

`components/motion.ts`, `AnimatedPage`, `AnimatedSection`, `app/template.tsx` slide transition, `globals.css` `.gradient-text`/`.gradient-border`/`.card-float`.

## Brand assets (live OUTSIDE repo — must be copied into `public/` or `app/`)

- Best web logo: `/Users/juancruzeliasmartin/Desktop/ProyectoSaaS/ID-Night/Iconos/Logo quitar fondo/2.png` — transparent shield, cyan→violet gradient stroke, ideal on dark theme. Use in Navbar + Footer replacing the "ID" text box.
- Ready favicon/PWA set: `/Users/juancruzeliasmartin/Desktop/ProyectoSaaS/ID-Night/Iconos/IconKitchen-Output/web/` — `icon-192.png`, `icon-512.png`, `icon-192-maskable.png`, `icon-512-maskable.png`, `apple-touch-icon.png`. Wire into `app/icon.png`, `app/apple-icon.png`, favicon, and `manifest.ts` `icons[]`.
- Brand mark = shield + "iD" monogram (a person forms the D). Brand gradient cyan `#38bdf8` → violet `#7c3aed`.
- Marketing infographic confirms brand visual language = cyan→violet neon LINE icons per section — same aesthetic as lucide-react, so lucide line-icons tinted with the brand gradient are on-brand.

## Product context

ID-Night = B2B subscription software for identity/age/access/incident validation at nightclubs & events in Argentina. Solo founder (Juan Cruz Elías Martín); `/recursos/fundador` positions him as sole creator; `/recursos/empresa` aligned to "born in San Martín, Mendoza, solo founder". First market = Mendoza. Do NOT reintroduce team/plural framing.
