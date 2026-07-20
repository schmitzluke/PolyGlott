# Active Recall für Review-Karteikarten

Status: Design approved, 2026-07-20.

## Problem

`ReviewSessionClient.tsx` (Karteikarten-Engine für `/review`, Insel-Sessions und
Story-Sessions) zeigt einen deutschen Satz und einen "Antwort zeigen"-Button — reines
Wiedererkennen, kein aktives Erinnern. Der Wortschatz-Trainer (`TrainerPlayer.tsx`)
nutzt seit 2026-07-16 striktes Active Recall (Textinput + Speech, `scorePronunciation`
gegen Levenshtein-Distanz, Rating-Vorschlag), das Phase-4-Ziel der Refactoring-Roadmap
war, diesen Ansatz auf die FSRS-Review-Sessions zu übertragen.

Audio Flooding (ursprünglich als zweiter Phase-4-Baustein geführt) ist über den
bestehenden Commute Mode bereits umgesetzt — kein offener Punkt mehr.

## Scope

`ReviewSessionClient.tsx` global ändern. Wirkt automatisch auf alle Verbraucher:
`/review` (globale Queue), `/islands/[theme]/[slug]/practice`,
`/islands/[theme]/[slug]/stories/[storyId]/practice` — alle teilen sich die Komponente,
kein separater Code-Pfad nötig.

## Design

### Ablauf pro Karte

1. Deutscher Quellsatz (`current.source`) wird gezeigt, wie bisher.
2. Statt "Antwort zeigen": Textinput + Mikro-Button (STT, wenn `sttAvailable()`),
   analog `TrainerPlayer.tsx`. Leere Eingabe blockt Submit (`disabled={!answer.trim()}`).
3. Bei Submit (Enter oder Prüfen-Button) oder erfolgreichem Voice-Input:
   `checkAnswer(text)` ruft `scorePronunciation(current.target, text)` auf, setzt
   `score` + `revealed = true`.
4. Reveal-Ansicht (bestehend, erweitert): Zielsatz + `AudioButton` (unverändert),
   zusätzlich Nutzerantwort + Treffer-% (Muster aus `TrainerPlayer.tsx` Zeilen 256–277).
5. Die 4 bestehenden Grade-Buttons (`GRADES`-Array, unverändert in Funktion/Position)
   bekommen einen visuellen Marker (Ring/Highlight) auf dem von `suggestRating(score)`
   vorgeschlagenen Rating — Nutzer kann frei überstimmen, kein Zwang.

### Neuer Helper: `suggestRating`

Aktuell nur lokal in `TrainerPlayer.tsx` definiert (Zeilen 24–29). Wird nach
`src/lib/fsrs.ts` verschoben (neben `RATING_CONFIG`, das bereits dort lebt) und aus
beiden Komponenten importiert — vermeidet Duplikat.

```ts
// src/lib/fsrs.ts
export function suggestRating(score: number): Grade {
  if (score >= 90) return Rating.Easy;
  if (score >= 70) return Rating.Good;
  if (score >= 40) return Rating.Hard;
  return Rating.Again;
}
```

`TrainerPlayer.tsx` wird auf den Import umgestellt (lokale Kopie entfernt) — einzige
Änderung an dieser Datei, sonst unangetastet.

### State-Erweiterungen in ReviewSessionClient

Neue lokale States: `answer: string`, `score: number | null`, `isRecording: boolean`.
`revealed` bleibt Bool wie bisher, steuert weiterhin Grade-Buttons-Sichtbarkeit.
Reset bei Kartenwechsel (`grade()`-Funktion): `answer`/`score` mit zurücksetzen,
zusätzlich zum bestehenden `setRevealed(false)`.

### Wiederverwendung

`normalize`, `recognizeOnce`, `scorePronunciation`, `sttAvailable` aus `src/lib/speech.ts`
— bereits vorhanden, keine Änderung nötig. Kein neuer STT-Fallback-Code, gleiches
Graceful-Degradation-Verhalten wie Trainer (Mikro-Button nur wenn `sttAvailable()`).

### Nicht im Scope

- Kein Opt-out/Toggle zwischen Reveal- und Recall-Modus (Entscheidung: global).
- Keine Änderung an FSRS-Logik, API-Routen, oder Grading-Persistenz.
- Kein neuer Audio-Flooding-Code (bereits durch Commute Mode abgedeckt).

## Testing

Bestehende Komponente hat keine dedizierten Unit-Tests (Client-Component, UI-lastig).
Verifikation manuell im Browser: `/review`, eine Insel-Practice-Session, eine
Story-Session — Texteingabe, Voice-Input (wo verfügbar), Score-Anzeige, Rating-Vorschlag,
Kartenwechsel-Reset prüfen.
