import { describe, expect, it } from "vitest";
import { FREQUENCY_VOCAB, PACK_SIZE, packCount, packWords } from "@content/frequency-tr";
import { buildPackSession } from "@/lib/trainerSession";
import type { ListeningContent, MultipleChoiceContent, VocabMatchContent } from "@/lib/types";

describe("Frequenz-Wortschatz", () => {
  it("enthält mindestens 500 Einträge mit lückenlosen Rängen", () => {
    expect(FREQUENCY_VOCAB.length).toBeGreaterThanOrEqual(500);
    FREQUENCY_VOCAB.forEach((w, i) => expect(w.rank).toBe(i + 1));
  });

  it("hat keine doppelten Wörter (Quelle und Ziel eindeutig)", () => {
    const sources = FREQUENCY_VOCAB.map((w) => w.source);
    const targets = FREQUENCY_VOCAB.map((w) => w.target);
    const dupSources = sources.filter((s, i) => sources.indexOf(s) !== i);
    const dupTargets = targets.filter((t, i) => targets.indexOf(t) !== i);
    expect(dupSources).toEqual([]);
    expect(dupTargets).toEqual([]);
  });

  it("jeder Eintrag hat Kategorie, Quelle und Ziel", () => {
    for (const w of FREQUENCY_VOCAB) {
      expect(w.source.length).toBeGreaterThan(0);
      expect(w.target.length).toBeGreaterThan(0);
      expect(w.category.length).toBeGreaterThan(0);
    }
  });
});

describe("Trainer-Sessions sind lösbar", () => {
  it("jedes Pack erzeugt eine valide Session", () => {
    for (let p = 0; p < packCount(); p++) {
      const words = packWords(p);
      const distractors = FREQUENCY_VOCAB.filter(
        (w) => Math.abs(w.rank - words[0].rank) <= 25 && !words.some((x) => x.rank === w.rank)
      );
      const session = buildPackSession(words, distractors);

      expect(session.length).toBeGreaterThanOrEqual(12);

      for (const e of session) {
        if (e.type === "multiple_choice" || e.type === "listening") {
          const c = e.content as MultipleChoiceContent | ListeningContent;
          expect(c.options.length).toBeGreaterThanOrEqual(3);
          expect(new Set(c.options).size).toBe(c.options.length); // keine doppelten Optionen
          expect(c.correctIndex).toBe(0);
        }
        if (e.type === "vocab_match") {
          const c = e.content as VocabMatchContent;
          const sources = c.pairs.map((x) => x.source);
          const targets = c.pairs.map((x) => x.target);
          expect(new Set(sources).size).toBe(sources.length);
          expect(new Set(targets).size).toBe(targets.length);
        }
      }
    }
  });
});
