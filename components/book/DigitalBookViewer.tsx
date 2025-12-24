"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ✅ Worker siempre compatible con la versión real que usa react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type ProgressDoc = {
  lastPage: number;
  updatedAt: number;
};

function useContainerWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(900);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));

    ro.observe(el);
    setWidth(el.clientWidth);

    return () => ro.disconnect();
  }, []);

  return { ref, width };
}

export default function DigitalBookViewer({
  userEmail,
  userId,
  pdfUrl,
}: {
  userEmail: string;
  userId: string;
  pdfUrl: string;
}) {
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);

  const { ref, width } = useContainerWidth();
  const pageWidth = Math.min(1000, Math.max(320, width - 32));

  const watermarkText = useMemo(() => {
    return `${userEmail} · ${userId}`;
  }, [userEmail, userId]);

  // ✅ PDF como ArrayBuffer (robusto en Next)
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [pdfError, setPdfError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setPdfError("");
        setPdfData(null);

        const res = await fetch(pdfUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${pdfUrl}`);

   const buf = await res.arrayBuffer();
const safe = buf.slice(0); // ✅ copia: evita "detached ArrayBuffer"
if (!cancelled) setPdfData(safe);

      } catch (e: unknown) {
        console.error("Fetch PDF failed:", e);

        if (!cancelled) {
          setPdfError(
            e instanceof Error
              ? e.message
              : "No se pudo cargar el PDF"
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  // ✅ Memoizar file para evitar warning / reloads innecesarios
  const file = useMemo(() => {
    return pdfData ? { data: pdfData } : null;
  }, [pdfData]);

  // 🔹 Cargar progreso
  useEffect(() => {
    (async () => {
      try {
        const ref = doc(db, "bookProgress", userId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as ProgressDoc;
          if (data?.lastPage) setPage(data.lastPage);
        }
      } catch {}
    })();
  }, [userId]);

  // 🔹 Guardar progreso
  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        const ref = doc(db, "bookProgress", userId);
        await setDoc(
          ref,
          { lastPage: page, updatedAt: Date.now() },
          { merge: true }
        );
      } catch {}
    }, 500);

    return () => clearTimeout(t);
  }, [page, userId]);

  // 🔹 Bloquear impresión (Ctrl + P)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      {/* CONTROLES */}
      <div className="mb-4 flex items-center justify-between text-white">
        <span className="text-sm opacity-80">
          Página {page} {numPages ? `/ ${numPages}` : ""}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg bg-white/10 px-3 py-1 text-sm disabled:opacity-40"
          >
            ← Anterior
          </button>

          <button
            onClick={() => setPage((p) => Math.min(numPages || 1, p + 1))}
            disabled={!numPages || page === numPages}
            className="rounded-lg bg-white/10 px-3 py-1 text-sm disabled:opacity-40"
          >
            Siguiente →
          </button>
        </div>
      </div>

      {/* PDF */}
      <div
        ref={ref}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-black"
      >
        {pdfError ? (
          <div className="p-6 text-red-200">{pdfError}</div>
        ) : !file ? (
          <div className="p-6 text-white/70">Cargando PDF…</div>
        ) : (
          <Document
            file={file}
            onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
            onLoadError={(err) => {
              console.error("react-pdf load error:", err);
              setPdfError("Error al renderizar el PDF (ver consola F12).");
            }}
            loading={<div className="p-6 text-white/70">Cargando PDF…</div>}
          >
            <Page
              pageNumber={page}
              width={pageWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        )}

        {/* WATERMARK */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-12 p-12 text-white/70">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="rotate-[-25deg] select-none text-xs tracking-wide"
              >
                {watermarkText}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
