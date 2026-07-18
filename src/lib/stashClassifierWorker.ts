import { db } from "@/lib/db";
import { askOpenAICompatible } from "@/lib/llm";
import {
  MIN_NEW_ISLAND_SIZE,
  buildClassificationPrompt,
  parseClassificationResponse,
  groupNewTopics,
  slugifyTopic,
  type ClassificationCandidate,
} from "@/lib/stashClassifier";

/**
 * Nächtlicher Klassifikations-Lauf: ordnet alle READY/UNASSIGNED StashSentences
 * einer bestehenden oder neuen IslandPack zu. Wird per node-cron aus
 * instrumentation.ts angestoßen, kein externer Queue-Dienst.
 */
export async function runStashClassification(): Promise<void> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error("[stashClassifierWorker] DEEPSEEK_API_KEY fehlt, überspringe Lauf.");
    return;
  }

  const candidates = await db.stashSentence.findMany({
    where: { status: "READY", classificationStatus: "UNASSIGNED" },
    select: { id: true, userId: true, germanOriginal: true },
  });
  if (candidates.length === 0) return;

  const byUser = new Map<string, ClassificationCandidate[]>();
  for (const c of candidates) {
    const list = byUser.get(c.userId) ?? [];
    list.push({ id: c.id, germanOriginal: c.germanOriginal });
    byUser.set(c.userId, list);
  }

  for (const [userId, userCandidates] of byUser) {
    try {
      await classifyForUser(userId, userCandidates, apiKey);
    } catch (err) {
      console.error(`[stashClassifierWorker] Lauf fehlgeschlagen für user ${userId}:`, err);
    }
  }
}

async function classifyForUser(
  userId: string,
  candidates: ClassificationCandidate[],
  apiKey: string
): Promise<void> {
  const islands = await db.islandPack.findMany({
    where: { OR: [{ isCustom: false }, { userId }] },
    select: { id: true, slug: true, title: true },
  });

  const prompt = buildClassificationPrompt(
    candidates,
    islands.map((i) => ({ slug: i.slug, title: i.title }))
  );

  const raw = await askOpenAICompatible(
    "https://api.deepseek.com",
    apiKey,
    process.env.DEEPSEEK_MODEL ?? "deepseek-reasoner",
    {
      system: prompt.system,
      messages: [{ role: "user", content: prompt.user }],
      temperature: 0.2,
      maxTokens: 2000,
    }
  );

  const validIds = candidates.map((c) => c.id);
  const results = parseClassificationResponse(raw, validIds);

  const slugToId = new Map(islands.map((i) => [i.slug, i.id]));
  for (const result of results) {
    if (!("existingIslandSlug" in result)) continue;
    const islandId = slugToId.get(result.existingIslandSlug);
    if (!islandId) continue;
    await db.stashSentence.update({
      where: { id: result.sentenceId },
      data: { islandPackId: islandId, classificationStatus: "ASSIGNED" },
    });
  }

  const newTopicResults = results.filter((r) => "newTopicLabel" in r);
  const groups = groupNewTopics(newTopicResults, MIN_NEW_ISLAND_SIZE);
  if (groups.size === 0) return;

  const user = await db.user.findUnique({ where: { id: userId }, select: { selfLevel: true } });
  const level = user?.selfLevel ?? "A1";

  for (const [label, group] of groups) {
    const slug = await uniqueSlug(slugifyTopic(label));
    const island = await db.islandPack.create({
      data: { slug, title: label, level, isCustom: true, userId, theme: group.theme },
    });
    await db.stashSentence.updateMany({
      where: { id: { in: group.sentenceIds } },
      data: { islandPackId: island.id, classificationStatus: "ASSIGNED" },
    });
  }
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || "insel";
  let suffix = 1;
  while (await db.islandPack.findUnique({ where: { slug } })) {
    suffix += 1;
    slug = `${base || "insel"}-${suffix}`;
  }
  return slug;
}
