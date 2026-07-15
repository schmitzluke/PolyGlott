import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ACHIEVEMENTS } from "../src/lib/achievements";

const db = new PrismaClient();

/**
 * Seedet nur noch, was nach dem Umbau auf StashSentence/IslandPack übrig ist:
 * Achievements + Demo-User. Die frühere Course/Unit/Lesson/VocabItem-Seed-
 * Logik (Phase 1 des Refactorings) ist entfallen, siehe REFACTORINGPLAN.md.
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
