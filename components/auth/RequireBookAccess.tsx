"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function RequireBookAccess({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { loading, user, profile } = useAuth();

  const ok = !!profile?.hasBookAccess;

  useEffect(() => {
    if (loading) return;
    if (!user) return; // ProtectedRoute ya debería manejar esto
    if (!ok) router.replace("/dashboard");
  }, [loading, user, ok, router]);

  if (loading) return null;
  if (user && !ok) return null;

  return <>{children}</>;
}
