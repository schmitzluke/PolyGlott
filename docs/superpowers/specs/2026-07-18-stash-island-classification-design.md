# Design: Automatische Insel-Zuordnung für eigene Sätze (Stash-Klassifikation)

## Problem

Nutzer sprechen eigene Sätze über den Voice-Capture-Flow ein (`StashSentence`). Diese Sätze landen aktuell komplett ohne Zusammenhang — keine Verknüpfung zu einer Insel (`IslandPack`), kein thematischer Kontext. Dadurch fehlt dem Gehirn beim Wiederholen die Assoziation ("dieser Satz gehört zu Thema X"), und die App fühlt sich an diesem Punkt trocken/strukturlos an.

## Ziel

Jeder fertig übersetzte eigene Satz wird automatisch — ohne Nutzer-Interaktion — einer Insel zugeordnet:

- passt er thematisch zu einer bestehenden Insel (kuratiert oder eigen), wird er dort eingehängt
- passt er zu keiner bestehenden Insel, aber es sammeln sich genug thematisch verwandte eigene Sätze, wird daraus eine neue Insel gebildet

Der Satztext selbst wird dabei nie verändert — nur die Zuordnung entsteht neu.

## Datenmodell

`prisma/schema.prisma`:

- `StashSentence`
  - neues Feld `islandPackId String?` mit FK auf `IslandPack`
  - neues Feld `classificationStatus` (Enum: `UNASSIGNED` | `ASSIGNED`), Default `UNASSIGNED`
  - Kandidaten für den Klassifikations-Job: `status = "READY"` und `classificationStatus = "UNASSIGNED"`
- `IslandPack`
  - neues Feld `isCustom Boolean @default(false)` — unterscheidet kuratierte Seed-Inseln von durch den Klassifikations-Job neu erzeugten Inseln (steuert nur, ob eine Insel zusätzlich unter "Meine Sammlungen" gelistet wird — sonst keine funktionale Sonderbehandlung)

Migration: additiv, keine bestehenden Daten betroffen (alle bestehenden `StashSentence`-Zeilen starten als `UNASSIGNED`).

## Klassifikations-Job

Neue Datei `src/lib/stashClassifierWorker.ts`, analog zum bestehenden Muster in `stashWorker.ts` / `mediaWorker.ts` (DeepSeek via `askOpenAICompatible`).

**Trigger:** `node-cron` im laufenden Next.js-Server-Prozess, täglich nachts (z. B. 03:00). Kein separater Container, keine Docker-Compose-Änderung nötig.

**Ablauf pro Lauf:**

1. Alle `StashSentence` mit `status="READY"` und `classificationStatus="UNASSIGNED"` laden, gruppiert nach `userId`.
2. Pro Nutzer, falls Kandidaten vorhanden:
   - Liste aller existierenden `IslandPack`-Titel (kuratiert + eigene) zusammenstellen.
   - Ein DeepSeek-Call mit den offenen Sätzen + der Insel-Liste. Prompt fordert JSON-Antwort: pro Satz entweder
     - `{ sentenceId, existingIslandSlug }` (passt zu bestehender Insel), oder
     - `{ sentenceId, newTopicLabel }` (kein passendes bestehendes Thema).
3. Sätze mit `existingIslandSlug`: sofort `islandPackId` setzen, `classificationStatus="ASSIGNED"`.
4. Sätze mit `newTopicLabel`: nach Label gruppieren.
   - Gruppen mit **mindestens 3 Sätzen** desselben Labels: neue `IslandPack` anlegen (`isCustom=true`, Titel = Label), alle Sätze der Gruppe zuordnen, `classificationStatus="ASSIGNED"`.
   - Gruppen unter 3 Sätzen: bleiben `UNASSIGNED`, werden beim nächsten Lauf erneut berücksichtigt (können dann mit neu hinzugekommenen Sätzen die Schwelle erreichen).
5. Kein Review-Schritt, keine Notification — Fehler im Job werden geloggt, betroffene Sätze bleiben `UNASSIGNED` und werden beim nächsten Lauf erneut versucht.

## UI

- Zugeordnete eigene Sätze erscheinen **ununterscheidbar** zwischen den bestehenden Sätzen einer Insel — kein Badge, keine visuelle Sonderkennzeichnung.
- Neue Custom-Inseln (`isCustom=true`) erscheinen sowohl in der normalen Themen-Übersicht (wie kuratierte Inseln) **als auch** zusätzlich unter "Meine Sammlungen".
- Kein Bestätigungs-/Review-Schritt für den Nutzer.

## Out of Scope (bewusst vertagt)

- SRS-Session-Limit (aktuell müssen alle fälligen Karten in einer Runde gemacht werden) — eigenständiges Thema, eigener späterer Spec-Durchgang.
- Geführter Trainingspfad über alle Inseln (Reihenfolge-Empfehlung) — wird erst nach Testen dieses Features bewertet; falls sich der Einstieg weiterhin "ins kalte Wasser geworfen" anfühlt, folgt ein eigener Spec.
- Embeddings/Vektor-Matching — bewusst nicht gewählt, DeepSeek-Direktklassifikation reicht für die aktuelle Datenmenge (~50-60 Sätze) und nutzt bestehendes Pattern ohne neue Infrastruktur.
