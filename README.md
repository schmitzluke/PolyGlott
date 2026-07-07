# Bubbel 🗨️ – Sprachlern-App (Babbel-inspiriert)

Eine Fullstack-Sprachlern-Web-App mit kurzen, interaktiven Lektionen, echten Dialogen,
Spaced Repetition (SM-2), Aussprache-Training und Gamification.
**Start-Sprachpaar: Deutsch → Türkisch (A1)** – weitere Sprachpaare sind rein über Daten ergänzbar.

## Schnellstart

```bash
cd bubbel
npm install
cp .env.example .env
npm run setup
npm run dev
```

(`cp` kopiert die Beispiel-Secrets – für lokal reichen die Defaults. `npm run setup` = `prisma db push` + Seed.
Danach läuft die App auf http://localhost:3000. Hinweis: Kommandos ohne angehängte `#`-Kommentare eintippen –
zsh auf macOS interpretiert diese sonst als Teil des Befehls.)

**Demo-Login:** `demo@bubbel.app` / `demo1234` (oder eigenes Konto registrieren)

```bash
npm test                    # Unit- & Integrationstests (SM-2, XP/Streak, Lern-Flow)
npm run build               # Produktions-Build
```

## Tech-Stack & Entscheidungen

| Bereich | Wahl | Warum |
|---|---|---|
| Frontend + Backend | **Next.js 14 (App Router, TS)** | Ein Deployment, Server Components für Reads, API-Routes für Mutationen |
| Styling | **Tailwind CSS** mit zentralem **Design-Token-System** (`tailwind.config.ts`) | Single Source of Truth für Farben/Radien/Typo, WCAG-AA-Kontraste (`brand-600` für Text) |
| State | **Zustand** (Lesson-Player) | Minimaler Client-State, Rest kommt vom Server |
| DB | **Prisma + SQLite** (Default) | Sofort lauffähig ohne Setup. Postgres: in `prisma/schema.prisma` `provider = "postgresql"` setzen + `DATABASE_URL` ändern – das Schema ist kompatibel |
| Auth | **NextAuth** – Credentials (bcrypt) + Google (aktiviert sich automatisch, wenn `GOOGLE_CLIENT_ID/SECRET` gesetzt sind) | JWT-Sessions, serverseitiger Fortschritt pro User → Sync über Geräte |
| Speech | **Web Speech API** (TTS + STT) hinter Wrapper `src/lib/speech.ts` | Graceful Fallback ohne Mikro/Browser-Support; externer STT/TTS-Dienst später einfach austauschbar |
| Payment | Stub (`/api/premium`, Testmodus) | Paywall-UI komplett, kein echter Zahlungsdienst |

## Ordnerstruktur

```
bubbel/
├── content/de-tr-a1.ts        # Kursdaten (Units → Lektionen → Übungen) – reine Daten!
├── prisma/schema.prisma       # Datenmodell (User, Course…Exercise, ReviewItem/SM-2, Streak, XP, Achievements)
├── prisma/seed.ts             # Seed: Kurse + Achievements + Demo-User
├── tests/                     # Vitest: sm2, gamification, lessonFlow (Integration)
└── src/
    ├── lib/                   # Kern-Logik (pure, getestet): sm2, gamification, answers, speech, auth, achievements
    ├── store/lessonStore.ts   # Zustand-Store für den Lesson-Player
    ├── components/
    │   ├── ui/                # Komponentenbibliothek: Button, Card, ProgressBar, ChoiceChip,
    │   │                      #   AudioButton, MicButton, StreakFlame, XPBadge
    │   ├── exercises/         # 8 Übungstypen: VocabMatch, MultipleChoice, GapFill, SentenceOrder,
    │   │                      #   Translation, Listening, Dialogue, Pronunciation
    │   └── LessonPlayer.tsx   # Übungs-Screen-Muster: Progressbar oben, Aufgabe Mitte, Feedback-Leiste unten
    └── app/
        ├── (auth)/            # Login, Registrierung
        ├── (app)/             # Dashboard, Kurse/Lernpfad, Review, Profil, Settings, Paywall, Leaderboard, Onboarding
        ├── lessons/[id]/      # Lesson-Player (eigenes Layout ohne Navigation)
        └── api/               # register, onboarding, lessons/[id]/complete, reviews (SM-2), settings, premium
```

## Wie die Didaktik umgesetzt ist (Babbel-Methode)

Jede Lektion folgt einer festen Dramaturgie (siehe `content/de-tr-a1.ts`):
Intro (Lernziel + Situation) → neue Wörter mit Audio → kontrolliertes Üben (Zuordnen, Multiple Choice)
→ aktive Produktion (Lückentext, Satzbau, Tippen, Aussprache) → **Dialog/Rollenspiel** in der Zielsituation
→ expliziter Grammatik-/Kulturtipp (erst NACH dem impliziten Entdecken) → Abschluss-Screen mit Übergabe
aller Vokabeln an die Spaced Repetition. Spätere Lektionen recyceln bewusst Wörter und Strukturen
früherer Lektionen (z. B. taucht „Adın ne?“ aus Lektion 2 im Dialog von Lektion 3 wieder auf).

## Spaced Repetition (SM-2)

`src/lib/sm2.ts` implementiert den SuperMemo-2-Algorithmus: pro Vokabel werden Ease-Faktor,
Intervall, Wiederholungszähler und Fälligkeitsdatum gespeichert (`ReviewItem`).
Nach Lektionsabschluss sind alle neuen Vokabeln sofort fällig; im „Wiederholen“-Bereich bewertest du
mit *Nochmal (1) / Schwer (3) / Gut (4) / Einfach (5)* – daraus berechnet SM-2 die nächste Fälligkeit.
Das Dashboard erinnert täglich an fällige Reviews.

## Gamification

XP pro richtiger Übung (+5), Lektions-Bonus (+20), Perfekt-Bonus (+10), Review (+3).
Level = quadratische XP-Kurve. Tages-Streak mit konfigurierbarem Tagesziel und
**Streak-Freeze** (rettet genau einen verpassten Tag). Abzeichen (7-Tage-Streak, 100 Vokabeln …),
XP-Chart & Streak-Kalender im Profil, wöchentliches Leaderboard.

## Konversationsmodus (Bot-Chat)

Unter „Konversation“ sprichst du frei mit einem Claude-basierten Gesprächspartner in
8 Szenarien (Café, Markt, Hotel, Arzt, Vorstellungsgespräch …). Der Bot antwortet auf
Türkisch in deinem Niveau, korrigiert Fehler sanft und wechselt kurz ins Deutsche, wenn
du auf Deutsch fragst. Am Ende gibt es Feedback + XP.

**Setup – drei Optionen (eine reicht):**

- **Kostenlos & empfohlen (Gemini):** Key auf https://aistudio.google.com erstellen und in
  `.env` als `GEMINI_API_KEY` eintragen. Großzügiger Gratis-Tarif (~1500 Anfragen/Tag, keine
  Kreditkarte) und deutlich weniger Türkisch-Fehler als Llama.
- **Kostenlos (Groq/Llama):** `GROQ_API_KEY` von https://console.groq.com. Schnell, aber bei
  Türkisch-Erklärungen fehleranfälliger.
- **Beste Qualität (Claude):** `ANTHROPIC_API_KEY` von https://console.anthropic.com
  (Guthaben ab 5 $, ~1–3 Cent pro Gespräch). Empfehlung für den Lektions-Generator.

Automatische Auswahl: Anthropic → Gemini → Groq (überschreibbar mit `LLM_PROVIDER`).
Nach dem Eintragen Server neu starten. Ohne Key zeigt der Chat einen Hinweis – der Rest
der App läuft normal. Neue Szenarien: einfach in `content/scenarios.ts` ergänzen.

## Wortschatz-Trainer: die 520 wichtigsten Wörter & Phrasen

Fest eingebaut (kein API-Key nötig): `content/frequency-tr.ts` enthält die 520 wichtigsten
türkischen Wörter und Alltagssätze, kuratiert in 26 Themenblöcken. Der Trainer
(Dashboard → „Wortschatz-Trainer“) teilt sie in 52 Packs à 10 Wörter: kurze Einführung mit
Audio, dann ~16 spielerische Übungen (Multiple Choice, Zuordnen, Hören, Tippen) pro Pack.
Jedes gelernte Wort wandert automatisch in die SM-2-Wiederholung – Trainer, Lektionen und
Konversationsmodus füttern dasselbe System. Neue Wörter: einfach in der Datei ergänzen und
`npm run db:seed` ausführen.

## Wirklich Niveaus erreichen: Lehrplan, Umfang & Niveau-Tests

Der komplette CEFR-Lehrplan bis B1 ist maschinenlesbar in `content/curriculum.ts` definiert
(A1: 12 Lektionen, A2: 15, B1: 15 – dazu Konversationsmodus für freies Sprechen).
Alle noch fehlenden Lektionen baust du mit **einem Befehl** aus:

```bash
npm run generate:curriculum        # generiert alle fehlenden Lektionen (~30, wenige €)
npm run generate:curriculum -- --level B1 --limit 5   # gezielt/portionsweise
npm run db:seed                    # in die Datenbank übernehmen
```

Der Batch-Generator ist resumierbar (bricht ein Lauf ab, einfach neu starten), validiert
jede Lektion automatisch auf Lösbarkeit und recycelt den bereits gelernten Wortschatz.

**Niveau-Tests:** Wer alle Lektionen eines Kurses abgeschlossen hat, schaltet in der
Kursübersicht den Abschlusstest frei: 15 zufällig gemischte Aufgaben quer durch den Kurs,
**85 % zum Bestehen**. Bestanden = Level-Abzeichen, +50 XP, das Profil-Niveau steigt
(A1 → A2 → B1), und es gibt einen Zertifikat-Screen. Ehrlicher Hinweis, der auch in der App
steht: amtlich anerkannte Zertifikate vergeben nur akkreditierte Prüfstellen (z. B. telc
Türkçe, TÖMER) – Bubbel bereitet CEFR-orientiert darauf vor.

## Der Weg zu B1: Lektions-Generator

A1 und A2 sind handgeschrieben. Für den Rest bis B1 gibt es einen Generator, der per
Claude-API neue Lektionen im exakten Datenformat erzeugt und automatisch auf Lösbarkeit
validiert (`src/lib/validateLesson.ts` – dieselben Regeln wie die Tests):

```bash
npm run generate -- --course tr-b1-selbststaendig --level B1 \
  --unit "Pläne & Zukunft" --title "Meine Pläne fürs Wochenende" \
  --topic "Futur -acak einführen; yarın, gelecek hafta; Pläne erzählen und erfragen"
npm run db:seed   # übernimmt die validierte Lektion in die Datenbank
```

Der komplette Lehrplan A2→B1 (Units, Themen, Grammatikprogression, fertige
Generator-Aufrufe) steht in **`content/curriculum-b1.md`**. Der Seed ist idempotent:
unveränderte Kurse werden übersprungen, dein Lernfortschritt bleibt erhalten
(`FORCE_SEED=1 npm run db:seed` erzwingt Neuaufbau).

## So legst du eine neue Lektion / ein neues Sprachpaar an

**Neue Lektion:** In `content/de-tr-a1.ts` im passenden Unit ein weiteres `SeedLesson`-Objekt ergänzen
(Schema: `src/lib/types.ts` – pro Übungstyp ein klar definiertes Content-Format, z. B.
`{ type: "sentence_order", content: { prompt, tokens, solution, translation, audioText } }`).
Danach `npm run db:seed`. Kein Code nötig.

**Neues Sprachpaar:** Neue Datei `content/<quelle>-<ziel>-<level>.ts` nach dem Vorbild anlegen,
`SeedCourse` exportieren und in `content/de-tr-a1.ts` zum `allCourses`-Array hinzufügen (bzw. Import in
`prisma/seed.ts` erweitern). Für TTS/STT den Sprachcode in `LANG_TAGS` (`src/lib/speech.ts`) ergänzen.
Der Integrationstest `tests/lessonFlow.test.ts` validiert automatisch, dass alle neuen Übungen lösbar sind.

**Inhaltliche Regeln** (werden vom Test teilweise erzwungen): 8–12 Übungen pro Lektion, mindestens
ein Dialog, alltagsnahe ganze Sätze, Grammatik erst implizit im Kontext, dann als kurzer Tipp,
Recycling früherer Vokabeln.

## Barrierefreiheit & Design

Design-Tokens mit AA-Kontrasten, sichtbare Fokus-Ringe, `prefers-reduced-motion` wird respektiert,
Touch-Targets ≥ 44 px, ARIA-Labels auf Progressbars/Audio-Buttons, semantische Farben
(Grün = richtig, Rot = falsch, Blau = Info).

## Bekannte Grenzen (bewusste Scope-Entscheidungen)

- Zahlung ist ein Stub (Testmodus), Benachrichtigungen sind ein Einstellungs-Flag (kein Push-Dienst).
- Web Speech API: STT funktioniert am besten in Chrome; überall sonst greift der Fallback.
- Audio ist TTS-generiert; echte Sprecher-Aufnahmen wären der nächste Schritt (`audioUrl`-Feld ist im Schema vorgesehen).
