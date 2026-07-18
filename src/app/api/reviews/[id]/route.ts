import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { dbFieldsToCard, cardToDbFields, reviewCard, Rating } from "@/lib/fsrs";
import { XP, toDateKey, updateStreak } from "@/lib/gamification";
import { isMastered } from "@/lib/mastery";
import { checkAchievements } from "@/lib/achievements";

/**
 * Ein Review-Item bewerten (FSRS). Body: { rating: 1–4 }
 * 1 = Nochmal, 2 = Schwer, 3 = Gut, 4 = Einfach.
 */
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const rating = Number(body?.rating);
  if (!Number.isFinite(rating) || rating < 1 || rating > 4) {
    return NextResponse.json({ error: "rating muss zwischen 1 und 4 liegen." }, { status: 400 });
  }

  const item = await db.reviewItem.findUnique({ where: { id: params.id } });
  if (!item || item.userId !== user.id) {
    return NextResponse.json({ error: "Item nicht gefunden." }, { status: 404 });
  }

  const now = new Date();

  // FSRS-Card aus DB-Feldern rekonstruieren
  const card = dbFieldsToCard({
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

  // FSRS-Review anwenden
  const { card: updatedCard } = reviewCard(card, rating as 1 | 2 | 3 | 4, now);
  const fields = cardToDbFields(updatedCard);

  // Neu gefestigt? masteredCount ist ein Cache – nur bei Übergang ungefestigt→gefestigt hochzählen,
  // sonst würde jedes weitere "Gut" auf einer längst gefestigten Karte den Zähler weiter treiben.
  const justMastered = !isMastered(item) && isMastered({ state: fields.state, stability: fields.stability });

  // Reviews zählen als Lernaktivität für den Streak
  const today = toDateKey(new Date());
  const dbStreak = await db.streak.findUnique({ where: { userId: user.id } });
  const streakResult = updateStreak(
    {
      current: dbStreak?.current ?? 0,
      longest: dbStreak?.longest ?? 0,
      lastActiveDate: dbStreak?.lastActiveDate ?? null,
      freezesAvailable: user.streakFreezes,
    },
    today
  );

  await db.$transaction([
    db.reviewItem.update({
      where: { id: item.id },
      data: {
        stability: fields.stability,
        difficulty: fields.difficulty,
        elapsed_days: fields.elapsed_days,
        scheduled_days: fields.scheduled_days,
        reps: fields.reps,
        lapses: fields.lapses,
        state: fields.state,
        last_review: fields.last_review,
        dueAt: fields.dueAt,
      },
    }),
    db.xpEvent.create({ data: { userId: user.id, amount: XP.perReview, reason: "review" } }),
    db.user.update({
      where: { id: user.id },
      data: {
        xpTotal: { increment: XP.perReview },
        ...(streakResult.usedFreeze ? { streakFreezes: { decrement: 1 } } : {}),
        ...(justMastered ? { masteredCount: { increment: 1 } } : {}),
      },
    }),
    db.streak.upsert({
      where: { userId: user.id },
      update: {
        current: streakResult.current,
        longest: streakResult.longest,
        lastActiveDate: streakResult.lastActiveDate,
        ...(streakResult.usedFreeze ? { freezesUsed: { increment: 1 } } : {}),
      },
      create: {
        userId: user.id,
        current: streakResult.current,
        longest: streakResult.longest,
        lastActiveDate: streakResult.lastActiveDate,
      },
    }),
  ]);

  if (justMastered) await checkAchievements(user.id);

  return NextResponse.json({
    xp: XP.perReview,
    nextDueAt: fields.dueAt.toISOString(),
    state: fields.state,
    reps: fields.reps,
    stability: Math.round(fields.stability * 10) / 10,
    justMastered,
  });
}
