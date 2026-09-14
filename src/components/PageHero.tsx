import { Button } from "@/components/ui/Button";

export function PageHero({
  image,
  kicker,
  title,
  text,
  cta,
  ctaHref,
}: {
  image: string;
  kicker: string;
  title: string;
  text?: string;
  cta?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative min-h-[42vh] overflow-hidden pt-24 sm:pt-28">
      <img src={image} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] tracking-[0.35em] text-[#FF0000]">{kicker}</p>
        <h1 className="red-glow-title mt-3 font-display text-3xl leading-tight sm:text-5xl md:text-6xl">{title}</h1>
        {text ? <p className="mt-4 max-w-2xl text-white/70">{text}</p> : null}
        {cta && ctaHref ? (
          <div className="mt-8">
            <Button href={ctaHref}>{cta}</Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function PageWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">{children}</div>;
}

export function EmptyState({ title, text, href, cta }: { title: string; text: string; href?: string; cta?: string }) {
  return (
    <div className="glass rounded-2xl p-8 text-center md:p-12">
      <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-white/65">{text}</p>
      {href && cta ? (
        <div className="mt-6 flex justify-center">
          <Button href={href}>{cta}</Button>
        </div>
      ) : null}
    </div>
  );
}
