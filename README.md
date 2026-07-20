# PolyGlott 🗨️ – Sprachlern-App (PolyGlott-inspiriert)

Eine Fullstack-Sprachlern-Web-App: Sätze aus echten Dialogen sammeln (Voice-to-Stash, kuratierte
IslandPacks), Spaced Repetition (FSRS), Wortschatz-Trainer, Konversationsmodus und Gamification.
**Start-Sprachpaar: Deutsch → Türkisch.**

## Schnellstart

```bash
cd polyglott
npm install
cp .env.example .env
npm run setup
npm run dev
```

(`cp` kopiert die Beispiel-Secrets – für lokal reichen die Defaults. `npm run setup` = `prisma db push` + Seed.
Danach läuft die App auf http://localhost:3000. Hinweis: Kommandos ohne angehängte `#`-Kommentare eintippen –
zsh auf macOS interpretiert diese sonst als Teil des Befehls.)

**Demo-Login:** `demo@polyglott.app` / `demo1234` (oder eigenes Konto registrieren)

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
polyglott/
├── content/de-tr-a1…b2.ts     # Kursdaten A1–B2 – reine Daten, seit Phase 1 NICHT mehr geseedet (s. Hinweis unten)
├── prisma/schema.prisma       # Datenmodell (User, StashSentence, IslandPack/IslandSentence, ReviewItem/FSRS, Streak, XP, Achievements)
├── prisma/seed.ts             # Seed: nur noch Achievements + Demo-User
├── tests/                     # Vitest: sm2, gamification, lessonFlow (Integration)
└── src/
    ├── lib/                   # Kern-Logik (pure, getestet): sm2, gamification, answers, speech, auth, achievements
    ├── store/lessonStore.ts   # Zustand-Store, verwaist (Lesson-Player entfernt)
    ├── components/
    │   ├── ui/                # Komponentenbibliothek: Button, Card, ProgressBar, ChoiceChip,
    │   │                      #   AudioButton, MicButton, StreakFlame, XPBadge
    │   └── exercises/         # 8 Übungstypen, verwaist (keine Lesson-DB mehr, s. Hinweis unten)
    └── app/
        ├── (auth)/            # Login, Registrierung
        ├── (app)/             # Dashboard, Review, Profil, Settings, Paywall, Leaderboard, Onboarding, Trainer
        └── api/               # register, onboarding, reviews (FSRS), settings, premium, trainer/{complete,rate}
```

> **Hinweis:** Phase 1 des Refactorings hat `Course/Unit/Lesson/Exercise/VocabItem` aus dem Schema entfernt
> (ersetzt durch `StashSentence`/`IslandPack`). Kurse, Lesson-Player, Niveau-/Abschlusstests und die
> Lektions-Generatoren aus den folgenden Abschnitten sind dadurch **gelöscht bzw. verwaist** — der
> Content-Corpus (`content/*.ts`) existiert noch, ist aber an keine lebende Route mehr angebunden.
> Details: `bubbel/CLAUDE.md` und Memory `refactoring-phase1-db`.

## Wie die Didaktik umgesetzt war (PolyGlott-Methode, historisch)

Der Content-Corpus (`content/de-tr-a1.ts` u. a.) folgt weiter einer festen Dramaturgie: Intro
(Lernziel + Situation) → neue Wörter mit Audio → kontrolliertes Üben → aktive Produktion → Dialog/
Rollenspiel → Grammatik-/Kulturtipp → Übergabe der Vokabeln an die Spaced Repetition. **Seit Phase 1
des Refactorings gibt es dafür keine lebende Lesson-Route mehr** (s. Hinweis oben) – die Dramaturgie
beschreibt weiterhin die Content-Daten selbst, nicht mehr einen In-App-Flow.

## Spaced Repetition (FSRS)

`src/lib/fsrs.ts` implementiert FSRS (Free Spaced Repetition Scheduler): pro Karte (`ReviewItem`,
hängt an einem `StashSentence` oder `IslandSentence`) werden Stability, Difficulty und Fälligkeit
gespeichert. Im „Wiederholen“-Bereich bewertest du mit *Nochmal / Schwer / Gut / Einfach* – daraus
berechnet FSRS die nächste Fälligkeit. Das Dashboard erinnert täglich an fällige Reviews.

## Gamification

XP pro richtiger Übung (+5), Lektions-Bonus (+20), Perfekt-Bonus (+10), Review (+3).
Level = quadratische XP-Kurve. Tages-Streak mit konfigurierbarem Tagesziel und
**Streak-Freeze** (rettet genau einen verpassten Tag). Abzeichen (7-Tage-Streak, 100 Vokabeln …),
XP-Chart & Streak-Kalender im Profil, wöchentliches Leaderboard.

## Community & Profile

Unter **„Community"** siehst du das XP-Leaderboard und kannst anderen Lernenden **folgen**.
Öffentliche Profile (`/users/[id]`) zeigen **Level, XP, freigeschaltete Abzeichen** und die
**erlernten Sprachen samt CEFR-Niveau**. Folgt ihr euch gegenseitig, erscheint ein
„Ihr folgt euch"-Badge; über die Follower-/Folgt-Zahlen kommst du zu den jeweiligen Listen.

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
(Dashboard → „Wortschatz-Trainer“) teilt sie in 52 Packs à 10 Wörter. **Striktes Active Recall**:
pro Karte wird nur das deutsche Wort gezeigt, die Übersetzung muss per Text oder Sprache (Mic-
Button) produziert werden – kein „Aufdecken“-Button, kein Multiple-Choice mehr. Die Antwort wird
fehlertolerant geprüft (Levenshtein + türkische Sonderzeichen-Faltung), der Score schlägt eine
FSRS-Bewertung vor. **Seit Phase 1 landen einzelne Wörter nicht mehr automatisch in der
Spaced-Repetition** (`VocabItem` gibt es im Schema nicht mehr) – die SRS-Anbindung des Trainers
ist eine offene Folgearbeit (Phase 4 laut `REFACTORINGPLAN.md`).

## Eigener Satz-Stash, Language Islands & Commute Mode

Drei Wege, den persönlichen Kartenstapel (Spaced Repetition, s. u.) zu füllen:

- **Sätze sprechen** (`/stash`): deutschen Satz einsprechen oder eintippen, DeepSeek übersetzt
  automatisch ins Türkische, landet als Karte im Stapel. CSV-Bulk-Import und manuelles
  Hinzufügen/Bearbeiten/Löschen ebenfalls hier.
- **Inseln entdecken** (`/islands`): kuratierte, redaktionell geprüfte Satz-Packs, per Themen-Grid
  navigierbar (8 Kategorien → Insel-Liste → Insel-Detail). Insel-Detail bietet Sätze und Erzählungen
  als eigene Karteikarten-Sessions (Hören/Aufdecken/Bewerten, eigene Warteschlange pro Insel statt
  einer großen globalen) – ein Tap übernimmt alle Sätze in den eigenen Stapel. Empfohlener Einstieg
  für Anfänger: garantiert lernbar, kein Warten auf eigene Aufnahmen nötig.
- **Media Comprehension** (`/media`): rohes Transkript importieren (z. B. aus einem YouTube-
  Video), DeepSeek extrahiert die 3–15 lehrreichsten Sätze wortwörtlich samt Übersetzung. Erst
  im Active-Recall-Flow lernen, dann als „verstanden“ markieren – Pre-Input-Comprehension vor
  dem eigentlichen Medienkonsum.

**Commute Mode** (`/commute`): Hands-Free-Audio-Flooding für tote Zeit (Pendeln, Abwaschen) – alle
bereits übersetzten Stash-Sätze werden in Endlosschleife vorgelesen (`window.speechSynthesis`,
kein API-Call). Umschaltbar zwischen „Nur Zuhören“ und „Shadowing“ (Pause zum Nachsprechen),
Geschwindigkeit 0.75×–1.5×, optional gemischte Reihenfolge.

## Kurse, Niveau-Tests & Lektions-Generator (entfernt seit Phase 1)

Bis Phase 1 des Refactorings gab es vier handgeschriebene Kurse A1–B2, einen Batch-/Einzel-
Lektionsgenerator (`npm run generate`, `npm run generate:curriculum`) und Niveau-/Abschlusstests
pro Kurs. Diese Features (und die zugehörigen Routen `/lessons/[id]`, `/test/[slug]`,
`/admin/content`) sind mit dem Umbau auf `StashSentence`/`IslandPack` **gelöscht** – es gibt keine
Course/Lesson-Tabellen mehr, in die generierte oder handgeschriebene Kurse geseedet werden könnten.
Der Content-Corpus (`content/de-tr-a1…b2.ts`, `content/curriculum.ts`, `scripts/generate-*.ts`)
liegt weiterhin im Repo. **`de-tr-a1.ts` wird seit 2026-07-17 als Rohmaterial für Language Islands
wiederverwendet** (`prisma/seed.ts` extrahiert Vokabel-Beispielsätze deterministisch, kein LLM) –
die anderen Kursdateien und der eigentliche Lektions-/Übungs-Code bleiben unangebunden. Details
zum Umbau: `REFACTORINGPLAN.md`, `CLAUDE.md`, Memory `refactoring-phase1-db`.

## Barrierefreiheit & Design

Design-Tokens mit AA-Kontrasten, sichtbare Fokus-Ringe, `prefers-reduced-motion` wird respektiert,
Touch-Targets ≥ 44 px, ARIA-Labels auf Progressbars/Audio-Buttons, semantische Farben
(Grün = richtig, Rot = falsch, Blau = Info).

## Bekannte Grenzen (bewusste Scope-Entscheidungen)

- Zahlung ist ein Stub (Testmodus), Benachrichtigungen sind ein Einstellungs-Flag (kein Push-Dienst).
- Web Speech API: STT funktioniert am besten in Chrome; überall sonst greift der Fallback.
- Audio ist TTS-generiert; echte Sprecher-Aufnahmen wären der nächste Schritt (`audioUrl`-Feld ist im Schema vorgesehen).
