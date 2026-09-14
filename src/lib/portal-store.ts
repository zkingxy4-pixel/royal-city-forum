import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { compare, hash } from "bcryptjs";
import { clip, isSafeText, isStrongPassword, isValidNickname } from "@/lib/security";

export type PortalUser = { nickname: string };

type StoredUser = PortalUser & { email?: string; passwordHash: string };

const filePath = path.join(process.cwd(), "data", "users.json");
const MAX = {
  short: 80,
  medium: 160,
  long: 400,
  story: 2000,
};

async function hashPassword(password: string) {
  return hash(password, 12);
}

async function loadUsers(): Promise<StoredUser[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

async function saveUsers(users: StoredUser[]) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(users, null, 2), "utf8");
}

export async function registerPortalUser(nickname: string, password: string) {
  const nick = nickname.trim();
  if (!isValidNickname(nick)) return "Use um apelido de 2 a 32 caracteres (letras, números, ponto, _ ou -).";
  if (!isStrongPassword(password)) return "A senha precisa ter pelo menos 8 caracteres.";

  const users = await loadUsers();
  if (users.some((u) => u.nickname.toLowerCase() === nick.toLowerCase())) return "Este apelido já está em uso.";

  users.push({ nickname: nick, passwordHash: await hashPassword(password) });
  await saveUsers(users);
  return { nickname: nick };
}

export async function loginPortalUser(identifier: string, password: string) {
  const id = identifier.trim().toLowerCase();
  const users = await loadUsers();
  const found = users.find((u) => u.nickname.toLowerCase() === id);
  if (!found || !password) {
    return "Apelido ou senha inválidos.";
  }

  let matches = false;
  if (found.passwordHash.startsWith("royal:")) {
    matches = found.passwordHash === `royal:${password}`;
    if (matches) {
      found.passwordHash = await hashPassword(password);
      await saveUsers(users);
    }
  } else {
    matches = await compare(password, found.passwordHash);
  }

  if (!matches) return "Apelido ou senha inválidos.";
  return { nickname: found.nickname };
}

async function appendJson(fileName: string, row: Record<string, string>) {
  const file = path.join(process.cwd(), "data", fileName);
  let rows: Record<string, string>[] = [];
  try {
    rows = JSON.parse(await readFile(file, "utf8")) as Record<string, string>[];
  } catch {
    rows = [];
  }
  rows.push(row);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(rows, null, 2), "utf8");
}

export async function saveInfluencerRequest(fields: Record<string, string>, nickname: string) {
  const required: Array<[string, number]> = [
    ["nome", MAX.medium],
    ["instagram", MAX.short],
    ["canal", MAX.short],
    ["plataforma", MAX.short],
    ["seguidores", 40],
    ["views", 40],
    ["perfil", MAX.medium],
    ["conteudo", MAX.medium],
    ["motivo", MAX.story],
  ];
  if (required.some(([key, max]) => !isSafeText(String(fields[key] || ""), max))) {
    return "Preencha todos os campos do relatório com texto válido.";
  }

  const protocol = `RC-${Date.now().toString().slice(-8)}`;
  await appendJson("influencer-requests.json", {
    protocol,
    nickname,
    createdAt: new Date().toISOString(),
    ...Object.fromEntries(required.map(([key, max]) => [key, clip(String(fields[key] || ""), max)])),
  });
  return { protocol };
}

export async function saveFactionRequest(fields: Record<string, string>, nickname: string) {
  const required: Array<[string, number]> = [
    ["nomeFaccao", MAX.medium],
    ["nomeLider", MAX.medium],
    ["idadeLider", 8],
    ["membrosAtivos", 8],
    ["discordResponsavel", MAX.short],
    ["territorio", MAX.long],
    ["estilo", MAX.long],
    ["historia", MAX.story],
  ];
  if (required.some(([key, max]) => !isSafeText(String(fields[key] || ""), max))) {
    return "Preencha todas as perguntas do relatório.";
  }

  const idade = Number(fields.idadeLider);
  const membros = Number(fields.membrosAtivos);
  if (!Number.isFinite(idade) || idade < 16 || idade > 80) {
    return "Informe uma idade válida para o líder.";
  }
  if (!Number.isFinite(membros) || membros < 1 || membros > 500) {
    return "Informe a quantidade de membros ativos.";
  }

  const protocol = `RF-${Date.now().toString().slice(-8)}`;
  await appendJson("faction-requests.json", {
    protocol,
    nickname,
    createdAt: new Date().toISOString(),
    ...Object.fromEntries(required.map(([key, max]) => [key, clip(String(fields[key] || ""), max)])),
  });
  return { protocol };
}
