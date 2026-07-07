import type { SeedCourse } from "../src/lib/types";

/**
 * Kurs-Hülle für B1: Die Lektionen werden mit dem Generator erzeugt
 * (siehe content/curriculum-b1.md) und docken über content/generated/ hier an.
 */
export const courseDeTrB1: SeedCourse = {
  slug: "tr-b1-selbststaendig",
  title: "Türkisch B1 – Selbstständig sprechen",
  description:
    "Zukunftspläne, Meinungen, Beruf und Erlebnisse – frei formulieren statt Sätze bauen. Wächst Lektion für Lektion (Generator).",
  level: "B1",
  sourceLang: "de",
  targetLang: "tr",
  isPremium: true,
  units: [],
};
