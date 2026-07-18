import { describe, expect, it } from "vitest";
import { ISLAND_THEMES, ISLAND_THEME_SLUGS, isValidThemeSlug, themeLabel } from "@/lib/islandThemes";

describe("islandThemes", () => {
  it("has exactly 8 themes with unique slugs", () => {
    expect(ISLAND_THEMES).toHaveLength(8);
    const slugs = ISLAND_THEMES.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(8);
  });

  it("ISLAND_THEME_SLUGS matches ISLAND_THEMES slugs", () => {
    expect(ISLAND_THEME_SLUGS).toEqual(ISLAND_THEMES.map((t) => t.slug));
  });

  it("isValidThemeSlug is true for known slugs, false otherwise", () => {
    expect(isValidThemeSlug("grundlagen")).toBe(true);
    expect(isValidThemeSlug("arbeit")).toBe(true);
    expect(isValidThemeSlug("erfundenes-thema")).toBe(false);
    expect(isValidThemeSlug("")).toBe(false);
  });

  it("themeLabel returns the German label for a known slug", () => {
    expect(themeLabel("familie-beziehungen")).toBe("Familie & Beziehungen");
    expect(themeLabel("essen-shoppen")).toBe("Essen gehen & Shoppen");
  });

  it("themeLabel falls back to 'Sonstiges' for unknown slugs", () => {
    expect(themeLabel("nicht-vorhanden")).toBe("Sonstiges");
  });
});
