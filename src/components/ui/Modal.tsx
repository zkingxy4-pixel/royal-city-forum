"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative glass w-full max-w-2xl max-h-[86vh] overflow-y-auto custom-scroll rounded-2xl p-6 md:p-8 border-[#FF0000]/30">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-white/70 hover:text-white"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>
        <h3 className="font-display text-2xl md:text-3xl pr-10">{title}</h3>
        <div className="mt-4 text-white/75 leading-relaxed text-sm md:text-base">{children}</div>
      </div>
    </div>
  );
}
