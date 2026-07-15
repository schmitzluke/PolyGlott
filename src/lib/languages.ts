/**
 * Sprach-Metadaten (Name + Flagge) und Ableitung der "erlernten Sprachen"
 * eines Nutzers.
 *
 * Seit dem Umbau auf StashSentence/IslandPack gibt es keine Course-Hierarchie
 * mehr, aus der sich Sprache+Niveau pro Lektion ableiten ließen. Wir zeigen
 * daher direkt `User.targetLanguage` + `confirmedLevel`/`selfLevel`, mit der
 * Anzahl gelernter Karten (ReviewItem) als Fortschrittsindikator.
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
  level: string; // erreichtes CEFR-Niveau (A1–B2)
  lessonCount: number; // gelernte Karten (ReviewItem)
}

/** Ordnet ein CEFR-Niveau in eine Rangzahl (höher = weiter). */
function levelRank(level: string): number {
  const i = LEVEL_ORDER.indexOf(level as (typeof LEVEL_ORDER)[number]);
  return i === -1 ? 0 : i;
}

/**
 * Die Zielsprache eines Nutzers samt Niveau und Kartenzahl. Liefert ein
 * leeres Array, solange der Nutzer noch keine Karten gelernt hat.
 */
export async function getLearnedLanguages(userId: string): Promise<LearnedLanguage[]> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { targetLanguage: true, selfLevel: true, confirmedLevel: true },
  });
  if (!user) return [];

  const lessonCount = await db.reviewItem.count({ where: { userId } });
  if (lessonCount === 0) return [];

  const level = user.confirmedLevel ?? user.selfLevel;
  return [
    {
      code: user.targetLanguage,
      ...languageMeta(user.targetLanguage),
      level,
      lessonCount,
    },
  ].sort((a, b) => levelRank(b.level) - levelRank(a.level));
}
