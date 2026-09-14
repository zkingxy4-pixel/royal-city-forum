import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { compare, hash } from "bcryptjs";
import { clip, isSafeText, isStrongPassword, isValidNickname } from "@/lib/security";
import { insert, query } from "@/lib/db";

export type PortalUser = { nickname: string };

type StoredUser = PortalUser & { email?: string; passwordHash: string };

const dataDir = process.env.VERCEL ? path.join("/tmp", "royal-city") : path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "users.json");
const MAX = {
  short: 80,
  medium: 160,
  long: 400,
  story: 2000,
};

async function hashPassword(password: string) {
  return hash(password, 12);
}

const globalForUsers = globalThis as typeof globalThis & { royalPortalUsers?: StoredUser[] };

async function loadUsers(): Promise<StoredUser[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const users = JSON.parse(raw) as StoredUser[];
    globalForUsers.royalPortalUsers = users;
    return users;
  } catch {
    return globalForUsers.royalPortalUsers || [];
  }
}

async function saveUsers(users: StoredUser[]) {
  globalForUsers.royalPortalUsers = users;
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(users, null, 2), "utf8");
}

function dbEmail(nickname: string, email?: string) {
  const mail = email?.trim().toLowerCase();
  if (mail) return mail;
  return `${nickname.toLowerCase()}@conta.royalcityrp.local`;
}

export async function registerPortalUser(nickname: string, password: string, email = "") {
  const nick = nickname.trim();
  const mail = email.trim().toLowerCase();
  if (!isValidNickname(nick)) return "Use um apelido de 2 a 32 caracteres (letras, números, ponto, _ ou -).";
  if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return "Informe um e-mail válido.";
  if (!isStrongPassword(password)) return "A senha precisa ter pelo menos 8 caracteres.";

  const users = await loadUsers();
  if (users.some((u) => u.nickname.toLowerCase() === nick.toLowerCase())) return "Este apelido já está em uso.";
  if (mail && users.some((u) => u.email?.toLowerCase() === mail)) return "Este e-mail já possui conta no portal.";

  const passwordHash = await hashPassword(password);
  users.push({ nickname: nick, email: mail || undefined, passwordHash });
  await saveUsers(users);

  if (process.env.DB_PASSWORD?.trim()) {
    try {
      await insert(`INSERT INTO users (nickname, email, password_hash) VALUES (?, ?, ?)`, [
        nick,
        dbEmail(nick, mail),
        passwordHash,
      ]);
    } catch {
      undefined;
    }
  }
  return { nickname: nick };
}

export async function loginPortalUser(identifier: string, password: string) {
  const id = identifier.trim().toLowerCase();
  if (!id || !password) return "Apelido ou senha inválidos.";

  const users = await loadUsers();
  const found = users.find((u) => u.nickname.toLowerCase() === id || u.email?.toLowerCase() === id);

  if (found) {
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
    if (matches) return { nickname: found.nickname };
  }

  if (process.env.DB_PASSWORD?.trim()) {
    try {
      const rows = await query<Array<{ nickname: string; password_hash: string }>>(
        `SELECT nickname, password_hash FROM users WHERE email = ? OR LOWER(nickname) = ? LIMIT 1`,
        [id, id]
      );
      const dbUser = rows[0];
      if (dbUser && (await compare(password, dbUser.password_hash))) {
        return { nickname: dbUser.nickname };
      }
    } catch {
      undefined;
    }
  }

  return "Apelido ou senha inválidos.";
}

async function appendJson(fileName: string, row: Record<string, string>) {
  const file = path.join(dataDir, fileName);
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
  const row: Record<string, string> = {
    protocol,
    nickname,
    createdAt: new Date().toISOString(),
    ...Object.fromEntries(required.map(([key, max]) => [key, clip(String(fields[key] || ""), max)])),
  };
  await appendJson("influencer-requests.json", row);
  if (process.env.DB_PASSWORD?.trim()) {
    try {
      await insert(
        `INSERT INTO influencer_requests
          (user_id, nome, instagram, canal, plataforma, seguidores, views_media, perfil_url, conteudo_url, motivo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [null, row.nome, row.instagram, row.canal, row.plataforma, row.seguidores, row.views, row.perfil, row.conteudo, row.motivo]
      );
    } catch {
      undefined;
    }
  }
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
  const row: Record<string, string> = {
    protocol,
    nickname,
    createdAt: new Date().toISOString(),
    ...Object.fromEntries(required.map(([key, max]) => [key, clip(String(fields[key] || ""), max)])),
  };
  await appendJson("faction-requests.json", row);
  if (process.env.DB_PASSWORD?.trim()) {
    try {
      await insert(
        `INSERT INTO faction_requests
          (protocol, nickname, nome_faccao, nome_lider, idade_lider, membros_ativos, discord_responsavel, territorio, estilo, historia)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          row.protocol,
          row.nickname,
          row.nomeFaccao,
          row.nomeLider,
          row.idadeLider,
          row.membrosAtivos,
          row.discordResponsavel,
          row.territorio,
          row.estilo,
          row.historia,
        ]
      );
    } catch {
      undefined;
    }
  }
  return { protocol };
}

export type InboxItem = {
  kind: "influencer" | "faction";
  protocol: string;
  createdAt: string;
  nickname: string;
  fields: Record<string, string>;
};

async function readJsonRows(fileName: string) {
  try {
    return JSON.parse(await readFile(path.join(dataDir, fileName), "utf8")) as Record<string, string>[];
  } catch {
    return [];
  }
}

export async function listInbox(): Promise<InboxItem[]> {
  const items: InboxItem[] = [];

  for (const row of await readJsonRows("influencer-requests.json")) {
    items.push({
      kind: "influencer",
      protocol: row.protocol || "",
      createdAt: row.createdAt || "",
      nickname: row.nickname || "",
      fields: row,
    });
  }
  for (const row of await readJsonRows("faction-requests.json")) {
    items.push({
      kind: "faction",
      protocol: row.protocol || "",
      createdAt: row.createdAt || "",
      nickname: row.nickname || "",
      fields: row,
    });
  }

  if (process.env.DB_PASSWORD?.trim()) {
    try {
      const influencers = await query<Array<Record<string, unknown>>>(
        `SELECT nome, instagram, canal, plataforma, seguidores, views_media, perfil_url, conteudo_url, motivo, created_at
         FROM influencer_requests ORDER BY id DESC LIMIT 200`
      );
      for (const row of influencers) {
        const createdAt = row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at || "");
        items.push({
          kind: "influencer",
          protocol: `DB-${createdAt.slice(-8)}`,
          createdAt,
          nickname: "",
          fields: {
            nome: String(row.nome || ""),
            instagram: String(row.instagram || ""),
            canal: String(row.canal || ""),
            plataforma: String(row.plataforma || ""),
            seguidores: String(row.seguidores || ""),
            views: String(row.views_media || ""),
            perfil: String(row.perfil_url || ""),
            conteudo: String(row.conteudo_url || ""),
            motivo: String(row.motivo || ""),
          },
        });
      }
    } catch {
      undefined;
    }
    try {
      const factions = await query<Array<Record<string, unknown>>>(
        `SELECT protocol, nickname, nome_faccao, nome_lider, idade_lider, membros_ativos, discord_responsavel, territorio, estilo, historia, created_at
         FROM faction_requests ORDER BY id DESC LIMIT 200`
      );
      for (const row of factions) {
        const createdAt = row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at || "");
        items.push({
          kind: "faction",
          protocol: String(row.protocol || ""),
          createdAt,
          nickname: String(row.nickname || ""),
          fields: {
            nomeFaccao: String(row.nome_faccao || ""),
            nomeLider: String(row.nome_lider || ""),
            idadeLider: String(row.idade_lider || ""),
            membrosAtivos: String(row.membros_ativos || ""),
            discordResponsavel: String(row.discord_responsavel || ""),
            territorio: String(row.territorio || ""),
            estilo: String(row.estilo || ""),
            historia: String(row.historia || ""),
          },
        });
      }
    } catch {
      undefined;
    }
  }

  const seen = new Set<string>();
  return items
    .filter((item) => {
      const key = `${item.kind}:${item.protocol}:${item.createdAt}:${item.fields.nome || item.fields.nomeFaccao || ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}
