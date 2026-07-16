"use client";

import { useRef, useState } from "react";

type StashItem = { id: string; germanOriginal: string; turkishTranslation: string | null; status: string };

function parseCsv(text: string): { germanOriginal: string; turkishTranslation: string }[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const rows: { germanOriginal: string; turkishTranslation: string }[] = [];
  for (const line of lines) {
    const cols = line.split(/[,;]/).map((c) => c.trim().replace(/^"(.*)"$/, "$1"));
    if (cols.length < 2) continue;
    const [german, turkish] = cols;
    if (/^(deutsch|german|de)$/i.test(german) && /^(türkisch|turkish|tr)$/i.test(turkish)) continue;
    if (german && turkish) rows.push({ germanOriginal: german, turkishTranslation: turkish });
  }
  return rows;
}

export function StashCsvImport({ onAdded }: { onAdded: (sentences: StashItem[]) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setImporting(true);
    setError(null);
    setMessage(null);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      if (rows.length === 0) throw new Error("Keine gültigen Zeilen gefunden (Format: Deutsch,Türkisch pro Zeile).");

      const res = await fetch("/api/stash/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Fehler beim Import" }));
        throw new Error(err.error || `${res.status}`);
      }
      const data = await res.json();
      onAdded(data.sentences);
      setMessage(`${data.count} Sätze importiert.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3 rounded-xl bg-surface p-6 shadow-card">
      <h2 className="text-h4 font-semibold text-ink-900">Sätze-Pack importieren (CSV)</h2>
      <p className="text-caption text-ink-500">
        Eine Zeile pro Satz: <code>Deutscher Satz,Türkische Übersetzung</code> (Komma oder Semikolon).
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        disabled={importing}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="w-full text-body"
      />
      {importing && <p className="text-caption text-ink-500">Importiere …</p>}
      {message && <p className="text-caption text-brand-600">{message}</p>}
      {error && <p className="text-caption text-error-700">{error}</p>}
    </div>
  );
}
