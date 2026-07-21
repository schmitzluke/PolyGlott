import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReviewSessionClient } from "@/components/ReviewSessionClient";

export const dynamic = "force-dynamic";

/** Karteikarten-Session für eine einzelne Erzählung. */
export default async function IslandStoryPracticePage({
  params,
}: {
  params: { theme: string; slug: string; storyId: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const pack = await db.islandPack.findUnique({
    where: { slug: params.slug },
    select: { id: true, isCustom: true, userId: true },
  });

  if (!pack || (!pack.isCustom && pack.userId) || (pack.isCustom && pack.userId !== user.id)) {
    notFound();
  }

  const story = await db.islandStory.findUnique({
    where: { id: params.storyId },
    select: { id: true, title: true, packId: true },
  });

  if (!pack || !story || story.packId !== pack.id) notFound();

  return (
    <ReviewSessionClient
      apiUrl={`/api/reviews?islandPackId=${pack.id}&contentType=stories&storyId=${story.id}`}
      title={story.title}
      emptyState={{
        icon: "book-open",
        heading: "Nichts fällig",
        body: "In dieser Erzählung ist gerade nichts zu wiederholen.",
        primaryHref: `/islands/${params.theme}/${params.slug}/stories`,
        primaryLabel: "Zurück zu den Erzählungen",
      }}
    />
  );
}
