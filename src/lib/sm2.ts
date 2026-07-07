/**
 * SM-2-Algorithmus (SuperMemo-2, wie in Anki).
 * quality: 0–5 (0 = totaler Blackout, 5 = perfekt).
 * In der UI mappen wir: Nochmal=1, Schwer=3, Gut=4, Einfach=5.
 */

export interface Sm2State {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
}

export interface Sm2Result extends Sm2State {
  dueAt: Date;
}

export const INITIAL_SM2: Sm2State = {
  easeFactor: 2.5,
  intervalDays: 0,
  repetitions: 0,
};

export function sm2(state: Sm2State, quality: number, now: Date = new Date()): Sm2Result {
  if (quality < 0 || quality > 5 || !Number.isFinite(quality)) {
    throw new Error(`SM-2: quality muss zwischen 0 und 5 liegen (war ${quality})`);
  }

  let { easeFactor, intervalDays, repetitions } = state;

  if (quality < 3) {
    // Fehlschlag: Wiederholungszähler zurücksetzen, Item bald wieder zeigen.
    repetitions = 0;
    intervalDays = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
  }

  // Ease-Faktor-Anpassung (Original-Formel); nie unter 1.3.
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const dueAt = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);
  return { easeFactor, intervalDays, repetitions, dueAt };
}

/**
 * Review anwenden – berücksichtigt Festigungs-Reviews (Karte noch nicht fällig):
 * - Fällige Karte: normales SM-2.
 * - Vorgezogene Karte + gewusst (≥3): Zeitplan bleibt unverändert (sonst würden
 *   die Intervalle durch fleißiges Extra-Üben unfair aufgebläht).
 * - Vorgezogene Karte + vergessen (<3): voller SM-2-Reset – wer eine Karte
 *   vergessen hat, muss sie bald wiedersehen, egal was der Plan sagt.
 */
export function applyReview(
  state: Sm2State,
  quality: number,
  early: boolean,
  now: Date = new Date()
): { reschedule: boolean; result: Sm2Result | null } {
  if (early && quality >= 3) {
    return { reschedule: false, result: null };
  }
  return { reschedule: true, result: sm2(state, quality, now) };
}
