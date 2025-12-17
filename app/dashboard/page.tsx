import React from "react";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Tu Biblioteca
        </h1>

        <p className="text-gray-300 text-sm max-w-xl mb-6">
          Accede al libro digital y a los videos explicativos.
          También puedes explorar algunos capítulos iniciales sin costo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* LIBRO COMPLETO */}
          <a
            href="/dashboard/libro-digital"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-semibold text-sm shadow-[0_0_20px_rgba(255,255,0,0.18)] hover:opacity-90 transition text-center"
          >
            📘 Libro Completo
          </a>

          {/* VIDEOS */}
          <a
            href="/dashboard/videos"
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition text-center"
          >
            🎥 Videos
          </a>

          {/* ADELANTO */}
          <a
            href="/dashboard/adelanto"
            className="px-5 py-2.5 rounded-xl border border-yellow-500/30 text-yellow-300 text-sm font-medium hover:bg-yellow-500/10 transition text-center"
          >
            👀 Ver adelanto del libro
          </a>
        </div>

        {/* MICRO COPY DE CONVERSIÓN */}
        <p className="mt-4 text-xs text-gray-400 max-w-xl">
          El adelanto incluye los primeros capítulos y la base conceptual del método.
          El contenido completo está disponible con la compra del libro.
        </p>
      </section>
    </div>
  );
}
