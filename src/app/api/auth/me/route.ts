import { NextResponse } from "next/server";
import { dbUnavailable, getSessionUser, publicUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ user: null });
    return NextResponse.json({ user: publicUser(user) });
  } catch (error) {
    if (dbUnavailable(error)) {
      return NextResponse.json({ user: null, error: "Banco de dados indisponível." }, { status: 503 });
    }
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
