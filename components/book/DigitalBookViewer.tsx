"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";

// ✅ Worker compatible con la versión real que usa react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type ProgressDoc = {
  lastPage: number;
  updatedAt: number;
};

function useContainerSize() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 900, height: 600 });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ro = new ResizeObserver(() => {
      setSize({ width: el.clientWidth, height: el.clientHeight });
    });

    ro.observe(el);
    setSize({ width: el.clientWidth, height: el.clientHeight });

    return () => ro.disconnect();
  }, []);

  return { ref, ...size };
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

  // ✅ Input "Ir a página"
  const [pageInput, setPageInput] = useState("1");

  // ✅ Zoom + Fit
  const [zoom, setZoom] = useState(1);
  const [fitMode, setFitMode] = useState<"fitPage" | "fitWidth">("fitPage");

  // ✅ Escala precisa
  const [pageDims, setPageDims] = useState<{ w: number; h: number } | null>(
    null
  );

  // ✅ Fullscreen real + fallback pseudo fullscreen
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fsSupported, setFsSupported] = useState(true);

  // ✅ Controles flotantes (modo "kindle")
  const [controlsVisible, setControlsVisible] = useState(true);

  // ✅ PDF buffer
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [pdfError, setPdfError] = useState<string>("");

  const watermarkText = useMemo(
    () => `${userEmail} · ${userId}`,
    [userEmail, userId]
  );

  // ✅ Detectar soporte real a fullscreen
  useEffect(() => {
    const el = viewerRef.current as any;
    const supported = !!(
      el?.requestFullscreen ||
      el?.webkitRequestFullscreen ||
      el?.msRequestFullscreen
    );
    setFsSupported(supported);
  }, []);

  // ✅ Sync estado al cambiar fullscreen real
  useEffect(() => {
    const onFsChange = () => {
      const fsEl = document.fullscreenElement;
      setIsFullscreen(fsEl === viewerRef.current);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const enterFullscreen = async () => {
    try {
      const el = viewerRef.current as any;
      if (!el) return;

      if (el.requestFullscreen) return await el.requestFullscreen();
      if (el.webkitRequestFullscreen) return await el.webkitRequestFullscreen();
      if (el.msRequestFullscreen) return await el.msRequestFullscreen();

      // fallback pseudo fullscreen
      setFsSupported(false);
      setIsFullscreen(true);
    } catch (e) {
      console.error("Fullscreen error:", e);
      setFsSupported(false);
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) return await document.exitFullscreen();
      setIsFullscreen(false);
    } catch (e) {
      console.error("Exit fullscreen error:", e);
      setIsFullscreen(false);
    }
  };

  const toggleFullscreen = async () => {
    if (!fsSupported) return setIsFullscreen((v) => !v);
    if (document.fullscreenElement) return exitFullscreen();
    return enterFullscreen();
  };

  // ✅ Móvil: al entrar fullscreen, mejor lectura por defecto
  useEffect(() => {
    if (!isFullscreen) return;

    // en pantallas pequeñas, generalmente fitWidth se siente mejor
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setFitMode("fitWidth");
    }

    // al entrar fullscreen mostramos controles un instante
    setControlsVisible(true);
  }, [isFullscreen]);

  // ✅ Autohide controles en fullscreen (tipo Kindle)
  useEffect(() => {
    if (!isFullscreen) return;
    if (!controlsVisible) return;

    const t = setTimeout(() => setControlsVisible(false), 2200);
    return () => clearTimeout(t);
  }, [isFullscreen, controlsVisible]);

  const showControlsTemporarily = () => {
    setControlsVisible(true);
  };

  // ✅ PDF fetch robusto
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setPdfError("");
        setPdfData(null);

        const res = await fetch(pdfUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${pdfUrl}`);

        const buf = await res.arrayBuffer();
        const safe = buf.slice(0);
        if (!cancelled) setPdfData(safe);
      } catch (e: unknown) {
        console.error("Fetch PDF failed:", e);
        if (!cancelled) {
          setPdfError(
            e instanceof Error ? e.message : "No se pudo cargar el PDF"
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  const file = useMemo(() => (pdfData ? { data: pdfData } : null), [pdfData]);

  // 🔹 Cargar progreso
  useEffect(() => {
    (async () => {
      try {
        const r = doc(db, "bookProgress", userId);
        const snap = await getDoc(r);
        if (snap.exists()) {
          const data = snap.data() as ProgressDoc;
          if (data?.lastPage) setPage(data.lastPage);
        }
      } catch {}
    })();
  }, [userId]);

  // 🔹 Mantener input sincronizado con page real
  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  // 🔹 Guardar progreso (debounce)
  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        const r = doc(db, "bookProgress", userId);
        await setDoc(
          r,
          { lastPage: page, updatedAt: Date.now() },
          { merge: true }
        );
      } catch {}
    }, 500);

    return () => clearTimeout(t);
  }, [page, userId]);

  // 🔹 Bloquear impresión y teclas
  const goNext = () => setPage((p) => Math.min(numPages || 1, p + 1));
  const goPrev = () => setPage((p) => Math.max(1, p - 1));

  const goToPage = (raw: string) => {
    const n = Number(raw);
    if (!Number.isFinite(n)) return;
    const clamped = Math.min(Math.max(1, n), numPages || 1);
    setPage(clamped);
  };

  // ✅ Teclado: ← → / Ctrl+P / F / ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
      }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key.toLowerCase() === "f") toggleFullscreen();

      // ESC para pseudo fullscreen (en fullscreen real ya lo maneja el navegador)
      if (e.key === "Escape" && !document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }

      // cualquier tecla muestra controles un instante
      if (isFullscreen) showControlsTemporarily();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages, isFullscreen, fsSupported]);

  // ✅ Tamaño del viewport (medimos el inner wrapper)
  const { ref, width, height } = useContainerSize();

  // padding dinámico (menos en fullscreen)
  const pad = isFullscreen ? 16 : 24;
  const innerW = Math.max(320, width - pad);
  const innerH = Math.max(360, height - pad);

  const computedScale = useMemo(() => {
    if (!pageDims) return 1 * zoom;

    const fitWidthScale = innerW / pageDims.w;
    const fitPageScale = Math.min(innerW / pageDims.w, innerH / pageDims.h);

    const base = fitMode === "fitPage" ? fitPageScale : fitWidthScale;
    return base * zoom;
  }, [pageDims, innerW, innerH, fitMode, zoom]);

  // ✅ Click/tap en fullscreen: mostrar/ocultar controles (tipo lector)
  const onViewerTap = () => {
    if (!isFullscreen) return;
    setControlsVisible((v) => !v);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      {/* CONTROLES normales (no fullscreen) */}
      {!isFullscreen && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex flex-col">
            <span className="text-sm opacity-80">
              Página {page} {numPages ? `/ ${numPages}` : ""}
            </span>
            <span className="text-[11px] text-white/50">
              Tip: usa ← → para navegar · presiona <b>F</b> para pantalla
              completa
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Ir a página */}
            <div className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1 ring-1 ring-white/10">
              <span className="text-xs text-white/70">Ir a</span>
              <input
                value={pageInput}
                onChange={(e) =>
                  setPageInput(e.target.value.replace(/[^\d]/g, ""))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") goToPage(pageInput);
                }}
                className="w-16 bg-transparent text-sm outline-none"
                inputMode="numeric"
              />
              <button
                onClick={() => goToPage(pageInput)}
                className="rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/15"
              >
                OK
              </button>
            </div>

            {/* Fit modes */}
            <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1 ring-1 ring-white/10">
              <button
                onClick={() => setFitMode("fitPage")}
                className={`rounded-md px-2 py-1 text-xs ${
                  fitMode === "fitPage" ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                Ajustar a pantalla
              </button>
              <button
                onClick={() => setFitMode("fitWidth")}
                className={`rounded-md px-2 py-1 text-xs ${
                  fitMode === "fitWidth" ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                Ajustar a ancho
              </button>
            </div>

            {/* Zoom */}
            <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1 ring-1 ring-white/10">
              <button
                onClick={() =>
                  setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)))
                }
                className="rounded-md px-2 py-1 text-sm hover:bg-white/10"
                title="Zoom -"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-14 text-center text-xs text-white/70">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() =>
                  setZoom((z) => Math.min(2.2, +(z + 0.1).toFixed(2)))
                }
                className="rounded-md px-2 py-1 text-sm hover:bg-white/10"
                title="Zoom +"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="rounded-md px-2 py-1 text-xs hover:bg-white/10"
                title="Reset"
              >
                Reset
              </button>
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/15"
              title="Pantalla completa (F)"
            >
              <Maximize2 className="h-4 w-4" />
              <span className="hidden sm:inline">Pantalla completa</span>
            </button>

            {/* Prev / Next */}
            <button
              onClick={goPrev}
              disabled={page === 1}
              className="rounded-lg bg-white/10 px-3 py-1 text-sm disabled:opacity-40"
            >
              ← Anterior
            </button>

            <button
              onClick={goNext}
              disabled={!numPages || page === numPages}
              className="rounded-lg bg-white/10 px-3 py-1 text-sm disabled:opacity-40"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* VIEWER WRAPPER (entra a fullscreen) */}
      <div
        ref={viewerRef}
        className={[
          "relative overflow-hidden bg-black",
          "border border-white/10",
          isFullscreen
            ? "fixed inset-0 z-[9999] h-[100dvh] w-[100dvw] border-0"
            : "h-[calc(100vh-240px)] rounded-xl",
        ].join(" ")}
        onClick={onViewerTap}
      >
        {/* Fallback backdrop para pseudo fullscreen */}
        {isFullscreen && !document.fullscreenElement && (
          <div className="absolute inset-0 -z-10 bg-black" />
        )}

        {/* Controles flotantes (solo fullscreen) */}
        {isFullscreen && (
          <div
            className={[
              "absolute left-0 top-0 z-20 w-full px-3 pt-3",
              "transition-all duration-200",
              controlsVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-2xl bg-black/55 px-3 py-2 ring-1 ring-white/10 backdrop-blur">
              {/* Left: navegación */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                    showControlsTemporarily();
                  }}
                  disabled={page === 1}
                  className="rounded-xl bg-white/10 p-2 disabled:opacity-40"
                  title="Anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                    showControlsTemporarily();
                  }}
                  disabled={!numPages || page === numPages}
                  className="rounded-xl bg-white/10 p-2 disabled:opacity-40"
                  title="Siguiente"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Middle: página */}
              <div className="flex items-center gap-2 text-white">
                <span className="text-xs text-white/70">
                  {page} {numPages ? `/ ${numPages}` : ""}
                </span>

                <div className="flex items-center gap-2 rounded-xl bg-white/5 px-2 py-1 ring-1 ring-white/10">
                  <span className="text-[11px] text-white/60">Ir a</span>
                  <input
                    value={pageInput}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      setPageInput(e.target.value.replace(/[^\d]/g, ""))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.stopPropagation();
                        goToPage(pageInput);
                        showControlsTemporarily();
                      }
                    }}
                    className="w-14 bg-transparent text-sm outline-none"
                    inputMode="numeric"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPage(pageInput);
                      showControlsTemporarily();
                    }}
                    className="rounded-lg bg-white/10 px-2 py-1 text-[11px] hover:bg-white/15"
                  >
                    OK
                  </button>
                </div>
              </div>

              {/* Right: zoom + fit + salir */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1 rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFitMode("fitPage");
                      showControlsTemporarily();
                    }}
                    className={`rounded-lg px-2 py-1 text-[11px] ${
                      fitMode === "fitPage"
                        ? "bg-white/15"
                        : "hover:bg-white/10"
                    }`}
                  >
                    Pantalla
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFitMode("fitWidth");
                      showControlsTemporarily();
                    }}
                    className={`rounded-lg px-2 py-1 text-[11px] ${
                      fitMode === "fitWidth"
                        ? "bg-white/15"
                        : "hover:bg-white/10"
                    }`}
                  >
                    Ancho
                  </button>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)));
                    showControlsTemporarily();
                  }}
                  className="rounded-xl bg-white/10 p-2"
                  title="Zoom -"
                >
                  <Minus className="h-5 w-5" />
                </button>

                <span className="hidden sm:block min-w-12 text-center text-xs text-white/70">
                  {Math.round(zoom * 100)}%
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoom((z) => Math.min(2.2, +(z + 0.1).toFixed(2)));
                    showControlsTemporarily();
                  }}
                  className="rounded-xl bg-white/10 p-2"
                  title="Zoom +"
                >
                  <Plus className="h-5 w-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
                  title="Salir (F)"
                >
                  <Minimize2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </div>
            </div>

            {/* Hint abajo */}
            <div className="mx-auto mt-2 max-w-5xl text-center text-[11px] text-white/60">
              Toca la pantalla para mostrar/ocultar controles · <b>F</b>{" "}
              pantalla completa · <b>ESC</b> salir · ← → navegar
            </div>
          </div>
        )}

        {/* Inner: el que medimos para fit */}
        <div ref={ref} className="h-full w-full">
          {pdfError ? (
            <div className="p-6 text-red-200">{pdfError}</div>
          ) : !file ? (
            <div className="p-6 text-white/70">Cargando PDF…</div>
          ) : (
            <div className="h-full w-full overflow-auto">
              <div
                className={[
                  "min-h-full w-full flex justify-center items-center",
                  isFullscreen ? "p-2" : "p-3",
                ].join(" ")}
              >
                <Document
                  file={file}
                  onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
                  onLoadError={(err) => {
                    console.error("react-pdf load error:", err);
                    setPdfError(
                      "Error al renderizar el PDF (ver consola F12)."
                    );
                  }}
                  loading={
                    <div className="p-6 text-white/70">Cargando PDF…</div>
                  }
                >
                  <Page
                    pageNumber={page}
                    scale={computedScale}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    onLoadSuccess={(p) => {
                      const vp = p.getViewport({ scale: 1 });
                      setPageDims({ w: vp.width, h: vp.height });
                    }}
                  />
                </Document>
              </div>
            </div>
          )}

          {/* WATERMARK */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
            <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-12 p-12 text-white/70">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="rotate-[-25deg] select-none text-[10px] tracking-wide"
                >
                  {watermarkText}
                </span>
              ))}
            </div>
          </div>

          {/* Botones laterales (tap friendly) solo fullscreen, tipo Kindle */}
          {isFullscreen && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                  showControlsTemporarily();
                }}
                disabled={page === 1}
                className="absolute left-0 top-0 z-10 h-full w-1/5 disabled:opacity-40"
                aria-label="Anterior"
                title="Anterior"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                  showControlsTemporarily();
                }}
                disabled={!numPages || page === numPages}
                className="absolute right-0 top-0 z-10 h-full w-1/5 disabled:opacity-40"
                aria-label="Siguiente"
                title="Siguiente"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
