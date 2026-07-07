import { Flame } from "lucide-react";

/** Streak-Kalender: die letzten 28 Tage, aktive Lerntage markiert. */
export function StreakCalendar({ activeDays }: { activeDays: Set<string> }) {
  const days: { key: string; dayOfMonth: number; active: boolean; isToday: boolean }[] = [];
  const today = new Date();
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({ key, dayOfMonth: d.getDate(), active: activeDays.has(key), isToday: i === 0 });
  }

  return (
    <div className="grid grid-cols-7 gap-1.5" role="img" aria-label="Lernkalender der letzten 4 Wochen">
      {days.map((d) => (
        <div
          key={d.key}
          title={d.key}
          className={`flex h-9 items-center justify-center rounded-chip text-caption font-medium ${
            d.active
              ? "bg-brand-500 text-brand-ink"
              : "bg-ink-100 text-ink-500"
          } ${d.isToday ? "ring-2 ring-brand-600 ring-offset-1 ring-offset-ink-50" : ""}`}
        >
          {d.active ? <Flame aria-hidden className="h-4 w-4" /> : d.dayOfMonth}
        </div>
      ))}
    </div>
  );
}
