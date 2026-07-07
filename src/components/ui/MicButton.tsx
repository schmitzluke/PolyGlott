"use client";

import { useEffect, useState } from "react";
import { Mic } from "lucide-react";
import { recognizeOnce, sttAvailable } from "@/lib/speech";

/** Mikrofon-Button für Aussprache-Übungen. Graceful Fallback ohne STT. */
export function MicButton({
  lang = "tr",
  onResult,
  onUnavailable,
}: {
  lang?: string;
  onResult: (transcript: string) => void;
  onUnavailable?: () => void;
}) {
  const [available, setAvailable] = useState(true);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ok = sttAvailable();
    setAvailable(ok);
    if (!ok) onUnavailable?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function listen() {
    setError(null);
    setListening(true);
    try {
      const transcript = await recognizeOnce(lang);
      onResult(transcript);
    } catch (e) {
      const code = e instanceof Error ? e.message : "unknown";
      setError(
        code === "not-allowed"
          ? "Mikrofon-Zugriff wurde abgelehnt. Erlaube ihn in den Browser-Einstellungen."
          : "Spracherkennung hat nicht geklappt – versuch es nochmal."
      );
    } finally {
      setListening(false);
    }
  }

  if (!available) {
    return (
      <p className="rounded-chip bg-info-50 px-4 py-3 text-caption text-info-700">
        Dein Browser unterstützt keine Spracherkennung. Du kannst diese Übung überspringen –
        sie zählt nicht als Fehler.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={listen}
        disabled={listening}
        aria-label="Aufnahme starten"
        className={`flex h-20 w-20 items-center justify-center rounded-full shadow-lifted transition-transform duration-150 ease-out-strong [@media(hover:hover)]:hover:scale-105 active:scale-95 ${
          listening ? "animate-pulse bg-error-500 text-white" : "bg-brand-500 text-brand-ink"
        }`}
      >
        <Mic aria-hidden className="h-9 w-9" />
      </button>
      <span className="text-caption text-ink-500">{listening ? "Ich höre zu …" : "Tippen & nachsprechen"}</span>
      {error && <p className="text-caption text-error-700">{error}</p>}
    </div>
  );
}
