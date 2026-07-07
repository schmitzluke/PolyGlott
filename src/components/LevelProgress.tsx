"use client";

import { CEFR_LEVELS, LEVEL_ORDER, nextLevel, type CefrLevelDefinition } from "@content/levels";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BookOpen, Ear, Pen, MessageCircle, Users } from "lucide-react";

const SKILL_ICONS = {
  reading: BookOpen,
  listening: Ear,
  writing: Pen,
  speaking: MessageCircle,
  pragmatics: Users,
} as const;

const SKILL_LABELS: Record<string, string> = {
  reading: "Lesen",
  listening: "Hören",
  writing: "Schreiben",
  speaking: "Sprechen",
  pragmatics: "Pragmatik",
};

interface LevelProgressProps {
  currentLevel: string;
  confirmedLevel?: string | null;
  vocabCount: number;
}

/**
 * CEFR-Level-Fortschrittsanzeige.
 * Zeigt aktuelles Niveau, Wortschatz-Fortschritt und die 5 Kompetenz-Säulen.
 */
export function LevelProgress({ currentLevel, confirmedLevel, vocabCount }: LevelProgressProps) {
  const level = CEFR_LEVELS[currentLevel] ?? CEFR_LEVELS.A1;
  const vocabTarget = level.vocabRange[1];
  const vocabProgress = Math.min(1, vocabCount / vocabTarget);
  const next = nextLevel(currentLevel);

  return (
    <div className="flex flex-col gap-4 rounded-card border border-ink-100 bg-surface p-5 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-h2 font-black text-brand-ink">
            {level.level}
          </span>
          <div>
            <h2 className="text-h3">{level.label}</h2>
            {confirmedLevel && (
              <span className="text-caption text-correct-700">
                ✓ {confirmedLevel} bestätigt
              </span>
            )}
          </div>
        </div>
        {next && (
          <span className="rounded-chip bg-ink-50 px-3 py-1 text-caption font-semibold text-ink-500">
            Nächstes Ziel: {next}
          </span>
        )}
      </div>

      {/* Wortschatz-Fortschritt */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-caption font-semibold text-ink-700">Wortschatz</span>
          <span className="text-caption tabular-nums text-ink-500">
            {vocabCount}/{vocabTarget} Wörter
          </span>
        </div>
        <ProgressBar
          value={vocabCount}
          max={vocabTarget}
          color={vocabProgress >= 1 ? "bg-correct-500" : "bg-brand-500"}
          label="Wortschatz-Fortschritt"
        />
        {vocabProgress >= 1 && (
          <p className="mt-1 text-caption text-correct-700">
            Wortschatz-Ziel für {level.level} erreicht! 🎉
          </p>
        )}
      </div>

      {/* Grammatik-Themen */}
      <div>
        <h3 className="mb-2 text-caption font-semibold text-ink-700">Grammatik</h3>
        <div className="flex flex-wrap gap-1.5">
          {level.grammarTopics.map((topic) => (
            <span
              key={topic}
              className="rounded-chip bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* 5 Kompetenz-Säulen */}
      <div>
        <h3 className="mb-2 text-caption font-semibold text-ink-700">Kompetenzen</h3>
        <div className="grid gap-2">
          {(Object.keys(SKILL_ICONS) as Array<keyof typeof SKILL_ICONS>).map((key) => {
            const Icon = SKILL_ICONS[key];
            return (
              <div
                key={key}
                className="flex items-start gap-2.5 rounded-lg bg-ink-50 px-3 py-2"
              >
                <Icon
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0 text-ink-500"
                />
                <div>
                  <p className="text-caption font-semibold text-ink-700">
                    {SKILL_LABELS[key]}
                  </p>
                  <p className="text-[11px] text-ink-500">
                    {level.skills[key]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kann-Beschreibungen */}
      <div>
        <h3 className="mb-2 text-caption font-semibold text-ink-700">Das kannst du auf {level.level}</h3>
        <ul className="flex flex-col gap-1">
          {level.canDo.map((item) => (
            <li key={item} className="flex items-start gap-2 text-caption text-ink-600">
              <span className="mt-0.5 text-brand-500">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
