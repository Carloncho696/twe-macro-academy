"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, TrendingUp } from "lucide-react";



const HeroSection = () => {
  const handleScrollToBook = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const el = document.getElementById("book");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="
        relative flex items-center justify-center overflow-hidden bg-slate-950
        min-h-[calc(100vh-80px)]
        pt-2 md:pt-4
      "
    >
      {/* === BACKGROUND IMAGE (FULL HERO + ANIMACIÓN) === */}
      <div className="absolute inset-0 z-0 hero-bg-anim">
        <Image
          src="/imagenhero.png"
          alt="Mercados financieros globales"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/72 to-slate-950/88" />
      </div>

      {/* === Decorative Background Effects === */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.18) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="absolute left-[-5%] top-1/4 h-72 w-72 rounded-full bg-emerald-500/24 blur-3xl" />
        <div className="absolute right-[-5%] bottom-0 h-96 w-96 rounded-full bg-cyan-500/24 blur-[90px]" />

        <svg
          className="absolute bottom-0 left-0 right-0 h-28 md:h-32 opacity-35"
          viewBox="0 0 1440 200"
          fill="none"
        >
          <path
            d="M0 150 Q 200 50, 400 100 T 800 80 T 1200 120 T 1440 60"
            stroke="rgba(56,189,248,0.8)"
            strokeWidth="2"
          />
          <path
            d="M0 180 Q 300 100, 500 140 T 900 100 T 1300 150 T 1440 100"
            stroke="rgba(16,185,129,0.8)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* === CONTENT === */}
      <motion.div
        className="relative z-20 mx-auto w-full max-w-4xl px-4 text-center"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Badge */}
        <motion.div
          className="
            mb-3 md:mb-5
            inline-flex items-center gap-2
            rounded-full border border-emerald-400/40 bg-slate-950/70
            px-4 py-2 backdrop-blur
          "
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-300">
            Formación profesional en trading
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="
            mb-3 md:mb-4
            text-[34px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
            font-semibold text-slate-50
            leading-[1.06] sm:leading-[1.05]
          "
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Domina el trading con{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
            visión macroeconómica
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="
            mx-auto mb-4 md:mb-6
            max-w-2xl
            text-[13px] sm:text-sm md:text-lg
            leading-relaxed text-slate-200
          "
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.55 }}
        >
          De principiante a operador con mentalidad profesional. Aprende a
          combinar análisis macroeconómico y técnico para tomar decisiones
          informadas en los mercados.
        </motion.p>


        {/* CTAs */}
        <motion.div
          className="
            flex flex-col items-center justify-center
            gap-2 sm:gap-3 md:gap-4
            sm:flex-row
          "
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.55 }}
        >
          <Link
            href="/auth/register"
            className="
              group inline-flex w-full sm:w-auto
              items-center justify-center gap-2
              rounded-full bg-emerald-500
              px-6 py-3
              text-sm md:text-base
              font-semibold text-slate-950
              shadow-lg shadow-emerald-500/40
              transition hover:bg-emerald-400
            "
          >
            Quiero aprender trading
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#book"
            onClick={handleScrollToBook}
            className="
              inline-flex w-full sm:w-auto
              items-center justify-center gap-2
              rounded-full border border-slate-600/70
              bg-slate-900/70
              px-6 py-3
              text-sm md:text-base
              font-medium text-slate-100
              backdrop-blur
              transition hover:border-emerald-400/70 hover:bg-slate-900
            "
          >
            <PlayCircle className="h-5 w-5" />
            Ver el libro
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
