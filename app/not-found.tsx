import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen px-6 py-24 flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-3xl border border-white/8 bg-[#0F0F1A] p-10 text-center shadow-2xl shadow-violet-950/20">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
          404 · Página no encontrada
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Esta ruta no existe en <span className="gradient-text">ID-Night</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
          Volvé al inicio para seguir explorando el software de control de acceso,
          recursos y documentación disponible.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-opacity hover:opacity-90"
          >
            Volver al inicio
          </Link>
          <Link
            href="/productos"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-violet-500/30 hover:text-violet-300"
          >
            Ver productos
          </Link>
        </div>
      </div>
    </main>
  );
}
