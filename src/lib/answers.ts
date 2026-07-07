/**
 * Antwort-Prüfung für Tipp-Übungen (tolerant bei Groß-/Kleinschreibung & Satzzeichen).
 * Türkisch-Besonderheit: i/İ und ı/I werden bewusst gleich behandelt, damit
 * Lernende mit deutscher Tastatur nicht an der Punkt-Unterscheidung scheitern.
 */
export function normalizeAnswer(text: string): string {
  return text
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .toLowerCase()
    .replace(/ı/g, "i")
    .normalize("NFC")
    .replace(/[.,!?;:'"¿¡]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function checkTranslation(input: string, solution: string, altSolutions: string[] = []): boolean {
  const normalized = normalizeAnswer(input);
  return [solution, ...altSolutions].some((s) => normalizeAnswer(s) === normalized);
}

export function checkSentenceOrder(tokens: string[], solution: string): boolean {
  return normalizeAnswer(tokens.join(" ")) === normalizeAnswer(solution);
}
