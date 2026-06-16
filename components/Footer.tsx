export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">ID</span>
          </div>
          <span className="text-white text-sm font-medium">ID-Night</span>
        </div>
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} ID-Night. Control de acceso para la noche.
        </p>
        <div className="flex items-center gap-5 text-xs text-slate-600">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacidad</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Términos</a>
          <a href="#contacto" className="hover:text-slate-400 transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
