/**
 * XP-, Level- und Streak-Logik (pure Funktionen, getestet in __tests__).
 */

export const XP = {
  perCorrectExercise: 5,
  lessonCompleteBonus: 20,
  perfectLessonBonus: 10,
  perReview: 3,
} as const;

/** XP für eine abgeschlossene Lektion. */
export function lessonXp(correctCount: number, totalCount: number): number {
  const base = correctCount * XP.perCorrectExercise + XP.lessonCompleteBonus;
  const perfect = totalCount > 0 && correctCount === totalCount ? XP.perfectLessonBonus : 0;
  return base + perfect;
}

/** Level steigt quadratisch: Level n erreicht ab 50 * n² XP (Level 1 = 0 XP). */
export function levelForXp(xpTotal: number): number {
  if (xpTotal < 0) return 1;
  return Math.floor(Math.sqrt(xpTotal / 50)) + 1;
}

export function xpForNextLevel(xpTotal: number): { level: number; nextAt: number; progress: number } {
  const level = levelForXp(xpTotal);
  const currentAt = 50 * (level - 1) ** 2;
  const nextAt = 50 * level ** 2;
  const progress = Math.min(1, (xpTotal - currentAt) / (nextAt - currentAt));
  return { level, nextAt, progress };
}

// ---- Streak ----

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDate: string | null; // "YYYY-MM-DD"
  freezesAvailable: number;
}

export interface StreakResult extends StreakState {
  usedFreeze: boolean;
}

export function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(`${a}T12:00:00`);
  const db = new Date(`${b}T12:00:00`);
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

/**
 * Aktualisiert den Streak bei Lernaktivität am Tag `today`.
 * - gleicher Tag: unverändert
 * - +1 Tag Lücke: Streak +1
 * - +2 Tage Lücke mit verfügbarem Freeze: Freeze rettet den Streak (Streak +1)
 * - sonst: Streak startet neu bei 1
 */
export function updateStreak(state: StreakState, today: string): StreakResult {
  const { lastActiveDate } = state;
  let { current, longest, freezesAvailable } = state;
  let usedFreeze = false;

  if (!lastActiveDate) {
    current = 1;
  } else {
    const gap = daysBetween(lastActiveDate, today);
    if (gap <= 0) {
      return { ...state, usedFreeze: false };
    } else if (gap === 1) {
      current += 1;
    } else if (gap === 2 && freezesAvailable > 0) {
      freezesAvailable -= 1;
      usedFreeze = true;
      current += 1;
    } else {
      current = 1;
    }
  }

  longest = Math.max(longest, current);
  return { current, longest, lastActiveDate: today, freezesAvailable, usedFreeze };
}

/** Ist der Streak Stand heute noch aktiv (heute oder gestern gelernt / mit Freeze rettbar)? */
export function isStreakAlive(state: StreakState, today: string): boolean {
  if (!state.lastActiveDate || state.current === 0) return false;
  const gap = daysBetween(state.lastActiveDate, today);
  return gap <= 1 || (gap === 2 && state.freezesAvailable > 0);
}
