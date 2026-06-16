import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problema from "@/components/Problema";
import ComoFunciona from "@/components/ComoFunciona";
import Seguridad from "@/components/Seguridad";
import Herramientas from "@/components/Herramientas";
import Precios from "@/components/Precios";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08080F]">
      <Navbar />
      <Hero />
      <Problema />
      <ComoFunciona />
      <Seguridad />
      <Herramientas />
      <Precios />
      <CTAFinal />
      <Footer />
    </main>
  );
}
