"use client";

import { useState } from "react";

type StashItem = {
  id: string;
  germanOriginal: string;
  turkishTranslation: string | null;
  status: string;
};

export function StashList({
  sentences,
  setSentences,
}: {
  sentences: StashItem[];
  setSentences: React.Dispatch<React.SetStateAction<StashItem[]>>;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editGerman, setEditGerman] = useState("");
  const [editTurkish, setEditTurkish] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/stash/${id}`, { method: "DELETE" });
      if (res.ok) setSentences((prev: StashItem[]) => prev.filter((s) => s.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  function startEdit(s: StashItem) {
    setEditingId(s.id);
    setEditGerman(s.germanOriginal);
    setEditTurkish(s.turkishTranslation ?? "");
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setError(null);
  }

  async function handleSaveEdit(id: string) {
    if (!editGerman.trim() || !editTurkish.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/stash/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ germanOriginal: editGerman.trim(), turkishTranslation: editTurkish.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Fehler beim Speichern" }));
        throw new Error(err.error || `${res.status}`);
      }
      const updated = await res.json();
      setSentences((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-h4 font-semibold text-ink-900">Deine Sätze ({sentences.length})</h2>
      {sentences.length === 0 && <p className="text-caption text-ink-500">Noch keine Sätze gespeichert.</p>}
      {sentences.map((s) =>
        editingId === s.id ? (
          <div key={s.id} className="space-y-2 rounded-xl bg-white p-4 shadow-card">
            <input
              type="text"
              value={editGerman}
              onChange={(e) => setEditGerman(e.target.value)}
              placeholder="Deutscher Satz"
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-body"
            />
            <input
              type="text"
              value={editTurkish}
              onChange={(e) => setEditTurkish(e.target.value)}
              placeholder="Türkische Übersetzung"
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-body"
            />
            {error && <p className="text-caption text-error-700">{error}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleSaveEdit(s.id)}
                disabled={saving || !editGerman.trim() || !editTurkish.trim()}
                className="rounded-lg bg-brand-500 px-3 py-1.5 text-caption font-medium text-brand-ink disabled:opacity-50"
              >
                {saving ? "Speichere …" : "Speichern"}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                disabled={saving}
                className="rounded-lg px-3 py-1.5 text-caption text-ink-500 hover:underline"
              >
                Abbrechen
              </button>
            </div>
          </div>
        ) : (
          <div key={s.id} className="flex items-start justify-between gap-3 rounded-xl bg-white p-4 shadow-card">
            <div>
              <p className="text-body font-medium text-ink-900">{s.germanOriginal}</p>
              {s.status === "READY" ? (
                <p className="text-body text-brand-600">{s.turkishTranslation}</p>
              ) : (
                <p className="text-caption text-ink-500">Wird übersetzt …</p>
              )}
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => startEdit(s)}
                className="text-caption text-ink-500 hover:underline"
              >
                Bearbeiten
              </button>
              <button
                type="button"
                onClick={() => handleDelete(s.id)}
                disabled={deletingId === s.id}
                className="text-caption text-error-700 hover:underline disabled:opacity-50"
              >
                Löschen
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
