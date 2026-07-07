/**
 * Gemeinsamer Generator-Kern für generate-lesson.ts (einzeln) und
 * generate-curriculum.ts (Batch). Erzeugt eine Lektion per Claude-API,
 * validiert sie und speichert sie als JSON in content/generated/.
 */
import fs from "fs";
import path from "path";
import { allCourses } from "../../content";
import { validateLesson } from "../../src/lib/validateLesson";
import { activeProvider, askLLM } from "../../src/lib/llm";
import type { SeedLesson } from "../../src/lib/types";

export const GENERATED_DIR = path.join(__dirname, "../../content/generated");

/** .env laden (Skripte laufen außerhalb von Next.js) */
export function loadDotEnv(): void {
  const envPath = path.join(__dirname, "../../.env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" })[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
}

export function lessonSlug(courseSlug: string, title: string): string {
  return `${courseSlug}-gen-${slugify(title)}`;
}

export function alreadyGenerated(slug: string): boolean {
  return fs.existsSync(path.join(GENERATED_DIR, `${slug}.json`));
}

/** Wortschatz aus handgeschriebenen + bereits generierten Lektionen (Recycling). */
export function collectKnownVocab(): string[] {
  const fromCourses = allCourses.flatMap((c) =>
    c.units.flatMap((u) => u.lessons.flatMap((l) => l.vocab.map((v) => v.target)))
  );
  const fromGenerated: string[] = [];
  if (fs.existsSync(GENERATED_DIR)) {
    for (const file of fs.readdirSync(GENERATED_DIR).filter((f) => f.endsWith(".json"))) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(GENERATED_DIR, file), "utf-8"));
        for (const v of data.lesson?.vocab ?? []) fromGenerated.push(v.target);
      } catch {
        /* defekte Datei ignorieren */
      }
    }
  }
  return [...new Set([...fromCourses, ...fromGenerated])].slice(0, 250);
}

function buildSchemaDoc(slug: string): string {
  return `
{
  "slug": "${slug}",
  "title": "…",
  "intro": "Lernziel + Situation in 1–2 Sätzen (Deutsch)",
  "grammarTip": "Kurzer expliziter Grammatiktipp (Deutsch, 1–3 Sätze)",
  "cultureTip": "Optional: kurzer Kulturtipp",
  "vocab": [ { "source": "deutsches Wort/Phrase", "target": "türkisches Wort/Phrase", "exampleSource": "optional", "exampleTarget": "optional" } ],
  "exercises": [
    { "type": "multiple_choice", "content": { "question": "…(Deutsch)", "audioText": "türkischer Satz (optional)", "options": ["…","…","…"], "correctIndex": 0, "explanation": "…(Deutsch)" } },
    { "type": "vocab_match", "content": { "prompt": "Ordne die Paare zu.", "pairs": [{"source":"…","target":"…"}] } },
    { "type": "gap_fill", "content": { "sentence": "türkischer Satz mit ___", "options": ["…","…","…"], "solution": "…", "translation": "…(Deutsch)", "explanation": "…" } },
    { "type": "sentence_order", "content": { "prompt": "Bilde den Satz: „…“", "tokens": ["…"], "solution": "tokens in richtiger Reihenfolge, mit Leerzeichen verbunden", "translation": "…", "audioText": "…" } },
    { "type": "translation", "content": { "prompt": "deutscher Satz", "solution": "türkische Lösung", "altSolutions": ["Varianten"], "hint": "optional", "explanation": "…" } },
    { "type": "listening", "content": { "audioText": "türkischer Satz", "question": "…(Deutsch)", "options": ["…","…","…"], "correctIndex": 0, "explanation": "…" } },
    { "type": "pronunciation", "content": { "text": "türkischer Satz", "translation": "…", "tip": "Aussprache-Hinweis" } },
    { "type": "dialogue", "content": { "title": "…", "scene": "…(Deutsch)", "turns": [ { "speaker": "Name", "text": "türkisch", "translation": "deutsch" }, { "speaker": "Du", "choices": [ { "text": "…", "correct": true, "feedback": "…" }, { "text": "…", "correct": false, "feedback": "…" } ] } ] } }
  ]
}`;
}

export interface GenerateParams {
  courseSlug: string;
  level: string;
  unitTitle: string;
  unitDescription?: string;
  title: string;
  topic: string;
}

export interface GenerateResult {
  ok: boolean;
  slug: string;
  file?: string;
  errors?: string[];
}

export async function generateOneLesson(params: GenerateParams): Promise<GenerateResult> {
  const provider = activeProvider();
  if (!provider) throw new Error("Kein API-Key: GROQ_API_KEY oder ANTHROPIC_API_KEY in .env eintragen.");

  const slug = lessonSlug(params.courseSlug, params.title);
  const knownVocab = collectKnownVocab();

  const system = `Du bist Türkisch-Didaktiker:in und erstellst Lektionen für eine Sprachlern-App (Deutsch → Türkisch) nach der Babbel-Methode.

VERBINDLICHE REGELN:
- Sprachlich korrektes, natürliches Türkisch (Vokalharmonie beachten!), Niveau ${params.level} (CEFR).
- Alltagsnah: ganze, sofort verwendbare Sätze und Dialoge, keine isolierten Vokabellisten.
- 6–8 Vokabeln, GENAU 9–10 Übungen in Didaktik-Sequenz: erst Wörter einführen (multiple_choice mit audioText, vocab_match), dann Produktion (gap_fill, sentence_order, translation), dann listening, pronunciation, zum Schluss GENAU EIN dialogue (Rollenspiel, 2–4 Auswahl-Turns, je genau EINE richtige Antwort, jede Option mit feedback).
- RECYCLING: Verwende wo möglich bereits gelernten Wortschatz: ${knownVocab.join(", ")}
- correctIndex zeigt IMMER auf die richtige Option (die App mischt selbst).
- sentence_order: solution = tokens mit Leerzeichen verbunden, exakt.
- gap_fill: solution muss in options enthalten sein, Satz enthält ___.
- Alle Erklärungen/Fragen auf Deutsch, ermutigender Ton, per Du (bei formellen Szenarien Sie-Formen im Türkischen).

Antworte NUR mit dem JSON-Objekt (kein Markdown) nach diesem Schema:
${buildSchemaDoc(slug)}`;

  let text: string;
  try {
    text = await askLLM({
      system,
      maxTokens: 8000,
      // Generator braucht das stärkste verfügbare Modell des Providers
      // (Gemini/Groq nutzen ihre Env-Defaults aus llm.ts)
      model: provider === "anthropic" ? process.env.GENERATOR_MODEL ?? "claude-sonnet-5" : undefined,
      messages: [
        {
          role: "user",
          content: `Erstelle die Lektion „${params.title}“ für Unit „${params.unitTitle}“. Lernziel/Themen: ${params.topic}. Slug: ${slug}`,
        },
      ],
    });
  } catch (e) {
    return { ok: false, slug, errors: [`API-Fehler: ${e instanceof Error ? e.message : e}`] };
  }

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return { ok: false, slug, errors: ["Keine JSON-Antwort erhalten."] };

  let lesson: SeedLesson;
  try {
    lesson = JSON.parse(jsonMatch[0]) as SeedLesson;
  } catch {
    return { ok: false, slug, errors: ["JSON nicht parsebar."] };
  }
  lesson.slug = slug;

  const errors = validateLesson(lesson);
  if (errors.length > 0) return { ok: false, slug, errors };

  fs.mkdirSync(GENERATED_DIR, { recursive: true });
  const outFile = path.join(GENERATED_DIR, `${slug}.json`);
  fs.writeFileSync(
    outFile,
    JSON.stringify(
      {
        courseSlug: params.courseSlug,
        unitTitle: params.unitTitle,
        unitDescription: params.unitDescription,
        lesson,
      },
      null,
      2
    ),
    "utf-8"
  );
  return { ok: true, slug, file: `content/generated/${slug}.json` };
}
