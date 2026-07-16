import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * Übernimmt alle Sätze eines Island-Packs in den eigenen Review-Stapel
 * (legt ReviewItem je Satz an, sofern noch nicht vorhanden). Idempotent.
 */
export async function POST(_req: Request, { params }: { params: { packId: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const pack = await db.islandPack.findUnique({
    where: { id: params.packId },
    include: { sentences: { select: { id: true } } },
  });
  if (!pack) return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });

  const existing = await db.reviewItem.findMany({
    where: { userId: user.id, islandSentenceId: { in: pack.sentences.map((s) => s.id) } },
    select: { islandSentenceId: true },
  });
  const already = new Set(existing.map((e) => e.islandSentenceId));
  const toCreate = pack.sentences.filter((s) => !already.has(s.id));

  if (toCreate.length > 0) {
    await db.reviewItem.createMany({
      data: toCreate.map((s) => ({ userId: user.id, islandSentenceId: s.id })),
    });
  }

  return NextResponse.json({ added: toCreate.length, total: pack.sentences.length });
}
