/**
 * CLI: Festigungs-Analyse der Seed-Kurse. Misst, ob das Curriculum Wissen
 * FESTIGT (Wiederkehr + Verteilung + Kontext-Vielfalt), nicht nur einführt.
 * Reine Struktur-Analyse, kein LLM. Logik: scripts/lib/festigung.ts
 *
 * Lauf:  npx tsx scripts/analyze-festigung.ts
 *        npx tsx scripts/analyze-festigung.ts --course tr-a1-alltag --fix
 *        npx tsx scripts/analyze-festigung.ts --json
 */
import { allCourses } from "../content";
import {
  analyzeCourse,
  computeStats,
  recyclingPlan,
  FESTIGT_MIN_ENCOUNTERS,
  FESTIGT_MIN_SPREAD_LESSONS,
  FESTIGT_MIN_CONTEXTS,
} from "./lib/festigung";

const args = process.argv.slice(2);
const jsonOut = args.includes("--json");
const fixOut = args.includes("--fix");
const onlySlug = args.includes("--course") ? args[args.indexOf("--course") + 1] : null;

const analyses = allCourses
  .filter((c) => !onlySlug || c.slug === onlySlug)
  .map(analyzeCourse);

if (jsonOut) {
  console.log(
    JSON.stringify(
      analyses.map((a) => ({ ...computeStats(a), masteryRatio: +computeStats(a).masteryRatio.toFixed(3), details: a.scores })),
      null,
      2
    )
  );
  process.exit(0);
}

for (const a of analyses) {
  const st = computeStats(a);
  console.log(`\n━━━ ${st.slug}  (${st.title})`);
  console.log(`  Lektionen:        ${st.lessons}`);
  console.log(`  Vokabeln gesamt:  ${st.vocab}`);
  console.log(
    `  GEFESTIGT:        ${st.gefestigt}  (${(st.masteryRatio * 100).toFixed(1)}%)  ` +
      `[>=${FESTIGT_MIN_ENCOUNTERS} Begegn., >=${FESTIGT_MIN_SPREAD_LESSONS} spätere Lekt., >=${FESTIGT_MIN_CONTEXTS} Kontexte]`
  );
  console.log(`  Nur eingeführt:   ${st.vocab - st.gefestigt}  (davon ${st.einmalig} EINMALIG, nie wieder)`);

  if (a.einmalig.length) {
    console.log(`\n  ⚠  Einmalig eingeführt (Vergessens-Risiko), erste 15:`);
    for (const s of a.einmalig.slice(0, 15))
      console.log(`     L${s.introIndex + 1}  "${s.target}"  (${s.source})  key=${s.key ?? "—"}`);
  }
  if (a.orderingBugs.length) {
    console.log(`\n  ✗  Ordering-Bugs (benutzt VOR Einführung):`);
    for (const s of a.orderingBugs.slice(0, 15)) {
      const first = Math.min(...s.encounters) + 1;
      console.log(`     "${s.target}" eingeführt L${s.introIndex + 1}, aber schon L${first} benutzt`);
    }
  }

  if (fixOut) {
    const plan = recyclingPlan(a);
    const keys = [...plan.keys()].sort((x, y) => x - y);
    console.log(`\n  🔧 Recycling-Plan (${keys.length} Lektionen):`);
    for (const idx of keys) {
      const words = plan.get(idx)!;
      console.log(`  L${idx + 1} "${a.lessons[idx].title}" — recycle (${words.length}):`);
      for (const s of words)
        console.log(`     • "${s.target}" (${s.source}) — eingef. L${s.introIndex + 1}, bisher ${s.encounters.length}x`);
    }
  }

  const hist = new Map<number, number>();
  for (const s of a.scores) {
    const b = Math.min(s.encounters.length, 6);
    hist.set(b, (hist.get(b) ?? 0) + 1);
  }
  console.log(`\n  Begegnungs-Verteilung:`);
  for (let b = 1; b <= 6; b++) {
    const n = hist.get(b) ?? 0;
    console.log(`     ${b === 6 ? "6+" : b}x: ${"█".repeat(Math.round(n / 2))} ${n}`);
  }
}
console.log("");
