import { Flame } from "lucide-react";

/** Streak-Anzeige mit Flamme. */
export function StreakFlame({ days, active = true }: { days: number; active?: boolean }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${days} Tage Streak`}>
      <Flame
        aria-hidden
        className={`h-6 w-6 ${
          active
            ? "fill-brand-500 stroke-brand-600 motion-safe:animate-flame-flicker"
            : "fill-ink-100 stroke-ink-300"
        }`}
      />
      <span className={`text-h3 font-bold tabular-nums ${active ? "text-brand-600" : "text-ink-500"}`}>{days}</span>
    </div>
  );
}
