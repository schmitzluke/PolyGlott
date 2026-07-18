import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ISLAND_THEMES } from "@/lib/islandThemes";
import { IslandsThemeGridClient } from "@/components/IslandsThemeGridClient";

export const dynamic = "force-dynamic";

/** Themen-Grid: Einstiegspunkt in die Inseln, gruppiert nach Alltags-Situation. */
export default async function IslandsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const packs = await db.islandPack.findMany({
    where: { OR: [{ isCustom: false }, { userId: user.id }] },
    select: { theme: true },
  });

  const countByTheme = new Map<string, number>();
  let otherCount = 0;
  for (const p of packs) {
    if (p.theme) {
      countByTheme.set(p.theme, (countByTheme.get(p.theme) ?? 0) + 1);
    } else {
      otherCount++;
    }
  }

  const tiles = ISLAND_THEMES.map((t) => ({
    slug: t.slug,
    label: t.label,
    count: countByTheme.get(t.slug) ?? 0,
  })).filter((t) => t.count > 0);

  if (otherCount > 0) {
    tiles.push({ slug: "sonstiges", label: "Sonstiges", count: otherCount });
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-1 text-center">
        <h1 className="text-h3 font-bold text-ink-900">Inseln entdecken</h1>
        <p className="text-body text-ink-600">
          Kuratierte, garantiert lernbare Sätze nach Situation – ideal für den Einstieg.
        </p>
      </div>
      <IslandsThemeGridClient tiles={tiles} />
    </div>
  );
}
