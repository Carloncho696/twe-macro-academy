"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // 1) Si no hay usuario -> login
    if (!user) {
      router.replace("/auth/login");
      return;
    }

    // 2) Si hay usuario pero NO verificó -> verify
    if (!user.emailVerified) {
      router.replace("/auth/verify");
      return;
    }
  }, [loading, user, router]);

  if (loading) return null;
  if (!user) return null;

  // Mientras redirige a /auth/verify, evitamos renderizar children
  if (!user.emailVerified) return null;

  return <>{children}</>;
}
