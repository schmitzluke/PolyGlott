import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpenCheck, Play } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FREQUENCY_VOCAB, packCount, packWords } from "../../../../content/frequency-tr";

export default async function TrainerPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const packs = Array.from({ length: packCount() }, (_, i) => {
    const words = packWords(i);
    return {
      index: i,
      category: words[0]?.category ?? "",
      total: words.length,
    };
  });

  return (
    <main className="flex flex-col gap-4">
      <div>
        <h1 className="text-h1">Wortschatz-Trainer</h1>
        <p className="mt-1 text-body text-ink-500">
          Die {FREQUENCY_VOCAB.length} wichtigsten Wörter für den Alltag – aktives Erinnern mit Audio-Verstärkung.
        </p>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-h3">Phase 4: Hardcore Active Recall</h2>
          <span className="text-caption font-bold text-brand-600">{packCount()} Packs</span>
        </div>
        <p className="mt-2 text-body text-ink-500">Zeige Deutsch → erinnere Türkisch → decke auf → höre Audio → bewerte 1-4</p>
      </Card>

      <ol className="grid gap-3 sm:grid-cols-2">
        {packs.map((pack) => (
          <li key={pack.index}>
            <Link
              href={`/trainer/${pack.index + 1}`}
              className="flex items-center justify-between gap-4 rounded-button border-2 border-brand-200 bg-brand-50 px-4 py-3 hover:border-brand-400 hover:bg-brand-100"
            >
              <div className="flex-1">
                <p className="font-semibold text-ink-900">{pack.category}</p>
                <p className="text-caption text-ink-500">{pack.total} Wörter</p>
              </div>
              <Play className="h-5 w-5 shrink-0 text-brand-600" />
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
