"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";

type Row = {
  id: string; // uid (doc id)
  email: string;
  role: "admin" | "student";
  hasBookAccess?: boolean;
  hasVideoAccess?: boolean;
};

export default function AdminPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const isAdmin = useMemo(() => profile?.role === "admin", [profile]);

  const [rows, setRows] = useState<Row[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");

  // loading states por botón
  const [saving, setSaving] = useState<{
    id: string;
    field: "book" | "video";
  } | null>(null);

async function loadUsers() {
  setFetching(true);
  try {
    const snap = await getDocs(collection(db, "users"));

    const data: Row[] = snap.docs.map((d) => {
      const raw = d.data() as Partial<Row>;

      return {
        id: d.id,
        email: raw.email ?? "",
        role: (raw.role ?? "student") as Row["role"],
        hasBookAccess: !!raw.hasBookAccess,
        hasVideoAccess: !!raw.hasVideoAccess,
      };
    });

    setRows(data);
  } finally {
    setFetching(false);
  }
}


  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (!isAdmin) {
      router.push("/dashboard");
      return;
    }

    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user, isAdmin]);

  const filteredAndSorted = useMemo(() => {
    const term = search.toLowerCase().trim();

    const filtered = rows.filter((r) =>
      (r.email || "").toLowerCase().includes(term)
    );

    return filtered.sort((a, b) => {
      // Admin arriba
      if (a.role === "admin" && b.role !== "admin") return -1;
      if (b.role === "admin" && a.role !== "admin") return 1;

      // Pendientes arriba (si le falta libro o videos)
      const aPending = !a.hasBookAccess || !a.hasVideoAccess;
      const bPending = !b.hasBookAccess || !b.hasVideoAccess;

      if (aPending && !bPending) return -1;
      if (!aPending && bPending) return 1;

      // fallback: email
      return (a.email || "").localeCompare(b.email || "");
    });
  }, [rows, search]);

  async function toggleField(r: Row, field: "book" | "video") {
    const docRef = doc(db, "users", r.id);

    const key = field === "book" ? "hasBookAccess" : "hasVideoAccess";
    const current = !!(field === "book" ? r.hasBookAccess : r.hasVideoAccess);
    const next = !current;

    setSaving({ id: r.id, field });

    try {
      await updateDoc(docRef, { [key]: next });

      setRows((prev) =>
        prev.map((x) => {
          if (x.id !== r.id) return x;
          return field === "book"
            ? { ...x, hasBookAccess: next }
            : { ...x, hasVideoAccess: next };
        })
      );
    } finally {
      setSaving(null);
    }
  }

  if (loading) return null;
  if (!user) return null;
  if (!isAdmin) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 text-white">
      {/* HEADER */}
      <div className="flex items-end justify-between gap-4 flex-col md:flex-row">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
            Admin
          </p>
          <h1 className="text-2xl font-semibold">Usuarios y accesos</h1>
          <p className="mt-1 text-sm text-gray-300">
            Controla el acceso al <span className="text-white">Libro</span> y a
            los <span className="text-white">Videos</span>. Los pendientes
            aparecen arriba.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar por email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
          />

          <button
            onClick={loadUsers}
            className="text-xs px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5"
          >
            Recargar
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-gray-400 border-b border-white/10">
          <div className="col-span-5">Email</div>
          <div className="col-span-2">Rol</div>
          <div className="col-span-2">Libro</div>
          <div className="col-span-2">Videos</div>
          <div className="col-span-1 text-right"></div>
        </div>

        {fetching ? (
          <div className="px-4 py-6 text-sm text-gray-300">Cargando...</div>
        ) : filteredAndSorted.length === 0 ? (
          <div className="px-4 py-6 text-sm text-gray-300">
            {rows.length === 0
              ? "Aún no hay usuarios."
              : "No hay resultados con ese email."}
          </div>
        ) : (
          filteredAndSorted.map((r) => {
            const bookOn = !!r.hasBookAccess;
            const videoOn = !!r.hasVideoAccess;
            const pending = !bookOn || !videoOn;

            return (
              <div
                key={r.id}
                className="grid grid-cols-12 gap-2 px-4 py-3 items-center border-b border-white/5"
              >
                <div className="col-span-5 text-sm truncate flex items-center gap-2">
                  <span className="truncate">{r.email}</span>
                  {r.role !== "admin" && pending && (
                    <span className="text-[10px] px-2 py-1 rounded-full border border-yellow-400/30 bg-yellow-500/10 text-yellow-200">
                      Pendiente
                    </span>
                  )}
                </div>

                <div className="col-span-2 text-sm text-gray-300">{r.role}</div>

                {/* Libro */}
                <div className="col-span-2 flex items-center gap-2">
                  <span
                    className={[
                      "text-xs px-2 py-1 rounded-full border",
                      bookOn
                        ? "bg-emerald-500/15 border-emerald-400/30"
                        : "bg-red-500/15 border-red-400/30",
                    ].join(" ")}
                  >
                    {bookOn ? "Activo" : "Bloqueado"}
                  </span>

                  <button
                    disabled={
                      r.role === "admin" ||
                      (saving?.id === r.id && saving.field === "book")
                    }
                    onClick={() => toggleField(r, "book")}
                    className="text-xs px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-40"
                    title={r.role === "admin" ? "No se cambia al admin" : ""}
                  >
                    {saving?.id === r.id && saving.field === "book"
                      ? "..."
                      : bookOn
                      ? "Quitar"
                      : "Dar"}
                  </button>
                </div>

                {/* Videos */}
                <div className="col-span-2 flex items-center gap-2">
                  <span
                    className={[
                      "text-xs px-2 py-1 rounded-full border",
                      videoOn
                        ? "bg-emerald-500/15 border-emerald-400/30"
                        : "bg-red-500/15 border-red-400/30",
                    ].join(" ")}
                  >
                    {videoOn ? "Activo" : "Bloqueado"}
                  </span>

                  <button
                    disabled={
                      r.role === "admin" ||
                      (saving?.id === r.id && saving.field === "video")
                    }
                    onClick={() => toggleField(r, "video")}
                    className="text-xs px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-40"
                    title={r.role === "admin" ? "No se cambia al admin" : ""}
                  >
                    {saving?.id === r.id && saving.field === "video"
                      ? "..."
                      : videoOn
                      ? "Quitar"
                      : "Dar"}
                  </button>
                </div>

                <div className="col-span-1 text-right text-xs text-gray-400"></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
