// app/auth/layout.tsx
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center">
      {children}
    </div>
  );
}
