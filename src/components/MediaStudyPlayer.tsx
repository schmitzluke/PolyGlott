"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, CheckCircle2, Loader2, Mic, Volume2, X, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { normalize, recognizeOnce, scorePronunciation, sttAvailable } from "@/lib/speech";

type Sentence = { id: string; turkish: string; german: string };
type Transcript = {
  id: string;
  title: string;
  status: string;
  comprehended: boolean;
  sentences: Sentence[];
};

export function MediaStudyPlayer({ transcript }: { transcript: Transcript }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [marking, setMarking] = useState(false);
  const [done, setDone] = useState(transcript.comprehended);
  const inputRef = useRef<HTMLInputElement>(null);

  const total = transcript.sentences.length;
  const sentence = transcript.sentences[index];

  useEffect(() => {
    if (!checked) inputRef.current?.focus();
  }, [index, checked]);

  function playTurkish(text: string) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    utterance.rate = 1;
    setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    if (checked && sentence) playTurkish(sentence.turkish);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, index]);

  function checkAnswer(text: string) {
    if (!text.trim() || !sentence) return;
    const result = scorePronunciation(sentence.turkish, text);
    setScore(result.score);
    setChecked(true);
  }

  async function startVoiceInput() {
    if (!sttAvailable()) return;
    setIsRecording(true);
    const t = await recognizeOnce("tr");
    setIsRecording(false);
    if (t) {
      setAnswer(t);
      checkAnswer(t);
    }
  }

  function next() {
    if (index + 1 < total) {
      setIndex(index + 1);
      setChecked(false);
      setAnswer("");
      setScore(null);
    } else {
      setIndex(total);
    }
  }

  async function markComprehended() {
    setMarking(true);
    const res = await fetch(`/api/media/${transcript.id}/comprehended`, { method: "POST" });
    setMarking(false);
    if (res.ok) setDone(true);
  }

  if (transcript.status === "PENDING") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
        <Loader2 aria-hidden className="h-10 w-10 animate-spin text-brand-600" />
        <p className="text-body text-ink-600">Transkript wird verarbeitet – Kernsätze werden extrahiert …</p>
        <Link href="/media" className="text-body text-ink-500 hover:text-ink-700">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  if (transcript.status === "FAILED") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
        <XCircle aria-hidden className="h-10 w-10 text-error-700" />
        <p className="text-body text-ink-600">Verarbeitung fehlgeschlagen. Bitte erneut importieren.</p>
        <Link href="/media" className="text-body text-ink-500 hover:text-ink-700">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  if (index >= total) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 p-6 text-center">
        <CheckCircle2 aria-hidden className="h-16 w-16 text-correct-500" />
        <h1 className="text-h2">Alle {total} Kernsätze gelernt!</h1>
        <p className="text-body text-ink-600">
          Markiere „{transcript.title}" als verstanden, wenn du bereit bist, das Original zu hören/lesen.
        </p>
        {done ? (
          <p className="flex items-center gap-2 text-body font-semibold text-correct-700">
            <Check aria-hidden className="h-5 w-5" /> Als verstanden markiert
          </p>
        ) : (
          <Button full onClick={markComprehended} disabled={marking}>
            {marking ? "Speichere …" : "Als verstanden markieren"}
          </Button>
        )}
        <Button variant="secondary" full onClick={() => router.push("/media")}>
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }

  const isCorrect = score !== null && normalize(answer) === normalize(sentence.turkish);

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col p-4 pb-24">
      <header className="flex items-center gap-4 py-3">
        <Link
          href="/media"
          aria-label="Verlassen"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
        >
          <X aria-hidden className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <ProgressBar value={index} max={total} label="Lernfortschritt" />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center py-12">
        <Card className="w-full max-w-sm">
          <div className="text-center">
            <p className="text-caption font-bold text-ink-500">Satz {index + 1} von {total}</p>
            <h2 className="mt-4 text-h2">{sentence.german}</h2>

            {!checked ? (
              <form
                className="mt-8 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  checkAnswer(answer);
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Türkischen Satz eintippen …"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="min-h-[48px] w-full rounded-chip border-2 border-ink-100 px-4 text-center focus:border-brand-500"
                />
                <div className="flex gap-2">
                  <Button type="submit" full disabled={!answer.trim()}>
                    Prüfen
                  </Button>
                  {sttAvailable() && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={startVoiceInput}
                      disabled={isRecording}
                      aria-label="Antwort sprechen"
                    >
                      <Mic aria-hidden className={`h-5 w-5 ${isRecording ? "animate-pulse text-error-500" : ""}`} />
                    </Button>
                  )}
                </div>
              </form>
            ) : (
              <div className="mt-8 space-y-4">
                <div className={`rounded-lg p-4 ${isCorrect ? "bg-correct-50" : "bg-brand-50"}`}>
                  <p className="flex items-center justify-center gap-2 text-caption font-bold text-ink-500">
                    {isCorrect ? (
                      <>
                        <Check aria-hidden className="h-4 w-4 text-correct-700" /> Richtig
                      </>
                    ) : (
                      `Deine Antwort: "${answer}"`
                    )}
                  </p>
                  <p className="mt-1 text-body font-semibold text-brand-700">{sentence.turkish}</p>
                  <p className="mt-1 text-caption text-ink-500">Treffer: {score}%</p>
                  <button
                    onClick={() => playTurkish(sentence.turkish)}
                    disabled={isPlayingAudio}
                    className="mt-2 flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 disabled:opacity-50"
                  >
                    <Volume2 className="h-4 w-4" />
                    {isPlayingAudio ? "Spreche..." : "Anhören"}
                  </button>
                </div>
                <Button full onClick={next}>
                  {index + 1 < total ? "Nächster Satz" : "Fertig"}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
