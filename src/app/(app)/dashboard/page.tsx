import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BookOpen, RotateCcw } from "lucide-react";
import { FREQUENCY_VOCAB } from "../../../../content/frequency-tr";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { isStreakAlive, toDateKey, xpForNextLevel } from "@/lib/gamification";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StreakFlame } from "@/components/ui/StreakFlame";
import { XPBadge } from "@/components/ui/XPBadge";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [streak, todayXpAgg, dueCount, progress, course, freqLearned, totalCards] = await Promise.all([
    db.streak.findUnique({ where: { userId: user.id } }),
    db.xpEvent.aggregate({
      where: { userId: user.id, createdAt: { gte: startOfDay } },
      _sum: { amount: true },
    }),
    db.reviewItem.count({ where: { userId: user.id, dueAt: { lte: new Date() } } }),
    db.userProgress.findMany({ where: { userId: user.id }, select: { lessonId: true } }),
    db.course.findFirst({
      where: { targetLang: user.targetLanguage, isPremium: false },
      orderBy: { order: "asc" },
      include: {
        units: {
          orderBy: { order: "asc" },
          include: { lessons: { orderBy: { order: "asc" }, select: { id: true, title: true, slug: true } } },
        },
      },
    }),
    db.reviewItem.count({ where: { userId: user.id, vocab: { freqRank: { not: null } } } }),
    db.reviewItem.count({ where: { userId: user.id } }),
  ]);

  const todayXp = todayXpAgg._sum.amount ?? 0;
  const doneLessonIds = new Set(progress.map((p) => p.lessonId));
  const allLessons = course?.units.flatMap((u) => u.lessons.map((l) => ({ ...l, unitTitle: u.title }))) ?? [];
  const nextLesson = allLessons.find((l) => !doneLessonIds.has(l.id));
  const completedCount = allLessons.filter((l) => doneLessonIds.has(l.id)).length;

  const streakAlive = streak
    ? isStreakAlive(
        { current: streak.current, longest: streak.longest, lastActiveDate: streak.lastActiveDate, freezesAvailable: user.streakFreezes },
        toDateKey(new Date())
      )
    : false;
  const level = xpForNextLevel(user.xpTotal);

  return (
    <main className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">Merhaba{user.name ? `, ${user.name}` : ""}!</h1>
        <div className="flex items-center gap-3">
          <StreakFlame days={streak?.current ?? 0} active={streakAlive} />
          <XPBadge xp={user.xpTotal} />
        </div>
      </div>

      {/* Tagesziel */}
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-h3">Tagesziel</h2>
          <span className="text-caption tabular-nums text-ink-500">
            {Math.min(todayXp, user.dailyGoalXp)}/{user.dailyGoalXp} XP
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar value={todayXp} max={user.dailyGoalXp} color={todayXp >= user.dailyGoalXp ? "bg-correct-500" : "bg-brand-500"} label="Tagesziel" />
        </div>
        <p className="mt-2 text-caption text-ink-500">
          {todayXp >= user.dailyGoalXp
            ? "Tagesziel erreicht – dein Streak ist sicher!"
            : `Noch ${user.dailyGoalXp - todayXp} XP bis zum Tagesziel.`}
        </p>
      </Card>

      {/* Wiederholen – es gibt immer Karten (fällige zuerst, dann Festigung) */}
      {totalCards > 0 && (
        <Link href="/review" className="block">
          <div className="rounded-card border-2 border-info-500/30 bg-info-50 p-5 shadow-soft transition-transform duration-150 ease-out-strong active:scale-[0.99] [@media(hover:hover)]:hover:scale-[1.01]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <RotateCcw aria-hidden className="h-6 w-6 shrink-0 text-info-700" />
                <div>
                  <h2 className="text-h3 text-info-700">
                    {dueCount > 0
                      ? `${dueCount} Karte${dueCount === 1 ? "" : "n"} fällig`
                      : "Karten festigen"}
                  </h2>
                  <p className="text-caption text-ink-700">
                    {dueCount > 0
                      ? "Jetzt wiederholen, bevor sie verblassen – dauert nur ein paar Minuten."
                      : `Alles Fällige erledigt – festige ältere Karten aus deinem Stapel (${totalCards} insgesamt).`}
                  </p>
                </div>
              </div>
              <ArrowRight aria-hidden className="h-6 w-6 shrink-0 text-info-700" />
            </div>
          </div>
        </Link>
      )}

      {/* Wortschatz-Trainer */}
      <Link href="/trainer" className="block">
        <div className="rounded-card border border-ink-100 bg-surface p-5 shadow-soft transition-transform duration-150 ease-out-strong active:scale-[0.99] [@media(hover:hover)]:hover:scale-[1.01]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50" aria-hidden>
                <BookOpen className="h-5 w-5 text-brand-600" />
              </span>
              <div>
                <h2 className="text-h3">Wortschatz-Trainer</h2>
                <p className="text-caption tabular-nums text-ink-500">
                  {freqLearned}/{FREQUENCY_VOCAB.length} der wichtigsten Wörter gelernt
                </p>
              </div>
            </div>
            <ArrowRight aria-hidden className="h-6 w-6 shrink-0 text-ink-500" />
          </div>
          <div className="mt-3">
            <ProgressBar value={freqLearned} max={FREQUENCY_VOCAB.length} label="Wortschatz-Fortschritt" />
          </div>
        </div>
      </Link>

      {/* Weiterlernen-CTA */}
      <div className="rounded-card bg-brand-500 p-5 text-brand-ink shadow-soft">
        <p className="text-caption font-bold text-brand-ink/70">
          {course?.title ?? "Dein Kurs"}
        </p>
        {nextLesson ? (
          <>
            <h2 className="mt-1 text-h2">{nextLesson.unitTitle}: {nextLesson.title}</h2>
            <p className="mt-1 text-body text-brand-ink/80">
              Lektion {completedCount + 1} von {allLessons.length}
            </p>
            <Link
              href={`/lessons/${nextLesson.id}`}
              className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-button bg-ink-50 px-8 py-3 font-bold text-brand-600 shadow-lifted transition-transform duration-150 ease-out-strong active:scale-[0.97] [@media(hover:hover)]:hover:scale-[1.02]"
            >
              Weiterlernen <ArrowRight aria-hidden className="h-5 w-5" />
            </Link>
          </>
        ) : (
          <>
            <h2 className="mt-1 text-h2">Alle Lektionen geschafft!</h2>
            <p className="mt-1 text-body text-brand-ink/80">Wiederhole deine Vokabeln oder schau dir den Premium-Kurs an.</p>
            <Link
              href="/premium"
              className="mt-4 inline-block min-h-[48px] rounded-button bg-ink-50 px-8 py-3 font-bold text-brand-600 shadow-lifted"
            >
              Premium entdecken
            </Link>
          </>
        )}
      </div>

      <Card className="!p-0">
        <dl className="grid grid-cols-3 divide-x divide-ink-100">
          <div className="flex flex-col gap-1.5 px-4 py-5 sm:px-6">
            <dt className="text-caption text-ink-500">Lektionen</dt>
            <dd className="text-display tabular-nums text-ink-900">{completedCount}</dd>
          </div>
          <div className="flex flex-col gap-1.5 px-4 py-5 sm:px-6">
            <dt className="text-caption text-ink-500">Längster Streak</dt>
            <dd className="flex items-baseline gap-1.5 text-display tabular-nums text-ink-900">
              {streak?.longest ?? 0}
              <span className="text-h3 font-semibold text-ink-500">Tage</span>
            </dd>
          </div>
          <div className="flex flex-col gap-1.5 px-4 py-5 sm:px-6">
            <dt className="text-caption text-ink-500">Level</dt>
            <dd className="flex items-baseline gap-1.5 text-display tabular-nums text-ink-900">
              <span className="text-h2 font-bold text-ink-500">Lv.</span>
              {level.level}
            </dd>
            <ProgressBar value={Math.round(level.progress * 100)} max={100} label="Level-Fortschritt" />
            <p className="text-caption tabular-nums text-ink-500">{user.xpTotal}/{level.nextAt} XP</p>
          </div>
        </dl>
      </Card>
    </main>
  );
}
