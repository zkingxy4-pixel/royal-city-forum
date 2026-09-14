const ALLOWED = new Set(["/faccao/relatorio", "/influenciadores/candidatar", "/conta"]);

export function safePortalNext(raw: string | null | undefined, fallback = "/conta") {
  const value = String(raw || "").trim();
  if (ALLOWED.has(value)) return value;
  return fallback;
}
