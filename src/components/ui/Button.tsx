"use client";

import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "discord" | "instagram";

function DiscordMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`shrink-0 fill-current ${className}`}>
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.89 3c-.2.36-.43.85-.59 1.23a18.3 18.3 0 0 0-6.6 0A12.7 12.7 0 0 0 8.1 3a19.7 19.7 0 0 0-4.44 1.38C.5 9.05-.3 13.58.09 18.06A19.9 19.9 0 0 0 6.1 21c.4-.54.76-1.11 1.07-1.71-.59-.22-1.15-.49-1.68-.8.14-.1.28-.21.41-.32 3.27 1.54 6.82 1.54 10.06 0 .14.11.28.22.41.32-.53.31-1.09.58-1.68.8.31.6.67 1.17 1.07 1.71a19.8 19.8 0 0 0 6.02-2.94c.46-5.18-.78-9.67-3.47-13.69ZM8.02 15.33c-.98 0-1.78-.9-1.78-2.01 0-1.1.79-2.01 1.78-2.01s1.8.91 1.78 2.01c0 1.11-.79 2.01-1.78 2.01Zm7.96 0c-.98 0-1.78-.9-1.78-2.01 0-1.1.79-2.01 1.78-2.01s1.8.91 1.78 2.01c0 1.11-.8 2.01-1.78 2.01Z" />
    </svg>
  );
}

function InstagramMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`shrink-0 fill-current ${className}`}>
      <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.92A3.12 3.12 0 1 1 15.12 12 3.12 3.12 0 0 1 12 15.12ZM17.52 6.96a1.12 1.12 0 1 1-1.12-1.12 1.12 1.12 0 0 1 1.12 1.12ZM21.6 7.2a5.52 5.52 0 0 0-3.48-3.48A9.17 9.17 0 0 0 15.6 3.2H8.4a9.17 9.17 0 0 0-2.52.52A5.52 5.52 0 0 0 2.4 7.2 9.17 9.17 0 0 0 1.88 9.72v4.56A9.17 9.17 0 0 0 2.4 16.8a5.52 5.52 0 0 0 3.48 3.48 9.17 9.17 0 0 0 2.52.52h7.2a9.17 9.17 0 0 0 2.52-.52 5.52 5.52 0 0 0 3.48-3.48 9.17 9.17 0 0 0 .52-2.52V9.72A9.17 9.17 0 0 0 21.6 7.2Zm-1.68 7.02a7.5 7.5 0 0 1-.42 2.1 3.84 3.84 0 0 1-2.18 2.18 7.5 7.5 0 0 1-2.1.42H8.78a7.5 7.5 0 0 1-2.1-.42 3.84 3.84 0 0 1-2.18-2.18 7.5 7.5 0 0 1-.42-2.1V9.78a7.5 7.5 0 0 1 .42-2.1A3.84 3.84 0 0 1 6.68 5.5a7.5 7.5 0 0 1 2.1-.42h6.44a7.5 7.5 0 0 1 2.1.42 3.84 3.84 0 0 1 2.18 2.18 7.5 7.5 0 0 1 .42 2.1Z" />
    </svg>
  );
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3.5 sm:px-6 sm:py-3 min-h-12 text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.12em] sm:tracking-[0.18em] uppercase transition-all duration-300 will-change-transform w-full sm:w-auto";
  const styles: Record<Variant, string> = {
    primary:
      "bg-[#FF0000] text-white shadow-glow hover:brightness-110 sm:hover:scale-[1.04] sm:hover:shadow-glowLg",
    secondary:
      "bg-transparent text-white border border-white/70 hover:border-[#FF0000] hover:text-white hover:shadow-glow hover:scale-[1.03]",
    ghost: "bg-white/5 text-white border border-white/10 hover:border-[#FF0000]/60 hover:bg-white/10",
    discord:
      "bg-[#5865F2] text-white border border-[#5865F2] hover:brightness-110 sm:hover:scale-[1.04]",
    instagram:
      "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white border-0 hover:brightness-110 sm:hover:scale-[1.04]",
  };

  const icon =
    variant === "discord" ? (
      <DiscordMark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    ) : variant === "instagram" ? (
      <InstagramMark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    ) : null;

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  const cls = `${base} ${styles[variant]} ${className}`;

  if (href && href !== "#") {
    const external = href.startsWith("http") || href.startsWith("#");
    if (href.startsWith("/") && !external) {
      return (
        <Link href={href} className={cls}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
