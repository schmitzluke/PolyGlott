"use client";

import { useMemo, useState } from "react";
import { shuffle } from "@/lib/shuffle";
import type { MultipleChoiceContent } from "@/lib/types";
import { ChoiceChip } from "@/components/ui/ChoiceChip";
import { AudioButton } from "@/components/ui/AudioButton";
import { Button } from "@/components/ui/Button";

export function MultipleChoice({
  content,
  lang,
  answered,
  onAnswer,
}: {
  content: MultipleChoiceContent;
  lang: string;
  answered: boolean;
  onAnswer: (correct: boolean, message: string) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  // Antwortreihenfolge mischen – in den Daten steht die Lösung sonst immer vorn
  const order = useMemo(() => shuffle(content.options.map((_, i) => i)), [content]);

  function check() {
    if (selected === null) return;
    const correct = selected === content.correctIndex;
    onAnswer(
      correct,
      correct
        ? content.explanation
        : `Richtig wäre: „${content.options[content.correctIndex]}“. ${content.explanation}`
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <h2 className="text-h2">{content.question}</h2>
        {content.audioText && <AudioButton text={content.audioText} lang={lang} />}
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
