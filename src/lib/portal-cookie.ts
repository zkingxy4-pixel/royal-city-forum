export const PORTAL_COOKIE = "royal_portal";

export type PortalSession = { nickname: string };

export function serializePortalSession(user: PortalSession) {
  return JSON.stringify(user);
}

export function parsePortalSession(raw?: string | null): PortalSession | null {
  if (!raw) return null;

  const attempts = [raw];
  try {
    attempts.push(decodeURIComponent(raw));
  } catch {
    /* ignore */
  }
  try {
    attempts.push(decodeURIComponent(decodeURIComponent(raw)));
  } catch {
    /* ignore */
  }

  for (const value of attempts) {
    try {
      const data = JSON.parse(value) as { nickname?: unknown };
      if (typeof data?.nickname === "string" && data.nickname.trim()) {
        return { nickname: data.nickname };
      }
    } catch {
      /* next */
    }
  }

  return null;
}
