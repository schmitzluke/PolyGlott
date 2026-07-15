import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { toDateKey, updateStreak } from "@/lib/gamification";
import { checkAchievements } from "@/lib/achievements";
import { packCount, packWords } from "../../../../../content/frequency-tr";

/**
 * Wortschatz-Pack abgeschlossen: XP und Streak aktualisieren.
 * Persistenz einzelner Wörter als ReviewItem entfällt seit dem Umbau auf
 * StashSentence/IslandSentence (Phase 4 wird das neu anbinden).
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const packIndex = Number(body?.packIndex ?? -1);
  if (!Number.isInteger(packIndex) || packIndex < 0 || packIndex >= packCount()) {
    return NextResponse.json({ error: "Ungültige Werte." }, { status: 400 });
  }

  const words = packWords(packIndex);

  const xp = 30;
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
  ]);

  const newAchievements = await checkAchievements(user.id);

  return NextResponse.json({
    xp,
    streak: streakResult.current,
    newWords: words.length,
    newAchievements: newAchievements.map((a) => ({ title: a.title, icon: a.icon, description: a.description })),
  });
}
