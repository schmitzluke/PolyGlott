"use client";

import { useState } from "react";
import { Star, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Sentence = { id: string; germanOriginal: string; turkishTranslation: string; stars: number };

function StarRow({ stars }: { stars: number }) {
  return (
    <span className="flex shrink-0 gap-0.5" aria-label={`${stars} von 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= stars ? "fill-brand-500 text-brand-500" : "text-ink-100"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function IslandDetailClient({
  packId,
  sentences,
  canJoin,
  joined,
  totalCurated,
}: {
  packId: string;
  sentences: Sentence[];
  canJoin: boolean;
  joined: number;
  totalCurated: number;
}) {
  const [joinState, setJoinState] = useState<"idle" | "joining" | "done">(
    canJoin && joined >= totalCurated && totalCurated > 0 ? "done" : "idle"
  );

  async function join() {
    setJoinState("joining");
    try {
      const res = await fetch(`/api/islands/${packId}/join`, { method: "POST" });
      setJoinState(res.ok ? "done" : "idle");
    } catch {
      setJoinState("idle");
    }
  }

  return (
    <div className="space-y-4">
      {canJoin &&
        (joinState === "done" ? (
          <p className="flex items-center justify-center gap-1 text-caption font-semibold text-correct-700">
            <Check aria-hidden className="h-4 w-4" /> Übernommen
          </p>
        ) : (
          <Button full onClick={join} disabled={joinState === "joining"}>
            {joinState === "joining" ? "…" : "Insel üben"}
          </Button>
        ))}
      <div className="flex flex-col gap-2">
        {sentences.map((s) => (
          <Card key={s.id} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium text-ink-900">{s.germanOriginal}</p>
              <p className="truncate text-caption text-ink-500">{s.turkishTranslation}</p>
            </div>
            <StarRow stars={s.stars} />
          </Card>
        ))}
      </div>
    </div>
  );
}
