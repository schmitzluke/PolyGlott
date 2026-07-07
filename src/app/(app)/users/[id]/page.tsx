import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Trophy, User as UserIcon, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FollowButton } from "@/components/FollowButton";

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
    }
  });

  if (!user) {
    notFound();
  }

  const isCurrentUser = userId === user.id;
  const isFollowing = user.followers.some(f => f.followerId === userId);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <Link href="/community" className="text-brand-600 hover:underline flex items-center gap-2 mb-6 font-bold">
          <ArrowLeft className="w-4 h-4" /> Zurück zur Community
        </Link>
      </div>

      <div className="bg-white dark:bg-ink-900 rounded-3xl p-8 shadow-sm border border-ink-100 dark:border-ink-800 text-center">
        <div className="w-24 h-24 bg-brand-100 dark:bg-brand-900/30 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserIcon className="w-12 h-12" />
        </div>
        <h1 className="text-h2 font-black text-ink-900 dark:text-ink-50 mb-1">
          {user.name || "PolyGlott User"}
        </h1>
        <p className="text-ink-500 mb-6">
          Niveau {user.selfLevel} • Lernt {user.targetLanguage.toUpperCase()}
        </p>

        {!isCurrentUser && (
          <div className="flex justify-center mb-8">
            <FollowButton userId={user.id} initialIsFollowing={isFollowing} />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
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
          <div>
            <span className="text-lg text-ink-900 dark:text-ink-50">{user.followers.length}</span> Follower
          </div>
          <div>
            <span className="text-lg text-ink-900 dark:text-ink-50">{user.following.length}</span> Folgt
          </div>
        </div>
      </div>
    </div>
  );
}
