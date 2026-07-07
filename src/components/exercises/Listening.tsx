"use client";

import { useEffect, useMemo, useState } from "react";
import { shuffle } from "@/lib/shuffle";
import type { ListeningContent } from "@/lib/types";
import { ttsAvailable } from "@/lib/speech";
import { ChoiceChip } from "@/components/ui/ChoiceChip";
import { AudioButton } from "@/components/ui/AudioButton";
import { Button } from "@/components/ui/Button";

/** Hörverständnis: Audio abspielen, Bedeutung wählen. Fallback: Text anzeigen. */
export function Listening({
  content,
  lang,
  answered,
  onAnswer,
}: {
  content: ListeningContent;
  lang: string;
  answered: boolean;
  onAnswer: (correct: boolean, message: string) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [ttsOk, setTtsOk] = useState(true);
  // Antwortreihenfolge mischen – in den Daten steht die Lösung sonst immer vorn
  const order = useMemo(() => shuffle(content.options.map((_, i) => i)), [content]);

  useEffect(() => setTtsOk(ttsAvailable()), []);

  function check() {
    if (selected === null) return;
    const correct = selected === content.correctIndex;
    onAnswer(
      correct,
      correct
        ? content.explanation
        : `Gesagt wurde: „${content.audioText}“ – ${content.options[content.correctIndex]}. ${content.explanation}`
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-h2">{content.question}</h2>
      <div className="flex flex-col items-center gap-2 rounded-card bg-info-50 p-6">
        {ttsOk ? (
          <>
            <AudioButton text={content.audioText} lang={lang} size="lg" autoPlay />
            <span className="text-caption text-ink-500">Zum erneuten Anhören tippen</span>
          </>
        ) : (
          <p className="text-h2 text-ink-900">
            „{content.audioText}“
            <span className="mt-1 block text-caption font-normal text-ink-500">
              (Sprachausgabe nicht verfügbar – lies den Satz stattdessen)
            </span>
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Antwortmöglichkeiten">
        {order.map((i) => {
          const option = content.options[i];
          return (
          <ChoiceChip
            key={option}
            state={
              answered
                ? i === content.correctIndex
                  ? "correct"
                  : i === selected
                    ? "wrong"
                    : "disabled"
                : selected === i
                  ? "selected"
                  : "idle"
            }
            onClick={() => !answered && setSelected(i)}
            disabled={answered}
          >
            {option}
          </ChoiceChip>
          );
        })}
      </div>
      {!answered && (
        <Button full onClick={check} disabled={selected === null}>
          Prüfen
        </Button>
      )}
    </div>
  );
}
