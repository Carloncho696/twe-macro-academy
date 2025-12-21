"use client";

import { useMemo, useState } from "react";
import RequireVideoAccess from "@/components/auth/RequireVideoAccess";

type VideoItem = {
  title: string;
  description: string;
  // puedes pegar ID o link completo (watch, youtu.be, embed)
  youtube: string;
  // opcional: módulo/categoría para agrupar (si quieres)
  module?: string;
};

const INITIAL_SHOW = 6; // cuántos se ven al inicio (puedes subir a 8)

const videos: VideoItem[] = [
  // ✅ Deja 15 por mientras (ejemplo)
  {
    title: "Introducción a TWE Macro Academy",
    description: "Cómo está estructurado el programa y cómo sacarle provecho.",
    youtube: "Tgy3KAaBky0",
    module: "Inicio",
  },
  {
    title: "Cómo abrir tu cuenta de inversión",
    description: "Paso a paso para crear tu cuenta y evitar errores.",
    youtube: "Tgy3KAaBky0",
    module: "Inicio",
  },
  {
    title: "Conceptos básicos antes de operar",
    description: "Riesgo, lote, apalancamiento y bases clave.",
    youtube: "https://youtu.be/dQw4w9WgXcQ",
    module: "Fundamentos",
  },

  // 👉 agrega hasta tener 15
  {
    title: "Sesión 04",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Fundamentos",
  },
  {
    title: "Sesión 05",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Fundamentos",
  },
  {
    title: "Sesión 06",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Fundamentos",
  },
  {
    title: "Sesión 07",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Macro",
  },
  {
    title: "Sesión 08",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Macro",
  },
  {
    title: "Sesión 09",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Macro",
  },
  {
    title: "Sesión 10",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Estructura",
  },
  {
    title: "Sesión 11",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Estructura",
  },
  {
    title: "Sesión 12",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Estructura",
  },
  {
    title: "Sesión 13",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Metodología",
  },
  {
    title: "Sesión 14",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Metodología",
  },
  {
    title: "Sesión 15",
    description: "Descripción corta del contenido.",
    youtube: "dQw4w9WgXcQ",
    module: "Metodología",
  },
];

// ✅ Convierte link o ID a un ID válido
function getYouTubeId(input: string) {
  const value = input.trim();

  // Si ya parece ID (11 chars típico)
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

  // watch?v=
  const watchMatch = value.match(/[?&]v=([^&]+)/);
  if (watchMatch?.[1]) return watchMatch[1];

  // youtu.be/
  const shortMatch = value.match(/youtu\.be\/([^?&/]+)/);
  if (shortMatch?.[1]) return shortMatch[1];

  // /embed/
  const embedMatch = value.match(/youtube\.com\/embed\/([^?&/]+)/);
  if (embedMatch?.[1]) return embedMatch[1];

  // Si no calza, devuelve string original (por si el user pegó algo raro)
  return value;
}

export default function VideosPage() {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return videos;

    return videos.filter((v) => {
      const haystack = `${v.title} ${v.description} ${v.module ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  return (
    <RequireVideoAccess>
      <div className="min-h-[calc(100vh-80px)] px-6 py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* HEADER */}
          <header className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                Biblioteca
              </p>
              <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                Clases en Video
              </h1>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                Accede a las clases que complementan el contenido del libro digital y
                refuerzan la metodología de TWE Macro Academy.
              </p>
            </div>

            {/* BUSCADOR */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(INITIAL_SHOW); // resetea paginación al buscar
                }}
                placeholder="Buscar por título, módulo o palabra clave…"
                className="w-full sm:max-w-md rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-white outline-none focus:border-white/20"
              />

              <div className="text-xs text-slate-400">
                Mostrando <span className="text-slate-200">{visible.length}</span> de{" "}
                <span className="text-slate-200">{filtered.length}</span>
              </div>
            </div>
          </header>

          {/* GRID DE VIDEOS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map((video, idx) => {
              const id = getYouTubeId(video.youtube);
              const number = String(idx + 1).padStart(2, "0");

              return (
                <article
                  key={`${video.title}-${id}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur p-4 space-y-3"
                >
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-black border border-white/10">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${id}`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-sm font-semibold text-white">
                        <span className="text-slate-400 mr-2">{number}</span>
                        {video.title}
                      </h2>

                      {video.module ? (
                        <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400 border border-white/10 rounded-full px-2 py-1">
                          {video.module}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-xs text-slate-300">{video.description}</p>
                  </div>
                </article>
              );
            })}
          </section>

          {/* CARGAR MÁS */}
          {visibleCount < filtered.length ? (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setVisibleCount((v) => v + INITIAL_SHOW)}
                className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-white hover:border-white/20"
              >
                Cargar más
              </button>
            </div>
          ) : null}

          {/* VACÍO */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-300">
              No se encontraron videos con “{query}”.
            </div>
          ) : null}
        </div>
      </div>
    </RequireVideoAccess>
  );
}
