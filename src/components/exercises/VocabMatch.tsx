"use client";

import { useMemo, useState } from "react";
import type { VocabMatchContent } from "@/lib/types";
import { ChoiceChip } from "@/components/ui/ChoiceChip";
import { speak } from "@/lib/speech";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function VocabMatch({
  content,
  lang,
  answered,
  onAnswer,
}: {
  content: VocabMatchContent;
  lang: string;
  answered: boolean;
  onAnswer: (correct: boolean, message: string) => void;
}) {
  const left = useMemo(() => shuffle(content.pairs.map((p) => p.source)), [content]);
  const right = useMemo(() => shuffle(content.pairs.map((p) => p.target)), [content]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);

  function isPair(source: string, target: string) {
    return content.pairs.some((p) => p.source === source && p.target === target);
  }

  function pickRight(target: string) {
    if (!selectedLeft || answered) return;
    if (isPair(selectedLeft, target)) {
      void speak(target, lang);
      const next = new Set(matched);
      next.add(selectedLeft);
      next.add(target);
      setMatched(next);
      setSelectedLeft(null);
      if (next.size === content.pairs.length * 2) {
        const perfect = mistakes === 0;
        onAnswer(
          perfect,
          perfect
            ? "Alle Paare beim ersten Versuch – stark!"
            : `Alle Paare gefunden, mit ${mistakes} ${mistakes === 1 ? "Fehlversuch" : "Fehlversuchen"}. Beim Wiederholen sitzt es!`
        );
      }
    } else {
      setMistakes((m) => m + 1);
      setWrongFlash(target);
      setTimeout(() => setWrongFlash(null), 400);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-h2">{content.prompt}</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-3" aria-label="Deutsch">
          {left.map((source) => (
            <ChoiceChip
              key={source}
              state={
                matched.has(source) ? "correct" : selectedLeft === source ? "selected" : "idle"
              }
              onClick={() => !matched.has(source) && setSelectedLeft(source)}
              disabled={matched.has(source) || answered}
            >
              {source}
            </ChoiceChip>
          ))}
        </div>
        <div className="flex flex-col gap-3" aria-label="Türkisch">
          {right.map((target) => (
            <ChoiceChip
              key={target}
              state={
                matched.has(target) ? "correct" : wrongFlash === target ? "wrong" : "idle"
              }
              onClick={() => !matched.has(target) && pickRight(target)}
              disabled={matched.has(target) || answered || !selectedLeft}
            >
              {target}
            </ChoiceChip>
          ))}
        </div>
      </div>
      <p className="text-caption text-ink-500">
        Wähle links ein Wort und tippe rechts auf die Übersetzung.
      </p>
    </div>
  );
}
