/**
 * FSRS-Algorithmus (Free Spaced Repetition Scheduler).
 * Ersetzt SM-2 – wissenschaftlich fundiertes DSR-Modell
 * (Difficulty, Stability, Retrievability).
 *
 * Rating: 1 = Nochmal, 2 = Schwer, 3 = Gut, 4 = Einfach.
 */

import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  type Card,
  type FSRSParameters,
  type Grade,
  type RecordLogItem,
  Rating,
  State,
} from "ts-fsrs";

export { Rating, State } from "ts-fsrs";
export type { Card as FsrsCard, Grade } from "ts-fsrs";

// ---- Konfiguration ----

const PARAMS: FSRSParameters = generatorParameters({
  request_retention: 0.9, // 90 % Ziel-Wiedererkennung
  maximum_interval: 365, // max. 1 Jahr bis zur nächsten Wiederholung
  enable_fuzz: true, // Anti-Clumping: leichte Zufallsvariation
});

const scheduler = fsrs(PARAMS);

// ---- Public API ----

/** Neue leere Karte (State = New, due = jetzt). */
export function createNewCard(now: Date = new Date()): Card {
  return createEmptyCard(now);
}

/** Review-Ergebnis: aktualisierte Karte + Review-Log. */
export interface FsrsResult {
  card: Card;
  log: RecordLogItem;
}

/**
 * Karte bewerten. Gibt aktualisierte Karte + Log zurück.
 * @param card  Aktuelle Karte (aus DB rekonstruiert)
 * @param grade Rating 1–4
 * @param now   Aktueller Zeitpunkt
 */
export function reviewCard(card: Card, grade: Grade, now: Date = new Date()): FsrsResult {
  const result = scheduler.next(card, now, grade);
  return { card: result.card, log: result };
}

/**
 * Preview: zeigt für jede mögliche Bewertung, was passieren würde.
 * Nützlich, um dem User unter den Buttons die nächste Fälligkeit anzuzeigen.
 */
export function previewCard(card: Card, now: Date = new Date()): Record<Grade, { card: Card; intervalLabel: string }> {
  const all = scheduler.repeat(card, now);
  const result = {} as Record<Grade, { card: Card; intervalLabel: string }>;
  for (const grade of [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy] as Grade[]) {
    const item = all[grade];
    result[grade] = {
      card: item.card,
      intervalLabel: formatInterval(item.card.due, now),
    };
  }
  return result;
}

// ---- DB-Serialisierung ----

/** DB-Felder, die in ReviewItem gespeichert werden. */
export interface FsrsDbFields {
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: number; // 0=New, 1=Learning, 2=Review, 3=Relearning
  last_review: Date | null;
  dueAt: Date;
}

/** Card → flache DB-Felder. */
export function cardToDbFields(card: Card): FsrsDbFields {
  return {
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state as number,
    last_review: card.last_review ? new Date(card.last_review) : null,
    dueAt: new Date(card.due),
  };
}

/** DB-Felder → Card rekonstruieren. */
export function dbFieldsToCard(fields: FsrsDbFields): Card {
  return {
    due: fields.dueAt,
    stability: fields.stability,
    difficulty: fields.difficulty,
    elapsed_days: fields.elapsed_days,
    scheduled_days: fields.scheduled_days,
    reps: fields.reps,
    lapses: fields.lapses,
    state: fields.state as State,
    last_review: fields.last_review ?? undefined,
  } as Card;
}

// ---- Hilfsfunktionen ----

/** Menschenlesbares Intervall-Label (z. B. "10 min", "1 Tag", "4 Tage"). */
export function formatInterval(due: Date, now: Date): string {
  const diffMs = new Date(due).getTime() - now.getTime();
  const diffMin = Math.max(1, Math.round(diffMs / 60_000));

  if (diffMin < 60) return `${diffMin} min`;
  const diffHours = Math.round(diffMin / 60);
  if (diffHours < 24) return `${diffHours} Std.`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) return "1 Tag";
  if (diffDays < 30) return `${diffDays} Tage`;
  const diffMonths = Math.round(diffDays / 30);
  if (diffMonths === 1) return "1 Monat";
  if (diffMonths < 12) return `${diffMonths} Monate`;
  return "> 1 Jahr";
}

/**
 * UI-Labels für die Bewertungsbuttons.
 * Enthält Rating-Value, Label, Hint und CSS-Style.
 */
export const RATING_CONFIG = [
  { rating: Rating.Again, label: "Nochmal", hint: "gleich wieder", style: "bg-error-50 text-error-700 border-error-500" },
  { rating: Rating.Hard, label: "Schwer", hint: "bald wieder", style: "bg-ink-100 text-ink-700 border-ink-300" },
  { rating: Rating.Good, label: "Gut", hint: "später", style: "bg-info-50 text-info-700 border-info-500" },
  { rating: Rating.Easy, label: "Einfach", hint: "viel später", style: "bg-correct-50 text-correct-700 border-correct-500" },
] as const;

/**
 * Score-Schwellen für die automatische Bewertungsvorschlag – Nutzer kann übersteuern.
 */
export function suggestRating(score: number): Grade {
  if (score >= 90) return Rating.Easy;
  if (score >= 70) return Rating.Good;
  if (score >= 40) return Rating.Hard;
  return Rating.Again;
}
