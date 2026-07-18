import { describe, it, expect } from "vitest";
import { pickNextAction, type CandidateInput } from "@/lib/nextAction";

describe("pickNextAction", () => {
  it("wählt reviews, wenn alle Kandidaten verfügbar sind (höchstes Grundgewicht)", () => {
    const candidates: CandidateInput[] = [
      { key: "reviews", available: true, daysSinceLastUse: 0 },
      { key: "islands", available: true, daysSinceLastUse: 0 },
      { key: "stash", available: true, daysSinceLastUse: 0 },
      { key: "media", available: true, daysSinceLastUse: 0 },
      { key: "commute", available: true, daysSinceLastUse: 0 },
    ];
    const result = pickNextAction(candidates);
    expect(result?.key).toBe("reviews");
  });
});
