import { PageHero, PageWrap } from "@/components/PageHero";
import { NewsCard } from "@/components/cards";
import { siteConfig } from "@/config/site";
import { news } from "@/data/news";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notícias" };

export default function NoticiasPage() {
  return (
    <>
      <PageHero image={siteConfig.images.economia} kicker="NOTÍCIAS" title="Fique por dentro." />
      <PageWrap>
        <div className="grid gap-4 md:grid-cols-2">
          {news.map((n) => (
            <NewsCard
              key={n.slug}
              title={n.title}
              category={n.category}
              date={n.date}
              image={n.image}
              excerpt={n.excerpt}
              href={`/noticias/${n.slug}`}
            />
          ))}
        </div>
      </PageWrap>
    </>
  );
}
