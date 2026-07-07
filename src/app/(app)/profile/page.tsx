import { redirect } from "next/navigation";
import Link from "next/link";
import { Snowflake } from "lucide-react";
import { AchievementIcon } from "@/components/AchievementIcon";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { toDateKey, xpForNextLevel } from "@/lib/gamification";
import { Card } from "@/components/ui/Card";
import { StreakFlame } from "@/components/ui/StreakFlame";
import { XPBadge } from "@/components/ui/XPBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { XpChart } from "@/components/XpChart";
import { StreakCalendar } from "@/components/StreakCalendar";

/** Profil & Statistiken: XP-Verlauf, Streak-Kalender, Abzeichen. */
export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const since = new Date();
  since.setDate(since.getDate() - 27);
  since.setHours(0, 0, 0, 0);

  const [streak, xpEvents, lessonCount, vocabCount, achievements, unlocked] = await Promise.all([
    db.streak.findUnique({ where: { userId: user.id } }),
    db.xpEvent.findMany({ where: { userId: user.id, createdAt: { gte: since } } }),
    db.userProgress.count({ where: { userId: user.id } }),
    db.reviewItem.count({ where: { userId: user.id } }),
    db.achievement.findMany({ orderBy: { threshold: "asc" } }),
    db.userAchievement.findMany({ where: { userId: user.id } }),
  ]);

  // XP pro Tag (letzte 14 Tage) + aktive Tage (letzte 28)
  const xpByDay = new Map<string, number>();
  for (const e of xpEvents) {
    const key = toDateKey(e.createdAt);
    xpByDay.set(key, (xpByDay.get(key) ?? 0) + e.amount);
  }
  const chartData: { label: string; xp: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = toDateKey(d);
    chartData.push({ label: `${d.getDate()}.${d.getMonth() + 1}.`, xp: xpByDay.get(key) ?? 0 });
  }
  const activeDays = new Set(xpByDay.keys());

  const unlockedIds = new Set(unlocked.map((u) => u.achievementId));
  const level = xpForNextLevel(user.xpTotal);

  return (
    <main className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-h1">{user.name ?? "Dein Profil"}</h1>
            <span className="rounded-chip bg-brand-50 px-2 py-0.5 text-caption font-bold text-brand-600">
              Niveau {user.selfLevel}
            </span>
          </div>
          <p className="text-caption text-ink-500">{user.email} · dabei seit {user.createdAt.toLocaleDateString("de-DE")}</p>
        </div>
        <div className="flex items-center gap-3">
          <StreakFlame days={streak?.current ?? 0} />
          <XPBadge xp={user.xpTotal} />
        </div>
      </div>

      <Card className="!p-0">
        <dl className="grid grid-cols-3 divide-x divide-ink-100">
          <div className="flex flex-col gap-1.5 px-4 py-5 sm:px-6">
            <dt className="text-caption text-ink-500">Vokabeln</dt>
            <dd className="text-display tabular-nums text-ink-900">{vocabCount}</dd>
          </div>
          <div className="flex flex-col gap-1.5 px-4 py-5 sm:px-6">
            <dt className="text-caption text-ink-500">Lektionen</dt>
            <dd className="text-display tabular-nums text-ink-900">{lessonCount}</dd>
          </div>
          <div className="flex flex-col gap-1.5 px-4 py-5 sm:px-6">
            <dt className="text-caption text-ink-500">Level</dt>
            <dd className="flex items-baseline gap-1.5 text-display tabular-nums text-ink-900">
              <span className="text-h2 font-bold text-ink-500">Lv.</span>
              {level.level}
            </dd>
            <ProgressBar value={Math.round(level.progress * 100)} max={100} label="Level-Fortschritt" />
          </div>
        </dl>
      </Card>

      <Card>
        <h2 className="mb-3 text-h3">XP-Verlauf (14 Tage)</h2>
        <XpChart data={chartData} />
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-h3">Streak-Kalender</h2>
          <span className="inline-flex items-center gap-1 text-caption tabular-nums text-ink-500">
            Längster Streak: {streak?.longest ?? 0} Tage · {user.streakFreezes} Freeze{user.streakFreezes === 1 ? "" : "s"} übrig
            <Snowflake aria-hidden className="h-3.5 w-3.5 text-info-700" />
          </span>
        </div>
        <StreakCalendar activeDays={activeDays} />
      </Card>

      <Card>
        <h2 className="mb-3 text-h3">Abzeichen</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {achievements.map((a) => {
            const has = unlockedIds.has(a.id);
            return (
              <div
                key={a.id}
                className={`rounded-chip p-3 text-center ${has ? "border border-gold/20 bg-gold/10" : "border border-transparent bg-ink-100 opacity-50 grayscale"}`}
                title={a.description}
              >
                <AchievementIcon icon={a.icon} className="mx-auto h-8 w-8" />
                <p className="mt-1 text-caption font-bold">{a.title}</p>
                <p className="mt-0.5 text-caption text-ink-500">{a.description}</p>
              </div>
            );
          })}
        </div>
      </Card>

      <Link href="/leaderboard" className="text-center text-body font-semibold text-brand-600 hover:underline">
        Zum Wochen-Leaderboard →
      </Link>
    </main>
  );
}
