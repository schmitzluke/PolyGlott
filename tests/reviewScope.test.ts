import { describe, expect, it } from "vitest";
import { buildReviewScopeWhere } from "@/lib/reviewScope";

describe("buildReviewScopeWhere", () => {
  it("returns undefined when no filters are given (global scope, unchanged behavior)", () => {
    expect(buildReviewScopeWhere({})).toBeUndefined();
  });

  it("scopes to sentences of one island (curated + custom stash sentences)", () => {
    expect(buildReviewScopeWhere({ islandPackId: "pack1", contentType: "sentences" })).toEqual({
      OR: [
        { islandSentence: { packId: "pack1" } },
        { stashSentence: { islandPackId: "pack1" } },
      ],
    });
  });

  it("scopes to all stories of one island when no storyId is given", () => {
    expect(buildReviewScopeWhere({ islandPackId: "pack1", contentType: "stories" })).toEqual({
      OR: [{ islandStorySentence: { story: { packId: "pack1" } } }],
    });
  });

  it("scopes to a single story regardless of islandPackId when storyId is given", () => {
    expect(buildReviewScopeWhere({ islandPackId: "pack1", contentType: "stories", storyId: "story1" })).toEqual({
      OR: [{ islandStorySentence: { storyId: "story1" } }],
    });
    expect(buildReviewScopeWhere({ contentType: "stories", storyId: "story1" })).toEqual({
      OR: [{ islandStorySentence: { storyId: "story1" } }],
    });
  });

  it("combines sentences and stories when islandPackId is given without contentType", () => {
    expect(buildReviewScopeWhere({ islandPackId: "pack1" })).toEqual({
      OR: [
        { islandSentence: { packId: "pack1" } },
        { stashSentence: { islandPackId: "pack1" } },
        { islandStorySentence: { story: { packId: "pack1" } } },
      ],
    });
  });

  it("returns undefined when contentType is given without islandPackId or storyId", () => {
    expect(buildReviewScopeWhere({ contentType: "sentences" })).toBeUndefined();
  });
});
