import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { dbFieldsToCard, previewCard } from "@/lib/fsrs";

const ROUND_SIZE = 20;

/**
 * Karten für eine Lernrunde – es gibt immer etwas zu tun:
 * 1. Fällige Karten zuerst (FSRS-Zeitplan, state > 0 und dueAt <= jetzt).
 * 2. Neue Karten (state = 0) – noch nie bewertet, werden beigemischt.
 * 3. Sind weniger als 20 fällig, wird mit Festigungs-Karten aufgefüllt:
 *    die am längsten nicht wiederholten zuerst.
 */
export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const url = new URL(req.url);
  const exclude = (url.searchParams.get("exclude") ?? "").split(",").filter(Boolean);

  const now = new Date();

  // 1. Fällige Karten (Learning/Review/Relearning mit abgelaufenem Due)
  const due = await db.reviewItem.findMany({
    where: { userId: user.id, dueAt: { lte: now }, state: { not: 0 }, id: { notIn: exclude } },
    include: { vocab: true },
    orderBy: { dueAt: "asc" },
    take: ROUND_SIZE,
  });

  let remaining = ROUND_SIZE - due.length;

  // 2. Neue Karten (state = 0, noch nie bewertet)
  let newCards: typeof due = [];
  if (remaining > 0) {
    newCards = await db.reviewItem.findMany({
      where: { userId: user.id, state: 0, id: { notIn: exclude } },
      include: { vocab: true },
      orderBy: { dueAt: "asc" },
      take: Math.min(remaining, 10), // Max 10 neue Karten pro Runde
    });
    remaining -= newCards.length;
  }

  // 3. Festigungs-Karten (noch nicht fällig, am längsten nicht gesehen).
  //    Karten, die in den letzten 12 h bewertet wurden, werden ausgeschlossen –
  //    sonst tauchen gerade auf „Gut"/„Einfach" gesetzte Wörter sofort wieder auf,
  //    obwohl sie erst in Stunden/Tagen fällig sind (Rating würde sich sinnlos anfühlen).
  const recentlyReviewedCutoff = new Date(now.getTime() - 12 * 60 * 60 * 1000);
  let extra: typeof due = [];
  if (remaining > 0) {
    extra = await db.reviewItem.findMany({
      where: {
        userId: user.id,
        state: { not: 0 },
        dueAt: { gt: now },
        last_review: { lt: recentlyReviewedCutoff },
        id: { notIn: exclude },
      },
      include: { vocab: true },
      orderBy: [{ last_review: "asc" }],
      take: remaining,
    });
  }

  const [dueCount, totalCount] = await Promise.all([
    db.reviewItem.count({ where: { userId: user.id, dueAt: { lte: now } } }),
    db.reviewItem.count({ where: { userId: user.id } }),
  ]);

  const toCard = (item: (typeof due)[number], cardType: "due" | "new" | "extra") => {
    // Preview-Zeiten berechnen für den aktuellen Zustand
    const fsrsCard = dbFieldsToCard({
      stability: item.stability,
      difficulty: item.difficulty,
      elapsed_days: item.elapsed_days,
      scheduled_days: item.scheduled_days,
      reps: item.reps,
      lapses: item.lapses,
      state: item.state,
      last_review: item.last_review,
      dueAt: item.dueAt,
    });
    const preview = previewCard(fsrsCard, now);

    return {
      id: item.id,
      source: item.vocab.source,
      target: item.vocab.target,
      exampleSource: item.vocab.exampleSource,
      exampleTarget: item.vocab.exampleTarget,
      reps: item.reps,
      state: item.state,
      due: cardType === "due",
      isNew: cardType === "new",
      // Preview-Labels für die UI-Buttons
      preview: {
        again: preview[1]?.intervalLabel ?? "",
        hard: preview[2]?.intervalLabel ?? "",
        good: preview[3]?.intervalLabel ?? "",
        easy: preview[4]?.intervalLabel ?? "",
      },
    };
  };

  return NextResponse.json({
    items: [
      ...due.map((i) => toCard(i, "due")),
      ...newCards.map((i) => toCard(i, "new")),
      ...extra.map((i) => toCard(i, "extra")),
    ],
    dueCount,
    totalCount,
  });
}
