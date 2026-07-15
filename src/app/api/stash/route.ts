import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { processStashSentence } from "@/lib/stashWorker";

/**
 * Nimmt einen deutschen Satz entgegen, speichert ihn als PENDING und stößt
 * die DeepSeek-R1-Übersetzung fire-and-forget an (kein externer Queue-Dienst nötig).
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const germanOriginal = typeof body?.germanOriginal === "string" ? body.germanOriginal.trim() : "";
  if (!germanOriginal) {
    return NextResponse.json({ error: "germanOriginal fehlt." }, { status: 400 });
  }

  const entry = await db.stashSentence.create({
    data: { userId: user.id, germanOriginal, status: "PENDING" },
  });

  processStashSentence(entry.id).catch((err) => console.error("[stash] Worker-Fehler:", err));

  return NextResponse.json({ id: entry.id, status: entry.status }, { status: 202 });
}
