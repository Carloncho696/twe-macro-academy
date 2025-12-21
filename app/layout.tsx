import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth-context";
import WhatsAppButton from "@/components/WhatsAppButton";


export const metadata: Metadata = {
  title: "TWE Macro Academy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-50 antialiased">
        <AuthProvider>
          <Navbar />
          <main className="pt-20 md:pt-24">{children}</main>
          <Footer />
        </AuthProvider>
        <WhatsAppButton />

      </body>
    </html>
  );
}
