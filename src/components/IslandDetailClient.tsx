"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function IslandDetailClient({
  theme,
  slug,
  packId,
  sentenceCount,
  storyCount,
  canJoin,
  joined,
  totalCurated,
}: {
  theme: string;
  slug: string;
  packId: string;
  sentenceCount: number;
  storyCount: number;
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
      <div className="flex flex-col gap-3">
        <Link href={`/islands/${theme}/${slug}/practice`}>
          <Card className="flex items-center gap-3 bg-brand-500 text-brand-ink">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20" aria-hidden>
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">Sätze</p>
              <p className="text-caption opacity-80">{sentenceCount} Elemente</p>
            </div>
          </Card>
        </Link>
        {storyCount > 0 && (
          <Link href={`/islands/${theme}/${slug}/stories`}>
            <Card className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50" aria-hidden>
                <BookOpen className="h-5 w-5 text-brand-600" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-900">Erzählungen</p>
                <p className="text-caption text-ink-500">{storyCount} Elemente</p>
              </div>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
}
