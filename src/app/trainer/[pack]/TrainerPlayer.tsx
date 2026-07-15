"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, PartyPopper, X, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { XPBadge } from "@/components/ui/XPBadge";
import { AchievementIcon } from "@/components/AchievementIcon";
import type { TrainerExercise } from "@/lib/trainerSession";
import { Rating } from "@/lib/fsrs";

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
  const [revealed, setRevealed] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [summary, setSummary] = useState<CompleteResponse | null>(null);

  const total = exercises.length;

  async function submitRating(rating: number) {
    const exercise = exercises[index];
    const res = await fetch("/api/trainer/rate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packIndex, rank: exercise.rank, rating }),
    });
    if (!res.ok) return;

    if (index + 1 < total) {
      setIndex(index + 1);
      setRevealed(false);
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
    if (revealed) {
      const exercise = exercises[index];
      playTurkish(exercise.turkish);
    }
  }, [revealed, index, exercises]);

  if (phase === "intro") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 p-6">
        <Card className="motion-safe:animate-pop-in">
          <p className="text-caption font-bold text-brand-600">
            Wortschatz-Pack {packIndex + 1}
          </p>
          <h1 className="mt-1 text-h1">{category}</h1>
          <p className="mt-2 text-body text-ink-500">
            Aktives Erinnern: Schau auf das deutsche Wort, versuche die türkische Übersetzung zu erinnern, dann decke auf.
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

  const exercise = exercises[index];

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

            {!revealed ? (
              <Button full variant="primary" onClick={() => setRevealed(true)} className="mt-8">
                Aufdecken
              </Button>
            ) : (
              <div className="mt-8 space-y-4">
                <div className="rounded-lg bg-brand-50 p-4">
                  <p className="text-body font-semibold text-brand-700">{exercise.turkish}</p>
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
                  <p className="text-caption text-ink-500">Wie war die kognitiven Leistung?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => submitRating(Rating.Again)}
                      className="rounded border-2 border-error-500 bg-error-50 px-4 py-2 text-sm font-semibold text-error-700 hover:bg-error-100"
                    >
                      Nochmal
                    </button>
                    <button
                      onClick={() => submitRating(Rating.Hard)}
                      className="rounded border-2 border-ink-300 bg-ink-100 px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-200"
                    >
                      Schwer
                    </button>
                    <button
                      onClick={() => submitRating(Rating.Good)}
                      className="rounded border-2 border-info-500 bg-info-50 px-4 py-2 text-sm font-semibold text-info-700 hover:bg-info-100"
                    >
                      Gut
                    </button>
                    <button
                      onClick={() => submitRating(Rating.Easy)}
                      className="rounded border-2 border-correct-500 bg-correct-50 px-4 py-2 text-sm font-semibold text-correct-700 hover:bg-correct-100"
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
