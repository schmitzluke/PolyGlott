import { db } from "@/lib/db";
import { MASTERY_MILESTONES } from "@/lib/mastery";

export const ACHIEVEMENTS = [
  { code: "streak_3", title: "Warmgelaufen", description: "3-Tage-Streak", icon: "🔥", kind: "streak", threshold: 3 },
  { code: "streak_7", title: "Eine Woche Feuer", description: "7-Tage-Streak", icon: "🔥", kind: "streak", threshold: 7 },
  { code: "streak_30", title: "Unaufhaltsam", description: "30-Tage-Streak", icon: "🌋", kind: "streak", threshold: 30 },
  { code: "vocab_50", title: "Wortsammler", description: "50 Vokabeln gelernt", icon: "🧠", kind: "vocab", threshold: 50 },
  { code: "vocab_100", title: "100 Vokabeln gelernt", description: "100 Vokabeln im Wiederholungssystem", icon: "🏆", kind: "vocab", threshold: 100 },
  { code: "xp_500", title: "XP-Jäger", description: "500 XP gesammelt", icon: "⭐", kind: "xp", threshold: 500 },
  // kind "level": wird nicht automatisch geprüft, sondern vom Niveau-Test verliehen
  { code: "level_a1", title: "A1 gemeistert", description: "Niveau-Test A1 bestanden", icon: "🏅", kind: "level", threshold: 1 },
  { code: "level_a2", title: "A2 gemeistert", description: "Niveau-Test A2 bestanden", icon: "🏅", kind: "level", threshold: 2 },
  { code: "level_b1", title: "B1 gemeistert", description: "Niveau-Test B1 bestanden", icon: "🏅", kind: "level", threshold: 3 },
  // kind "mastery": automatisch geprüft gegen User.masteredCount (echte, gefestigte Sätze – s. src/lib/mastery.ts)
  ...MASTERY_MILESTONES.map((m) => ({
    code: `mastery_${m.threshold}`,
    title: m.label,
    description: `${m.threshold} Sätze dauerhaft gefestigt (~${m.cefr})`,
    icon: "🗺️",
    kind: "mastery" as const,
    threshold: m.threshold,
  })),
] as const;

/** Prüft alle Achievements für einen User und schaltet neue frei. Gibt neue frei geschaltete zurück. */
export async function checkAchievements(userId: string) {
  const [user, streak, vocabCount, all, unlocked] = await Promise.all([
    db.user.findUniqueOrThrow({ where: { id: userId } }),
    db.streak.findUnique({ where: { userId } }),
    db.reviewItem.count({ where: { userId } }),
    db.achievement.findMany(),
    db.userAchievement.findMany({ where: { userId }, select: { achievementId: true } }),
  ]);

  const unlockedIds = new Set(unlocked.map((u) => u.achievementId));
  const values: Record<string, number> = {
    streak: streak?.longest ?? 0,
    vocab: vocabCount,
    xp: user.xpTotal,
    mastery: user.masteredCount,
  };

  // Nur automatisch prüfbare Kinds; "level" wird vom Niveau-Test direkt verliehen.
  const newly = all.filter(
    (a) => !unlockedIds.has(a.id) && values[a.kind] !== undefined && values[a.kind] >= a.threshold
  );
  if (newly.length > 0) {
    await db.userAchievement.createMany({
      data: newly.map((a) => ({ userId, achievementId: a.id })),
    });
  }
  return newly;
}
