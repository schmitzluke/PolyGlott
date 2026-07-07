import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Trophy, User as UserIcon, Calendar, ArrowLeft, Star, Users } from "lucide-react";
import Link from "next/link";
import { FollowButton } from "@/components/FollowButton";
import { AchievementIcon } from "@/components/AchievementIcon";
import { xpForNextLevel } from "@/lib/gamification";
import { getLearnedLanguages } from "@/lib/languages";

export default async function PublicProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;
  if (!userId) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: params.id },
    include: {
      followers: true,
      following: true,
    },
  });

  if (!user) {
    notFound();
  }

  const [achievements, unlocked, languages] = await Promise.all([
    db.achievement.findMany({ orderBy: { threshold: "asc" } }),
    db.userAchievement.findMany({ where: { userId: user.id } }),
    getLearnedLanguages(user.id),
  ]);

  const isCurrentUser = userId === user.id;
  const isFollowing = user.followers.some((f) => f.followerId === userId);
  const followsMe = user.following.some((f) => f.followingId === userId);
  const isMutual = isFollowing && followsMe;
  const level = xpForNextLevel(user.xpTotal);
  const unlockedIds = new Set(unlocked.map((u) => u.achievementId));
  const unlockedAchievements = achievements.filter((a) => unlockedIds.has(a.id));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link href="/community" className="text-brand-600 hover:underline flex items-center gap-2 mb-6 font-bold">
          <ArrowLeft className="w-4 h-4" /> Zurück zur Community
        </Link>
      </div>

      <div className="bg-white dark:bg-ink-900 rounded-3xl p-8 shadow-sm border border-ink-100 dark:border-ink-800 text-center">
        <div className="w-24 h-24 bg-brand-100 dark:bg-brand-900/30 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserIcon className="w-12 h-12" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <h1 className="text-h2 font-black text-ink-900 dark:text-ink-50">
            {user.name || "PolyGlott User"}
          </h1>
          {isMutual && (
            <span className="rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 px-2 py-0.5 text-xs font-bold">
              Ihr folgt euch
            </span>
          )}
        </div>
        <p className="text-ink-500 mb-6">
          Niveau {user.selfLevel} • Lernt {user.targetLanguage.toUpperCase()}
        </p>

        {!isCurrentUser && (
          <div className="flex justify-center mb-8">
            <FollowButton userId={user.id} initialIsFollowing={isFollowing} />
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-ink-50 dark:bg-ink-800/50 p-4 rounded-2xl flex flex-col items-center">
            <Star className="w-8 h-8 text-brand-500 mb-2" />
            <span className="text-2xl font-black">Lv. {level.level}</span>
            <span className="text-ink-500 text-sm font-bold uppercase tracking-wider">Level</span>
          </div>

          <div className="bg-ink-50 dark:bg-ink-800/50 p-4 rounded-2xl flex flex-col items-center">
            <Trophy className="w-8 h-8 text-gold mb-2" />
            <span className="text-2xl font-black">{user.xpTotal}</span>
            <span className="text-ink-500 text-sm font-bold uppercase tracking-wider">Gesamt XP</span>
          </div>

          <div className="bg-ink-50 dark:bg-ink-800/50 p-4 rounded-2xl flex flex-col items-center">
            <Calendar className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-2xl font-black">
              {new Date(user.createdAt).toLocaleDateString("de-DE", { month: "short", year: "numeric" })}
            </span>
            <span className="text-ink-500 text-sm font-bold uppercase tracking-wider">Dabei seit</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-8 text-sm font-bold text-ink-600 dark:text-ink-400">
          <Link href={`/users/${user.id}/followers?tab=followers`} className="hover:text-brand-600">
            <span className="text-lg text-ink-900 dark:text-ink-50">{user.followers.length}</span> Follower
          </Link>
          <Link href={`/users/${user.id}/followers?tab=following`} className="hover:text-brand-600">
            <span className="text-lg text-ink-900 dark:text-ink-50">{user.following.length}</span> Folgt
          </Link>
        </div>
      </div>

      {/* Erlernte Sprachen + Niveau */}
      <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 shadow-sm border border-ink-100 dark:border-ink-800">
        <h2 className="text-h3 font-bold mb-4">Sprachen</h2>
        {languages.length > 0 ? (
          <div className="space-y-3">
            {languages.map((lang) => (
              <div key={lang.code} className="flex items-center justify-between p-3 bg-ink-50 dark:bg-ink-800/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className="font-bold text-ink-900 dark:text-ink-50">{lang.label}</div>
                    <div className="text-sm text-ink-500">{lang.lessonCount} Lektionen abgeschlossen</div>
                  </div>
                </div>
                <span className="rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 px-3 py-1 text-sm font-black">
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-ink-500 text-sm">Noch keine Lektionen abgeschlossen.</p>
        )}
      </div>

      {/* Abzeichen */}
      <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 shadow-sm border border-ink-100 dark:border-ink-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-h3 font-bold">Abzeichen</h2>
          <span className="text-sm text-ink-500 font-bold">
            {unlockedAchievements.length}/{achievements.length}
          </span>
        </div>
        {unlockedAchievements.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {unlockedAchievements.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-gold/20 bg-gold/10 p-3 text-center"
                title={a.description}
              >
                <AchievementIcon icon={a.icon} className="mx-auto h-8 w-8" />
                <p className="mt-1 text-sm font-bold text-ink-900 dark:text-ink-50">{a.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-ink-500 text-sm flex items-center gap-2">
            <Users className="w-4 h-4" /> Noch keine Abzeichen freigeschaltet.
          </p>
        )}
      </div>
    </div>
  );
}
