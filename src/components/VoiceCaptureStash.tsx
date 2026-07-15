"use client";

import { useState } from "react";
import { MicButton } from "@/components/ui/MicButton";

export function VoiceCaptureStash() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [lastTranscript, setLastTranscript] = useState<string | null>(null);

  async function handleTranscript(transcript: string) {
    setLastTranscript(transcript);

    if (!transcript.trim()) {
      setStatus({ type: "error", message: "Keine Eingabe erkannt." });
      return;
    }

    setSending(true);
    setStatus(null);

    try {
      const res = await fetch("/api/stash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ germanOriginal: transcript }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Fehler beim Speichern" }));
        throw new Error(err.error || `${res.status}`);
      }

      const data = await res.json();
      setStatus({ type: "success", message: `Satz gespeichert (#${data.id.slice(0, 8)})` });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Fehler";
      setStatus({ type: "error", message: msg });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <MicButton lang="de" onResult={handleTranscript} />

      {lastTranscript && <p className="text-body font-medium text-ink-900">„{lastTranscript}"</p>}

      {sending && <p className="text-caption text-ink-500">Speichere …</p>}

      {status && (
        <p className={`text-caption ${status.type === "success" ? "text-green-600" : "text-error-700"}`}>
          {status.message}
        </p>
      )}
    </div>
  );
}
