import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { allCourses } from "../content";
import { FREQUENCY_VOCAB } from "../content/frequency-tr";
import { ACHIEVEMENTS } from "../src/lib/achievements";
import { validateLesson } from "../src/lib/validateLesson";
import type { SeedCourse, SeedLesson } from "../src/lib/types";

const db = new PrismaClient();

function countLessons(course: SeedCourse): number {
  return course.units.reduce((sum, u) => sum + u.lessons.length, 0);
}

/**
 * Idempotent: Ein Kurs wird nur neu geschrieben, wenn er fehlt oder sich die
 * Lektionszahl geändert hat (FORCE_SEED=1 erzwingt es). So bleibt der
 * Lernfortschritt (UserProgress, ReviewItems) bei erneutem Seeden erhalten.
 */
async function seedCourse(course: SeedCourse, order: number) {
  const existing = await db.course.findUnique({
    where: { slug: course.slug },
    include: { units: { include: { lessons: { select: { id: true } } } } },
  });
  if (existing) {
    const existingCount = existing.units.reduce((sum, u) => sum + u.lessons.length, 0);
    if (existingCount === countLessons(course) && process.env.FORCE_SEED !== "1") {
      console.log(`⏭  Kurs unverändert, übersprungen: ${course.title}`);
      return;
    }
    await db.course.delete({ where: { id: existing.id } });
    console.log(`♻️  Kurs wird neu geschrieben: ${course.title} (Fortschritt dieses Kurses geht verloren)`);
  }

  await db.course.create({
    data: {
      slug: course.slug,
      title: course.title,
      description: course.description,
      level: course.level,
      sourceLang: course.sourceLang,
      targetLang: course.targetLang,
      isPremium: course.isPremium,
      order,
      units: {
        create: course.units.map((unit, unitIndex) => ({
          title: unit.title,
          description: unit.description,
          order: unitIndex,
          lessons: {
            create: unit.lessons.map((lesson, lessonIndex) => ({
              slug: lesson.slug,
              title: lesson.title,
              intro: lesson.intro,
              grammarTip: lesson.grammarTip,
              cultureTip: lesson.cultureTip,
              order: lessonIndex,
              vocabItems: { create: lesson.vocab },
              exercises: {
                create: lesson.exercises.map((exercise, exerciseIndex) => ({
                  type: exercise.type,
                  order: exerciseIndex,
                  content: JSON.stringify(exercise.content),
                })),
              },
            })),
          },
        })),
      },
    },
  });
  console.log(`✅ Kurs geseedet: ${course.title}`);
}

/** Generierte Lektionen (scripts/generate-lesson.ts) aus content/generated/ anhängen. */
async function seedGeneratedLessons() {
  const dir = path.join(__dirname, "../content/generated");
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort();

  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8")) as {
      courseSlug: string;
      unitTitle: string;
      unitDescription?: string;
      lesson: SeedLesson;
    };

    const errors = validateLesson(raw.lesson);
    if (errors.length > 0) {
      console.warn(`⚠️  ${file} übersprungen – ungültig:\n   ${errors.join("\n   ")}`);
      continue;
    }
    if (await db.lesson.findUnique({ where: { slug: raw.lesson.slug } })) {
      continue; // schon geseedet
    }

    const course = await db.course.findUnique({
      where: { slug: raw.courseSlug },
      include: { units: { include: { lessons: { select: { id: true } } } } },
    });
    if (!course) {
      console.warn(`⚠️  ${file}: Kurs „${raw.courseSlug}“ existiert nicht – übersprungen.`);
      continue;
    }

    let unit = course.units.find((u) => u.title === raw.unitTitle);
    if (!unit) {
      unit = {
        ...(await db.unit.create({
          data: {
            courseId: course.id,
            title: raw.unitTitle,
            description: raw.unitDescription ?? "",
            order: course.units.length,
          },
        })),
        lessons: [],
      };
    }

    await db.lesson.create({
      data: {
        unitId: unit.id,
        slug: raw.lesson.slug,
        title: raw.lesson.title,
        intro: raw.lesson.intro,
        grammarTip: raw.lesson.grammarTip,
        cultureTip: raw.lesson.cultureTip,
        order: unit.lessons.length,
        vocabItems: { create: raw.lesson.vocab },
        exercises: {
          create: raw.lesson.exercises.map((exercise, i) => ({
            type: exercise.type,
            order: i,
            content: JSON.stringify(exercise.content),
          })),
        },
      },
    });
    console.log(`✅ Generierte Lektion geseedet: ${raw.lesson.title} (${file})`);
  }
}

async function main() {
  // Veraltete Kurse entfernen (Slug nicht mehr im Content vorhanden)
  const knownSlugs = allCourses.map((c) => c.slug);
  const obsolete = await db.course.findMany({ where: { slug: { notIn: knownSlugs } } });
  for (const course of obsolete) {
    await db.course.delete({ where: { id: course.id } });
    console.log(`🗑  Veralteter Kurs entfernt: ${course.title} (${course.slug})`);
  }

  for (const [index, course] of allCourses.entries()) {
    await seedCourse(course, index);
  }
  await seedGeneratedLessons();

  // Frequenz-Wortschatz (Wortschatz-Trainer) – idempotent per freqRank
  const existingFreq = await db.vocabItem.count({ where: { freqRank: { not: null } } });
  if (existingFreq !== FREQUENCY_VOCAB.length || process.env.FORCE_SEED === "1") {
    for (const word of FREQUENCY_VOCAB) {
      await db.vocabItem.upsert({
        where: { freqRank: word.rank },
        update: { source: word.source, target: word.target, category: word.category },
        create: { freqRank: word.rank, source: word.source, target: word.target, category: word.category },
      });
    }
    console.log(`✅ ${FREQUENCY_VOCAB.length} Frequenz-Vokabeln geseedet (Wortschatz-Trainer)`);
  } else {
    console.log(`⏭  Frequenz-Wortschatz unverändert (${existingFreq} Wörter)`);
  }

  for (const a of ACHIEVEMENTS) {
    await db.achievement.upsert({
      where: { code: a.code },
      update: { title: a.title, description: a.description, icon: a.icon, kind: a.kind, threshold: a.threshold },
      create: a,
    });
  }
  console.log(`✅ ${ACHIEVEMENTS.length} Achievements geseedet`);

  const passwordHash = await bcrypt.hash("demo1234", 10);
  await db.user.upsert({
    where: { email: "demo@bubbel.app" },
    update: {},
    create: {
      email: "demo@bubbel.app",
      name: "Demo",
      passwordHash,
      onboarded: true,
      targetLanguage: "tr",
      dailyGoalXp: 30,
    },
  });
  console.log("✅ Demo-User: demo@bubbel.app / demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
