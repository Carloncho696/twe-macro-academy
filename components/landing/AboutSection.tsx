"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";



const focusBullets = [
  "Análisis macroeconómico aplicado al mercado real",
  "Lectura estructural del precio",
  "Ejecución técnica con criterio",
  "Gestión del riesgo como eje del sistema",
  "Metodología clara, replicable y sin promesas irreales",
];

const AboutSection = () => {
  const handleScrollToBook = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const el = document.getElementById("book");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="sobre" className="border-t border-slate-800 bg-slate-950/95">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT: Copy */}
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300">
              Sobre el Autor & Enfoque
            </span>

            <h2 className="text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
              No es intuición. Es criterio.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
              Una metodología profesional de análisis y ejecución en mercados
              financieros, diseñada para traders que buscan consistencia,
              estructura y toma de decisiones con fundamento.
            </p>

            <div className="mt-6 space-y-3">
              <p className="text-sm leading-relaxed text-slate-300 md:text-base">
                <span className="font-semibold text-slate-100">
                  Eberth [Apellido]
                </span>{" "}
                es trader y analista de mercados financieros, con experiencia
                operando en mercados reales y formando traders bajo un enfoque
                estructurado y disciplinado.
              </p>

              <p className="text-sm leading-relaxed text-slate-300 md:text-base">
                Su trabajo se centra en{" "}
                <span className="font-semibold text-slate-100">
                  comprender el mercado antes de operar
                </span>
                , integrando contexto macroeconómico, estructura técnica y
                gestión del riesgo como pilares fundamentales.
              </p>
            </div>

            {/* Bullets */}
            <ul className="mt-8 space-y-3">
              {focusBullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span className="text-sm leading-relaxed text-slate-300 md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Bridge + CTA */}
            <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <p className="text-sm text-slate-200 md:text-base">
                Todo este enfoque está desarrollado y documentado en el libro.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#book"
                  onClick={handleScrollToBook}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Conocer el libro <ArrowRight className="h-4 w-4" />
                </a>

                <p className="text-xs leading-relaxed text-slate-400">
                  Enfoque profesional. Sin señales. Sin promesas irreales.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 shadow-[0_0_60px_rgba(15,23,42,0.75)]">
              {/* Ajusta el src a tu archivo real (ej: /images/eberth-speaker.jpg) */}
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/eberth-exponiendo.jpg"
                  alt="Eberth exponiendo sobre mercados financieros"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Overlay sutil para que se vea premium en dark */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
            </div>

            {/* Mini badge opcional */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Formación con estructura y gestión del riesgo.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
