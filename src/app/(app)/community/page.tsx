import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Trophy, User as UserIcon } from "lucide-react";
import { FollowButton } from "@/components/FollowButton";
import { UserSearch } from "@/components/UserSearch";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;
  if (!userId) {
    redirect("/login");
  }

  const query = (searchParams?.q ?? "").trim();

  const currentUser = await db.user.findUnique({
    where: { id: userId },
    include: {
      following: true,
    },
  });

  const followingIds = currentUser?.following.map((f) => f.followingId) || [];

  // Kandidaten laden; bei Suche einen größeren Pool, dann case-insensitive filtern
  // (SQLite `contains` ist case-sensitive und kennt kein mode:"insensitive").
  const candidates = await db.user.findMany({
    where: { id: { not: userId } },
    orderBy: { xpTotal: "desc" },
    take: query ? 300 : 50,
  });

  const users = query
    ? candidates.filter((u) => (u.name ?? "").toLowerCase().includes(query.toLowerCase()))
    : candidates;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-display font-black text-ink-900">Community</h1>
        <p className="text-body text-ink-500 mt-2">
          Entdecke andere Lernende und folge ihrem Fortschritt in PolyGlott.
        </p>
      </div>

      <UserSearch initialQuery={query} />

      <div className="rounded-card border border-ink-100 bg-surface p-6 shadow-soft">
        <h2 className="text-h3 font-bold text-ink-900 mb-6">
          {query ? `Suchergebnisse für „${query}"` : "Leaderboard"}
        </h2>
        <div className="space-y-4">
          {users.map((user, index) => {
            const isFollowing = followingIds.includes(user.id);
            return (
              <div
                key={user.id}
                className="flex items-center justify-between gap-3 rounded-button bg-ink-50 p-4"
              >
                <div className="flex min-w-0 items-center gap-4">
                  {!query && <div className="w-8 font-bold text-ink-500">#{index + 1}</div>}
                  <Link href={`/users/${user.id}`} className="shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                      <UserIcon className="h-6 w-6" />
                    </div>
                  </Link>
                  <div className="min-w-0">
                    <Link
                      href={`/users/${user.id}`}
                      className="block truncate font-bold text-ink-900 hover:underline"
                    >
                      {user.name || "PolyGlott User"}
                    </Link>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-ink-500">
                      <span className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-gold" /> {user.xpTotal} XP
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-ink-100 px-2 py-0.5 text-xs text-ink-700">
                        Niveau {user.selfLevel}
                      </span>
                    </div>
                  </div>
                </div>
                <FollowButton userId={user.id} initialIsFollowing={isFollowing} />
              </div>
            );
          })}
          {users.length === 0 && (
            <p className="py-8 text-center text-ink-500">
              {query
                ? `Keine Nutzer für „${query}" gefunden.`
                : "Noch keine anderen Benutzer hier."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
