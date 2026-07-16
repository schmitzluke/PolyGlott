import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommutePlayer } from "@/components/CommutePlayer";

export const dynamic = "force-dynamic";

/** Hands-Free Audio Flooding: Endlosschleife über READY-Sätze, für tote Zeit (Pendeln, Abwaschen). */
export default async function CommutePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const sentences = await db.stashSentence.findMany({
    where: { userId: user.id, status: "READY" },
    orderBy: { createdAt: "desc" },
    select: { id: true, germanOriginal: true, turkishTranslation: true },
  });

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">Commute Mode</h1>
        <p className="text-body text-ink-600">Zuhören ohne Bildschirm – oder mit Pause zum Nachsprechen.</p>
      </div>
      <CommutePlayer sentences={sentences} />
    </div>
  );
}
