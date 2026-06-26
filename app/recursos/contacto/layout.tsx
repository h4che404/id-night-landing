import type { Metadata } from "next";
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  toJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contacto — ID-Night",
  description:
    "Hablá con el equipo de ID-Night. Solicitá una demo o consultá cómo implementar control de acceso y trazabilidad en tu boliche o evento.",
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
