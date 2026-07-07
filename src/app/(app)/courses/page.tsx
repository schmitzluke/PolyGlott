import Link from "next/link";
import { redirect } from "next/navigation";
import { Award, CheckCircle2, GraduationCap, Lock, Play, Sparkles } from "lucide-react";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Card } from "@/components/ui/Card";

/** Kurs-/Lektionsübersicht als Lernpfad. */
export default async function CoursesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [courses, progress, unlocked] = await Promise.all([
    db.course.findMany({
      where: { targetLang: user.targetLanguage },
      orderBy: { order: "asc" },
      include: {
        units: {
          orderBy: { order: "asc" },
          include: { lessons: { orderBy: { order: "asc" } } },
        },
      },
    }),
    db.userProgress.findMany({ where: { userId: user.id } }),
    db.userAchievement.findMany({
      where: { userId: user.id },
      include: { achievement: { select: { code: true } } },
    }),
  ]);

  const done = new Map(progress.map((p) => [p.lessonId, p.score]));
  const unlockedCodes = new Set(unlocked.map((u) => u.achievement.code));

  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-h1">Dein Lernpfad</h1>
      {courses.map((course) => {
        const locked = course.isPremium && !user.isPremium;
        // Lernpfad: erste nicht abgeschlossene Lektion ist „aktiv“, spätere gesperrt
        const allLessons = course.units.flatMap((u) => u.lessons);
        const firstOpenIndex = allLessons.findIndex((l) => !done.has(l.id));

        return (
          <section key={course.id}>
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-chip bg-ink-100 px-2 py-0.5 text-caption font-bold text-ink-700">{course.level}</span>
              <h2 className="text-h2">{course.title}</h2>
              {course.isPremium && (
                <span className="inline-flex items-center gap-1 rounded-chip bg-gold/20 px-2 py-0.5 text-caption font-bold text-gold">
                  <Sparkles aria-hidden className="h-3.5 w-3.5" /> Premium
                </span>
              )}
            </div>
            <p className="mb-4 text-body text-ink-500">{course.description}</p>

            {locked ? (
              <Link href="/premium" className="block">
                <Card className="border-2 border-dashed border-gold/60 text-center transition-transform hover:scale-[1.01]">
                  <Lock aria-hidden className="mx-auto h-8 w-8 text-gold" />
                  <p className="mt-2 text-h3">Mit Premium freischalten</p>
                  <p className="text-caption text-ink-500">Alle A2-Lektionen, Offline-Modus & mehr</p>
                </Card>
              </Link>
            ) : course.units.length === 0 ? (
              <Card className="text-center">
                <p className="text-h3">Dieser Kurs wächst gerade</p>
                <p className="mt-1 text-caption text-ink-500">
                  Neue Lektionen entstehen mit dem Generator – siehe content/curriculum-b1.md im Projekt.
                </p>
              </Card>
            ) : (
              <div className="flex flex-col gap-6">
                {course.units.map((unit) => (
                  <div key={unit.id}>
                    <h3 className="mb-2 text-h3 text-ink-700">{unit.title}</h3>
                    <p className="mb-3 text-caption text-ink-500">{unit.description}</p>
                    <ol className="flex flex-col gap-3">
                      {unit.lessons.map((lesson) => {
                        const globalIndex = allLessons.findIndex((l) => l.id === lesson.id);
                        const isDone = done.has(lesson.id);
                        const isActive = globalIndex === firstOpenIndex;
                        const isLocked = !isDone && !isActive;
                        return (
                          <li key={lesson.id}>
                            {isLocked ? (
                              <Card className="flex items-center gap-4 opacity-50">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-100" aria-hidden>
                                  <Lock className="h-5 w-5 text-ink-500" />
                                </span>
                                <div>
                                  <p className="font-semibold text-ink-500">{lesson.title}</p>
                                  <p className="text-caption text-ink-300">Schließe die vorherige Lektion ab</p>
                                </div>
                              </Card>
                            ) : (
                              <Link href={`/lessons/${lesson.id}`} className="block">
                                <Card
                                  className={`flex items-center gap-4 transition-transform hover:scale-[1.01] ${
                                    isActive ? "border-2 border-brand-500" : ""
                                  }`}
                                >
                                  <span
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                                      isDone ? "bg-correct-50" : "bg-brand-50"
                                    }`}
                                    aria-hidden
                                  >
                                    {isDone ? (
                                      <CheckCircle2 className="h-5 w-5 text-correct-700" />
                                    ) : (
                                      <Play className="h-5 w-5 fill-brand-600 text-brand-600" />
                                    )}
                                  </span>
                                  <div className="flex-1">
                                    <p className="font-semibold">{lesson.title}</p>
                                    <p className="text-caption text-ink-500">
                                      {isDone ? `Abgeschlossen · ${done.get(lesson.id)} % richtig – nochmal üben?` : lesson.intro}
                                    </p>
                                  </div>
                                  {isActive && (
                                    <span className="rounded-chip bg-brand-50 px-3 py-1 text-caption font-bold text-brand-600">Start</span>
                                  )}
                                </Card>
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                ))}

                {/* Niveau-Test: freigeschaltet, sobald alle Lektionen abgeschlossen sind */}
                {(() => {
                  const allDone = allLessons.length > 0 && allLessons.every((l) => done.has(l.id));
                  const passed = unlockedCodes.has(`level_${course.level.toLowerCase()}`);
                  if (passed) {
                    return (
                      <Card className="flex items-center gap-4 border-2 border-gold/40">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15" aria-hidden>
                          <Award className="h-5 w-5 text-gold" />
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold">Niveau {course.level} gemeistert</p>
                          <p className="text-caption text-ink-500">Test bestanden – weiter geht’s im nächsten Level!</p>
                        </div>
                        <Link href={`/test/${course.slug}`} className="text-caption font-bold text-brand-600 hover:underline">
                          Nochmal testen
                        </Link>
                      </Card>
                    );
                  }
                  if (allDone) {
                    return (
                      <Link href={`/test/${course.slug}`} className="block">
                        <Card className="flex items-center gap-4 border-2 border-brand-500 transition-transform hover:scale-[1.01]">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50" aria-hidden>
                            <GraduationCap className="h-5 w-5 text-brand-600" />
                          </span>
                          <div className="flex-1">
                            <p className="font-semibold">Niveau-Test {course.level}</p>
                            <p className="text-caption text-ink-500">
                              15 gemischte Aufgaben, 85 % zum Bestehen – schließ das Level offiziell ab.
                            </p>
                          </div>
                          <span className="rounded-chip bg-brand-50 px-3 py-1 text-caption font-bold text-brand-600">Start</span>
                        </Card>
                      </Link>
                    );
                  }
                  return (
                    <Card className="flex items-center gap-4 opacity-60">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-100" aria-hidden>
                        <GraduationCap className="h-5 w-5 text-ink-500" />
                      </span>
                      <div>
                        <p className="font-semibold text-ink-500">Niveau-Test {course.level}</p>
                        <p className="text-caption text-ink-300">
                          Schließe erst alle Lektionen ab ({allLessons.filter((l) => done.has(l.id)).length}/{allLessons.length})
                        </p>
                      </div>
                    </Card>
                  );
                })()}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
