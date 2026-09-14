"use client";

import { gallery, galleryCategories } from "@/data/gallery";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function Gallery() {
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>("Todos");
  const [open, setOpen] = useState<string | null>(null);
  const items = useMemo(
    () => gallery.filter((g) => cat === "Todos" || g.category === cat),
    [cat]
  );
  const current = gallery.find((g) => g.id === open);

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [current]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {galleryCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1 text-[11px] tracking-[0.16em] border ${
              cat === c ? "bg-[#FF0000] border-[#FF0000]" : "border-white/15 text-white/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {items.map((g) => (
          <button key={g.id} onClick={() => setOpen(g.id)} className="overflow-hidden rounded-xl group">
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-28 md:h-40 w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </button>
        ))}
      </div>
      {current ? (
        <div className="fixed inset-0 z-[75] bg-black/92 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <button className="absolute right-5 top-5" aria-label="Fechar">
            <X />
          </button>
          <img src={current.src} alt={current.alt} className="max-h-[88vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      ) : null}
    </div>
  );
}
