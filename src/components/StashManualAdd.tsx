"use client";

import { useState } from "react";

export function StashManualAdd({ onAdded }: { onAdded: (sentence: { id: string; germanOriginal: string; turkishTranslation: string | null; status: string }) => void }) {
  const [german, setGerman] = useState("");
  const [turkish, setTurkish] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!german.trim() || !turkish.trim()) return;

    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/stash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ germanOriginal: german.trim(), turkishTranslation: turkish.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Fehler beim Speichern" }));
        throw new Error(err.error || `${res.status}`);
      }
      const data = await res.json();
      onAdded({ id: data.id, germanOriginal: german.trim(), turkishTranslation: turkish.trim(), status: "READY" });
      setGerman("");
      setTurkish("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl bg-surface p-6 shadow-card">
      <h2 className="text-h4 font-semibold text-ink-900">Satz manuell hinzufügen</h2>
      <input
        type="text"
        value={german}
        onChange={(e) => setGerman(e.target.value)}
        placeholder="Deutscher Satz"
        className="w-full rounded-lg border border-ink-100 px-3 py-2 text-body"
      />
      <input
        type="text"
        value={turkish}
        onChange={(e) => setTurkish(e.target.value)}
        placeholder="Türkische Übersetzung"
        className="w-full rounded-lg border border-ink-100 px-3 py-2 text-body"
      />
      {error && <p className="text-caption text-error-700">{error}</p>}
      <button
        type="submit"
        disabled={saving || !german.trim() || !turkish.trim()}
        className="w-full rounded-lg bg-brand-500 py-2 text-body font-medium text-brand-ink disabled:opacity-50"
      >
        {saving ? "Speichere …" : "Hinzufügen"}
      </button>
    </form>
  );
}
