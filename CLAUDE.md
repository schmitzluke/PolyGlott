# PolyGlott – Kontext & Architektur

PolyGlott-inspirierte Sprachlern-Web-App. Kurze interaktive Lektionen, echte Dialoge,
Spaced Repetition (SM-2), Aussprache-Training, Gamification, KI-Konversationsmodus.

> **Hinweis:** Der ursprüngliche Prompt (`../babbel-clone-prompt.md`) forderte **Deutsch→Spanisch**.
> Umgesetzt ist **Deutsch→Türkisch** (A1/A2/B1). Architektur ist sprachpaar-agnostisch – neue Paare
> rein über Daten (`content/*.ts` + Seed). Nutzer-orientierte Doku steht in `README.md`; diese Datei
> ist die interne Landkarte für Codeänderungen.
>
> **Rebrand:** Produkt heißt jetzt **PolyGlott** (früher „Bubbel"/„Babbel"). Der App-Ordner auf
> Platte heißt weiterhin `bubbel/`; nur die sichtbaren Namen (UI, `package.json`, Seed, Doku) wurden
> umbenannt. **Mehrere KIs/Entwickler arbeiten parallel** an diesem Repo — vor Änderungen kurz den
> Ist-Stand prüfen.

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
  de-tr-a1/a2/b1/b2.ts handgeschriebene Kurse (SeedCourse); Vokabeln steigen mit Level:
                      A1 141 · A2 162 · B1 173 · B2 190 (Festigungs-Ratchet beachten!)
  index.ts            allCourses-Registry
  frequency-tr.ts     520 wichtigste Wörter → Wortschatz-Trainer
  scenarios.ts        Chat-Szenarien (Café, Markt, Hotel …)
  curriculum.ts       CEFR-Lehrplan A1–B1 (maschinenlesbar)
  generated/          per LLM erzeugte Lektionen als JSON (Seed hängt sie an)
prisma/           schema.prisma (Datenmodell), seed.ts (idempotent, nur noch Achievements+Demo-User), dev.db
scripts/          generate-lesson.ts, generate-curriculum.ts (LLM-Generatoren, erzeugen Content-JSON —
                  wird NICHT mehr geseedet, siehe Hinweis unten), analyze-festigung.ts (+lib/festigung.ts):
                  misst deterministisch, ob Content-Corpus Wissen festigt; kein LLM
src/lib/          Kern-Logik, pure + getestet: sm2, gamification, answers, validateLesson,
                  auth, db, speech, llm, achievements, trainerSession, chatFormat, types
src/store/        lessonStore.ts (Zustand: phase intro→exercise→summary) — verwaist, siehe Hinweis unten
src/components/
  ui/             Baustein-Bibliothek (Button, Card, ProgressBar, ChoiceChip, AudioButton,
                  MicButton, StreakFlame, XPBadge)
  exercises/      8 Übungstypen (1 Komponente je Typ) — verwaist, siehe Hinweis unten
src/app/
  (auth)/         login, register
  (app)/          dashboard, review, profile, settings, premium, leaderboard, onboarding,
                  chat (+chat/live), trainer, community, users/[id],
                  admin (admin/users[/[id]] — Admin-Gate in admin/layout.tsx)  — layout.tsx (Nav)
  trainer/[pack]/ Wortschatz-Trainer-Pack
  api/            register, onboarding, reviews, settings, premium,
                  chat, chat/complete, trainer/{complete,rate}, auth/[...nextauth],
                  users/[id]/follow (Social), admin/users/[id] (Admin-Aktionen),
                  external/{user/[id],status,activity} (Companion-App)
tests/            Vitest: sm2, gamification, trainer, lessonFlow, festigung (Curriculum-Ratchet:
                  masteryRatio darf nicht sinken, Ordering-Bugs nicht steigen)
```

> **Hinweis (2026-07-15):** Phase 1 des Refactorings (`REFACTORINGPLAN.md`) hat `Course/Unit/Lesson/
> Exercise/VocabItem/UserProgress` aus dem Schema entfernt (ersetzt durch `StashSentence`/`IslandPack`).
> Damit sind `courses/`, `lessons/[id]/`, `test/[slug]/` (Niveau-/Abschlusstest), `admin/content/`,
> `api/lessons/[id]/complete`, `api/level-test` und `scripts/restore-vocab.ts` gelöscht — sie hingen am
> alten Modell und waren nicht mehr baubar. `src/store/lessonStore.ts`, `src/components/exercises/*` und
> der Content-Corpus (`content/*.ts`, `scripts/generate-*.ts`) sind dadurch verwaist: noch vorhanden,
> aber an keine lebende Route mehr angebunden. `/trainer` (Wortschatz-Trainer) läuft weiter, aber
> `api/trainer/complete` persistiert Wörter nicht mehr als `ReviewItem` (kein `VocabItem` mehr) — nur
> noch XP/Streak/Achievements, bis Phase 4 SRS-Anbindung neu baut. Details: Memory `refactoring-phase1-db`.

## Datenmodell (`prisma/schema.prisma`)

`User` → `StashSentence`, `ReviewItem`, `XpEvent`, `UserAchievement`, `Streak`, `Follows` (Self-Relation).
Kein Course/Lesson mehr (Phase 1 entfernt) — Content-Hierarchie ist jetzt zweigleisig:
- `StashSentence`: Nutzer-generierter Satz-Stash (Voice-to-Stash Pipeline), `germanOriginal`/
  `turkishTranslation`, `status` "PENDING"|"READY".
- `IslandPack → IslandSentence`: kuratierte, vorverifizierte Satz-Bibliothek.
- `ReviewItem` trägt die FSRS-Felder (stability/difficulty/reps/state/dueAt) und hängt **entweder** an
  einem `stashSentenceId` **oder** `islandSentenceId` (nicht mehr `vocabId`), unique je Kombination.
  `state` 0=New…3=Relearning — siehe `review/page.tsx` (rating/preview/isNew) und `api/external/status`.
- `Streak`: current/longest/lastActiveDate (`YYYY-MM-DD`)/freezesUsed. Freeze-Zähler liegt auf `User.streakFreezes`.
- `Follows`: Self-Relation `User↔User` (followerId/followingId, Composite-`@@id`) — Follow-System der Community.

## Übungstypen (8)

`vocab_match | multiple_choice | gap_fill | sentence_order | translation | listening | dialogue | pronunciation`
Content-Schema pro Typ: `src/lib/types.ts`. Antwortprüfung: `src/lib/answers.ts`.
Jede neue Lektion muss ≥1 Dialog haben; `tests/lessonFlow.test.ts` erzwingt Lösbarkeit aller Übungen.

## Kern-Logik

- **SM-2** (`src/lib/sm2.ts`): `sm2(state, quality 0–5, now)`. UI-Mapping Nochmal=1/Schwer=3/Gut=4/Einfach=5.
  `applyReview()` behandelt vorgezogene Reviews: früh+gewusst → Plan unverändert; früh+vergessen → voller Reset.
  ⚠️ **Divergenz:** Neuere Sessions sind auf **FSRS** umgestiegen (`tests/fsrs.test.ts`, `review/page.tsx`
  mit rating 1–4/`state`/`preview`, `ReviewItem.state`). Dieser SM-2-Abschnitt kann veraltet sein — bei
  Review-Arbeit den echten `src/lib/`-Stand prüfen.
- **Review-Runde** (`src/app/api/reviews/route.ts`, FSRS via `src/lib/fsrs.ts`): fällige zuerst, dann
  neue Karten. Fällig-Kriterium `dueOr(now)`: Review-Karten (state 2) **tagesgenau** (`dueAt <= Tagesende`,
  Anki-Modell), Learning/Relearning (1/3) minutengenau. Neue Karten gedeckelt `NEW_PER_DAY=20`/`NEW_PER_ROUND=10`.
  Keine „Festigungs"-Karten (nichts vor Fälligkeit zeigen). Route `force-dynamic` + `no-store`.
  Details + Divergenz der Dashboard-/external-Zähler: Memory `review-due-semantics`.
- **Gamification** (`src/lib/gamification.ts`): XP +5/richtig, +20 Lektion, +10 perfekt, +3/Review.
  Level quadratisch: `50 * n²`. `updateStreak()` – Lücke 1 = +1, Lücke 2 mit Freeze = gerettet, sonst Reset.
- **LLM** (`src/lib/llm.ts`): `askLLM({system, messages, ...})`, kein SDK (fetch). `llmConfigured()`/`activeProvider()`.
  Default-Modelle: Anthropic `claude-haiku-4-5-20251001`, Gemini `gemini-2.5-flash`, Groq `llama-3.3-70b-versatile`.
- **Validierung** (`src/lib/validateLesson.ts`): dieselben Regeln wie Tests; Generatoren validieren damit.

## Wichtige Flows

**Wortschatz-Trainer abschließen** → `POST /api/trainer/complete`: XpEvent + `User.xpTotal`+Streak-Update
in einer `$transaction`, danach `checkAchievements()`. Persistiert **keine** ReviewItems mehr pro Wort
(kein `VocabItem` mehr im Schema) — SRS-Anbindung für Trainer-Wörter ist Phase-4-Arbeit.

**Auth**: `getCurrentUser()` (Server) lädt DB-User aus JWT (`token.uid`). Google-Login legt User per upsert an.

## Zusatzfeatures über den Prompt hinaus

- **Konversationsmodus** (`(app)/chat`, `+chat/live`): freier LLM-Chat + Live-Call, 8 Szenarien, Feedback+XP.
- **Wortschatz-Trainer** (`trainer/`): 520 Frequenzwörter → 52 Packs à 10; XP+Streak, aktuell ohne SRS-Persistenz (s.o.).
- ~~Niveau-/Abschlusstests, Lektions-Generatoren~~: mit Phase 1 gelöscht bzw. verwaist (s. Hinweis oben).

## Community & Companion-App (neu, von paralleler KI ergänzt)

**Social:** Follow-System (`Follows`-Self-Relation). `/community` = XP-Leaderboard der Top-Nutzer.
Öffentliche Profile `/users/[id]` zeigen **Level** (`xpForNextLevel`), **XP**, **Beitrittsdatum**,
freigeschaltete **Abzeichen** und **erlernte Sprachen + Niveau** (`getLearnedLanguages` in
`src/lib/languages.ts` – höchstes CEFR-Niveau je Sprache aus abgeschlossenen Lektionen). Zeigt
„Ihr folgt euch"-Badge bei gegenseitigem Follow. Follower/Folgt-Zahlen verlinken auf
`/users/[id]/followers?tab=followers|following` (Listen mit `FollowButton`). `FollowButton` +
`POST/DELETE /api/users/[id]/follow` (session-authed, sauber). Dashboard zeigt `LevelProgress` (CEFR-Kompetenz).

**Externe API für Companion-App** (Kollege baut separate Homescreen-Widget-App). ⚠️ Seit Phase 1
liefern `api/external/status` und `api/external/me`/`buildUserSummary` kein `nextLesson`/
`deepLinks.nextLesson` mehr (kein Lesson-Konzept mehr im Schema) — Companion-Client muss das entfernen:
- **Pro-Nutzer-API-Key** (`User.apiKey`, `@unique`, Format `pg_<base64url>`): Self-serve in `/settings`
  (Zeigen/Kopieren/Neu-erzeugen), erzeugt bei Registrierung + lazy via `ensureApiKey()`. Helfer in
  `src/lib/apiKey.ts` (`generateApiKey`/`ensureApiKey`/`regenerateApiKey`/`apiKeyEquals`/`bearerToken`);
  Rotate-Route `POST /api/settings/api-key`.
- `GET /api/external/me` — **empfohlen, id-los**: `Authorization: Bearer <userApiKey>`, Nutzer wird über
  den Key aufgelöst. Liefert Level, XP, Tagesziel, Streak, fällige Reviews, nächste Lektion + Deep-Links.
- `GET /api/external/user/[id]` — gleicher Payload, **jetzt gesichert**: Bearer-Key muss zur `id` passen
  (`apiKeyEquals`, Konstantzeit; falscher/fehlender Key → 401). Das frühere Unauth-Risiko ist geschlossen.
  Payload-Aufbau geteilt in `src/lib/externalSummary.ts` (`buildUserSummary`).
- `GET /api/external/status` + `GET /api/external/activity` — gesichert via `Authorization: Bearer
  ${INTEGRATION_API_KEY}` (env, **globaler** Integrations-Key ≠ Pro-Nutzer-Key), Nutzer-Lookup per
  `?email=`. `status` = nächste Lektion + Deep-Links; `activity` = letzte N Tage.
- **Deep-Links** (`src/lib/publicUrl.ts`, `deepLink()`): alle externen Routen liefern jetzt **absolute**
  URLs über `PUBLIC_APP_URL` (Prio: `PUBLIC_APP_URL` → `NEXTAUTH_URL` → `localhost:3000`). Für die
  Handy-Companion-App **`PUBLIC_APP_URL` auf eine öffentliche/Tailscale-URL setzen** — sonst zeigen die
  Widget-Links auf localhost/LAN-IP (`192.168.x.x`), die vom Handy nicht erreichbar sind. Der frühere
  hardcodierte `lukesserver.tail1253fa.ts.net`-Fallback ist entfernt.

## Admin-Bereich (`/admin`)

Admin-Kontrollzentrum, nur für Admins. **Admin = `User.isAdmin`-Flag ODER E-Mail in Env `ADMIN_EMAIL`**
(kommagetrennt, Bootstrap). Helfer in `src/lib/auth.ts`: `isAdminUser(user)` (Prüfung) + `requireAdmin()`
(Server-Gate, redirectet Nicht-Admins). **Gate liegt in `admin/layout.tsx`; jede Admin-API prüft
`isAdminUser` selbst (403)** — Client nie vertrauen. Seiten: `/admin` (Statistik + Test-Links),
`/admin/users` (alle Nutzer, Suche, Premium/Admin togglen, +XP, Reset, Löschen — Self-Schutz),
`/admin/users/[id]` (Detail). `/admin/content` (Lektionsliste) ist mit Phase 1 entfallen. Alle Admin-
Funktionen im Hamburger-Menü (`AdminMenu.tsx`); Admin-Eintrag nur für Admins in Header + mobilem „Mehr".
API: `POST/DELETE /api/admin/users/[id]` (Aktionen). Mobile-Nav neu: `BottomNav.tsx` = 5 Tabs + „Mehr"-Sheet
(die 7 alten Tabs überliefen sich). `UserSearch.tsx` = Instagram-artige Namenssuche in `/community`.

## Befehle

```bash
npm run setup      # prisma db push + seed (Demo-User demo@polyglott.app / demo1234)
npm run dev        # http://localhost:3000
npm test           # Vitest (sm2, gamification, trainer, lessonFlow)
npm run build
npm run db:seed    # idempotent; FORCE_SEED=1 erzwingt Neuaufbau
npm run generate -- --course … --level … --unit … --title … --topic …
npm run generate:curriculum [-- --level B1 --limit 5]
npm run festigung          # Festigungs-Report (--course <slug>, --json)
npm run festigung:fix      # + Recycling-Plan pro Lektion
```

## Konventionen / Fallstricke

- **Neues Sprachpaar** (Trainer/Frequenzwörter): Sprachcode in `LANG_TAGS` (`src/lib/speech.ts`) ergänzen.
  `content/*.ts` (Lektionen/Kurse) wird seit Phase 1 **nicht mehr geseedet** — verwaister Corpus, s.o.
- `seed.ts` seedet nur noch Achievements + Demo-User, ist idempotent (`FORCE_SEED=1` erzwingt Neuaufbau).
- Pure Logik (sm2, gamification, answers, validateLesson) hat Tests – bei Änderung Tests mitziehen.
- STT nur zuverlässig in Chrome; überall sonst Fallback. Payment/Notifications sind bewusst Stubs.
