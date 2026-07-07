import { Star } from "lucide-react";

/** XP-Anzeige als Badge. */
export function XPBadge({ xp, label = "XP" }: { xp: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-caption font-bold tabular-nums text-brand-600">
      <Star aria-hidden className="h-3.5 w-3.5 fill-brand-500 stroke-brand-500" />
      {xp} {label}
    </span>
  );
}
