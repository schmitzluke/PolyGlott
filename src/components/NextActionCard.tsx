import Link from "next/link";
import { ArrowRight, RotateCcw, MapPin, Mic, Headphones, Ear } from "lucide-react";
import type { PillarKey, ScoredCandidate } from "@/lib/nextAction";

const PILLAR_META: Record<PillarKey, { label: string; href: string; Icon: typeof RotateCcw }> = {
  reviews: { label: "Wiederholen", href: "/review", Icon: RotateCcw },
  islands: { label: "Inseln entdecken", href: "/islands", Icon: MapPin },
  stash: { label: "Sätze sprechen", href: "/stash", Icon: Mic },
  media: { label: "Media Comprehension", href: "/media", Icon: Headphones },
  commute: { label: "Commute Mode", href: "/commute", Icon: Ear },
};

/** Hervorgehobener "Nächster Schritt"-Slot: die laut Scoring aktuell wertvollste Lernsäule. */
export function NextActionCard({ candidate }: { candidate: ScoredCandidate }) {
  const meta = PILLAR_META[candidate.key];
  return (
    <Link href={meta.href} className="block">
      <div className="rounded-card border-2 border-gold/30 bg-gold/10 p-5 shadow-soft transition-transform duration-150 ease-out-strong active:scale-[0.99] [@media(hover:hover)]:hover:scale-[1.01]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <meta.Icon aria-hidden className="h-6 w-6 shrink-0 text-gold" />
            <div>
              <h2 className="text-h3">{meta.label}</h2>
              <p className="text-caption text-ink-700">{candidate.reason}</p>
            </div>
          </div>
          <ArrowRight aria-hidden className="h-6 w-6 shrink-0 text-gold" />
        </div>
      </div>
    </Link>
  );
}
