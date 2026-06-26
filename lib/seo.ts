import type { Metadata } from "next";

export const SITE_URL = "https://idnight.app";
export const SITE_HOST = "idnight.app";
export const SITE_NAME = "ID-Night";
export const ROOT_TITLE = "ID-Night | Software de control de acceso para boliches y eventos";
export const ROOT_DESCRIPTION =
  "Software de control de acceso y gestión de incidentes para boliches y eventos. ID-Night registra identidad validada, accesos e incidentes para que el personal autorizado decida con más contexto.";
export const SOCIAL_IMAGE_ALT =
  "ID-Night, software de control de acceso y gestión de incidentes para boliches y eventos";
export const DEFAULT_OG_IMAGE = "/opengraph-image";
export const DEFAULT_TWITTER_IMAGE = "/twitter-image";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export type JsonLd = Record<string, unknown>;

export type FaqItem = {
  q: string;
  a: string;
};

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "es_AR",
      url: "/",
      title: ROOT_TITLE,
      description: ROOT_DESCRIPTION,
      images: [{ url: DEFAULT_OG_IMAGE, alt: SOCIAL_IMAGE_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: ROOT_TITLE,
      description: ROOT_DESCRIPTION,
      images: [DEFAULT_TWITTER_IMAGE],
    },
  };
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_AR",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [{ url: DEFAULT_OG_IMAGE, alt: SOCIAL_IMAGE_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_TWITTER_IMAGE],
    },
  };
}

export function buildHomePageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS, Android, Web",
    description: ROOT_DESCRIPTION,
    audience: [
      { "@type": "Audience", audienceType: "Boliches y bares" },
      { "@type": "Audience", audienceType: "Eventos y productoras" },
    ],
    featureList: [
      "Credencial digital verificada para boliches, bares y eventos",
      "Validación de ingresos desde celulares autorizados",
      "Historial de accesos con trazabilidad",
      "Registro de incidentes para el establecimiento",
    ],
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function toJsonLd(value: JsonLd) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
