import { VoiceCaptureStash } from "@/components/VoiceCaptureStash";
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

        <div className="rounded-xl bg-white p-8 shadow-lifted">
          <VoiceCaptureStash />
        </div>

        <div className="space-y-3">
          <h2 className="text-h4 font-semibold text-ink-900">Deine Sätze ({sentences.length})</h2>
          {sentences.length === 0 && (
            <p className="text-caption text-ink-500">Noch keine Sätze gespeichert.</p>
          )}
          {sentences.map((s) => (
            <div key={s.id} className="rounded-xl bg-white p-4 shadow-card">
              <p className="text-body font-medium text-ink-900">{s.germanOriginal}</p>
              {s.status === "READY" ? (
                <p className="text-body text-brand-600">{s.turkishTranslation}</p>
              ) : (
                <p className="text-caption text-ink-500">Wird übersetzt …</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
