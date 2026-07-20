# Design: Insel-Übungs-Redesign (Erzählungen + Karteikarten + insel-eigenes SRS)

## Problem

Das aktuelle Insel-Detail (`IslandDetailClient.tsx`) zeigt eine flache Liste mit immer sichtbarer Übersetzung — das untergräbt Active Recall (den Kernmechanismus, den die App an anderer Stelle bereits propagiert: erst selbst erinnern, dann Lösung aufdecken). Referenzscreenshots einer anderen App zeigen ein Muster, das besser zum Ziel "wie ein Schauspieler ganze Sätze/Absätze auswendig lernen" passt: pro Insel gibt es (a) einzelne Sätze und (b) kurze, zusammenhängende Mini-Geschichten ("Erzählungen"), beide als Karteikarten mit Tap-to-Reveal übbar. Außerdem ist das globale `/review` eine einzige gemischte Warteschlange über alle Inseln — das widerspricht dem Wunsch nach überschaubaren, insel-weisen Lern-Häppchen.

## Ziel

1. Insel-Detail wird ein Auswahlbildschirm (Sätze / Erzählungen) statt offener Liste.
2. Neuer Content-Typ "Erzählungen": zusammenhängende Mini-Geschichten (mehrere Sätze in fester Reihenfolge), strukturell getrennt von den normalen Einzelsätzen. In diesem Spec nur die Datenstruktur — tatsächliche Geschichten-Inhalte sind ein eigener, späterer Durchgang.
3. Übungs-Sessions sind pro Insel und pro Content-Typ scoped (nicht mehr nur global gemischt), nutzen aber die bestehende FSRS-Karteikarten-Engine (Anki-artiges Grading: Nochmal/Schwer/Gut/Einfach) statt eines simplen Sterne-Self-Ratings.
4. Globales `/review` bleibt unverändert als "alles Fällige"-Ansicht zusätzlich bestehen.

Explizit **nicht** Teil dieses Specs: tatsächliche Geschichten-Texte erstellen/generieren, Erhöhung des allgemeinen Content-Volumens (eigener, späterer Spec), Zusammenlegen der A1-B2-Kursinhalte (aus dem vorherigen Brainstorming-Anlauf verworfen zugunsten dieses Redesigns).

## Datenmodell: Erzählungen

Neue, von `IslandSentence` getrennte Tabellen:

```prisma
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

`ReviewItem` bekommt ein drittes optionales Feld `islandStorySentenceId` (analog zu den bestehenden `stashSentenceId`/`islandSentenceId`), inklusive `@@unique([userId, islandStorySentenceId])`.

Eine Insel ohne Erzählungen ist ein valider Zustand (leere Liste) — Content wird nicht in diesem Spec erstellt.

## Insel-Detail UI

Ersetzt die aktuelle offene Satzliste durch einen Auswahlbildschirm (Vorbild: Referenz-Screenshot "Tagesablauf"):

- Kachel "Sätze" (Anzahl der `IslandSentence`/`StashSentence`/`IslandStorySentence`-losen Einzelsätze dieser Insel) → führt zur Sätze-Übungs-Session.
- Kachel "Erzählungen" (Anzahl der `IslandStory`-Einträge) → nur sichtbar, wenn > 0. Führt zu einer Liste einzelner Geschichten (Titel + Satzanzahl); Antippen einer Geschichte startet ihre Übungs-Session.
- "Insel üben"-Button (nur bei kuratierten, nicht-Custom-Inseln, siehe unten) bleibt oben bestehen.

## Übungs-Session (Karteikarten, insel-eigenes SRS)

- Die bestehende Karteikarten-Engine aus `/review/page.tsx` (Karte anzeigen → "Antwort zeigen" → 4-stufiges FSRS-Grading Nochmal/Schwer/Gut/Einfach, Runden-Logik) wird in eine wiederverwendbare Komponente extrahiert, die eine API-URL als Parameter entgegennimmt statt sie hart zu kodieren.
- `/api/reviews` (GET) bekommt optionale Query-Parameter:
  - `islandPackId` — schränkt die Auswahl auf Sätze dieser Insel ein (über `stashSentence.islandPackId`, `islandSentence.packId` oder `islandStorySentence.story.packId`).
  - `contentType=sentences|stories` — wählt zwischen Einzelsätzen und Erzählungs-Sätzen.
  - `storyId` — schränkt bei `contentType=stories` zusätzlich auf eine einzelne Geschichte ein.
- Neue Routen:
  - `/islands/[theme]/[slug]/practice` — Sätze-Session dieser Insel.
  - `/islands/[theme]/[slug]/stories` — Liste der Geschichten dieser Insel.
  - `/islands/[theme]/[slug]/stories/[storyId]/practice` — Session für eine einzelne Geschichte.
- Globales `/review` bleibt unverändert bestehen (weiterhin insel-übergreifend, alles Fällige) — die neuen insel-eigenen Sessions sind eine Ergänzung, kein Ersatz.

## Join-Flow für Story-Sätze

Der bestehende "Insel üben"-Button (`POST /api/islands/[packId]/join`) erstellt aktuell `ReviewItem`s nur für `IslandSentence`. Er wird erweitert: erstellt zusätzlich (idempotent, wie bisher — überspringt bereits vorhandene) `ReviewItem`s für alle `IslandStorySentence`s dieser Insel. Für Custom-Inseln (`isCustom=true`) bleibt der Button weiterhin ausgeblendet, da deren Sätze schon beim Erstellen ein `ReviewItem` bekommen (`stashWorker.ts`).

## Out of Scope (bewusst vertagt)

- Tatsächliche Erzählungs-Inhalte (Geschichten schreiben/generieren) — eigener, späterer Spec.
- Content-Volumen generell (mehr Sätze pro Insel, A2/B1/B2-Kursinhalte einbinden) — eigener, späterer Spec; der ursprüngliche Merge-Ansatz aus diesem Brainstorming-Anlauf wurde zugunsten dieses Redesigns zurückgestellt.
- SRS-Session-Limit (bereits in [2026-07-18-stash-island-classification-design.md](2026-07-18-stash-island-classification-design.md) als eigenständiges Thema vermerkt) — durch insel-eigene Sessions in diesem Spec teilweise entschärft (kleinere, thematisch fokussierte Häppchen statt einer globalen Riesen-Warteschlange), aber ein explizites Limit pro Runde bleibt ein separates, noch offenes Thema.
