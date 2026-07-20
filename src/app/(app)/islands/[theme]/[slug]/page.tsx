import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { IslandDetailClient } from "@/components/IslandDetailClient";

export const dynamic = "force-dynamic";

/** Insel-Detail (Ebene 3): Auswahl zwischen Sätzen und Erzählungen. */
export default async function IslandDetailPage({
  params,
}: {
  params: { theme: string; slug: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const pack = await db.islandPack.findUnique({
    where: { slug: params.slug },
    include: {
      _count: { select: { sentences: true, stories: true } },
      // Privacy: bei kuratierten (globalen) Inseln können StashSentences mehrerer
      // Nutzer angehängt sein — immer auf den eingeloggten Nutzer filtern, sonst
      // sähe man fremde eigene Sätze (gleicher Fix wie bei /islands API-Route).
      stashSentences: { where: { userId: user.id }, select: { id: true } },
      sentences: { select: { reviews: { where: { userId: user.id }, select: { id: true } } } },
    },
  });

  if (!pack || (!pack.isCustom && pack.userId) || (pack.isCustom && pack.userId !== user.id)) {
    notFound();
  }

  const sentenceCount = pack._count.sentences + pack.stashSentences.length;
  const storyCount = pack._count.stories;
  const canJoin = !pack.isCustom;
  const joined = pack.sentences.filter((s) => s.reviews.length > 0).length;
  const totalCurated = pack.sentences.length;

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">{pack.title}</h1>
        <p className="text-body text-ink-600">{pack.level}</p>
      </div>
      <IslandDetailClient
        theme={params.theme}
        slug={params.slug}
        packId={pack.id}
        sentenceCount={sentenceCount}
        storyCount={storyCount}
        canJoin={canJoin}
        joined={joined}
        totalCurated={totalCurated}
      />
    </div>
  );
}
