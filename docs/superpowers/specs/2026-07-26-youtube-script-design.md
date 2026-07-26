# YouTube-Skript-Feature — Design

Erweiterung des bestehenden Media-Comprehension-Features (`(app)/media`): statt nur rohen Text
zu pasten, kann der Nutzer einen YouTube-Link einfügen. Er bekommt vorab das Skript (Original-
Untertitel) zu lesen, kann unbekannte Wörter per Klick übersetzen lassen (DeepL), merkt sie sich
optional für die SRS-Queue, und muss danach ein Kernsätze-Quiz bestehen, bevor er als "verstanden"
markieren kann.

## 1. Input & Datenmodell

- `/media`-Formular bekommt zusätzlich ein URL-Feld für YouTube-Links (neben dem bestehenden
  Text-Paste-Feld — beide Wege bleiben nutzbar).
- Neue Route `POST /api/media/youtube`: nimmt `{title?, url}`, extrahiert Video-ID aus der URL,
  holt Untertitel via `youtube-transcript` (npm-Paket, kein API-Key nötig, liest den Caption-Track
  direkt von YouTube aus).
- **Nur Videos mit vorhandenen Untertiteln werden akzeptiert** (egal ob manuell oder
  auto-generiert — keine Unterscheidung in v1). Kein Track gefunden → 400 mit Fehlermeldung
  "Kein Transkript für dieses Video verfügbar.", kein `Transcript`-Eintrag wird angelegt.
- Zusammengesetzter Untertiteltext wird als `rawText` gespeichert — restliche Pipeline
  (`processTranscript` / DeepSeek-Kernsätze-Extraktion, Status PENDING→READY→FAILED) bleibt
  identisch zum bestehenden Text-Paste-Weg.
- Schema-Erweiterung `Transcript`: `youtubeUrl String?`, `videoId String?` (beide nullable —
  Text-Paste-Einträge lassen sie leer).

## 2. Video-Anzeige & Skript-Lesen (Pre-Input-Phase)

- Wenn `Transcript.videoId` gesetzt ist, zeigt `/media/[id]` (Status READY) eine neue
  Skript-Lese-Ansicht **vor** dem bestehenden Karteikarten-Quiz:
  - Eingebettetes YouTube-Video oben (`<iframe src="https://www.youtube-nocookie.com/embed/{videoId}">`).
  - Komplettes Original-Skript (`rawText`) darunter als fließender Text, in einzelne klickbare
    Wörter zerlegt (Whitespace-Split, Satzzeichen abgetrennt).
  - Button "Weiter zum Quiz" führt in den bestehenden `MediaStudyPlayer`-Flow.
- Text-Paste-Einträge (kein `videoId`) überspringen diese Ansicht wie bisher direkt zum Quiz.

## 3. Wort-Klick-Übersetzung (DeepL)

- Klick auf ein Wort im Skript öffnet ein Popover mit der deutschen Übersetzung.
- Neue Route `POST /api/media/translate-word`: `{word}` → DeepL-API (Free-Tier,
  `https://api-free.deepl.com/v2/translate`, Ziel-Sprache Deutsch, Quell-Sprache Türkisch),
  `DEEPL_API_KEY` env-Var. Kein DB-Caching der Übersetzung (Free-Tier-Kontingent reicht für
  Einzelwort-Lookups).
- Popover zeigt Übersetzung + Button "Merken" (siehe Abschnitt 4).

## 4. Unbekannte Wörter merken → Stash/SRS

- Klick "Merken" im Popover legt einen `StashSentence`-Eintrag an (`germanOriginal` = DeepL-
  Übersetzung, `turkishTranslation` = angeklicktes Wort), Status direkt `"READY"` (Übersetzung
  liegt schon vor, kein Worker-Fire-and-forget nötig).
- Bestehender Mechanismus erzeugt daraus automatisch ein `ReviewItem` → landet in der normalen
  FSRS-Review-Queue, kein neues Modell/keine Sonderlogik nötig.

## 5. Quiz + Verständnis-Abschluss

- Unverändert: bestehender `MediaStudyPlayer` (Kernsätze-Karteikarten, Active-Recall) läuft nach
  der Skript-Lese-Phase genau wie bisher. "Als verstanden markieren" (`comprehended`-Flag) bleibt
  unverändert.

## Fehlerfälle

- YouTube-URL ungültig / keine Video-ID extrahierbar → 400 "Ungültiger YouTube-Link."
- Kein Untertitel-Track verfügbar → 400 "Kein Transkript für dieses Video verfügbar."
- `DEEPL_API_KEY` fehlt → Wort-Übersetzung liefert 503, Popover zeigt Fehlermeldung statt
  Übersetzung (Skript bleibt trotzdem lesbar).

## Out of Scope (v1)

- Unterscheidung manuell vs. auto-generierte Untertitel.
- Whisper/Audio-Fallback wenn keine Untertitel vorhanden.
- Phrasen-/Mehrwort-Markierung (nur Einzelwort-Klick).
- Caching von DeepL-Übersetzungen in der DB.
