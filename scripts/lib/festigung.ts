/**
 * Festigungs-Analyse (pure Logik, testbar).
 *
 * Kern-These (Memory [[curriculum-design-model]]): Festigung ist im CONTENT
 * kodiert, nicht im Prüfling. Ein Wort ist gefestigt, wenn es nach Einführung
 * MEHRFACH, VERTEILT und in VERSCHIEDENEN Kontexten wieder auftaucht.
 * Deterministisch, kein LLM. CLI-Wrapper: scripts/analyze-festigung.ts
 */
import type { SeedCourse, SeedLesson, SeedExercise, DialogueContent } from "../../src/lib/types";

// ---- Schwellen (didaktisch, anpassbar) --------------------------------------
export const FESTIGT_MIN_ENCOUNTERS = 3; // Einführung + >=2 Wiederbegegnungen
export const FESTIGT_MIN_SPREAD_LESSONS = 2; // über >=2 spätere Lektionen
export const FESTIGT_MIN_CONTEXTS = 2; // in >=2 verschiedenen Sätzen

// ---- Türkisch-tauglicher Tokenizer ------------------------------------------
const STOPWORDS = new Set([
  "bir", "ve", "sen", "ben", "bu", "şu", "su", "o", "de", "da", "mi", "mı",
  "mu", "mü", "çok", "cok", "için", "icin", "ile", "var", "yok", "ne", "ki",
  "ama", "evet", "hayır", "hayir", "the", "und", "ist", "der", "die", "das",
]);

export function norm(s: string): string {
  return s.replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();
}
export function tokenize(s: string): string[] {
  return norm(s)
    .split(/[^a-zçğıöşü0-9]+/i)
    .filter((t) => t.length >= 2);
}

// ---- Leichter Türkisch-Stemmer ----------------------------------------------
// Türkisch ist agglutinierend: "git" → gittim / gidiyorum / gidecek. Exakt-
// Token-Match unterschätzt Wiederkehr massiv. Stemmer streift die häufigsten
// Flexions-Suffixe iterativ ab und normalisiert die End-Konsonanten-Mutation
// (d→t, c→ç, ğ→k, b→p). Heuristisch — Ziel ist Recall, nicht perfekte Morphologie.
const SUFFIXES = [
  "iyorum", "ıyorum", "uyorum", "üyorum", "ecegim", "acağım", "yorsun",
  "iyor", "ıyor", "uyor", "üyor", "ecek", "acak", "miş", "mış", "muş", "müş",
  "dim", "dım", "dum", "düm", "tim", "tım", "tum", "tüm", "yor", "dir", "tir",
  "sin", "sın", "sun", "sün", "siniz", "sınız",
  // Verb-Infinitiv (Guard length-3 schützt kurze Nomen: ekmek/yemek bleiben)
  "mek", "mak",
  "ler", "lar", "den", "dan", "ten", "tan", "nin", "nın", "nun", "nün",
  "yla", "yle", "ki", "de", "da", "te", "ta", "yi", "yı", "yu", "yü",
  "ye", "ya", "la", "le", "im", "ım", "um", "üm", "in", "ın", "un", "ün",
  "i", "ı", "u", "ü", "e", "a",
];
const MUTATE: Record<string, string> = { d: "t", c: "ç", ğ: "k", b: "p" };
export function stem(tokRaw: string): string {
  let t = norm(tokRaw);
  for (let pass = 0; pass < 3; pass++) {
    let stripped = false;
    for (const suf of SUFFIXES) {
      if (t.length - suf.length >= 3 && t.endsWith(suf)) {
        t = t.slice(0, -suf.length);
        stripped = true;
        break;
      }
    }
    if (!stripped) break;
  }
  if (t.length >= 3) {
    const last = t[t.length - 1];
    if (MUTATE[last]) t = t.slice(0, -1) + MUTATE[last];
  }
  return t;
}
export function stemTokens(s: string): string[] {
  return tokenize(s).map(stem);
}

// ---- Ziel-Sprache-Text aus einer Übung ziehen -------------------------------
// Nur Felder, die sicher Zielsprache (tr) sind. Options/Fragen sind gemischt →
// weggelassen, um Rauschen zu vermeiden.
export function targetStrings(ex: SeedExercise): string[] {
  const c = ex.content as Record<string, unknown>;
  const out: string[] = [];
  const push = (v: unknown) => {
    if (typeof v === "string" && v.trim()) out.push(v);
  };
  switch (ex.type) {
    case "vocab_match":
      for (const p of (c.pairs as { target: string }[]) ?? []) push(p.target);
      break;
    case "gap_fill":
      push(c.sentence);
      push(c.solution);
      break;
    case "sentence_order":
      push(c.solution);
      push(c.audioText);
      break;
    case "translation":
      push(c.solution);
      for (const a of (c.altSolutions as string[]) ?? []) push(a);
      break;
    case "multiple_choice":
    case "listening":
      push(c.audioText);
      break;
    case "dialogue":
      for (const t of (c as unknown as DialogueContent).turns ?? []) push(t.text);
      break;
    case "pronunciation":
      push(c.text);
      break;
  }
  return out;
}

// ---- Kurs zu flacher, geordneter Lektionsliste ------------------------------
export interface FlatLesson {
  index: number;
  slug: string;
  title: string;
  vocab: { source: string; target: string }[];
  corpus: string[];
}
export function flatten(course: SeedCourse): FlatLesson[] {
  const flat: FlatLesson[] = [];
  let i = 0;
  for (const unit of course.units) {
    for (const l of unit.lessons as SeedLesson[]) {
      const corpus: string[] = [];
      for (const v of l.vocab) {
        corpus.push(v.target);
        if (v.exampleTarget) corpus.push(v.exampleTarget);
      }
      for (const ex of l.exercises) corpus.push(...targetStrings(ex));
      flat.push({
        index: i++,
        slug: l.slug,
        title: l.title,
        vocab: l.vocab.map((v) => ({ source: v.source, target: v.target })),
        corpus,
      });
    }
  }
  return flat;
}

function keyToken(target: string, globalFreq: Map<string, number>): string | null {
  const stems = stemTokens(target).filter((t) => !STOPWORDS.has(t) && t.length >= 2);
  if (stems.length === 0) return null;
  return stems.sort((a, b) => (globalFreq.get(a) ?? 0) - (globalFreq.get(b) ?? 0))[0];
}

export interface VocabScore {
  source: string;
  target: string;
  key: string | null;
  introIndex: number;
  encounters: number[];
  contexts: number;
  reencounterLessons: number;
  usedBeforeIntro: boolean;
  festigt: boolean;
}

export interface CourseAnalysis {
  course: SeedCourse;
  lessons: FlatLesson[];
  scores: VocabScore[];
  gefestigt: VocabScore[];
  einmalig: VocabScore[];
  orderingBugs: VocabScore[];
  lessonStemSets: Set<string>[];
}

export function analyzeCourse(course: SeedCourse): CourseAnalysis {
  const lessons = flatten(course);

  const globalFreq = new Map<string, number>();
  for (const l of lessons)
    for (const s of l.corpus)
      for (const t of stemTokens(s)) globalFreq.set(t, (globalFreq.get(t) ?? 0) + 1);

  const lessonTokens = lessons.map((l) => {
    const set = new Set<string>();
    for (const s of l.corpus) for (const t of stemTokens(s)) set.add(t);
    return { set, sentences: l.corpus };
  });

  const scores: VocabScore[] = [];
  const seen = new Set<string>();

  for (const lesson of lessons) {
    for (const v of lesson.vocab) {
      const dedup = norm(v.target);
      if (seen.has(dedup)) continue;
      seen.add(dedup);

      const key = keyToken(v.target, globalFreq);
      const encounters: number[] = [];
      const ctxSentences = new Set<string>();
      let usedBeforeIntro = false;

      if (key) {
        for (const l of lessons) {
          const lt = lessonTokens[l.index];
          if (lt.set.has(key)) {
            encounters.push(l.index);
            if (l.index < lesson.index) usedBeforeIntro = true;
            for (const s of lt.sentences)
              if (stemTokens(s).includes(key)) ctxSentences.add(norm(s));
          }
        }
      }

      const reencounterLessons = encounters.filter((i) => i > lesson.index).length;
      const festigt =
        encounters.length >= FESTIGT_MIN_ENCOUNTERS &&
        reencounterLessons >= FESTIGT_MIN_SPREAD_LESSONS &&
        ctxSentences.size >= FESTIGT_MIN_CONTEXTS;

      scores.push({
        source: v.source,
        target: v.target,
        key,
        introIndex: lesson.index,
        encounters,
        contexts: ctxSentences.size,
        reencounterLessons,
        usedBeforeIntro,
        festigt,
      });
    }
  }

  return {
    course,
    lessons,
    scores,
    gefestigt: scores.filter((s) => s.festigt),
    einmalig: scores.filter((s) => s.encounters.length <= 1),
    orderingBugs: scores.filter((s) => s.usedBeforeIntro),
    lessonStemSets: lessonTokens.map((lt) => lt.set),
  };
}

// ---- Kompakte Kennzahlen (für Report + CI-Guard) ----------------------------
export interface CourseStats {
  slug: string;
  title: string;
  lessons: number;
  vocab: number;
  gefestigt: number;
  einmalig: number;
  orderingBugs: number;
  masteryRatio: number; // 0..1
}
export function computeStats(a: CourseAnalysis): CourseStats {
  return {
    slug: a.course.slug,
    title: a.course.title,
    lessons: a.lessons.length,
    vocab: a.scores.length,
    gefestigt: a.gefestigt.length,
    einmalig: a.einmalig.length,
    orderingBugs: a.orderingBugs.length,
    masteryRatio: a.scores.length ? a.gefestigt.length / a.scores.length : 0,
  };
}

// ---- Fix-Report: pro Lektion konkrete Recycling-Vorschläge -------------------
// Jedes schwache Wort bekommt zwei verteilte Wiederbegegnungen (intro+1,
// intro+3), damit es die Festigungs-Schwelle erreicht. Nur wo noch nicht präsent.
export function recyclingPlan(a: CourseAnalysis): Map<number, VocabScore[]> {
  const last = a.lessons.length - 1;
  const plan = new Map<number, VocabScore[]>();
  const assign = (idx: number, s: VocabScore) => {
    if (idx > last || idx <= s.introIndex || s.key === null) return;
    if (a.lessonStemSets[idx].has(s.key)) return;
    if (!plan.has(idx)) plan.set(idx, []);
    const bucket = plan.get(idx)!;
    if (!bucket.some((x) => x.target === s.target)) bucket.push(s);
  };
  for (const s of a.scores) {
    if (s.festigt || s.key === null) continue;
    assign(s.introIndex + 1, s);
    assign(s.introIndex + 3, s);
  }
  return plan;
}
