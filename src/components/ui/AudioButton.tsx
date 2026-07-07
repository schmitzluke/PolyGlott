"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { speak, ttsAvailable, warmupTts } from "@/lib/speech";

/** „Vorlesen“-Button (TTS) für Zieltexte. Graceful Fallback ohne TTS. */
export function AudioButton({
  text,
  lang = "tr",
  size = "md",
  autoPlay = false,
}: {
  text: string;
  lang?: string;
  size?: "md" | "lg";
  autoPlay?: boolean;
}) {
  const [available, setAvailable] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setAvailable(ttsAvailable());
    warmupTts(); // Stimmen vorladen, sonst hakt der erste Klick
  }, []);

  useEffect(() => {
    if (autoPlay && ttsAvailable()) {
      const t = setTimeout(() => play(), 400);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  async function play() {
    setPlaying(true);
    await speak(text, lang);
    setPlaying(false);
  }

  if (!available) {
    return (
      <span className="text-ink-500" title="Sprachausgabe im Browser nicht verfügbar">
        <VolumeX aria-hidden className="h-5 w-5" />
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={play}
      aria-label={`Vorlesen: ${text}`}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-info-50 text-info-700 transition-transform duration-150 ease-out-strong [@media(hover:hover)]:hover:scale-105 active:scale-95 ${
        size === "lg" ? "h-14 w-14" : "h-11 w-11"
      } ${playing ? "ring-2 ring-info-500" : ""}`}
    >
      <Volume2 aria-hidden className={`${size === "lg" ? "h-7 w-7" : "h-5 w-5"} ${playing ? "animate-pulse" : ""}`} />
    </button>
  );
}
