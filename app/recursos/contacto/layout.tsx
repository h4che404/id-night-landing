import type { Metadata } from "next";
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  toJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contacto — ID-Night",
  description:
    "Conocé el estado de lanzamiento de ID-Night y escribinos por consultas generales sobre la idea y la marca.",
  path: "/recursos/contacto",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Inicio", url: "/" },
  { name: "Recursos", url: "/recursos" },
  { name: "Contacto", url: "/recursos/contacto" },
]);

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
