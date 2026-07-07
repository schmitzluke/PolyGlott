import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Trophy, Flame, User as UserIcon } from "lucide-react";
import { FollowButton } from "@/components/FollowButton";

export default async function CommunityPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;
  if (!userId) {
    redirect("/login");
  }

  const currentUser = await db.user.findUnique({
    where: { id: userId },
    include: {
      following: true,
    }
  });

  const followingIds = currentUser?.following.map(f => f.followingId) || [];

  // Fetch some top users (Leaderboard style)
  const topUsers = await db.user.findMany({
    where: {
      id: { not: userId },
    },
    orderBy: { xpTotal: "desc" },
    take: 50,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-display font-black text-ink-900 dark:text-ink-50">Community</h1>
        <p className="text-body text-ink-600 dark:text-ink-400 mt-2">
          Entdecke andere Lernende und folge ihrem Fortschritt in PolyGlott.
        </p>
      </div>

      <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 shadow-sm border border-ink-100 dark:border-ink-800">
        <h2 className="text-h3 font-bold mb-6">Leaderboard</h2>
        <div className="space-y-4">
          {topUsers.map((user, index) => {
            const isFollowing = followingIds.includes(user.id);
            return (
              <div key={user.id} className="flex items-center justify-between p-4 bg-ink-50 dark:bg-ink-800/50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-8 font-bold text-ink-400">#{index + 1}</div>
                  <Link href={`/users/${user.id}`}>
                    <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 text-brand-600 rounded-full flex items-center justify-center">
                      <UserIcon className="w-6 h-6" />
                    </div>
                  </Link>
                  <div>
                    <Link href={`/users/${user.id}`} className="font-bold text-ink-900 dark:text-ink-50 hover:underline">
                      {user.name || "PolyGlott User"}
                    </Link>
                    <div className="flex items-center gap-3 text-sm text-ink-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-gold" /> {user.xpTotal} XP
                      </span>
                      <span className="flex items-center gap-1 bg-ink-200 dark:bg-ink-700 px-2 py-0.5 rounded-full text-xs">
                        Niveau {user.selfLevel}
                      </span>
                    </div>
                  </div>
                </div>
                <FollowButton userId={user.id} initialIsFollowing={isFollowing} />
              </div>
            );
          })}
          {topUsers.length === 0 && (
            <p className="text-ink-500 text-center py-8">Noch keine anderen Benutzer hier.</p>
          )}
        </div>
      </div>
    </div>
  );
}
