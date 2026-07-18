# Next-Action-Empfehlung: Design-Spec

**Datum:** 2026-07-18
**Status:** Approved (Brainstorming), bereit für Implementierungsplan

## Problem

Die 4 Lernsäulen (Active Recall/Reviews, Wortschatz-Trainer, Language Islands, Voice
Capture/Stash, Media Comprehension, Commute Mode) laufen im Dashboard nebeneinander als
gleichrangige Karten. Der Nutzer bekommt keine Führung, welche Säule gerade den meisten
Lernwert bringt — die App ist zu isoliert in ihren Bausteinen.

## Ziel

Eine "Nächster Schritt"-Empfehlung: ein einzelner, visuell hervorgehobener Slot im
Dashboard, der die Säule mit dem aktuell höchsten Lernwert vorschlägt. Bestehende
Navigation/Karten bleiben unverändert bestehen — der Slot ergänzt, ersetzt nichts.

## Priorisierung (Retrieval-Practice-Evidenz, Roediger/Karpicke Testing-Effekt)

Aktives Abrufen aus dem Gedächtnis hat nachweislich stärkere Retentionswirkung als
passive Aufnahme. Basis-Gewichte:

| Rang | Säule | Gewicht | Begründung |
|---|---|---|---|
| 1 | Reviews (FSRS) | 100 | Retrieval Practice auf fälligem Wissen, verhindert exponentiellen Vergessens-Verlust — höchster ROI |
| 2 | Wortschatz-Trainer | 70 | Striktes Active Recall, aber auf Neuerwerb statt Bestandsschutz — **erstmal aus der Empfehlung ausgeklammert, s. Scope** |
| 3 | Islands | 55 | Kuratierter Neuerwerb, speist direkt in FSRS-Queue |
| 4 | Voice Capture/Stash | 40 | Content-Nachschub, aber Produktion ≠ Abrufübung |
| 5 | Media Comprehension | 30 | Rezeptiv, schwächerer Encoding-Effekt |
| 6 | Commute Mode | 15 | Rein passiv, niedrigste Retentionswirkung pro Zeit |

## Scope

**Ausgeklammert: Wortschatz-Trainer.** Laut CLAUDE.md persistiert der Trainer aktuell
keine Wort-Fortschritte als `ReviewItem` (Phase-4-Arbeit offen, kein `VocabItem` mehr im
Schema). Eine belastbare `available`-Bestimmung für den Trainer ist damit nicht sauber
möglich, ohne eine Krücke für die kaputte Datenlage zu bauen. Der Trainer bleibt als
eigenständige Dashboard-Karte bestehen, wird aber vom Empfehlungs-Scoring nicht erfasst,
bis die SRS-Anbindung existiert.

Damit fließen 5 Kandidaten ins Scoring: `reviews`, `islands`, `stash`, `media`, `commute`.

## Architektur

### `src/lib/nextAction.ts` (pure Funktion)

```ts
interface CandidateInput {
  key: "reviews" | "islands" | "stash" | "media" | "commute";
  available: boolean;
  daysSinceLastUse: number | null; // null = nie genutzt
}

interface ScoredCandidate {
  key: CandidateInput["key"];
  score: number;
  reason: string;
}

function pickNextAction(candidates: CandidateInput[]): ScoredCandidate | null
```

Kein DB-Zugriff in dieser Funktion — reine Score-Berechnung, testbar ohne DB (analog zu
`src/lib/gamification.ts`, `src/lib/sm2.ts`).

**Score-Formel je Kandidat:**

```
score = baseWeight × (available ? 1 : 0) × freshnessBonus
freshnessBonus = daysSinceLastUse !== null && daysSinceLastUse > 2 ? 1.1 : 1.0
```

- `available=false` → Score 0, scheidet aus der Wahl aus.
- `freshnessBonus` verhindert komplettes Einschlafen einer Säule (Tie-Breaker-Charakter),
  überstimmt aber nie die Grundrangfolge (max. +10%, reicht nicht um zwei Ränge zu
  überspringen: 55 × 1.1 = 60.5 < 70, aber < 100 sowieso irrelevant, da Trainer raus).
- Gewinner = höchster Score unter den verfügbaren Kandidaten. Alle `available=false` →
  `pickNextAction` gibt `null` zurück, kein Empfehlungs-Slot wird gerendert.

### Datenbeschaffung (Dashboard Server Component)

| Kandidat | `available`-Kriterium | `daysSinceLastUse`-Quelle |
|---|---|---|
| `reviews` | `dueCount > 0` (bereits vorhanden) | letztes `XpEvent` mit `reason: "review"` |
| `islands` | mind. 1 `IslandSentence` ohne `ReviewItem` für den Nutzer | letztes `XpEvent` mit `reason` zu Island-Übernahme (oder `ReviewItem.createdAt`-Proxy, falls kein eigener reason existiert — im Implementierungsplan klären) |
| `stash` | `StashSentence.status = READY` ohne zugehöriges `ReviewItem` | letzte `StashSentence.createdAt` |
| `media` | `Transcript.status = READY && comprehended = false` | letztes `Transcript` mit `comprehended = true` (`updatedAt`, falls Feld existiert — sonst `createdAt`-Proxy) |
| `commute` | mind. 1 `StashSentence.status = READY` vorhanden (nutzt denselben Pool) | kein eigener Tracking-Punkt vorhanden — vorerst `daysSinceLastUse: null` |

Keine neuen DB-Felder oder Migrationen nötig — alles aus bestehenden Modellen ableitbar
(mit den zwei im Implementierungsplan zu klärenden Proxy-Fragen bei Islands/Media).

### UI

Neue Karte über der bestehenden "Tagesziel"-Karte im Dashboard
(`src/app/(app)/dashboard/page.tsx`), visuell hervorgehoben (z. B. `bg-gold/10` +
`border-gold/30`, passend zum bereits genutzten `gold`-Token). Zeigt Ziel-Label + kurze
Begründung (`reason`-Feld aus `pickNextAction`) + Link zur jeweiligen Route. Rendert
nichts, wenn `pickNextAction` `null` liefert (Neu-Nutzer-Fall) — bestehende
"Inseln entdecken"-Karte bleibt in diesem Fall der faktische Einstiegspunkt, wie bisher.

### Fehlerbehandlung

- Kein Kandidat verfügbar → kein Slot, keine Fehlermeldung, bestehendes Layout greift.
- Datenbeschaffung schlägt für einzelnen Kandidaten fehl (z. B. Modell-Query wirft) →
  wird im Implementierungsplan als "Kandidat einfach als `available: false` behandeln,
  Fehler loggen" spezifiziert — ein einzelner defekter Kandidat darf nicht das ganze
  Dashboard zum Absturz bringen.

### Testing

`tests/nextAction.test.ts` — reine Funktion, Tabellen-Tests:
- Grundrangfolge bei allen `available: true`, kein Freshness-Bonus
- Einzelne Kandidaten `available: false` → fallen aus der Wahl
- Freshness-Bonus kippt Wahl nur bei echtem Gleichstand/knappem Abstand, nie über
  Grundrangfolge hinweg
- Alle `available: false` → `null`

## Offene Fragen für den Implementierungsplan

1. Exakte `XpEvent.reason`-Werte für Islands-Übernahme prüfen (existiert vermutlich noch
   kein eigener Reason-String — ggf. neuen Reason ergänzen oder Proxy nutzen).
2. `Transcript`-Modell auf vorhandenes `updatedAt`-Feld prüfen (aktuell laut Schema nicht
   gelistet) — sonst `daysSinceLastUse` für `media` grob über `createdAt` annähern.
3. Exakte Tailwind-Klassen für den hervorgehobenen Slot (Konsistenz mit bestehenden
   Card-Varianten im Dashboard).
