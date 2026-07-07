import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Card } from "@/components/ui/Card";

/** Wöchentliches Leaderboard: XP der letzten 7 Tage. */
export default async function LeaderboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const since = new Date();
  since.setDate(since.getDate() - 7);

  const weekly = await db.xpEvent.groupBy({
    by: ["userId"],
    where: { createdAt: { gte: since } },
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
    take: 20,
  });

  const users = await db.user.findMany({
    where: { id: { in: weekly.map((w) => w.userId) } },
    select: { id: true, name: true, email: true },
  });
  const userMap = new Map(users.map((u) => [u.id, u]));
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4">
      <h1 className="text-h1">Wochen-Leaderboard</h1>
      <p className="text-body text-ink-500">XP der letzten 7 Tage – neue Woche, neues Glück!</p>
      <Card>
        {weekly.length === 0 ? (
          <p className="text-body text-ink-500">Noch keine XP diese Woche – sei die erste Person auf dem Treppchen!</p>
        ) : (
          <ol className="flex flex-col divide-y divide-ink-100">
            {weekly.map((entry, i) => {
              const u = userMap.get(entry.userId);
              const isMe = entry.userId === user.id;
              const label = u?.name || u?.email.split("@")[0] || "Anonym";
              return (
                <li
                  key={entry.userId}
                  className={`flex items-center gap-3 py-3 ${isMe ? "-mx-2 rounded-chip bg-brand-50 px-2" : ""}`}
                >
                  <span className="w-8 text-center text-h3">{medals[i] ?? i + 1}</span>
                  <span className="flex-1 font-semibold">
                    {label} {isMe && <span className="text-caption text-brand-600">(du)</span>}
                  </span>
                  <span className="font-bold text-brand-600">{entry._sum.amount ?? 0} XP</span>
                </li>
              );
            })}
          </ol>
        )}
      </Card>
    </main>
  );
}
