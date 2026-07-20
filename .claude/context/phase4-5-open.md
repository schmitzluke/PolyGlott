---
keywords: phase4, phase5, active recall, audio flooding, pre-input roleplay, review, stash, ReviewItem
description: Refactoring-Roadmap Phase 4 (Active Recall UI + Audio Flooding) fertig; Phase 5 (Pre-Input Roleplay) offen; ein Follow-up-Bug (Insel/Story-Practice RSC-Fehler) entdeckt
---

## State
- Phase 1+2 (Schema StashSentence/IslandPack) fertig, Build grün.
- Phase 3 (Voice Capture: Minimalist STT-Component Deutsch→API→DeepSeek→Türkisch) fertig.
- Phase 4 erster Schritt (Stash→Review verdrahtet: ReviewItem-Erzeugung, Löschen/manuell hinzufügen) fertig.
- Phase 4 Rest: Audio Flooding war bereits durch Commute Mode abgedeckt (kein offener Punkt, Doku-Fehler korrigiert).
  Active Recall UI jetzt fertig (2026-07-20, main gemerged+gepusht, commits 36b99b8/72b403c/6dd4648): ReviewSessionClient.tsx
  (geteilt von /review, Insel-Practice, Story-Practice) nutzt jetzt Textinput+Speech+Scoring statt Reveal-Button, analog
  TrainerPlayer.tsx-Pattern. `suggestRating` nach src/lib/fsrs.ts zentralisiert. Spec/Plan:
  docs/superpowers/specs/2026-07-20-review-active-recall-design.md, docs/superpowers/plans/2026-07-20-review-active-recall.md.
  Damit ist Phase 4 komplett.
- Phase 5 (Pre-Input Roleplay) noch nicht begonnen.

## Decisions
- (siehe globale Memory refactoring-phase*.md für Details zu bisherigen Entscheidungen)

## Open TODOs
- [ ] Pre-Input Roleplay (Phase 5) konzipieren
- [ ] Follow-up-Bug (bei Active-Recall-Verifikation entdeckt, NICHT durch diese Änderung verursacht): Insel-/Story-Practice-
      Seiten (`src/app/(app)/islands/[theme]/[slug]/practice/page.tsx` + `.../stories/[storyId]/practice/page.tsx`) sind
      Server Components, übergeben `emptyState.icon` (Lucide-Icon = Funktion) an Client Component `ReviewSessionClient` →
      RSC-Serialisierungsfehler ("Functions cannot be passed directly to Client Components"), 500 beim Aufruf. `/review/
      page.tsx` betroffen NICHT, da selbst `"use client"`. Fix: beide Practice-Seiten auf `"use client"` umstellen (wie
      /review) oder Icon als String-Key übergeben und client-seitig auflösen.

## Gotchas
- DeepSeek max_tokens-Gotcha bei Review-Wiring aufgetreten (siehe globale Memory)
- rsync-Deploy-Fehler wiederholt aufgetreten — Deploy-Workflow-Regel beachten (erst GitHub push, dann Server-Deploy, --exclude docker-compose.yml)
