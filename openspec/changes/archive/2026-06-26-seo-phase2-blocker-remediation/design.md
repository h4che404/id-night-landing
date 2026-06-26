# Design: SEO Phase 2 Blocker Remediation

## Technical Approach

Implement this as a narrow test-and-hygiene remediation. The proposal requires stronger proof for existing SEO output, so `tests/seo.test.ts` will render representative App Router modules with `react-dom/server` and assert the HTML contract users/crawlers receive: visible breadcrumb navigation, serialized `BreadcrumbList` JSON-LD, and branded 404 recovery links. No delta spec artifact exists yet, so this design maps directly to the proposal success criteria. Runtime SEO implementation stays unchanged unless a rendered contract fails.

## Architecture Decisions

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Render route defaults in the existing Node test suite | Slightly more setup than source regex, but proves route output without a browser/server | Chosen: import default route components, render React elements, and inspect returned HTML |
| Start a built Next server and fetch routes | Stronger end-to-end proof, but slower and expands scope into runtime crawl/noindex behavior | Rejected for this blocker slice unless a new review blocker requires it |
| Add a new test file/runner | More separation, but larger review footprint and new conventions | Rejected: keep `node --import tsx --test tests/seo.test.ts` as the single SEO suite |
| Edit production SEO/page code preemptively | Could hide test gaps by changing behavior without evidence | Rejected: product code changes only if rendered assertions expose a real mismatch |

## Data Flow

    route module default export ──→ React.createElement ──→ renderToStaticMarkup
             │                              │                        │
             └──── imports existing SEO helpers/components ──────────┘
                                                                    │
                                                    HTML contract assertions
                                                    ├─ breadcrumb nav text/links
                                                    ├─ BreadcrumbList JSON-LD
                                                    └─ 404 recovery links

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `tests/seo.test.ts` | Modify | Add render helpers using `react-dom/server`; replace breadcrumb source regex checks with rendered HTML and parsed JSON-LD assertions for `app/productos/page.tsx` and `app/recursos/aprender/page.tsx`; render `app/not-found.tsx` and assert the visible 404 heading/copy plus `/` and `/productos` links. |
| `.gitignore` | Modify | Add `/.atl/` under local/generated artifact ignores so skill registry cache files do not enter commits. |
| `app/not-found.tsx` | Modify only if needed | Preserve current Server Component; change only if the new behavior contract exposes missing recovery output. |

## Interfaces / Contracts

No public runtime interface changes. Test-only helpers should stay local to `tests/seo.test.ts`:

```ts
type RouteModule = () => React.ReactNode;
type JsonLdObject = { [key: string]: unknown; "@type"?: string };
```

Rendered contract expectations:
- Breadcrumb nav has `aria-label="Breadcrumb"`, ordered labels, and expected route links.
- JSON-LD script includes a `BreadcrumbList` whose `itemListElement` order and absolute URLs match the route.
- 404 output includes the branded not-found message and recovery links to `/` and `/productos`.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit/contract | SEO helper output already covered | Keep existing metadata, sitemap, robots, manifest, and helper assertions. |
| Rendered integration | Breadcrumb nav + JSON-LD for representative simple and nested routes | `renderToStaticMarkup(<Route />)`, parse rendered script JSON, assert visible HTML contract. |
| Rendered integration | `app/not-found.tsx` recovery behavior | Render `<NotFound />` and assert text plus anchor hrefs. |
| E2E | Full Next server 404/noindex | Out of scope for this blocker remediation. |

## Migration / Rollout

No migration required. The rollout is limited to test coverage and commit hygiene. Run `node --import tsx --test tests/seo.test.ts`; optional broader verification remains `npm run build`, `npm run lint`, and `npx tsc --noEmit` with known pre-existing lint debt handled outside this change.

## Open Questions

None.
