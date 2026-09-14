import { HeroCarousel } from "@/components/HeroCarousel";
import { siteConfig } from "@/config/site";
import Link from "next/link";

const highlights = [
  { href: "/sobre", title: "Sobre", image: siteConfig.images.centro },
  { href: "/como-jogar", title: "Como jogar", image: siteConfig.bannerDiscord },
  { href: "/sistemas", title: "Sistemas", image: siteConfig.images.veiculos },
  { href: "/empregos", title: "Empregos", image: siteConfig.images.mecanica },
  { href: "/organizacoes", title: "Organizações", image: siteConfig.images.policia },
  { href: "/eventos", title: "Eventos", image: siteConfig.images.eventos },
  { href: "/noticias", title: "Notícias", image: siteConfig.images.economia },
];

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <section className="bg-black px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <Link key={item.href} href={item.href} prefetch className="group relative min-h-[180px] overflow-hidden rounded-2xl">
              <img src={item.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 flex h-full items-end p-5">
                <h2 className="font-display text-2xl">{item.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
