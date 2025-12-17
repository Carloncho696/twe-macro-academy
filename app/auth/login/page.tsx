"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  // Evita flicker mientras Firebase valida sesión
  if (loading) return null;

  return <AuthCard mode="login" />;
}
