"use client";

import { siteConfig } from "@/config/site";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(false);
      return;
    }
    const t = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 18));
    }, 180);
    const hide = setTimeout(() => setVisible(false), 1600);
    return () => {
      clearInterval(t);
      clearTimeout(hide);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <img src={siteConfig.loading} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
          <div className="relative z-10 text-center px-6">
            <img src={siteConfig.logo} alt="Royal City RP" className="mx-auto h-24 sm:h-32 w-auto object-contain" />
            <p className="mt-6 text-xs tracking-[0.5em] text-white/70">CARREGANDO...</p>
            <div className="mx-auto mt-8 h-[2px] w-48 overflow-hidden bg-white/15">
              <div className="h-full bg-[#FF0000]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
