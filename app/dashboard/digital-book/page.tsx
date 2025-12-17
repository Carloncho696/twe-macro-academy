"use client";

import RequireBookAccess from "@/components/auth/RequireBookAccess";

export default function DigitalBookPage() {
  return (
    <RequireBookAccess>
      <div className="min-h-[calc(100vh-80px)] px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl font-semibold text-white">Libro Digital</h1>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
            <iframe
              title="Libro PDF"
              className="h-[70vh] w-full rounded-xl border border-white/10 bg-slate-950"
            />
          </div>
        </div>
      </div>
    </RequireBookAccess>
  );
}
