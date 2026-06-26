import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import type { Metadata } from "next";
import { metadata as comoFuncionaMetadata } from "@/app/como-funciona/page";
import { metadata as herramientasMetadata } from "@/app/herramientas/page";
import { metadata as legalMetadata } from "@/app/legal/page";
import { metadata as privacidadMetadata } from "@/app/legal/privacidad/page";
import { metadata as terminosMetadata } from "@/app/legal/terminos/page";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as preciosMetadata } from "@/app/precios/page";
import { metadata as problemaMetadata } from "@/app/problema/page";
import { metadata as aprenderMetadata } from "@/app/recursos/aprender/page";
import { metadata as contactoMetadata } from "@/app/recursos/contacto/layout";
import { metadata as empresaMetadata } from "@/app/recursos/empresa/page";
import { metadata as recursosMetadata } from "@/app/recursos/page";
import robots from "@/app/robots";
import { metadata as seguridadMetadata } from "@/app/seguridad/page";
import { metadata as solucionesMetadata } from "@/app/soluciones/page";
import sitemap from "@/app/sitemap";
import { metadata as productosMetadata } from "@/app/productos/page";
import { metadata as soporteMetadata } from "@/app/recursos/soporte/page";
import {
  SITE_NAME,
  buildFaqJsonLd,
  buildHomePageJsonLd,
  createRootMetadata,
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
const EXPECTED_ROOT_TITLE = "ID-Night | Software de control de acceso para boliches y eventos";
const EXPECTED_ROOT_DESCRIPTION =
  "Software de control de acceso y gestión de incidentes para boliches y eventos. ID-Night registra identidad validada, accesos e incidentes para que el personal autorizado decida con más contexto.";
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
      "Guía de inicio rápido y preguntas frecuentes para venues que empiezan a usar ID-Night.",
    metadata: aprenderMetadata,
  },
  {
    path: "/recursos/soporte",
    title: "Soporte — ID-Night",
    description:
      "Soporte técnico, preguntas frecuentes y opciones de contacto para usuarios de ID-Night.",
    metadata: soporteMetadata,
  },
  {
    path: "/precios",
    title: "Precios de ID-Night | Pilotos para boliches y eventos",
    description:
      "Conocé cómo iniciar un piloto de ID-Night para validar identidad, controlar accesos y registrar incidentes en boliches y eventos.",
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
      "Conocé el equipo detrás de ID-Night, nuestra visión, los valores que nos guían y la hoja de ruta del producto.",
    metadata: empresaMetadata,
  },
  {
    path: "/recursos/contacto",
    title: "Contacto — ID-Night",
    description:
      "Hablá con el equipo de ID-Night. Solicitá una demo o consultá cómo implementar control de acceso y trazabilidad en tu boliche o evento.",
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

test("main metadata stays aligned with the SEO contract", () => {
  const metadata = createRootMetadata();
  const openGraph = metadata.openGraph as Record<string, unknown>;
  const twitter = metadata.twitter as Record<string, unknown>;

  assert.equal(metadata.title, EXPECTED_ROOT_TITLE);
  assert.equal(metadata.description, EXPECTED_ROOT_DESCRIPTION);
  assert.equal(metadata.metadataBase?.toString(), `${EXPECTED_SITE_URL}/`);
  assert.equal(metadata.alternates?.canonical, "/");
  assert.equal(openGraph.type, "website");
  assert.equal(openGraph.url, "/");
  assert.equal(openGraph.title, EXPECTED_ROOT_TITLE);
  assert.equal(openGraph.description, EXPECTED_ROOT_DESCRIPTION);
  assert.equal(twitter.card, "summary_large_image");
  assert.equal(twitter.title, EXPECTED_ROOT_TITLE);
  assert.equal(twitter.description, EXPECTED_ROOT_DESCRIPTION);
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
      alt: "ID-Night, software de control de acceso y gestión de incidentes para boliches y eventos",
    },
  ]);
  assert.equal(twitter.card, "summary_large_image");
  assert.equal(twitter.title, expected.title);
  assert.equal(twitter.description, expected.description);
  assert.deepEqual(twitter.images, ["/twitter-image"]);
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
  assert.equal(homeJsonLd["@type"], "SoftwareApplication");
  assert.equal(homeJsonLd.name, SITE_NAME);
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
