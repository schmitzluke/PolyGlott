import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bearerToken } from "@/lib/apiKey";
import { buildUserSummary } from "@/lib/externalSummary";

/**
 * Companion-API (self-serve): identifiziert den Nutzer über seinen persönlichen API-Key.
 * Aufruf: `GET /api/external/me` mit Header `Authorization: Bearer <userApiKey>`.
 * Keine User-ID nötig — der Key löst den Nutzer eindeutig auf.
 */
export async function GET(req: Request) {
  const token = bearerToken(req);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Key ist @unique → direkter Lookup, kein Timing-sensibler Vergleich nötig.
  const user = await db.user.findUnique({
    where: { apiKey: token },
    select: { id: true },
  });
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await buildUserSummary(user.id);
  if (!payload) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(payload);
}
