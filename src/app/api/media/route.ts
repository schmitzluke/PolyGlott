import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { processTranscript } from "@/lib/mediaWorker";

/** Liste aller Transkripte des Nutzers (neueste zuerst). */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const transcripts = await db.transcript.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, status: true, comprehended: true, createdAt: true },
  });

  return NextResponse.json({ transcripts });
}

/**
 * Nimmt ein Transkript entgegen, speichert es als PENDING und stößt die
 * DeepSeek-Extraktion fire-and-forget an (kein externer Queue-Dienst nötig).
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const rawText = typeof body?.rawText === "string" ? body.rawText.trim() : "";
  if (!rawText) {
    return NextResponse.json({ error: "rawText fehlt." }, { status: 400 });
  }
  if (rawText.length > 20000) {
    return NextResponse.json({ error: "Transkript zu lang (max. 20.000 Zeichen)." }, { status: 400 });
  }

  const entry = await db.transcript.create({
    data: { userId: user.id, title: title || "Unbenanntes Transkript", rawText },
  });

  processTranscript(entry.id).catch((err) => console.error("[api/media] Worker-Fehler:", err));

  return NextResponse.json({ id: entry.id, status: entry.status }, { status: 201 });
}
