/**
 * Format-Helfer für den Konversationsmodus.
 * Im Lehrer-Modus antwortet das Modell strukturiert:
 *   TR: <türkischer Satz>
 *   DE: <deutsche Erklärung/Übersetzung>
 * Modelle halten sich nicht immer exakt an Zeilenumbrüche – der Parser ist
 * deshalb tolerant (Marker auch mitten in der Zeile, fehlendes TR:-Präfix …).
 */

export interface ParsedReply {
  tr: string;
  de: string | null;
}

export function parseAssistantReply(text: string): ParsedReply {
  let raw = text.trim();

  // "DE:" trennt – egal ob mit oder ohne Zeilenumbruch davor
  const deSplit = raw.split(/\s*\bDE\s*:\s*/i);
  let tr = deSplit[0] ?? "";
  const de = deSplit.length > 1 ? deSplit.slice(1).join(" ").trim() : null;

  tr = tr.replace(/^\s*TR\s*:\s*/i, "").trim();

  if (!tr && de) return { tr: de, de: null };
  return { tr, de: de || null };
}

/** Für TTS: Klammer-Einschübe (Korrekturen), Häkchen und Marker entfernen. */
export function speakableText(text: string): string {
  return text
    .replace(/\([^)]*\)/g, " ")
    .replace(/[✓✗]/g, "")
    .replace(/^\s*(TR|DE)\s*:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}
