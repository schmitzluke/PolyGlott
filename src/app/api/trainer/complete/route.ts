import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { toDateKey, updateStreak } from "@/lib/gamification";
import { checkAchievements } from "@/lib/achievements";
import { packCount, packWords } from "../../../../../content/frequency-tr";

/**
 * Wortschatz-Pack abgeschlossen: XP und Streak aktualisieren,
 * Wörter in den FSRS-Karteikarten-Pool übertragen.
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const packIndex = Number(body?.packIndex ?? -1);
  const correctCount = Number(body?.correctCount ?? 0);
  const totalCount = Number(body?.totalCount ?? 0);
  if (!Number.isInteger(packIndex) || packIndex < 0 || packIndex >= packCount() || totalCount <= 0 || correctCount < 0 || correctCount > totalCount) {
    return NextResponse.json({ error: "Ungültige Werte." }, { status: 400 });
  }

  const ranks = packWords(packIndex).map((w) => w.rank);
  const vocabItems = await db.vocabItem.findMany({ where: { freqRank: { in: ranks } } });
  if (vocabItems.length === 0) {
    return NextResponse.json({ error: "Wortschatz nicht geseedet – npm run db:seed ausführen." }, { status: 409 });
  }

  const xp = correctCount * 2 + 10;
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
    db.xpEvent.create({ data: { userId: user.id, amount: xp, reason: "trainer" } }),
    db.user.update({
      where: { id: user.id },
      data: {
        xpTotal: { increment: xp },
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
    ...vocabItems.map((vocab) =>
      db.reviewItem.upsert({
        where: { userId_vocabId: { userId: user.id, vocabId: vocab.id } },
        update: {},
        create: { userId: user.id, vocabId: vocab.id, dueAt: new Date() },
      })
    ),
  ]);

  const newAchievements = await checkAchievements(user.id);

  return NextResponse.json({
    xp,
    streak: streakResult.current,
    newWords: vocabItems.length,
    newAchievements: newAchievements.map((a) => ({ title: a.title, icon: a.icon, description: a.description })),
  });
}
