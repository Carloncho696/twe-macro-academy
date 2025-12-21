"use client";

import React, { useMemo } from "react";
import Link from "next/link";

type Video = { title: string; youtubeId: string; note?: string };

export default function DashboardHome() {
  // ✅ Ruta del PDF (ponlo en /public/free-book/adelanto.pdf)
  const freePdfUrl = "/free-book/adelanto.pdf";

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
      {/* HERO */}
      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Contenido gratuito
        </h1>

        <p className="text-gray-300 text-sm max-w-2xl">
          Aquí tienes una muestra real del material:{" "}
          <span className="text-white font-medium">5 páginas</span> en PDF +{" "}
          <span className="text-white font-medium">2 videos</span> gratuitos del
          autor.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <a
            href="#contenido"
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition text-center"
          >
            👇 Ver muestra completa
          </a>

          <Link
            href="/#book"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-semibold text-sm shadow-[0_0_20px_rgba(255,255,0,0.18)] hover:opacity-90 transition text-center"
          >
            ✅ Desbloquear libro + videos
          </Link>
        </div>

        <p className="mt-4 text-xs text-gray-400 max-w-2xl">
          *El libro completo incluye todo el contenido + videos por capítulo.
        </p>
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
                src="/Propuesta.pdf"
                className="w-full h-[620px] md:h-[720px]"
              />
            </div>

            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              {/* Si NO quieres descarga, puedes quitar este botón */}
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
              <span className="text-gray-200">/public/free-book/adelanto.pdf</span>
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
            ¿Te gustó la muestra? El material completo está diseñado para llevarte{" "}
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
