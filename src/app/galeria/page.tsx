import { Gallery } from "@/components/Gallery";
import { PageHero, PageWrap } from "@/components/PageHero";
import { siteConfig } from "@/config/site";

export default function GaleriaPage() {
  return (
    <>
      <PageHero image={siteConfig.images.centro} kicker="GALERIA" title="Veja a Royal pelos olhos de quem vive." />
      <PageWrap>
        <Gallery />
      </PageWrap>
    </>
  );
}
