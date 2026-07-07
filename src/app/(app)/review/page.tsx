"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Layers, PartyPopper, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AudioButton } from "@/components/ui/AudioButton";

interface ReviewCard {
  id: string;
  source: string;
  target: string;
  exampleSource?: string | null;
  exampleTarget?: string | null;
  repetitions: number;
  due: boolean;
}

const GRADES = [
  { quality: 1, label: "Nochmal", hint: "gleich wieder", style: "bg-error-50 text-error-700 border-error-500" },
  { quality: 3, label: "Schwer", hint: "bald wieder", style: "bg-ink-100 text-ink-700 border-ink-300" },
  { quality: 4, label: "Gut", hint: "später", style: "bg-info-50 text-info-700 border-info-500" },
  { quality: 5, label: "Einfach", hint: "viel später", style: "bg-correct-50 text-correct-700 border-correct-500" },
];

/**
 * Wiederholen: fällige Karten nach SM-2 zuerst, danach füllt die App die Runde
 * mit Festigungs-Karten auf (die am längsten nicht gesehenen) – es gibt immer
 * etwas zu lernen.
 */
export default function ReviewPage() {
  const [queue, setQueue] = useState<ReviewCard[] | null>(null);
  const [roundSize, setRoundSize] = useState(0);
  const [dueLeft, setDueLeft] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const [roundsDone, setRoundsDone] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [seenIds, setSeenIds] = useState<string[]>([]);

  async function loadRound(excludeIds: string[]) {
    setQueue(null);
    const res = await fetch(`/api/reviews?exclude=${excludeIds.slice(-40).join(",")}`);
    const data = await res.json().catch(() => null);
    const items: ReviewCard[] = data?.items ?? [];
    setQueue(items);
    setRoundSize(items.length);
    setDueLeft(data?.dueCount ?? 0);
    setTotalCount(data?.totalCount ?? 0);
    setDoneCount(0);
    setRevealed(false);
  }

  useEffect(() => {
    void loadRound([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (queue === null) {
    return <p className="p-6 text-center text-ink-500">Lade deine Karten …</p>;
  }

  const current = queue[0];

  // Gar keine Karten im System → erst Wortschatz aufbauen
  if (!current && totalCount === 0) {
    return (
      <main className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center gap-6 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50" aria-hidden>
          <Layers className="h-12 w-12 text-brand-600" />
        </span>
        <h1 className="text-h1">Noch keine Karten</h1>
        <p className="text-body text-ink-500">
          Dein Kartenstapel füllt sich automatisch: Jede abgeschlossene Lektion und jedes
          Wortschatz-Pack legt neue Karten an.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/trainer" className="min-h-[48px] rounded-button bg-brand-500 px-8 py-3 font-semibold text-brand-ink shadow-soft hover:bg-brand-400">
            Wortschatz-Trainer starten
          </Link>
          <Link href="/courses" className="font-semibold text-brand-600 hover:underline">
            Oder eine Lektion lernen
          </Link>
        </div>
      </main>
    );
  }

  // Runde geschafft → direkt die nächste anbieten (es gibt immer Karten)
  if (!current) {
    return (
      <main className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center gap-6 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 motion-safe:animate-pop-in" aria-hidden>
          <PartyPopper className="h-12 w-12 text-brand-600" />
        </span>
        <h1 className="text-h1">Runde geschafft!</h1>
        <p className="text-body text-ink-500">
          {roundsDone + 1} {roundsDone === 0 ? "Runde" : "Runden"} · +{xpEarned} XP heute.{" "}
          {dueLeft > 0
            ? `Noch ${dueLeft} fällige Karte${dueLeft === 1 ? "" : "n"} übrig – dranbleiben!`
            : "Alles Fällige erledigt – jede weitere Runde festigt ältere Karten."}
        </p>
        <div className="flex w-full max-w-xs flex-col gap-3">
          <Button
            full
            onClick={() => {
              setRoundsDone((r) => r + 1);
              void loadRound(seenIds);
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <RotateCcw aria-hidden className="h-4 w-4" /> Weiter üben
            </span>
          </Button>
          <Link href="/dashboard" className="font-semibold text-ink-500 hover:text-ink-700">
            Zum Dashboard
          </Link>
        </div>
      </main>
    );
  }

  async function grade(quality: number) {
    const item = current;
    setRevealed(false);
    setSeenIds((ids) => [...ids, item.id]);
    setQueue((q) => {
      if (!q) return q;
      const rest = q.slice(1);
      // „Nochmal“: Karte wandert ans Ende der laufenden Runde
      return quality < 3 ? [...rest, item] : rest;
    });
    if (quality >= 3) setDoneCount((d) => d + 1);

    const res = await fetch(`/api/reviews/${item.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quality }),
    });
    if (res.ok) {
      const data = await res.json();
      setXpEarned((x) => x + (data.xp ?? 0));
    }
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">Wiederholen</h1>
        <span className="text-caption tabular-nums text-ink-500">
          {dueLeft > 0 ? `${dueLeft} fällig` : "Festigungs-Modus"}
        </span>
      </div>
      <ProgressBar value={doneCount} max={Math.max(roundSize, doneCount + queue.length)} label="Runden-Fortschritt" />

      <Card className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-center">
        {!current.due && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-info-50 px-3 py-1 text-caption font-bold text-info-700">
            <BookOpen aria-hidden className="h-3.5 w-3.5" /> Festigung
          </span>
        )}
        <p className="text-caption font-bold text-ink-500">Was heißt …</p>
        <p className="text-display">{current.source}</p>
        {revealed ? (
          <div className="flex flex-col items-center gap-2 motion-safe:animate-pop-in">
            <div className="flex items-center gap-2">
              <p className="text-h1 text-brand-600">{current.target}</p>
              <AudioButton text={current.target} lang="tr" autoPlay />
            </div>
            {current.exampleTarget && (
              <p className="text-caption text-ink-500">
                {current.exampleTarget}
                {current.exampleSource && <> – {current.exampleSource}</>}
              </p>
            )}
          </div>
        ) : (
          <Button onClick={() => setRevealed(true)}>Antwort zeigen</Button>
        )}
      </Card>

      {revealed && (
        <div className="grid grid-cols-4 gap-2" role="group" aria-label="Wie gut wusstest du es?">
          {GRADES.map((g) => (
            <button
              key={g.quality}
              type="button"
              onClick={() => grade(g.quality)}
              className={`flex min-h-[60px] flex-col items-center justify-center rounded-chip border-2 font-semibold transition-transform duration-150 ease-out-strong active:scale-[0.96] [@media(hover:hover)]:hover:-translate-y-0.5 ${g.style}`}
            >
              {g.label}
              <span className="text-[10px] font-normal opacity-70">{g.hint}</span>
            </button>
          ))}
        </div>
      )}
      <p className="text-center text-caption tabular-nums text-ink-500">
        Noch {queue.length} {queue.length === 1 ? "Karte" : "Karten"} in dieser Runde · +{xpEarned} XP heute
      </p>
    </main>
  );
}
