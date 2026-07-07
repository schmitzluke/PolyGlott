import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { applyReview } from "@/lib/sm2";
import { XP, toDateKey, updateStreak } from "@/lib/gamification";

/**
 * Ein Review-Item bewerten (SM-2). Body: { quality: 0–5 }
 * Festigungs-Karten (noch nicht fällig): „gewusst“ lässt den Zeitplan
 * unangetastet (keine Intervall-Inflation), „vergessen“ resettet voll.
 */
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const quality = Number(body?.quality);
  if (!Number.isFinite(quality) || quality < 0 || quality > 5) {
    return NextResponse.json({ error: "quality muss zwischen 0 und 5 liegen." }, { status: 400 });
  }

  const item = await db.reviewItem.findUnique({ where: { id: params.id } });
  if (!item || item.userId !== user.id) {
    return NextResponse.json({ error: "Item nicht gefunden." }, { status: 404 });
  }

  const now = new Date();
  const early = item.dueAt > now; // Festigungs-Review (vorgezogen)
  const { result } = applyReview(
    { easeFactor: item.easeFactor, intervalDays: item.intervalDays, repetitions: item.repetitions },
    quality,
    early,
    now
  );

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
      data: result
        ? {
            easeFactor: result.easeFactor,
            intervalDays: result.intervalDays,
            repetitions: result.repetitions,
            dueAt: result.dueAt,
            lastReviewedAt: now,
          }
        : { lastReviewedAt: now }, // Festigung gewusst: nur „gesehen“ markieren
    }),
    db.xpEvent.create({ data: { userId: user.id, amount: XP.perReview, reason: "review" } }),
    db.user.update({
      where: { id: user.id },
      data: {
        xpTotal: { increment: XP.perReview },
        ...(streakResult.usedFreeze ? { streakFreezes: { decrement: 1 } } : {}),
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

  return NextResponse.json({
    xp: XP.perReview,
    nextDueInDays: result?.intervalDays ?? item.intervalDays,
    repetitions: result?.repetitions ?? item.repetitions,
    early,
  });
}
