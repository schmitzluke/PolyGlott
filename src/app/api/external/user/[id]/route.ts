import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiKeyEquals, bearerToken } from "@/lib/apiKey";
import { buildUserSummary } from "@/lib/externalSummary";

/**
 * Companion-API per User-ID. Verlangt jetzt den persönlichen API-Key des Nutzers:
 * `Authorization: Bearer <userApiKey>`, wobei der Key zur angefragten `id` gehören muss.
 * Damit ist das frühere offene Unauth-Risiko geschlossen.
 * Neue Integrationen sollten `GET /api/external/me` (id-los) bevorzugen.
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const userId = params.id;
  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  const token = bearerToken(req);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { apiKey: true },
  });
  // Nutzer-Existenz nicht preisgeben: falscher Key → immer 401.
  if (!user || !apiKeyEquals(user.apiKey, token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await buildUserSummary(userId);
    if (!payload) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(payload);
  } catch (error) {
    console.error("External API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
