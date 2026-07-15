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

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/stash/${id}`, { method: "DELETE" });
      if (res.ok) setSentences((prev: StashItem[]) => prev.filter((s) => s.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-h4 font-semibold text-ink-900">Deine Sätze ({sentences.length})</h2>
      {sentences.length === 0 && <p className="text-caption text-ink-500">Noch keine Sätze gespeichert.</p>}
      {sentences.map((s) => (
        <div key={s.id} className="flex items-start justify-between gap-3 rounded-xl bg-white p-4 shadow-card">
          <div>
            <p className="text-body font-medium text-ink-900">{s.germanOriginal}</p>
            {s.status === "READY" ? (
              <p className="text-body text-brand-600">{s.turkishTranslation}</p>
            ) : (
              <p className="text-caption text-ink-500">Wird übersetzt …</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => handleDelete(s.id)}
            disabled={deletingId === s.id}
            className="shrink-0 text-caption text-error-700 hover:underline disabled:opacity-50"
          >
            Löschen
          </button>
        </div>
      ))}
    </div>
  );
}
