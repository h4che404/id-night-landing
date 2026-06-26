import type { Metadata } from "next";
import ComoFunciona from "@/components/ComoFunciona";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cómo funciona ID-Night | Control de ingreso paso a paso",
  description:
    "El usuario valida su identidad una vez, ID-Night confirma identidad y mayoría de edad, y el personal autorizado controla el ingreso desde cualquier celular.",
  path: "/como-funciona",
});

export default function ComoFuncionaPage() {
  return <ComoFunciona />;
}
