"use client";

import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp({ phone }: { phone: string | null | undefined }) {
  if (!phone) return null;

  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;

  const href = `https://wa.me/${digits}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-105 hover:shadow-xl sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
      </span>
    </a>
  );
}
