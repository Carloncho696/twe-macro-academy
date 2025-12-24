"use client";

import { useEffect } from "react";
import AboutSection from "@/components/landing/AboutSection";

export default function NosotrosPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950">
      <AboutSection mode="page" />
    </main>
  );
}
