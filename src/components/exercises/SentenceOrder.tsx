"use client";

import { useMemo, useState } from "react";
import type { SentenceOrderContent } from "@/lib/types";
import { checkSentenceOrder } from "@/lib/answers";
import { ChoiceChip } from "@/components/ui/ChoiceChip";
import { Button } from "@/components/ui/Button";
import { AudioButton } from "@/components/ui/AudioButton";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  // Nie in Original-Reihenfolge anbieten
  return copy.join("|") === arr.join("|") && copy.length > 1 ? [copy[1], copy[0], ...copy.slice(2)] : copy;
}

/** Satzbau: Wörter antippen und in die richtige Reihenfolge bringen. */
export function SentenceOrder({
  content,
  lang,
  answered,
  onAnswer,
}: {
  content: SentenceOrderContent;
  lang: string;
  answered: boolean;
  onAnswer: (correct: boolean, message: string) => void;
}) {
  const pool = useMemo(() => shuffle(content.tokens.map((t, i) => ({ token: t, id: i }))), [content]);
  const [picked, setPicked] = useState<{ token: string; id: number }[]>([]);

  const remaining = pool.filter((p) => !picked.some((x) => x.id === p.id));

  function check() {
    const correct = checkSentenceOrder(picked.map((p) => p.token), content.solution);
    const explanation = content.explanation ? ` ${content.explanation}` : "";
    onAnswer(
      correct,
      correct
        ? `„${content.solution}“ – ${content.translation}.${explanation}`
        : `Richtig wäre: „${content.solution}“ (${content.translation}).${explanation}`
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <h2 className="text-h2">{content.prompt}</h2>
        {content.audioText && <AudioButton text={content.audioText} lang={lang} />}
      </div>
      <div
        className="flex min-h-[64px] flex-wrap items-start gap-2 rounded-card border-2 border-dashed border-ink-300 bg-surface p-3"
        aria-label="Dein Satz"
      >
        {picked.length === 0 && <span className="text-body text-ink-300">Tippe die Wörter unten an …</span>}
        {picked.map((p) => (
          <ChoiceChip
            key={p.id}
            state="selected"
            onClick={() => !answered && setPicked(picked.filter((x) => x.id !== p.id))}
            disabled={answered}
          >
            {p.token}
          </ChoiceChip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2" aria-label="Verfügbare Wörter">
        {remaining.map((p) => (
          <ChoiceChip
            key={p.id}
            onClick={() => !answered && setPicked([...picked, p])}
            disabled={answered}
          >
            {p.token}
          </ChoiceChip>
        ))}
      </div>
      {!answered && (
        <Button full onClick={check} disabled={picked.length !== content.tokens.length}>
          Prüfen
        </Button>
      )}
    </div>
  );
}
