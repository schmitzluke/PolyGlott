"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Award, GraduationCap, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FeedbackBar } from "@/components/FeedbackBar";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { GapFill } from "@/components/exercises/GapFill";
import { SentenceOrder } from "@/components/exercises/SentenceOrder";
import { Translation } from "@/components/exercises/Translation";
import { Listening } from "@/components/exercises/Listening";
import type {
  ExerciseType,
  GapFillContent,
  ListeningContent,
  MultipleChoiceContent,
  SentenceOrderContent,
  TranslationContent,
} from "@/lib/types";

export interface TestExercise {
  id: string;
  type: ExerciseType;
  content: unknown;
}

interface CourseInfo {
  slug: string;
  title: string;
  level: string;
  targetLang: string;
}

interface TestResult {
  passed: boolean;
  score: number;
  threshold: number;
  xp?: number;
  newLevel?: string;
}

export function TestPlayer({
  course,
  exercises,
  userName,
}: {
  course: CourseInfo;
  exercises: TestExercise[];
  userName: string | null;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "test" | "done">("intro");
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [result, setResult] = useState<TestResult | null>(null);
  const [saving, setSaving] = useState(false);

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
    // Test abgeben
    setSaving(true);
    const finalCorrect = correctCount;
    const res = await fetch("/api/level-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseSlug: course.slug, correctCount: finalCorrect, totalCount: total }),
    });
    const data = await res.json().catch(() => null);
    setResult(
      res.ok
        ? (data as TestResult)
        : { passed: false, score: Math.round((finalCorrect / total) * 100), threshold: 85 }
    );
    setSaving(false);
    setPhase("done");
  }

  if (phase === "intro") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 p-6">
        <Card className="text-center motion-safe:animate-pop-in">
          <GraduationCap aria-hidden className="mx-auto h-12 w-12 text-brand-600" />
          <p className="mt-3 text-caption font-bold text-brand-600">Niveau-Test</p>
          <h1 className="mt-1 text-h1">{course.title}</h1>
          <p className="mt-3 text-body text-ink-700">
            {total} Aufgaben quer durch den ganzen Kurs – zufällig ausgewählt und gemischt.
            Mit <strong>85 %</strong> bestehst du und schließt Niveau {course.level} offiziell in PolyGlott ab.
          </p>
          <p className="mt-3 text-caption text-ink-500">
            Kein Zeitlimit. Du kannst den Test beliebig oft wiederholen – die Aufgaben sind jedes Mal andere.
          </p>
        </Card>
        <Button full onClick={() => setPhase("test")}>
          Test starten
        </Button>
        <Link href="/courses" className="text-center text-body text-ink-500 hover:text-ink-700">
          Zurück zur Kursübersicht
        </Link>
      </div>
    );
  }

  if (phase === "done" && result) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 p-6 text-center">
        {result.passed ? (
          <>
            <div className="flex justify-center motion-safe:animate-pop-in" aria-hidden>
              <span className="flex h-28 w-28 items-center justify-center rounded-full bg-gold/15">
                <Award className="h-14 w-14 text-gold" />
              </span>
            </div>
            <h1 className="text-h1">Bestanden – Niveau {course.level} gemeistert!</h1>
            <Card className="text-left">
              <p className="text-caption font-bold text-ink-500">PolyGlott-Zertifikat</p>
              <p className="mt-2 text-h2">{userName ?? "Du"}</p>
              <p className="mt-1 text-body text-ink-700">
                hat den Niveau-Test <strong>Türkisch {course.level}</strong> mit{" "}
                <strong>{result.score} %</strong> bestanden ({new Date().toLocaleDateString("de-DE")}).
              </p>
              <div className="mt-3 flex flex-wrap gap-3 border-t border-ink-100 pt-3 text-body">
                <span>+{result.xp ?? 50} XP</span>
                {result.newLevel && <span>Neues Niveau: <strong>{result.newLevel}</strong></span>}
              </div>
              <p className="mt-3 text-caption text-ink-500">
                CEFR-orientiert nach dem PolyGlott-Lehrplan. Für ein amtlich anerkanntes Zertifikat
                (z. B. telc Türkçe, TÖMER) meldest du dich bei einer akkreditierten Prüfstelle an –
                mit diesem Stand bist du gut vorbereitet.
              </p>
            </Card>
            <Button full onClick={() => router.push("/dashboard")}>
              Weiter zum Dashboard
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-h1">{result.score} % – knapp daneben</h1>
            <p className="text-body text-ink-500">
              Du brauchst {result.threshold} %. Wiederhol deine fälligen Vokabeln und die Lektionen,
              die dir schwergefallen sind – dann klappt es beim nächsten Versuch. Die Aufgaben sind
              jedes Mal neu gemischt.
            </p>
            <div className="flex flex-col gap-3">
              <Button full onClick={() => window.location.reload()}>
                <span className="flex items-center justify-center gap-2">
                  <RotateCcw aria-hidden className="h-4 w-4" /> Nochmal versuchen
                </span>
              </Button>
              <Button variant="secondary" full onClick={() => router.push("/review")}>
                Erst Vokabeln wiederholen
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  const exercise = exercises[index];
  const answered = feedback !== null;

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col p-4 pb-40">
      <header className="flex items-center gap-4 py-3">
        <Link
          href="/courses"
          aria-label="Test abbrechen"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
        >
          <X aria-hidden className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <ProgressBar value={index + (answered ? 1 : 0)} max={total} label="Test-Fortschritt" />
        </div>
        <span className="text-caption font-bold text-ink-500">
          {index + 1}/{total}
        </span>
      </header>

      <main className="flex flex-1 flex-col justify-center py-6">
        <TestExerciseRenderer
          key={exercise.id}
          exercise={exercise}
          lang={course.targetLang}
          answered={answered}
          onAnswer={answer}
        />
      </main>

      {feedback && (
        <FeedbackBar
          correct={feedback.correct}
          message={saving ? "Werte aus …" : feedback.message}
          onNext={next}
          isLast={index + 1 >= total}
        />
      )}
    </div>
  );
}

function TestExerciseRenderer({
  exercise,
  lang,
  answered,
  onAnswer,
}: {
  exercise: TestExercise;
  lang: string;
  answered: boolean;
  onAnswer: (correct: boolean, message: string) => void;
}) {
  const c = exercise.content;
  switch (exercise.type) {
    case "multiple_choice":
      return <MultipleChoice content={c as MultipleChoiceContent} lang={lang} answered={answered} onAnswer={onAnswer} />;
    case "gap_fill":
      return <GapFill content={c as GapFillContent} lang={lang} answered={answered} onAnswer={onAnswer} />;
    case "sentence_order":
      return <SentenceOrder content={c as SentenceOrderContent} lang={lang} answered={answered} onAnswer={onAnswer} />;
    case "translation":
      return <Translation content={c as TranslationContent} answered={answered} onAnswer={onAnswer} />;
    case "listening":
      return <Listening content={c as ListeningContent} lang={lang} answered={answered} onAnswer={onAnswer} />;
    default:
      return <p className="text-error-700">Unbekannter Übungstyp</p>;
  }
}
