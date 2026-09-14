"use client";

import { motion } from "framer-motion";

export function Card({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className={`glass rounded-2xl p-5 md:p-6 text-left shadow-[0_10px_40px_rgba(0,0,0,0.45)] hover:border-[#FF0000]/40 hover:shadow-glow ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  kicker,
  title,
  subtitle,
  align = "left",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-4xl" : "max-w-4xl"}>
      {kicker ? (
        <p className="mb-3 text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.45em] text-[#FF0000]">{kicker}</p>
      ) : null}
      <h2 className="font-display text-[1.7rem] sm:text-3xl md:text-5xl lg:text-6xl leading-tight red-glow-title">{title}</h2>
      {subtitle ? <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed">{subtitle}</p> : null}
      <div className="tech-line mt-6 h-px w-24" />
    </div>
  );
}
