import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const ROUND_SIZE = 20;

/**
 * Karten für eine Lernrunde – es gibt immer etwas zu tun (Anki-Prinzip):
 * 1. Fällige Karten zuerst (SM-2-Zeitplan).
 * 2. Sind weniger als 20 fällig, wird mit Festigungs-Karten aufgefüllt:
 *    die am längsten nicht wiederholten zuerst (Karten von vor Tagen).
 */
export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const url = new URL(req.url);
  const exclude = (url.searchParams.get("exclude") ?? "").split(",").filter(Boolean);

  const now = new Date();
  const due = await db.reviewItem.findMany({
    where: { userId: user.id, dueAt: { lte: now }, id: { notIn: exclude } },
    include: { vocab: true },
    orderBy: { dueAt: "asc" },
    take: ROUND_SIZE,
  });

  let extra: typeof due = [];
  if (due.length < ROUND_SIZE) {
    extra = await db.reviewItem.findMany({
      where: { userId: user.id, dueAt: { gt: now }, id: { notIn: exclude } },
      include: { vocab: true },
      // Am längsten nicht angeschaut zuerst → ältere Karten kommen wieder dran
      orderBy: [{ lastReviewedAt: "asc" }],
      take: ROUND_SIZE - due.length,
    });
  }

  const [dueCount, totalCount] = await Promise.all([
    db.reviewItem.count({ where: { userId: user.id, dueAt: { lte: now } } }),
    db.reviewItem.count({ where: { userId: user.id } }),
  ]);

  const toCard = (item: (typeof due)[number], isDue: boolean) => ({
    id: item.id,
    source: item.vocab.source,
    target: item.vocab.target,
    exampleSource: item.vocab.exampleSource,
    exampleTarget: item.vocab.exampleTarget,
    repetitions: item.repetitions,
    lastReviewedAt: item.lastReviewedAt,
    due: isDue,
  });

  return NextResponse.json({
    items: [...due.map((i) => toCard(i, true)), ...extra.map((i) => toCard(i, false))],
    dueCount,
    totalCount,
  });
}
