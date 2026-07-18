"use client";

import Link from "next/link";
import {
  GraduationCap,
  Users,
  Home,
  MessageCircle,
  Palette,
  Briefcase,
  Plane,
  UtensilsCrossed,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const ICON_BY_THEME: Record<string, LucideIcon> = {
  grundlagen: GraduationCap,
  "familie-beziehungen": Users,
  "haushalt-alltag": Home,
  "soziale-interaktionen": MessageCircle,
  hobbys: Palette,
  arbeit: Briefcase,
  "reisen-ausland": Plane,
  "essen-shoppen": UtensilsCrossed,
};

type Tile = { slug: string; label: string; count: number };

export function IslandsThemeGridClient({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {tiles.map((t) => {
        const Icon = ICON_BY_THEME[t.slug] ?? MapPin;
        return (
          <Link key={t.slug} href={`/islands/${t.slug}`}>
            <Card className="flex h-full flex-col items-center gap-2 text-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50" aria-hidden>
                <Icon className="h-5 w-5 text-brand-600" />
              </span>
              <p className="font-semibold text-ink-900">{t.label}</p>
              <p className="text-caption text-ink-500">{t.count} Inseln</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
