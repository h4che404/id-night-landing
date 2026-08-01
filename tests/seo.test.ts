import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import NotFoundPage from "@/app/not-found";
import { metadata as comoFuncionaMetadata } from "@/app/como-funciona/page";
import { metadata as herramientasMetadata } from "@/app/herramientas/page";
import { metadata as legalMetadata } from "@/app/legal/page";
import { metadata as privacidadMetadata } from "@/app/legal/privacidad/page";
import { metadata as terminosMetadata } from "@/app/legal/terminos/page";
import HomePageRoute, { metadata as homeMetadata } from "@/app/page";
import PreciosPage, { metadata as preciosMetadata } from "@/app/precios/page";
import { metadata as problemaMetadata } from "@/app/problema/page";
import AprenderPage, { metadata as aprenderMetadata } from "@/app/recursos/aprender/page";
import { metadata as contactoMetadata } from "@/app/recursos/contacto/layout";
import { metadata as empresaMetadata } from "@/app/recursos/empresa/page";
import { metadata as recursosMetadata } from "@/app/recursos/page";
import manifest from "@/app/manifest";
import ProductosPage, { metadata as productosMetadata } from "@/app/productos/page";
import robots from "@/app/robots";
import { metadata as seguridadMetadata } from "@/app/seguridad/page";
import SolucionesPage, { metadata as solucionesMetadata } from "@/app/soluciones/page";
import Footer from "@/components/Footer";
import sitemap from "@/app/sitemap";
import { metadata as soporteMetadata } from "@/app/recursos/soporte/page";
import { buildHomepageContact, HOMEPAGE_WHATSAPP_CONFIG } from "@/components/home/contact";
import { homepageContent, homepageWhatsappMessages } from "@/components/home/homepage-content";
import {
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildHomePageJsonLd,
  buildOrganizationJsonLd,
  createRootMetadata,
  createRootViewport,
  toJsonLd,
} from "@/lib/seo";

const FORBIDDEN_TERMS = [
  "lista negra",
  "listas negras",
  "blacklist",
  "elimina el fraude",
  "seguridad total",
  "bloqueo automático",
  "reemplaza al personal de seguridad",
];

const EXPECTED_SITE_URL = "https://idnight.app";
const EXPECTED_BRAND_COLOR = "#7C3AED";
const EXPECTED_BACKGROUND_COLOR = "#08080F";
const EXPECTED_ROOT_TITLE = "ID-NIGHT | Construyendo una noche más segura";
const EXPECTED_ROOT_DESCRIPTION =
  "ID-NIGHT es una iniciativa tecnológica nacida en Mendoza que trabaja junto con quienes salen, organizan, trabajan y cuidan para construir una nocturnidad más segura, responsable y respetuosa de la privacidad.";
const EXPECTED_SOCIAL_IMAGE_ALT =
  "ID-NIGHT, iniciativa tecnológica en desarrollo para construir una noche más segura desde Mendoza";
const EXPECTED_HOME_SCHEMA_ABOUT = [
  "Mendoza, Argentina",
  "Iniciativa tecnológica en desarrollo",
  "Identidad, accesos, decisiones e incidentes con privacidad y criterio humano",
];
const HOME_SEO_FORBIDDEN_TERMS = [
  "clientes",
  "customer",
  "deploy",
  "despliegue",
  "resultados comprobados",
  "detección de personas peligrosas",
  "reemplaza al personal",
];
const EXPECTED_SITEMAP_ROUTES = [
  "/",
  "/productos",
  "/soluciones",
  "/precios",
  "/problema",
  "/como-funciona",
  "/herramientas",
  "/seguridad",
  "/recursos",
  "/recursos/aprender",
  "/recursos/empresa",
  "/recursos/soporte",
  "/recursos/contacto",
  "/legal",
  "/legal/terminos",
  "/legal/privacidad",
];
const EXPECTED_PRIVATE_ROBOTS_PATHS = ["/admin", "/api"];
const EXPECTED_ROUTE_METADATA = [
  {
    path: "/",
    title: EXPECTED_ROOT_TITLE,
    description: EXPECTED_ROOT_DESCRIPTION,
    metadata: homeMetadata,
  },
  {
    path: "/productos",
    title: "Productos de ID-Night | Acceso, identidad y trazabilidad",
    description:
      "App de puerta, panel del establecimiento, credencial de identidad validada y registro de incidentes. El ecosistema de control de acceso de ID-Night.",
    metadata: productosMetadata,
  },
  {
    path: "/soluciones",
    title: "Soluciones de ID-Night para boliches, eventos y cadenas",
    description:
      "Control de acceso, validación de identidad y trazabilidad de incidentes para boliches, eventos masivos y cadenas de establecimientos nocturnos.",
    metadata: solucionesMetadata,
  },
  {
    path: "/seguridad",
    title: "Seguridad, privacidad y revisión humana | ID-Night",
    description:
      "Minimización de datos, acceso por rol, revisión por personal autorizado ante dudas y trazabilidad de acciones. Así protege ID-Night la identidad y el ingreso.",
    metadata: seguridadMetadata,
  },
  {
    path: "/recursos/aprender",
    title: "Aprender — ID-Night",
    description:
      "Conocé el flujo previsto de ID-Night y las preguntas frecuentes para venues antes del lanzamiento.",
    metadata: aprenderMetadata,
  },
  {
    path: "/recursos/soporte",
    title: "Soporte — ID-Night",
    description:
      "El soporte técnico de ID-Night estará disponible cuando se habilite el servicio. Consultá mientras tanto la información pública del producto.",
    metadata: soporteMetadata,
  },
  {
    path: "/precios",
    title: "Planes de ID-Night | Próximamente",
    description:
      "Conocé los planes previstos de ID-Night. Los precios, demos y contrataciones estarán disponibles cuando se habilite el servicio.",
    metadata: preciosMetadata,
  },
  {
    path: "/problema",
    title: "Seguridad en boliches: ingresos, conflictos y trazabilidad",
    description:
      "Muchos boliches y eventos todavía dependen de controles manuales, registros informales y decisiones rápidas en puerta. ID-Night ordena ese proceso con identidad, acceso y trazabilidad.",
    metadata: problemaMetadata,
  },
  {
    path: "/como-funciona",
    title: "Cómo funciona ID-Night | Control de ingreso paso a paso",
    description:
      "El usuario valida su identidad una vez, ID-Night confirma identidad y mayoría de edad, y el personal autorizado controla el ingreso desde cualquier celular.",
    metadata: comoFuncionaMetadata,
  },
  {
    path: "/herramientas",
    title: "Herramientas de ID-Night para el control de ingreso",
    description:
      "Validación de ingresos, panel de administración, revisión por personal autorizado, historial de accesos y registro de incidentes para operar con orden.",
    metadata: herramientasMetadata,
  },
  {
    path: "/recursos",
    title: "Recursos — ID-Night",
    description: "Aprendé a usar ID-Night, conocé la empresa, accedé al soporte técnico o contactá al equipo.",
    metadata: recursosMetadata,
  },
  {
    path: "/recursos/empresa",
    title: "Empresa — ID-Night",
    description:
      "Conocé la historia detrás de ID-Night, la visión del producto, los valores que lo guían y la hoja de ruta. Un proyecto construido por un fundador único.",
    metadata: empresaMetadata,
  },
  {
    path: "/recursos/contacto",
    title: "Contacto — ID-Night",
    description:
      "Conocé el estado de lanzamiento de ID-Night y escribinos por consultas generales sobre la idea y la marca.",
    metadata: contactoMetadata,
  },
  {
    path: "/legal",
    title: "Legal — ID-Night",
    description: "Documentación legal de ID-Night: términos y condiciones y política de privacidad.",
    metadata: legalMetadata,
  },
  {
    path: "/legal/terminos",
    title: "Términos y condiciones — ID-Night",
    description: "Términos y condiciones de uso del servicio ID-Night. Aplicable a usuarios finales y operadores de venues.",
    metadata: terminosMetadata,
  },
  {
    path: "/legal/privacidad",
    title: "Política de privacidad — ID-Night",
    description:
      "Política de privacidad de ID-Night. Cómo recopilamos, usamos y protegemos tus datos personales y biométricos.",
    metadata: privacidadMetadata,
  },
] as const;

const COPY_DIRECTORIES = ["app", "components", "lib"];
const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");

type RouteModule = () => ReactNode | Promise<ReactNode>;
type JsonLdObject = { [key: string]: unknown; "@type"?: string };
type AnchorContract = { href: string; text: string };

function readProjectFile(...segments: string[]) {
  return fs.readFileSync(path.join(PROJECT_ROOT, ...segments), "utf8");
}

function collectSourceFiles(directory: string): string[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectSourceFiles(entryPath);
    }

    return /\.(ts|tsx)$/.test(entry.name) ? [entryPath] : [];
  });
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function stripTags(value: string) {
  return normalizeWhitespace(value.replace(/<[^>]+>/g, " "));
}

async function renderRoute(module: RouteModule) {
  const renderedNode = await module();

  return renderToStaticMarkup(renderedNode);
}

function extractBreadcrumbNavHtml(html: string) {
  const match = html.match(/<nav[^>]*aria-label="Breadcrumb"[^>]*>([\s\S]*?)<\/nav>/i);

  assert(match, "Expected rendered breadcrumb navigation");

  return match[1];
}

function extractAnchors(html: string): AnchorContract[] {
  return Array.from(html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi), ([, attributes, innerHtml]) => {
    const hrefMatch = attributes.match(/href="([^"]+)"/i) ?? attributes.match(/href='([^']+)'/i);

    assert(hrefMatch, "Expected anchor href in rendered HTML");

    return {
      href: hrefMatch[1],
      text: stripTags(innerHtml),
    };
  });
}

function extractJsonLdObjects(html: string): JsonLdObject[] {
  return Array.from(
    html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
    ([, serializedJsonLd]) => JSON.parse(serializedJsonLd) as JsonLdObject,
  );
}

function extractJsonLdByType<T extends JsonLdObject>(html: string, schemaType: string): T {
  const jsonLd = extractJsonLdObjects(html).find((entry) => entry["@type"] === schemaType);

  assert.notEqual(jsonLd, undefined, `Expected ${schemaType} JSON-LD in rendered HTML`);

  return jsonLd as T;
}

function extractSectionIds(html: string) {
  return Array.from(html.matchAll(/<section[^>]*id="([^"]+)"/gi), ([, id]) => id);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("main metadata stays aligned with the SEO contract", () => {
  const metadata = createRootMetadata();
  const openGraph = metadata.openGraph as Record<string, unknown>;
  const twitter = metadata.twitter as Record<string, unknown>;

  assert.equal(metadata.title, EXPECTED_ROOT_TITLE);
  assert.equal(metadata.description, EXPECTED_ROOT_DESCRIPTION);
  assert.equal(metadata.metadataBase?.toString(), `${EXPECTED_SITE_URL}/`);
  assert.equal(metadata.alternates?.canonical, "/");
  assert.equal("themeColor" in metadata, false);
  assert.equal(openGraph.type, "website");
  assert.equal(openGraph.url, "/");
  assert.equal(openGraph.title, EXPECTED_ROOT_TITLE);
  assert.equal(openGraph.description, EXPECTED_ROOT_DESCRIPTION);
  assert.deepEqual(openGraph.images, [{ url: "/opengraph-image", alt: EXPECTED_SOCIAL_IMAGE_ALT }]);
  assert.equal(twitter.card, "summary_large_image");
  assert.equal(twitter.title, EXPECTED_ROOT_TITLE);
  assert.equal(twitter.description, EXPECTED_ROOT_DESCRIPTION);
  assert.deepEqual(twitter.images, [{ url: "/twitter-image", alt: EXPECTED_SOCIAL_IMAGE_ALT }]);
});

test("sitemap exposes only expected public routes with absolute URLs", () => {
  const entries = sitemap();
  const actualUrls = entries.map((entry) => entry.url);
  const expectedUrls = EXPECTED_SITEMAP_ROUTES.map((routePath) => `${EXPECTED_SITE_URL}${routePath}`);

  assert.deepEqual(actualUrls, expectedUrls);
  assert(actualUrls.includes(`${EXPECTED_SITE_URL}/productos`));
  assert(actualUrls.includes(`${EXPECTED_SITE_URL}/recursos/soporte`));
  assert(actualUrls.includes(`${EXPECTED_SITE_URL}/legal/privacidad`));
  assert(actualUrls.every((url) => url.startsWith(EXPECTED_SITE_URL)));
  assert(actualUrls.every((url) => !url.includes("/admin") && !url.includes("/api")));
});

test("robots allows public crawling, references sitemap, and blocks private paths", () => {
  const metadata = robots();
  const rules = Array.isArray(metadata.rules) ? metadata.rules[0] : metadata.rules;

  assert.equal(rules.userAgent, "*");
  assert.equal(rules.allow, "/");
  assert.deepEqual(rules.disallow, EXPECTED_PRIVATE_ROBOTS_PATHS);
  assert.equal(metadata.sitemap, `${EXPECTED_SITE_URL}/sitemap.xml`);
});

function readMetadataString(value: Metadata["title"] | Metadata["description"]) {
  return typeof value === "string" ? value : null;
}

function assertRouteMetadataContract(expected: {
  path: string;
  title: string;
  description: string;
  metadata: Metadata;
}) {
  const routeMetadata = expected.metadata;
  const openGraph = (routeMetadata.openGraph ?? {}) as Record<string, unknown>;
  const twitter = (routeMetadata.twitter ?? {}) as Record<string, unknown>;
  const title = readMetadataString(routeMetadata.title);
  const description = readMetadataString(routeMetadata.description);

  assert.equal(routeMetadata.alternates?.canonical, expected.path);
  assert.equal(title, expected.title);
  assert.equal(description, expected.description);
  assert.equal(openGraph.url, expected.path);
  assert.equal(openGraph.type, "website");
  assert.equal(openGraph.siteName, SITE_NAME);
  assert.equal(openGraph.locale, "es_AR");
  assert.equal(openGraph.title, expected.title);
  assert.equal(openGraph.description, expected.description);
  assert.deepEqual(openGraph.images, [
    {
      url: "/opengraph-image",
      alt: EXPECTED_SOCIAL_IMAGE_ALT,
    },
  ]);
  assert.equal(twitter.card, "summary_large_image");
  assert.equal(twitter.title, expected.title);
  assert.equal(twitter.description, expected.description);
  assert.deepEqual(twitter.images, [{ url: "/twitter-image", alt: EXPECTED_SOCIAL_IMAGE_ALT }]);
}

test("changed marketing routes keep explicit metadata contracts", () => {
  for (const expectedRoute of EXPECTED_ROUTE_METADATA) {
    assertRouteMetadataContract(expectedRoute);
  }
});

test("JSON-LD helpers produce valid schema without forbidden claims", () => {
  const homeJsonLd = JSON.parse(toJsonLd(buildHomePageJsonLd())) as Record<string, unknown>;
  const faqJsonLd = JSON.parse(
    toJsonLd(
      buildFaqJsonLd([
        {
          q: "¿Cómo funciona ID-Night?",
          a: "Registra accesos e incidentes para que el personal autorizado decida con más contexto.",
        },
      ]),
    ),
  ) as Record<string, unknown>;
  const combinedJsonLd = JSON.stringify({ homeJsonLd, faqJsonLd }).toLowerCase();

  assert.equal(homeJsonLd["@context"], "https://schema.org");
  assert.equal(homeJsonLd["@type"], "WebPage");
  assert.equal(homeJsonLd.name, EXPECTED_ROOT_TITLE);
  assert.equal(homeJsonLd.url, EXPECTED_SITE_URL);
  assert.equal(faqJsonLd["@context"], "https://schema.org");
  assert.equal(faqJsonLd["@type"], "FAQPage");

  for (const forbiddenTerm of FORBIDDEN_TERMS) {
    assert.equal(
      combinedJsonLd.includes(forbiddenTerm),
      false,
      `Forbidden SEO claim found in JSON-LD: ${forbiddenTerm}`,
    );
  }
});

test("organization JSON-LD and viewport stay aligned with the hardening contract", () => {
  const organizationJsonLd = JSON.parse(
    toJsonLd(buildOrganizationJsonLd()),
  ) as Record<string, unknown>;
  const viewport = createRootViewport();
  const layoutSource = readProjectFile("app", "layout.tsx");

  assert.deepEqual(Object.keys(organizationJsonLd).sort(), ["@context", "@type", "name", "url"]);
  assert.equal(organizationJsonLd["@context"], "https://schema.org");
  assert.equal(organizationJsonLd["@type"], "Organization");
  assert.equal(organizationJsonLd.name, SITE_NAME);
  assert.equal(organizationJsonLd.url, EXPECTED_SITE_URL);

  for (const forbiddenField of [
    "logo",
    "sameAs",
    "address",
    "telephone",
    "email",
    "foundingDate",
    "description",
    "aggregateRating",
    "review",
  ]) {
    assert.equal(forbiddenField in organizationJsonLd, false, `Unexpected Organization field: ${forbiddenField}`);
  }

  assert.equal(viewport.themeColor, EXPECTED_BRAND_COLOR);
  assert.match(layoutSource, /export const viewport = createRootViewport\(\);/);
  assert.match(layoutSource, /buildOrganizationJsonLd\(\)/);
});

test("breadcrumb JSON-LD helper stays ordered with absolute URLs", () => {
  const breadcrumbJsonLd = JSON.parse(
    toJsonLd(
      buildBreadcrumbJsonLd([
        { name: "Inicio", url: "/" },
        { name: "Recursos", url: "/recursos" },
        { name: "Aprender", url: "/recursos/aprender" },
      ]),
    ),
  ) as {
    [key: string]: unknown;
    itemListElement: Array<Record<string, unknown>>;
  };

  assert.equal(breadcrumbJsonLd["@context"], "https://schema.org");
  assert.equal(breadcrumbJsonLd["@type"], "BreadcrumbList");
  assert.deepEqual(breadcrumbJsonLd.itemListElement, [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: `${EXPECTED_SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Recursos",
      item: `${EXPECTED_SITE_URL}/recursos`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Aprender",
      item: `${EXPECTED_SITE_URL}/recursos/aprender`,
    },
  ]);
});

test("productos page renders breadcrumb nav and BreadcrumbList JSON-LD", async () => {
  const html = await renderRoute(ProductosPage);
  const breadcrumbNavHtml = extractBreadcrumbNavHtml(html);
  const breadcrumbJsonLd = extractJsonLdByType<{
    [key: string]: unknown;
    itemListElement: Array<Record<string, unknown>>;
  }>(html, "BreadcrumbList");

  assert.equal(stripTags(breadcrumbNavHtml), "Inicio › Productos");
  assert.deepEqual(extractAnchors(breadcrumbNavHtml), [{ href: "/", text: "Inicio" }]);
  assert.deepEqual(breadcrumbJsonLd.itemListElement, [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: `${EXPECTED_SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Productos",
      item: `${EXPECTED_SITE_URL}/productos`,
    },
  ]);
});

test("aprender page renders nested breadcrumb nav and BreadcrumbList JSON-LD", async () => {
  const html = await renderRoute(AprenderPage);
  const breadcrumbNavHtml = extractBreadcrumbNavHtml(html);
  const breadcrumbJsonLd = extractJsonLdByType<{
    [key: string]: unknown;
    itemListElement: Array<Record<string, unknown>>;
  }>(html, "BreadcrumbList");

  assert.equal(stripTags(breadcrumbNavHtml), "Inicio › Recursos › Aprender");
  assert.deepEqual(extractAnchors(breadcrumbNavHtml), [
    { href: "/", text: "Inicio" },
    { href: "/recursos", text: "Recursos" },
  ]);
  assert.deepEqual(breadcrumbJsonLd.itemListElement, [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: `${EXPECTED_SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Recursos",
      item: `${EXPECTED_SITE_URL}/recursos`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Aprender",
      item: `${EXPECTED_SITE_URL}/recursos/aprender`,
    },
  ]);
});

test("not-found page renders branded recovery copy and navigation", async () => {
  const html = await renderRoute(NotFoundPage);
  const renderedText = stripTags(html);

  assert.match(renderedText, /404 · Página no encontrada/);
  assert.match(renderedText, /Esta ruta no existe en ID-Night/);
  assert.match(
    renderedText,
    /Volvé al inicio para seguir explorando el software de control de acceso, recursos y documentación disponible\./,
  );
  assert.deepEqual(extractAnchors(html), [
    { href: "/", text: "Volver al inicio" },
    { href: "/productos", text: "Ver productos" },
  ]);
});

test("manifest contract exposes the required PWA fields with real brand icons", () => {
  const manifestValue = manifest();

  assert.equal(manifestValue.name, SITE_NAME);
  assert.equal(manifestValue.short_name, SITE_NAME);
  assert.equal(manifestValue.start_url, "/");
  assert.equal(manifestValue.display, "standalone");
  assert.equal(manifestValue.background_color, EXPECTED_BACKGROUND_COLOR);
  assert.equal(manifestValue.theme_color, EXPECTED_BRAND_COLOR);
  assert.deepEqual(manifestValue.icons, [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ]);

  for (const icon of manifestValue.icons ?? []) {
    const iconPath = path.join(PROJECT_ROOT, "public", path.basename(icon.src as string));
    assert.equal(fs.existsSync(iconPath), true, `Missing served asset for manifest icon: ${icon.src}`);
  }
});

test("copy guardrail forbids unsupported claims across app copy", () => {
  const sourceFiles = COPY_DIRECTORIES.flatMap((directory) =>
    collectSourceFiles(path.join(PROJECT_ROOT, directory)),
  );

  for (const sourceFile of sourceFiles) {
    const content = fs.readFileSync(sourceFile, "utf8").toLowerCase();

    for (const forbiddenTerm of FORBIDDEN_TERMS) {
      assert.equal(
        content.includes(forbiddenTerm),
        false,
        `Forbidden copy term found in ${path.relative(PROJECT_ROOT, sourceFile)}: ${forbiddenTerm}`,
      );
    }
  }
});

test("pre-launch commercial routes show unavailable status without service destinations", async () => {
  for (const route of [ProductosPage, SolucionesPage, PreciosPage, AprenderPage]) {
    const html = await renderRoute(route);

    assert.match(stripTags(html), /PRÓXIMAMENTE/);
    assert.equal(
      extractAnchors(html).some(({ href }) => href.includes("admin.idnight.app")),
      false,
    );
  }
});

test("homepage primary navigation does not include a dead PRÓXIMAMENTE control", () => {
  const navbarSource = readProjectFile("components", "Navbar.tsx");

  assert.doesNotMatch(navbarSource, /PRÓXIMAMENTE/, "Desktop primary navigation must not expose a dead PRÓXIMAMENTE control");
  assert.doesNotMatch(navbarSource, /aria-disabled="true"/, "Desktop primary navigation must not render disabled CTA chrome");
});

test("desktop navigation exposes one accessible Explore mega-menu with verified destinations", () => {
  const navbarSource = readProjectFile("components", "Navbar.tsx");

  for (const category of ["Idea y propósito", "Ecosistema", "Soluciones y recursos", "Legal"]) {
    assert.match(navbarSource, new RegExp(escapeRegExp(category)));
  }
  for (const href of [
    "/#vision", "/#problema", "/#principios", "/#actores", "/#etapa", "/#tecnologia", "/#fundador",
    "/productos", "/productos#app-usuario", "/productos#app-puerta", "/productos#panel-admin", "/productos#biometrico", "/productos#credencial", "/productos#api",
    "/soluciones", "/soluciones#boliches", "/soluciones#eventos", "/soluciones#cadenas", "/soluciones#usuarios", "/soluciones#organizadores",
    "/precios", "/recursos", "/recursos/aprender", "/recursos/empresa", "/recursos/fundador", "/recursos/soporte", "/recursos/contacto",
    "/legal/privacidad", "/legal/terminos",
  ]) {
    assert.match(navbarSource, new RegExp(`href: ["']${escapeRegExp(href)}["']`), `Missing verified navigation destination: ${href}`);
  }

  assert.match(navbarSource, />\s*Explorar\s*</);
  assert.match(navbarSource, /aria-expanded=\{desktopOpen\}/);
  assert.match(navbarSource, /aria-controls=\{DESKTOP_MENU_ID\}/);
  assert.match(navbarSource, /event\.key !== "ArrowDown"/);
  assert.match(navbarSource, /document\.addEventListener\("pointerdown"/);
  assert.match(navbarSource, /if \(!event\.currentTarget\.contains\(event\.relatedTarget\)\) closeDesktopMenu\(\)/);
  assert.equal((navbarSource.match(/>\s*Explorar\s*</g) ?? []).length, 1, "Desktop navigation must keep one Explore trigger");
});

test("pre-launch CTA surfaces cannot navigate to the unavailable service", () => {
  const surfaceFiles = [
    ["components", "Hero.tsx"],
    ["components", "Problema.tsx"],
    ["components", "ComoFunciona.tsx"],
    ["components", "Herramientas.tsx"],
    ["components", "Precios.tsx"],
    ["components", "CTAFinal.tsx"],
    ["app", "productos", "page.tsx"],
    ["app", "soluciones", "page.tsx"],
    ["app", "recursos", "aprender", "page.tsx"],
    ["app", "recursos", "contacto", "page.tsx"],
    ["app", "recursos", "soporte", "page.tsx"],
  ];

  for (const segments of surfaceFiles) {
    const source = readProjectFile(...segments);
    const relativePath = segments.join("/");

    assert.match(source, /PRÓXIMAMENTE/, `Missing pre-launch status in ${relativePath}`);
    assert.doesNotMatch(source, /https:\/\/admin\.idnight\.app/, `Service destination found in ${relativePath}`);
    assert.doesNotMatch(source, /href=["']#["']/, `Fake link found in ${relativePath}`);
  }
});

test("homepage content is centralized with the approved section order and exact CTA copy", () => {
  assert.deepEqual(homepageContent.sectionOrder, [
    "vision",
    "problema",
    "principios",
    "actores",
    "etapa",
    "tecnologia",
    "participar",
    "fundador",
    "cta-final",
  ]);
  assert.deepEqual(homepageContent.hero, {
    id: "vision",
    eyebrow: "Tecnología en desarrollo, nacida en Mendoza.",
    title: "Construimos tecnología para una noche más segura y humana.",
    description:
      "ID-NIGHT ayuda a ordenar accesos, decisiones e incidentes sin perder de vista la privacidad ni el criterio humano.",
    primaryCta: { label: "Conocé la iniciativa", href: "#problema" },
    secondaryCta: { label: "Contanos tu experiencia", profile: "general" },
    status: "Actualmente estamos conversando con productores, espacios, trabajadores y referentes del sector.",
  });
  assert.equal(homepageContent.participation.id, "participar");
  assert.deepEqual(
    homepageContent.participation.cards.map((card) => ({
      profile: card.profile,
      title: card.title,
      description: card.description,
      ctaLabel: card.ctaLabel,
    })),
    [
      {
        profile: "events",
        title: "Trabajo u organizo eventos",
        description:
          "Compartí tu experiencia sobre accesos, listas, seguridad, excepciones e incidentes.",
        ctaLabel: "Quiero participar",
      },
      {
        profile: "venue",
        title: "Administro un espacio",
        description:
          "Conversemos sobre los desafíos de tu operación y la posibilidad de futuros pilotos.",
        ctaLabel: "Hablar con ID-NIGHT",
      },
      {
        profile: "institution",
        title: "Represento una institución",
        description:
          "Exploremos iniciativas, estándares y formas de colaboración para mejorar la nocturnidad.",
        ctaLabel: "Contacto institucional",
      },
    ],
  );
  assert.deepEqual(homepageContent.finalCta, {
    id: "cta-final",
    title: "La noche que queremos no se construye desde una sola mirada.",
    description:
      "Estamos empezando desde Mendoza y queremos sumar experiencias, preguntas y personas dispuestas a transformar la manera en que pensamos la noche.",
    primaryCta: { label: "Contanos tu experiencia", profile: "general" },
    secondaryCta: { label: "Conocé ID-NIGHT", href: "/productos" },
    closing: "Cuidarnos también es parte de salir.",
  });
});

test("homepage WhatsApp contacts are generated from the verified central config with distinct messages", () => {
  assert.deepEqual(HOMEPAGE_WHATSAPP_CONFIG, {
    e164: "+5492634616717",
    waMeDigits: "5492634616717",
    source: "sdd/homepage-brand-repositioning/contact-config",
  });

  const contacts = [
    buildHomepageContact("events"),
    buildHomepageContact("venue"),
    buildHomepageContact("institution"),
    buildHomepageContact("general"),
  ];

  assert.deepEqual(
    contacts.map((contact) => contact.profile),
    ["events", "venue", "institution", "general"],
  );
  assert(contacts.every((contact) => contact.enabled));
  assert(contacts.every((contact) => contact.href.startsWith("https://wa.me/5492634616717?text=")));

  const messages = contacts.map((contact) => {
    const url = new URL(contact.href);
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/5492634616717");
    return url.searchParams.get("text");
  });

  assert(messages.every((message) => message !== null));
  assert.equal(new Set(messages).size, 4);
  assert.equal(
    messages[0],
    "Hola, quiero participar desde la organización de eventos y compartir mi experiencia sobre accesos, listas, seguridad, excepciones e incidentes.",
  );
  assert.equal(
    messages[1],
    "Hola, administro un espacio y quiero conversar sobre los desafíos de mi operación y la posibilidad de futuros pilotos con ID-NIGHT.",
  );
  assert.equal(
    messages[2],
    "Hola, represento una institución y quiero explorar iniciativas, estándares y formas de colaboración para mejorar la nocturnidad con ID-NIGHT.",
  );
  assert.equal(
    messages[3],
    "Hola, quiero contar mi experiencia y conocer más sobre ID-NIGHT.",
  );
});

test("homepage route renders the approved narrative order, copy anchors, and JSON-LD shell", async () => {
  const html = await renderRoute(HomePageRoute);
  const renderedText = stripTags(html);
  const anchors = extractAnchors(html);
  const sectionIds = extractSectionIds(html);
  const routeJsonLd = extractJsonLdByType<{ [key: string]: unknown }>(html, "WebPage");
  const requiredCopy = [homepageContent.hero.eyebrow, homepageContent.hero.title, homepageContent.hero.description, homepageContent.problem.label, homepageContent.problem.title, homepageContent.beliefs.label, homepageContent.beliefs.title, homepageContent.actors.label, homepageContent.actors.title, homepageContent.currentStage.label, homepageContent.currentStage.title, homepageContent.technology.label, homepageContent.technology.title, homepageContent.participation.label, homepageContent.participation.title, homepageContent.founder.label, homepageContent.founder.title, homepageContent.finalCta.title, homepageContent.finalCta.description];

  assert.deepEqual(sectionIds, homepageContent.sectionOrder);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);

  for (const copy of requiredCopy) assert.match(renderedText, new RegExp(escapeRegExp(copy)));
  for (const fragment of ['id="vision"', 'id="tecnologia"', 'id="participar"']) assert.match(html, new RegExp(fragment));
  for (const href of ["/productos", "/legal/privacidad", "#problema"]) assert(anchors.some((anchor) => anchor.href === href));

  const whatsappAnchors = anchors.filter((anchor) =>
    anchor.href.startsWith(`https://wa.me/${HOMEPAGE_WHATSAPP_CONFIG.waMeDigits}?text=`),
  );

  assert.equal(whatsappAnchors.length, 5);

  const decodedMessages = whatsappAnchors.map((anchor) => new URL(anchor.href).searchParams.get("text"));

  for (const expectedMessage of Object.values(homepageWhatsappMessages)) {
    assert(decodedMessages.includes(expectedMessage));
  }

  assert.equal(routeJsonLd.name, EXPECTED_ROOT_TITLE);
  assert.equal(routeJsonLd.url, EXPECTED_SITE_URL);
  assert.equal(routeJsonLd["@context"], "https://schema.org");
  assert.equal(routeJsonLd.description, EXPECTED_ROOT_DESCRIPTION);
  assert.equal(routeJsonLd.inLanguage, "es-AR");
  assert.equal(routeJsonLd.abstract, homepageContent.hero.status);
  assert.deepEqual(routeJsonLd.isPartOf, {
    "@type": "WebSite",
    name: SITE_NAME,
    url: EXPECTED_SITE_URL,
  });
  assert.deepEqual(
    (routeJsonLd.about as Array<{ name: string }>).map((entry) => entry.name),
    EXPECTED_HOME_SCHEMA_ABOUT,
  );
  assert.equal(
    extractJsonLdObjects(html).some((entry) => entry["@type"] === "FAQPage"),
    false,
  );
  assert.match(html, /<canvas[^>]*aria-hidden="true"/);
  assert.match(html, /alt="Juan Cruz, fundador de ID-NIGHT, en Mendoza"/);
  assert.match(html, /founder\.jpeg/);

  for (const forbiddenTerm of [
    ...FORBIDDEN_TERMS,
    ...HOME_SEO_FORBIDDEN_TERMS,
    "La plataforma que controla quién entra.",
  ]) {
    assert.equal(renderedText.includes(forbiddenTerm), false, `Forbidden homepage copy found: ${forbiddenTerm}`);
    assert.equal(
      JSON.stringify(routeJsonLd).toLowerCase().includes(forbiddenTerm),
      false,
      `Forbidden homepage schema term found: ${forbiddenTerm}`,
    );
  }
});

test("homepage motion isolates client behavior and honors reduced-motion and lifecycle contracts", () => {
  const neuralSource = readProjectFile("components", "home", "NeuralBackground.tsx");
  const revealSource = readProjectFile("components", "home", "Reveal.tsx");
  const navbarSource = readProjectFile("components", "Navbar.tsx");

  assert.match(neuralSource, /useReducedMotion\(\)/);
  assert.match(neuralSource, /new IntersectionObserver/);
  assert.match(neuralSource, /new ResizeObserver/);
  assert.match(neuralSource, /Math\.min\(window\.devicePixelRatio \|\| 1, 1\.5\)/);
  assert.match(neuralSource, /cancelAnimationFrame\(frameId\)/);
  assert.match(neuralSource, /removeEventListener\("pointermove", onPointerMove\)/);
  assert.match(revealSource, /initial=\{reduceMotion \? false/);
  assert.match(revealSource, /viewport=\{\{ once: true/);
  assert.match(navbarSource, /role="dialog"/);
  assert.match(navbarSource, /event\.key === "Escape"/);
  assert.match(navbarSource, /event\.key !== "Tab"/);
  assert.match(navbarSource, /!href\.includes\("#"\)/);
  assert.match(navbarSource, /transition=\{\{ duration: reduceMotion \? 0/);
});

test("footer keeps priority homepage access while preserving secondary routes", () => {
  const html = renderToStaticMarkup(Footer());
  const renderedText = stripTags(html);
  const anchors = extractAnchors(html);

  assert.match(renderedText, /Desde Mendoza, construyendo una nocturnidad más segura, humana y respetuosa de la privacidad\./);
  for (const href of ["/#vision", "/#principios", "/#participar", "/productos", "/legal/privacidad", "/soluciones#boliches", "/recursos/aprender"]) {
    assert(anchors.some((anchor) => anchor.href === href));
  }
});
