/**
 * Einzelne Lektion generieren (für Themen außerhalb des Lehrplans):
 *
 *   npm run generate -- --course tr-b1-selbststaendig --level B1 \
 *     --unit "Meinungen & Diskussionen" --title "Ich bin anderer Meinung" \
 *     --topic "höflich widersprechen, Meinung begründen (bence, katılmıyorum, çünkü)"
 *
 * Für den kompletten Lehrplan: npm run generate:curriculum
 * Ergebnis: content/generated/<slug>.json → danach: npm run db:seed
 */
import { generateOneLesson, lessonSlug, loadDotEnv } from "./lib/generation";

loadDotEnv();

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const courseSlug = arg("course") ?? "tr-a2-alltag-reisen";
const level = arg("level") ?? "A2";
const unitTitle = arg("unit") ?? "Weitere Themen";
const title = arg("title");
const topic = arg("topic");

if (!title || !topic) {
  console.error('Pflicht-Argumente: --title "Lektionstitel" --topic "Lernziel/Themen"');
  process.exit(1);
}
if (!process.env.ANTHROPIC_API_KEY && !process.env.GEMINI_API_KEY && !process.env.GROQ_API_KEY) {
  console.error("❌ Kein API-Key in der .env: GEMINI_API_KEY (kostenlos, empfohlen), GROQ_API_KEY oder ANTHROPIC_API_KEY (beste Qualität) eintragen – siehe README.");
  process.exit(1);
}

async function main() {
  console.log(`🧠 Generiere Lektion „${title}“ (${level}, Kurs ${courseSlug}) …`);
  const result = await generateOneLesson({
    courseSlug,
    level,
    unitTitle,
    title: title!,
    topic: topic!,
  });

  if (!result.ok) {
    console.error("❌ Fehlgeschlagen:\n   " + (result.errors?.join("\n   ") ?? "unbekannt"));
    console.error("→ Nochmal ausführen (die API antwortet nicht deterministisch) oder Topic präzisieren.");
    process.exit(1);
  }

  console.log(`✅ Validiert & gespeichert: ${result.file}`);
  console.log("→ Jetzt in die Datenbank übernehmen:  npm run db:seed");
  console.log("⚠️  Tipp: Lektion einmal durchspielen – ein menschlicher Blick aufs Türkische schadet nie.");
}

main();
