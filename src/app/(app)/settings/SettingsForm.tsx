"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChoiceChip } from "@/components/ui/ChoiceChip";

interface Initial {
  name: string;
  dailyGoalXp: number;
  notifications: boolean;
  targetLanguage: string;
  isPremium: boolean;
  email: string;
}

export function SettingsForm({ initial }: { initial: Initial }) {
  const [name, setName] = useState(initial.name);
  const [dailyGoalXp, setDailyGoalXp] = useState(initial.dailyGoalXp);
  const [notifications, setNotifications] = useState(initial.notifications);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dailyGoalXp, notifications }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4">
      <h1 className="text-h1">Einstellungen</h1>

      <Card>
        <h2 className="mb-3 text-h3">Konto</h2>
        <label className="flex flex-col gap-1">
          <span className="text-caption font-semibold text-ink-700">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="min-h-[48px] rounded-chip border-2 border-ink-100 px-4 focus:border-brand-500"
          />
        </label>
        <p className="mt-2 text-caption text-ink-500">Angemeldet als {initial.email}</p>
      </Card>

      <Card>
        <h2 className="mb-3 text-h3">Zielsprache</h2>
        <ChoiceChip state="selected">🇹🇷 Türkisch</ChoiceChip>
        <p className="mt-2 text-caption text-ink-500">
          Weitere Sprachen (z. B. Spanisch) folgen – die Architektur ist bereit, es fehlen nur die Kursdaten.
        </p>
      </Card>

      <Card>
        <h2 className="mb-3 text-h3">Tägliches Lernziel</h2>
        <div className="flex gap-2">
          {[10, 30, 50].map((xp) => (
            <ChoiceChip key={xp} state={dailyGoalXp === xp ? "selected" : "idle"} onClick={() => setDailyGoalXp(xp)}>
              {xp} XP
            </ChoiceChip>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-h3">Tägliche Erinnerung</h2>
            <p className="text-caption text-ink-500">Erinnert dich an fällige Wiederholungen.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={notifications}
            aria-label="Benachrichtigungen"
            onClick={() => setNotifications(!notifications)}
            className={`relative h-8 w-14 rounded-full transition-colors ${notifications ? "bg-correct-500" : "bg-ink-300"}`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-surface shadow transition-all ${notifications ? "left-7" : "left-1"}`}
            />
          </button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-2 text-h3">Abo</h2>
        {initial.isPremium ? (
          <p className="text-body">✨ Du hast <strong>Premium</strong> – danke!</p>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-body text-ink-700">Free-Version</p>
            <Link href="/premium" className="font-semibold text-brand-600 hover:underline">
              Premium entdecken →
            </Link>
          </div>
        )}
      </Card>

      <Button full onClick={save} disabled={saving}>
        {saving ? "Speichere …" : saved ? "Gespeichert ✓" : "Speichern"}
      </Button>
      <Button variant="ghost" full onClick={() => signOut({ callbackUrl: "/" })}>
        Abmelden
      </Button>
    </main>
  );
}
