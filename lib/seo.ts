import type { Metadata, Viewport } from "next";
import { homepageContent } from "@/components/home/homepage-content";

export const SITE_URL = "https://idnight.app";
export const SITE_HOST = "idnight.app";
export const SITE_NAME = "ID-Night";
export const ROOT_TITLE = "ID-NIGHT | Construyendo una noche más segura";
export const ROOT_DESCRIPTION =
  "ID-NIGHT es una iniciativa tecnológica nacida en Mendoza que trabaja junto con quienes salen, organizan, trabajan y cuidan para construir una nocturnidad más segura, responsable y respetuosa de la privacidad.";
export const SOCIAL_IMAGE_ALT = "ID-NIGHT, iniciativa tecnológica en desarrollo para construir una noche más segura desde Mendoza";
export const DEFAULT_OG_IMAGE = "/opengraph-image";
export const DEFAULT_TWITTER_IMAGE = "/twitter-image";
const SHARED_OG_IMAGES = [{ url: DEFAULT_OG_IMAGE, alt: SOCIAL_IMAGE_ALT }];
const SHARED_TWITTER_IMAGES = [{ url: DEFAULT_TWITTER_IMAGE, alt: SOCIAL_IMAGE_ALT }];

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export type JsonLd = Record<string, unknown>;

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

function toAbsoluteUrl(url: string) {
  return new URL(url, SITE_URL).toString();
}

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
      images: SHARED_OG_IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      title: ROOT_TITLE,
      description: ROOT_DESCRIPTION,
      images: SHARED_TWITTER_IMAGES,
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
      images: SHARED_OG_IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: SHARED_TWITTER_IMAGES,
    },
  };
}

export function createRootViewport(): Viewport {
  return {
    themeColor: "#7C3AED",
  };
}

export function buildHomePageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: ROOT_TITLE,
    url: SITE_URL,
    description: ROOT_DESCRIPTION,
    inLanguage: "es-AR",
    abstract: homepageContent.hero.status,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: [
      { "@type": "Thing", name: "Mendoza, Argentina" },
      { "@type": "Thing", name: "Iniciativa tecnológica en desarrollo" },
      {
        "@type": "Thing",
        name: "Identidad, accesos, decisiones e incidentes con privacidad y criterio humano",
      },
    ],
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.url),
    })),
  };
}

export function buildOrganizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
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
