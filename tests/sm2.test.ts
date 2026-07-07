import { describe, expect, it } from "vitest";
import { INITIAL_SM2, applyReview, sm2 } from "@/lib/sm2";

const NOW = new Date("2026-07-04T12:00:00Z");
const DAY = 24 * 60 * 60 * 1000;

describe("SM-2", () => {
  it("erstes erfolgreiches Review → Intervall 1 Tag", () => {
    const r = sm2(INITIAL_SM2, 4, NOW);
    expect(r.repetitions).toBe(1);
    expect(r.intervalDays).toBe(1);
    expect(r.dueAt.getTime()).toBe(NOW.getTime() + 1 * DAY);
  });

  it("zweites erfolgreiches Review → Intervall 6 Tage", () => {
    const first = sm2(INITIAL_SM2, 4, NOW);
    const second = sm2(first, 4, NOW);
    expect(second.repetitions).toBe(2);
    expect(second.intervalDays).toBe(6);
  });

  it("drittes Review → Intervall = Runde(6 × EF)", () => {
    let state = sm2(INITIAL_SM2, 4, NOW);
    state = sm2(state, 4, NOW);
    const third = sm2(state, 4, NOW);
    expect(third.repetitions).toBe(3);
    expect(third.intervalDays).toBe(Math.round(6 * state.easeFactor));
  });

  it("quality 5 erhöht den Ease-Faktor, quality 3 senkt ihn", () => {
    const easy = sm2(INITIAL_SM2, 5, NOW);
    const hard = sm2(INITIAL_SM2, 3, NOW);
    expect(easy.easeFactor).toBeGreaterThan(2.5);
    expect(hard.easeFactor).toBeLessThan(2.5);
  });

  it("Fehlschlag (quality < 3) setzt Wiederholungen zurück, Intervall 1", () => {
    let state = sm2(INITIAL_SM2, 5, NOW);
    state = sm2(state, 5, NOW);
    state = sm2(state, 5, NOW);
    const failed = sm2(state, 1, NOW);
    expect(failed.repetitions).toBe(0);
    expect(failed.intervalDays).toBe(1);
  });

  it("Ease-Faktor fällt nie unter 1.3", () => {
    let state = INITIAL_SM2;
    for (let i = 0; i < 20; i++) state = sm2(state, 0, NOW);
    expect(state.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("bekannte SM-2-Referenzwerte für den Ease-Faktor", () => {
    // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
    expect(sm2(INITIAL_SM2, 5, NOW).easeFactor).toBeCloseTo(2.6, 5);
    expect(sm2(INITIAL_SM2, 4, NOW).easeFactor).toBeCloseTo(2.5, 5);
    expect(sm2(INITIAL_SM2, 3, NOW).easeFactor).toBeCloseTo(2.36, 5);
  });

  it("wirft bei ungültiger quality", () => {
    expect(() => sm2(INITIAL_SM2, 6, NOW)).toThrow();
    expect(() => sm2(INITIAL_SM2, -1, NOW)).toThrow();
  });
});

describe("applyReview (Festigungs-Karten, Anki-Prinzip)", () => {
  const learned = { easeFactor: 2.5, intervalDays: 6, repetitions: 2 };

  it("fällige Karte: normales SM-2, Zeitplan wird fortgeschrieben", () => {
    const { reschedule, result } = applyReview(learned, 4, false, NOW);
    expect(reschedule).toBe(true);
    expect(result).not.toBeNull();
    expect(result!.repetitions).toBe(3);
  });

  it("vorgezogene Karte + gewusst: Zeitplan bleibt unangetastet (keine Intervall-Inflation)", () => {
    const { reschedule, result } = applyReview(learned, 4, true, NOW);
    expect(reschedule).toBe(false);
    expect(result).toBeNull();
  });

  it("vorgezogene Karte + Einfach: ebenfalls kein Reschedule", () => {
    expect(applyReview(learned, 5, true, NOW).reschedule).toBe(false);
  });

  it("vorgezogene Karte + vergessen: voller SM-2-Reset, bald wieder fällig", () => {
    const { reschedule, result } = applyReview(learned, 1, true, NOW);
    expect(reschedule).toBe(true);
    expect(result!.repetitions).toBe(0);
    expect(result!.intervalDays).toBe(1);
  });
});
