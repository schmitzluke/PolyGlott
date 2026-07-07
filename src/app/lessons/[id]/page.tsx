import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { LessonPlayer, type PlayerLesson } from "@/components/LessonPlayer";
import type { ExerciseType } from "@/lib/types";

/** Übungs-Screen: eigenes Layout ohne App-Navigation (voller Fokus). */
export default async function LessonPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const lesson = await db.lesson.findUnique({
    where: { id: params.id },
    include: {
      exercises: { orderBy: { order: "asc" } },
      unit: { include: { course: true } },
    },
  });
  if (!lesson) notFound();
  if (lesson.unit.course.isPremium && !user.isPremium) redirect("/premium");

  const playerLesson: PlayerLesson = {
    id: lesson.id,
    title: lesson.title,
    intro: lesson.intro,
    grammarTip: lesson.grammarTip,
    cultureTip: lesson.cultureTip,
    targetLang: lesson.unit.course.targetLang,
    exercises: lesson.exercises.map((e) => ({
      id: e.id,
      type: e.type as ExerciseType,
      content: JSON.parse(e.content),
    })),
  };

  return <LessonPlayer lesson={playerLesson} />;
}
