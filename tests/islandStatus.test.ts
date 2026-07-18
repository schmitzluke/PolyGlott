import { describe, expect, it } from "vitest";
import { deriveSentenceStars } from "@/lib/islandStatus";

describe("deriveSentenceStars", () => {
  it("returns 0 for null/undefined (sentence not yet learned)", () => {
    expect(deriveSentenceStars(null)).toBe(0);
    expect(deriveSentenceStars(undefined)).toBe(0);
  });

  it("returns 0 for state=New (0)", () => {
    expect(deriveSentenceStars({ state: 0, stability: 0 })).toBe(0);
  });

  it("returns 1 for state=Learning (1)", () => {
    expect(deriveSentenceStars({ state: 1, stability: 0.5 })).toBe(1);
  });

  it("returns 2 for state=Relearning (3)", () => {
    expect(deriveSentenceStars({ state: 3, stability: 1 })).toBe(2);
  });

  it("returns 3 for state=Review with stability below 7 days", () => {
    expect(deriveSentenceStars({ state: 2, stability: 3 })).toBe(3);
  });

  it("returns 4 for state=Review with stability 7-20 days", () => {
    expect(deriveSentenceStars({ state: 2, stability: 7 })).toBe(4);
    expect(deriveSentenceStars({ state: 2, stability: 20.9 })).toBe(4);
  });

  it("returns 5 for state=Review with stability >= 21 days (mastered)", () => {
    expect(deriveSentenceStars({ state: 2, stability: 21 })).toBe(5);
    expect(deriveSentenceStars({ state: 2, stability: 100 })).toBe(5);
  });
});
