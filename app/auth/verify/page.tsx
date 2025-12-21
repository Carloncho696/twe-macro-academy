"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/firebase";
import { sendEmailVerification, signOut } from "firebase/auth";
import { useAuth } from "@/lib/auth-context";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Si ya verificó, lo mandamos al dashboard
  useEffect(() => {
    if (loading) return;
    if (!user) return;

    if (user.emailVerified) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  async function handleResend() {
    setErr(null);
    setMsg(null);

  try {
  if (!auth.currentUser) {
    setErr("No hay una sesión activa. Inicia sesión nuevamente.");
    return;
  }

  setSending(true);
  await sendEmailVerification(auth.currentUser);
  setMsg(
    "Listo. Te reenviamos el correo de verificación. Revisa tu bandeja y spam."
  );
} catch (e: unknown) {
  const message =
    e instanceof Error
      ? e.message
      : "No se pudo reenviar el correo. Intenta de nuevo.";

  setErr(message);
} finally {
  setSending(false);
}

  }

  async function handleLogout() {
    await signOut(auth);
    router.replace("/auth/login");
  }

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#050816]/95 backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(8,47,73,0.7)]">
        {/* Branding */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-cyan-300 text-sm font-semibold">
            TWE
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Macro Academy
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-white mb-2">
          Verifica tu correo
        </h1>
        <p className="text-sm text-slate-400">
          Te enviamos un enlace de verificación. Abre tu correo, verifica tu cuenta y vuelve aquí.
        </p>

        {/* Email actual */}
        {user?.email && (
          <div className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
            Correo: <span className="text-white">{user.email}</span>
          </div>
        )}

        {/* Mensajes */}
        {err && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {err}
          </div>
        )}
        {msg && (
          <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            {msg}
          </div>
        )}

        {/* Acciones */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleResend}
            disabled={sending}
            className="w-full rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? "Enviando..." : "Reenviar correo de verificación"}
          </button>

   <button
  onClick={async () => {
    setErr(null);
    setMsg(null);

    try {
      if (!auth.currentUser) {
        setErr("No hay una sesión activa. Inicia sesión nuevamente.");
        return;
      }

      // 🔥 refresca el estado real del usuario
      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        router.replace("/dashboard");
        return;
      }

      setErr(
        "Aún no aparece como verificado. Espera unos segundos y vuelve a intentar."
      );
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? e.message
          : "No se pudo actualizar el estado. Intenta de nuevo.";

      setErr(message);
    }
  }}
  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
>
  Ya verifiqué, actualizar
</button>



          <button
            onClick={handleLogout}
            className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5 transition"
          >
            Cerrar sesión
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          ¿Te equivocaste de correo?{" "}
          <Link
            href="/auth/register"
            className="text-cyan-300 hover:underline hover:text-cyan-200"
          >
            Crear otra cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
