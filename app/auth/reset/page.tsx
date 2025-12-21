"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  setError(null);

  try {
    setLoading(true);
    await sendPasswordResetEmail(auth, email);
    setSent(true);
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "No se pudo enviar el correo de recuperación.";

    setError(message);
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#050816]/95 backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(8,47,73,0.7)]">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Recuperar contraseña
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        {sent ? (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            Listo. Si ese correo existe, te llegará un enlace para restablecer tu
            contraseña.
            <div className="mt-4">
              <Link
                href="/auth/login"
                className="text-cyan-300 hover:underline hover:text-cyan-200"
              >
                Volver a iniciar sesión
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-slate-300">Correo electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg bg-[#020617] border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                placeholder="tucorreo@gmail.com"
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>

            <p className="text-center text-xs text-slate-400">
              <Link
                href="/auth/login"
                className="text-cyan-300 hover:underline hover:text-cyan-200"
              >
                Volver
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
