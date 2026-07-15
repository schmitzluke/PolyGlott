import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { AdminUserActions } from "@/components/AdminUserActions";

export const dynamic = "force-dynamic";

export default async function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const me = await getCurrentUser();
  const user = await db.user.findUnique({
    where: { id: params.id },
    include: {
      xpEvents: { orderBy: { createdAt: "desc" }, take: 20 },
      streak: true,
      _count: { select: { reviews: true, achievements: true, followers: true, following: true } },
    },
  });

  if (!user) notFound();

  const facts: [string, string][] = [
    ["E-Mail", user.email],
    ["ID", user.id],
    ["Erstellt", user.createdAt.toLocaleDateString("de-DE")],
    ["Niveau (selbst)", user.selfLevel],
    ["Niveau (bestätigt)", user.confirmedLevel ?? "–"],
    ["XP gesamt", String(user.xpTotal)],
    ["Tagesziel", `${user.dailyGoalXp} XP`],
    ["Streak", user.streak ? `${user.streak.current} (max ${user.streak.longest})` : "–"],
    ["Karteikarten", String(user._count.reviews)],
    ["Abzeichen", String(user._count.achievements)],
    ["Follower / Folgt", `${user._count.followers} / ${user._count.following}`],
    ["Premium", user.isPremium ? "ja" : "nein"],
    ["Admin", user.isAdmin ? "ja" : "nein"],
  ];

  return (
    <div className="space-y-6">
      <Link href="/admin/users" className="inline-flex items-center gap-1 text-caption font-medium text-ink-500 hover:text-ink-900">
        <ArrowLeft aria-hidden className="h-4 w-4" /> Zurück zur Nutzerliste
      </Link>

      <div className="rounded-card border border-ink-100 bg-surface p-5">
        <h2 className="text-h2 font-black text-ink-900">{user.name || "Ohne Namen"}</h2>
        <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {facts.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 border-b border-ink-100 py-1.5">
              <dt className="text-caption text-ink-500">{k}</dt>
              <dd className="nums text-caption font-medium text-ink-900 text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4">
          <AdminUserActions userId={user.id} isPremium={user.isPremium} isAdmin={user.isAdmin} isSelf={user.id === me?.id} />
        </div>
      </div>

      <section>
        <h3 className="text-h3 font-bold text-ink-900 mb-3">Letzte XP-Ereignisse</h3>
        <div className="space-y-2">
          {user.xpEvents.map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-3 rounded-button bg-ink-50 px-4 py-2.5">
              <span className="truncate text-body text-ink-900">{e.reason}</span>
              <span className="nums shrink-0 text-caption font-semibold text-brand-600">+{e.amount}</span>
            </div>
          ))}
          {user.xpEvents.length === 0 && <p className="text-ink-500">Keine XP-Ereignisse.</p>}
        </div>
      </section>
    </div>
  );
}
