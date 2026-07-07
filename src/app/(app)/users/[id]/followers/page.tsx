import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Trophy, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { FollowButton } from "@/components/FollowButton";

/**
 * Follower- / Folgt-Liste eines Nutzers. Tab via ?tab=followers|following.
 */
export default async function FollowListPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { tab?: string };
}) {
  const session = await getServerSession(authOptions);
  const viewerId = (session?.user as { id?: string })?.id;
  if (!viewerId) {
    redirect("/login");
  }

  const tab = searchParams.tab === "following" ? "following" : "followers";

  const user = await db.user.findUnique({
    where: { id: params.id },
    select: { id: true, name: true },
  });
  if (!user) {
    notFound();
  }

  // Relations of the profile owner. followers-tab → users who follow this
  // profile; following-tab → users this profile follows.
  const personSelect = { id: true, name: true, xpTotal: true, selfLevel: true } as const;
  const relations = await db.follows.findMany({
    where: tab === "followers" ? { followingId: user.id } : { followerId: user.id },
    select: {
      follower: { select: personSelect },
      following: { select: personSelect },
    },
  });

  const people = relations.map((r) => (tab === "followers" ? r.follower : r.following));

  // Who the viewer already follows (to seed the FollowButton state)
  const viewerFollowing = await db.follows.findMany({
    where: { followerId: viewerId },
    select: { followingId: true },
  });
  const viewerFollowingIds = new Set(viewerFollowing.map((f) => f.followingId));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href={`/users/${user.id}`} className="text-brand-600 hover:underline flex items-center gap-2 font-bold">
        <ArrowLeft className="w-4 h-4" /> Zurück zum Profil
      </Link>

      <div>
        <h1 className="text-h2 font-black text-ink-900 dark:text-ink-50">{user.name || "PolyGlott User"}</h1>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/users/${user.id}/followers?tab=followers`}
            className={`px-4 py-2 rounded-full text-sm font-bold ${
              tab === "followers"
                ? "bg-brand-500 text-white"
                : "bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300"
            }`}
          >
            Follower
          </Link>
          <Link
            href={`/users/${user.id}/followers?tab=following`}
            className={`px-4 py-2 rounded-full text-sm font-bold ${
              tab === "following"
                ? "bg-brand-500 text-white"
                : "bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300"
            }`}
          >
            Folgt
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 shadow-sm border border-ink-100 dark:border-ink-800">
        <div className="space-y-3">
          {people.map((person) => (
            <div key={person.id} className="flex items-center justify-between p-3 bg-ink-50 dark:bg-ink-800/50 rounded-2xl">
              <div className="flex items-center gap-3">
                <Link href={`/users/${person.id}`}>
                  <div className="w-11 h-11 bg-brand-100 dark:bg-brand-900/30 text-brand-600 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5" />
                  </div>
                </Link>
                <div>
                  <Link href={`/users/${person.id}`} className="font-bold text-ink-900 dark:text-ink-50 hover:underline">
                    {person.name || "PolyGlott User"}
                  </Link>
                  <div className="flex items-center gap-3 text-sm text-ink-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-gold" /> {person.xpTotal} XP
                    </span>
                    <span className="bg-ink-200 dark:bg-ink-700 px-2 py-0.5 rounded-full text-xs">
                      Niveau {person.selfLevel}
                    </span>
                  </div>
                </div>
              </div>
              {person.id !== viewerId && (
                <FollowButton userId={person.id} initialIsFollowing={viewerFollowingIds.has(person.id)} />
              )}
            </div>
          ))}
          {people.length === 0 && (
            <p className="text-ink-500 text-center py-8">
              {tab === "followers" ? "Noch keine Follower." : "Folgt noch niemandem."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
