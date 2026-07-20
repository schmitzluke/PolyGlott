import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * Übernimmt alle Sätze (Einzelsätze + Erzählungs-Sätze) eines Island-Packs in
 * den eigenen Review-Stapel (legt ReviewItem je Satz an, sofern noch nicht
 * vorhanden). Idempotent.
 */
export async function POST(_req: Request, { params }: { params: { packId: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const pack = await db.islandPack.findUnique({
    where: { id: params.packId },
    include: {
      sentences: { select: { id: true } },
      stories: { include: { sentences: { select: { id: true } } } },
    },
  });
  if (!pack) return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });

  const storySentenceIds = pack.stories.flatMap((s) => s.sentences.map((sent) => sent.id));

  const [existingSentences, existingStorySentences] = await Promise.all([
    db.reviewItem.findMany({
      where: { userId: user.id, islandSentenceId: { in: pack.sentences.map((s) => s.id) } },
      select: { islandSentenceId: true },
    }),
    db.reviewItem.findMany({
      where: { userId: user.id, islandStorySentenceId: { in: storySentenceIds } },
      select: { islandStorySentenceId: true },
    }),
  ]);

  const alreadySentences = new Set(existingSentences.map((e) => e.islandSentenceId));
  const alreadyStorySentences = new Set(existingStorySentences.map((e) => e.islandStorySentenceId));

  const toCreateSentences = pack.sentences.filter((s) => !alreadySentences.has(s.id));
  const toCreateStorySentences = storySentenceIds.filter((id) => !alreadyStorySentences.has(id));

  const creates = [
    ...toCreateSentences.map((s) => ({ userId: user.id, islandSentenceId: s.id })),
    ...toCreateStorySentences.map((id) => ({ userId: user.id, islandStorySentenceId: id })),
  ];

  if (creates.length > 0) {
    await db.reviewItem.createMany({ data: creates });
  }

  return NextResponse.json({
    added: creates.length,
    total: pack.sentences.length + storySentenceIds.length,
  });
}
