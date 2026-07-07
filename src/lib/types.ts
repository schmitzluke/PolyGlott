// Zentrale Content-Schemata pro Übungstyp.
// Neue Kurse/Lektionen werden rein über Daten (content/*.ts + Seed) ergänzt.

export type ExerciseType =
  | "vocab_match"
  | "multiple_choice"
  | "gap_fill"
  | "sentence_order"
  | "translation"
  | "listening"
  | "dialogue"
  | "pronunciation";

export interface VocabMatchContent {
  prompt: string;
  pairs: { source: string; target: string }[];
}

export interface MultipleChoiceContent {
  question: string;
  /** Optionaler Zieltext, der per TTS vorgelesen werden kann */
  audioText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GapFillContent {
  /** Satz mit ___ als Lücke */
  sentence: string;
  options: string[];
  solution: string;
  translation: string;
  explanation: string;
}

export interface SentenceOrderContent {
  prompt: string;
  tokens: string[];
  solution: string;
  translation: string;
  explanation?: string;
  audioText?: string;
}

export interface TranslationContent {
  /** Ausgangssatz (Muttersprache) */
  prompt: string;
  solution: string;
  /** akzeptierte Alternativen */
  altSolutions?: string[];
  hint?: string;
  explanation?: string;
}

export interface ListeningContent {
  /** Wird per TTS abgespielt, nicht angezeigt */
  audioText: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DialogueChoice {
  text: string;
  correct: boolean;
  feedback: string;
}

export interface DialogueTurn {
  speaker: string;
  /** Text in der Zielsprache (bei Partner-Turns) */
  text?: string;
  translation?: string;
  /** Wenn gesetzt: Nutzer wählt seine Antwort */
  choices?: DialogueChoice[];
}

export interface DialogueContent {
  title: string;
  scene: string;
  turns: DialogueTurn[];
}

export interface PronunciationContent {
  text: string;
  translation: string;
  tip?: string;
}

export type ExerciseContent =
  | VocabMatchContent
  | MultipleChoiceContent
  | GapFillContent
  | SentenceOrderContent
  | TranslationContent
  | ListeningContent
  | DialogueContent
  | PronunciationContent;

// ---- Content-Datenformat für Seeds ----

export interface SeedExercise {
  type: ExerciseType;
  content: ExerciseContent;
}

export interface SeedVocab {
  source: string;
  target: string;
  exampleSource?: string;
  exampleTarget?: string;
}

export interface SeedLesson {
  slug: string;
  title: string;
  intro: string;
  grammarTip: string;
  cultureTip?: string;
  vocab: SeedVocab[];
  exercises: SeedExercise[];
}

export interface SeedUnit {
  title: string;
  description: string;
  lessons: SeedLesson[];
}

export interface SeedCourse {
  slug: string;
  title: string;
  description: string;
  level: string;
  sourceLang: string;
  targetLang: string;
  isPremium: boolean;
  units: SeedUnit[];
}
