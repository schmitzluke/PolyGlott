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

/**
 * Heuristische Spracherkennung Türkisch vs. Deutsch für kurze Sätze.
 * ı/ş/ğ sind rein türkisch, ä/ß rein deutsch; dazu ein paar Funktionswörter.
 * Bei Gleichstand → Türkisch (Zielsprache der App).
 */
export function detectLang(text: string): "tr" | "de" {
  const t = ` ${text.toLowerCase()} `;
  const trChars = (t.match(/[ışğ]/g) ?? []).length;
  const deChars = (t.match(/[äß]/g) ?? []).length;
  const deWords = (
    t.match(/\b(ich|du|und|nicht|kann|kannst|das|dass|ist|sagen|sag|sage|sagst|auf|deutsch|wie|was|heute|morgen|der|die|den|ein|eine|mit|für|aber|weil|möchte|hallo|danke|gut|sehr|lerne|lernen|man|so|kannst)\b/g) ?? []
  ).length;
  const trWords = (
    t.match(/\b(ben|sen|bir|ve|değil|nasıl|nasılsın|merhaba|teşekkür|teşekkürler|bugün|evet|hayır|çok|var|yok|güzel|için|ama|öğreniyorum|iyiyim|nerede)\b/g) ?? []
  ).length;
  // Funktionswörter sind das stärkste Signal; Sonderzeichen nur ergänzend –
  // sonst kippt ein deutscher Satz mit türkischem Zitat fälschlich auf „tr".
  const trScore = trChars + trWords * 2;
  const deScore = deChars + deWords * 2;
  return deScore > trScore ? "de" : "tr";
}

/**
 * Zerlegt die Lehrer-Antwort in türkischen Satz (tr) und deutsche Erklärung (de).
 * Modelle setzen die TR:/DE:-Marker unzuverlässig – auch mitten im Text oder in
 * vertauschter Reihenfolge (erst deutsche Erklärung, dann „TR: …"). Der Parser
 * ordnet jedes Segment seinem Marker zu; markerloser Text vor dem ersten Marker
 * wird per Spracherkennung eingeordnet, damit die Sprachausgabe die richtige
 * Stimme wählt.
 */
export function parseAssistantReply(text: string): ParsedReply {
  const raw = text.trim();
  const marker = /\b(TR|DE)\s*:\s*/gi;

  const segments: { label: "tr" | "de" | "pre"; text: string }[] = [];
  let lastIndex = 0;
  let lastLabel: "tr" | "de" | "pre" = "pre";
  let m: RegExpExecArray | null;
  while ((m = marker.exec(raw))) {
    const seg = raw.slice(lastIndex, m.index).trim();
    if (seg) segments.push({ label: lastLabel, text: seg });
    lastLabel = m[1].toLowerCase() as "tr" | "de";
    lastIndex = marker.lastIndex;
  }
  const tail = raw.slice(lastIndex).trim();
  if (tail) segments.push({ label: lastLabel, text: tail });

  let tr = segments.filter((s) => s.label === "tr").map((s) => s.text).join(" ").trim();
  let de = segments.filter((s) => s.label === "de").map((s) => s.text).join(" ").trim();
  const pre = segments.filter((s) => s.label === "pre").map((s) => s.text).join(" ").trim();

  // Markerloser Vorspann: deutsche Erklärung → de, türkischer Satz → tr
  if (pre) {
    if (detectLang(pre) === "de") de = de ? `${pre} ${de}` : pre;
    else tr = tr ? `${pre} ${tr}` : pre;
  }

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
