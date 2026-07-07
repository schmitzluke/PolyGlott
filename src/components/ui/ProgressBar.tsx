/** Fortschrittsbalken, z. B. oben im Übungs-Screen oder fürs Tagesziel. */
export function ProgressBar({
  value,
  max,
  color = "bg-brand-500",
  label,
}: {
  value: number;
  max: number;
  color?: string;
  label?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      aria-valuemin={0}
      aria-label={label ?? "Fortschritt"}
      className="h-3 w-full overflow-hidden rounded-full bg-ink-100"
    >
      <div
        className={`h-full rounded-full ${color} transition-[width] duration-500 ease-out-strong`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
