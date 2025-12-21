"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    if (!user.emailVerified) {
      router.replace("/auth/verify");
      return;
    }

    router.replace("/dashboard");
  }, [user, loading, router]);

  if (loading) return null;

  return <AuthCard mode="register" />;
}
