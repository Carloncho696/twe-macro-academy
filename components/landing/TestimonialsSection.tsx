"use client";

import { Quote, Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Carlos M.",
    role: "Trader Independiente",
    avatar: "CM",
    content:
      "Antes operaba sin entender el contexto macro. Ahora mis decisiones tienen fundamento y mis resultados han mejorado significativamente.",
    rating: 5,
  },
  {
    name: "María G.",
    role: "Inversora",
    avatar: "MG",
    content:
      "La combinación de análisis técnico con macroeconomía es única. El libro explica todo de manera clara y con ejemplos reales.",
    rating: 5,
  },
  {
    name: "Roberto S.",
    role: "Ex-Principiante",
    avatar: "RS",
    content:
      "Empecé desde cero y el programa me llevó paso a paso. La sección de mentalidad del operador fue transformadora para mí.",
    rating: 5,
  },
  {
    name: "Jorge P.",
    role: "Swing Trader",
    avatar: "JP",
    content:
      "Me ayudó a ordenar mis ideas: contexto, estructura y ejecución. Ahora opero con calma y criterio.",
    rating: 5,
  },
  {
    name: "Ana L.",
    role: "Estudiante",
    avatar: "AL",
    content:
      "Los ejemplos aterrizan todo. Dejé de adivinar y empecé a leer el mercado con lógica.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="border-t border-slate-800 bg-slate-950/95 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
            Testimonios
          </span>

          <h2 className="mb-5 text-3xl font-semibold text-slate-50 md:text-4xl lg:text-5xl">
            Lo que dicen nuestros estudiantes
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 md:text-lg">
            Comentarios reales de personas que transformaron su forma de operar.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10" />

          <div className="group flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]">
            {loop.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="w-[320px] md:w-[360px] shrink-0 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-black/20 transition hover:border-emerald-400/40"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15">
                  <Quote className="h-5 w-5 text-emerald-300" />
                </div>

                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 text-amber-400"
                      fill="currentColor"
                    />
                  ))}
                </div>

                <p className="mb-6 text-sm md:text-[15px] leading-relaxed text-slate-100">
                  “{t.content}”
                </p>

                <div className="flex items-center gap-3 border-t border-slate-800 pt-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-bold text-slate-950">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-50">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="mb-2 text-sm text-slate-400">
            ¿Listo para unirte a nuestra comunidad?
          </p>
          <a
            href="#book"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 hover:underline"
          >
            Comienza tu transformación hoy →
          </a>
        </div>
      </div>

      {/* Animación */}
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </section>
  );
}
