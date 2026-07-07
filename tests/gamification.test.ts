import { describe, expect, it } from "vitest";
import {
  XP,
  isStreakAlive,
  lessonXp,
  levelForXp,
  updateStreak,
  xpForNextLevel,
} from "@/lib/gamification";

describe("XP", () => {
  it("berechnet Lektions-XP aus richtigen Antworten + Bonus", () => {
    expect(lessonXp(8, 10)).toBe(8 * XP.perCorrectExercise + XP.lessonCompleteBonus);
  });

  it("gibt Perfekt-Bonus bei fehlerfreier Lektion", () => {
    expect(lessonXp(10, 10)).toBe(
      10 * XP.perCorrectExercise + XP.lessonCompleteBonus + XP.perfectLessonBonus
    );
  });

  it("Level steigt mit XP", () => {
    expect(levelForXp(0)).toBe(1);
    expect(levelForXp(49)).toBe(1);
    expect(levelForXp(50)).toBe(2);
    expect(levelForXp(200)).toBe(3);
  });

  it("xpForNextLevel liefert Fortschritt zwischen 0 und 1", () => {
    const { progress } = xpForNextLevel(75);
    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThanOrEqual(1);
  });
});

describe("Streak", () => {
  const base = { current: 3, longest: 5, lastActiveDate: "2026-07-01", freezesAvailable: 1 };

  it("gleicher Tag ändert nichts", () => {
    const r = updateStreak(base, "2026-07-01");
    expect(r.current).toBe(3);
    expect(r.usedFreeze).toBe(false);
  });

  it("nächster Tag erhöht den Streak", () => {
    const r = updateStreak(base, "2026-07-02");
    expect(r.current).toBe(4);
    expect(r.lastActiveDate).toBe("2026-07-02");
  });

  it("ein verpasster Tag mit Freeze rettet den Streak", () => {
    const r = updateStreak(base, "2026-07-03");
    expect(r.usedFreeze).toBe(true);
    expect(r.current).toBe(4);
    expect(r.freezesAvailable).toBe(0);
  });

  it("ein verpasster Tag ohne Freeze setzt zurück", () => {
    const r = updateStreak({ ...base, freezesAvailable: 0 }, "2026-07-03");
    expect(r.current).toBe(1);
    expect(r.usedFreeze).toBe(false);
  });

  it("mehr als ein verpasster Tag setzt immer zurück", () => {
    const r = updateStreak(base, "2026-07-08");
    expect(r.current).toBe(1);
  });

  it("erster Lerntag startet Streak bei 1", () => {
    const r = updateStreak({ current: 0, longest: 0, lastActiveDate: null, freezesAvailable: 1 }, "2026-07-04");
    expect(r.current).toBe(1);
    expect(r.longest).toBe(1);
  });

  it("longest wird mitgeführt", () => {
    const r = updateStreak({ ...base, current: 5 }, "2026-07-02");
    expect(r.longest).toBe(6);
  });

  it("isStreakAlive: heute/gestern aktiv = lebendig, sonst nur mit Freeze", () => {
    expect(isStreakAlive(base, "2026-07-02")).toBe(true);
    expect(isStreakAlive(base, "2026-07-03")).toBe(true); // Freeze verfügbar
    expect(isStreakAlive({ ...base, freezesAvailable: 0 }, "2026-07-03")).toBe(false);
  });
});
