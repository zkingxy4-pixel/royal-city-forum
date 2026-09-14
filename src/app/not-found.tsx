import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh]">
      <img src={siteConfig.page404} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="tracking-[0.4em] text-[#FF0000]">404</p>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl px-2">ESSA RUA NÃO EXISTE.</h1>
        <p className="mt-4 max-w-md text-white/70">
          Você saiu do mapa da Royal City. Volte para o início e continue a história.
        </p>
        <div className="mt-8">
          <Button href="/">VOLTAR AO PORTAL</Button>
        </div>
      </div>
    </div>
  );
}
