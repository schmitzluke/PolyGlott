/**
 * Batch-Generator: arbeitet den kompletten CEFR-Lehrplan (content/curriculum.ts)
 * ab und generiert alle noch fehlenden Lektionen. Resumierbar – bereits
 * generierte Lektionen werden übersprungen, bei Abbruch einfach neu starten.
 *
 *   npm run generate:curriculum                  # alles Fehlende
 *   npm run generate:curriculum -- --level B1    # nur ein Level
 *   npm run generate:curriculum -- --limit 5     # max. 5 Lektionen in diesem Lauf
 *
 * Danach: npm run db:seed
 */
import { CURRICULUM } from "../content/curriculum";
import { alreadyGenerated, generateOneLesson, lessonSlug, loadDotEnv } from "./lib/generation";

loadDotEnv();

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const levelFilter = arg("level");
const limit = Number(arg("limit") ?? Infinity);

async function main() {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.GEMINI_API_KEY && !process.env.GROQ_API_KEY) {
    console.error("❌ Kein API-Key in der .env: GEMINI_API_KEY (kostenlos, empfohlen), GROQ_API_KEY oder ANTHROPIC_API_KEY (beste Qualität) eintragen – siehe README.");
    process.exit(1);
  }

  const planned = CURRICULUM.filter((p) => !levelFilter || p.level === levelFilter);
  const missing = planned.filter((p) => !alreadyGenerated(lessonSlug(p.courseSlug, p.title)));

  console.log(`📚 Lehrplan: ${planned.length} Lektionen${levelFilter ? ` (Level ${levelFilter})` : ""}, davon fehlen ${missing.length}.`);
  if (missing.length === 0) {
    console.log("✅ Alles bereits generiert. → npm run db:seed");
    return;
  }

  let done = 0;
  let failed = 0;

  for (const item of missing.slice(0, limit)) {
    process.stdout.write(`🧠 [${done + failed + 1}/${Math.min(missing.length, limit)}] ${item.level} · ${item.unit} · „${item.title}“ … `);
    try {
      // Sequentiell mit kleiner Pause: schont Rate-Limits und erlaubt Vokabel-Recycling
      // aus frisch generierten Lektionen.
      const result = await generateOneLesson({
        courseSlug: item.courseSlug,
        level: item.level,
        unitTitle: item.unit,
        unitDescription: item.unitDescription,
        title: item.title,
        topic: item.topic,
      });
      if (result.ok) {
        done++;
        console.log("✅");
      } else {
        failed++;
        console.log(`❌\n   ${result.errors?.join("\n   ")}`);
        console.log("   → Wird beim nächsten Lauf erneut versucht.");
      }
    } catch (e) {
      failed++;
      console.log(`❌ ${e instanceof Error ? e.message : e}`);
    }
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(`\n🎉 Fertig: ${done} generiert, ${failed} fehlgeschlagen (einfach erneut ausführen).`);
  if (done > 0) console.log("→ Jetzt in die Datenbank übernehmen:  npm run db:seed");
}

main();
