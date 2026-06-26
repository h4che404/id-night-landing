import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contacto — ID-Night",
  description:
    "Hablá con el equipo de ID-Night. Solicitá una demo o consultá cómo implementar control de acceso y trazabilidad en tu boliche o evento.",
  path: "/recursos/contacto",
});

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
