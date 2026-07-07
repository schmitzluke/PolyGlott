import { describe, expect, it } from "vitest";
import { allCourses } from "@content/index";
import { validateLesson } from "@/lib/validateLesson";
import { checkSentenceOrder, checkTranslation } from "@/lib/answers";
import { lessonXp } from "@/lib/gamification";
import { INITIAL_SM2, sm2 } from "@/lib/sm2";
import type {
  DialogueContent,
  GapFillContent,
  ListeningContent,
  MultipleChoiceContent,
  SentenceOrderContent,
  TranslationContent,
  VocabMatchContent,
} from "@/lib/types";

const lessons = allCourses.flatMap((c) => c.units.flatMap((u) => u.lessons));

/**
 * Integrationstest für den Lern-Flow:
 * 1. Content-Integrität – jede Übung ist mit der Prüf-Logik der App lösbar.
 * 2. Simulierter Lektionsdurchlauf – Antworten prüfen → XP → SM-2-Einplanung.
 */
describe("Kursinhalte sind konsistent und lösbar", () => {
  it("A1-Kurs hat mindestens 2 Units à 3 Lektionen mit je 8–12 Übungen", () => {
    const a1 = allCourses[0];
    expect(a1.units.length).toBeGreaterThanOrEqual(2);
    for (const unit of a1.units) {
      expect(unit.lessons.length).toBeGreaterThanOrEqual(3);
      for (const lesson of unit.lessons) {
        expect(lesson.exercises.length).toBeGreaterThanOrEqual(8);
        expect(lesson.exercises.length).toBeLessThanOrEqual(12);
        expect(lesson.vocab.length).toBeGreaterThan(0);
        expect(lesson.intro.length).toBeGreaterThan(0);
        expect(lesson.grammarTip.length).toBeGreaterThan(0);
      }
    }
  });

  it("jede Lektion enthält einen Dialog und mehrere Übungstypen", () => {
    for (const lesson of allCourses[0].units.flatMap((u) => u.lessons)) {
      const types = new Set(lesson.exercises.map((e) => e.type));
      expect(types.has("dialogue")).toBe(true);
      expect(types.size).toBeGreaterThanOrEqual(5);
    }
  });

  it("alle Lektionen (auch A2) bestehen die zentrale Validierung", () => {
    for (const lesson of lessons) {
      expect(validateLesson(lesson)).toEqual([]);
    }
  });

  it("multiple_choice/listening: correctIndex zeigt auf eine existierende Option", () => {
    for (const lesson of lessons) {
      for (const e of lesson.exercises) {
        if (e.type === "multiple_choice" || e.type === "listening") {
          const c = e.content as MultipleChoiceContent | ListeningContent;
          expect(c.options.length).toBeGreaterThanOrEqual(2);
          expect(c.correctIndex).toBeGreaterThanOrEqual(0);
          expect(c.correctIndex).toBeLessThan(c.options.length);
          expect(c.explanation.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("gap_fill: solution ist eine der Optionen und passt in die Lücke", () => {
    for (const lesson of lessons) {
      for (const e of lesson.exercises) {
        if (e.type === "gap_fill") {
          const c = e.content as GapFillContent;
          expect(c.options).toContain(c.solution);
          expect(c.sentence).toContain("___");
        }
      }
    }
  });

  it("sentence_order: Tokens ergeben in richtiger Reihenfolge die Lösung", () => {
    for (const lesson of lessons) {
      for (const e of lesson.exercises) {
        if (e.type === "sentence_order") {
          const c = e.content as SentenceOrderContent;
          expect(checkSentenceOrder(c.tokens, c.solution)).toBe(true);
        }
      }
    }
  });

  it("translation: Lösung und Alternativen werden akzeptiert, Tippfehler nicht", () => {
    for (const lesson of lessons) {
      for (const e of lesson.exercises) {
        if (e.type === "translation") {
          const c = e.content as TranslationContent;
          expect(checkTranslation(c.solution, c.solution, c.altSolutions)).toBe(true);
          // Groß-/Kleinschreibung & Satzzeichen sind tolerant
          expect(checkTranslation(c.solution.toUpperCase(), c.solution, c.altSolutions)).toBe(true);
          for (const alt of c.altSolutions ?? []) {
            expect(checkTranslation(alt, c.solution, c.altSolutions)).toBe(true);
          }
          expect(checkTranslation(c.solution + " xyz", c.solution, c.altSolutions)).toBe(false);
        }
      }
    }
  });

  it("vocab_match: Paare sind eindeutig", () => {
    for (const lesson of lessons) {
      for (const e of lesson.exercises) {
        if (e.type === "vocab_match") {
          const c = e.content as VocabMatchContent;
          const sources = c.pairs.map((p) => p.source);
          const targets = c.pairs.map((p) => p.target);
          expect(new Set(sources).size).toBe(sources.length);
          expect(new Set(targets).size).toBe(targets.length);
        }
      }
    }
  });

  it("dialogue: jeder Auswahl-Turn hat genau eine richtige Antwort mit Feedback", () => {
    for (const lesson of lessons) {
      for (const e of lesson.exercises) {
        if (e.type === "dialogue") {
          const c = e.content as DialogueContent;
          const choiceTurns = c.turns.filter((t) => t.choices);
          expect(choiceTurns.length).toBeGreaterThan(0);
          for (const turn of choiceTurns) {
            expect(turn.choices!.filter((ch) => ch.correct).length).toBe(1);
            for (const ch of turn.choices!) expect(ch.feedback.length).toBeGreaterThan(0);
          }
        }
      }
    }
  });
});

describe("Integrations-Flow: Lektion → XP → Spaced Repetition", () => {
  it("simulierter Durchlauf der ersten Lektion", () => {
    const lesson = allCourses[0].units[0].lessons[0];
    let correct = 0;

    // Alle Übungen „perfekt“ beantworten – mit derselben Logik wie die App
    for (const e of lesson.exercises) {
      switch (e.type) {
        case "multiple_choice":
        case "listening": {
          const c = e.content as MultipleChoiceContent;
          if (c.options[c.correctIndex] !== undefined) correct++;
          break;
        }
        case "gap_fill": {
          const c = e.content as GapFillContent;
          if (c.options.includes(c.solution)) correct++;
          break;
        }
        case "sentence_order": {
          const c = e.content as SentenceOrderContent;
          if (checkSentenceOrder(c.tokens, c.solution)) correct++;
          break;
        }
        case "translation": {
          const c = e.content as TranslationContent;
          if (checkTranslation(c.solution, c.solution, c.altSolutions)) correct++;
          break;
        }
        default:
          correct++; // vocab_match, dialogue, pronunciation gelten bei perfektem Lauf als richtig
      }
    }
    expect(correct).toBe(lesson.exercises.length);

    // XP wie im API-Endpunkt
    const xp = lessonXp(correct, lesson.exercises.length);
    expect(xp).toBeGreaterThan(0);

    // Übergabe an SM-2: alle Vokabeln starten sofort fällig,
    // nach erstem gutem Review Fälligkeit in 1 Tag
    const now = new Date("2026-07-04T12:00:00Z");
    for (const _vocab of lesson.vocab) {
      const r = sm2(INITIAL_SM2, 4, now);
      expect(r.dueAt.getTime()).toBeGreaterThan(now.getTime());
      expect(r.intervalDays).toBe(1);
    }
  });
});
