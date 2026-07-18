import { MASTERY_STABILITY_DAYS } from "@/lib/mastery";

const RECALL_STABILITY_DAYS = 7;

export interface ReviewProgress {
  state: number;
  stability: number;
}

/**
 * Kombinierter 0-5-Fortschritts-Indikator pro Satz, rein aus dem FSRS-Status
 * abgeleitet (kein eigenes DB-Feld). state: 0=New, 1=Learning, 2=Review, 3=Relearning.
 */
export function deriveSentenceStars(item: ReviewProgress | null | undefined): number {
  if (!item) return 0;
  if (item.state === 0) return 0;
  if (item.state === 1) return 1;
  if (item.state === 3) return 2;
  if (item.state === 2) {
    if (item.stability >= MASTERY_STABILITY_DAYS) return 5;
    if (item.stability >= RECALL_STABILITY_DAYS) return 4;
    return 3;
  }
  return 0;
}
