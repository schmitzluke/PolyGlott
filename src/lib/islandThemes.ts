export interface IslandTheme {
  slug: string;
  label: string;
}

export const ISLAND_THEMES: IslandTheme[] = [
  { slug: "grundlagen", label: "Grundlagen" },
  { slug: "familie-beziehungen", label: "Familie & Beziehungen" },
  { slug: "haushalt-alltag", label: "Haushalt & Alltag" },
  { slug: "soziale-interaktionen", label: "Soziale Interaktionen" },
  { slug: "hobbys", label: "Hobbys" },
  { slug: "arbeit", label: "Arbeit" },
  { slug: "reisen-ausland", label: "Reisen & Ausland" },
  { slug: "essen-shoppen", label: "Essen gehen & Shoppen" },
];

export const ISLAND_THEME_SLUGS: string[] = ISLAND_THEMES.map((t) => t.slug);

export function isValidThemeSlug(slug: string): boolean {
  return ISLAND_THEME_SLUGS.includes(slug);
}

export function themeLabel(slug: string): string {
  return ISLAND_THEMES.find((t) => t.slug === slug)?.label ?? "Sonstiges";
}
