import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ACHIEVEMENTS } from "../src/lib/achievements";
import { courseDeTrA1 } from "../content/de-tr-a1";

const db = new PrismaClient();

/**
 * Kuratierte Language Islands aus dem A1-Kursinhalt: jede Unit wird ein Pack,
 * jedes Vokabel-Beispiel (oder das Wortpaar selbst, falls kein Beispielsatz)
 * eine IslandSentence. Läuft NUR über bereits redaktionell geprüften Content
 * (content/de-tr-a1.ts) – kein LLM-Aufruf, rein deterministisch, idempotent
 * (überspringt Packs, die schon Sätze haben).
 */
// Themen-Zuordnung für die bestehenden 6 kuratierten Units (Slug → Theme aus
// src/lib/islandThemes.ts). Neue Units ohne Eintrag bleiben theme=null (UI fällt
// auf "Sonstiges" zurück) — echte inhaltliche Kuration ist ein separates Thema.
const THEME_BY_UNIT_SLUG: Record<string, string> = {
  "tr-a1-alltag-unit-1": "grundlagen",
  "tr-a1-alltag-unit-2": "essen-shoppen",
  "tr-a1-alltag-unit-3": "familie-beziehungen",
  "tr-a1-alltag-unit-4": "essen-shoppen",
  "tr-a1-alltag-unit-5": "grundlagen",
  "tr-a1-alltag-unit-6": "haushalt-alltag",
};

async function seedIslands() {
  let packsCreated = 0;
  let sentencesCreated = 0;

  for (const [unitIndex, unit] of courseDeTrA1.units.entries()) {
    const slug = `${courseDeTrA1.slug}-unit-${unitIndex + 1}`;
    const theme = THEME_BY_UNIT_SLUG[slug] ?? null;

    const pack = await db.islandPack.upsert({
      where: { slug },
      update: { title: unit.title, level: courseDeTrA1.level, order: unitIndex, theme },
      create: { slug, title: unit.title, level: courseDeTrA1.level, order: unitIndex, theme },
    });

    const existing = await db.islandSentence.count({ where: { packId: pack.id } });
    if (existing > 0) continue;

    const seen = new Set<string>();
    let order = 0;
    for (const lesson of unit.lessons) {
      for (const v of lesson.vocab) {
        const german = v.exampleSource ?? v.source;
        const turkish = v.exampleTarget ?? v.target;
        const key = turkish.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        await db.islandSentence.create({
          data: { packId: pack.id, germanOriginal: german, turkishTranslation: turkish, order: order++ },
        });
        sentencesCreated++;
      }
    }
    packsCreated++;
  }

  console.log(`✅ ${packsCreated} Island-Packs, ${sentencesCreated} neue Sätze geseedet`);
}

/**
 * Seedet Achievements + Demo-User + kuratierte Language Islands. Die frühere
 * Course/Unit/Lesson/VocabItem-Seed-Logik (Phase 1 des Refactorings) ist
 * entfallen, siehe REFACTORINGPLAN.md.
 */
async function main() {
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
    where: { email: "demo@polyglott.app" },
    update: {},
    create: {
      email: "demo@polyglott.app",
      name: "Demo",
      passwordHash,
      onboarded: true,
      targetLanguage: "tr",
      dailyGoalXp: 30,
    },
  });
  console.log("✅ Demo-User: demo@polyglott.app / demo1234");

  await seedIslands();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
