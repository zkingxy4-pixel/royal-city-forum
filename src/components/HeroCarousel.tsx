"use client";

import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

export function HeroCarousel() {
  const slides = siteConfig.carousel;
  const [index, setIndex] = useState(0);
  const current = slides[index];
  const next = slides[(index + 1) % slides.length];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <img
        key={current.src}
        src={current.src}
        alt={current.title}
        fetchPriority="high"
        decoding="async"
        className="hero-slide absolute inset-0 object-cover"
      />
      <img src={next.src} alt="" className="hidden" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6">
        <h1>
          <img
            src={siteConfig.logo}
            alt="Royal City RP"
            fetchPriority="high"
            className="h-28 w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:h-40 md:h-52"
          />
        </h1>
        <p className="mt-6 max-w-lg text-sm uppercase tracking-[0.22em] text-white/85">{current.title}</p>
      </div>
    </section>
  );
}
