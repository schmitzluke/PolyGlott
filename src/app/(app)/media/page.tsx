import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { MediaPageClient } from "@/components/MediaPageClient";

export const dynamic = "force-dynamic";

/** Pre-Input Comprehension: Transkripte importieren, Kernvokabular vorab lernen. */
export default async function MediaPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const transcripts = await db.transcript.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, status: true, comprehended: true, createdAt: true },
  });

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">Media Comprehension</h1>
        <p className="text-body text-ink-600">
          Transkript importieren, Kernsätze vorab lernen, dann verstehen statt raten.
        </p>
      </div>
      <MediaPageClient
        initialTranscripts={transcripts.map((t) => ({ ...t, createdAt: t.createdAt.toISOString() }))}
      />
    </div>
  );
}
