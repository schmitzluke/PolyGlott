"use client";

import { ReviewSessionClient } from "@/components/ReviewSessionClient";

/**
 * Wiederholen: strikt nach FSRS-Zeitplan, global über alle Karten (Inseln, Stash, Erzählungen).
 * Insel-eigene Sessions siehe /islands/[theme]/[slug]/practice.
 */
export default function ReviewPage() {
  return (
    <ReviewSessionClient
      apiUrl="/api/reviews"
      title="Wiederholen"
      emptyState={{
        icon: "layers",
        heading: "Noch keine Karten",
        body: "Dein Kartenstapel füllt sich automatisch: Jeder Satz aus Chat, Stash oder Wortschatz-Pack legt neue Karten an.",
        primaryHref: "/trainer",
        primaryLabel: "Wortschatz-Trainer starten",
        secondaryHref: "/chat",
        secondaryLabel: "Oder im Chat üben",
      }}
    />
  );
}
