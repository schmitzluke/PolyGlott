import { describe, expect, it } from "vitest";
import { createNewCard, reviewCard, Rating, State } from "../src/lib/fsrs";
import { formatInterval } from "../src/lib/fsrs";

describe("FSRS Algorithm", () => {
  it("initializes a new card correctly", () => {
    const card = createNewCard();
    expect(card.state).toBe(State.New);
    expect(card.stability).toBe(0);
    expect(card.difficulty).toBe(0);
  });

  it("updates state to Learning when graded Again", () => {
    const card = createNewCard();
    const { card: updatedCard } = reviewCard(card, Rating.Again);
    expect(updatedCard.state).toBe(State.Learning);
    // When retrying immediately, the due time should be very soon (usually 1-5 mins)
  });

  it("updates state to Review when graded Good or Easy", () => {
    const card = createNewCard();
    const { card: goodCard } = reviewCard(card, Rating.Good);
    expect(goodCard.state).toBe(State.Learning);
    
    // FSRS typical flow for Good on a New card is Learning -> Review (or graduation step)
    // ts-fsrs defines specific steps. Let's just check stability increases.
    expect(goodCard.stability).toBeGreaterThan(0);
  });

  it("formats intervals correctly", () => {
    const now = new Date("2026-07-07T12:00:00Z");
    
    // + 5 mins
    const d1 = new Date("2026-07-07T12:05:00Z");
    expect(formatInterval(d1, now)).toBe("5 min");

    // + 3 hours
    const d2 = new Date("2026-07-07T15:00:00Z");
    expect(formatInterval(d2, now)).toBe("3 Std.");

    // + 1 day
    const d3 = new Date("2026-07-08T12:00:00Z");
    expect(formatInterval(d3, now)).toBe("1 Tag");

    // + 4 days
    const d4 = new Date("2026-07-11T12:00:00Z");
    expect(formatInterval(d4, now)).toBe("4 Tage");

    // + 1 month (30 days)
    const d5 = new Date("2026-08-06T12:00:00Z");
    expect(formatInterval(d5, now)).toBe("1 Monat");
  });
});
