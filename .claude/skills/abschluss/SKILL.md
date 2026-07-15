---
name: abschluss
description: Abschluss-Routine vor dem /clear — alles Relevante der Bubbel-Session sichern (Änderungen, Tests, Doku, Memory, Git), damit keine Info verloren geht.
user-invocable: true
argument-hint: "[optional: Fokus/Notiz zur Session]"
---

Ich will den Chat gleich clearen. Sichere ALLES Relevante dieser Session, damit nichts verloren geht.
Arbeite die Punkte der Reihe nach ab, **überspringe nichts stillschweigend** — trifft ein Punkt nicht
zu, sag in einem Satz warum.

**Projekt:** PolyGlott (früher „Bubbel") – Sprachlern-App (Next.js 14 App Router, TypeScript, Tailwind,
Prisma/SQLite, NextAuth, Web Speech API). App-Ordner heißt weiterhin `bubbel/`. Arbeitsverzeichnis ist der
Eltern-Ordner „Sprachenlern App". Mehrere KIs arbeiten parallel — vor Änderungen Ist-Stand prüfen.

## 1. Was hat sich geändert?
- Geänderte Dateien sichten: `git -C "<repo>" status --short`. **Bubbel ist aktuell KEIN Git-Repo** →
  stattdessen die in dieser Session bearbeiteten Dateien aus dem Gesprächsverlauf auflisten.
- In 2–3 Sätzen festhalten, was die Session inhaltlich gemacht hat (Basis für Doku + Memory).

## 2. Tests & Build (bei Code-Änderung)
- `cd bubbel && npm test` — Vitest (FSRS, Gamification, Trainer, Lesson-Flow) muss grün sein.
- Bei produktionsnahen/größeren Änderungen zusätzlich `npm run build` (TypeScript + Next-Build sauber?).
- `prisma/schema.prisma` berührt → `npm run db:push`, ggf. `npm run db:seed` (idempotent;
  `FORCE_SEED=1` erzwingt Neuaufbau). Kein Migrations-System — SQLite-Push. Lernfortschritt bleibt.

## 3. Doku aktualisieren (Bubbel hat KEIN Changelog-/Cockpit-System — die entfallen bewusst)
- **CLAUDE.md** (Architektur-Landkarte, App-Root): bei Struktur-, Datenmodell- oder Flow-Änderung anpassen.
- **PRODUCT.md**: nur bei Änderung an Register, Users, Product-Purpose, Personality oder Design-Prinzipien.
- **README.md**: bei nutzer-sichtbaren Setup-/Feature-Änderungen (neue Befehle, neues Sprachpaar, neuer
  Screen). Interne/experimentelle Sachen bewusst NICHT (kein Update-Rauschen).
- **DESIGN.md**: optional via `/impeccable document` erzeugen/aktualisieren, wenn sich das visuelle
  System (Tokens, Theme, Komponenten) verschoben hat.

## 4. Memory (dauerhaftes Gedächtnis über Sessions hinweg)
- Pfad: `/Users/lukeschmitz/.claude/projects/-Users-lukeschmitz-Claude-Projects-Sprachenlern-App/memory/`.
- Dauerhaft wichtige, **nicht aus dem Code ableitbare** Fakten/Entscheidungen/Nutzer-Feedback als
  Memory-Datei ablegen + Zeile in `MEMORY.md`. Bestehende aktualisieren statt duplizieren; Falsches löschen.
- NICHT speichern, was schon in Code/CLAUDE.md/Git-Historie steht oder nur diese Session betrifft.

## 5. Design-Kontext (bei UI-Arbeit — Bubbels Kern)
- Theme-/Token-Änderungen (`tailwind.config.ts`, `globals.css`) in CLAUDE.md/DESIGN.md festhalten
  (Light/Dark-Tokens als CSS-Variablen, Amber-Akzent, ink-Skala).
- Größere UI-Änderung → Anti-Pattern-Detektor laufen lassen und Funde fixen:
  `node bubbel/.claude/skills/impeccable/scripts/detect.mjs --json src` (lokal, kein Netz).
- Previewbare Änderungen vor dem Clear einmal im Browser verifizieren (Screenshot beide Themes),
  nicht nur im Code. Nach `tailwind.config.ts`-Änderung Dev-Server neu starten (Config nur beim Start gelesen).

## 6. Git commit + push
- **Bubbel ist aktuell KEIN Git-Repo.** Falls Versionierung gewünscht: erst `git init` (Nutzer fragen),
  sinnvolle `.gitignore` ist vorhanden. Sonst diesen Punkt bewusst überspringen und im Bericht vermerken.
- Wenn ein Repo existiert: Conventional-Commit-Stil, Abschlusszeile
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`. Nur direkt auf den Hauptbranch committen,
  wenn das dem Workflow entspricht — sonst erst Branch.

## 7. Dev-Server / Verifikation (kein Prod-Deploy — Bubbel läuft rein lokal)
- Start via `npm run dev` bzw. Preview-Server auf Port 3000. Kein externer Deploy-Schritt.
- Next-Code-Änderung → HMR genügt; `tailwind.config.ts`/`globals.css` → Server-Neustart. Danach kurzer
  Render-/HTTP-200-Check der betroffenen Route.

## 8. Abschlussbericht
- Knapp auflisten: **was** geändert (Dateien/Bereiche), **Tests** grün?, welche **Doku/Memory**
  aktualisiert, ob **Git** committet oder bewusst nicht, **was offen** blieb. Damit Luke gefahrlos
  `/clear` drücken kann.
