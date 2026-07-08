import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Crown, Shield } from "lucide-react";
import { AdminUserActions } from "@/components/AdminUserActions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({ searchParams }: { searchParams?: { q?: string } }) {
  const me = await getCurrentUser();
  const query = (searchParams?.q ?? "").trim();

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { progress: true, reviews: true, followers: true } } },
  });

  const filtered = query
    ? users.filter(
        (u) =>
          (u.name ?? "").toLowerCase().includes(query.toLowerCase()) ||
          u.email.toLowerCase().includes(query.toLowerCase())
      )
    : users;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-h3 font-bold text-ink-900">
          Nutzer <span className="text-ink-500">({filtered.length})</span>
        </h2>
        <form className="w-full sm:w-72">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Name oder E-Mail suchen …"
            aria-label="Nutzer suchen"
            className="min-h-[44px] w-full rounded-button border border-ink-100 bg-surface px-4 text-body text-ink-900 placeholder:text-ink-500 outline-none focus:border-brand-500"
          />
        </form>
      </div>

      <div className="space-y-3">
        {filtered.map((u) => (
          <div key={u.id} className="rounded-card border border-ink-100 bg-surface p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Link href={`/admin/users/${u.id}`} className="truncate font-bold text-ink-900 hover:underline">
                    {u.name || "Ohne Namen"}
                  </Link>
                  {u.isAdmin && <Shield aria-label="Admin" className="h-4 w-4 shrink-0 text-brand-600" />}
                  {u.isPremium && <Crown aria-label="Premium" className="h-4 w-4 shrink-0 text-gold" />}
                </div>
                <div className="truncate text-caption text-ink-500">{u.email}</div>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-caption text-ink-500">
                  <span className="nums">{u.xpTotal} XP</span>
                  <span>Niveau {u.selfLevel}</span>
                  <span className="nums">{u._count.progress} Lekt.</span>
                  <span className="nums">{u._count.reviews} Karten</span>
                  <span className="nums">{u._count.followers} Follower</span>
                </div>
              </div>
              <AdminUserActions
                userId={u.id}
                isPremium={u.isPremium}
                isAdmin={u.isAdmin}
                isSelf={u.id === me?.id}
              />
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-ink-500">Keine Nutzer gefunden.</p>
        )}
      </div>
    </div>
  );
}
