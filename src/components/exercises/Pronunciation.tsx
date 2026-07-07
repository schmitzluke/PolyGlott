"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import type { PronunciationContent } from "@/lib/types";
import { scorePronunciation, type PronunciationScore } from "@/lib/speech";
import { AudioButton } from "@/components/ui/AudioButton";
import { MicButton } from "@/components/ui/MicButton";
import { Button } from "@/components/ui/Button";

/** Aussprache: anhören → nachsprechen → Wort-für-Wort-Feedback + Score. */
export function Pronunciation({
  content,
  lang,
  answered,
  onAnswer,
}: {
  content: PronunciationContent;
  lang: string;
  answered: boolean;
  onAnswer: (correct: boolean, message: string) => void;
}) {
  const [result, setResult] = useState<PronunciationScore | null>(null);
  const [heard, setHeard] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  function handleTranscript(transcript: string) {
    setHeard(transcript);
    const score = scorePronunciation(content.text, transcript);
    setResult(score);
    setAttempts((a) => a + 1);
    if (score.score >= 60) {
      onAnswer(true, `Aussprache-Score: ${score.score} % – gut verständlich!`);
    }
  }

  function giveUp() {
    onAnswer(
      false,
      result
        ? `Aussprache-Score: ${result.score} %. Übung macht den Meister – hör dir den Satz nochmal an.`
        : "Kein Problem – hör dir den Satz an und versuch es in der Wiederholung erneut."
    );
  }

  function skip() {
    onAnswer(true, "Übersprungen – ohne Mikrofon zählt diese Übung nicht als Fehler.");
  }

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <h2 className="text-h3 text-ink-500">Sprich nach</h2>
      <div className="flex items-center gap-3">
        <p className="text-h1">{content.text}</p>
        <AudioButton text={content.text} lang={lang} size="lg" />
      </div>
      <p className="text-body text-ink-500">{content.translation}</p>
      {content.tip && (
        <p className="flex items-center gap-1.5 rounded-chip bg-info-50 px-4 py-2 text-caption text-info-700">
          <Lightbulb aria-hidden className="h-4 w-4 shrink-0" /> {content.tip}
        </p>
      )}

      {result && !answered && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center gap-1.5" aria-label={`Erkannt: Score ${result.score} Prozent`}>
            {result.words.map((w, i) => (
              <span
                key={i}
                className={`rounded-chip px-2 py-1 text-body font-medium ${
                  w.matched ? "bg-correct-50 text-correct-700" : "bg-error-50 text-error-700 line-through"
                }`}
              >
                {w.word}
              </span>
            ))}
            <span className="ml-2 self-center text-h3 text-ink-700">{result.score} %</span>
          </div>
          <p className="text-caption text-ink-500">
            {heard && heard.trim().length > 0 ? (
              <>Ich habe verstanden: „{heard}“</>
            ) : (
              <>Ich habe nichts gehört – sprich direkt nach dem Tippen laut und deutlich. Am zuverlässigsten funktioniert die Erkennung in Chrome.</>
            )}
          </p>
        </div>
      )}

      {!answered && (
        <>
          <MicButton lang={lang} onResult={handleTranscript} />
          <div className="flex gap-3">
            {attempts > 0 && (
              <Button variant="secondary" onClick={giveUp}>
                Weiter ohne Erfolg
              </Button>
            )}
            <Button variant="ghost" onClick={skip}>
              Übung überspringen
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
