# Insel-UI-Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Insel-Navigation von einer flachen Liste auf eine dreistufige Themen-Navigation umbauen (Themen-Grid → Insel-Liste → Insel-Detail mit Satzliste + Fortschritts-Indikator), inklusive automatischer Themen-Zuordnung für neu erzeugte Custom-Inseln.

**Architecture:** Neues Feld `IslandPack.theme` (feste 8er-Taxonomie, definiert in `src/lib/islandThemes.ts`) treibt die neue Grid-Navigation. Der bestehende nächtliche Klassifikations-Job bekommt die Themen-Zuordnung als zusätzliches Prompt-Feld. Der Fortschritts-Indikator pro Satz wird rein aus den bestehenden FSRS-Feldern (`ReviewItem.state`/`stability`) berechnet, kein neues DB-Feld dafür nötig.

**Tech Stack:** Next.js 14 (App Router, Server Components), Prisma 5 + SQLite, DeepSeek über `askOpenAICompatible`, Vitest, Tailwind (bestehende Design-Tokens: `ink-*`, `brand-*`, `correct-*`, `surface`, `rounded-card`, `shadow-soft`).

## Global Constraints

- Feste Themen-Taxonomie, exakt diese 8 Slugs/Labels: `grundlagen`("Grundlagen"), `familie-beziehungen`("Familie & Beziehungen"), `haushalt-alltag`("Haushalt & Alltag"), `soziale-interaktionen`("Soziale Interaktionen"), `hobbys`("Hobbys"), `arbeit`("Arbeit"), `reisen-ausland`("Reisen & Ausland"), `essen-shoppen`("Essen gehen & Shoppen").
- `IslandPack.theme` ist **nullable** (`String?`) — additive, sichere Migration wie alle bisherigen Schema-Änderungen in diesem Projekt; UI zeigt Inseln ohne Theme unter einer Sonstiges-Kachel.
- Fortschritts-Indikator ist eine reine Ableitung (kein DB-Feld), 5 Stufen aus `ReviewItem.state`/`stability`, nutzt die bestehende Konstante `MASTERY_STABILITY_DAYS` aus `src/lib/mastery.ts`.
- Kombinierter Indikator (kein getrenntes Hören/Abruf-Tracking — existiert im Code ohnehin nicht).
- Custom-Inseln bekommen ihr Theme vom nächtlichen Klassifikations-Job zugewiesen (Erweiterung von `src/lib/stashClassifier.ts` / `stashClassifierWorker.ts`), nicht manuell.
- Bestehendes Code-Pattern folgen: Server-Components fetchen direkt über `db` (kein Routing über `/api/islands` GET, das bleibt unverändert/unbenutzt), Client-Components mit `"use client"`, `getCurrentUser()` aus `@/lib/auth` für Auth-Checks, `redirect("/login")` bei fehlendem User.

---

### Task 1: Themen-Taxonomie + Schema-Migration + Seed-Backfill

**Files:**
- Create: `src/lib/islandThemes.ts`
- Test: `tests/islandThemes.test.ts`
- Modify: `prisma/schema.prisma`
- Modify: `prisma/seed.ts`

**Interfaces:**
- Produces: `ISLAND_THEMES: IslandTheme[]`, `ISLAND_THEME_SLUGS: string[]`, `isValidThemeSlug(slug: string): boolean`, `themeLabel(slug: string): string`, Prisma-Feld `IslandPack.theme: String?`. Spätere Tasks (3, 5, 6, 7) importieren aus `@/lib/islandThemes`.

- [ ] **Step 1: Test für `islandThemes.ts` schreiben**

Datei `tests/islandThemes.test.ts` anlegen:

```typescript
import { describe, expect, it } from "vitest";
import { ISLAND_THEMES, ISLAND_THEME_SLUGS, isValidThemeSlug, themeLabel } from "@/lib/islandThemes";

describe("islandThemes", () => {
  it("has exactly 8 themes with unique slugs", () => {
    expect(ISLAND_THEMES).toHaveLength(8);
    const slugs = ISLAND_THEMES.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(8);
  });

  it("ISLAND_THEME_SLUGS matches ISLAND_THEMES slugs", () => {
    expect(ISLAND_THEME_SLUGS).toEqual(ISLAND_THEMES.map((t) => t.slug));
  });

  it("isValidThemeSlug is true for known slugs, false otherwise", () => {
    expect(isValidThemeSlug("grundlagen")).toBe(true);
    expect(isValidThemeSlug("arbeit")).toBe(true);
    expect(isValidThemeSlug("erfundenes-thema")).toBe(false);
    expect(isValidThemeSlug("")).toBe(false);
  });

  it("themeLabel returns the German label for a known slug", () => {
    expect(themeLabel("familie-beziehungen")).toBe("Familie & Beziehungen");
    expect(themeLabel("essen-shoppen")).toBe("Essen gehen & Shoppen");
  });

  it("themeLabel falls back to 'Sonstiges' for unknown slugs", () => {
    expect(themeLabel("nicht-vorhanden")).toBe("Sonstiges");
  });
});
```

- [ ] **Step 2: Test ausführen, Fehlschlag bestätigen**

Run: `npm run test -- islandThemes`
Expected: FAIL — `Cannot find module '@/lib/islandThemes'`

- [ ] **Step 3: `src/lib/islandThemes.ts` implementieren**

```typescript
export interface IslandTheme {
  slug: string;
  label: string;
}

export const ISLAND_THEMES: IslandTheme[] = [
  { slug: "grundlagen", label: "Grundlagen" },
  { slug: "familie-beziehungen", label: "Familie & Beziehungen" },
  { slug: "haushalt-alltag", label: "Haushalt & Alltag" },
  { slug: "soziale-interaktionen", label: "Soziale Interaktionen" },
  { slug: "hobbys", label: "Hobbys" },
  { slug: "arbeit", label: "Arbeit" },
  { slug: "reisen-ausland", label: "Reisen & Ausland" },
  { slug: "essen-shoppen", label: "Essen gehen & Shoppen" },
];

export const ISLAND_THEME_SLUGS: string[] = ISLAND_THEMES.map((t) => t.slug);

export function isValidThemeSlug(slug: string): boolean {
  return ISLAND_THEME_SLUGS.includes(slug);
}

export function themeLabel(slug: string): string {
  return ISLAND_THEMES.find((t) => t.slug === slug)?.label ?? "Sonstiges";
}
```

- [ ] **Step 4: Test ausführen, Erfolg bestätigen**

Run: `npm run test -- islandThemes`
Expected: PASS — alle 5 Tests grün.

- [ ] **Step 5: `IslandPack.theme` zum Schema hinzufügen**

In `prisma/schema.prisma`, den bestehenden `IslandPack`-Block:

```prisma
model IslandPack {
  id             String           @id @default(cuid())
  slug           String           @unique
  title          String
  level          String // A1–C1 (CEFR)
  order          Int              @default(0)
  // isCustom=true: vom stashClassifierWorker erzeugte Insel, gehört genau einem Nutzer (userId gesetzt).
  // isCustom=false (Default): kuratierte Seed-Insel, userId bleibt null.
  isCustom       Boolean          @default(false)
  userId         String?
  user           User?            @relation(fields: [userId], references: [id], onDelete: Cascade)
  sentences      IslandSentence[]
  stashSentences StashSentence[]
}
```

ersetzen durch:

```prisma
model IslandPack {
  id             String           @id @default(cuid())
  slug           String           @unique
  title          String
  level          String // A1–C1 (CEFR)
  order          Int              @default(0)
  // isCustom=true: vom stashClassifierWorker erzeugte Insel, gehört genau einem Nutzer (userId gesetzt).
  // isCustom=false (Default): kuratierte Seed-Insel, userId bleibt null.
  isCustom       Boolean          @default(false)
  userId         String?
  user           User?            @relation(fields: [userId], references: [id], onDelete: Cascade)
  // Feste Taxonomie, Slugs aus src/lib/islandThemes.ts (ISLAND_THEME_SLUGS). Nullable:
  // additive Migration, UI zeigt themenlose Inseln unter einer Sonstiges-Kachel.
  theme          String?
  sentences      IslandSentence[]
  stashSentences StashSentence[]

  @@index([theme])
}
```

- [ ] **Step 6: Schema validieren**

Run: `cd "/Users/lukeschmitz/Claude/Projects/Sprachenlern App/bubbel" && npx prisma validate`
Expected: `The schema at prisma/schema.prisma is valid 🚀`

- [ ] **Step 7: Seed-Backfill für bestehende kuratierte Inseln**

In `prisma/seed.ts`, oberhalb der `seedIslands`-Funktion eine Mapping-Konstante ergänzen:

```typescript
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
```

Dann den bestehenden Upsert-Aufruf:

```typescript
    const pack = await db.islandPack.upsert({
      where: { slug },
      update: { title: unit.title, level: courseDeTrA1.level, order: unitIndex },
      create: { slug, title: unit.title, level: courseDeTrA1.level, order: unitIndex },
    });
```

ersetzen durch:

```typescript
    const theme = THEME_BY_UNIT_SLUG[slug] ?? null;

    const pack = await db.islandPack.upsert({
      where: { slug },
      update: { title: unit.title, level: courseDeTrA1.level, order: unitIndex, theme },
      create: { slug, title: unit.title, level: courseDeTrA1.level, order: unitIndex, theme },
    });
```

- [ ] **Step 8: Migration anwenden + Client generieren + Seed erneut laufen lassen**

Run: `npx prisma db push && npx prisma generate && npx prisma db seed`
Expected: `Your database is now in sync with your Prisma schema.`, erfolgreicher `generate`-Output, und der Seed-Log zeigt die 6 Units als aktualisiert (kein Fehler).

- [ ] **Step 9: Commit**

```bash
git add src/lib/islandThemes.ts tests/islandThemes.test.ts prisma/schema.prisma prisma/seed.ts
git commit -m "feat(db): add island theme taxonomy, schema field, and seed backfill"
```

---

### Task 2: Fortschritts-Indikator (`islandStatus.ts`)

**Files:**
- Create: `src/lib/islandStatus.ts`
- Test: `tests/islandStatus.test.ts`

**Interfaces:**
- Consumes: `MASTERY_STABILITY_DAYS` aus `@/lib/mastery` (bereits vorhanden, Wert `21`)
- Produces: `type ReviewProgress = { state: number; stability: number }`, `deriveSentenceStars(item: ReviewProgress | null | undefined): number` (Rückgabe 0-5). Task 7 nutzt diese Funktion für die Satzliste im Insel-Detail.

- [ ] **Step 1: Test schreiben**

Datei `tests/islandStatus.test.ts` anlegen:

```typescript
import { describe, expect, it } from "vitest";
import { deriveSentenceStars } from "@/lib/islandStatus";

describe("deriveSentenceStars", () => {
  it("returns 0 for null/undefined (sentence not yet learned)", () => {
    expect(deriveSentenceStars(null)).toBe(0);
    expect(deriveSentenceStars(undefined)).toBe(0);
  });

  it("returns 0 for state=New (0)", () => {
    expect(deriveSentenceStars({ state: 0, stability: 0 })).toBe(0);
  });

  it("returns 1 for state=Learning (1)", () => {
    expect(deriveSentenceStars({ state: 1, stability: 0.5 })).toBe(1);
  });

  it("returns 2 for state=Relearning (3)", () => {
    expect(deriveSentenceStars({ state: 3, stability: 1 })).toBe(2);
  });

  it("returns 3 for state=Review with stability below 7 days", () => {
    expect(deriveSentenceStars({ state: 2, stability: 3 })).toBe(3);
  });

  it("returns 4 for state=Review with stability 7-20 days", () => {
    expect(deriveSentenceStars({ state: 2, stability: 7 })).toBe(4);
    expect(deriveSentenceStars({ state: 2, stability: 20.9 })).toBe(4);
  });

  it("returns 5 for state=Review with stability >= 21 days (mastered)", () => {
    expect(deriveSentenceStars({ state: 2, stability: 21 })).toBe(5);
    expect(deriveSentenceStars({ state: 2, stability: 100 })).toBe(5);
  });
});
```

- [ ] **Step 2: Test ausführen, Fehlschlag bestätigen**

Run: `npm run test -- islandStatus`
Expected: FAIL — `Cannot find module '@/lib/islandStatus'`

- [ ] **Step 3: `src/lib/islandStatus.ts` implementieren**

```typescript
import { MASTERY_STABILITY_DAYS } from "@/lib/mastery";

const RECALL_STABILITY_DAYS = 7;

export interface ReviewProgress {
  state: number;
  stability: number;
}

/**
 * Kombinierter 0-5-Fortschritts-Indikator pro Satz, rein aus dem FSRS-Status
 * abgeleitet (kein eigenes DB-Feld). state: 0=New, 1=Learning, 2=Review, 3=Relearning.
 */
export function deriveSentenceStars(item: ReviewProgress | null | undefined): number {
  if (!item) return 0;
  if (item.state === 0) return 0;
  if (item.state === 1) return 1;
  if (item.state === 3) return 2;
  if (item.state === 2) {
    if (item.stability >= MASTERY_STABILITY_DAYS) return 5;
    if (item.stability >= RECALL_STABILITY_DAYS) return 4;
    return 3;
  }
  return 0;
}
```

- [ ] **Step 4: Test ausführen, Erfolg bestätigen**

Run: `npm run test -- islandStatus`
Expected: PASS — alle 7 Tests grün.

- [ ] **Step 5: Commit**

```bash
git add src/lib/islandStatus.ts tests/islandStatus.test.ts
git commit -m "feat: add FSRS-derived sentence progress indicator"
```

---

### Task 3: Theme-Zuordnung in der Klassifikations-Logik (`stashClassifier.ts`)

**Files:**
- Modify: `src/lib/stashClassifier.ts`
- Modify: `tests/stashClassifier.test.ts`

**Interfaces:**
- Consumes: `ISLAND_THEME_SLUGS`, `isValidThemeSlug` aus `@/lib/islandThemes` (Task 1)
- Produces (für Task 4): `ClassificationResult` mit `theme: string` im `newTopicLabel`-Zweig; `NewTopicGroup = { sentenceIds: string[]; theme: string }`; `groupNewTopics(...): Map<string, NewTopicGroup>` (Signatur geändert — vorher `Map<string, string[]>`).

- [ ] **Step 1: `tests/stashClassifier.test.ts` vollständig ersetzen**

Die komplette Datei `tests/stashClassifier.test.ts` durch diesen Inhalt ersetzen:

```typescript
import { describe, expect, it } from "vitest";
import {
  parseClassificationResponse,
  groupNewTopics,
  slugifyTopic,
  buildClassificationPrompt,
  MIN_NEW_ISLAND_SIZE,
} from "@/lib/stashClassifier";

describe("parseClassificationResponse", () => {
  it("parses valid existing-island and new-topic entries", () => {
    const raw = `[
      {"sentenceId": "s1", "existingIslandSlug": "begruessen"},
      {"sentenceId": "s2", "newTopicLabel": "Beim Arzt", "theme": "haushalt-alltag"}
    ]`;
    const result = parseClassificationResponse(raw, ["s1", "s2"]);
    expect(result).toEqual([
      { sentenceId: "s1", existingIslandSlug: "begruessen" },
      { sentenceId: "s2", newTopicLabel: "Beim Arzt", theme: "haushalt-alltag" },
    ]);
  });

  it("ignores entries with unknown sentenceId", () => {
    const raw = `[{"sentenceId": "unknown", "existingIslandSlug": "begruessen"}]`;
    expect(parseClassificationResponse(raw, ["s1"])).toEqual([]);
  });

  it("ignores entries with neither existingIslandSlug nor newTopicLabel", () => {
    const raw = `[{"sentenceId": "s1"}]`;
    expect(parseClassificationResponse(raw, ["s1"])).toEqual([]);
  });

  it("ignores newTopicLabel entries with a missing theme", () => {
    const raw = `[{"sentenceId": "s1", "newTopicLabel": "Beim Arzt"}]`;
    expect(parseClassificationResponse(raw, ["s1"])).toEqual([]);
  });

  it("ignores newTopicLabel entries with an invalid theme slug", () => {
    const raw = `[{"sentenceId": "s1", "newTopicLabel": "Beim Arzt", "theme": "erfundenes-thema"}]`;
    expect(parseClassificationResponse(raw, ["s1"])).toEqual([]);
  });

  it("returns empty array when response has no JSON array", () => {
    expect(parseClassificationResponse("kein json hier", ["s1"])).toEqual([]);
  });

  it("extracts JSON array even when wrapped in markdown fences", () => {
    const raw = "```json\n[{\"sentenceId\": \"s1\", \"existingIslandSlug\": \"begruessen\"}]\n```";
    expect(parseClassificationResponse(raw, ["s1"])).toEqual([
      { sentenceId: "s1", existingIslandSlug: "begruessen" },
    ]);
  });
});

describe("groupNewTopics", () => {
  it("groups sentenceIds by normalized topic label and carries the theme", () => {
    const results = [
      { sentenceId: "s1", newTopicLabel: "Beim Arzt", theme: "haushalt-alltag" },
      { sentenceId: "s2", newTopicLabel: "beim arzt", theme: "haushalt-alltag" },
      { sentenceId: "s3", newTopicLabel: " Beim Arzt ", theme: "haushalt-alltag" },
      { sentenceId: "s4", existingIslandSlug: "begruessen" } as const,
    ];
    const groups = groupNewTopics(results as never, 3);
    expect(groups.size).toBe(1);
    expect(groups.get("Beim Arzt")).toEqual({
      sentenceIds: ["s1", "s2", "s3"],
      theme: "haushalt-alltag",
    });
  });

  it("drops groups below the minimum size", () => {
    const results = [
      { sentenceId: "s1", newTopicLabel: "Hobbys", theme: "hobbys" },
      { sentenceId: "s2", newTopicLabel: "Hobbys", theme: "hobbys" },
    ];
    const groups = groupNewTopics(results as never, MIN_NEW_ISLAND_SIZE);
    expect(groups.size).toBe(0);
  });
});

describe("slugifyTopic", () => {
  it("converts a German topic label to a URL-safe slug", () => {
    expect(slugifyTopic("Beim Arzt")).toBe("beim-arzt");
    expect(slugifyTopic("Über Wörter & Sätze")).toBe("ueber-woerter-und-saetze");
  });
});

describe("buildClassificationPrompt", () => {
  it("returns a system and user prompt containing the candidates, islands, and valid theme slugs", () => {
    const result = buildClassificationPrompt(
      [{ id: "s1", germanOriginal: "Ich habe Kopfschmerzen." }],
      [{ slug: "begruessen", title: "Begrüßen" }]
    );
    expect(result.system).toContain("theme");
    expect(result.system).toContain("grundlagen");
    expect(result.system).toContain("essen-shoppen");
    expect(result.user).toContain("s1: Ich habe Kopfschmerzen.");
    expect(result.user).toContain("begruessen: Begrüßen");
  });
});
```

- [ ] **Step 2: Test ausführen, Fehlschlag bestätigen**

Run: `npm run test -- stashClassifier`
Expected: FAIL — `theme` fehlt in den Ergebnissen, `groupNewTopics` gibt noch `string[]` statt `NewTopicGroup` zurück, `buildClassificationPrompt` enthält noch keine Theme-Liste.

- [ ] **Step 3: `src/lib/stashClassifier.ts` anpassen**

Die komplette Datei `src/lib/stashClassifier.ts` durch diesen Inhalt ersetzen:

```typescript
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
```

- [ ] **Step 4: Test ausführen, Erfolg bestätigen**

Run: `npm run test -- stashClassifier`
Expected: PASS — alle Tests in `tests/stashClassifier.test.ts` grün.

- [ ] **Step 5: Commit**

```bash
git add src/lib/stashClassifier.ts tests/stashClassifier.test.ts
git commit -m "feat: extend classification logic to assign a theme to new islands"
```

---

### Task 4: Theme in der DB-Orchestrierung setzen (`stashClassifierWorker.ts`)

**Files:**
- Modify: `src/lib/stashClassifierWorker.ts`

**Interfaces:**
- Consumes: `NewTopicGroup`-Form von `groupNewTopics` aus Task 3 (`{ sentenceIds: string[]; theme: string }` statt `string[]`)
- Produces: unverändert `runStashClassification(): Promise<void>`

- [ ] **Step 1: Schleife über `groups` anpassen**

In `src/lib/stashClassifierWorker.ts`, den bestehenden Block:

```typescript
  for (const [label, sentenceIds] of groups) {
    const slug = await uniqueSlug(slugifyTopic(label));
    const island = await db.islandPack.create({
      data: { slug, title: label, level, isCustom: true, userId },
    });
    await db.stashSentence.updateMany({
      where: { id: { in: sentenceIds } },
      data: { islandPackId: island.id, classificationStatus: "ASSIGNED" },
    });
  }
```

ersetzen durch:

```typescript
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
```

- [ ] **Step 2: Typecheck ausführen**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler.

- [ ] **Step 3: Commit**

```bash
git add src/lib/stashClassifierWorker.ts
git commit -m "feat: set theme on newly created custom islands"
```

---

### Task 5: Ebene 1 — Themen-Grid (`/islands`)

**Files:**
- Modify: `src/app/(app)/islands/page.tsx`
- Create: `src/components/IslandsThemeGridClient.tsx`

**Interfaces:**
- Consumes: `ISLAND_THEMES` aus `@/lib/islandThemes` (Task 1)
- Produces: nichts weiter (Blattseite), verlinkt zu `/islands/[theme]` (Task 6)

- [ ] **Step 1: `src/app/(app)/islands/page.tsx` ersetzen**

Kompletten Inhalt durch diesen ersetzen:

```typescript
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ISLAND_THEMES } from "@/lib/islandThemes";
import { IslandsThemeGridClient } from "@/components/IslandsThemeGridClient";

export const dynamic = "force-dynamic";

/** Themen-Grid: Einstiegspunkt in die Inseln, gruppiert nach Alltags-Situation. */
export default async function IslandsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const packs = await db.islandPack.findMany({
    where: { OR: [{ isCustom: false }, { userId: user.id }] },
    select: { theme: true },
  });

  const countByTheme = new Map<string, number>();
  let otherCount = 0;
  for (const p of packs) {
    if (p.theme) {
      countByTheme.set(p.theme, (countByTheme.get(p.theme) ?? 0) + 1);
    } else {
      otherCount++;
    }
  }

  const tiles = ISLAND_THEMES.map((t) => ({
    slug: t.slug,
    label: t.label,
    count: countByTheme.get(t.slug) ?? 0,
  })).filter((t) => t.count > 0);

  if (otherCount > 0) {
    tiles.push({ slug: "sonstiges", label: "Sonstiges", count: otherCount });
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">Inseln entdecken</h1>
        <p className="text-body text-ink-600">
          Kuratierte, garantiert lernbare Sätze nach Situation – ideal für den Einstieg.
        </p>
      </div>
      <IslandsThemeGridClient tiles={tiles} />
    </div>
  );
}
```

- [ ] **Step 2: `src/components/IslandsThemeGridClient.tsx` anlegen**

```typescript
"use client";

import Link from "next/link";
import {
  GraduationCap,
  Users,
  Home,
  MessageCircle,
  Palette,
  Briefcase,
  Plane,
  UtensilsCrossed,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const ICON_BY_THEME: Record<string, LucideIcon> = {
  grundlagen: GraduationCap,
  "familie-beziehungen": Users,
  "haushalt-alltag": Home,
  "soziale-interaktionen": MessageCircle,
  hobbys: Palette,
  arbeit: Briefcase,
  "reisen-ausland": Plane,
  "essen-shoppen": UtensilsCrossed,
};

type Tile = { slug: string; label: string; count: number };

export function IslandsThemeGridClient({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {tiles.map((t) => {
        const Icon = ICON_BY_THEME[t.slug] ?? MapPin;
        return (
          <Link key={t.slug} href={`/islands/${t.slug}`}>
            <Card className="flex h-full flex-col items-center gap-2 text-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50" aria-hidden>
                <Icon className="h-5 w-5 text-brand-600" />
              </span>
              <p className="font-semibold text-ink-900">{t.label}</p>
              <p className="text-caption text-ink-500">{t.count} Inseln</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Typecheck ausführen**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(app)/islands/page.tsx" src/components/IslandsThemeGridClient.tsx
git commit -m "feat: replace flat islands list with theme grid (level 1)"
```

---

### Task 6: Ebene 2 — Insel-Liste innerhalb eines Themas (`/islands/[theme]`)

**Files:**
- Create: `src/app/(app)/islands/[theme]/page.tsx`
- Modify: `src/components/IslandsPageClient.tsx`

**Interfaces:**
- Consumes: `themeLabel` aus `@/lib/islandThemes` (Task 1)
- Produces: verlinkt zu `/islands/[theme]/[slug]` (Task 7)

- [ ] **Step 1: `src/app/(app)/islands/[theme]/page.tsx` anlegen**

```typescript
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { themeLabel } from "@/lib/islandThemes";
import { IslandsPageClient } from "@/components/IslandsPageClient";

export const dynamic = "force-dynamic";

/** Insel-Liste innerhalb eines Themas (Ebene 2 der Insel-Navigation). */
export default async function IslandsByThemePage({ params }: { params: { theme: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const where =
    params.theme === "sonstiges"
      ? { theme: null, OR: [{ isCustom: false }, { userId: user.id }] }
      : { theme: params.theme, OR: [{ isCustom: false }, { userId: user.id }] };

  const packs = await db.islandPack.findMany({
    where,
    orderBy: { order: "asc" },
    include: {
      _count: { select: { sentences: true, stashSentences: true } },
      sentences: {
        select: { reviews: { where: { userId: user.id }, select: { id: true } } },
      },
    },
  });

  if (packs.length === 0) notFound();

  const initialPacks = packs.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    level: p.level,
    total: p._count.sentences + p._count.stashSentences,
    joined: p.sentences.filter((s) => s.reviews.length > 0).length,
  }));

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">{themeLabel(params.theme)}</h1>
        <p className="text-body text-ink-600">Tippe eine Insel an, um ihre Sätze zu sehen.</p>
      </div>
      <IslandsPageClient theme={params.theme} initialPacks={initialPacks} />
    </div>
  );
}
```

- [ ] **Step 2: `src/components/IslandsPageClient.tsx` umbauen**

Kompletten Inhalt durch diesen ersetzen (Karten navigieren jetzt zum Insel-Detail statt direkt zu joinen — der Join-Button zieht in Task 7 auf die Detailseite):

```typescript
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

type Pack = { id: string; slug: string; title: string; level: string; total: number; joined: number };

export function IslandsPageClient({ theme, initialPacks }: { theme: string; initialPacks: Pack[] }) {
  return (
    <div className="flex flex-col gap-3">
      {initialPacks.map((p) => {
        const complete = p.total > 0 && p.joined >= p.total;
        return (
          <Link key={p.id} href={`/islands/${theme}/${p.slug}`}>
            <Card>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50" aria-hidden>
                  <MapPin className="h-5 w-5 text-brand-600" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink-900">{p.title}</p>
                  <p className="text-caption text-ink-500">
                    {p.level} · {p.total} Sätze
                  </p>
                </div>
              </div>
              {p.joined > 0 && (
                <div className="mt-3">
                  <ProgressBar
                    value={p.joined}
                    max={p.total}
                    color={complete ? "bg-correct-500" : "bg-brand-500"}
                    label={`${p.title} Fortschritt`}
                  />
                </div>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Typecheck ausführen**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(app)/islands/[theme]/page.tsx" src/components/IslandsPageClient.tsx
git commit -m "feat: add island list within a theme (level 2), cards link to detail"
```

---

### Task 7: Ebene 3 — Insel-Detail mit Satzliste (`/islands/[theme]/[slug]`)

**Files:**
- Create: `src/app/(app)/islands/[theme]/[slug]/page.tsx`
- Create: `src/components/IslandDetailClient.tsx`

**Interfaces:**
- Consumes: `deriveSentenceStars` aus `@/lib/islandStatus` (Task 2), bestehende Route `POST /api/islands/[packId]/join`
- Produces: nichts weiter (Blattseite)

- [ ] **Step 1: `src/app/(app)/islands/[theme]/[slug]/page.tsx` anlegen**

```typescript
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { deriveSentenceStars } from "@/lib/islandStatus";
import { IslandDetailClient } from "@/components/IslandDetailClient";

export const dynamic = "force-dynamic";

/** Insel-Detail (Ebene 3): Satzliste mit Fortschritts-Indikator + Übernehmen-Button. */
export default async function IslandDetailPage({
  params,
}: {
  params: { theme: string; slug: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const pack = await db.islandPack.findUnique({
    where: { slug: params.slug },
    include: {
      sentences: {
        orderBy: { order: "asc" },
        include: { reviews: { where: { userId: user.id }, select: { state: true, stability: true } } },
      },
      // Privacy: bei kuratierten (globalen) Inseln können StashSentences mehrerer
      // Nutzer angehängt sein — immer auf den eingeloggten Nutzer filtern, sonst
      // sähe man fremde eigene Sätze (gleicher Fix wie bei /islands API-Route).
      stashSentences: {
        where: { userId: user.id },
        include: { reviews: { where: { userId: user.id }, select: { state: true, stability: true } } },
      },
    },
  });

  if (!pack || (!pack.isCustom && pack.userId) || (pack.isCustom && pack.userId !== user.id)) {
    notFound();
  }
  if (!pack) notFound();

  const curatedSentences = pack.sentences.map((s) => ({
    id: s.id,
    germanOriginal: s.germanOriginal,
    turkishTranslation: s.turkishTranslation,
    stars: deriveSentenceStars(s.reviews[0] ?? null),
  }));
  const customSentences = pack.stashSentences.map((s) => ({
    id: s.id,
    germanOriginal: s.germanOriginal,
    turkishTranslation: s.turkishTranslation ?? "",
    stars: deriveSentenceStars(s.reviews[0] ?? null),
  }));
  const sentences = [...curatedSentences, ...customSentences];

  const canJoin = !pack.isCustom;
  const joined = pack.sentences.filter((s) => s.reviews.length > 0).length;
  const totalCurated = pack.sentences.length;

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">{pack.title}</h1>
        <p className="text-body text-ink-600">
          {pack.level} · {sentences.length} Sätze
        </p>
      </div>
      <IslandDetailClient
        packId={pack.id}
        sentences={sentences}
        canJoin={canJoin}
        joined={joined}
        totalCurated={totalCurated}
      />
    </div>
  );
}
```

- [ ] **Step 2: `src/components/IslandDetailClient.tsx` anlegen**

```typescript
"use client";

import { useState } from "react";
import { Star, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Sentence = { id: string; germanOriginal: string; turkishTranslation: string; stars: number };

function StarRow({ stars }: { stars: number }) {
  return (
    <span className="flex shrink-0 gap-0.5" aria-label={`${stars} von 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= stars ? "fill-brand-500 text-brand-500" : "text-ink-100"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function IslandDetailClient({
  packId,
  sentences,
  canJoin,
  joined,
  totalCurated,
}: {
  packId: string;
  sentences: Sentence[];
  canJoin: boolean;
  joined: number;
  totalCurated: number;
}) {
  const [joinState, setJoinState] = useState<"idle" | "joining" | "done">(
    canJoin && joined >= totalCurated && totalCurated > 0 ? "done" : "idle"
  );

  async function join() {
    setJoinState("joining");
    try {
      const res = await fetch(`/api/islands/${packId}/join`, { method: "POST" });
      setJoinState(res.ok ? "done" : "idle");
    } catch {
      setJoinState("idle");
    }
  }

  return (
    <div className="space-y-4">
      {canJoin &&
        (joinState === "done" ? (
          <p className="flex items-center justify-center gap-1 text-caption font-semibold text-correct-700">
            <Check aria-hidden className="h-4 w-4" /> Übernommen
          </p>
        ) : (
          <Button full onClick={join} disabled={joinState === "joining"}>
            {joinState === "joining" ? "…" : "Insel üben"}
          </Button>
        ))}
      <div className="flex flex-col gap-2">
        {sentences.map((s) => (
          <Card key={s.id} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium text-ink-900">{s.germanOriginal}</p>
              <p className="truncate text-caption text-ink-500">{s.turkishTranslation}</p>
            </div>
            <StarRow stars={s.stars} />
          </Card>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck ausführen**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler.

- [ ] **Step 4: Isolierte Build-Verifikation**

In einem isolierten Worktree (siehe `superpowers:using-git-worktrees`), `.env` mit eigener `DATABASE_URL` (z.B. `file:./dev-worktree.db`) anlegen, `npx prisma db push && npx prisma db seed` laufen lassen, dann:

Run: `npm run build`
Expected: Build läuft erfolgreich durch, alle drei neuen Routen (`/islands`, `/islands/[theme]`, `/islands/[theme]/[slug]`) werden als Seiten kompiliert (im Build-Output aufgelistet).

Danach `.env`, `prisma/dev-worktree.db`, `prisma/dev-worktree.db-journal` wieder löschen, `git status --short` muss sauber sein.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(app)/islands/[theme]/[slug]/page.tsx" src/components/IslandDetailClient.tsx
git commit -m "feat: add island detail page with sentence list and progress stars"
```

---

## Self-Review Notes

- **Spec-Abdeckung:** Themen-Taxonomie + Backfill (Task 1), Custom-Insel-Themenzuordnung (Task 3+4), 3-Ebenen-Navigation (Task 5, 6, 7), Satzliste mit Status-Ableitung (Task 2, 7) — alle Spec-Abschnitte haben eine Task.
- **Privacy-Konsistenz:** Task 7 wendet denselben Scoping-Fix wie die bisherige `/api/islands`-Route an (`stashSentences` immer auf `userId: user.id` gefiltert, auch bei kuratierten/globalen Inseln) — sonst würde die neue Detailseite die im vorherigen Feature behobene Cross-User-Leak-Lücke wieder öffnen. Zusätzlich prüft die Seite, dass eine `isCustom`-Insel nur vom eigenen Besitzer aufgerufen werden kann (404 sonst).
- **Interpretations-Entscheidung:** Der Spec sagt, Ebene 2 "wiederverwendet das bestehende Card-Layout". Der Übernehmen-Button wandert dabei von Ebene 2 auf Ebene 3 (Insel-Detail), da der Spec für die Detailseite explizit einen "Insel üben"-Button vorsieht und ein Button auf beiden Ebenen redundant wäre. Card-Optik bleibt identisch, nur die Interaktion (Navigation statt Direkt-Join) ändert sich.
- **Custom-Inseln und Join:** Für `isCustom`-Inseln ist kein Join nötig (deren `StashSentence`s haben bereits beim Erstellen ein `ReviewItem` bekommen, siehe `stashWorker.ts`) — die Detailseite blendet den Button für diesen Fall aus (`canJoin = !pack.isCustom`).
- **Platzhalter-Scan:** keine TBD/TODO, aller Code vollständig ausgeschrieben.
- **Typkonsistenz geprüft:** `NewTopicGroup`, `deriveSentenceStars`, `ISLAND_THEME_SLUGS`/`isValidThemeSlug`/`themeLabel` werden in den jeweils definierenden Tasks exportiert und in den konsumierenden Tasks identisch importiert/benutzt.

## Deployment Note

**After deploying this branch, `npx prisma db push` alone is not enough — `npx prisma db seed` must also be re-run.** The new `IslandPack.theme` column is nullable, so `db push` leaves every existing island's `theme = null`. The theme grid (`/islands`) only renders a tile for themes with at least one island (`count > 0`), so without re-seeding, all 6 curated islands lose their theme and the grid collapses to a single "Sonstiges" tile — the 8 real theme categories vanish. Run `npx prisma db push && npx prisma db seed` together on deploy, not `db push` alone.
