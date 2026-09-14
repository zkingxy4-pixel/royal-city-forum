import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type PortalUser = { nickname: string };

type StoredUser = PortalUser & { email?: string; passwordHash: string };

const filePath = path.join(process.cwd(), "data", "users.json");

function hashPassword(password: string) {
  return `royal:${password}`;
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
  if (nick.length < 2) return "Informe um apelido com pelo menos 2 caracteres.";
  if (password.length < 6) return "A senha precisa ter pelo menos 6 caracteres.";

  const users = await loadUsers();
  if (users.some((u) => u.nickname.toLowerCase() === nick.toLowerCase())) return "Este apelido já está em uso.";

  users.push({ nickname: nick, passwordHash: hashPassword(password) });
  await saveUsers(users);
  return { nickname: nick };
}

export async function loginPortalUser(identifier: string, password: string) {
  const id = identifier.trim().toLowerCase();
  const users = await loadUsers();
  const found = users.find((u) => u.nickname.toLowerCase() === id);
  if (!found || found.passwordHash !== hashPassword(password)) {
    return "Apelido ou senha inválidos.";
  }
  return { nickname: found.nickname };
}

export async function saveInfluencerRequest(fields: Record<string, string>, nickname?: string) {
  const required = ["nome", "instagram", "canal", "plataforma", "seguidores", "views", "perfil", "conteudo", "motivo"];
  if (required.some((key) => !String(fields[key] || "").trim())) {
    return "Preencha todos os campos do relatório.";
  }

  const file = path.join(process.cwd(), "data", "influencer-requests.json");
  let rows: Record<string, string>[] = [];
  try {
    rows = JSON.parse(await readFile(file, "utf8")) as Record<string, string>[];
  } catch {
    rows = [];
  }

  const protocol = `RC-${Date.now().toString().slice(-8)}`;
  rows.push({
    protocol,
    nickname: nickname || "",
    createdAt: new Date().toISOString(),
    ...Object.fromEntries(required.map((key) => [key, String(fields[key] || "").trim()])),
  });
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(rows, null, 2), "utf8");
  return { protocol };
}

export async function saveFactionRequest(fields: Record<string, string>, nickname?: string) {
  const required = [
    "nomeFaccao",
    "nomeLider",
    "idadeLider",
    "membrosAtivos",
    "discordResponsavel",
    "territorio",
    "estilo",
    "historia",
  ];
  if (required.some((key) => !String(fields[key] || "").trim())) {
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

  const file = path.join(process.cwd(), "data", "faction-requests.json");
  let rows: Record<string, string>[] = [];
  try {
    rows = JSON.parse(await readFile(file, "utf8")) as Record<string, string>[];
  } catch {
    rows = [];
  }

  const protocol = `RF-${Date.now().toString().slice(-8)}`;
  rows.push({
    protocol,
    nickname: nickname || "",
    createdAt: new Date().toISOString(),
    ...Object.fromEntries(required.map((key) => [key, String(fields[key] || "").trim()])),
  });
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(rows, null, 2), "utf8");
  return { protocol };
}
