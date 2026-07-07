import { checkSentenceOrder, checkTranslation } from "./answers";
import type {
  DialogueContent,
  GapFillContent,
  ListeningContent,
  MultipleChoiceContent,
  SeedLesson,
  SentenceOrderContent,
  TranslationContent,
  VocabMatchContent,
} from "./types";

/**
 * Prüft eine Lektion auf Lösbarkeit und didaktische Mindestanforderungen.
 * Wird vom Seed (generierte Lektionen) und vom Generator-Skript genutzt –
 * dieselben Regeln, die auch die Tests an handgeschriebene Inhalte stellen.
 */
export function validateLesson(lesson: SeedLesson): string[] {
  const errors: string[] = [];

  if (!lesson.slug) errors.push("slug fehlt");
  if (!lesson.title) errors.push("title fehlt");
  if (!lesson.intro) errors.push("intro fehlt");
  if (!lesson.grammarTip) errors.push("grammarTip fehlt");
  if (!Array.isArray(lesson.vocab) || lesson.vocab.length < 4) {
    errors.push("mindestens 4 Vokabeln erforderlich");
  }
  if (!Array.isArray(lesson.exercises) || lesson.exercises.length < 8 || lesson.exercises.length > 12) {
    errors.push(`8–12 Übungen erforderlich (sind ${lesson.exercises?.length ?? 0})`);
  }

  const types = new Set((lesson.exercises ?? []).map((e) => e.type));
  if (!types.has("dialogue")) errors.push("jede Lektion braucht einen Dialog");
  if (types.size < 5) errors.push(`mindestens 5 verschiedene Übungstypen (sind ${types.size})`);

  (lesson.exercises ?? []).forEach((e, i) => {
    const at = `Übung ${i + 1} (${e.type})`;
    switch (e.type) {
      case "multiple_choice":
      case "listening": {
        const c = e.content as MultipleChoiceContent | ListeningContent;
        if (!c.options || c.options.length < 2) errors.push(`${at}: mindestens 2 Optionen`);
        else if (c.correctIndex < 0 || c.correctIndex >= c.options.length)
          errors.push(`${at}: correctIndex außerhalb der Optionen`);
        if (!c.explanation) errors.push(`${at}: explanation fehlt`);
        break;
      }
      case "gap_fill": {
        const c = e.content as GapFillContent;
        if (!c.sentence?.includes("___")) errors.push(`${at}: Satz braucht ___ als Lücke`);
        if (!c.options?.includes(c.solution)) errors.push(`${at}: solution muss in options stehen`);
        break;
      }
      case "sentence_order": {
        const c = e.content as SentenceOrderContent;
        if (!c.tokens || !checkSentenceOrder(c.tokens, c.solution))
          errors.push(`${at}: tokens ergeben nicht die solution`);
        break;
      }
      case "translation": {
        const c = e.content as TranslationContent;
        if (!c.solution || !checkTranslation(c.solution, c.solution, c.altSolutions))
          errors.push(`${at}: solution prüft sich nicht selbst`);
        break;
      }
      case "vocab_match": {
        const c = e.content as VocabMatchContent;
        const sources = (c.pairs ?? []).map((p) => p.source);
        const targets = (c.pairs ?? []).map((p) => p.target);
        if (sources.length < 3) errors.push(`${at}: mindestens 3 Paare`);
        if (new Set(sources).size !== sources.length || new Set(targets).size !== targets.length)
          errors.push(`${at}: Paare müssen eindeutig sein`);
        break;
      }
      case "dialogue": {
        const c = e.content as DialogueContent;
        const choiceTurns = (c.turns ?? []).filter((t) => t.choices);
        if (choiceTurns.length === 0) errors.push(`${at}: Dialog braucht Auswahl-Turns`);
        for (const turn of choiceTurns) {
          if (turn.choices!.filter((ch) => ch.correct).length !== 1)
            errors.push(`${at}: jeder Auswahl-Turn braucht genau eine richtige Antwort`);
          if (turn.choices!.some((ch) => !ch.feedback))
            errors.push(`${at}: jede Antwortoption braucht feedback`);
        }
        break;
      }
      case "pronunciation":
        break;
      default:
        errors.push(`${at}: unbekannter Übungstyp`);
    }
  });

  return errors;
}
