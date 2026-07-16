import { db } from "@/lib/db";
import { askOpenAICompatible } from "@/lib/llm";

const MAX_SENTENCES = 15;

const DEEPSEEK_SYSTEM_PROMPT = `Du bist ein Linguist, der türkische Medien-Transkripte für Deutsch-Muttersprachler aufbereitet, die Türkisch lernen.
Aufgabe: Extrahiere aus dem gegebenen türkischen Transkript die ${MAX_SENTENCES} wichtigsten, lehrreichsten Sätze
(hochfrequente Vokabeln, nützliche Strukturen, Kernaussagen des Inhalts) und übersetze jeden ins Deutsche.

Regeln (STRIKT, keine Ausnahmen):
- Sätze müssen wortwörtlich aus dem Transkript stammen (keine Erfindungen, keine Paraphrasen).
- Wähle Sätze, die für das Verständnis des Gesamttranskripts am wichtigsten sind.
- Übersetzung ins Deutsche muss vollständig und grammatikalisch korrekt sein.
- Maximal ${MAX_SENTENCES} Sätze, minimal 3 (bei sehr kurzem Transkript entsprechend weniger).

Output-Format (STRIKT, keine Ausnahmen):
- Antworte AUSSCHLIESSLICH mit einem einzigen JSON-Objekt, exakt in dieser Form:
  {"sentences": [{"turkish": "...", "german": "..."}, ...]}
- Kein Markdown, keine Code-Fences, kein Präfix, kein Suffix, keine Erklärung.
- Keine Zeilenumbrüche vor oder nach dem JSON. Nur das JSON-Objekt, sonst nichts.`;

interface ExtractedSentence {
  turkish: string;
  german: string;
}

function extractSentences(raw: string): ExtractedSentence[] | null {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    const parsed = JSON.parse(jsonMatch[0]) as { sentences?: unknown };
    if (!Array.isArray(parsed.sentences)) return null;
    const sentences = parsed.sentences
      .filter(
        (s): s is ExtractedSentence =>
          typeof s === "object" &&
          s !== null &&
          typeof (s as ExtractedSentence).turkish === "string" &&
          typeof (s as ExtractedSentence).german === "string" &&
          (s as ExtractedSentence).turkish.trim().length > 0 &&
          (s as ExtractedSentence).german.trim().length > 0
      )
      .slice(0, MAX_SENTENCES);
    return sentences.length > 0 ? sentences : null;
  } catch {
    return null;
  }
}

/**
 * Verarbeitet ein PENDING Transcript: DeepSeek extrahiert die relevantesten Sätze
 * samt Übersetzung, Status wird auf READY gesetzt. Fire-and-forget wie stashWorker.
 */
export async function processTranscript(transcriptId: string): Promise<void> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error(`[mediaWorker] DEEPSEEK_API_KEY fehlt, kann ${transcriptId} nicht verarbeiten.`);
    return;
  }

  const entry = await db.transcript.findUnique({ where: { id: transcriptId } });
  if (!entry || entry.status !== "PENDING") return;

  try {
    const raw = await askOpenAICompatible(
      "https://api.deepseek.com",
      apiKey,
      process.env.DEEPSEEK_MODEL ?? "deepseek-reasoner",
      {
        system: DEEPSEEK_SYSTEM_PROMPT,
        messages: [{ role: "user", content: entry.rawText }],
        temperature: 0.2,
        maxTokens: 4000,
      }
    );

    const sentences = extractSentences(raw);
    if (!sentences) throw new Error(`invalid_json_response: ${raw.slice(0, 200)}`);

    await db.$transaction([
      db.transcriptSentence.createMany({
        data: sentences.map((s, i) => ({
          transcriptId: entry.id,
          turkish: s.turkish,
          german: s.german,
          rank: i,
        })),
      }),
      db.transcript.update({ where: { id: entry.id }, data: { status: "READY" } }),
    ]);
  } catch (err) {
    console.error(`[mediaWorker] Verarbeitung fehlgeschlagen für ${transcriptId}:`, err);
    await db.transcript.update({ where: { id: transcriptId }, data: { status: "FAILED" } });
  }
}
