import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { MediaStudyPlayer } from "@/components/MediaStudyPlayer";

export const dynamic = "force-dynamic";

export default async function MediaDetailPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const transcript = await db.transcript.findFirst({
    where: { id: params.id, userId: user.id },
    include: { sentences: { orderBy: { rank: "asc" } } },
  });
  if (!transcript) notFound();

  return (
    <MediaStudyPlayer
      transcript={{
        id: transcript.id,
        title: transcript.title,
        status: transcript.status,
        comprehended: transcript.comprehended,
        sentences: transcript.sentences.map((s) => ({ id: s.id, turkish: s.turkish, german: s.german })),
      }}
    />
  );
}
