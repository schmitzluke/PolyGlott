import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { themeLabel } from "@/lib/islandThemes";
import { IslandsPageClient } from "@/components/IslandsPageClient";

export const dynamic = "force-dynamic";

/** Insel-Liste innerhalb eines Themas (Ebene 2 der Insel-Navigation). */
export default async function IslandsByThemePage({ params }: { params: { theme: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const where =
    params.theme === "sonstiges"
      ? { theme: null, OR: [{ isCustom: false }, { userId: user.id }] }
      : { theme: params.theme, OR: [{ isCustom: false }, { userId: user.id }] };

  const packs = await db.islandPack.findMany({
    where,
    orderBy: { order: "asc" },
    include: {
      _count: { select: { sentences: true, stashSentences: true } },
      sentences: {
        select: { reviews: { where: { userId: user.id }, select: { id: true } } },
      },
    },
  });

  if (packs.length === 0) notFound();

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
        <h1 className="text-h3 font-bold text-ink-900">{themeLabel(params.theme)}</h1>
        <p className="text-body text-ink-600">Tippe eine Insel an, um ihre Sätze zu sehen.</p>
      </div>
      <IslandsPageClient theme={params.theme} initialPacks={initialPacks} />
    </div>
  );
}
