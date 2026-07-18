/**
 * Satz-Mastery-Meilensteine: bildet FSRS-Fortschritt auf grobe CEFR-Etappen ab,
 * motiviert über sichtbare Zwischenziele statt abstrakter Reviewzahlen.
 * Schwellen an CEFR-Wortschatzstudien angelehnt (Milton/Nation), auf gefestigte
 * Sätze übertragen – Richtwert, kein Ersatz für den Niveau-Test (User.confirmedLevel).
 */

// stability = FSRS-erwartetes Intervall (Tage) bis 90% Erinnerungswahrscheinlichkeit.
// state 2 = Review (hat die Learning-Phase verlassen). Beides zusammen ~ "gefestigt".
export const MASTERY_STABILITY_DAYS = 21;

/** Ist dieses ReviewItem aktuell als "gefestigt" zu zählen? */
export function isMastered(item: { state: number; stability: number }): boolean {
  return item.state === 2 && item.stability >= MASTERY_STABILITY_DAYS;
}

export interface MasteryMilestone {
  threshold: number;
  cefr: string;
  label: string;
}

export const MASTERY_MILESTONES: MasteryMilestone[] = [
  { threshold: 100, cefr: "A1", label: "100 Sätze gefestigt" },
  { threshold: 250, cefr: "A1", label: "A1-Etappe erreicht" },
  { threshold: 500, cefr: "A2", label: "A2-Etappe erreicht" },
  { threshold: 1000, cefr: "B1", label: "B1-Etappe erreicht" },
  { threshold: 2000, cefr: "B2", label: "B2-Etappe erreicht" },
];

/** Grobe CEFR-Schätzung aus der Anzahl gefestigter Sätze. */
export function cefrEstimateForMastered(masteredCount: number): string {
  let level = "A0";
  for (const m of MASTERY_MILESTONES) {
    if (masteredCount >= m.threshold) level = m.cefr;
  }
  return level;
}

/** Nächster noch nicht erreichter Meilenstein (oder null, wenn alle erreicht). */
export function nextMasteryMilestone(masteredCount: number): MasteryMilestone | null {
  return MASTERY_MILESTONES.find((m) => masteredCount < m.threshold) ?? null;
}

/** Schwelle des zuletzt erreichten Meilensteins (0, falls noch keiner erreicht). */
export function previousMilestoneThreshold(masteredCount: number): number {
  const reached = MASTERY_MILESTONES.filter((m) => masteredCount >= m.threshold);
  return reached.length > 0 ? reached[reached.length - 1].threshold : 0;
}
