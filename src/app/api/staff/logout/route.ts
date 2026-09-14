import { NextResponse } from "next/server";
import { STAFF_COOKIE, staffCookieOptions } from "@/lib/staff-session";

export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL("/staff", request.url), 303);
  res.cookies.set(STAFF_COOKIE, "", { ...staffCookieOptions, maxAge: 0 });
  return res;
}
