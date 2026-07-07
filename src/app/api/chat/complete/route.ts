import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { toDateKey, updateStreak } from "@/lib/gamification";

const CONVERSATION_XP = 15;

/** Abgeschlossenes Bot-Gespräch: XP gutschreiben, Streak fortschreiben. */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const userTurns = Number(body?.userTurns ?? 0);
  if (!Number.isFinite(userTurns) || userTurns < 3) {
    return NextResponse.json({ xp: 0, message: "Zu kurz für XP – führ das Gespräch etwas weiter." });
  }

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
    db.xpEvent.create({ data: { userId: user.id, amount: CONVERSATION_XP, reason: "conversation" } }),
    db.user.update({
      where: { id: user.id },
      data: {
        xpTotal: { increment: CONVERSATION_XP },
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

  return NextResponse.json({ xp: CONVERSATION_XP, streak: streakResult.current });
}
