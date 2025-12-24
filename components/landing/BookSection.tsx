"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  BookOpen,
  Video,
  FileText,
  CheckCircle,  
  RotateCcw,
  X,
} from "lucide-react";



const bookFeatures = [
  "Explicación paso a paso desde cero",
  "Ejemplos reales de operaciones",
  "Casos de estudio del mercado",
  "Videos explicativos por capítulo",
  "Acceso de por vida al contenido",
  "Actualizaciones continuas",
];

export default function BookSection() {
  const [showBack, setShowBack] = useState(false);
  const [openZoom, setOpenZoom] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hola, me interesa adquirir el libro/curso de TWE Macro Academy. ¿Podrían darme más información?"
  );

  // ⚠️ Cambia por el número real (formato: país + número, sin + ni espacios)
  const whatsappLink = `https://wa.me/51913978367?text=${ "Hola, quiero información para comprar el libro de TWE Macro Academy. ¿Podrías indicarme los pasos de pago y acceso?"}`;

  const frontSrc = "/portada-libro.jpg";
  const backSrc = "/contraportada-libro.png";
  const activeSrc = showBack ? backSrc : frontSrc;

  return (
    <section
      id="book"
      className="bg-slate-950/90 py-20 md:py-32 border-t border-slate-800"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* BOOK VISUAL (PORTADA + CONTRAPORTADA + ZOOM) */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative mx-auto max-w-sm">
              {/* Glow */}
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 blur-3xl opacity-30" />

              {/* Marco */}
              <div className="relative rounded-2xl border border-white/10 bg-slate-900/30 p-3 shadow-[0_0_70px_rgba(16,185,129,0.12)] backdrop-blur">
                {/* Flip container */}
                <div className="relative aspect-[3/4] w-full perspective-1200">
                  <div
                    className={`relative h-full w-full transition-transform duration-700 preserve-3d ${
                      showBack ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* FRONT (PORTADA) */}
                 <div
  className={`absolute inset-0 backface-hidden overflow-hidden rounded-xl border border-white/10 ${
    showBack ? "pointer-events-none" : "pointer-events-auto"
  }`}
>

                      <button
                        type="button"
                        onClick={() => setOpenZoom(true)}
                        className="absolute inset-0 z-10 cursor-zoom-in"
                        aria-label="Abrir portada en grande"
                      />
                      <Image
                        src={frontSrc}
                        alt="Portada del libro - TWE Macro Academy"
                        fill
                        priority
                        sizes="(max-width: 1024px) 90vw, 420px"
                        className="object-cover"
                      />

                      {/* Overlay suave */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent pointer-events-none" />

                      <button
                        type="button"
                        onClick={() => setShowBack(true)}
                        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/70 px-4 py-2 text-xs font-medium text-white backdrop-blur hover:bg-slate-900/80 transition"
                      >
                        Ver contraportada
                      </button>

                      <div className="absolute top-3 right-3 z-20 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-200 backdrop-blur pointer-events-none">
                        Click para ampliar
                      </div>
                    </div>

                    {/* BACK (CONTRAPORTADA) */}
                    <div className="absolute inset-0 rotate-y-180 backface-hidden overflow-hidden rounded-xl border border-white/10 bg-slate-950">
                      <button
                        type="button"
                        onClick={() => setOpenZoom(true)}
                        className="absolute inset-0 z-10 cursor-zoom-in"
                        aria-label="Abrir contraportada en grande"
                      />
                      <Image
                        src={backSrc}
                        alt="Contraportada del libro - TWE Macro Academy"
                        fill
                        sizes="(max-width: 1024px) 90vw, 420px"
                        className="object-cover"
                      />

                      {/* Overlay suave */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent pointer-events-none" />

                      <button
                        type="button"
                        onClick={() => setShowBack(false)}
                        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Volver a portada
                      </button>

                      <div className="absolute top-3 right-3 z-20 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-200 backdrop-blur pointer-events-none">
                        Click para ampliar
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini etiqueta abajo */}
                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/40 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-medium text-slate-200">
                      Libro digital
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">Acceso de por vida</span>
                </div>
              </div>
            </div>
          </div>

         {/* RIGHT CONTENT – compacto y orientado a conversión */}
<div className="order-1 lg:order-2 flex flex-col justify-center">
  {/* Badge */}
  <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
    Producto estrella
  </span>

  {/* Headline */}
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 leading-tight">
    LA ARQUITECTURA DEL MERCADO I
  </h2>

  {/* Subheadline (valor antes del precio) */}
  <p className="mt-4 max-w-xl text-slate-300 leading-relaxed text-sm md:text-base">
    35 capítulos · +720 páginas · Metodología profesional y estructurada.
    Diseñado para que entiendas el mercado como un sistema: macro, ciclos,
    psicología y estrategia. Sin humo.
  </p>

  {/* Bullets compactos (2 columnas) */}
 

  {/* Diferencial destacado (clave para upsell) */}
  <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
    <div className="flex items-start gap-3">
      <Video className="h-5 w-5 text-emerald-300 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold text-emerald-100">
          Video explicativo en cada capítulo
        </p>
        <p className="text-xs text-emerald-100/80 mt-0.5">
          No solo lees: el autor te explica el “por qué” detrás de cada concepto.
        </p>
      </div>
    </div>
  </div>

  {/* Precios (anclaje + recomendado) */}
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Libro solo */}
    <div className="rounded-2xl border border-white/10 bg-slate-900/25 p-4">
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-emerald-300" />
        <p className="text-sm font-semibold text-slate-100">Libro digital</p>
      </div>
      <p className="mt-1 text-xs text-slate-400">
        35 capítulos · +720 páginas · Acceso de por vida
      </p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] text-slate-400">Precio</p>
          <p className="text-2xl font-bold text-slate-50">$88</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-3 py-1 text-xs text-slate-200">
          <FileText className="h-4 w-4 text-emerald-300" />
          PDF
        </span>
      </div>
    </div>

    {/* Libro + videos */}
    <div className="relative rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-[0_0_40px_rgba(16,185,129,0.12)]">
      <span className="absolute -top-3 right-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-slate-950">
        Mejor valor
      </span>

      <div className="flex items-center gap-2">
        <Video className="h-4 w-4 text-emerald-200" />
        <p className="text-sm font-semibold text-emerald-50">
          Libro + videos
        </p>
      </div>

      <p className="mt-1 text-xs text-emerald-100/80">
        Un video por capítulo · Acceso de por vida
      </p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] text-emerald-100/70">Precio</p>
          <p className="text-2xl font-bold text-emerald-50">$98</p>
        </div>

        <p className="text-[11px] text-emerald-100/80 text-right leading-tight">
          Solo <span className="font-semibold">$10</span> más
          <br />
          por todo el acompañamiento
        </p>
      </div>
    </div>
  </div>

  {/* CTA */}
  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-emerald-500 px-7 py-3 font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400"
  >
    <MessageCircle className="h-5 w-5" />
    Comprar vía WhatsApp
  </a>

  {/* Micro trust */}
  <p className="mt-3 text-xs text-slate-400">
    ● Acceso inmediato · Pago seguro · Soporte por WhatsApp
  </p>
</div>

        </div>
      </div>

      {/* MODAL (ZOOM) */}
      {openZoom && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpenZoom(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenZoom(false)}
              className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-950/70 p-2 text-white hover:bg-slate-900"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative max-h-[80vh] w-full overflow-auto p-3">
              {/* IMPORTANTE: usamos width/height aquí para evitar líos */}
              <Image
                src={activeSrc}
                alt="Vista ampliada del libro"
                width={1400}
                height={1900}
                className="h-auto w-full rounded-xl object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4">
              <p className="text-sm text-slate-200">
                {showBack ? "Contraportada" : "Portada"} (vista ampliada)
              </p>

              <button
                type="button"
                onClick={() => setShowBack((v) => !v)}
                className="rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 hover:bg-slate-900"
              >
                {showBack ? "Ver portada" : "Ver contraportada"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
