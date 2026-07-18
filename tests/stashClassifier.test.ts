import { describe, expect, it } from "vitest";
import {
  parseClassificationResponse,
  groupNewTopics,
  slugifyTopic,
  buildClassificationPrompt,
  MIN_NEW_ISLAND_SIZE,
} from "@/lib/stashClassifier";

describe("parseClassificationResponse", () => {
  it("parses valid existing-island and new-topic entries", () => {
    const raw = `[
      {"sentenceId": "s1", "existingIslandSlug": "begruessen"},
      {"sentenceId": "s2", "newTopicLabel": "Beim Arzt", "theme": "haushalt-alltag"}
    ]`;
    const result = parseClassificationResponse(raw, ["s1", "s2"]);
    expect(result).toEqual([
      { sentenceId: "s1", existingIslandSlug: "begruessen" },
      { sentenceId: "s2", newTopicLabel: "Beim Arzt", theme: "haushalt-alltag" },
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

  it("ignores newTopicLabel entries with a missing theme", () => {
    const raw = `[{"sentenceId": "s1", "newTopicLabel": "Beim Arzt"}]`;
    expect(parseClassificationResponse(raw, ["s1"])).toEqual([]);
  });

  it("ignores newTopicLabel entries with an invalid theme slug", () => {
    const raw = `[{"sentenceId": "s1", "newTopicLabel": "Beim Arzt", "theme": "erfundenes-thema"}]`;
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
  it("groups sentenceIds by normalized topic label and carries the theme", () => {
    const results = [
      { sentenceId: "s1", newTopicLabel: "Beim Arzt", theme: "haushalt-alltag" },
      { sentenceId: "s2", newTopicLabel: "beim arzt", theme: "haushalt-alltag" },
      { sentenceId: "s3", newTopicLabel: " Beim Arzt ", theme: "haushalt-alltag" },
      { sentenceId: "s4", existingIslandSlug: "begruessen" } as const,
    ];
    const groups = groupNewTopics(results as never, 3);
    expect(groups.size).toBe(1);
    expect(groups.get("Beim Arzt")).toEqual({
      sentenceIds: ["s1", "s2", "s3"],
      theme: "haushalt-alltag",
    });
  });

  it("drops groups below the minimum size", () => {
    const results = [
      { sentenceId: "s1", newTopicLabel: "Hobbys", theme: "hobbys" },
      { sentenceId: "s2", newTopicLabel: "Hobbys", theme: "hobbys" },
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

describe("buildClassificationPrompt", () => {
  it("returns a system and user prompt containing the candidates, islands, and valid theme slugs", () => {
    const result = buildClassificationPrompt(
      [{ id: "s1", germanOriginal: "Ich habe Kopfschmerzen." }],
      [{ slug: "begruessen", title: "Begrüßen" }]
    );
    expect(result.system).toContain("theme");
    expect(result.system).toContain("grundlagen");
    expect(result.system).toContain("essen-shoppen");
    expect(result.user).toContain("s1: Ich habe Kopfschmerzen.");
    expect(result.user).toContain("begruessen: Begrüßen");
  });
});
