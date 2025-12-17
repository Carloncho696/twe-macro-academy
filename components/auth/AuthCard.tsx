"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

type AuthMode = "login" | "register";

interface AuthCardProps {
  mode: AuthMode;
}

export default function AuthCard({ mode }: AuthCardProps) {
  const isLogin = mode === "login";
  const router = useRouter();

  const title = isLogin ? "Iniciar sesión" : "Crear cuenta";
  const description = isLogin
    ? "Ingresa con tu correo y contraseña para acceder a TWE Macro Academy."
    : "Regístrate para acceder al contenido de TWE Macro Academy.";

  const oppositeHref = isLogin ? "/auth/register" : "/auth/login";
  const oppositeText = isLogin
    ? "¿No tienes cuenta? Regístrate aquí"
    : "¿Ya tienes cuenta? Inicia sesión aquí";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      if (!isLogin) {
        if (password !== confirmPassword) {
          setError("Las contraseñas no coinciden.");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Ocurrió un error al autenticar.");
    } finally {
      setLoading(false);
    }
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

        {/* Título */}
        <h1 className="text-2xl font-semibold text-white mb-2">{title}</h1>
        <p className="text-sm text-slate-400 mb-6">{description}</p>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="text-sm text-slate-300">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg bg-[#020617] border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              placeholder="••••••••"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          {/* RESET PASSWORD (SOLO LOGIN) */}
          {isLogin && (
            <div className="text-right">
              <Link
                href="/auth/reset"
                className="text-xs text-cyan-300 hover:underline hover:text-cyan-200"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          )}

          {/* Confirmar contraseña solo en registro */}
          {!isLogin && (
            <div>
              <label className="text-sm text-slate-300">
                Confirmar contraseña
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded-lg bg-[#020617] border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Procesando..." : isLogin ? "Entrar" : "Crear cuenta"}
          </button>
        </form>

        {/* Cambio de modo */}
        <p className="mt-5 text-center text-xs text-slate-400">
          <Link
            href={oppositeHref}
            className="text-cyan-300 hover:underline hover:text-cyan-200"
          >
            {oppositeText}
          </Link>
        </p>
      </div>
    </div>
  );
}
