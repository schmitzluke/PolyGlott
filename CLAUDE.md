# Bubbel – Kontext & Architektur

Babbel-inspirierte Sprachlern-Web-App. Kurze interaktive Lektionen, echte Dialoge,
Spaced Repetition (SM-2), Aussprache-Training, Gamification, KI-Konversationsmodus.

> **Hinweis:** Der ursprüngliche Prompt (`../babbel-clone-prompt.md`) forderte **Deutsch→Spanisch**.
> Umgesetzt ist **Deutsch→Türkisch** (A1/A2/B1). Architektur ist sprachpaar-agnostisch – neue Paare
> rein über Daten (`content/*.ts` + Seed). Nutzer-orientierte Doku steht in `README.md`; diese Datei
> ist die interne Landkarte für Codeänderungen.

## Tech-Stack

| Bereich | Wahl |
|---|---|
| Frontend + Backend | Next.js 14 (App Router, React 18, TypeScript) |
| Styling | Tailwind CSS, zentrale Design-Tokens in `tailwind.config.ts` (WCAG-AA) |
| Client-State | Zustand (nur Lesson-Player), Rest via Server Components |
| DB | Prisma ORM + **SQLite** default (`prisma/dev.db`); Postgres kompatibel (Provider + `DATABASE_URL` tauschen) |
| Auth | NextAuth (JWT), Credentials (bcrypt) + Google-OAuth (nur wenn `GOOGLE_CLIENT_ID/SECRET` gesetzt) |
| Speech | Web Speech API (TTS+STT) hinter `src/lib/speech.ts`, graceful Fallback |
| LLM | Provider-agnostisch (`src/lib/llm.ts`): Anthropic → Gemini → Groq (Auto-Auswahl per vorhandenem Key, override `LLM_PROVIDER`) |
| Payment | Stub (`/api/premium`, Testmodus) |

## Verzeichnisse

```
content/          Kursdaten als reine Daten (kein Code nötig für neue Lektionen)
  de-tr-a1/a2/b1.ts   handgeschriebene Kurse (SeedCourse)
  index.ts            allCourses-Registry
  frequency-tr.ts     520 wichtigste Wörter → Wortschatz-Trainer
  scenarios.ts        Chat-Szenarien (Café, Markt, Hotel …)
  curriculum.ts       CEFR-Lehrplan A1–B1 (maschinenlesbar)
  generated/          per LLM erzeugte Lektionen als JSON (Seed hängt sie an)
prisma/           schema.prisma (Datenmodell), seed.ts (idempotent), dev.db
scripts/          generate-lesson.ts, generate-curriculum.ts (LLM-Generatoren)
src/lib/          Kern-Logik, pure + getestet: sm2, gamification, answers, validateLesson,
                  auth, db, speech, llm, achievements, trainerSession, chatFormat, types
src/store/        lessonStore.ts (Zustand: phase intro→exercise→summary)
src/components/
  ui/             Baustein-Bibliothek (Button, Card, ProgressBar, ChoiceChip, AudioButton,
                  MicButton, StreakFlame, XPBadge)
  exercises/      8 Übungstypen (1 Komponente je Typ)
  LessonPlayer.tsx  Übungs-Screen-Muster (Progressbar oben, Aufgabe Mitte, Feedback-Leiste unten)
src/app/
  (auth)/         login, register
  (app)/          dashboard, courses, review, profile, settings, premium, leaderboard,
                  onboarding, chat (+chat/live), trainer  — teilen sich layout.tsx (Nav)
  lessons/[id]/   Lesson-Player (eigenes Layout, keine Nav)
  test/[slug]/    Niveau-/Abschlusstest
  trainer/[pack]/ Wortschatz-Trainer-Pack
  api/            register, onboarding, lessons/[id]/complete, reviews, settings, premium,
                  chat, chat/complete, level-test, trainer/complete, auth/[...nextauth]
tests/            Vitest: sm2, gamification, trainer, lessonFlow (Integration)
```

## Datenmodell (`prisma/schema.prisma`)

`User` → `UserProgress`, `ReviewItem`, `XpEvent`, `UserAchievement`, `Streak`.
Content-Hierarchie: `Course → Unit → Lesson → Exercise`.
- `Exercise.content` = **JSON-String** (SQLite hat keinen Json-Typ). Schema je Typ in `src/lib/types.ts`.
- `VocabItem` gehört **entweder** zu einer `Lesson` **oder** ist Frequenz-Vokabel (`freqRank`, Trainer).
- `ReviewItem` trägt die SM-2-Felder (easeFactor, intervalDays, repetitions, dueAt), unique je (user, vocab).
- `Streak`: current/longest/lastActiveDate (`YYYY-MM-DD`)/freezesUsed. Freeze-Zähler liegt auf `User.streakFreezes`.

## Übungstypen (8)

`vocab_match | multiple_choice | gap_fill | sentence_order | translation | listening | dialogue | pronunciation`
Content-Schema pro Typ: `src/lib/types.ts`. Antwortprüfung: `src/lib/answers.ts`.
Jede neue Lektion muss ≥1 Dialog haben; `tests/lessonFlow.test.ts` erzwingt Lösbarkeit aller Übungen.

## Kern-Logik

- **SM-2** (`src/lib/sm2.ts`): `sm2(state, quality 0–5, now)`. UI-Mapping Nochmal=1/Schwer=3/Gut=4/Einfach=5.
  `applyReview()` behandelt vorgezogene Reviews: früh+gewusst → Plan unverändert; früh+vergessen → voller Reset.
- **Gamification** (`src/lib/gamification.ts`): XP +5/richtig, +20 Lektion, +10 perfekt, +3/Review.
  Level quadratisch: `50 * n²`. `updateStreak()` – Lücke 1 = +1, Lücke 2 mit Freeze = gerettet, sonst Reset.
- **LLM** (`src/lib/llm.ts`): `askLLM({system, messages, ...})`, kein SDK (fetch). `llmConfigured()`/`activeProvider()`.
  Default-Modelle: Anthropic `claude-haiku-4-5-20251001`, Gemini `gemini-2.5-flash`, Groq `llama-3.3-70b-versatile`.
- **Validierung** (`src/lib/validateLesson.ts`): dieselben Regeln wie Tests; Generatoren validieren damit.

## Wichtige Flows

**Lektion abschließen** → `POST /api/lessons/[id]/complete` (Dramaturgie-Schritt 7):
in **einer** `$transaction`: UserProgress upsert, XpEvent, `User.xpTotal`+Streak-Update,
neue Vokabeln als sofort fällige `ReviewItem` (SM-2-Übergabe), danach `checkAchievements()`.
Premium-Kurse: 403 wenn `course.isPremium && !user.isPremium`.

**Lesson-Player** (Client): `useLessonStore` steuert phase `intro → exercise → summary`,
sammelt `results[]`, zeigt Feedback-Leiste; am Ende POST an complete-Route.

**Auth**: `getCurrentUser()` (Server) lädt DB-User aus JWT (`token.uid`). Google-Login legt User per upsert an.

## Zusatzfeatures über den Prompt hinaus

- **Konversationsmodus** (`(app)/chat`, `+chat/live`): freier LLM-Chat + Live-Call, 8 Szenarien, Feedback+XP.
- **Wortschatz-Trainer** (`trainer/`): 520 Frequenzwörter → 52 Packs à 10; speist SM-2 (kein API-Key nötig).
- **Niveau-/Abschlusstests** (`test/[slug]`, `api/level-test`): 15 Aufgaben, 85 % bestehen → Level-Aufstieg A1→A2→B1.
- **Lektions-Generatoren** (`scripts/generate-*.ts`): LLM erzeugt Lektionen im exakten Datenformat, auto-validiert, resumierbar.

## Befehle

```bash
npm run setup      # prisma db push + seed (Demo-User demo@bubbel.app / demo1234)
npm run dev        # http://localhost:3000
npm test           # Vitest (sm2, gamification, trainer, lessonFlow)
npm run build
npm run db:seed    # idempotent; FORCE_SEED=1 erzwingt Neuaufbau
npm run generate -- --course … --level … --unit … --title … --topic …
npm run generate:curriculum [-- --level B1 --limit 5]
```

## Konventionen / Fallstricke

- **Neue Lektion/Sprachpaar = nur Daten**: `content/*.ts` ergänzen + in `content/index.ts` registrieren,
  dann `npm run db:seed`. Für TTS/STT Sprachcode in `LANG_TAGS` (`src/lib/speech.ts`) ergänzen.
- Seed ist **idempotent** – Lernfortschritt bleibt erhalten; unveränderte Kurse werden übersprungen.
- `Exercise.content` immer als JSON-String lesen/schreiben (kein natives JSON in SQLite).
- Pure Logik (sm2, gamification, answers, validateLesson) hat Tests – bei Änderung Tests mitziehen.
- STT nur zuverlässig in Chrome; überall sonst Fallback. Payment/Notifications sind bewusst Stubs.
