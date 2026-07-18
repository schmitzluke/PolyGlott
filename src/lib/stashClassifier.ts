import { ISLAND_THEME_SLUGS, isValidThemeSlug } from "@/lib/islandThemes";

export const MIN_NEW_ISLAND_SIZE = 3;

export type ClassificationCandidate = { id: string; germanOriginal: string };
export type IslandOption = { slug: string; title: string };

export type ClassificationResult =
  | { sentenceId: string; existingIslandSlug: string }
  | { sentenceId: string; newTopicLabel: string; theme: string };

export interface NewTopicGroup {
  sentenceIds: string[];
  theme: string;
}

export function buildClassificationPrompt(
  candidates: ClassificationCandidate[],
  islands: IslandOption[]
): { system: string; user: string } {
  const themeList = ISLAND_THEME_SLUGS.join(", ");

  const system = `Du ordnest deutsche Lernsätze thematisch Sprachlern-Inseln zu.
Aufgabe: Für jeden gegebenen Satz entscheide, ob er thematisch zu einer der bestehenden Inseln passt,
oder ob er zu keiner passt und stattdessen ein neues Thema braucht.

Regeln (STRIKT, keine Ausnahmen):
- Passt der Satz klar zu einer bestehenden Insel: gib deren exakten "slug" als "existingIslandSlug" zurück.
- Passt der Satz zu keiner bestehenden Insel: erfinde ein kurzes, prägnantes deutsches Themen-Label
  (2-4 Wörter, z.B. "Beim Arzt", "Wetter") als "newTopicLabel", UND ordne zusätzlich eines dieser
  festen Themen-Slugs als "theme" zu (das inhaltlich passendste): ${themeList}
  Nutze für inhaltlich gleiche Sätze IMMER exakt dasselbe Label UND denselben Theme-Slug.
- Verändere den Satztext nicht, gib ihn nicht zurück.
- Antworte AUSSCHLIESSLICH mit einem JSON-Array, ein Objekt pro Satz, exakt in dieser Form:
  [{"sentenceId": "...", "existingIslandSlug": "..."}] ODER
  [{"sentenceId": "...", "newTopicLabel": "...", "theme": "..."}]
- Kein Markdown, keine Code-Fences, keine Erklärung, kein Text außerhalb des JSON-Arrays.`;

  const islandList = islands.map((i) => `- ${i.slug}: ${i.title}`).join("\n");
  const sentenceList = candidates.map((c) => `- ${c.id}: ${c.germanOriginal}`).join("\n");

  const user = `Bestehende Inseln:\n${islandList || "(keine)"}\n\nOffene Sätze:\n${sentenceList}`;

  return { system, user };
}

export function parseClassificationResponse(
  raw: string,
  validSentenceIds: string[]
): ClassificationResult[] {
  const arrayMatch = raw.match(/\[[\s\S]*\]/);
  if (!arrayMatch) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(arrayMatch[0]);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const validIds = new Set(validSentenceIds);
  const results: ClassificationResult[] = [];

  for (const entry of parsed) {
    if (typeof entry !== "object" || entry === null) continue;
    const record = entry as Record<string, unknown>;
    const sentenceId = record.sentenceId;
    if (typeof sentenceId !== "string" || !validIds.has(sentenceId)) continue;

    const existingIslandSlug = record.existingIslandSlug;
    const newTopicLabel = record.newTopicLabel;

    if (typeof existingIslandSlug === "string" && existingIslandSlug.trim().length > 0) {
      results.push({ sentenceId, existingIslandSlug: existingIslandSlug.trim() });
    } else if (typeof newTopicLabel === "string" && newTopicLabel.trim().length > 0) {
      const theme = record.theme;
      if (typeof theme === "string" && isValidThemeSlug(theme.trim())) {
        results.push({ sentenceId, newTopicLabel: newTopicLabel.trim(), theme: theme.trim() });
      }
    }
  }

  return results;
}

export function groupNewTopics(
  results: ClassificationResult[],
  minGroupSize: number
): Map<string, NewTopicGroup> {
  const byLabel = new Map<string, NewTopicGroup>();

  for (const result of results) {
    if (!("newTopicLabel" in result)) continue;
    const normalized = result.newTopicLabel.trim();
    const key = Array.from(byLabel.keys()).find(
      (existing) => existing.toLowerCase() === normalized.toLowerCase()
    );
    const targetKey = key ?? normalized;
    const existing = byLabel.get(targetKey);
    if (existing) {
      existing.sentenceIds.push(result.sentenceId);
    } else {
      byLabel.set(targetKey, { sentenceIds: [result.sentenceId], theme: result.theme });
    }
  }

  const grouped = new Map<string, NewTopicGroup>();
  for (const [label, group] of byLabel) {
    if (group.sentenceIds.length >= minGroupSize) grouped.set(label, group);
  }
  return grouped;
}

export function slugifyTopic(label: string): string {
  return label
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/&/g, "und")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
