import { describe, expect, it } from "vitest";
import { FREQUENCY_VOCAB, PACK_SIZE, packCount, packWords } from "@content/frequency-tr";
import { buildPackSession } from "@/lib/trainerSession";

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

describe("Trainer-Sessions (Phase 4)", () => {
  it("erzeugt pure Flash-Cards (Deutsch → Türkisch)", () => {
    for (let p = 0; p < packCount(); p++) {
      const words = packWords(p);
      const session = buildPackSession(words);

      expect(session.length).toBe(words.length);
      expect(session).toHaveLength(10);

      for (const card of session) {
        expect(card.german.length).toBeGreaterThan(0);
        expect(card.turkish.length).toBeGreaterThan(0);
        expect(card.rank).toBeGreaterThan(0);
        expect(card.id).toMatch(/^card-/);
      }
    }
  });
});
