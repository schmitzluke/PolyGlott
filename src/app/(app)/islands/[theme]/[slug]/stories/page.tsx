import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

/** Liste der Erzählungen einer Insel — Antippen startet die Story-Session. */
export default async function IslandStoriesPage({
  params,
}: {
  params: { theme: string; slug: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const pack = await db.islandPack.findUnique({
    where: { slug: params.slug },
    include: {
      stories: {
        orderBy: { order: "asc" },
        include: { _count: { select: { sentences: true } } },
      },
    },
  });

  if (!pack || (!pack.isCustom && pack.userId) || (pack.isCustom && pack.userId !== user.id)) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">Erzählungen</h1>
        <p className="text-body text-ink-600">{pack.title}</p>
      </div>
      <div className="flex flex-col gap-3">
        {pack.stories.map((story) => (
          <Link key={story.id} href={`/islands/${params.theme}/${params.slug}/stories/${story.id}/practice`}>
            <Card className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50" aria-hidden>
                <BookOpen className="h-5 w-5 text-brand-600" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-900">{story.title}</p>
                <p className="text-caption text-ink-500">{story._count.sentences} Sätze</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
