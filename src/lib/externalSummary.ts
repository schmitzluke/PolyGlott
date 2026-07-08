import { db } from "@/lib/db";
import { isStreakAlive, toDateKey, xpForNextLevel } from "@/lib/gamification";
import { deepLink } from "@/lib/publicUrl";

/**
 * Read-only Fortschritts-Zusammenfassung eines Nutzers für die Companion-App.
 * Geteilt von `GET /api/external/me` (Bearer = User-Key) und `GET /api/external/user/[id]`.
 * Liefert `null`, wenn der Nutzer nicht existiert.
 */
export async function buildUserSummary(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      xpTotal: true,
      targetLanguage: true,
      dailyGoalXp: true,
      streakFreezes: true,
    },
  });

  if (!user) return null;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const [streak, todayXpAgg] = await Promise.all([
    db.streak.findUnique({ where: { userId } }),
    db.xpEvent.aggregate({
      where: { userId, createdAt: { gte: startOfDay } },
      _sum: { amount: true },
    }),
  ]);
  const todayXp = todayXpAgg._sum.amount ?? 0;
  const streakAlive = streak
    ? isStreakAlive(
        {
          current: streak.current,
          longest: streak.longest,
          lastActiveDate: streak.lastActiveDate,
          freezesAvailable: user.streakFreezes,
        },
        toDateKey(new Date())
      )
    : false;
  const levelInfo = xpForNextLevel(user.xpTotal);

  const dueReviewsCount = await db.reviewItem.count({
    where: { userId, dueAt: { lte: new Date() } },
  });

  const progress = await db.userProgress.findMany({
    where: { userId },
    select: { lessonId: true },
  });
  const doneLessonIds = new Set(progress.map((p) => p.lessonId));

  const course = await db.course.findFirst({
    where: { targetLang: user.targetLanguage, isPremium: false },
    orderBy: { order: "asc" },
    include: {
      units: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" }, select: { id: true, title: true } },
        },
      },
    },
  });

  const allLessons =
    course?.units.flatMap((u) => u.lessons.map((l) => ({ ...l, unitTitle: u.title }))) ?? [];
  const nextLesson = allLessons.find((l) => !doneLessonIds.has(l.id));

  return {
    user: {
      id: user.id,
      name: user.name,
      targetLanguage: user.targetLanguage,
    },
    gamification: {
      level: levelInfo.level,
      xpTotal: user.xpTotal,
      todayXp,
      dailyGoalXp: user.dailyGoalXp,
      streak: {
        current: streak?.current ?? 0,
        alive: streakAlive,
      },
    },
    tasks: {
      dueReviews: dueReviewsCount,
      nextLesson: nextLesson
        ? {
            id: nextLesson.id,
            title: nextLesson.title,
            unitTitle: nextLesson.unitTitle,
            deepLink: deepLink(`/lessons/${nextLesson.id}`),
          }
        : null,
      reviewDeepLink: deepLink("/review"),
    },
  };
}
