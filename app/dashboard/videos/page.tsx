"use client";

import RequireVideoAccess from "@/components/auth/RequireVideoAccess";

const videos = [
  {
    title: "Introducción a TWE Macro Academy",
    description:
      "Cómo está estructurado el programa y cómo sacarle el máximo provecho.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: "Cómo abrir tu cuenta de inversión",
    description:
      "Paso a paso para crear tu cuenta, validar tu identidad y evitar errores.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: "Conceptos básicos antes de operar",
    description:
      "Riesgo, lote, apalancamiento y otras bases que debes dominar.",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export default function VideosPage() {
  return (
    <RequireVideoAccess>
      <div className="min-h-[calc(100vh-80px)] px-6 py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* HEADER */}
          <header>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Biblioteca
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
              Clases en Video
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Accede a las clases que complementan el contenido del libro
              digital y refuerzan la metodología de TWE Macro Academy.
            </p>
          </header>

          {/* GRID DE VIDEOS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <article
                key={video.title}
                className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur p-4 space-y-3"
              >
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-black border border-white/10">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-white">
                    {video.title}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    {video.description}
                  </p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </RequireVideoAccess>
  );
}
