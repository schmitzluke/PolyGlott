export interface ReviewScopeFilters {
  islandPackId?: string;
  contentType?: "sentences" | "stories";
  storyId?: string;
}

/**
 * Baut das Prisma-`where`-OR-Fragment, um ReviewItems auf eine Insel und/oder
 * einen Content-Typ einzuschränken. Kein Filter → undefined (globales, unverändertes
 * Verhalten von /api/reviews). Wird per `AND: [{ OR: dueOr(now) }, scopeWhere]` bzw.
 * direkt gespreadet in die jeweilige Query eingebunden (siehe Task 3).
 */
export function buildReviewScopeWhere(
  filters: ReviewScopeFilters
): { OR: Record<string, unknown>[] } | undefined {
  const { islandPackId, contentType, storyId } = filters;

  if (contentType === "stories" && storyId) {
    return { OR: [{ islandStorySentence: { storyId } }] };
  }

  if (!islandPackId) return undefined;

  if (contentType === "sentences") {
    return {
      OR: [
        { islandSentence: { packId: islandPackId } },
        { stashSentence: { islandPackId } },
      ],
    };
  }

  if (contentType === "stories") {
    return { OR: [{ islandStorySentence: { story: { packId: islandPackId } } }] };
  }

  return {
    OR: [
      { islandSentence: { packId: islandPackId } },
      { stashSentence: { islandPackId } },
      { islandStorySentence: { story: { packId: islandPackId } } },
    ],
  };
}
