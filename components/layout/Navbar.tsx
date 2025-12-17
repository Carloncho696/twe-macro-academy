"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import { useAuth } from "@/lib/auth-context";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Sobre la Academia", href: "/#about" },
  { label: "Metodología", href: "/#methodology" },
  { label: "El Libro", href: "/#book" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { user, loading } = useAuth();

  async function handleLogout() {
    try {
      await signOut(auth);
      setOpen(false);
      router.push("/auth/login");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#050b14]/95 backdrop-blur-md border-b border-white/5">
      <nav className="mx-auto flex h-20 max-w-6xl items-center gap-6 px-4 md:px-6">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
          onClick={() => setOpen(false)}
        >
          <div className="relative h-20 w-20">
            <Image
              src="/logoblanco.png"
              alt="Logo TWE Macro Academy"
              fill
              className="object-contain"
              priority
              sizes="80px"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-bold text-white">TWE</span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-300">
              Macro Academy
            </span>
          </div>
        </Link>

        {/* NAV CENTRADO (DESKTOP) */}
        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex items-center gap-10 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-[#f6c623] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA DERECHA (DESKTOP) */}
        <div className="hidden items-center gap-4 md:flex shrink-0">
          {loading ? (
            // Skeleton mientras Firebase resuelve sesión
            <div className="flex items-center gap-4">
              <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
              <div className="h-9 w-28 rounded-lg bg-white/10 animate-pulse" />
            </div>
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-100 hover:text-white"
              >
                Dashboard
              </Link>

              <span className="text-xs text-slate-300 max-w-[220px] truncate">
                {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg px-5 py-2 text-sm font-semibold text-black 
                bg-gradient-to-r from-[#00E5BE] to-[#00C7FF]
                shadow-[0_0_25px_rgba(0,199,255,0.45)]
                hover:brightness-110 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-slate-100 hover:text-white"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/auth/register"
                className="rounded-lg px-6 py-2 text-sm font-semibold text-black 
                bg-gradient-to-r from-[#00E5BE] to-[#00C7FF]
                shadow-[0_0_25px_rgba(0,199,255,0.45)]
                hover:brightness-110 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* BOTÓN MOBILE */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="ml-auto text-slate-100 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#050b14]/98 px-4 pb-4 pt-2">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5 hover:text-[#f6c623] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-3 border-t border-white/10 pt-3 flex flex-col gap-2">
              {loading ? (
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-28 rounded bg-white/10 animate-pulse" />
                  <div className="h-10 w-full rounded-lg bg-white/10 animate-pulse" />
                </div>
              ) : user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="text-sm text-slate-200"
                  >
                    Dashboard
                  </Link>

                  <span className="text-xs text-slate-400 px-1 truncate">
                    {user.email}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="rounded-lg px-4 py-2 text-center text-sm font-semibold text-black 
                    bg-gradient-to-r from-[#00E5BE] to-[#00C7FF]
                    shadow-[0_0_25px_rgba(0,199,255,0.45)]
                    hover:brightness-110 transition"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="text-sm text-slate-200"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-2 text-center text-sm font-semibold text-black 
                    bg-gradient-to-r from-[#00E5BE] to-[#00C7FF]
                    shadow-[0_0_25px_rgba(0,199,255,0.45)]
                    hover:brightness-110 transition"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
