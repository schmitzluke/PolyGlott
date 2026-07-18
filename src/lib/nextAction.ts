/**
 * Bewertet die 5 scorbaren Lernsäulen nach Retrieval-Practice-Evidenz
 * (Testing-Effekt, Roediger/Karpicke) und liefert die aktuell wertvollste.
 * Wortschatz-Trainer ist bewusst ausgeklammert (kein FSRS-Tracking, s. Spec).
 */

export type PillarKey = "reviews" | "islands" | "stash" | "media" | "commute";

export interface CandidateInput {
  key: PillarKey;
  available: boolean;
  daysSinceLastUse: number | null;
}

export interface ScoredCandidate {
  key: PillarKey;
  score: number;
  reason: string;
}

const BASE_WEIGHTS: Record<PillarKey, number> = {
  reviews: 100,
  islands: 55,
  stash: 40,
  media: 30,
  commute: 15,
};

const DEFAULT_REASONS: Record<PillarKey, string> = {
  reviews: "Karten warten auf Wiederholung",
  islands: "Neue Sätze zum Entdecken",
  stash: "Frische Sätze bereit",
  media: "Neues Transkript wartet",
  commute: "Sätze zum Pendel-Hören bereit",
};

const FRESHNESS_THRESHOLD_DAYS = 2;
const FRESHNESS_BONUS = 1.1;

export function pickNextAction(candidates: CandidateInput[]): ScoredCandidate | null {
  const scored = candidates
    .filter((c) => c.available)
    .map((c) => {
      const isFresh = c.daysSinceLastUse !== null && c.daysSinceLastUse > FRESHNESS_THRESHOLD_DAYS;
      const score = BASE_WEIGHTS[c.key] * (isFresh ? FRESHNESS_BONUS : 1);
      const reason = isFresh
        ? `Lange nicht genutzt (${c.daysSinceLastUse} Tage)`
        : DEFAULT_REASONS[c.key];
      return { key: c.key, score, reason };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0] ?? null;
}
