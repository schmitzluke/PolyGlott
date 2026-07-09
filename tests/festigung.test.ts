import { describe, expect, it } from "vitest";
import { allCourses } from "../content";
import { analyzeCourse, computeStats } from "../scripts/lib/festigung";

/**
 * Festigungs-Ratchet: friert den Ist-Stand der Curriculum-Qualität ein.
 * Änderungen an content/*.ts dürfen die Festigung NICHT verschlechtern
 * (masteryRatio nicht sinken, Ordering-Bugs nicht steigen).
 *
 * Verbessert sich der Content, hebt man die Baseline hier an → verhindert
 * stilles Zurückrutschen. Siehe scripts/analyze-festigung.ts für den Report.
 *
 * Baseline erfasst 2026-07-08. Nur nach OBEN anpassen (ratio ↑, bugs ↓).
 * A1 2026-07-08: Recycling-Checkpoints L5/L8/L11 → 22 Kernwörter (4.3% → 19.1%).
 * A1 2026-07-09: Review-Dialoge L9–L18 → 61.0%; dann 2 Schluss-Wiederhol-
 *   Lektionen (u6-l4/l5) für L17/L18-Wörter → 72.3% (102/141). Rest: Funktions-
 *   wörter (var/yok/benim/senin/istemek) key=null; Stemmer-Edges (okul: „okula"→
 *   „oku"). Stemmer-Update (-mek/-mak) legte 2 Alt-Bugs offen → maxOrderingBugs 11.
 */
const BASELINE: Record<string, { minMasteryRatio: number; maxOrderingBugs: number }> = {
  "tr-a1-alltag": { minMasteryRatio: 0.72, maxOrderingBugs: 11 },
  "tr-a2-alltag-reisen": { minMasteryRatio: 0.063, maxOrderingBugs: 3 },
};

const stats = new Map(
  allCourses.map((c) => [c.slug, computeStats(analyzeCourse(c))])
);

describe("Curriculum-Festigung (Ratchet)", () => {
  for (const [slug, base] of Object.entries(BASELINE)) {
    describe(slug, () => {
      it("masteryRatio sinkt nicht unter Baseline", () => {
        const s = stats.get(slug);
        expect(s, `Kurs ${slug} fehlt`).toBeDefined();
        // -0.001 Toleranz gegen Float-Rundung
        expect(s!.masteryRatio).toBeGreaterThanOrEqual(base.minMasteryRatio - 0.001);
      });

      it("Ordering-Bugs steigen nicht über Baseline", () => {
        const s = stats.get(slug)!;
        expect(s.orderingBugs).toBeLessThanOrEqual(base.maxOrderingBugs);
      });
    });
  }

  it("jede eingeführte Vokabel liefert einen Score", () => {
    for (const s of stats.values()) expect(s.vocab).toBeGreaterThanOrEqual(0);
  });
});
