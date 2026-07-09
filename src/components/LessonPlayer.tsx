"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, Dumbbell, Flame, PartyPopper, Snowflake, Trophy, X } from "lucide-react";
import { AchievementIcon } from "@/components/AchievementIcon";
import { useLessonStore } from "@/store/lessonStore";
import type {
  DialogueContent,
  ExerciseType,
  GapFillContent,
  ListeningContent,
  MultipleChoiceContent,
  PronunciationContent,
  SentenceOrderContent,
  TranslationContent,
  VocabMatchContent,
} from "@/lib/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { XPBadge } from "@/components/ui/XPBadge";
import { FeedbackBar } from "@/components/FeedbackBar";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { VocabMatch } from "@/components/exercises/VocabMatch";
import { GapFill } from "@/components/exercises/GapFill";
import { SentenceOrder } from "@/components/exercises/SentenceOrder";
import { Translation } from "@/components/exercises/Translation";
import { Listening } from "@/components/exercises/Listening";
import { Dialogue } from "@/components/exercises/Dialogue";
import { Pronunciation } from "@/components/exercises/Pronunciation";

export interface PlayerExercise {
  id: string;
  type: ExerciseType;
  content: unknown;
}

export interface PlayerLesson {
  id: string;
  title: string;
  intro: string;
  grammarTip: string;
  cultureTip: string | null;
  targetLang: string;
  exercises: PlayerExercise[];
}

interface CompleteResponse {
  xp: number;
  score: number;
  streak: number;
  usedFreeze: boolean;
  newVocab: number;
  newAchievements: { title: string; icon: string; description: string }[];
}

export function LessonPlayer({ lesson }: { lesson: PlayerLesson }) {
  const router = useRouter();
  const { phase, index, results, feedback, start, answer, next, reset } = useLessonStore();
  const [summary, setSummary] = useState<CompleteResponse | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const total = lesson.exercises.length;
  const correctCount = results.filter((r) => r.correct).length;

  // Store beim (Re-)Mount zurücksetzen
  useEffect(() => {
    reset();
  }, [lesson.id, reset]);

  // Abschluss speichern (Schritt 7: Übergabe an Spaced Repetition)
  const saveCompletion = useCallback(() => {
    setSaving(true);
    setSaveError(false);
    fetch(`/api/lessons/${lesson.id}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctCount, totalCount: total }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(`complete failed: ${r.status}`);
        return (await r.json()) as CompleteResponse;
      })
      .then((data) => {
        setSummary(data);
        // Router-Cache invalidieren, sonst zeigt /courses & /dashboard die gerade
        // abgeschlossene Lektion noch als offen → nächste Lektion bleibt gesperrt.
        router.refresh();
      })
      .catch(() => setSaveError(true))
      .finally(() => setSaving(false));
  }, [lesson.id, correctCount, total, router]);

  useEffect(() => {
    if (phase !== "summary" || summary || saving || saveError) return;
    saveCompletion();
  }, [phase, summary, saving, saveError, saveCompletion]);

  if (phase === "intro") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 p-6">
        <Card className="motion-safe:animate-pop-in">
          <p className="text-caption font-bold text-brand-600">Lektion</p>
          <h1 className="mt-1 text-h1">{lesson.title}</h1>
          <p className="mt-3 text-body text-ink-700">{lesson.intro}</p>
          <p className="mt-4 text-caption text-ink-500">
            {total} Übungen · ca. 10–15 Minuten
          </p>
        </Card>
        <Button full onClick={start}>
          Los geht’s!
        </Button>
        <Link href="/courses" className="text-center text-body text-ink-500 hover:text-ink-700">
          Zurück zur Kursübersicht
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
              <Trophy className="h-12 w-12 text-brand-600" />
            ) : correctCount / total >= 0.7 ? (
              <PartyPopper className="h-12 w-12 text-brand-600" />
            ) : (
              <Dumbbell className="h-12 w-12 text-brand-600" />
            )}
          </span>
        </div>
        <h1 className="text-h1">Lektion abgeschlossen!</h1>
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
                <Flame aria-hidden className="h-5 w-5 shrink-0 fill-brand-500 stroke-brand-600" />
                <span>Streak: <strong>{summary.streak} Tage</strong></span>
                {summary.usedFreeze && <Snowflake aria-hidden className="h-4 w-4 text-info-700" />}
              </p>
              <p className="flex items-center gap-2 text-body">
                <Brain aria-hidden className="h-5 w-5 shrink-0 text-info-700" />
                <span><strong>{summary.newVocab} Vokabeln</strong> wandern in deine Wiederholung</span>
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
        {saveError && !summary && (
          <div className="rounded-card bg-error-50 p-5 text-left shadow-soft">
            <p className="text-caption font-bold text-error-700">Nicht gespeichert</p>
            <p className="mt-1 text-body text-ink-700">
              Dein Abschluss konnte nicht gespeichert werden – die nächste Lektion bleibt sonst gesperrt.
            </p>
            <Button className="mt-3" onClick={saveCompletion} disabled={saving}>
              {saving ? "Speichern …" : "Erneut speichern"}
            </Button>
          </div>
        )}
        <div className="rounded-card bg-info-50 p-5 text-left shadow-soft">
          <p className="text-caption font-bold text-info-700">Grammatik-Tipp</p>
          <p className="mt-1 text-body text-ink-700">{lesson.grammarTip}</p>
          {lesson.cultureTip && (
            <>
              <p className="mt-3 text-caption font-bold text-info-700">Kultur-Tipp</p>
              <p className="mt-1 text-body text-ink-700">{lesson.cultureTip}</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Button full onClick={() => router.push("/dashboard")}>
            Zum Dashboard
          </Button>
          <Button variant="secondary" full onClick={() => router.push("/review")}>
            Jetzt Vokabeln wiederholen
          </Button>
        </div>
      </div>
    );
  }

  // phase === "exercise": Übungs-Screen-Muster
  const exercise = lesson.exercises[index];
  const answered = feedback !== null;

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col p-4 pb-40">
      <header className="flex items-center gap-4 py-3">
        <Link
          href="/courses"
          aria-label="Lektion verlassen"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
        >
          <X aria-hidden className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <ProgressBar value={index + (answered ? 1 : 0)} max={total} label="Lektions-Fortschritt" />
        </div>
        <XPBadge xp={correctCount * 5} />
      </header>

      <main className="flex flex-1 flex-col justify-center py-6">
        <ExerciseRenderer
          key={exercise.id}
          exercise={exercise}
          lang={lesson.targetLang}
          answered={answered}
          onAnswer={answer}
        />
      </main>

      {feedback && (
        <FeedbackBar
          correct={feedback.correct}
          message={feedback.message}
          onNext={() => next(total)}
          isLast={index + 1 >= total}
        />
      )}
    </div>
  );
}

function ExerciseRenderer({
  exercise,
  lang,
  answered,
  onAnswer,
}: {
  exercise: PlayerExercise;
  lang: string;
  answered: boolean;
  onAnswer: (correct: boolean, message: string) => void;
}) {
  const c = exercise.content;
  switch (exercise.type) {
    case "multiple_choice":
      return <MultipleChoice content={c as MultipleChoiceContent} lang={lang} answered={answered} onAnswer={onAnswer} />;
    case "vocab_match":
      return <VocabMatch content={c as VocabMatchContent} lang={lang} answered={answered} onAnswer={onAnswer} />;
    case "gap_fill":
      return <GapFill content={c as GapFillContent} lang={lang} answered={answered} onAnswer={onAnswer} />;
    case "sentence_order":
      return <SentenceOrder content={c as SentenceOrderContent} lang={lang} answered={answered} onAnswer={onAnswer} />;
    case "translation":
      return <Translation content={c as TranslationContent} answered={answered} onAnswer={onAnswer} />;
    case "listening":
      return <Listening content={c as ListeningContent} lang={lang} answered={answered} onAnswer={onAnswer} />;
    case "dialogue":
      return <Dialogue content={c as DialogueContent} lang={lang} answered={answered} onAnswer={onAnswer} />;
    case "pronunciation":
      return <Pronunciation content={c as PronunciationContent} lang={lang} answered={answered} onAnswer={onAnswer} />;
    default:
      return <p className="text-error-700">Unbekannter Übungstyp: {exercise.type}</p>;
  }
}
