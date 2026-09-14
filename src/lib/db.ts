import mysql from "mysql2/promise";

const globalForDb = globalThis as typeof globalThis & {
  royalPool?: mysql.Pool;
};

type SqlParam = string | number | boolean | Date | Buffer | null;

function isRetryableDbError(error: unknown) {
  const code = typeof error === "object" && error !== null && "code" in error ? String((error as { code: string }).code) : "";
  return ["ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT", "PROTOCOL_CONNECTION_LOST", "ER_ACCESS_DENIED_ERROR", "ER_BAD_DB_ERROR"].includes(code);
}

function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "royalcity",
    password: process.env.DB_PASSWORD || "RoyalCity#2026",
    database: process.env.DB_NAME || "royal_city",
    waitForConnections: true,
    connectionLimit: 10,
  });
}

export function getPool() {
  if (!globalForDb.royalPool) {
    globalForDb.royalPool = createPool();
  }
  return globalForDb.royalPool;
}

async function resetPool() {
  const old = globalForDb.royalPool;
  globalForDb.royalPool = undefined;
  if (old) {
    try {
      await old.end();
    } catch {
      undefined;
    }
  }
}

async function run<T>(fn: (pool: mysql.Pool) => Promise<T>): Promise<T> {
  try {
    return await fn(getPool());
  } catch (error) {
    if (!isRetryableDbError(error)) throw error;
    await resetPool();
    return fn(getPool());
  }
}

export async function query<T>(sql: string, params: SqlParam[] = []) {
  return run(async (pool) => {
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  });
}

export async function insert(sql: string, params: SqlParam[] = []) {
  return run(async (pool) => {
    const [result] = await pool.execute(sql, params);
    return result as mysql.ResultSetHeader;
  });
}
