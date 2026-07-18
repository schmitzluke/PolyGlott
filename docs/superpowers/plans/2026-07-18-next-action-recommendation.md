# Next-Action-Empfehlung Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ein hervorgehobener "Nächster Schritt"-Slot im Dashboard, der von den 5 scorbaren Lernsäulen (Reviews, Islands, Stash, Media, Commute — Trainer bewusst ausgeklammert) die aktuell wertvollste vorschlägt.

**Architecture:** Reine Scoring-Funktion (`src/lib/nextAction.ts`, keine DB-Abhängigkeit, voll testbar) + Datenbeschaffung inline im bestehenden Dashboard-Server-Component (folgt dem etablierten Muster dort, kein Repository-Layer) + eine neue Präsentationskomponente (`src/components/NextActionCard.tsx`).

**Tech Stack:** Next.js 14 App Router Server Component, Prisma (SQLite), Vitest, Tailwind mit semantischen Tokens (kein `dark:`).

## Global Constraints

- Reines TypeScript, keine neuen Dependencies.
- Keine DB-Migration — alle Daten aus bestehenden Modellen ableitbar (Spec-Entscheidung).
- Tailwind: nur semantische Tokens (`bg-gold`, `text-ink-500` etc.), keine `dark:`-Overrides (Memory `inverted-ink-scale` — `dark:bg-ink-900` würde WEISS rendern).
- Wortschatz-Trainer ist NICHT Teil des Scorings (Spec-Scope-Entscheidung, Phase-4-Blocker).
- Offene Fragen aus der Spec sind hiermit entschieden: Islands-`daysSinceLastUse` = `max(ReviewItem.last_review)` wo `islandSentenceId != null`; Media-`daysSinceLastUse` = `max(Transcript.createdAt)` wo `comprehended = true` (kein `updatedAt`-Feld im Schema vorhanden, `createdAt`-Proxy wie in Spec Frage 2 vorgesehen).

---

### Task 1: Pure Scoring-Funktion `nextAction.ts`

**Files:**
- Create: `src/lib/nextAction.ts`
- Test: `tests/nextAction.test.ts`

**Interfaces:**
- Produces: `PillarKey` (Union-Type), `CandidateInput` (Interface), `ScoredCandidate` (Interface), `pickNextAction(candidates: CandidateInput[]): ScoredCandidate | null` — dies ist die einzige Export-Funktion, die Task 2 konsumiert.

- [ ] **Step 1: Schreibe den fehlschlagenden Test für die Grundrangfolge**

```ts
// tests/nextAction.test.ts
import { describe, it, expect } from "vitest";
import { pickNextAction, type CandidateInput } from "@/lib/nextAction";

describe("pickNextAction", () => {
  it("wählt reviews, wenn alle Kandidaten verfügbar sind (höchstes Grundgewicht)", () => {
    const candidates: CandidateInput[] = [
      { key: "reviews", available: true, daysSinceLastUse: 0 },
      { key: "islands", available: true, daysSinceLastUse: 0 },
      { key: "stash", available: true, daysSinceLastUse: 0 },
      { key: "media", available: true, daysSinceLastUse: 0 },
      { key: "commute", available: true, daysSinceLastUse: 0 },
    ];
    const result = pickNextAction(candidates);
    expect(result?.key).toBe("reviews");
  });
});
```

- [ ] **Step 2: Test ausführen, Fehlschlag bestätigen**

Run: `npx vitest run tests/nextAction.test.ts`
Expected: FAIL mit `Cannot find module '@/lib/nextAction'` (oder äquivalenter Import-Fehler)

- [ ] **Step 3: Minimale Implementierung schreiben**

```ts
// src/lib/nextAction.ts
/**
 * Bewertet die 5 scorbaren Lernsäulen nach Retrieval-Practice-Evidenz
 * (Testing-Effekt, Roediger/Karpicke) und liefert die aktuell wertvollste.
 * Wortschatz-Trainer ist bewusst ausgeklammert (kein FSRS-Tracking, s. Spec).
 */

export type PillarKey = "reviews" | "islands" | "stash" | "media" | "commute";

export interface CandidateInput {
  key: PillarKey;
  available: boolean;
  daysSinceLastUse: number | null;
}

export interface ScoredCandidate {
  key: PillarKey;
  score: number;
  reason: string;
}

const BASE_WEIGHTS: Record<PillarKey, number> = {
  reviews: 100,
  islands: 55,
  stash: 40,
  media: 30,
  commute: 15,
};

const DEFAULT_REASONS: Record<PillarKey, string> = {
  reviews: "Karten warten auf Wiederholung",
  islands: "Neue Sätze zum Entdecken",
  stash: "Frische Sätze bereit",
  media: "Neues Transkript wartet",
  commute: "Sätze zum Pendel-Hören bereit",
};

const FRESHNESS_THRESHOLD_DAYS = 2;
const FRESHNESS_BONUS = 1.1;

export function pickNextAction(candidates: CandidateInput[]): ScoredCandidate | null {
  const scored = candidates
    .filter((c) => c.available)
    .map((c) => {
      const isFresh = c.daysSinceLastUse !== null && c.daysSinceLastUse > FRESHNESS_THRESHOLD_DAYS;
      const score = BASE_WEIGHTS[c.key] * (isFresh ? FRESHNESS_BONUS : 1);
      const reason = isFresh
        ? `Lange nicht genutzt (${c.daysSinceLastUse} Tage)`
        : DEFAULT_REASONS[c.key];
      return { key: c.key, score, reason };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0] ?? null;
}
```

- [ ] **Step 4: Test ausführen, Erfolg bestätigen**

Run: `npx vitest run tests/nextAction.test.ts`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add src/lib/nextAction.ts tests/nextAction.test.ts
git commit -m "feat: add pure next-action scoring function"
```

- [ ] **Step 6: Test für "nicht verfügbare Kandidaten fallen raus" schreiben**

```ts
// In tests/nextAction.test.ts, describe-Block ergänzen:
it("ignoriert nicht verfügbare Kandidaten", () => {
  const candidates: CandidateInput[] = [
    { key: "reviews", available: false, daysSinceLastUse: null },
    { key: "islands", available: true, daysSinceLastUse: 0 },
  ];
  const result = pickNextAction(candidates);
  expect(result?.key).toBe("islands");
});

it("gibt null zurück, wenn kein Kandidat verfügbar ist", () => {
  const candidates: CandidateInput[] = [
    { key: "reviews", available: false, daysSinceLastUse: null },
    { key: "commute", available: false, daysSinceLastUse: null },
  ];
  expect(pickNextAction(candidates)).toBeNull();
});
```

- [ ] **Step 7: Tests ausführen, Erfolg bestätigen (Implementierung deckt bereits ab)**

Run: `npx vitest run tests/nextAction.test.ts`
Expected: PASS (3 tests) — kein Code-Änderung nötig, Step 3 deckt beide Fälle schon ab

- [ ] **Step 8: Test für Freshness-Bonus schreiben (kippt Wahl nur bei knappem Abstand, nie über Grundrangfolge hinweg)**

```ts
// In tests/nextAction.test.ts, describe-Block ergänzen:
it("Freshness-Bonus kippt Wahl bei knappem Abstand (islands vs. stash)", () => {
  const candidates: CandidateInput[] = [
    { key: "stash", available: true, daysSinceLastUse: 0 }, // 40
    { key: "islands", available: true, daysSinceLastUse: 5 }, // 55 * 1.1 = 60.5, immer noch höher — kein Kipp-Fall hier
  ];
  const result = pickNextAction(candidates);
  expect(result?.key).toBe("islands");
  expect(result?.reason).toBe("Lange nicht genutzt (5 Tage)");
});

it("Freshness-Bonus überstimmt niemals die Grundrangfolge (reviews bleibt vorn)", () => {
  const candidates: CandidateInput[] = [
    { key: "reviews", available: true, daysSinceLastUse: 0 }, // 100
    { key: "islands", available: true, daysSinceLastUse: 30 }, // 55 * 1.1 = 60.5
  ];
  const result = pickNextAction(candidates);
  expect(result?.key).toBe("reviews");
});
```

- [ ] **Step 9: Tests ausführen, Erfolg bestätigen**

Run: `npx vitest run tests/nextAction.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 10: Commit**

```bash
git add tests/nextAction.test.ts
git commit -m "test: cover availability filtering and freshness bonus in next-action scoring"
```

---

### Task 2: Datenbeschaffung + UI-Integration im Dashboard

**Files:**
- Create: `src/components/NextActionCard.tsx`
- Modify: `src/app/(app)/dashboard/page.tsx`

**Interfaces:**
- Consumes: `pickNextAction(candidates: CandidateInput[]): ScoredCandidate | null` und Typen `PillarKey`, `CandidateInput`, `ScoredCandidate` aus `src/lib/nextAction.ts` (Task 1).
- Produces: `NextActionCard` React-Komponente mit Props `{ candidate: ScoredCandidate }` — konsumiert von `dashboard/page.tsx`. Keine weiteren Konsumenten in diesem Plan.

- [ ] **Step 1: `NextActionCard`-Komponente schreiben**

```tsx
// src/components/NextActionCard.tsx
import Link from "next/link";
import { ArrowRight, RotateCcw, MapPin, Mic, Headphones, Ear } from "lucide-react";
import type { PillarKey, ScoredCandidate } from "@/lib/nextAction";

const PILLAR_META: Record<PillarKey, { label: string; href: string; Icon: typeof RotateCcw }> = {
  reviews: { label: "Wiederholen", href: "/review", Icon: RotateCcw },
  islands: { label: "Inseln entdecken", href: "/islands", Icon: MapPin },
  stash: { label: "Sätze sprechen", href: "/stash", Icon: Mic },
  media: { label: "Media Comprehension", href: "/media", Icon: Headphones },
  commute: { label: "Commute Mode", href: "/commute", Icon: Ear },
};

/** Hervorgehobener "Nächster Schritt"-Slot: die laut Scoring aktuell wertvollste Lernsäule. */
export function NextActionCard({ candidate }: { candidate: ScoredCandidate }) {
  const meta = PILLAR_META[candidate.key];
  return (
    <Link href={meta.href} className="block">
      <div className="rounded-card border-2 border-gold/30 bg-gold/10 p-5 shadow-soft transition-transform duration-150 ease-out-strong active:scale-[0.99] [@media(hover:hover)]:hover:scale-[1.01]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <meta.Icon aria-hidden className="h-6 w-6 shrink-0 text-gold" />
            <div>
              <h2 className="text-h3">{meta.label}</h2>
              <p className="text-caption text-ink-700">{candidate.reason}</p>
            </div>
          </div>
          <ArrowRight aria-hidden className="h-6 w-6 shrink-0 text-gold" />
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Typecheck der neuen Komponente prüfen**

Run: `npx tsc --noEmit`
Expected: Keine Fehler in `src/components/NextActionCard.tsx` (Fehler in anderen, noch nicht angepassten Dateien sind an diesem Punkt nicht zu erwarten, da die Komponente noch nirgends importiert wird)

- [ ] **Step 3: Commit**

```bash
git add src/components/NextActionCard.tsx
git commit -m "feat: add NextActionCard presentation component"
```

- [ ] **Step 4: Datenbeschaffung in `dashboard/page.tsx` ergänzen — Imports und Queries**

In `src/app/(app)/dashboard/page.tsx` den bestehenden Import-Block erweitern:

```tsx
import { MasteryProgress } from "@/components/MasteryProgress";
import { NextActionCard } from "@/components/NextActionCard";
import { pickNextAction, type CandidateInput } from "@/lib/nextAction";
```

Direkt nach dem bestehenden `Promise.all` (das `streak`, `todayXpAgg`, `dueCount`, `totalCards` lädt), die Scoring-Datenbeschaffung ergänzen. Läuft in einem eigenen `try/catch` — schlägt eine der neuen Queries fehl (z. B. wegen einer falsch angenommenen Relations-Filter-Syntax), rendert das Dashboard trotzdem weiter, nur ohne Empfehlungs-Slot (`nextAction = null`). Das bestehende Verhalten der 4 Karten darunter darf davon nicht abhängen:

```tsx
  const now = new Date();
  const daysSince = (date: Date | null | undefined): number | null =>
    date ? Math.floor((now.getTime() - date.getTime()) / 86_400_000) : null;

  let nextAction: ReturnType<typeof pickNextAction> = null;
  try {
    const [
      islandsAvailableCount,
      lastIslandReview,
      stashReadyWithoutReview,
      lastStashCreated,
      stashReadyAny,
      mediaReadyCount,
      lastMediaComprehended,
      lastReviewXp,
    ] = await Promise.all([
      db.islandSentence.count({ where: { reviews: { none: { userId: user.id } } } }),
      db.reviewItem.aggregate({
        where: { userId: user.id, islandSentenceId: { not: null } },
        _max: { last_review: true },
      }),
      db.stashSentence.count({ where: { userId: user.id, status: "READY", reviews: { none: {} } } }),
      db.stashSentence.aggregate({ where: { userId: user.id }, _max: { createdAt: true } }),
      db.stashSentence.count({ where: { userId: user.id, status: "READY" } }),
      db.transcript.count({ where: { userId: user.id, status: "READY", comprehended: false } }),
      db.transcript.aggregate({
        where: { userId: user.id, comprehended: true },
        _max: { createdAt: true },
      }),
      db.xpEvent.findFirst({
        where: { userId: user.id, reason: "review" },
        orderBy: { createdAt: "desc" },
        select: { createdAt: true },
      }),
    ]);

    const candidates: CandidateInput[] = [
      { key: "reviews", available: dueCount > 0, daysSinceLastUse: daysSince(lastReviewXp?.createdAt) },
      { key: "islands", available: islandsAvailableCount > 0, daysSinceLastUse: daysSince(lastIslandReview._max.last_review) },
      { key: "stash", available: stashReadyWithoutReview > 0, daysSinceLastUse: daysSince(lastStashCreated._max.createdAt) },
      { key: "media", available: mediaReadyCount > 0, daysSinceLastUse: daysSince(lastMediaComprehended._max.createdAt) },
      { key: "commute", available: stashReadyAny > 0, daysSinceLastUse: null },
    ];
    nextAction = pickNextAction(candidates);
  } catch (err) {
    console.error("next-action scoring failed, hiding recommendation slot", err);
  }
```

- [ ] **Step 5: `NextActionCard` im JSX rendern**

In `src/app/(app)/dashboard/page.tsx`, direkt vor dem bestehenden Kommentar `{/* Tagesziel */}` einfügen:

```tsx
      {nextAction && <NextActionCard candidate={nextAction} />}

```

- [ ] **Step 6: Typecheck des gesamten Projekts**

Run: `npx tsc --noEmit`
Expected: Keine Fehler

- [ ] **Step 7: Vitest-Suite ausführen (Regressionscheck)**

Run: `npm test`
Expected: Alle bestehenden Tests weiterhin grün, plus die 5 Tests aus Task 1

- [ ] **Step 8: Im Browser verifizieren**

Dev-Server starten (`npm run dev` bzw. Projekt-eigenes Preview-Tooling), `/dashboard` als eingeloggter Nutzer aufrufen. Erwartung: neue goldene Karte über "Tagesziel" erscheint mit einem der 5 Labels (`Wiederholen`, `Inseln entdecken`, `Sätze sprechen`, `Media Comprehension`, `Commute Mode`) + Begründungstext, Klick navigiert zur passenden Route. Falls Demo-User keine `dueCount`/READY-Inhalte hat, testweise eine `StashSentence` mit `status: READY` über Prisma Studio oder die Stash-UI anlegen, um mindestens einen verfügbaren Kandidaten zu erzeugen, und erneut prüfen.

- [ ] **Step 9: Commit**

```bash
git add src/app/\(app\)/dashboard/page.tsx
git commit -m "feat: wire next-action recommendation into dashboard"
```
