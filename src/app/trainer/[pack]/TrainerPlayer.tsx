"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, Check, Mic, PartyPopper, Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { XPBadge } from "@/components/ui/XPBadge";
import { AchievementIcon } from "@/components/AchievementIcon";
import type { TrainerExercise } from "@/lib/trainerSession";
import { Rating, suggestRating } from "@/lib/fsrs";
import { normalize, recognizeOnce, scorePronunciation, sttAvailable } from "@/lib/speech";

interface CompleteResponse {
  xp: number;
  streak: number;
  newWords: number;
  newAchievements: { title: string; icon: string; description: string }[];
}

export function TrainerPlayer({
  packIndex,
  category,
  words,
  exercises,
}: {
  packIndex: number;
  category: string;
  words: { source: string; target: string }[];
  exercises: TrainerExercise[];
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "exercise" | "summary">("intro");
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [summary, setSummary] = useState<CompleteResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const total = exercises.length;
  const exercise = exercises[index];

  useEffect(() => {
    if (phase === "exercise" && !checked) inputRef.current?.focus();
  }, [index, phase, checked]);

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
    if (checked) playTurkish(exercise.turkish);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, index]);

  function checkAnswer(text: string) {
    if (!text.trim()) return;
    const result = scorePronunciation(exercise.turkish, text);
    setScore(result.score);
    setChecked(true);
  }

  async function startVoiceInput() {
    if (!sttAvailable()) return;
    setIsRecording(true);
    const transcript = await recognizeOnce("tr");
    setIsRecording(false);
    if (transcript) {
      setAnswer(transcript);
      checkAnswer(transcript);
    }
  }

  async function submitRating(rating: number) {
    const res = await fetch("/api/trainer/rate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packIndex, rank: exercise.rank, rating }),
    });
    if (!res.ok) return;

    if (index + 1 < total) {
      setIndex(index + 1);
      setChecked(false);
      setAnswer("");
      setScore(null);
    } else {
      setPhase("summary");
      const data = await fetch("/api/trainer/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packIndex }),
      });
      if (data.ok) setSummary(await data.json());
    }
  }

  if (phase === "intro") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 p-6">
        <Card className="motion-safe:animate-pop-in">
          <p className="text-caption font-bold text-brand-600">
            Wortschatz-Pack {packIndex + 1}
          </p>
          <h1 className="mt-1 text-h1">{category}</h1>
          <p className="mt-2 text-body text-ink-500">
            Aktives Erinnern: Tippe oder sprich die türkische Übersetzung – kein Abgucken, kein Multiple-Choice.
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {words.map((w) => (
              <li key={w.source} className="flex items-center gap-3 border-b border-ink-100 pb-2 last:border-0">
                <p className="font-semibold text-ink-900">{w.source}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Button full onClick={() => setPhase("exercise")}>
          Training starten ({total} Wörter)
        </Button>
        <Link href="/trainer" className="text-center text-body text-ink-500 hover:text-ink-700">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  if (phase === "summary") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 p-6 text-center">
        <div className="flex justify-center motion-safe:animate-pop-in" aria-hidden>
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50">
            <PartyPopper className="h-12 w-12 text-brand-600" />
          </span>
        </div>
        <h1 className="text-h1">Pack geschafft!</h1>
        <Card>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-display text-brand-600">{total}</p>
              <p className="text-caption text-ink-500">Wörter trainiert</p>
            </div>
            <div>
              <p className="text-display text-brand-600">{summary ? `+${summary.xp}` : "…"}</p>
              <p className="text-caption text-ink-500">XP verdient</p>
            </div>
          </div>
          {summary && (
            <div className="mt-4 flex flex-col gap-2 border-t border-ink-100 pt-4 text-left">
              <p className="flex items-center gap-2 text-body">
                <Brain aria-hidden className="h-5 w-5 shrink-0 text-info-700" />
                <span><strong>{summary.newWords} Wörter</strong> sind jetzt in deiner Wiederholung</span>
              </p>
              {summary.newAchievements.map((a) => (
                <p key={a.title} className="flex items-center gap-2 rounded-chip bg-gold/10 px-3 py-2 text-body motion-safe:animate-pop-in">
                  <AchievementIcon icon={a.icon} className="h-5 w-5 shrink-0" />
                  <span>Neues Abzeichen: <strong>{a.title}</strong> – {a.description}</span>
                </p>
              ))}
            </div>
          )}
        </Card>
        <div className="flex flex-col gap-3">
          <Button full onClick={() => router.push("/trainer")}>
            Nächstes Pack
          </Button>
          <Button variant="secondary" full onClick={() => router.push("/dashboard")}>
            Zum Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const suggested = score !== null ? suggestRating(score) : null;
  const isCorrect = score !== null && normalize(answer) === normalize(exercise.turkish);

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col p-4 pb-24">
      <header className="flex items-center gap-4 py-3">
        <Link
          href="/trainer"
          aria-label="Training verlassen"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
        >
          <X aria-hidden className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <ProgressBar value={index} max={total} label="Trainings-Fortschritt" />
        </div>
        <XPBadge xp={index * 2} />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center py-12">
        <Card className="w-full max-w-sm">
          <div className="text-center">
            <p className="text-caption font-bold text-ink-500">Kartenanzahl {index + 1} von {total}</p>
            <h2 className="mt-4 text-h2">{exercise.german}</h2>

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
                  placeholder="Türkische Übersetzung eintippen …"
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
                  <p className="mt-1 text-body font-semibold text-brand-700">{exercise.turkish}</p>
                  <p className="mt-1 text-caption text-ink-500">Treffer: {score}%</p>
                  <button
                    onClick={() => playTurkish(exercise.turkish)}
                    disabled={isPlayingAudio}
                    className="mt-2 flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 disabled:opacity-50"
                  >
                    <Volume2 className="h-4 w-4" />
                    {isPlayingAudio ? "Spreche..." : "Anhören"}
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-caption text-ink-500">
                    Wie war die kognitive Leistung?{suggested !== null && " (Vorschlag markiert)"}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => submitRating(Rating.Again)}
                      className={`rounded border-2 px-4 py-2 text-sm font-semibold ${
                        suggested === Rating.Again
                          ? "border-error-500 bg-error-100 text-error-700 ring-2 ring-error-500/40"
                          : "border-error-500 bg-error-50 text-error-700 hover:bg-error-100"
                      }`}
                    >
                      Nochmal
                    </button>
                    <button
                      onClick={() => submitRating(Rating.Hard)}
                      className={`rounded border-2 px-4 py-2 text-sm font-semibold ${
                        suggested === Rating.Hard
                          ? "border-ink-300 bg-ink-200 text-ink-700 ring-2 ring-ink-300/40"
                          : "border-ink-300 bg-ink-100 text-ink-700 hover:bg-ink-200"
                      }`}
                    >
                      Schwer
                    </button>
                    <button
                      onClick={() => submitRating(Rating.Good)}
                      className={`rounded border-2 px-4 py-2 text-sm font-semibold ${
                        suggested === Rating.Good
                          ? "border-info-500 bg-info-100 text-info-700 ring-2 ring-info-500/40"
                          : "border-info-500 bg-info-50 text-info-700 hover:bg-info-100"
                      }`}
                    >
                      Gut
                    </button>
                    <button
                      onClick={() => submitRating(Rating.Easy)}
                      className={`rounded border-2 px-4 py-2 text-sm font-semibold ${
                        suggested === Rating.Easy
                          ? "border-correct-500 bg-correct-100 text-correct-700 ring-2 ring-correct-500/40"
                          : "border-correct-500 bg-correct-50 text-correct-700 hover:bg-correct-100"
                      }`}
                    >
                      Einfach
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
