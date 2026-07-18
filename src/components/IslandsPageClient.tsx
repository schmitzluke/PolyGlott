import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

type Pack = { id: string; slug: string; title: string; level: string; total: number; joined: number };

export function IslandsPageClient({ theme, initialPacks }: { theme: string; initialPacks: Pack[] }) {
  return (
    <div className="flex flex-col gap-3">
      {initialPacks.map((p) => {
        const complete = p.total > 0 && p.joined >= p.total;
        return (
          <Link key={p.id} href={`/islands/${theme}/${p.slug}`}>
            <Card>
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
              </div>
              {p.joined > 0 && (
                <div className="mt-3">
                  <ProgressBar
                    value={p.joined}
                    max={p.total}
                    color={complete ? "bg-correct-500" : "bg-brand-500"}
                    label={`${p.title} Fortschritt`}
                  />
                </div>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
