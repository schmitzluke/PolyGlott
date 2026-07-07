import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isStreakAlive, toDateKey, xpForNextLevel } from "@/lib/gamification";
import { deepLink } from "@/lib/publicUrl";

/**
 * Public API for external integration (e.g., companion apps).
 * Provides a read-only summary of the user's progress and upcoming tasks.
 * 
 * TODO: Add authentication mechanism (e.g., API key) for production.
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // 1. Fetch User Data
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

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Fetch Gamification Data
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

    // 3. Fetch Learning Tasks (Due Reviews)
    const dueReviewsCount = await db.reviewItem.count({
      where: { userId, dueAt: { lte: new Date() } },
    });

    // 4. Fetch Learning Tasks (Next Lesson)
    const progress = await db.userProgress.findMany({
      where: { userId },
      select: { lessonId: true },
    });
    const doneLessonIds = new Set(progress.map((p) => p.lessonId));
    
    // Find the next available lesson
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
    
    const allLessons = course?.units.flatMap((u) => u.lessons.map(l => ({...l, unitTitle: u.title}))) ?? [];
    const nextLesson = allLessons.find((l) => !doneLessonIds.has(l.id));

    // Construct Response Payload
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        targetLanguage: user.targetLanguage,
      },
      gamification: {
        level: levelInfo.level,
        xpTotal: user.xpTotal,
        todayXp: todayXp,
        dailyGoalXp: user.dailyGoalXp,
        streak: {
          current: streak?.current ?? 0,
          alive: streakAlive,
        }
      },
      tasks: {
        dueReviews: dueReviewsCount,
        nextLesson: nextLesson ? {
          id: nextLesson.id,
          title: nextLesson.title,
          unitTitle: nextLesson.unitTitle,
          deepLink: deepLink(`/lessons/${nextLesson.id}`)
        } : null,
        reviewDeepLink: deepLink("/review"),
      }
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error("External API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
