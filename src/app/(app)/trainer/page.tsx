import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpenCheck, CheckCircle2, Lock, Play } from "lucide-react";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FREQUENCY_VOCAB, PACK_SIZE, packCount, packWords } from "../../../../content/frequency-tr";

/** Wortschatz-Trainer: die ~500 wichtigsten Wörter in 10er-Packs. */
export default async function TrainerPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const learned = await db.reviewItem.findMany({
    where: { userId: user.id, vocab: { freqRank: { not: null } } },
    select: { vocab: { select: { freqRank: true } } },
  });
  const learnedRanks = new Set(learned.map((l) => l.vocab.freqRank));

  const packs = Array.from({ length: packCount() }, (_, i) => {
    const words = packWords(i);
    const learnedCount = words.filter((w) => learnedRanks.has(w.rank)).length;
    return {
      index: i,
      category: words[0]?.category ?? "",
      learnedCount,
      total: words.length,
      done: learnedCount === words.length,
    };
  });
  const firstOpen = packs.findIndex((p) => !p.done);
  const totalLearned = learnedRanks.size;

  return (
    <main className="flex flex-col gap-4">
      <div>
        <h1 className="text-h1">Wortschatz-Trainer</h1>
        <p className="mt-1 text-body text-ink-500">
          Die {FREQUENCY_VOCAB.length} wichtigsten Wörter und Sätze für den Alltag – in kleinen
          Packs, spielerisch geübt. Alles Gelernte landet automatisch in deiner Wiederholung.
        </p>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-h3">Dein Wortschatz</h2>
          <span className="text-caption font-bold text-brand-600">
            {totalLearned}/{FREQUENCY_VOCAB.length} Wörter
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar value={totalLearned} max={FREQUENCY_VOCAB.length} label="Wortschatz-Fortschritt" />
        </div>
      </Card>

      <ol className="grid gap-3 sm:grid-cols-2">
        {packs.map((pack) => {
          const locked = firstOpen !== -1 && pack.index > firstOpen;
          const isActive = pack.index === firstOpen;
          if (locked) {
            return (
              <li key={pack.index}>
                <Card className="flex h-full items-center gap-3 opacity-50">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-100" aria-hidden>
                    <Lock className="h-5 w-5 text-ink-500" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-500">Pack {pack.index + 1} · {pack.category}</p>
                    <p className="text-caption text-ink-300">Schließe erst das vorherige Pack ab</p>
                  </div>
                </Card>
              </li>
            );
          }
          return (
            <li key={pack.index}>
              <Link href={`/trainer/${pack.index + 1}`} className="block h-full">
                <Card
                  className={`flex h-full items-center gap-3 transition-transform hover:scale-[1.01] ${
                    isActive ? "border-2 border-brand-500" : ""
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                      pack.done ? "bg-correct-50" : "bg-brand-50"
                    }`}
                    aria-hidden
                  >
                    {pack.done ? (
                      <CheckCircle2 className="h-5 w-5 text-correct-700" />
                    ) : (
                      <Play className="h-5 w-5 fill-brand-600 text-brand-600" />
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold">Pack {pack.index + 1} · {pack.category}</p>
                    <p className="text-caption text-ink-500">
                      {pack.done ? `${PACK_SIZE} Wörter gelernt – nochmal üben?` : `${pack.learnedCount}/${pack.total} Wörter · ~10 Minuten`}
                    </p>
                  </div>
                  {isActive && (
                    <span className="rounded-chip bg-brand-50 px-3 py-1 text-caption font-bold text-brand-600">Start</span>
                  )}
                </Card>
              </Link>
            </li>
          );
        })}
      </ol>

      <Card className="flex items-start gap-3 bg-info-50">
        <BookOpenCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-info-700" />
        <p className="text-caption text-ink-700">
          Trainer und Lektionen ergänzen sich: Die Lektionen bringen dir Grammatik und Dialoge bei,
          der Trainer die Wortschatz-Masse. Beides fließt in dieselbe Karteikarten-Wiederholung – und im
          Konversationsmodus wendest du alles frei an.
        </p>
      </Card>
    </main>
  );
}
