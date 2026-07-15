import { StashPageClient } from "@/components/StashPageClient";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function StashPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const sentences = await db.stashSentence.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-ink-50 p-6">
      <div className="mx-auto max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-h3 font-bold text-ink-900">Sätze lernen</h1>
          <p className="text-body text-ink-600">Sprich einen deutschen Satz. Wir übersetzen ihn ins Türkische.</p>
        </div>

        <StashPageClient initialSentences={sentences} />
      </div>
    </div>
  );
}
