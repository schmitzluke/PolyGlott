"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import type { TranslationContent } from "@/lib/types";
import { checkTranslation } from "@/lib/answers";
import { Button } from "@/components/ui/Button";

export function Translation({
  content,
  answered,
  onAnswer,
}: {
  content: TranslationContent;
  answered: boolean;
  onAnswer: (correct: boolean, message: string) => void;
}) {
  const [input, setInput] = useState("");

  function check() {
    if (!input.trim()) return;
    const correct = checkTranslation(input, content.solution, content.altSolutions);
    const explanation = content.explanation ? ` ${content.explanation}` : "";
    onAnswer(
      correct,
      correct
        ? `Genau: „${content.solution}“.${explanation}`
        : `Richtig wäre: „${content.solution}“.${explanation}`
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        check();
      }}
    >
      <h2 className="text-h3 text-ink-500">Übersetze ins Türkische</h2>
      <p className="text-h1">„{content.prompt}“</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={answered}
        placeholder="Auf Türkisch tippen …"
        aria-label="Deine Übersetzung"
        autoComplete="off"
        autoCapitalize="none"
        className="min-h-[52px] rounded-chip border-2 border-ink-100 bg-surface px-4 py-3 text-body focus:border-brand-500"
      />
      {content.hint && !answered && (
        <p className="flex items-center gap-1.5 text-caption text-info-700">
          <Lightbulb aria-hidden className="h-4 w-4 shrink-0" /> {content.hint}
        </p>
      )}
      {!answered && (
        <Button full type="submit" disabled={!input.trim()}>
          Prüfen
        </Button>
      )}
    </form>
  );
}
