import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { IslandsPageClient } from "@/components/IslandsPageClient";

export const dynamic = "force-dynamic";

/** Kuratierte Language Islands: garantiert lernbare Startsätze nach Thema. */
export default async function IslandsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const packs = await db.islandPack.findMany({
    where: { OR: [{ isCustom: false }, { userId: user.id }] },
    orderBy: { order: "asc" },
    include: {
      _count: { select: { sentences: true, stashSentences: true } },
      sentences: {
        select: { reviews: { where: { userId: user.id }, select: { id: true } } },
      },
    },
  });

  const initialPacks = packs.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    level: p.level,
    total: p._count.sentences + p._count.stashSentences,
    joined: p.sentences.filter((s) => s.reviews.length > 0).length,
  }));

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">Inseln entdecken</h1>
        <p className="text-body text-ink-600">
          Kuratierte, garantiert lernbare Sätze nach Thema – ideal für den Einstieg.
        </p>
      </div>
      <IslandsPageClient initialPacks={initialPacks} />
    </div>
  );
}
