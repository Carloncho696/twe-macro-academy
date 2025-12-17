"use client";

import React, { useMemo } from "react";
import { MessageCircle } from "lucide-react";
import { hasAccess } from "@/lib/mockUser";

export default function DigitalBookPage() {
  const whatsappLink = useMemo(() => {
    const whatsappMessage = encodeURIComponent(
      "Hola, ya estoy registrado en TWE Macro Academy. Quiero comprar el acceso completo al libro."
    );
    return `https://wa.me/51999999999?text=${whatsappMessage}`;
  }, []);

  // PDFs reales en /public/pdf/...
  const FULL_PDF_URL = "/pdf/libro-completo.pdf";
  const PREVIEW_PDF_URL = "/pdf/adelanto-capitulo-1.pdf";

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* TOP */}
        <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Biblioteca
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
              Trading con Visión Macroeconómica
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              {hasAccess
                ? "Acceso completo habilitado."
                : "Estás viendo un adelanto. Compra para desbloquear el libro completo."}
            </p>
          </div>

          {!hasAccess && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
            >
              <MessageCircle className="h-5 w-5" />
              Comprar acceso
            </a>
          )}
        </div>

        {/* CONTENEDOR ÚNICO (SOLO LIBRO) */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur">
          <div className="p-5">
            <BookViewer
              hasAccess={hasAccess}
              fullUrl={FULL_PDF_URL}
              previewUrl={PREVIEW_PDF_URL}
              whatsappLink={whatsappLink}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function BookViewer({
  hasAccess,
  fullUrl,
  previewUrl,
  whatsappLink,
}: {
  hasAccess: boolean;
  fullUrl: string;
  previewUrl: string;
  whatsappLink: string;
}) {
  const src = hasAccess ? fullUrl : previewUrl;

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-300">
        {hasAccess ? "Libro completo" : "Adelanto (Capítulo 1)"}
      </p>

      {/* Visor PDF */}
      <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950">
        <iframe
          title="Libro PDF"
          
          className="h-[70vh] w-full"
        />

        {!hasAccess && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        )}
      </div>

      {!hasAccess && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-slate-400">
            Compra el acceso para desbloquear el libro completo.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            <MessageCircle className="h-4 w-4" />
            Comprar acceso
          </a>
        </div>
      )}
    </div>
  );
}
