import type { Metadata } from "next";
import Hero from "@/components/Hero";
import {
  buildHomePageJsonLd,
  createPageMetadata,
  ROOT_DESCRIPTION,
  ROOT_TITLE,
  toJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: ROOT_TITLE,
  description: ROOT_DESCRIPTION,
  path: "/",
});

const homePageJsonLd = buildHomePageJsonLd();

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(homePageJsonLd) }}
      />
      <Hero />
    </>
  );
}
