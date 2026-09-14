"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 pt-32">
        <p className="text-sm tracking-[0.2em] uppercase text-white/50">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black px-4 pt-32 pb-16">
        <div className="glass mx-auto w-full max-w-md rounded-2xl p-6 sm:p-8">
          <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">ACESSO DO PORTAL</p>
          <h1 className="mt-3 font-display text-3xl">Entre para continuar.</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Entre ou crie a sua conta no portal para continuar.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Button href="/entrar" className="w-full">
              ENTRAR
            </Button>
            <Button href="/criar-conta" variant="secondary" className="w-full">
              CRIAR CONTA
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
