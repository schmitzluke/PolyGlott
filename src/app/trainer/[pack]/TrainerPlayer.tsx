"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, PartyPopper, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AudioButton } from "@/components/ui/AudioButton";
import { XPBadge } from "@/components/ui/XPBadge";
import { FeedbackBar } from "@/components/FeedbackBar";
import { AchievementIcon } from "@/components/AchievementIcon";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { VocabMatch } from "@/components/exercises/VocabMatch";
import { Listening } from "@/components/exercises/Listening";
import { Translation } from "@/components/exercises/Translation";
import type { TrainerExercise } from "@/lib/trainerSession";
import type {
  ListeningContent,
  MultipleChoiceContent,
  TranslationContent,
  VocabMatchContent,
} from "@/lib/types";

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
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [summary, setSummary] = useState<CompleteResponse | null>(null);

  const total = exercises.length;

  function answer(correct: boolean, message: string) {
    if (correct) setCorrectCount((c) => c + 1);
    setFeedback({ correct, message });
  }

  async function next() {
    if (index + 1 < total) {
      setIndex(index + 1);
      setFeedback(null);
      return;
    }
    setPhase("summary");
    const res = await fetch("/api/trainer/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packIndex, correctCount, totalCount: total }),
    });
    if (res.ok) setSummary(await res.json());
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
            Deine 10 neuen Wörter – hör sie dir einmal an, dann geht’s ins Training:
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {words.map((w) => (
              <li key={w.target} className="flex items-center justify-between gap-3 border-b border-ink-100 pb-2 last:border-0">
                <div>
                  <p className="font-semibold">{w.target}</p>
                  <p className="text-caption text-ink-500">{w.source}</p>
                </div>
                {!/[(…/]/.test(w.target) && <AudioButton text={w.target} lang="tr" />}
              </li>
            ))}
          </ul>
        </Card>
        <Button full onClick={() => setPhase("exercise")}>
          Training starten ({total} Übungen)
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
            {correctCount === total ? (
              <PartyPopper className="h-12 w-12 text-brand-600" />
            ) : (
              <Brain className="h-12 w-12 text-brand-600" />
            )}
          </span>
        </div>
        <h1 className="text-h1">Pack geschafft!</h1>
        <Card>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-display text-brand-600">{correctCount}/{total}</p>
              <p className="text-caption text-ink-500">Übungen richtig</p>
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
  const answered = feedback !== null;

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col p-4 pb-40">
      <header className="flex items-center gap-4 py-3">
        <Link
          href="/trainer"
          aria-label="Training verlassen"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
        >
          <X aria-hidden className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <ProgressBar value={index + (answered ? 1 : 0)} max={total} label="Trainings-Fortschritt" />
        </div>
        <XPBadge xp={correctCount * 2} />
      </header>

      <main className="flex flex-1 flex-col justify-center py-6">
        <TrainerExerciseRenderer key={exercise.id} exercise={exercise} answered={answered} onAnswer={answer} />
      </main>

      {feedback && (
        <FeedbackBar
          correct={feedback.correct}
          message={feedback.message}
          onNext={next}
          isLast={index + 1 >= total}
        />
      )}
    </div>
  );
}

function TrainerExerciseRenderer({
  exercise,
  answered,
  onAnswer,
}: {
  exercise: TrainerExercise;
  answered: boolean;
  onAnswer: (correct: boolean, message: string) => void;
}) {
  switch (exercise.type) {
    case "multiple_choice":
      return <MultipleChoice content={exercise.content as MultipleChoiceContent} lang="tr" answered={answered} onAnswer={onAnswer} />;
    case "vocab_match":
      return <VocabMatch content={exercise.content as VocabMatchContent} lang="tr" answered={answered} onAnswer={onAnswer} />;
    case "listening":
      return <Listening content={exercise.content as ListeningContent} lang="tr" answered={answered} onAnswer={onAnswer} />;
    case "translation":
      return <Translation content={exercise.content as TranslationContent} answered={answered} onAnswer={onAnswer} />;
    default:
      return null;
  }
}
