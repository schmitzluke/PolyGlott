import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

/** Alle READY-Sätze des Nutzers für den Commute-Mode (Hands-Free Audio Flooding). */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const sentences = await db.stashSentence.findMany({
    where: { userId: user.id, status: "READY" },
    orderBy: { createdAt: "desc" },
    select: { id: true, germanOriginal: true, turkishTranslation: true },
  });

  return NextResponse.json({ sentences });
}
