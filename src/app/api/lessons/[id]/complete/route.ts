import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { lessonXp, toDateKey, updateStreak } from "@/lib/gamification";
import { checkAchievements } from "@/lib/achievements";

/**
 * Lektion abschließen:
 * XP gutschreiben, Streak fortschreiben, Vokabeln in den FSRS-Karteikarten-Pool übergeben,
 * Achievements prüfen. (Lektions-Dramaturgie Schritt 7.)
 */
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const correctCount = Number(body?.correctCount ?? 0);
  const totalCount = Number(body?.totalCount ?? 0);
  if (!Number.isFinite(correctCount) || !Number.isFinite(totalCount) || totalCount <= 0 || correctCount < 0 || correctCount > totalCount) {
    return NextResponse.json({ error: "Ungültige Werte." }, { status: 400 });
  }

  const lesson = await db.lesson.findUnique({
    where: { id: params.id },
    include: { vocabItems: true, unit: { include: { course: true } } },
  });
  if (!lesson) return NextResponse.json({ error: "Lektion nicht gefunden." }, { status: 404 });
  if (lesson.unit.course.isPremium && !user.isPremium) {
    return NextResponse.json({ error: "Premium erforderlich." }, { status: 403 });
  }

  const score = Math.round((correctCount / totalCount) * 100);
  const xp = lessonXp(correctCount, totalCount);
  const today = toDateKey(new Date());

  // Streak aktualisieren
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
    db.userProgress.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId: lesson.id } },
      update: { score: Math.max(score, 0), completedAt: new Date() },
      create: { userId: user.id, lessonId: lesson.id, score },
    }),
    db.xpEvent.create({ data: { userId: user.id, amount: xp, reason: "lesson_complete" } }),
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
    // Neue Vokabeln in die Spaced Repetition übernehmen (sofort fällig)
    ...lesson.vocabItems.map((vocab) =>
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
    score,
    streak: streakResult.current,
    usedFreeze: streakResult.usedFreeze,
    newVocab: lesson.vocabItems.length,
    newAchievements: newAchievements.map((a) => ({ title: a.title, icon: a.icon, description: a.description })),
  });
}
