"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { parsePortalSession, PORTAL_COOKIE, type PortalSession } from "@/lib/portal-cookie";

export type PortalUser = PortalSession;

type AuthContextValue = {
  user: PortalUser | null;
  ready: boolean;
  login: (identifier: string, password: string) => Promise<string | null>;
  register: (nickname: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readCookieUser(): PortalUser | null {
  if (typeof document === "undefined") return null;
  const row = document.cookie.split("; ").find((c) => c.startsWith(`${PORTAL_COOKIE}=`));
  if (!row) return null;
  return parsePortalSession(row.slice(PORTAL_COOKIE.length + 1));
}

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
    setUser(initialUser ?? readCookieUser());
    setReady(true);
  }, [initialUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      login: async () => "Use o formulário de entrar.",
      register: async () => "Use o formulário de criar conta.",
      logout: async () => {
        window.location.href = "/api/portal/logout";
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
