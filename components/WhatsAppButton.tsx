"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "51920471499"; // ← cambia por el real (con código país)
  const message = "Hola, quiero más información sobre TWE Macro Academy";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      aria-label="WhatsApp"
      className="
        fixed bottom-5 right-5 z-50
        flex items-center justify-center
        h-14 w-14 rounded-full
        bg-green-500 text-white
        shadow-lg hover:bg-green-600
        transition-all duration-300
      "
    >
      <MessageCircle size={28} />
    </Link>
  );
}
