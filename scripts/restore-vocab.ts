import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("Stelle Karteikarten aus abgeschlossenen Lektionen wieder her...");

  const users = await db.user.findMany();

  let restoredCount = 0;

  for (const user of users) {
    const completedLessons = await db.userProgress.findMany({
      where: { userId: user.id },
      include: { lesson: { include: { vocabItems: true } } },
    });

    for (const progress of completedLessons) {
      for (const vocab of progress.lesson.vocabItems) {
        await db.reviewItem.upsert({
          where: { userId_vocabId: { userId: user.id, vocabId: vocab.id } },
          update: {},
          create: {
            userId: user.id,
            vocabId: vocab.id,
            dueAt: new Date(),
          },
        });
        restoredCount++;
      }
    }
  }

  console.log(`Fertig! ${restoredCount} Karteikarten wiederhergestellt (auf Status "Neu").`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
