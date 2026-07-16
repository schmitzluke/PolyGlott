"use client";

import { useState } from "react";
import { Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

type Pack = { id: string; slug: string; title: string; level: string; total: number; joined: number };

export function IslandsPageClient({ initialPacks }: { initialPacks: Pack[] }) {
  const [packs, setPacks] = useState(initialPacks);
  const [joiningId, setJoiningId] = useState<string | null>(null);

  async function join(id: string) {
    setJoiningId(id);
    try {
      const res = await fetch(`/api/islands/${id}/join`, { method: "POST" });
      if (res.ok) {
        setPacks((prev) => prev.map((p) => (p.id === id ? { ...p, joined: p.total } : p)));
      }
    } finally {
      setJoiningId(null);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {packs.map((p) => {
        const complete = p.total > 0 && p.joined >= p.total;
        return (
          <Card key={p.id}>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50" aria-hidden>
                <MapPin className="h-5 w-5 text-brand-600" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-900">{p.title}</p>
                <p className="text-caption text-ink-500">
                  {p.level} · {p.total} Sätze
                </p>
              </div>
              {complete ? (
                <span className="flex shrink-0 items-center gap-1 text-caption font-semibold text-correct-700">
                  <Check aria-hidden className="h-4 w-4" /> Übernommen
                </span>
              ) : (
                <Button
                  variant={p.joined > 0 ? "secondary" : "primary"}
                  onClick={() => join(p.id)}
                  disabled={joiningId === p.id}
                  className="shrink-0"
                >
                  {joiningId === p.id ? "…" : p.joined > 0 ? "Fortsetzen" : "Übernehmen"}
                </Button>
              )}
            </div>
            {p.joined > 0 && !complete && (
              <div className="mt-3">
                <ProgressBar value={p.joined} max={p.total} label={`${p.title} Fortschritt`} />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
