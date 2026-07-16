import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { dbFieldsToCard, previewCard } from "@/lib/fsrs";
import { shuffle } from "@/lib/shuffle";

// Review-Daten ändern sich mit jeder Bewertung → nie cachen (Browser/Proxy).
export const dynamic = "force-dynamic";

const ROUND_SIZE = 20;
const NEW_PER_ROUND = 10;
// Max. neue Karten pro Tag (Anki-Praxis ~20): schützt vor Review-Lawinen
// 1–3 Tage später – Konsolidierung geht vor Akquisition.
const NEW_PER_DAY = 20;

/**
 * Karten für eine Lernrunde – nach FSRS-Zeitplan:
 * 1. Fällige Karten zuerst. Review-Karten (state 2) TAGESGENAU (irgendwann heute
 *    fällig = heute dran, wie Anki), Learning/Relearning (1/3) minutengenau –
 *    ihre kurzen Steps (1m/10m) dürfen nicht schon Stunden früher hochkommen.
 * 2. Neue Karten (state = 0) – noch nie bewertet, beigemischt bis
 *    NEW_PER_ROUND pro Runde und NEW_PER_DAY pro Tag.
 *
 * Bewusst KEINE „Festigungs"-Karten mehr: noch nicht fällige Karten zu zeigen
 * untergräbt Spaced Repetition. Ist nichts fällig → nichts zu tun.
 */

/** Fällig-Kriterium: Review tagesgenau, Learning/Relearning minutengenau. */
function dueOr(now: Date) {
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);
  return [
    { state: 2, dueAt: { lte: endOfToday } },
    { state: { in: [1, 3] }, dueAt: { lte: now } },
  ];
}

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const url = new URL(req.url);
  const exclude = (url.searchParams.get("exclude") ?? "").split(",").filter(Boolean);

  const now = new Date();

  // 1. Fällige Karten (heute fällige Review + minutengenau fällige Learning/Relearning).
  //    Auswahl priorisiert die am längsten überfälligen (orderBy dueAt), die
  //    Präsentationsreihenfolge wird danach gemischt (Anki-Praxis) – sonst lernt
  //    man die Kartenreihenfolge statt des Inhalts auswendig.
  const dueOrdered = await db.reviewItem.findMany({
    where: { userId: user.id, id: { notIn: exclude }, OR: dueOr(now) },
    include: { stashSentence: true, islandSentence: true },
    orderBy: { dueAt: "asc" },
    take: ROUND_SIZE,
  });
  const due = shuffle(dueOrdered);

  const remaining = ROUND_SIZE - due.length;

  // 2. Neue Karten (state = 0, noch nie bewertet) – gedeckelt pro Runde UND pro Tag.
  //    Tages-Proxy: heute erstmals bewertete Karten ≈ state != 0, last_review heute,
  //    reps <= 2 (die Same-Day-Learning-Steps 1m/10m treiben reps auf 2; Karten von
  //    gestern mit Review heute zählen selten mit → Cap ist leicht konservativ, ok).
  let newCards: typeof due = [];
  if (remaining > 0) {
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const newToday = await db.reviewItem.count({
      where: {
        userId: user.id,
        state: { not: 0 },
        reps: { lte: 2 },
        last_review: { gte: todayStart },
      },
    });
    const newBudget = Math.min(remaining, NEW_PER_ROUND, NEW_PER_DAY - newToday);
    if (newBudget > 0) {
      newCards = await db.reviewItem.findMany({
        where: { userId: user.id, state: 0, id: { notIn: exclude } },
        include: { stashSentence: true, islandSentence: true },
        orderBy: { dueAt: "asc" },
        take: newBudget,
      });
    }
  }

  const [dueCount, totalCount] = await Promise.all([
    // Fällig-Zähler = heute fällige Karten (Review tagesgenau, Learning/Relearning
    // minutengenau) + neue Karten (state 0, sofort fällig). Deckt sich mit der Runde.
    db.reviewItem.count({
      where: { userId: user.id, OR: [...dueOr(now), { state: 0, dueAt: { lte: now } }] },
    }),
    db.reviewItem.count({ where: { userId: user.id } }),
  ]);

  const toCard = (item: (typeof due)[number], cardType: "due" | "new") => {
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
    const sentence = item.stashSentence ?? item.islandSentence;

    return {
      id: item.id,
      source: sentence?.germanOriginal ?? "",
      target: sentence?.turkishTranslation ?? "",
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

  return NextResponse.json(
    {
      items: [
        ...due.map((i) => toCard(i, "due")),
        ...newCards.map((i) => toCard(i, "new")),
      ],
      dueCount,
      totalCount,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
