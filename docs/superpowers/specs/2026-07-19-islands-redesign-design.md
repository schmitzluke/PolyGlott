# Design: Insel-UI-Redesign (Themen-Navigation + Satzliste)

## Problem

Die Insel-Ansicht ist eine flache, ungruppierte Liste (`IslandsPageClient.tsx`) — alle Karten sehen gleich aus (gleiches Icon), keine thematische Struktur, kein Weg für den Nutzer, die Sätze innerhalb einer Insel vorab einzusehen. Es fehlt außerdem eine Verbindung zu Custom-Inseln (aus eigenen eingesprochenen Sätzen, siehe [2026-07-18-stash-island-classification-design.md](2026-07-18-stash-island-classification-design.md)) — die tauchen in der aktuellen Liste unstrukturiert zwischen kuratierten Inseln auf.

## Ziel

Eine zweistufige Themen-Navigation (Themen-Grid → Insel-Liste → Insel-Detail mit Satzliste), angelehnt an eine bereits abgestimmte Referenz-Optik (Screenshot-Vorlage: Themen-Kacheln mit Icon/Badge/Anzahl). Nutzer soll für jede wichtige Alltags-Situation ein passendes Thema finden und vor dem Üben sehen können, welche Sätze in einer Insel stecken und wie gut er sie schon kann.

Explizit **nicht** Teil dieses Specs: welche konkreten Inseln/Situationen inhaltlich fehlen (das ist ein eigener, späterer Content-Abdeckungs-Durchgang).

## Datenmodell: Themen-Taxonomie

- `IslandPack` bekommt ein neues Pflichtfeld `theme: String` mit fester Start-Taxonomie (8 Kategorien, angelehnt an die Referenz-Vorlage):
  `grundlagen`, `familie-beziehungen`, `haushalt-alltag`, `soziale-interaktionen`, `hobbys`, `arbeit`, `reisen-ausland`, `essen-shoppen`.
- Bestehende kuratierte Inseln (aus `prisma/seed.ts` / `content/*.ts`) bekommen per einmaligem Backfill-Skript ein Thema zugewiesen (KI-gestützte Einordnung anhand Titel/Sätze, analog zum bestehenden DeepSeek-Klassifikationsmuster).
- Custom-Inseln: der bestehende nächtliche Klassifikations-Job (`stashClassifierWorker.ts` / `stashClassifier.ts`) wird erweitert — der DeepSeek-Prompt liefert zusätzlich zu `existingIslandSlug`/`newTopicLabel` ein `theme`-Feld aus der festen 8er-Liste. Neu erzeugte `IslandPack`-Zeilen bekommen dieses Thema direkt gesetzt.

## Navigation (drei Ebenen)

- `/islands` — Themen-Grid: 8 Kacheln (Icon, Titel, Anzahl Inseln je Thema). Ersetzt die heutige flache Liste als Einstiegspunkt.
- `/islands/[theme]` — Insel-Liste innerhalb des gewählten Themas. Wiederverwendet das bestehende Card-Layout aus `IslandsPageClient.tsx`, aber gefiltert auf `theme`.
- `/islands/[theme]/[slug]` — Insel-Detail: Satzliste mit Status-Indikator pro Satz (siehe unten) plus "Insel üben"-Button oben, der wie bisher in den Übungsflow (`join`/Review) führt.

Die Card-Komponente aus Ebene 2 wird nicht neu geschrieben, nur um die Theme-Filterung ergänzt.

## Satzliste + Status-Ableitung

- Es gibt keine literalen Sterne in der Datenbank — nur FSRS-Felder (`ReviewItem.state`, `ReviewItem.stability`), ein separates Hören/Abruf-Tracking existiert trotz anderslautender Hilfetexte nicht im Code. Ein kombinierter Indikator pro Satz ist daher sowohl gewünscht als auch die einzig sinnvolle Option.
- Abgeleitete 5-Stufen-Skala pro Satz (kein neues DB-Feld, rein berechnet zur Anzeigezeit):
  - kein `ReviewItem` vorhanden → 0/5
  - `state = 0` (New) → 0/5
  - `state = 1` (Learning) → 1/5
  - `state = 3` (Relearning) → 2/5
  - `state = 2` und `stability < 7` Tage → 3/5
  - `state = 2` und `stability < 21` Tage → 4/5
  - `state = 2` und `stability ≥ 21` Tage → 5/5 (deckungsgleich mit der bestehenden `isMastered()`/`MASTERY_STABILITY_DAYS`-Logik aus `src/lib/mastery.ts`)
- Jede Zeile zeigt deutschen Originalsatz + Übersetzung nebeneinander, plus den 5-Stufen-Indikator rechtsbündig.

## Out of Scope (bewusst vertagt)

- Inhaltliche Content-Abdeckung ("welche Situationen fehlen wirklich") — eigener, späterer Spec-Durchgang.
- SRS-Session-Limit — bereits in [2026-07-18-stash-island-classification-design.md](2026-07-18-stash-island-classification-design.md) als eigenständiges, vertagtes Thema vermerkt.
