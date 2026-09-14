"use client";

import { ChevronUp } from "lucide-react";

export function BackToTop({ onClick, visible }: { onClick: () => void; visible: boolean }) {
  if (!visible) return null;
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-4 z-40 glass rounded-full p-3 min-h-11 min-w-11 hover:shadow-glow"
      aria-label="Voltar ao topo"
    >
      <ChevronUp size={18} />
    </button>
  );
}
