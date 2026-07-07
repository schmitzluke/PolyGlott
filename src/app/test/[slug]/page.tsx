import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { TestPlayer, type TestExercise } from "./TestPlayer";
import type { ExerciseType } from "@/lib/types";

export const dynamic = "force-dynamic";

const TEST_SIZE = 15;
const TEST_TYPES: ExerciseType[] = [
  "multiple_choice",
  "gap_fill",
  "sentence_order",
  "translation",
  "listening",
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Niveau-Test: 15 zufällige Aufgaben quer durch den Kurs, 85 % zum Bestehen. */
export default async function LevelTestPage({ params }: { params: { slug: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const course = await db.course.findUnique({
    where: { slug: params.slug },
    include: {
      units: {
        include: { lessons: { include: { exercises: true } } },
      },
    },
  });
  if (!course) notFound();
  if (course.isPremium && !user.isPremium) redirect("/premium");

  const lessons = course.units.flatMap((u) => u.lessons);
  const lessonIds = lessons.map((l) => l.id);
  const completed = await db.userProgress.count({
    where: { userId: user.id, lessonId: { in: lessonIds } },
  });
  if (lessonIds.length === 0 || completed < lessonIds.length) redirect("/courses");

  const pool = lessons
    .flatMap((l) => l.exercises)
    .filter((e) => TEST_TYPES.includes(e.type as ExerciseType));
  const exercises: TestExercise[] = shuffle(pool)
    .slice(0, TEST_SIZE)
    .map((e) => ({ id: e.id, type: e.type as ExerciseType, content: JSON.parse(e.content) }));

  return (
    <TestPlayer
      course={{ slug: course.slug, title: course.title, level: course.level, targetLang: course.targetLang }}
      exercises={exercises}
      userName={user.name}
    />
  );
}
