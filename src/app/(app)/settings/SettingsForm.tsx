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
  apiKey: string;
}

export function SettingsForm({ initial }: { initial: Initial }) {
  const [name, setName] = useState(initial.name);
  const [dailyGoalXp, setDailyGoalXp] = useState(initial.dailyGoalXp);
  const [notifications, setNotifications] = useState(initial.notifications);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const [apiKey, setApiKey] = useState(initial.apiKey);
  const [keyRevealed, setKeyRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rotating, setRotating] = useState(false);

  async function copyKey() {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function regenerateKey() {
    if (!confirm("Neuen API-Key erzeugen? Der alte Key wird sofort ungültig — Integrationen mit dem alten Key hören auf zu funktionieren.")) {
      return;
    }
    setRotating(true);
    const res = await fetch("/api/settings/api-key", { method: "POST" });
    const data = await res.json();
    if (data?.apiKey) {
      setApiKey(data.apiKey);
      setKeyRevealed(true);
    }
    setRotating(false);
  }

  const maskedKey = apiKey ? `${apiKey.slice(0, 6)}${"•".repeat(18)}` : "";

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

      <Card>
        <h2 className="mb-1 text-h3">API-Key</h2>
        <p className="mb-3 text-caption text-ink-500">
          Persönlicher Schlüssel für die Companion-App. Gib ihn an deinen Integrations-Partner weiter –
          damit liest die App unter <code className="rounded bg-ink-100 px-1">GET /api/external/me</code>{" "}
          (Header <code className="rounded bg-ink-100 px-1">Authorization: Bearer &lt;Key&gt;</code>) genau
          deine Fortschrittsdaten. Wie ein Passwort behandeln.
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 overflow-x-auto whitespace-nowrap rounded-chip border-2 border-ink-100 px-3 py-2 text-caption">
            {keyRevealed ? apiKey : maskedKey}
          </code>
          <button
            type="button"
            onClick={() => setKeyRevealed((v) => !v)}
            className="shrink-0 font-semibold text-brand-600 hover:underline"
          >
            {keyRevealed ? "Verbergen" : "Zeigen"}
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <Button variant="secondary" onClick={copyKey}>
            {copied ? "Kopiert ✓" : "Kopieren"}
          </Button>
          <Button variant="ghost" onClick={regenerateKey} disabled={rotating}>
            {rotating ? "Erneuere …" : "Neu erzeugen"}
          </Button>
        </div>
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
