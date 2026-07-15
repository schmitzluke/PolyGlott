# Refactoring Plan: Hyperpolyglot Active Recall App

## Architektur-Regeln (STRIKT BEACHTEN)
- Keine Lückentexte, keine Multiple-Choice-Fragen, keine Wortbanken.
- Es werden ausschließlich vollständige, grammatikalisch perfekte Sätze (Deutsch -> Türkisch) gelernt.
- Keine kostenpflichtigen TTS-APIs (ElevenLabs etc.). Ausschließlich `window.speechSynthesis` (Web Speech API) nutzen.
- Frontend: Next.js (React), TailwindCSS.
- Backend: Next.js API Routes, Prisma ORM, PostgreSQL.

## Phase 1: Datenbank (Prisma)
- Entferne alle alten Modelle für Multiple-Choice oder isolierte Vokabeln.
- Erstelle `StashSentence`: Felder für germanOriginal, turkishTranslation, status (Enum: PENDING, READY), userId.
- Erstelle `IslandPack` und `IslandSentence` für die Curated Library (vorgefertigte, verifizierte Sätze).
- Passe Relationen an (User -> StashSentences).

## Phase 2: Voice-to-Stash Pipeline (Backend & Queue)
- Implementiere eine asynchrone Queue (z.B. QStash oder Inngest) für die Background-Verarbeitung.
- Erstelle eine API-Route, die einen deutschen Satz empfängt und als `PENDING` im Stash speichert.
- Der Background-Worker sendet den Satz an die DeepSeek R1 API.
- DeepSeek R1 System Prompt: Agiere als strenger türkischer Linguist. Nutze Reasoning für Vokalharmonie, korrekte Suffixe und SOV-Satzbau. Output AUSSCHLIESSLICH als JSON: `{ "turkishTranslation": "..." }`.
- Aktualisiere nach erfolgreichem Fetch den Status in Prisma auf `READY`.

## Phase 3: Mobile Voice Capture (Frontend)
- Erstelle eine UI-Komponente für mobile Dateneingabe.
- Nutze die native `SpeechRecognition` API des Browsers für Speech-to-Text (Deutsch).
- Sende das Transkript an die API aus Phase 2.

## Phase 4: Hardcore Active Recall & Audio Flooding
- Passe die FSRS-Trainer-UI an: Zeige NUR den deutschen Satz. Keine Hilfen.
- Nutze `window.speechSynthesis`, um die türkische Lösung nach dem Aufdecken in normaler Geschwindigkeit vorzulesen (für Shadowing).
- Der Nutzer bewertet seine kognitive Leistung, was den FSRS-Algorithmus updatet.

## Phase 5: Pre-Input Roleplay
- Refactore die KI-Anruf-Komponente.
- Generiere vor dem Anruf ein Transkript basierend auf den aktuellen `READY`-Sätzen des Nutzers.
- Der System-Prompt der Call-KI erzwingt die Nutzung dieser Stash-Sätze im Gespräch und bestraft kurze Ja/Nein-Antworten.