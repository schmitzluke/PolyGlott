import { db } from "@/lib/db";
import { askOpenAICompatible } from "@/lib/llm";

const DEEPSEEK_SYSTEM_PROMPT = `Du bist ein strenger türkischer Linguist und Übersetzer.
Aufgabe: Übersetze den gegebenen deutschen Satz in einen vollständigen, grammatikalisch perfekten türkischen Satz.

Regeln (STRIKT, keine Ausnahmen):
- Beachte türkische Vokalharmonie (Groß- und Kleinharmonie) bei jedem Suffix.
- Beachte korrekte Kasus-, Possessiv- und Verbsuffixe.
- Beachte türkische SOV-Satzstellung (Subjekt-Objekt-Verb), außer Standardausnahmen erfordern etwas anderes.
- Kein Lückentext, keine Multiple-Choice-Optionen, keine Wortbank – nur EIN vollständiger Satz.
- Nutze internes Reasoning, um Vokalharmonie und Suffixe zu prüfen, bevor du antwortest.

Output-Format (STRIKT, keine Ausnahmen):
- Antworte AUSSCHLIESSLICH mit einem einzigen JSON-Objekt, exakt in dieser Form: {"turkishTranslation": "..."}
- Kein Markdown, keine Code-Fences, kein Codeblock, kein Präfix, kein Suffix, keine Erklärung, kein Reasoning-Text in der Antwort.
- Keine Zeilenumbrüche vor oder nach dem JSON. Nur das JSON-Objekt, sonst nichts.`;

function extractTranslation(raw: string): string | null {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    const parsed = JSON.parse(jsonMatch[0]) as { turkishTranslation?: unknown };
    const translation = parsed.turkishTranslation;
    return typeof translation === "string" && translation.trim().length > 0 ? translation.trim() : null;
  } catch {
    return null;
  }
}

/**
 * Verarbeitet einen PENDING StashSentence-Eintrag: DeepSeek R1 übersetzt, Status wird auf READY gesetzt.
 * Wird fire-and-forget aus der API-Route angestoßen (kein externer Queue-Dienst).
 */
export async function processStashSentence(stashSentenceId: string): Promise<void> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error(`[stashWorker] DEEPSEEK_API_KEY fehlt, kann ${stashSentenceId} nicht verarbeiten.`);
    return;
  }

  const entry = await db.stashSentence.findUnique({ where: { id: stashSentenceId } });
  if (!entry || entry.status !== "PENDING") return;

  try {
    const raw = await askOpenAICompatible(
      "https://api.deepseek.com",
      apiKey,
      process.env.DEEPSEEK_MODEL ?? "deepseek-reasoner",
      {
        system: DEEPSEEK_SYSTEM_PROMPT,
        messages: [{ role: "user", content: entry.germanOriginal }],
        temperature: 0.2,
        maxTokens: 300,
      }
    );

    const translation = extractTranslation(raw);
    if (!translation) throw new Error(`invalid_json_response: ${raw.slice(0, 200)}`);

    await db.stashSentence.update({
      where: { id: stashSentenceId },
      data: { turkishTranslation: translation, status: "READY" },
    });
  } catch (err) {
    console.error(`[stashWorker] Verarbeitung fehlgeschlagen für ${stashSentenceId}:`, err);
  }
}
