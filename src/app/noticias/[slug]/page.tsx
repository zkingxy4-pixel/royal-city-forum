import { news } from "@/data/news";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  return { title: item?.title || "Notícia" };
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <div className="min-h-screen bg-black px-4 pt-24 pb-16 sm:px-6 md:pt-16">
      <div className="mx-auto max-w-3xl">
        <Button href="/noticias" variant="ghost" className="!px-4 !py-2">
          VOLTAR PARA NOTÍCIAS
        </Button>
        <img src={item.image} alt="" className="mt-8 h-48 sm:h-72 w-full rounded-2xl object-cover" />
        <p className="mt-6 text-xs tracking-[0.3em] text-[#FF0000]">
          {item.category} · {item.date}
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{item.title}</h1>
        <div className="mt-6 space-y-4 text-white/75 leading-relaxed">
          {item.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
