export default function PerfilPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
        
        {/* Avatar fake */}
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 text-xl font-bold text-black">
          U
        </div>

        <h1 className="text-2xl font-semibold text-white">
          Tu perfil
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Este será tu espacio personal dentro de TWE Macro Academy.
        </p>

        {/* Info cards */}
        <div className="mt-6 grid gap-3">
          <div className="rounded-lg border border-white/10 bg-black/30 p-4 text-left">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Próximamente
            </p>
            <p className="mt-1 text-sm text-gray-300">
              Información personal y datos de la cuenta
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/30 p-4 text-left">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Más adelante
            </p>
            <p className="mt-1 text-sm text-gray-300">
              Progreso, acceso a contenido y configuración
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-xs text-gray-500">
          Estamos construyendo esta sección para darte una mejor experiencia.
        </p>
      </div>
    </div>
  );
}
