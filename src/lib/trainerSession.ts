import type { FrequencyWord } from "../../content/frequency-tr";
import type {
  ListeningContent,
  MultipleChoiceContent,
  TranslationContent,
  VocabMatchContent,
} from "./types";
import { shuffle } from "./shuffle";

export interface TrainerExercise {
  id: string;
  type: "multiple_choice" | "vocab_match" | "listening" | "translation";
  content: MultipleChoiceContent | VocabMatchContent | ListeningContent | TranslationContent;
}

/** Für TTS/Tipp-Übungen ungeeignete Einträge (Suffix-Muster, Platzhalter) aussortieren */
function speakable(word: FrequencyWord): boolean {
  return !/[(…/]/.test(word.target) && !/[(…]/.test(word.source);
}

function pickDistractors(pool: FrequencyWord[], word: FrequencyWord, count: number, field: "source" | "target"): string[] {
  return shuffle(pool.filter((w) => w.rank !== word.rank && w[field] !== word[field]))
    .slice(0, count)
    .map((w) => w[field]);
}

/**
 * Baut aus einem 10er-Pack eine spielerische Session (~16 Übungen) mit den
 * bestehenden Übungs-Komponenten: Einführung per Multiple Choice (mit Audio),
 * Zuordnen, Hörverständnis und Tippen. Distraktoren kommen aus Nachbar-Packs.
 */
export function buildPackSession(pack: FrequencyWord[], distractorPool: FrequencyWord[]): TrainerExercise[] {
  const pool = [...pack, ...distractorPool];
  const exercises: TrainerExercise[] = [];

  const mc = (word: FrequencyWord, direction: "tr-de" | "de-tr"): TrainerExercise => {
    if (direction === "tr-de") {
      return {
        id: `mc-${word.rank}`,
        type: "multiple_choice",
        content: {
          question: `Was bedeutet „${word.target}“?`,
          audioText: speakable(word) ? word.target : undefined,
          options: [word.source, ...pickDistractors(pool, word, 3, "source")],
          correctIndex: 0,
          explanation: `„${word.target}“ = ${word.source}.`,
        },
      };
    }
    return {
      id: `mc-${word.rank}`,
      type: "multiple_choice",
      content: {
        question: `Wie heißt „${word.source}“ auf Türkisch?`,
        options: [word.target, ...pickDistractors(pool, word, 3, "target")],
        correctIndex: 0,
        explanation: `${word.source} = „${word.target}“.`,
      },
    };
  };

  const match = (words: FrequencyWord[], id: string): TrainerExercise => ({
    id,
    type: "vocab_match",
    content: {
      prompt: "Ordne die Paare zu.",
      pairs: words.map((w) => ({ source: w.source, target: w.target })),
    },
  });

  // 1) Jedes Wort einführen (abwechselnde Richtung), nach je 5 ein Zuordnen-Block
  pack.forEach((word, i) => {
    exercises.push(mc(word, i % 2 === 0 ? "tr-de" : "de-tr"));
    if (i === 4) exercises.push(match(pack.slice(0, 5), "match-1"));
  });
  exercises.push(match(pack.slice(5, 10), "match-2"));

  // 2) Vertiefen: Hören + Tippen mit geeigneten Wörtern
  const usable = shuffle(pack.filter(speakable));
  for (const word of usable.slice(0, 2)) {
    exercises.push({
      id: `listen-${word.rank}`,
      type: "listening",
      content: {
        audioText: word.target,
        question: "Was hörst du?",
        options: [word.source, ...pickDistractors(pool, word, 2, "source")],
        correctIndex: 0,
        explanation: `„${word.target}“ = ${word.source}.`,
      },
    });
  }
  for (const word of usable.slice(2, 4)) {
    exercises.push({
      id: `type-${word.rank}`,
      type: "translation",
      content: {
        prompt: word.source,
        solution: word.target,
        altSolutions: [],
        explanation: `${word.source} = „${word.target}“.`,
      },
    });
  }

  return exercises;
}
