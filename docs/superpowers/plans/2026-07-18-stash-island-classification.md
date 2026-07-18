# Stash-Insel-Klassifikation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eigene Sätze (`StashSentence`) werden nachts automatisch per DeepSeek-Klassifikation einer bestehenden oder neuen `IslandPack` zugeordnet — ohne Nutzer-Interaktion, ohne Textänderung.

**Architecture:** Ein neuer `node-cron`-Job läuft im laufenden Next.js-Server-Prozess (registriert über `instrumentation.ts`), holt alle unklassifizierten `READY`-Sätze, gruppiert sie pro Nutzer und schickt sie in einem DeepSeek-Call gegen die Liste vorhandener Inseln. Reine Parsing-/Gruppierungs-Logik liegt in einer separaten, unit-testbaren Datei (`stashClassifier.ts`); die DB-/Netzwerk-Orchestrierung liegt in `stashClassifierWorker.ts` (Muster wie das bestehende `stashWorker.ts`).

**Tech Stack:** Next.js 14 (App Router), Prisma 5 + SQLite, DeepSeek über `askOpenAICompatible` (`src/lib/llm.ts`), `node-cron`, Vitest.

## Global Constraints

- Kein Satztext wird durch die Klassifikation verändert — nur `islandPackId` / `classificationStatus` werden gesetzt.
- Neue Inseln erst ab **mindestens 3 Sätzen** desselben Themas (`MIN_NEW_ISLAND_SIZE = 3`).
- Cron läuft täglich um **03:00** im App-Prozess (kein separater Container).
- Custom-Inseln sind **pro Nutzer** (`IslandPack.userId`), kuratierte Inseln bleiben global (`userId = null`).
- Kein Review-/Bestätigungsschritt für den Nutzer.
- Bestehendes Code-Pattern folgen: DeepSeek-Aufruf via `askOpenAICompatible("https://api.deepseek.com", apiKey, process.env.DEEPSEEK_MODEL ?? "deepseek-reasoner", {...})`, JSON-Antwort per Regex extrahieren (siehe `src/lib/stashWorker.ts`).

---

### Task 1: Schema-Migration

**Files:**
- Modify: `prisma/schema.prisma`

**Interfaces:**
- Produces: Prisma-Client-Felder `StashSentence.islandPackId`, `StashSentence.classificationStatus`, `StashSentence.islandPack`; `IslandPack.isCustom`, `IslandPack.userId`, `IslandPack.user`, `IslandPack.stashSentences`; `User.customIslandPacks`. Alle späteren Tasks nutzen diese Feldnamen exakt so.

- [ ] **Step 1: `StashSentence`-Model erweitern**

In `prisma/schema.prisma` den bestehenden `StashSentence`-Block:

```prisma
model StashSentence {
  id                 String       @id @default(cuid())
  userId             String
  user               User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  germanOriginal     String
  turkishTranslation String?
  status             String       @default("PENDING")
  createdAt          DateTime     @default(now())
  reviews            ReviewItem[]

  @@index([userId, status])
}
```

ersetzen durch:

```prisma
model StashSentence {
  id                    String       @id @default(cuid())
  userId                String
  user                  User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  germanOriginal        String
  turkishTranslation    String?
  status                String       @default("PENDING")
  createdAt             DateTime     @default(now())
  // Insel-Zuordnung durch den nächtlichen Klassifikations-Job (stashClassifierWorker).
  // classificationStatus: "UNASSIGNED" | "ASSIGNED"
  islandPackId          String?
  islandPack            IslandPack?  @relation(fields: [islandPackId], references: [id], onDelete: SetNull)
  classificationStatus  String       @default("UNASSIGNED")
  reviews               ReviewItem[]

  @@index([userId, status])
  @@index([classificationStatus])
}
```

- [ ] **Step 2: `IslandPack`-Model erweitern**

Den bestehenden `IslandPack`-Block:

```prisma
// Kuratierte, vorverifizierte Satz-Bibliothek (Curated Library)
model IslandPack {
  id        String           @id @default(cuid())
  slug      String           @unique
  title     String
  level     String // A1–C1 (CEFR)
  order     Int              @default(0)
  sentences IslandSentence[]
}
```

ersetzen durch:

```prisma
// Kuratierte, vorverifizierte Satz-Bibliothek (Curated Library) + nutzergenerierte Custom-Inseln
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

- [ ] **Step 3: Rückreferenz auf `User` ergänzen**

Im `User`-Model die Zeile `streak         Streak?` unverändert lassen, aber die Relations-Liste um eine Zeile ergänzen. Bestehender Block:

```prisma
  stashSentences StashSentence[]
  reviews        ReviewItem[]
  xpEvents       XpEvent[]
  achievements   UserAchievement[]
  streak         Streak?
  transcripts    Transcript[]
```

ersetzen durch:

```prisma
  stashSentences    StashSentence[]
  reviews           ReviewItem[]
  xpEvents          XpEvent[]
  achievements      UserAchievement[]
  streak            Streak?
  transcripts       Transcript[]
  customIslandPacks IslandPack[]
```

- [ ] **Step 4: Schema validieren**

Run: `cd "/Users/lukeschmitz/Claude/Projects/Sprachenlern App/bubbel" && npx prisma validate`
Expected: `The schema at prisma/schema.prisma is valid 🚀`

- [ ] **Step 5: Migration anwenden + Client generieren**

Run: `npx prisma db push && npx prisma generate`
Expected: `Your database is now in sync with your Prisma schema.` gefolgt von erfolgreichem `prisma generate`-Output (kein Fehler).

- [ ] **Step 6: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat(db): add island classification fields to StashSentence/IslandPack"
```

---

### Task 2: Reine Klassifikations-Logik (`stashClassifier.ts`)

**Files:**
- Create: `src/lib/stashClassifier.ts`
- Test: `tests/stashClassifier.test.ts`

**Interfaces:**
- Consumes: nichts (reine Funktionen, kein DB-/Netzwerkzugriff)
- Produces (für Task 3):
  - `MIN_NEW_ISLAND_SIZE: number` (Wert `3`)
  - `type ClassificationCandidate = { id: string; germanOriginal: string }`
  - `type IslandOption = { slug: string; title: string }`
  - `type ClassificationResult = { sentenceId: string; existingIslandSlug: string } | { sentenceId: string; newTopicLabel: string }`
  - `buildClassificationPrompt(candidates: ClassificationCandidate[], islands: IslandOption[]): { system: string; user: string }`
  - `parseClassificationResponse(raw: string, validSentenceIds: string[]): ClassificationResult[]`
  - `groupNewTopics(results: ClassificationResult[], minGroupSize: number): Map<string, string[]>` (Key = normalisiertes Topic-Label, Value = `sentenceId[]`)
  - `slugifyTopic(label: string): string`

- [ ] **Step 1: Test für `parseClassificationResponse` schreiben**

Datei `tests/stashClassifier.test.ts` anlegen:

```typescript
import { describe, expect, it } from "vitest";
import {
  parseClassificationResponse,
  groupNewTopics,
  slugifyTopic,
  MIN_NEW_ISLAND_SIZE,
} from "@/lib/stashClassifier";

describe("parseClassificationResponse", () => {
  it("parses valid existing-island and new-topic entries", () => {
    const raw = `[
      {"sentenceId": "s1", "existingIslandSlug": "begruessen"},
      {"sentenceId": "s2", "newTopicLabel": "Beim Arzt"}
    ]`;
    const result = parseClassificationResponse(raw, ["s1", "s2"]);
    expect(result).toEqual([
      { sentenceId: "s1", existingIslandSlug: "begruessen" },
      { sentenceId: "s2", newTopicLabel: "Beim Arzt" },
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
  it("groups sentenceIds by normalized topic label", () => {
    const results = [
      { sentenceId: "s1", newTopicLabel: "Beim Arzt" },
      { sentenceId: "s2", newTopicLabel: "beim arzt" },
      { sentenceId: "s3", newTopicLabel: " Beim Arzt " },
      { sentenceId: "s4", existingIslandSlug: "begruessen" } as const,
    ];
    const groups = groupNewTopics(results as never, 3);
    expect(groups.size).toBe(1);
    expect(groups.get("Beim Arzt")).toEqual(["s1", "s2", "s3"]);
  });

  it("drops groups below the minimum size", () => {
    const results = [
      { sentenceId: "s1", newTopicLabel: "Hobbys" },
      { sentenceId: "s2", newTopicLabel: "Hobbys" },
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
```

- [ ] **Step 2: Test ausführen, Fehlschlag bestätigen**

Run: `npm run test -- stashClassifier`
Expected: FAIL — `Cannot find module '@/lib/stashClassifier'`

- [ ] **Step 3: `src/lib/stashClassifier.ts` implementieren**

```typescript
export const MIN_NEW_ISLAND_SIZE = 3;

export type ClassificationCandidate = { id: string; germanOriginal: string };
export type IslandOption = { slug: string; title: string };

export type ClassificationResult =
  | { sentenceId: string; existingIslandSlug: string }
  | { sentenceId: string; newTopicLabel: string };

export function buildClassificationPrompt(
  candidates: ClassificationCandidate[],
  islands: IslandOption[]
): { system: string; user: string } {
  const system = `Du ordnest deutsche Lernsätze thematisch Sprachlern-Inseln zu.
Aufgabe: Für jeden gegebenen Satz entscheide, ob er thematisch zu einer der bestehenden Inseln passt,
oder ob er zu keiner passt und stattdessen ein neues Thema braucht.

Regeln (STRIKT, keine Ausnahmen):
- Passt der Satz klar zu einer bestehenden Insel: gib deren exakten "slug" als "existingIslandSlug" zurück.
- Passt der Satz zu keiner bestehenden Insel: erfinde ein kurzes, prägnantes deutsches Themen-Label
  (2-4 Wörter, z.B. "Beim Arzt", "Wetter") als "newTopicLabel". Nutze für inhaltlich gleiche Sätze
  IMMER exakt dasselbe Label (Wortlaut identisch), damit sie später gruppiert werden können.
- Verändere den Satztext nicht, gib ihn nicht zurück.
- Antworte AUSSCHLIESSLICH mit einem JSON-Array, ein Objekt pro Satz, exakt in dieser Form:
  [{"sentenceId": "...", "existingIslandSlug": "..."}] ODER [{"sentenceId": "...", "newTopicLabel": "..."}]
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
      results.push({ sentenceId, newTopicLabel: newTopicLabel.trim() });
    }
  }

  return results;
}

export function groupNewTopics(
  results: ClassificationResult[],
  minGroupSize: number
): Map<string, string[]> {
  const byLabel = new Map<string, string[]>();

  for (const result of results) {
    if (!("newTopicLabel" in result)) continue;
    const normalized = result.newTopicLabel.trim();
    const key = Array.from(byLabel.keys()).find(
      (existing) => existing.toLowerCase() === normalized.toLowerCase()
    );
    const targetKey = key ?? normalized;
    const list = byLabel.get(targetKey) ?? [];
    list.push(result.sentenceId);
    byLabel.set(targetKey, list);
  }

  const grouped = new Map<string, string[]>();
  for (const [label, sentenceIds] of byLabel) {
    if (sentenceIds.length >= minGroupSize) grouped.set(label, sentenceIds);
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
git commit -m "feat: add pure stash classification parsing/grouping logic"
```

---

### Task 3: DB-Orchestrierung (`stashClassifierWorker.ts`)

**Files:**
- Create: `src/lib/stashClassifierWorker.ts`

**Interfaces:**
- Consumes:
  - aus Task 1: `db.stashSentence`, `db.islandPack`, `db.user` (Prisma-Client-Felder wie definiert)
  - aus Task 2: `MIN_NEW_ISLAND_SIZE`, `buildClassificationPrompt`, `parseClassificationResponse`, `groupNewTopics`, `slugifyTopic`
  - `askOpenAICompatible` aus `src/lib/llm.ts` (Signatur: `(baseUrl: string, apiKey: string, model: string, options: { system: string; messages: {role:string;content:string}[]; temperature?: number; maxTokens?: number }) => Promise<string>`)
- Produces (für Task 4): `runStashClassification(): Promise<void>`

- [ ] **Step 1: `src/lib/stashClassifierWorker.ts` implementieren**

```typescript
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
  const userIdBySentence = new Map<string, string>();
  for (const c of candidates) {
    const list = byUser.get(c.userId) ?? [];
    list.push({ id: c.id, germanOriginal: c.germanOriginal });
    byUser.set(c.userId, list);
    userIdBySentence.set(c.id, c.userId);
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
```

- [ ] **Step 2: Typecheck ausführen**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler in `src/lib/stashClassifierWorker.ts` (bestehende, unveränderte Fehler im Projekt — falls vorhanden — bleiben unberührt und sind hier nicht relevant).

- [ ] **Step 3: Manuelle Verifikation (kein automatisierter DB-Test — Projekt hat keine Prisma-Integrationstests, gleiches Muster wie `stashWorker.ts`)**

Run: `node -e "require('ts-node/register'); require('./src/lib/stashClassifierWorker').runStashClassification().then(() => console.log('ok')).catch((e) => { console.error(e); process.exit(1); })"`

Falls `ts-node` nicht installiert ist, stattdessen kurz per `npx tsx -e "import('./src/lib/stashClassifierWorker.ts').then(m => m.runStashClassification()).then(() => console.log('ok'))"` prüfen, dass der Import fehlerfrei lädt und bei leerer Kandidaten-Liste sofort `ok` ausgibt (kein DEEPSEEK_API_KEY nötig, wenn keine PENDING/READY+UNASSIGNED Sätze in der lokalen DB liegen).
Expected: `ok` ohne Exception.

- [ ] **Step 4: Commit**

```bash
git add src/lib/stashClassifierWorker.ts
git commit -m "feat: add DB orchestration for nightly stash-island classification"
```

---

### Task 4: Cron-Scheduling (`instrumentation.ts`)

**Files:**
- Create: `instrumentation.ts` (Projekt-Root, neben `next.config.js`)
- Modify: `package.json` (Dependency `node-cron` + `@types/node-cron`)

**Interfaces:**
- Consumes: `runStashClassification` aus Task 3 (`src/lib/stashClassifierWorker.ts`)
- Produces: nichts (Endpunkt der Kette — registriert den Cron-Job beim Server-Start)

- [ ] **Step 1: Dependencies installieren**

Run: `cd "/Users/lukeschmitz/Claude/Projects/Sprachenlern App/bubbel" && npm install node-cron && npm install -D @types/node-cron`
Expected: `package.json`/`package-lock.json` enthalten `node-cron` (dependencies) und `@types/node-cron` (devDependencies), Install ohne Fehler.

- [ ] **Step 2: `instrumentation.ts` anlegen**

```typescript
// Next.js Instrumentation Hook: läuft einmal beim Server-Start (App-Prozess),
// nicht im Edge-Runtime. Registriert den nächtlichen Stash-Insel-Klassifikations-Job.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const cron = await import("node-cron");
  const { runStashClassification } = await import("@/lib/stashClassifierWorker");

  // Täglich um 03:00 Uhr Server-Zeit.
  cron.schedule("0 3 * * *", () => {
    runStashClassification().catch((err) =>
      console.error("[stashClassifierWorker] Cron-Lauf fehlgeschlagen:", err)
    );
  });

  console.log("[instrumentation] stashClassifierWorker Cron registriert (täglich 03:00).");
}
```

- [ ] **Step 3: Build-Verifikation**

Run: `npm run build`
Expected: Build läuft erfolgreich durch (Next.js erkennt `instrumentation.ts` automatisch, keine zusätzliche Konfiguration in `next.config.js` nötig ab Next 14 stable).

- [ ] **Step 4: Start-Verifikation (Registrierung sichtbar)**

Run: `npm run start &` (danach kurz warten, dann Prozess beenden) — oder alternativ `npm run dev` kurz starten und Server-Log prüfen.
Expected: Log-Zeile `[instrumentation] stashClassifierWorker Cron registriert (täglich 03:00).` erscheint beim Serverstart.

- [ ] **Step 5: Commit**

```bash
git add instrumentation.ts package.json package-lock.json
git commit -m "feat: schedule nightly stash-island classification via node-cron"
```

---

## Self-Review Notes

- **Spec-Abdeckung:** Datenmodell (Task 1), Cron-/Klassifikations-Logik (Task 2+3), Cron-Trigger node-cron im App-Prozess (Task 4), UI (kein Task nötig — bestehende Insel-Listing-Views lesen bereits `IslandPack`/`StashSentence`; da keine Badge-/Sonderdarstellung gewünscht ist und "Meine Sammlungen" laut Screenshot bereits eine leere Ansicht für `isCustom`-Inseln vorsieht, ist hier zu prüfen, ob die bestehende Sammlungen-Query schon `isCustom`-Inseln lädt — **das ist kein Bestandteil dieses Backend-Plans**, sondern ein separater Frontend-Check, falls die Sammlungen-Seite aktuell noch keine Daten lädt.)
- **Ergänzung gegenüber Spec:** `IslandPack.userId` wurde in Task 1 ergänzt (im Spec nicht explizit genannt) — technisch notwendig, damit Custom-Inseln pro Nutzer isoliert sind (Multi-User-App, `Follows`-Model existiert bereits). Ohne dieses Feld würden Custom-Inseln verschiedener Nutzer nicht unterscheidbar sein.
- **Platzhalter-Scan:** keine TBD/TODO, alle Schritte enthalten vollständigen Code.
- **Typkonsistenz geprüft:** `ClassificationResult`, `ClassificationCandidate`, `IslandOption` werden in Task 2 definiert und in Task 3 identisch importiert; `MIN_NEW_ISLAND_SIZE` und `runStashClassification` Namen stimmen zwischen den Tasks überein.
