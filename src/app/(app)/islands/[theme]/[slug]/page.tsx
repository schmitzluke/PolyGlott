import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { deriveSentenceStars } from "@/lib/islandStatus";
import { IslandDetailClient } from "@/components/IslandDetailClient";

export const dynamic = "force-dynamic";

/** Insel-Detail (Ebene 3): Satzliste mit Fortschritts-Indikator + Übernehmen-Button. */
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
      sentences: {
        orderBy: { order: "asc" },
        include: { reviews: { where: { userId: user.id }, select: { state: true, stability: true } } },
      },
      // Privacy: bei kuratierten (globalen) Inseln können StashSentences mehrerer
      // Nutzer angehängt sein — immer auf den eingeloggten Nutzer filtern, sonst
      // sähe man fremde eigene Sätze (gleicher Fix wie bei /islands API-Route).
      stashSentences: {
        where: { userId: user.id },
        include: { reviews: { where: { userId: user.id }, select: { state: true, stability: true } } },
      },
    },
  });

  if (!pack || (!pack.isCustom && pack.userId) || (pack.isCustom && pack.userId !== user.id)) {
    notFound();
  }
  if (!pack) notFound();

  const curatedSentences = pack.sentences.map((s) => ({
    id: s.id,
    germanOriginal: s.germanOriginal,
    turkishTranslation: s.turkishTranslation,
    stars: deriveSentenceStars(s.reviews[0] ?? null),
  }));
  const customSentences = pack.stashSentences.map((s) => ({
    id: s.id,
    germanOriginal: s.germanOriginal,
    turkishTranslation: s.turkishTranslation ?? "",
    stars: deriveSentenceStars(s.reviews[0] ?? null),
  }));
  const sentences = [...curatedSentences, ...customSentences];

  const canJoin = !pack.isCustom;
  const joined = pack.sentences.filter((s) => s.reviews.length > 0).length;
  const totalCurated = pack.sentences.length;

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">{pack.title}</h1>
        <p className="text-body text-ink-600">
          {pack.level} · {sentences.length} Sätze
        </p>
      </div>
      <IslandDetailClient
        packId={pack.id}
        sentences={sentences}
        canJoin={canJoin}
        joined={joined}
        totalCurated={totalCurated}
      />
    </div>
  );
}
