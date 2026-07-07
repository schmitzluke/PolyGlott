import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { toDateKey, updateStreak } from "@/lib/gamification";

const PASS_THRESHOLD = 85; // Prozent
const TEST_XP = 50;
const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Niveau-Test auswerten: Bestehensgrenze 85 %, verleiht Level-Abzeichen,
 * hebt das Nutzer-Niveau an und schreibt XP gut.
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const correctCount = Number(body?.correctCount ?? -1);
  const totalCount = Number(body?.totalCount ?? 0);
  const courseSlug = typeof body?.courseSlug === "string" ? body.courseSlug : "";
  if (!Number.isFinite(correctCount) || totalCount < 5 || correctCount < 0 || correctCount > totalCount) {
    return NextResponse.json({ error: "Ungültige Werte." }, { status: 400 });
  }

  const course = await db.course.findUnique({
    where: { slug: courseSlug },
    include: { units: { include: { lessons: { select: { id: true } } } } },
  });
  if (!course) return NextResponse.json({ error: "Kurs nicht gefunden." }, { status: 404 });

  // Test ist erst nach Abschluss aller Lektionen zulässig (serverseitig prüfen)
  const lessonIds = course.units.flatMap((u) => u.lessons.map((l) => l.id));
  const completed = await db.userProgress.count({
    where: { userId: user.id, lessonId: { in: lessonIds } },
  });
  if (lessonIds.length === 0 || completed < lessonIds.length) {
    return NextResponse.json({ error: "Erst alle Lektionen des Kurses abschließen." }, { status: 403 });
  }

  const score = Math.round((correctCount / totalCount) * 100);
  const passed = score >= PASS_THRESHOLD;

  if (!passed) {
    return NextResponse.json({ passed, score, threshold: PASS_THRESHOLD });
  }

  // Level anheben (nie absenken)
  const currentIndex = LEVEL_ORDER.indexOf(user.selfLevel);
  const passedIndex = LEVEL_ORDER.indexOf(course.level);
  const nextLevel = LEVEL_ORDER[Math.min(passedIndex + 1, LEVEL_ORDER.length - 1)];
  const newLevel = passedIndex >= currentIndex - 1 ? nextLevel : user.selfLevel;

  const achievement = await db.achievement.findUnique({
    where: { code: `level_${course.level.toLowerCase()}` },
  });

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
    db.xpEvent.create({ data: { userId: user.id, amount: TEST_XP, reason: "level_test" } }),
    db.user.update({
      where: { id: user.id },
      data: {
        xpTotal: { increment: TEST_XP },
        selfLevel: newLevel,
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
    ...(achievement
      ? [
          db.userAchievement.upsert({
            where: { userId_achievementId: { userId: user.id, achievementId: achievement.id } },
            update: {},
            create: { userId: user.id, achievementId: achievement.id },
          }),
        ]
      : []),
  ]);

  return NextResponse.json({
    passed,
    score,
    threshold: PASS_THRESHOLD,
    xp: TEST_XP,
    level: course.level,
    newLevel,
  });
}
