/**
 * Sprach-Metadaten (Name + Flagge) und Ableitung der "erlernten Sprachen"
 * eines Nutzers aus abgeschlossenen Lektionen.
 *
 * Das Datenmodell speichert pro User nur eine `targetLanguage`. Welche
 * Sprachen jemand tatsächlich gelernt hat – und auf welchem CEFR-Niveau –
 * leiten wir aus `UserProgress → Lesson → Unit → Course` ab: pro Sprache
 * (`Course.targetLang`) das höchste Niveau, in dem mindestens eine Lektion
 * abgeschlossen wurde.
 */
import { db } from "@/lib/db";
import { LEVEL_ORDER } from "@content/levels";

interface LanguageMeta {
  label: string;
  flag: string;
}

const LANGUAGES: Record<string, LanguageMeta> = {
  de: { label: "Deutsch", flag: "🇩🇪" },
  tr: { label: "Türkisch", flag: "🇹🇷" },
  es: { label: "Spanisch", flag: "🇪🇸" },
  en: { label: "Englisch", flag: "🇬🇧" },
  fr: { label: "Französisch", flag: "🇫🇷" },
  it: { label: "Italienisch", flag: "🇮🇹" },
  pt: { label: "Portugiesisch", flag: "🇵🇹" },
  ru: { label: "Russisch", flag: "🇷🇺" },
};

/** Name + Flagge zu einem Sprachcode (Fallback: Code in Großbuchstaben). */
export function languageMeta(code: string): LanguageMeta {
  return LANGUAGES[code] ?? { label: code.toUpperCase(), flag: "🌐" };
}

export interface LearnedLanguage {
  code: string;
  label: string;
  flag: string;
  level: string; // höchstes erreichtes CEFR-Niveau (A1–B2)
  lessonCount: number;
}

/** Ordnet ein CEFR-Niveau in eine Rangzahl (höher = weiter). */
function levelRank(level: string): number {
  const i = LEVEL_ORDER.indexOf(level as (typeof LEVEL_ORDER)[number]);
  return i === -1 ? 0 : i;
}

/**
 * Erlernte Sprachen eines Nutzers, je Sprache das höchste Niveau mit ≥1
 * abgeschlossenen Lektion. Sortiert nach Niveau (absteigend).
 */
export async function getLearnedLanguages(userId: string): Promise<LearnedLanguage[]> {
  const progress = await db.userProgress.findMany({
    where: { userId },
    select: {
      lesson: {
        select: {
          unit: { select: { course: { select: { targetLang: true, level: true } } } },
        },
      },
    },
  });

  const byLang = new Map<string, { level: string; lessonCount: number }>();
  for (const p of progress) {
    const course = p.lesson.unit.course;
    const entry = byLang.get(course.targetLang);
    if (!entry) {
      byLang.set(course.targetLang, { level: course.level, lessonCount: 1 });
    } else {
      entry.lessonCount += 1;
      if (levelRank(course.level) > levelRank(entry.level)) entry.level = course.level;
    }
  }

  return [...byLang.entries()]
    .map(([code, { level, lessonCount }]) => ({
      code,
      ...languageMeta(code),
      level,
      lessonCount,
    }))
    .sort((a, b) => levelRank(b.level) - levelRank(a.level));
}
