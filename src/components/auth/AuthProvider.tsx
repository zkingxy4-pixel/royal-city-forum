"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PortalSession } from "@/lib/portal-cookie";

export type PortalUser = PortalSession;

type AuthContextValue = {
  user: PortalUser | null;
  ready: boolean;
  login: (identifier: string, password: string) => Promise<string | null>;
  register: (nickname: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: PortalUser | null;
}) {
  const [user, setUser] = useState<PortalUser | null>(initialUser);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    setUser(initialUser);
    setReady(true);
  }, [initialUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      login: async () => "Use o formulário de entrar.",
      register: async () => "Use o formulário de criar conta.",
      logout: async () => {
        await fetch("/api/portal/logout", { method: "POST" });
        window.location.href = "/entrar";
      },
    }),
    [user, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro do AuthProvider");
  return ctx;
}
