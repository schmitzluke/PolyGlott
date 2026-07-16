"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, FileText, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type TranscriptItem = {
  id: string;
  title: string;
  status: string;
  comprehended: boolean;
  createdAt: string;
};

const STATUS_META: Record<string, { label: string; icon: typeof Clock; className: string }> = {
  PENDING: { label: "Wird verarbeitet …", icon: Loader2, className: "text-info-700" },
  READY: { label: "Bereit zum Lernen", icon: FileText, className: "text-brand-600" },
  FAILED: { label: "Fehlgeschlagen", icon: XCircle, className: "text-error-700" },
};

export function MediaPageClient({ initialTranscripts }: { initialTranscripts: TranscriptItem[] }) {
  const [transcripts, setTranscripts] = useState(initialTranscripts);
  const [title, setTitle] = useState("");
  const [rawText, setRawText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!rawText.trim()) return;
    setSubmitting(true);
    setError(null);
    const res = await fetch("/api/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, rawText }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Import fehlgeschlagen.");
      return;
    }
    const data = await res.json();
    setTranscripts((prev) => [
      { id: data.id, title: title || "Unbenanntes Transkript", status: "PENDING", comprehended: false, createdAt: new Date().toISOString() },
      ...prev,
    ]);
    setTitle("");
    setRawText("");
  }

  return (
    <>
      <Card>
        <h2 className="mb-3 text-h3">Transkript importieren</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titel (z. B. Videoname)"
            className="min-h-[48px] rounded-chip border-2 border-ink-100 px-4 focus:border-brand-500"
          />
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Türkisches Transkript hier einfügen …"
            rows={6}
            className="rounded-chip border-2 border-ink-100 px-4 py-3 focus:border-brand-500"
          />
          {error && <p className="text-caption text-error-700">{error}</p>}
          <Button full onClick={submit} disabled={submitting || !rawText.trim()}>
            {submitting ? "Importiere …" : "Importieren"}
          </Button>
        </div>
      </Card>

      <div className="flex flex-col gap-3">
        {transcripts.length === 0 && (
          <p className="text-center text-body text-ink-500">Noch keine Transkripte importiert.</p>
        )}
        {transcripts.map((t) => {
          const meta = STATUS_META[t.status] ?? STATUS_META.PENDING;
          const Icon = meta.icon;
          return (
            <Link key={t.id} href={`/media/${t.id}`} className="block">
              <Card className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink-900">{t.title}</p>
                  <p className={`flex items-center gap-1.5 text-caption ${meta.className}`}>
                    <Icon aria-hidden className={`h-3.5 w-3.5 ${t.status === "PENDING" ? "animate-spin" : ""}`} />
                    {meta.label}
                  </p>
                </div>
                {t.comprehended && (
                  <CheckCircle2 aria-hidden className="h-5 w-5 shrink-0 text-correct-500" />
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
