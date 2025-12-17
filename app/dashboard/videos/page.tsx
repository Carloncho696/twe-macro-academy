import React from "react";

const videos = [
  {
    title: "Introducción a TWE Macro Academy",
    description: "Cómo está estructurado el programa y cómo sacarle el máximo provecho.",
    youtubeId: "dQw4w9WgXcQ", // <-- reemplaza por tu ID real
  },
  {
    title: "Cómo abrir tu cuenta de inversión",
    description: "Paso a paso para crear tu cuenta, validar tu identidad y evitar errores.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: "Conceptos básicos antes de operar",
    description: "Riesgo, lote, apalancamiento y otras bases que debes dominar.",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export default function VideosPage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Videos</h1>
          <p className="text-gray-300 text-sm mt-2 max-w-xl">
            Accede a las clases en video que complementan el contenido del libro digital.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2.5 rounded-xl border border-white/15 text-xs text-gray-200 hover:bg-white/5 transition">
            Ver guía de estudio (próximamente)
          </button>
        </div>
      </section>

      {/* GRID DE VIDEOS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <article
            key={video.title}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 space-y-3"
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
              <h2 className="text-sm font-semibold">{video.title}</h2>
              <p className="text-xs text-gray-300 mt-1">{video.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
