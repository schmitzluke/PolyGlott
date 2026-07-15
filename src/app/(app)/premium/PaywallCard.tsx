"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const FREE = ["Kurs Türkisch A1 komplett", "Spaced Repetition (SM-2)", "Streaks, XP & Abzeichen"];
const PREMIUM = [
  "Alle Kurse & Levels (A1–C1)",
  "Aussprache-Training ohne Limit",
  "Streak-Freezes jeden Monat",
  "Offline-Modus (bald)",
];

export function PaywallCard({ isPremium }: { isPremium: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function buy() {
    setLoading(true);
    await fetch("/api/premium", { method: "POST" });
    router.refresh();
    setLoading(false);
  }

  if (isPremium) {
    return (
      <main className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center gap-4 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-gold/10" aria-hidden>
          <Sparkles className="h-12 w-12 text-gold" />
        </span>
        <h1 className="text-h1">Du bist Premium!</h1>
        <p className="text-body text-ink-500">Alle Premium-Funktionen sind freigeschaltet.</p>
        <Button onClick={() => router.push("/dashboard")}>Zum Dashboard</Button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4">
      <h1 className="flex items-center justify-center gap-2 text-center text-h1">
        Hol dir PolyGlott Premium <Sparkles aria-hidden className="h-6 w-6 text-gold" />
      </h1>
      <p className="text-center text-body text-ink-500">Lerne schneller mit vollem Zugriff auf alle Kurse.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="text-h3">Free</h2>
          <p className="mt-1 text-h2 tabular-nums">0 €</p>
          <ul className="mt-3 flex flex-col gap-2">
            {FREE.map((f) => (
              <li key={f} className="flex items-center gap-2 text-body text-ink-700">
                <Check aria-hidden className="h-4 w-4 shrink-0 text-correct-700" /> {f}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-2 border-brand-500">
          <div className="flex items-center justify-between">
            <h2 className="text-h3">Premium</h2>
            <span className="rounded-chip bg-brand-50 px-2 py-0.5 text-caption font-bold text-brand-600">Beliebt</span>
          </div>
          <p className="mt-1 text-h2 tabular-nums">
            5,99 €<span className="text-caption font-normal text-ink-500">/Monat</span>
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {PREMIUM.map((f) => (
              <li key={f} className="flex items-center gap-2 text-body text-ink-700">
                <Sparkles aria-hidden className="h-4 w-4 shrink-0 text-gold" /> {f}
              </li>
            ))}
          </ul>
          <Button full className="mt-4" onClick={buy} disabled={loading}>
            {loading ? "Aktiviere …" : "Premium testen"}
          </Button>
          <p className="mt-2 text-center text-caption text-ink-500">
            Testmodus – es wird nichts berechnet und kein Zahlungsdienst kontaktiert.
          </p>
        </Card>
      </div>
    </main>
  );
}
