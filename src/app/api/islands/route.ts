import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

/** Kuratierte Language Islands + wie viele Sätze der Nutzer je Pack schon übernommen hat. */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const packs = await db.islandPack.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: { select: { sentences: true } },
      sentences: {
        select: { reviews: { where: { userId: user.id }, select: { id: true } } },
      },
    },
  });

  const result = packs.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    level: p.level,
    total: p._count.sentences,
    joined: p.sentences.filter((s) => s.reviews.length > 0).length,
  }));

  return NextResponse.json({ packs: result });
}
