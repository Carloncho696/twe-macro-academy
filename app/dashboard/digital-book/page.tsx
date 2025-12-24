"use client";

import RequireBookAccess from "@/components/auth/RequireBookAccess";
import { useAuth } from "@/lib/auth-context";
import DigitalBookViewer from "@/components/book/DigitalBookViewer";

export default function DigitalBookPage() {
  const { user } = useAuth();

  const email = user?.email ?? "";
  const uid = user?.uid ?? "";

  return (
    <RequireBookAccess>
      <div className="min-h-[calc(100vh-80px)] px-6 py-10">
        <div className="mx-auto max-w-6xl space-y-4">
          {/* HEADER */}
          <div>
            <h1 className="text-2xl font-semibold text-white">Libro Digital</h1>
            <p className="mt-1 text-sm text-gray-400">
              Lectura privada directamente desde la plataforma.
            </p>
          </div>

          {/* VIEWER */}
          <DigitalBookViewer
            userEmail={email}
            userId={uid}
            pdfUrl="/api/book"
            // HOY: PDF de prueba
            // MAÑANA: cambia a "/api/book"
          />
        </div>
      </div>
    </RequireBookAccess>
  );
}
