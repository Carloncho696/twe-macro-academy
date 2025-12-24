"use client";

import React, { useMemo } from "react";
import Link from "next/link";

type Video = { title: string; youtubeId: string; note?: string };

type Announcement = {
  id: string;
  tag?: "IMPORTANTE" | "EVENTO" | "NUEVO" | "PROMO";
  title: string;
  message: string;
  dateLabel?: string; // ej: "Vie 27 Dic • 8:00 pm (Perú)"
  href?: string; // link de acción (opcional)
  cta?: string; // texto del botón (opcional)
  image?: {
    src: string; // pon la imagen en /public/anuncios/...
    alt: string;
  };
  active?: boolean; // para apagar/encender anuncios
};

export default function DashboardHome() {
  // ✅ Ruta del PDF (ponlo en /public/free-book/adelanto.pdf)
  const freePdfUrl = "/Propuesta.pdf";

  // ✅ ANUNCIOS (solo editas esto y listo)
  const announcements: Announcement[] = useMemo(
    () => [
      {
        id: "event-1",
        tag: "EVENTO",
        title: "Clase en vivo: Análisis Macro (Zoom)",
        message:
          "Este viernes tendremos sesión en vivo con Q&A. Lleva tus dudas y tu mapa semanal.",
        dateLabel: "Vie 27 Dic • 8:00 pm (Perú)",
        href: "/#book", // cámbialo por tu ruta real (o link externo si quieres)
        cta: "Ver detalles",
        image: {
          src: "/anuncios/evento-zoom.jpg",
          alt: "Clase en vivo - Análisis Macro",
        },
        active: true,
      },
      {
        id: "promo-1",
        tag: "PROMO",
        title: "Promo navideña: acceso completo por tiempo limitado",
        message:
          "Activa el pack (libro + videos) con precio especial. Luego vuelve a precio normal.",
        dateLabel: "Válido hasta el 31 Dic",
        href: "/#book",
        cta: "Aprovechar promo",
        active: true,
      },
      // 👉 Si no quieres más anuncios, apaga con active:false
      // { id:"x", title:"...", message:"...", active:false }
    ],
    []
  );

  const activeAnnouncements = announcements.filter((a) => a.active !== false);

  // ✅ 2 videos GRATIS (pon aquí los IDs reales)
  const freeVideos: Video[] = useMemo(
    () => [
      {
        title: "Video Gratis #1: Introducción al método",
        youtubeId: "dQw4w9WgXcQ",
        note: "Disponible para todos los alumnos registrados.",
      },
      {
        title: "Video Gratis #2: Conceptos base para empezar",
        youtubeId: "dQw4w9WgXcQ",
        note: "Mira el estilo de explicación del autor.",
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* =======================
          ANUNCIOS (BLOQUE SUPERIOR)
         ======================= */}
      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">📣 Anuncios</h2>
            <p className="text-gray-300 text-sm max-w-2xl mt-1">
              Novedades, eventos y comunicados importantes de la academia.
            </p>
          </div>

          {/* Botón opcional (si luego quieres un /dashboard/anuncios) */}
          <span className="hidden sm:inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300">
            {activeAnnouncements.length} activo(s)
          </span>
        </div>

        {activeAnnouncements.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-sm text-gray-300">
              📭 Por ahora no hay anuncios. Mantente atento a futuras novedades.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeAnnouncements.map((a) => (
              <div
                key={a.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20"
              >
                {/* Glow sutil */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-yellow-500/10 blur-2xl" />
                  <div className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-cyan-500/10 blur-2xl" />
                </div>

                {/* Header */}
                <div className="relative p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {a.tag ? (
                          <span
                            className={[
                              "text-[11px] font-semibold px-2 py-1 rounded-lg border",
                              a.tag === "IMPORTANTE"
                                ? "text-red-200 border-red-500/30 bg-red-500/10"
                                : a.tag === "EVENTO"
                                ? "text-cyan-200 border-cyan-500/30 bg-cyan-500/10"
                                : a.tag === "NUEVO"
                                ? "text-emerald-200 border-emerald-500/30 bg-emerald-500/10"
                                : "text-yellow-200 border-yellow-500/30 bg-yellow-500/10",
                            ].join(" ")}
                          >
                            {a.tag}
                          </span>
                        ) : null}

                        {a.dateLabel ? (
                          <span className="text-[11px] text-gray-400">
                            {a.dateLabel}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-2 text-base md:text-lg font-bold text-white truncate">
                        {a.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                        {a.message}
                      </p>
                    </div>

                    {/* Imagen opcional */}
                    {a.image ? (
                      <div className="hidden sm:block w-28 h-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
                        {/* Usamos img normal para que solo sea "poner y listo" */}
                        <img
                          src={a.image.src}
                          alt={a.image.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                  </div>

                  {/* CTA */}
                  {a.href && a.cta ? (
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <Link
                        href={a.href}
                        className="px-4 py-2 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-semibold text-sm hover:opacity-90 transition text-center"
                      >
                        {a.cta}
                      </Link>

                      <a
                        href="#contenido"
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition text-center"
                      >
                        Ver contenido gratis
                      </a>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <a
                        href="#contenido"
                        className="inline-flex px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition"
                      >
                        Ver contenido gratis
                      </a>
                    </div>
                  )}

                  <p className="mt-3 text-[11px] text-gray-400">
                    Tip: para cambiar anuncios, solo edita el array{" "}
                    <span className="text-gray-200 font-medium">
                      announcements
                    </span>{" "}
                    en este archivo.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    

      {/* CONTENIDO GRATIS (SIEMPRE VISIBLE) */}
      <section
        id="contenido"
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Muestra gratuita</h2>
            <p className="text-gray-300 text-sm max-w-2xl mt-1">
              Lee el adelanto en PDF y mira los videos directamente aquí, sin
              salir del dashboard.
            </p>
          </div>

          <Link
            href="/#book"
            className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-yellow-500/30 text-yellow-300 text-sm font-semibold hover:bg-yellow-500/10 transition"
          >
            🚀 Quiero el pack completo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* PDF EMBEBIDO */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">📘 Adelanto del libro</h3>
              <span className="text-xs text-gray-400">PDF • 5 páginas</span>
            </div>

            <p className="text-sm text-gray-300 mb-4">
              Desliza dentro del PDF para leer el adelanto.
            </p>

            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
              <iframe
                title="Adelanto del libro (PDF)"
                // ✅ usa la variable para evitar confusiones de rutas
                src={freePdfUrl}
                className="w-full h-[620px] md:h-[720px]"
              />
            </div>

            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              <a
                href={freePdfUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition text-center"
              >
                Abrir en otra pestaña
              </a>

              <Link
                href="/#book"
                className="px-4 py-2 rounded-xl border border-yellow-500/30 text-yellow-300 text-sm font-semibold hover:bg-yellow-500/10 transition text-center"
              >
                Desbloquear el libro completo
              </Link>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Coloca el PDF aquí:{" "}
              <span className="text-gray-200">
                /public/free-book/adelanto.pdf
              </span>
            </p>
          </div>

          {/* 2 VIDEOS (YOUTUBE) */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">🎥 Videos gratuitos</h3>
              <span className="text-xs text-gray-400">2 videos</span>
            </div>

            <p className="text-sm text-gray-300 mb-4">
              Mira el estilo del autor y la calidad de explicación.
            </p>

            <div className="space-y-4">
              {freeVideos.map((v) => (
                <div
                  key={v.youtubeId}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  <div className="px-4 py-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{v.title}</p>
                      {v.note ? (
                        <p className="text-xs text-gray-400 mt-1">{v.note}</p>
                      ) : null}
                    </div>
                    <span className="text-xs text-yellow-300 border border-yellow-500/30 px-2 py-1 rounded-lg">
                      GRATIS
                    </span>
                  </div>

                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${v.youtubeId}`}
                      title={v.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <Link
                href="/#book"
                className="px-4 py-2 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-semibold text-sm hover:opacity-90 transition text-center"
              >
                ✅ Comprar y desbloquear todo
              </Link>

              <a
                href="/dashboard/videos"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition text-center"
              >
                Ver biblioteca de videos
              </a>
            </div>
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
          <p className="text-sm text-gray-200">
            ¿Te gustó la muestra? El material completo está diseñado para
            llevarte{" "}
            <span className="text-white font-semibold">paso a paso</span> con
            ejemplos y videos por capítulo.
          </p>

          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <Link
              href="/#book"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-semibold text-sm hover:opacity-90 transition text-center"
            >
              ✅ Comprar y desbloquear todo
            </Link>
            <a
              href="/dashboard/digital-book"
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition text-center"
            >
              📘 Ir al libro (si ya tengo acceso)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
