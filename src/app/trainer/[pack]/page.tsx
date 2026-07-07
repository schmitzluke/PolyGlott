import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { buildPackSession } from "@/lib/trainerSession";
import { TrainerPlayer } from "./TrainerPlayer";
import { FREQUENCY_VOCAB, packCount, packWords } from "../../../../content/frequency-tr";

export const dynamic = "force-dynamic";

/** Wortschatz-Session (Vollbild, ohne App-Navigation). */
export default async function TrainerPackPage({ params }: { params: { pack: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const packNumber = Number(params.pack);
  if (!Number.isInteger(packNumber) || packNumber < 1 || packNumber > packCount()) notFound();
  const packIndex = packNumber - 1;

  const words = packWords(packIndex);
  // Distraktoren aus den Nachbar-Packs (±20 Ränge)
  const distractors = FREQUENCY_VOCAB.filter(
    (w) => Math.abs(w.rank - words[0].rank) <= 25 && !words.some((p) => p.rank === w.rank)
  );
  const exercises = buildPackSession(words, distractors);

  return (
    <TrainerPlayer
      packIndex={packIndex}
      category={words[0]?.category ?? ""}
      words={words.map((w) => ({ source: w.source, target: w.target }))}
      exercises={exercises}
    />
  );
}
