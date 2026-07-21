import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReviewSessionClient } from "@/components/ReviewSessionClient";

export const dynamic = "force-dynamic";

/** Karteikarten-Session für die Einzelsätze einer Insel (gescoped, kein globaler Mix). */
export default async function IslandPracticePage({
  params,
}: {
  params: { theme: string; slug: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const pack = await db.islandPack.findUnique({
    where: { slug: params.slug },
    select: { id: true, title: true, isCustom: true, userId: true },
  });

  if (!pack || (!pack.isCustom && pack.userId) || (pack.isCustom && pack.userId !== user.id)) {
    notFound();
  }

  return (
    <ReviewSessionClient
      apiUrl={`/api/reviews?islandPackId=${pack.id}&contentType=sentences`}
      title={pack.title}
      emptyState={{
        icon: "layers",
        heading: "Nichts fällig",
        body: "In dieser Insel ist gerade nichts zu wiederholen. Komm wieder, wenn Sätze fällig sind, oder übernimm die Insel, falls noch nicht geschehen.",
        primaryHref: `/islands/${params.theme}/${params.slug}`,
        primaryLabel: "Zurück zur Insel",
      }}
    />
  );
}
