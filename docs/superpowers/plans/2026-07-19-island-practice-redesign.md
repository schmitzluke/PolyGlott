# Insel-Übungs-Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Insel-Detail wird ein Sätze/Erzählungen-Auswahlbildschirm; beide Content-Typen werden über die bestehende FSRS-Karteikarten-Engine geübt, aber insel- und content-typ-gescoped statt nur global gemischt.

**Architecture:** Neue Tabellen `IslandStory`/`IslandStorySentence` (leer, Struktur ohne Content in diesem Plan). Die Karteikarten-UI aus `/review/page.tsx` wird in eine wiederverwendbare `ReviewSessionClient`-Komponente extrahiert, parametrisiert über eine API-URL. `/api/reviews` (GET) bekommt optionale Scope-Filter (`islandPackId`, `contentType`, `storyId`), deren Prisma-`where`-Fragment eine reine, testbare Funktion in `src/lib/reviewScope.ts` baut. Neue Routen unter `/islands/[theme]/[slug]/practice` und `/islands/[theme]/[slug]/stories(/[storyId]/practice)` nutzen dieselbe Client-Komponente mit unterschiedlichen Scope-Parametern.

**Tech Stack:** Next.js 14 (App Router, Server + Client Components), Prisma 5 + SQLite, bestehende FSRS-Bibliothek (`src/lib/fsrs.ts`, `ts-fsrs`), Vitest.

## Global Constraints

- `IslandStory`/`IslandStorySentence` sind neue, von `IslandSentence` getrennte Tabellen — kein Content wird in diesem Plan erstellt, leere Listen sind valide.
- `ReviewItem` bekommt ein drittes optionales Feld `islandStorySentenceId` (analog zu `stashSentenceId`/`islandSentenceId`), inkl. `@@unique([userId, islandStorySentenceId])`.
- Globales `/review` bleibt unverändert im Verhalten bestehen (insel-übergreifend, alles Fällige) — die neue Scope-Filterung ist rein additiv (keine Filter-Query-Parameter = altes Verhalten).
- Insel-eigene Sessions nutzen dieselbe FSRS-Grading-Engine (Nochmal/Schwer/Gut/Einfach über `POST /api/reviews/[id]`, unverändert) — kein neues Bewertungssystem.
- Bestehendes Code-Pattern folgen: Server-Components fetchen über `db`, Auth via `getCurrentUser()`/`redirect("/login")`, Privacy-Scoping-Check für `isCustom`-Inseln (`(!pack.isCustom && pack.userId) || (pack.isCustom && pack.userId !== user.id)` → `notFound()`) exakt wie in der bestehenden Insel-Detail-Seite.
- Der "Insel üben"-Button (`POST /api/islands/[packId]/join`) erstellt zusätzlich zu `IslandSentence`-ReviewItems auch `IslandStorySentence`-ReviewItems, idempotent wie bisher; bleibt für `isCustom`-Inseln ausgeblendet.

---

### Task 1: Schema — Erzählungen-Tabellen + ReviewItem-Erweiterung

**Files:**
- Modify: `prisma/schema.prisma`

**Interfaces:**
- Produces: Prisma-Client-Modelle `IslandStory` (Felder `id`, `packId`, `title`, `order`, Relation `sentences`), `IslandStorySentence` (Felder `id`, `storyId`, `germanOriginal`, `turkishTranslation`, `order`, Relation `reviews`); `IslandPack.stories: IslandStory[]`; `ReviewItem.islandStorySentenceId: String?` + Relation `islandStorySentence`. Spätere Tasks (3, 6, 8) nutzen diese Feldnamen exakt so.

- [ ] **Step 1: `IslandPack` um `stories`-Relation ergänzen**

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
  // Feste Taxonomie, Slugs aus src/lib/islandThemes.ts (ISLAND_THEME_SLUGS). Nullable:
  // additive Migration, UI zeigt themenlose Inseln unter einer Sonstiges-Kachel.
  theme          String?
  sentences      IslandSentence[]
  stashSentences StashSentence[]

  @@index([theme])
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
  // Zusammenhängende Mini-Geschichten (Content wird separat/später erstellt, leer ist valide).
  stories        IslandStory[]

  @@index([theme])
}
```

- [ ] **Step 2: `IslandStory`/`IslandStorySentence`-Modelle ergänzen**

Direkt nach dem `IslandSentence`-Modell (vor dem `ReviewItem`-Modell-Kommentar) in `prisma/schema.prisma` einfügen:

```prisma
// Zusammenhängende Mini-Geschichte (mehrere Sätze in fester Reihenfolge), strukturell
// getrennt von einzelnen IslandSentence-Zeilen. Content wird nicht hier erzeugt.
model IslandStory {
  id        String                @id @default(cuid())
  packId    String
  pack      IslandPack            @relation(fields: [packId], references: [id], onDelete: Cascade)
  title     String
  order     Int
  sentences IslandStorySentence[]
}

model IslandStorySentence {
  id                 String       @id @default(cuid())
  storyId            String
  story              IslandStory  @relation(fields: [storyId], references: [id], onDelete: Cascade)
  germanOriginal     String
  turkishTranslation String
  order              Int
  reviews            ReviewItem[]
}
```

- [ ] **Step 3: `ReviewItem` um drittes Satz-Feld erweitern**

Den bestehenden `ReviewItem`-Block:

```prisma
model ReviewItem {
  id               String          @id @default(cuid())
  userId           String
  user             User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  stashSentenceId  String?
  stashSentence    StashSentence?  @relation(fields: [stashSentenceId], references: [id], onDelete: Cascade)
  islandSentenceId String?
  islandSentence   IslandSentence? @relation(fields: [islandSentenceId], references: [id], onDelete: Cascade)
  // FSRS-State (DSR-Modell: Difficulty, Stability, Retrievability)
  stability        Float           @default(0)
  difficulty       Float           @default(0)
  elapsed_days     Int             @default(0)
  scheduled_days   Int             @default(0)
  reps             Int             @default(0)
  lapses           Int             @default(0)
  state            Int             @default(0) // 0=New, 1=Learning, 2=Review, 3=Relearning
  last_review      DateTime?
  dueAt            DateTime        @default(now())

  @@unique([userId, stashSentenceId])
```

ersetzen durch:

```prisma
model ReviewItem {
  id                    String               @id @default(cuid())
  userId                String
  user                  User                 @relation(fields: [userId], references: [id], onDelete: Cascade)
  stashSentenceId       String?
  stashSentence         StashSentence?       @relation(fields: [stashSentenceId], references: [id], onDelete: Cascade)
  islandSentenceId      String?
  islandSentence        IslandSentence?      @relation(fields: [islandSentenceId], references: [id], onDelete: Cascade)
  islandStorySentenceId String?
  islandStorySentence   IslandStorySentence? @relation(fields: [islandStorySentenceId], references: [id], onDelete: Cascade)
  // FSRS-State (DSR-Modell: Difficulty, Stability, Retrievability)
  stability             Float                @default(0)
  difficulty            Float                @default(0)
  elapsed_days          Int                  @default(0)
  scheduled_days        Int                  @default(0)
  reps                  Int                  @default(0)
  lapses                Int                  @default(0)
  state                 Int                  @default(0) // 0=New, 1=Learning, 2=Review, 3=Relearning
  last_review           DateTime?
  dueAt                 DateTime             @default(now())

  @@unique([userId, stashSentenceId])
  @@unique([userId, islandStorySentenceId])
```

(Die nachfolgende Zeile `@@unique([userId, islandSentenceId])` und der `@@index([userId, dueAt])`-Block bleiben unverändert stehen — nur die beiden gezeigten Ausschnitte werden ersetzt.)

- [ ] **Step 4: Schema validieren**

Run: `cd "/Users/lukeschmitz/Claude/Projects/Sprachenlern App/bubbel" && npx prisma validate`
Expected: `The schema at prisma/schema.prisma is valid 🚀`

- [ ] **Step 5: Migration anwenden + Client generieren**

In einem isolierten Worktree (siehe `superpowers:using-git-worktrees`), `.env` mit eigener `DATABASE_URL` (z.B. `file:./dev-worktree.db`) anlegen:

```bash
cp "/Users/lukeschmitz/Claude/Projects/Sprachenlern App/bubbel/.env" .env
sed -i.bak 's|DATABASE_URL="file:./dev.db"|DATABASE_URL="file:./dev-worktree.db"|' .env && rm .env.bak
npx prisma db push && npx prisma generate
```

Expected: `Your database is now in sync with your Prisma schema.` gefolgt von erfolgreichem `prisma generate`-Output.

Danach `.env`, `prisma/dev-worktree.db`, `prisma/dev-worktree.db-journal` wieder löschen, `git status --short` muss sauber sein.

- [ ] **Step 6: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat(db): add IslandStory/IslandStorySentence tables and ReviewItem field"
```

---

### Task 2: Reine Scope-Logik (`reviewScope.ts`)

**Files:**
- Create: `src/lib/reviewScope.ts`
- Test: `tests/reviewScope.test.ts`

**Interfaces:**
- Consumes: nichts (reine Funktion, kein DB-/Netzwerkzugriff)
- Produces (für Task 3): `interface ReviewScopeFilters { islandPackId?: string; contentType?: "sentences" | "stories"; storyId?: string }`, `buildReviewScopeWhere(filters: ReviewScopeFilters): { OR: Record<string, unknown>[] } | undefined`

- [ ] **Step 1: Test schreiben**

Datei `tests/reviewScope.test.ts` anlegen:

```typescript
import { describe, expect, it } from "vitest";
import { buildReviewScopeWhere } from "@/lib/reviewScope";

describe("buildReviewScopeWhere", () => {
  it("returns undefined when no filters are given (global scope, unchanged behavior)", () => {
    expect(buildReviewScopeWhere({})).toBeUndefined();
  });

  it("scopes to sentences of one island (curated + custom stash sentences)", () => {
    expect(buildReviewScopeWhere({ islandPackId: "pack1", contentType: "sentences" })).toEqual({
      OR: [
        { islandSentence: { packId: "pack1" } },
        { stashSentence: { islandPackId: "pack1" } },
      ],
    });
  });

  it("scopes to all stories of one island when no storyId is given", () => {
    expect(buildReviewScopeWhere({ islandPackId: "pack1", contentType: "stories" })).toEqual({
      OR: [{ islandStorySentence: { story: { packId: "pack1" } } }],
    });
  });

  it("scopes to a single story regardless of islandPackId when storyId is given", () => {
    expect(buildReviewScopeWhere({ islandPackId: "pack1", contentType: "stories", storyId: "story1" })).toEqual({
      OR: [{ islandStorySentence: { storyId: "story1" } }],
    });
    expect(buildReviewScopeWhere({ contentType: "stories", storyId: "story1" })).toEqual({
      OR: [{ islandStorySentence: { storyId: "story1" } }],
    });
  });

  it("combines sentences and stories when islandPackId is given without contentType", () => {
    expect(buildReviewScopeWhere({ islandPackId: "pack1" })).toEqual({
      OR: [
        { islandSentence: { packId: "pack1" } },
        { stashSentence: { islandPackId: "pack1" } },
        { islandStorySentence: { story: { packId: "pack1" } } },
      ],
    });
  });

  it("returns undefined when contentType is given without islandPackId or storyId", () => {
    expect(buildReviewScopeWhere({ contentType: "sentences" })).toBeUndefined();
  });
});
```

- [ ] **Step 2: Test ausführen, Fehlschlag bestätigen**

Run: `npm run test -- reviewScope`
Expected: FAIL — `Cannot find module '@/lib/reviewScope'`

- [ ] **Step 3: `src/lib/reviewScope.ts` implementieren**

```typescript
export interface ReviewScopeFilters {
  islandPackId?: string;
  contentType?: "sentences" | "stories";
  storyId?: string;
}

/**
 * Baut das Prisma-`where`-OR-Fragment, um ReviewItems auf eine Insel und/oder
 * einen Content-Typ einzuschränken. Kein Filter → undefined (globales, unverändertes
 * Verhalten von /api/reviews). Wird per `AND: [{ OR: dueOr(now) }, scopeWhere]` bzw.
 * direkt gespreadet in die jeweilige Query eingebunden (siehe Task 3).
 */
export function buildReviewScopeWhere(
  filters: ReviewScopeFilters
): { OR: Record<string, unknown>[] } | undefined {
  const { islandPackId, contentType, storyId } = filters;

  if (contentType === "stories" && storyId) {
    return { OR: [{ islandStorySentence: { storyId } }] };
  }

  if (!islandPackId) return undefined;

  if (contentType === "sentences") {
    return {
      OR: [
        { islandSentence: { packId: islandPackId } },
        { stashSentence: { islandPackId } },
      ],
    };
  }

  if (contentType === "stories") {
    return { OR: [{ islandStorySentence: { story: { packId: islandPackId } } }] };
  }

  return {
    OR: [
      { islandSentence: { packId: islandPackId } },
      { stashSentence: { islandPackId } },
      { islandStorySentence: { story: { packId: islandPackId } } },
    ],
  };
}
```

- [ ] **Step 4: Test ausführen, Erfolg bestätigen**

Run: `npm run test -- reviewScope`
Expected: PASS — alle 6 Tests grün.

- [ ] **Step 5: Commit**

```bash
git add src/lib/reviewScope.ts tests/reviewScope.test.ts
git commit -m "feat: add pure review-scope where-clause builder"
```

---

### Task 3: Scope-Filter in `/api/reviews` verdrahten

**Files:**
- Modify: `src/app/api/reviews/route.ts`

**Interfaces:**
- Consumes: `buildReviewScopeWhere`, `ReviewScopeFilters` aus `@/lib/reviewScope` (Task 2)
- Produces: `GET /api/reviews` akzeptiert zusätzlich optionale Query-Parameter `islandPackId`, `contentType` (`sentences`|`stories`), `storyId`. Ohne diese Parameter unverändertes Verhalten.

- [ ] **Step 1: `src/app/api/reviews/route.ts` anpassen**

Kompletten Inhalt durch diesen ersetzen:

```typescript
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { dbFieldsToCard, previewCard } from "@/lib/fsrs";
import { shuffle } from "@/lib/shuffle";
import { buildReviewScopeWhere } from "@/lib/reviewScope";

// Review-Daten ändern sich mit jeder Bewertung → nie cachen (Browser/Proxy).
export const dynamic = "force-dynamic";

const ROUND_SIZE = 20;
const NEW_PER_ROUND = 10;
// Max. neue Karten pro Tag (Anki-Praxis ~20): schützt vor Review-Lawinen
// 1–3 Tage später – Konsolidierung geht vor Akquisition.
const NEW_PER_DAY = 20;

/**
 * Karten für eine Lernrunde – nach FSRS-Zeitplan:
 * 1. Fällige Karten zuerst. Review-Karten (state 2) TAGESGENAU (irgendwann heute
 *    fällig = heute dran, wie Anki), Learning/Relearning (1/3) minutengenau –
 *    ihre kurzen Steps (1m/10m) dürfen nicht schon Stunden früher hochkommen.
 * 2. Neue Karten (state = 0) – noch nie bewertet, beigemischt bis
 *    NEW_PER_ROUND pro Runde und NEW_PER_DAY pro Tag.
 *
 * Bewusst KEINE „Festigungs"-Karten mehr: noch nicht fällige Karten zu zeigen
 * untergräbt Spaced Repetition. Ist nichts fällig → nichts zu tun.
 *
 * Optional gescoped auf eine Insel/einen Content-Typ (islandPackId/contentType/storyId
 * Query-Parameter) – ohne diese Parameter unverändert global über alle Karten.
 */

/** Fällig-Kriterium: Review tagesgenau, Learning/Relearning minutengenau. */
function dueOr(now: Date) {
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);
  return [
    { state: 2, dueAt: { lte: endOfToday } },
    { state: { in: [1, 3] }, dueAt: { lte: now } },
  ];
}

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const url = new URL(req.url);
  const exclude = (url.searchParams.get("exclude") ?? "").split(",").filter(Boolean);
  const islandPackId = url.searchParams.get("islandPackId") ?? undefined;
  const contentTypeParam = url.searchParams.get("contentType");
  const contentType =
    contentTypeParam === "sentences" || contentTypeParam === "stories" ? contentTypeParam : undefined;
  const storyId = url.searchParams.get("storyId") ?? undefined;
  const scopeWhere = buildReviewScopeWhere({ islandPackId, contentType, storyId });

  const now = new Date();

  // 1. Fällige Karten (heute fällige Review + minutengenau fällige Learning/Relearning).
  //    Auswahl priorisiert die am längsten überfälligen (orderBy dueAt), die
  //    Präsentationsreihenfolge wird danach gemischt (Anki-Praxis) – sonst lernt
  //    man die Kartenreihenfolge statt des Inhalts auswendig.
  const dueOrdered = await db.reviewItem.findMany({
    where: {
      userId: user.id,
      id: { notIn: exclude },
      AND: [{ OR: dueOr(now) }, ...(scopeWhere ? [scopeWhere] : [])],
    },
    include: { stashSentence: true, islandSentence: true, islandStorySentence: true },
    orderBy: { dueAt: "asc" },
    take: ROUND_SIZE,
  });
  const due = shuffle(dueOrdered);

  const remaining = ROUND_SIZE - due.length;

  // 2. Neue Karten (state = 0, noch nie bewertet) – gedeckelt pro Runde UND pro Tag.
  //    Tages-Proxy: heute erstmals bewertete Karten ≈ state != 0, last_review heute,
  //    reps <= 2 (die Same-Day-Learning-Steps 1m/10m treiben reps auf 2; Karten von
  //    gestern mit Review heute zählen selten mit → Cap ist leicht konservativ, ok).
  let newCards: typeof due = [];
  if (remaining > 0) {
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const newToday = await db.reviewItem.count({
      where: {
        userId: user.id,
        state: { not: 0 },
        reps: { lte: 2 },
        last_review: { gte: todayStart },
      },
    });
    const newBudget = Math.min(remaining, NEW_PER_ROUND, NEW_PER_DAY - newToday);
    if (newBudget > 0) {
      newCards = await db.reviewItem.findMany({
        where: { userId: user.id, state: 0, id: { notIn: exclude }, ...(scopeWhere ?? {}) },
        include: { stashSentence: true, islandSentence: true, islandStorySentence: true },
        orderBy: { dueAt: "asc" },
        take: newBudget,
      });
    }
  }

  const [dueCount, totalCount] = await Promise.all([
    // Fällig-Zähler = heute fällige Karten (Review tagesgenau, Learning/Relearning
    // minutengenau) + neue Karten (state 0, sofort fällig). Deckt sich mit der Runde.
    db.reviewItem.count({
      where: {
        userId: user.id,
        AND: [
          { OR: [...dueOr(now), { state: 0, dueAt: { lte: now } }] },
          ...(scopeWhere ? [scopeWhere] : []),
        ],
      },
    }),
    db.reviewItem.count({ where: { userId: user.id, ...(scopeWhere ?? {}) } }),
  ]);

  const toCard = (item: (typeof due)[number], cardType: "due" | "new") => {
    // Preview-Zeiten berechnen für den aktuellen Zustand
    const fsrsCard = dbFieldsToCard({
      stability: item.stability,
      difficulty: item.difficulty,
      elapsed_days: item.elapsed_days,
      scheduled_days: item.scheduled_days,
      reps: item.reps,
      lapses: item.lapses,
      state: item.state,
      last_review: item.last_review,
      dueAt: item.dueAt,
    });
    const preview = previewCard(fsrsCard, now);
    const sentence = item.stashSentence ?? item.islandSentence ?? item.islandStorySentence;

    return {
      id: item.id,
      source: sentence?.germanOriginal ?? "",
      target: sentence?.turkishTranslation ?? "",
      reps: item.reps,
      state: item.state,
      due: cardType === "due",
      isNew: cardType === "new",
      // Preview-Labels für die UI-Buttons
      preview: {
        again: preview[1]?.intervalLabel ?? "",
        hard: preview[2]?.intervalLabel ?? "",
        good: preview[3]?.intervalLabel ?? "",
        easy: preview[4]?.intervalLabel ?? "",
      },
    };
  };

  return NextResponse.json(
    {
      items: [
        ...due.map((i) => toCard(i, "due")),
        ...newCards.map((i) => toCard(i, "new")),
      ],
      dueCount,
      totalCount,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
```

- [ ] **Step 2: Typecheck ausführen**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler.

- [ ] **Step 3: Manuelle Verifikation (kein automatisierter Test — Projekt hat keine API-Route-Integrationstests, gleiches Muster wie `stashClassifierWorker.ts`)**

In einem isolierten Worktree mit eigener `.env`/DB (siehe Task 1 Step 5), `npm run build` ausführen und bestätigen, dass der Build ohne Fehler durchläuft (der Build-Prozess kompiliert die Route und prüft Typen gegen den generierten Prisma-Client — deckt Tippfehler in den neuen `where`-Kombinationen ab, die `tsc --noEmit` allein evtl. nicht erwischt, da Prisma-Query-Typen erst beim vollen Next-Build-Typecheck geprüft werden).

Danach `.env`, `prisma/dev-worktree.db`, `prisma/dev-worktree.db-journal` wieder löschen, `git status --short` muss sauber sein.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/reviews/route.ts
git commit -m "feat: add optional island/content-type scope filters to review queue"
```

---

### Task 4: Karteikarten-Engine extrahieren (`ReviewSessionClient`)

**Files:**
- Create: `src/components/ReviewSessionClient.tsx`
- Modify: `src/app/(app)/review/page.tsx`

**Interfaces:**
- Produces: `ReviewSessionClient({ apiUrl, title, emptyState }: { apiUrl: string; title: string; emptyState: EmptyStateConfig })`, `interface EmptyStateConfig { icon: LucideIcon; heading: string; body: string; primaryHref: string; primaryLabel: string; secondaryHref?: string; secondaryLabel?: string }`. Spätere Tasks (5, 6) importieren `ReviewSessionClient` und `EmptyStateConfig` aus `@/components/ReviewSessionClient`.

- [ ] **Step 1: `src/components/ReviewSessionClient.tsx` anlegen**

```typescript
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, PartyPopper, RotateCcw, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AudioButton } from "@/components/ui/AudioButton";

interface ReviewCard {
  id: string;
  source: string;
  target: string;
  exampleSource?: string | null;
  exampleTarget?: string | null;
  reps: number;
  state: number; // 0=New, 1=Learning, 2=Review, 3=Relearning
  due: boolean;
  isNew: boolean;
  preview: {
    again: string;
    hard: string;
    good: string;
    easy: string;
  };
}

const GRADES = [
  { rating: 1, label: "Nochmal", style: "bg-error-50 text-error-700 border-error-500", key: "again" },
  { rating: 2, label: "Schwer", style: "bg-ink-100 text-ink-700 border-ink-300", key: "hard" },
  { rating: 3, label: "Gut", style: "bg-info-50 text-info-700 border-info-500", key: "good" },
  { rating: 4, label: "Einfach", style: "bg-correct-50 text-correct-700 border-correct-500", key: "easy" },
] as const;

export interface EmptyStateConfig {
  icon: LucideIcon;
  heading: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/**
 * Wiederverwendbare Karteikarten-Session (FSRS: fällige Karten zuerst, dann neue).
 * `apiUrl` bestimmt den Scope (z.B. `/api/reviews` global, oder
 * `/api/reviews?islandPackId=...&contentType=sentences` für eine Insel).
 */
export function ReviewSessionClient({
  apiUrl,
  title,
  emptyState,
}: {
  apiUrl: string;
  title: string;
  emptyState: EmptyStateConfig;
}) {
  const [queue, setQueue] = useState<ReviewCard[] | null>(null);
  const [roundSize, setRoundSize] = useState(0);
  const [dueLeft, setDueLeft] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const [roundsDone, setRoundsDone] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [seenIds, setSeenIds] = useState<string[]>([]);

  async function loadRound(excludeIds: string[]) {
    setQueue(null);
    const separator = apiUrl.includes("?") ? "&" : "?";
    const res = await fetch(`${apiUrl}${separator}exclude=${excludeIds.slice(-40).join(",")}`, {
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    const items: ReviewCard[] = data?.items ?? [];
    setQueue(items);
    setRoundSize(items.length);
    setDueLeft(data?.dueCount ?? 0);
    setTotalCount(data?.totalCount ?? 0);
    setDoneCount(0);
    setRevealed(false);
  }

  useEffect(() => {
    void loadRound([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  if (queue === null) {
    return <p className="p-6 text-center text-ink-500">Lade deine Karten …</p>;
  }

  const current = queue[0];

  // Gar keine Karten im Scope → scope-spezifischer Leerzustand.
  if (!current && totalCount === 0) {
    const Icon = emptyState.icon;
    return (
      <main className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center gap-6 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50" aria-hidden>
          <Icon className="h-12 w-12 text-brand-600" />
        </span>
        <h1 className="text-h1">{emptyState.heading}</h1>
        <p className="text-body text-ink-500">{emptyState.body}</p>
        <div className="flex flex-col gap-3">
          <Link
            href={emptyState.primaryHref}
            className="min-h-[48px] rounded-button bg-brand-500 px-8 py-3 font-semibold text-brand-ink shadow-soft hover:bg-brand-400"
          >
            {emptyState.primaryLabel}
          </Link>
          {emptyState.secondaryHref && emptyState.secondaryLabel && (
            <Link href={emptyState.secondaryHref} className="font-semibold text-brand-600 hover:underline">
              {emptyState.secondaryLabel}
            </Link>
          )}
        </div>
      </main>
    );
  }

  // Runde geschafft → direkt die nächste anbieten (es gibt immer Karten, solange fällig).
  if (!current) {
    return (
      <main className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center gap-6 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 motion-safe:animate-pop-in" aria-hidden>
          <PartyPopper className="h-12 w-12 text-brand-600" />
        </span>
        <h1 className="text-h1">Runde geschafft!</h1>
        <p className="text-body text-ink-500">
          {roundsDone + 1} {roundsDone === 0 ? "Runde" : "Runden"} · +{xpEarned} XP heute.{" "}
          {dueLeft > 0
            ? `Noch ${dueLeft} fällige Karte${dueLeft === 1 ? "" : "n"} übrig – dranbleiben!`
            : "Alles Fällige erledigt. Komm wieder, wenn die nächsten Karten fällig sind – so bleibt der Stoff am besten im Langzeitgedächtnis."}
        </p>
        <div className="flex w-full max-w-xs flex-col gap-3">
          {dueLeft > 0 && (
            <Button
              full
              onClick={() => {
                setRoundsDone((r) => r + 1);
                void loadRound(seenIds);
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <RotateCcw aria-hidden className="h-4 w-4" /> Weiter üben
              </span>
            </Button>
          )}
          <Link href="/dashboard" className="font-semibold text-ink-500 hover:text-ink-700">
            Zum Dashboard
          </Link>
        </div>
      </main>
    );
  }

  async function grade(rating: number) {
    const item = current;
    setRevealed(false);
    setSeenIds((ids) => [...ids, item.id]);
    setQueue((q) => {
      if (!q) return q;
      const rest = q.slice(1);
      // „Nochmal“: Karte wandert ans Ende der laufenden Runde
      return rating === 1 ? [...rest, item] : rest;
    });
    if (rating >= 3) setDoneCount((d) => d + 1);

    const res = await fetch(`/api/reviews/${item.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
    if (res.ok) {
      const data = await res.json();
      setXpEarned((x) => x + (data.xp ?? 0));
      // Karte aus dem Fällig-Topf raus? Dann Zähler live mitziehen (nicht bei
      // „Nochmal“ – die bleibt fällig und kommt gleich wieder).
      if (data.nextDueAt && new Date(data.nextDueAt).getTime() > Date.now()) {
        setDueLeft((d) => Math.max(0, d - 1));
      }
    }
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">{title}</h1>
        <span className="text-caption tabular-nums text-ink-500">{dueLeft} fällig</span>
      </div>
      <ProgressBar value={doneCount} max={Math.max(roundSize, doneCount + queue.length)} label="Runden-Fortschritt" />

      <Card className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-center">
        {current.isNew && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-caption font-bold text-brand-700">
            <BookOpen aria-hidden className="h-3.5 w-3.5" /> Neu
          </span>
        )}
        <p className="text-caption font-bold text-ink-500">Was heißt …</p>
        <p className="text-display">{current.source}</p>
        {revealed ? (
          <div className="flex flex-col items-center gap-2 motion-safe:animate-pop-in">
            <div className="flex items-center gap-2">
              <p className="text-h1 text-brand-600">{current.target}</p>
              <AudioButton text={current.target} lang="tr" autoPlay />
            </div>
            {current.exampleTarget && (
              <p className="text-caption text-ink-500">
                {current.exampleTarget}
                {current.exampleSource && <> – {current.exampleSource}</>}
              </p>
            )}
          </div>
        ) : (
          <Button onClick={() => setRevealed(true)}>Antwort zeigen</Button>
        )}
      </Card>

      {revealed && (
        <div className="grid grid-cols-4 gap-2" role="group" aria-label="Wie gut wusstest du es?">
          {GRADES.map((g) => (
            <button
              key={g.rating}
              type="button"
              onClick={() => grade(g.rating)}
              className={`flex min-h-[60px] flex-col items-center justify-center rounded-chip border-2 font-semibold transition-transform duration-150 ease-out-strong active:scale-[0.96] [@media(hover:hover)]:hover:-translate-y-0.5 ${g.style}`}
            >
              {g.label}
              <span className="text-[10px] font-normal opacity-70">{current.preview[g.key as keyof typeof current.preview]}</span>
            </button>
          ))}
        </div>
      )}
      <p className="text-center text-caption tabular-nums text-ink-500">
        Noch {queue.length} {queue.length === 1 ? "Karte" : "Karten"} in dieser Runde · +{xpEarned} XP heute
      </p>
    </main>
  );
}
```

- [ ] **Step 2: `src/app/(app)/review/page.tsx` auf die neue Komponente umstellen**

Kompletten Inhalt durch diesen ersetzen:

```typescript
"use client";

import { Layers } from "lucide-react";
import { ReviewSessionClient } from "@/components/ReviewSessionClient";

/**
 * Wiederholen: strikt nach FSRS-Zeitplan, global über alle Karten (Inseln, Stash, Erzählungen).
 * Insel-eigene Sessions siehe /islands/[theme]/[slug]/practice.
 */
export default function ReviewPage() {
  return (
    <ReviewSessionClient
      apiUrl="/api/reviews"
      title="Wiederholen"
      emptyState={{
        icon: Layers,
        heading: "Noch keine Karten",
        body: "Dein Kartenstapel füllt sich automatisch: Jeder Satz aus Chat, Stash oder Wortschatz-Pack legt neue Karten an.",
        primaryHref: "/trainer",
        primaryLabel: "Wortschatz-Trainer starten",
        secondaryHref: "/chat",
        secondaryLabel: "Oder im Chat üben",
      }}
    />
  );
}
```

- [ ] **Step 3: Typecheck ausführen**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler.

- [ ] **Step 4: Build-Verifikation**

In einem isolierten Worktree mit eigener `.env`/DB (siehe Task 1 Step 5): `npm run build`
Expected: Build läuft erfolgreich durch. Danach `.env`/DB-Dateien löschen, `git status --short` sauber.

- [ ] **Step 5: Commit**

```bash
git add src/components/ReviewSessionClient.tsx "src/app/(app)/review/page.tsx"
git commit -m "refactor: extract reusable ReviewSessionClient from /review page"
```

---

### Task 5: Insel-eigene Sätze-Session (`/islands/[theme]/[slug]/practice`)

**Files:**
- Create: `src/app/(app)/islands/[theme]/[slug]/practice/page.tsx`

**Interfaces:**
- Consumes: `ReviewSessionClient`, `EmptyStateConfig` aus `@/components/ReviewSessionClient` (Task 4); Scope-Query-Parameter `islandPackId`/`contentType=sentences` aus Task 3.
- Produces: nichts weiter (Blattseite)

- [ ] **Step 1: `src/app/(app)/islands/[theme]/[slug]/practice/page.tsx` anlegen**

```typescript
import { notFound, redirect } from "next/navigation";
import { Layers } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReviewSessionClient } from "@/components/ReviewSessionClient";

export const dynamic = "force-dynamic";

/** Karteikarten-Session für die Einzelsätze einer Insel (gescoped, kein globaler Mix). */
export default async function IslandPracticePage({
  params,
}: {
  params: { theme: string; slug: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const pack = await db.islandPack.findUnique({
    where: { slug: params.slug },
    select: { id: true, title: true, isCustom: true, userId: true },
  });

  if (!pack || (!pack.isCustom && pack.userId) || (pack.isCustom && pack.userId !== user.id)) {
    notFound();
  }

  return (
    <ReviewSessionClient
      apiUrl={`/api/reviews?islandPackId=${pack.id}&contentType=sentences`}
      title={pack.title}
      emptyState={{
        icon: Layers,
        heading: "Nichts fällig",
        body: "In dieser Insel ist gerade nichts zu wiederholen. Komm wieder, wenn Sätze fällig sind, oder übernimm die Insel, falls noch nicht geschehen.",
        primaryHref: `/islands/${params.theme}/${params.slug}`,
        primaryLabel: "Zurück zur Insel",
      }}
    />
  );
}
```

- [ ] **Step 2: Typecheck ausführen**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler.

- [ ] **Step 3: Build-Verifikation**

In einem isolierten Worktree mit eigener `.env`/DB (siehe Task 1 Step 5): `npm run build`
Expected: Build läuft erfolgreich durch, Route `/islands/[theme]/[slug]/practice` erscheint im Build-Output. Danach `.env`/DB-Dateien löschen, `git status --short` sauber.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(app)/islands/[theme]/[slug]/practice/page.tsx"
git commit -m "feat: add per-island sentence practice session"
```

---

### Task 6: Erzählungen-Liste + Story-Session

**Files:**
- Create: `src/app/(app)/islands/[theme]/[slug]/stories/page.tsx`
- Create: `src/app/(app)/islands/[theme]/[slug]/stories/[storyId]/practice/page.tsx`

**Interfaces:**
- Consumes: `ReviewSessionClient`, `EmptyStateConfig` aus `@/components/ReviewSessionClient` (Task 4); `IslandPack.stories`, `IslandStory` aus Task 1.
- Produces: nichts weiter (Blattseiten)

- [ ] **Step 1: `src/app/(app)/islands/[theme]/[slug]/stories/page.tsx` anlegen**

```typescript
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

/** Liste der Erzählungen einer Insel — Antippen startet die Story-Session. */
export default async function IslandStoriesPage({
  params,
}: {
  params: { theme: string; slug: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const pack = await db.islandPack.findUnique({
    where: { slug: params.slug },
    include: {
      stories: {
        orderBy: { order: "asc" },
        include: { _count: { select: { sentences: true } } },
      },
    },
  });

  if (!pack || (!pack.isCustom && pack.userId) || (pack.isCustom && pack.userId !== user.id)) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">Erzählungen</h1>
        <p className="text-body text-ink-600">{pack.title}</p>
      </div>
      <div className="flex flex-col gap-3">
        {pack.stories.map((story) => (
          <Link key={story.id} href={`/islands/${params.theme}/${params.slug}/stories/${story.id}/practice`}>
            <Card className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50" aria-hidden>
                <BookOpen className="h-5 w-5 text-brand-600" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-900">{story.title}</p>
                <p className="text-caption text-ink-500">{story._count.sentences} Sätze</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: `src/app/(app)/islands/[theme]/[slug]/stories/[storyId]/practice/page.tsx` anlegen**

```typescript
import { notFound, redirect } from "next/navigation";
import { BookOpen } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReviewSessionClient } from "@/components/ReviewSessionClient";

export const dynamic = "force-dynamic";

/** Karteikarten-Session für eine einzelne Erzählung. */
export default async function IslandStoryPracticePage({
  params,
}: {
  params: { theme: string; slug: string; storyId: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const pack = await db.islandPack.findUnique({
    where: { slug: params.slug },
    select: { id: true, isCustom: true, userId: true },
  });

  if (!pack || (!pack.isCustom && pack.userId) || (pack.isCustom && pack.userId !== user.id)) {
    notFound();
  }

  const story = await db.islandStory.findUnique({
    where: { id: params.storyId },
    select: { id: true, title: true, packId: true },
  });

  if (!pack || !story || story.packId !== pack.id) notFound();

  return (
    <ReviewSessionClient
      apiUrl={`/api/reviews?islandPackId=${pack.id}&contentType=stories&storyId=${story.id}`}
      title={story.title}
      emptyState={{
        icon: BookOpen,
        heading: "Nichts fällig",
        body: "In dieser Erzählung ist gerade nichts zu wiederholen.",
        primaryHref: `/islands/${params.theme}/${params.slug}/stories`,
        primaryLabel: "Zurück zu den Erzählungen",
      }}
    />
  );
}
```

- [ ] **Step 3: Typecheck ausführen**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler.

- [ ] **Step 4: Build-Verifikation**

In einem isolierten Worktree mit eigener `.env`/DB (siehe Task 1 Step 5): `npm run build`
Expected: Build läuft erfolgreich durch, beide neuen Routen erscheinen im Build-Output. Danach `.env`/DB-Dateien löschen, `git status --short` sauber.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(app)/islands/[theme]/[slug]/stories/page.tsx" "src/app/(app)/islands/[theme]/[slug]/stories/[storyId]/practice/page.tsx"
git commit -m "feat: add stories list and per-story practice session"
```

---

### Task 7: Insel-Detail-Redesign (Sätze/Erzählungen-Auswahl)

**Files:**
- Modify: `src/app/(app)/islands/[theme]/[slug]/page.tsx`
- Modify: `src/components/IslandDetailClient.tsx`

**Interfaces:**
- Produces: `IslandDetailClient({ theme, slug, packId, sentenceCount, storyCount, canJoin, joined, totalCurated })` (Props-Signatur geändert — vorher `sentences`/`canJoin`/`joined`/`totalCurated`)

- [ ] **Step 1: `src/app/(app)/islands/[theme]/[slug]/page.tsx` ersetzen**

Kompletten Inhalt durch diesen ersetzen:

```typescript
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { IslandDetailClient } from "@/components/IslandDetailClient";

export const dynamic = "force-dynamic";

/** Insel-Detail (Ebene 3): Auswahl zwischen Sätzen und Erzählungen. */
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
      _count: { select: { sentences: true, stories: true } },
      // Privacy: bei kuratierten (globalen) Inseln können StashSentences mehrerer
      // Nutzer angehängt sein — immer auf den eingeloggten Nutzer filtern, sonst
      // sähe man fremde eigene Sätze (gleicher Fix wie bei /islands API-Route).
      stashSentences: { where: { userId: user.id }, select: { id: true } },
      sentences: { select: { reviews: { where: { userId: user.id }, select: { id: true } } } },
    },
  });

  if (!pack || (!pack.isCustom && pack.userId) || (pack.isCustom && pack.userId !== user.id)) {
    notFound();
  }

  const sentenceCount = pack._count.sentences + pack.stashSentences.length;
  const storyCount = pack._count.stories;
  const canJoin = !pack.isCustom;
  const joined = pack.sentences.filter((s) => s.reviews.length > 0).length;
  const totalCurated = pack.sentences.length;

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">{pack.title}</h1>
        <p className="text-body text-ink-600">{pack.level}</p>
      </div>
      <IslandDetailClient
        theme={params.theme}
        slug={params.slug}
        packId={pack.id}
        sentenceCount={sentenceCount}
        storyCount={storyCount}
        canJoin={canJoin}
        joined={joined}
        totalCurated={totalCurated}
      />
    </div>
  );
}
```

- [ ] **Step 2: `src/components/IslandDetailClient.tsx` ersetzen**

Kompletten Inhalt durch diesen ersetzen:

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function IslandDetailClient({
  theme,
  slug,
  packId,
  sentenceCount,
  storyCount,
  canJoin,
  joined,
  totalCurated,
}: {
  theme: string;
  slug: string;
  packId: string;
  sentenceCount: number;
  storyCount: number;
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
      <div className="flex flex-col gap-3">
        <Link href={`/islands/${theme}/${slug}/practice`}>
          <Card className="flex items-center gap-3 bg-brand-500 text-brand-ink">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20" aria-hidden>
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">Sätze</p>
              <p className="text-caption opacity-80">{sentenceCount} Elemente</p>
            </div>
          </Card>
        </Link>
        {storyCount > 0 && (
          <Link href={`/islands/${theme}/${slug}/stories`}>
            <Card className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50" aria-hidden>
                <BookOpen className="h-5 w-5 text-brand-600" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-900">Erzählungen</p>
                <p className="text-caption text-ink-500">{storyCount} Elemente</p>
              </div>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck ausführen**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler.

- [ ] **Step 4: Build-Verifikation**

In einem isolierten Worktree mit eigener `.env`/DB (siehe Task 1 Step 5): `npm run build`
Expected: Build läuft erfolgreich durch. Danach `.env`/DB-Dateien löschen, `git status --short` sauber.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(app)/islands/[theme]/[slug]/page.tsx" src/components/IslandDetailClient.tsx
git commit -m "feat: redesign island detail as sentences/stories selector"
```

---

### Task 8: Join-Flow um Story-Sätze erweitern

**Files:**
- Modify: `src/app/api/islands/[packId]/join/route.ts`

**Interfaces:**
- Produces: unverändert `POST /api/islands/[packId]/join` (jetzt zusätzlich `IslandStorySentence`-ReviewItems)

- [ ] **Step 1: `src/app/api/islands/[packId]/join/route.ts` ersetzen**

Kompletten Inhalt durch diesen ersetzen:

```typescript
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * Übernimmt alle Sätze (Einzelsätze + Erzählungs-Sätze) eines Island-Packs in
 * den eigenen Review-Stapel (legt ReviewItem je Satz an, sofern noch nicht
 * vorhanden). Idempotent.
 */
export async function POST(_req: Request, { params }: { params: { packId: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const pack = await db.islandPack.findUnique({
    where: { id: params.packId },
    include: {
      sentences: { select: { id: true } },
      stories: { include: { sentences: { select: { id: true } } } },
    },
  });
  if (!pack) return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });

  const storySentenceIds = pack.stories.flatMap((s) => s.sentences.map((sent) => sent.id));

  const [existingSentences, existingStorySentences] = await Promise.all([
    db.reviewItem.findMany({
      where: { userId: user.id, islandSentenceId: { in: pack.sentences.map((s) => s.id) } },
      select: { islandSentenceId: true },
    }),
    db.reviewItem.findMany({
      where: { userId: user.id, islandStorySentenceId: { in: storySentenceIds } },
      select: { islandStorySentenceId: true },
    }),
  ]);

  const alreadySentences = new Set(existingSentences.map((e) => e.islandSentenceId));
  const alreadyStorySentences = new Set(existingStorySentences.map((e) => e.islandStorySentenceId));

  const toCreateSentences = pack.sentences.filter((s) => !alreadySentences.has(s.id));
  const toCreateStorySentences = storySentenceIds.filter((id) => !alreadyStorySentences.has(id));

  const creates = [
    ...toCreateSentences.map((s) => ({ userId: user.id, islandSentenceId: s.id })),
    ...toCreateStorySentences.map((id) => ({ userId: user.id, islandStorySentenceId: id })),
  ];

  if (creates.length > 0) {
    await db.reviewItem.createMany({ data: creates });
  }

  return NextResponse.json({
    added: creates.length,
    total: pack.sentences.length + storySentenceIds.length,
  });
}
```

- [ ] **Step 2: Typecheck ausführen**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler.

- [ ] **Step 3: Build-Verifikation**

In einem isolierten Worktree mit eigener `.env`/DB (siehe Task 1 Step 5): `npm run build`
Expected: Build läuft erfolgreich durch. Danach `.env`/DB-Dateien löschen, `git status --short` sauber.

- [ ] **Step 4: Commit**

```bash
git add "src/app/api/islands/[packId]/join/route.ts"
git commit -m "feat: create ReviewItems for story sentences on island join"
```

---

## Self-Review Notes

- **Spec-Abdeckung:** Datenmodell für Erzählungen (Task 1), Insel-Detail-Auswahlbildschirm (Task 7), Übungs-Session/insel-eigenes SRS (Task 2-6), Join-Flow für Story-Sätze (Task 8) — alle vier Spec-Abschnitte haben mindestens eine Task.
- **Bekannte Nebenwirkung:** `src/lib/islandStatus.ts` (`deriveSentenceStars`, aus dem vorherigen Insel-Redesign-Plan) wird nach Task 7 von nirgendwo mehr aufgerufen — die neue Insel-Detail-Ansicht zeigt keine Pro-Satz-Sterne mehr (ersetzt durch die Karteikarten-Session mit FSRS-Grading). Datei + Test bleiben bewusst bestehen (klein, in sich geschlossen, könnte für eine spätere Fortschritts-Detailansicht wieder gebraucht werden) — kein Lösch-Task in diesem Plan.
- **Privacy-Konsistenz:** Alle neuen Server-Components (Task 5, 6, 7) übernehmen exakt denselben `isCustom`/`userId`-Zugriffsschutz wie die bestehende Insel-Detail-Seite. Die Story-Practice-Seite (Task 6) prüft zusätzlich `story.packId !== pack.id`, um Story-Zugriff über eine falsche Insel-URL zu verhindern.
- **Platzhalter-Scan:** keine TBD/TODO, aller Code vollständig ausgeschrieben.
- **Typkonsistenz geprüft:** `ReviewScopeFilters`/`buildReviewScopeWhere` (Task 2) werden in Task 3 identisch importiert; `EmptyStateConfig`/`ReviewSessionClient` (Task 4) werden in Task 5 und 6 mit identischer Props-Signatur verwendet; `IslandDetailClient`s neue Props-Signatur (Task 7) stimmt zwischen Server-Component-Aufruf und Komponentendefinition überein.
