"use client";

import Image from "next/image";
import { ArrowRight, FileText, Send } from "lucide-react";


const BROCHURE_URL = "/brochure/TWE-Macro-Academy.pdf"; // cambia a tu ruta real

const phases = [
  {
    number: "01",
    title: "Contexto",
    description:
      "Entiendes el mercado como sistema: fundamentos, ciclos y el “por qué” detrás de los movimientos.",
    tone: "from-cyan-500/15 to-cyan-700/10",
  },
  {
    number: "02",
    title: "Macro",
    description:
      "Políticas monetarias, inflación y tasas. Aprendes a leer el entorno que condiciona oportunidades.",
    tone: "from-emerald-500/15 to-emerald-700/10",
  },
  {
    number: "03",
    title: "Estructura",
    description:
      "Lectura del precio con criterio: estructura, zonas relevantes y contexto técnico con sentido.",
    tone: "from-amber-500/15 to-amber-700/10",
  },
  {
    number: "04",
    title: "Ejecución",
    description:
      "Gestión del riesgo, disciplina y toma de decisiones. Consistencia antes que velocidad.",
    tone: "from-purple-500/15 to-purple-700/10",
  },
];

const MethodologySection = () => {
  const handleScrollToBook = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const el = document.getElementById("book");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="methodology"
      className="border-t border-slate-800 bg-slate-950/95 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* HEADER */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <span className="mb-4 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300">
              Metodología / Proceso educativo
            </span>

            <h2 className="text-3xl font-semibold text-slate-50 md:text-4xl lg:text-5xl">
              Un proceso claro.
              <br />
              Sin improvisación.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 md:text-lg">
              En TWE no aprendes “trucos”. Aprendes un criterio que integra macro
              + estructura del precio + riesgo, en un orden lógico y progresivo.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#book"
                onClick={handleScrollToBook}
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Ver el libro <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={"https://drive.google.com/file/d/118sZh2-CpSWqA7vfTiH_Vn5NtGeGf8Zl/view?usp=sharing"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400/40"
              >
                Ver brochure (PDF) <FileText className="h-4 w-4" />
              </a>
              <a
  href="https://t.me/TU_LINK_DE_TELEGRAM"
  target="_blank"
  rel="noreferrer"
  className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/40 hover:text-cyan-300"
>
  Unirte al Telegram <Send className="h-4 w-4" />
  <p className="mt-2 text-xs text-slate-400">
  Comunidad privada, avisos importantes y análisis en tiempo real.
</p>

</a>

            </div>

            <p className="mt-3 text-xs text-slate-400">
              El brochure contiene el detalle completo del programa y la experiencia educativa.
            </p>
          </div>

          {/* RIGHT: fotos (compactas) */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">
              {/* Main */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 shadow-[0_0_60px_rgba(15,23,42,0.75)]">
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src="/eberth-exponiendo.jpg"
                    alt="Eberth exponiendo sobre mercados financieros"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
              </div>

              {/* Secondary */}
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/eberthygraficos1.jpg"
                    alt="Eberth operando y analizando el mercado"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROCESS GRID (4 fases, visual premium) */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {phases.map((p) => (
            <div
              key={p.number}
              className="group rounded-2xl border border-slate-800 bg-slate-900/65 p-6 shadow-lg shadow-black/20 transition-all hover:border-emerald-400/30"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.tone}`}
                >
                  <span className="text-sm font-bold text-slate-100">
                    {p.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-50 group-hover:text-emerald-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    {p.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOT NOTE */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/55 p-6 md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-50">
                ¿Quieres el detalle completo del programa?
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Revisa el brochure oficial con toda la información de la academia.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={"https://drive.google.com/file/d/118sZh2-CpSWqA7vfTiH_Vn5NtGeGf8Zl/view?usp=sharing"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
              >
                Abrir brochure <FileText className="h-4 w-4" />
              </a>

              <a
                href="#book"
                onClick={handleScrollToBook}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400/40"
              >
                Ver el libro <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
