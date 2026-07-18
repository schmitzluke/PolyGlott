import { Map as MapIcon } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cefrEstimateForMastered, nextMasteryMilestone, previousMilestoneThreshold } from "@/lib/mastery";

/** Meilenstein-Fortschritt: gefestigte Sätze → grobe CEFR-Etappe (Motivation neben dem Niveau-Test). */
export function MasteryProgress({ masteredCount }: { masteredCount: number }) {
  const cefr = cefrEstimateForMastered(masteredCount);
  const next = nextMasteryMilestone(masteredCount);
  const rangeStart = previousMilestoneThreshold(masteredCount);

  return (
    <div className="rounded-card border border-ink-100 bg-surface p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10" aria-hidden>
            <MapIcon className="h-5 w-5 text-gold" />
          </span>
          <div>
            <h2 className="text-h3">Sprach-Etappe</h2>
            <p className="text-caption tabular-nums text-ink-500">
              {masteredCount} Sätze gefestigt · ~{cefr}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3">
        {next ? (
          <>
            <ProgressBar
              value={masteredCount - rangeStart}
              max={next.threshold - rangeStart}
              color="bg-gold"
              label="Fortschritt bis nächster Etappe"
            />
            <p className="mt-2 text-caption text-ink-500">
              Noch {next.threshold - masteredCount} bis „{next.label}" (~{next.cefr})
            </p>
          </>
        ) : (
          <p className="text-caption text-correct-700">Alle Meilensteine erreicht – stark! 🎉</p>
        )}
      </div>
    </div>
  );
}
