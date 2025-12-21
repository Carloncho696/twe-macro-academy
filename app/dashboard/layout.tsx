"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Libro Digital", href: "/dashboard/digital-book", icon: "📘" },
  { label: "Videos", href: "/dashboard/videos", icon: "🎥" },
  { label: "Mi Perfil", href: "/dashboard/profile", icon: "👤" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await signOut(auth);
    router.push("/auth/login");
  }

  const email = user?.email ?? "";
  const initial = (email?.[0] ?? "U").toUpperCase();

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-[#050816] text-white flex">
        {/* SIDEBAR (DESKTOP) */}
        <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r border-white/5 bg-[#050816]">
          {/* Logo + título */}
          <div className="h-16 flex items-center px-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-sm">
                T
              </div>
              <div className="leading-tight">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  TWE
                </p>
                <p className="text-sm font-semibold text-white">Macro Academy</p>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            <p className="px-2 mb-2 text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Área de Estudiante
            </p>

            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
                    active
                      ? "bg-yellow-500/10 border border-yellow-500/40 text-yellow-100"
                      : "text-gray-300 hover:text-white hover:bg-white/5",
                  ].join(" ")}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Usuario / Cerrar sesión */}
          <div className="border-t border-white/5 px-4 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-yellow-500/90 flex items-center justify-center text-sm font-semibold text-black">
                {initial}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium">Usuario</p>
                <p className="text-[11px] text-gray-400 truncate max-w-[180px]">
                  {email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full text-xs flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition"
            >
              <span>⏻</span>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </aside>

        {/* CONTENIDO DERECHA */}
        <div className="flex-1 flex flex-col">
          {/* Header superior */}
          <header className="h-16 flex items-center justify-between border-b border-white/5 px-4 md:px-8 bg-[#050816]/80 backdrop-blur">
            <div className="flex items-center gap-3">
              {/* BOTÓN MENÚ (MOBILE) */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
                aria-label="Abrir menú"
              >
                ☰
              </button>

              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                  TWE Macro Academy
                </p>
                <h1 className="text-sm md:text-base font-semibold">
                  Área de Estudiante
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden sm:inline-flex text-xs px-3 py-1.5 rounded-full border border-white/10 text-gray-300 hover:bg-white/5">
                Soporte
              </button>

              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-gray-300">
                {initial}
              </div>
            </div>
          </header>

          {/* Contenido */}
          <main className="flex-1 w-full">
            <div className="max-w-6xl mx-auto w-full px-4 md:px-8 py-6 md:py-8">
              {children}
            </div>
          </main>
        </div>

        {/* MOBILE DRAWER */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* overlay */}
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />

            {/* panel */}
            <aside className="absolute left-0 top-0 h-full w-[84%] max-w-xs border-r border-white/10 bg-[#050816]">
              {/* header drawer */}
              <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-sm">
                    T
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                      TWE
                    </p>
                    <p className="text-sm font-semibold text-white">
                      Macro Academy
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
                  aria-label="Cerrar menú"
                >
                  ✕
                </button>
              </div>

              {/* nav */}
              <nav className="px-4 py-6 space-y-1">
                <p className="px-2 mb-2 text-[11px] uppercase tracking-[0.2em] text-gray-500">
                  Área de Estudiante
                </p>

                {navItems.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
                        active
                          ? "bg-yellow-500/10 border border-yellow-500/40 text-yellow-100"
                          : "text-gray-300 hover:text-white hover:bg-white/5",
                      ].join(" ")}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* footer drawer */}
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 px-4 py-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-yellow-500/90 flex items-center justify-center text-sm font-semibold text-black">
                    {initial}
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-medium">Usuario</p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-xs flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition"
                >
                  <span>⏻</span>
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
