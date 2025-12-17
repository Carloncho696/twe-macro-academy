"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, BookOpen, Video } from "lucide-react";

export default function PromoBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("promo_book_dismissed");
    if (!dismissed) setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="w-full border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-3">
        <div className="flex items-center gap-2 text-emerald-300">
          <BookOpen className="h-4 w-4" />
        </div>

        <p className="text-xs sm:text-sm text-slate-100 flex-1">
          <span className="font-semibold">Nuevo:</span> Libro digital{" "}
          <span className="text-slate-300">($89)</span>{" "}
          <span className="text-slate-500">·</span>{" "}
          <span className="inline-flex items-center gap-1 text-emerald-200">
            <Video className="h-4 w-4" />
            Pack libro + videos $99
          </span>{" "}
          <span className="text-slate-400">(mejor valor)</span>
        </p>

        <Link
          href="#book"
          className="shrink-0 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition"
        >
          Ver el libro
        </Link>

        <button
          type="button"
          onClick={() => {
            localStorage.setItem("promo_book_dismissed", "1");
            setOpen(false);
          }}
          className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
