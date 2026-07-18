import { describe, expect, it } from "vitest";
import {
  parseClassificationResponse,
  groupNewTopics,
  slugifyTopic,
  MIN_NEW_ISLAND_SIZE,
} from "@/lib/stashClassifier";

describe("parseClassificationResponse", () => {
  it("parses valid existing-island and new-topic entries", () => {
    const raw = `[
      {"sentenceId": "s1", "existingIslandSlug": "begruessen"},
      {"sentenceId": "s2", "newTopicLabel": "Beim Arzt"}
    ]`;
    const result = parseClassificationResponse(raw, ["s1", "s2"]);
    expect(result).toEqual([
      { sentenceId: "s1", existingIslandSlug: "begruessen" },
      { sentenceId: "s2", newTopicLabel: "Beim Arzt" },
    ]);
  });

  it("ignores entries with unknown sentenceId", () => {
    const raw = `[{"sentenceId": "unknown", "existingIslandSlug": "begruessen"}]`;
    expect(parseClassificationResponse(raw, ["s1"])).toEqual([]);
  });

  it("ignores entries with neither existingIslandSlug nor newTopicLabel", () => {
    const raw = `[{"sentenceId": "s1"}]`;
    expect(parseClassificationResponse(raw, ["s1"])).toEqual([]);
  });

  it("returns empty array when response has no JSON array", () => {
    expect(parseClassificationResponse("kein json hier", ["s1"])).toEqual([]);
  });

  it("extracts JSON array even when wrapped in markdown fences", () => {
    const raw = "```json\n[{\"sentenceId\": \"s1\", \"existingIslandSlug\": \"begruessen\"}]\n```";
    expect(parseClassificationResponse(raw, ["s1"])).toEqual([
      { sentenceId: "s1", existingIslandSlug: "begruessen" },
    ]);
  });
});

describe("groupNewTopics", () => {
  it("groups sentenceIds by normalized topic label", () => {
    const results = [
      { sentenceId: "s1", newTopicLabel: "Beim Arzt" },
      { sentenceId: "s2", newTopicLabel: "beim arzt" },
      { sentenceId: "s3", newTopicLabel: " Beim Arzt " },
      { sentenceId: "s4", existingIslandSlug: "begruessen" } as const,
    ];
    const groups = groupNewTopics(results as never, 3);
    expect(groups.size).toBe(1);
    expect(groups.get("Beim Arzt")).toEqual(["s1", "s2", "s3"]);
  });

  it("drops groups below the minimum size", () => {
    const results = [
      { sentenceId: "s1", newTopicLabel: "Hobbys" },
      { sentenceId: "s2", newTopicLabel: "Hobbys" },
    ];
    const groups = groupNewTopics(results as never, MIN_NEW_ISLAND_SIZE);
    expect(groups.size).toBe(0);
  });
});

describe("slugifyTopic", () => {
  it("converts a German topic label to a URL-safe slug", () => {
    expect(slugifyTopic("Beim Arzt")).toBe("beim-arzt");
    expect(slugifyTopic("Über Wörter & Sätze")).toBe("ueber-woerter-und-saetze");
  });
});
