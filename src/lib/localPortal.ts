export type PortalUser = {
  nickname: string;
  email?: string;
  id?: number;
};

const USERS_KEY = "royal_local_users";
const SESSION_KEY = "royal_local_session";
const INFLUENCERS_KEY = "royal_local_influencer_requests";

type LocalUser = PortalUser & { passwordHash: string };

function hashPassword(password: string) {
  return `royal:${password}`;
}

function readUsers(): LocalUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: LocalUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function readLocalSession(): PortalUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as PortalUser) : null;
  } catch {
    return null;
  }
}

export function writeLocalSession(user: PortalUser | null) {
  if (typeof window === "undefined") return;
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ nickname: user.nickname, email: user.email }));
}

function publicUser(user: LocalUser): PortalUser {
  return { nickname: user.nickname, email: user.email };
}

export function localRegister(nickname: string, email: string, password: string) {
  const users = readUsers();
  const nick = nickname.trim();
  const mail = email.trim().toLowerCase();
  if (users.some((u) => u.email === mail)) return "Este e-mail já possui conta no portal.";
  if (users.some((u) => u.nickname.toLowerCase() === nick.toLowerCase())) return "Este apelido já está em uso.";
  const user: LocalUser = { nickname: nick, email: mail, passwordHash: hashPassword(password) };
  writeUsers([...users, user]);
  return publicUser(user);
}

export function localLogin(identifier: string, password: string) {
  const id = identifier.trim().toLowerCase();
  const users = readUsers();
  const found = users.find((u) => u.email === id || u.nickname.toLowerCase() === id);
  if (!found || found.passwordHash !== hashPassword(password)) {
    return "E-mail, apelido ou senha inválidos.";
  }
  const user = publicUser(found);
  writeLocalSession(user);
  return user;
}

export function saveLocalInfluencerRequest(payload: Record<string, string>) {
  try {
    const current = JSON.parse(localStorage.getItem(INFLUENCERS_KEY) || "[]");
    current.push({ ...payload, createdAt: new Date().toISOString() });
    localStorage.setItem(INFLUENCERS_KEY, JSON.stringify(current));
  } catch {
    undefined;
  }
}
