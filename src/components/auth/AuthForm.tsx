"use client";

import { Button } from "@/components/ui/Button";
import { hasInstagram, siteConfig } from "@/config/site";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

const fieldClass =
  "rounded-md border border-white/10 bg-black/50 px-3 py-3 text-sm text-white normal-case tracking-normal";

function SocialButtons() {
  return (
    <div className={`mt-4 grid gap-3 ${hasInstagram ? "grid-cols-2" : "grid-cols-1"}`}>
      <Button href={siteConfig.DISCORD_URL} variant="discord" className="w-full">
        DISCORD
      </Button>
      {hasInstagram ? (
        <Button href={siteConfig.INSTAGRAM_URL} variant="instagram" className="w-full">
          INSTAGRAM
        </Button>
      ) : null}
    </div>
  );
}

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { login, register } = useAuth();
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [createdName, setCreatedName] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setPending(true);
    try {
      if (mode === "register") {
        const nick = nickname.trim();
        const mail = email.trim();
        if (nick.length < 2) {
          setError("Informe um apelido com pelo menos 2 caracteres.");
          return;
        }
        if (!mail.includes("@")) {
          setError("Informe um e-mail válido.");
          return;
        }
        if (password.length < 6) {
          setError("A senha precisa ter pelo menos 6 caracteres.");
          return;
        }
        const message = await register(nick, mail, password);
        if (message) {
          setError(message);
          return;
        }
        setCreatedName(nick);
        return;
      }

      if (!identifier.trim() || password.length < 6) {
        setError("Informe e-mail/apelido e uma senha com pelo menos 6 caracteres.");
        return;
      }
      const message = await login(identifier.trim(), password);
      if (message) {
        setError(message);
        return;
      }
      router.push("/conta");
    } catch (err) {
      console.error(err);
      setError(mode === "register" ? "Não foi possível criar a conta." : "Não foi possível entrar.");
    } finally {
      setPending(false);
    }
  }

  if (createdName) {
    return (
      <div className="glass mx-auto w-full max-w-md rounded-2xl p-6 sm:p-8" role="status">
        <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">CONTA CRIADA</p>
        <h1 className="mt-3 font-display text-3xl">Bem-vindo, {createdName}.</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          Sua conta foi criada. Agora entre com o mesmo apelido ou e-mail e a senha.
        </p>
        <div className="mt-8">
          <Button href="/entrar" className="w-full">
            ENTRAR
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass mx-auto w-full max-w-md rounded-2xl p-6 sm:p-8">
      <h1 className="font-display text-3xl">{mode === "login" ? "Entrar" : "Criar conta"}</h1>
      {mode === "register" ? (
        <label className="mt-6 grid gap-1 text-xs uppercase tracking-[0.16em] text-white/50">
          Apelido
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            autoComplete="username"
            className={fieldClass}
          />
        </label>
      ) : (
        <label className="mt-6 grid gap-1 text-xs uppercase tracking-[0.16em] text-white/50">
          E-mail ou apelido
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            autoComplete="username"
            className={fieldClass}
          />
        </label>
      )}
      {mode === "register" ? (
        <label className="mt-4 grid gap-1 text-xs uppercase tracking-[0.16em] text-white/50">
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            autoComplete="email"
            className={fieldClass}
          />
        </label>
      ) : null}
      <label className="mt-4 grid gap-1 text-xs uppercase tracking-[0.16em] text-white/50">
        Senha
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className={fieldClass}
        />
      </label>
      {error ? <p className="mt-4 text-sm text-[#FF0000]">{error}</p> : null}
      <div className="mt-6">
        <button
          type="button"
          disabled={pending}
          onClick={handleClick}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#FF0000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-glow disabled:opacity-60"
        >
          {pending ? "AGUARDE..." : mode === "login" ? "ENTRAR" : "CRIAR CONTA"}
        </button>
      </div>
      <div className="mt-3">
        {mode === "login" ? (
          <Button href="/criar-conta" variant="secondary" className="w-full">
            CRIAR CONTA
          </Button>
        ) : (
          <Button href="/entrar" variant="secondary" className="w-full">
            ENTRAR
          </Button>
        )}
      </div>
      <SocialButtons />
    </div>
  );
}

export { SocialButtons };
