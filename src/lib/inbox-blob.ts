import { get, list, put } from "@vercel/blob";

const PREFIX = {
  "influencer-requests.json": "inbox/influencer/",
  "faction-requests.json": "inbox/faction/",
} as const;

type InboxFile = keyof typeof PREFIX;

export function cloudInboxEnabled() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
      process.env.BLOB_STORE_ID?.trim() ||
      process.env.VERCEL_OIDC_TOKEN?.trim()
  );
}

export async function loadInboxRows(fileName: InboxFile): Promise<Record<string, string>[]> {
  if (!cloudInboxEnabled()) return [];

  try {
    const listed = await list({ prefix: PREFIX[fileName], limit: 200 });
    const rows: Record<string, string>[] = [];

    for (const blob of listed.blobs) {
      const result = await get(blob.pathname, { access: "private", useCache: false });
      if (!result || result.statusCode !== 200 || !result.stream) continue;
      const parsed = JSON.parse(await new Response(result.stream).text()) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        rows.push(parsed as Record<string, string>);
      }
    }

    return rows;
  } catch {
    return [];
  }
}

export async function appendInboxRow(fileName: InboxFile, row: Record<string, string>) {
  if (!cloudInboxEnabled()) {
    if (process.env.VERCEL) {
      throw new Error("Cloud inbox is not connected.");
    }
    return;
  }

  const id = row.protocol || `${Date.now()}`;
  await put(`${PREFIX[fileName]}${id}.json`, JSON.stringify(row), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}
