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

  it("ignoriert nicht verfügbare Kandidaten", () => {
    const candidates: CandidateInput[] = [
      { key: "reviews", available: false, daysSinceLastUse: null },
      { key: "islands", available: true, daysSinceLastUse: 0 },
    ];
    const result = pickNextAction(candidates);
    expect(result?.key).toBe("islands");
  });

  it("gibt null zurück, wenn kein Kandidat verfügbar ist", () => {
    const candidates: CandidateInput[] = [
      { key: "reviews", available: false, daysSinceLastUse: null },
      { key: "commute", available: false, daysSinceLastUse: null },
    ];
    expect(pickNextAction(candidates)).toBeNull();
  });

  it("Freshness-Bonus kippt Wahl bei knappem Abstand (islands vs. stash)", () => {
    const candidates: CandidateInput[] = [
      { key: "stash", available: true, daysSinceLastUse: 0 }, // 40
      { key: "islands", available: true, daysSinceLastUse: 5 }, // 55 * 1.1 = 60.5, immer noch höher — kein Kipp-Fall hier
    ];
    const result = pickNextAction(candidates);
    expect(result?.key).toBe("islands");
    expect(result?.reason).toBe("Lange nicht genutzt (5 Tage)");
  });

  it("Freshness-Bonus überstimmt niemals die Grundrangfolge (reviews bleibt vorn)", () => {
    const candidates: CandidateInput[] = [
      { key: "reviews", available: true, daysSinceLastUse: 0 }, // 100
      { key: "islands", available: true, daysSinceLastUse: 30 }, // 55 * 1.1 = 60.5
    ];
    const result = pickNextAction(candidates);
    expect(result?.key).toBe("reviews");
  });
});
