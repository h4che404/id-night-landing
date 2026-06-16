"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080F]/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">ID</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">ID-Night</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#problema" className="text-sm text-slate-400 hover:text-white transition-colors">
            El problema
          </a>
          <a href="#como-funciona" className="text-sm text-slate-400 hover:text-white transition-colors">
            Cómo funciona
          </a>
          <a href="#seguridad" className="text-sm text-slate-400 hover:text-white transition-colors">
            Seguridad
          </a>
          <a href="#herramientas" className="text-sm text-slate-400 hover:text-white transition-colors">
            Herramientas
          </a>
        </nav>

        <a
          href="#contacto"
          className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90 transition-opacity"
        >
          Solicitar demo
        </a>
      </div>
    </motion.header>
  );
}
