"use client";

import { useMemo, useState } from "react";
import { shuffle } from "@/lib/shuffle";
import type { DialogueContent } from "@/lib/types";
import { ChoiceChip } from "@/components/ui/ChoiceChip";
import { AudioButton } from "@/components/ui/AudioButton";

/**
 * Interaktiver Dialog (Rollenspiel): Partner-Turns werden angezeigt/vorgelesen,
 * bei Du-Turns wählt man die passende Antwort. Falsche Wahl zeigt Feedback,
 * man wählt erneut – der Dialog geht immer zu Ende.
 */
export function Dialogue({
  content,
  lang,
  answered,
  onAnswer,
}: {
  content: DialogueContent;
  lang: string;
  answered: boolean;
  onAnswer: (correct: boolean, message: string) => void;
}) {
  const [turnIndex, setTurnIndex] = useState(0);
  const [wrongPicks, setWrongPicks] = useState<Set<string>>(new Set());
  const [firstTryMistakes, setFirstTryMistakes] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const visibleTurns = content.turns.slice(0, turnIndex + 1);
  const current = content.turns[turnIndex];
  const isChoiceTurn = Boolean(current?.choices);
  // Antwortreihenfolge mischen – in den Daten steht die richtige Antwort sonst immer vorn
  const shuffledChoices = useMemo(
    () => (current?.choices ? shuffle(current.choices) : []),
    [current]
  );

  function advance() {
    let next = turnIndex + 1;
    setWrongPicks(new Set());
    setLastFeedback(null);
    if (next >= content.turns.length) {
      const perfect = firstTryMistakes === 0;
      onAnswer(
        perfect,
        perfect
          ? "Dialog gemeistert – alle Antworten saßen beim ersten Versuch!"
          : `Dialog geschafft! ${firstTryMistakes} Antwort${firstTryMistakes === 1 ? "" : "en"} brauchte${firstTryMistakes === 1 ? "" : "n"} einen zweiten Versuch.`
      );
    } else {
      setTurnIndex(next);
      // Partner-Turns ohne Auswahl automatisch weiterlaufen lassen? Nein –
      // sie werden angezeigt; der nächste Klick kommt vom Nutzer.
    }
  }

  function pick(choiceText: string) {
    const choice = current.choices!.find((c) => c.text === choiceText);
    if (!choice) return;
    if (choice.correct) {
      setLastFeedback(null);
      advance();
    } else {
      if (wrongPicks.size === 0) setFirstTryMistakes((m) => m + 1);
      setWrongPicks(new Set(wrongPicks).add(choiceText));
      setLastFeedback(choice.feedback);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-h2">{content.title}</h2>
        <p className="text-caption text-ink-500">{content.scene}</p>
      </div>

      <div className="flex flex-col gap-3">
        {visibleTurns.map((turn, i) => {
          if (turn.choices) return null; // Auswahl-Turn wird unten gerendert
          const isUser = turn.speaker === "Du";
          return (
            <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-card px-4 py-3 motion-safe:animate-pop-in ${
                  isUser ? "bg-brand-50 text-ink-900" : "bg-surface shadow-soft"
                }`}
              >
                <p className="text-caption font-bold text-ink-500">{turn.speaker}</p>
                <div className="flex items-center gap-2">
                  <p className="text-body font-medium">{turn.text}</p>
                  {turn.text && <AudioButton text={turn.text} lang={lang} />}
                </div>
                {turn.translation && <p className="text-caption text-ink-500">{turn.translation}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {isChoiceTurn && !answered && (
        <div className="flex flex-col gap-3 rounded-card border-2 border-brand-100 bg-surface p-4">
          <p className="text-caption font-bold text-ink-500">Du – wähle deine Antwort:</p>
          {shuffledChoices.map((choice) => (
            <ChoiceChip
              key={choice.text}
              state={wrongPicks.has(choice.text) ? "wrong" : "idle"}
              onClick={() => pick(choice.text)}
              disabled={wrongPicks.has(choice.text)}
            >
              {choice.text}
            </ChoiceChip>
          ))}
          {lastFeedback && (
            <p className="rounded-chip bg-error-50 px-3 py-2 text-caption text-error-700" role="alert">
              {lastFeedback} – versuch es nochmal!
            </p>
          )}
        </div>
      )}

      {!isChoiceTurn && turnIndex < content.turns.length && !answered && (
        <button
          type="button"
          onClick={advance}
          className="min-h-[44px] self-center rounded-button bg-ink-100 px-6 font-semibold text-ink-700 hover:bg-ink-300/50"
        >
          Weiter im Dialog →
        </button>
      )}
    </div>
  );
}
