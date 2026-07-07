/** XP-Verlauf der letzten 14 Tage als schlankes SVG-Balkendiagramm (server-renderbar). */
export function XpChart({ data }: { data: { label: string; xp: number }[] }) {
  const max = Math.max(...data.map((d) => d.xp), 10);
  const barWidth = 100 / data.length;

  return (
    <div role="img" aria-label={`XP-Verlauf: ${data.map((d) => `${d.label}: ${d.xp} XP`).join(", ")}`}>
      <svg viewBox="0 0 100 46" className="h-40 w-full" preserveAspectRatio="none">
        {data.map((d, i) => {
          const h = (d.xp / max) * 36;
          return (
            <rect
              key={i}
              x={i * barWidth + barWidth * 0.15}
              y={40 - h}
              width={barWidth * 0.7}
              height={Math.max(h, 0.5)}
              rx={1.5}
              className={d.xp > 0 ? "fill-brand-500" : "fill-ink-100"}
            />
          );
        })}
        <line x1="0" y1="40.5" x2="100" y2="40.5" strokeWidth="0.5" className="stroke-ink-100" />
      </svg>
      <div className="flex justify-between text-[10px] text-ink-500">
        <span>{data[0]?.label}</span>
        <span>{data[Math.floor(data.length / 2)]?.label}</span>
        <span>heute</span>
      </div>
    </div>
  );
}
