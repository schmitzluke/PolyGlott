"use client";

import { useMemo, useState } from "react";
import { shuffle } from "@/lib/shuffle";
import type { GapFillContent } from "@/lib/types";
import { ChoiceChip } from "@/components/ui/ChoiceChip";
import { Button } from "@/components/ui/Button";
import { AudioButton } from "@/components/ui/AudioButton";

export function GapFill({
  content,
  lang,
  answered,
  onAnswer,
}: {
  content: GapFillContent;
  lang: string;
  answered: boolean;
  onAnswer: (correct: boolean, message: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  // Antwortreihenfolge mischen – in den Daten steht die Lösung sonst immer vorn
  const options = useMemo(() => shuffle(content.options), [content]);

  const filled = content.sentence.replace("___", selected ?? "___");

  function check() {
    if (!selected) return;
    const correct = selected === content.solution;
    onAnswer(
      correct,
      correct
        ? content.explanation
        : `Richtig wäre: „${content.solution}“. ${content.explanation}`
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-h3 text-ink-500">Fülle die Lücke</h2>
      <div className="flex items-center gap-3">
        <p className="text-h1" aria-label={`Satz: ${filled}`}>
          {content.sentence.split("___").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span
                  className={`mx-1 inline-block min-w-[80px] px-2 text-center transition-colors duration-150 ${
                    selected
                      ? "rounded-chip bg-brand-50 font-semibold text-brand-700"
                      : "border-b-2 border-ink-300 text-ink-500"
                  }`}
                >
                  {selected ?? "…"}
                </span>
              )}
            </span>
          ))}
        </p>
        <AudioButton text={content.sentence.replace("___", content.solution)} lang={lang} />
      </div>
      <p className="text-body text-ink-500">{content.translation}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <ChoiceChip
            key={option}
            state={
              answered
                ? option === content.solution
                  ? "correct"
                  : option === selected
                    ? "wrong"
                    : "disabled"
                : selected === option
                  ? "selected"
                  : "idle"
            }
            onClick={() => !answered && setSelected(option)}
            disabled={answered}
          >
            {option}
          </ChoiceChip>
        ))}
      </div>
      {!answered && (
        <Button full onClick={check} disabled={!selected}>
          Prüfen
        </Button>
      )}
    </div>
  );
}
