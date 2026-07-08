import Link from "next/link";
import { db } from "@/lib/db";
import { Play } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const courses = await db.course.findMany({
    orderBy: { order: "asc" },
    include: {
      units: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" }, include: { _count: { select: { exercises: true, vocabItems: true } } } } },
      },
    },
  });

  return (
    <div className="space-y-6">
      <p className="text-body text-ink-500">
        Jede Lektion direkt starten und durchspielen – zum Testen von Inhalt und Übungen.
      </p>

      {courses.map((course) => (
        <section key={course.id} className="rounded-card border border-ink-100 bg-surface p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-chip bg-brand-100 px-2 py-0.5 text-caption font-bold text-brand-600">
              {course.level}
            </span>
            <h2 className="text-h3 font-bold text-ink-900">{course.title}</h2>
          </div>

          <div className="space-y-4">
            {course.units.map((unit) => (
              <div key={unit.id}>
                <h3 className="mb-1.5 text-caption font-semibold uppercase tracking-wide text-ink-500">
                  {unit.title}
                </h3>
                <div className="space-y-1.5">
                  {unit.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.id}`}
                      className="flex items-center justify-between gap-3 rounded-button bg-ink-50 px-3 py-2 transition-colors hover:bg-ink-100"
                    >
                      <span className="truncate text-body text-ink-900">{lesson.title}</span>
                      <span className="flex shrink-0 items-center gap-2 text-caption text-ink-500">
                        <span className="nums">{lesson._count.vocabItems}V · {lesson._count.exercises}Ü</span>
                        <Play aria-hidden className="h-4 w-4 text-brand-600" />
                      </span>
                    </Link>
                  ))}
                  {unit.lessons.length === 0 && <p className="text-caption text-ink-500">Keine Lektionen.</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      {courses.length === 0 && <p className="text-ink-500">Keine Kurse vorhanden.</p>}
    </div>
  );
}
