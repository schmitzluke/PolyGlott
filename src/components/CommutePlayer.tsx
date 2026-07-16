"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Ear, Mic, Pause, Play, Shuffle, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { shuffle } from "@/lib/shuffle";

type Sentence = { id: string; germanOriginal: string; turkishTranslation: string | null };
type Mode = "listen" | "shadow";

const SHADOW_PAUSE_MS = 3500;
const SPEEDS = [0.75, 1, 1.25, 1.5];

export function CommutePlayer({ sentences: initialSentences }: { sentences: Sentence[] }) {
  const [mode, setMode] = useState<Mode>("listen");
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [shuffled, setShuffled] = useState(false);
  const stopRef = useRef(false);

  const sentences = useMemo(
    () => (shuffled ? shuffle(initialSentences) : initialSentences),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shuffled, initialSentences.length]
  );

  const current = sentences[index];

  const modeRef = useRef(mode);
  const speedRef = useRef(speed);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  function speak(text: string, lang: string, rate: number): Promise<void> {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) return resolve();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (!playing || sentences.length === 0) return;
    stopRef.current = false;

    async function loop() {
      let i = index;
      while (!stopRef.current) {
        setIndex(i);
        const s = sentences[i];
        if (!s.turkishTranslation) {
          i = (i + 1) % sentences.length;
          continue;
        }
        await speak(s.turkishTranslation, "tr-TR", speedRef.current);
        if (stopRef.current) break;
        if (modeRef.current === "shadow") {
          await wait(SHADOW_PAUSE_MS);
        }
        if (stopRef.current) break;
        i = (i + 1) % sentences.length;
      }
    }

    loop();
    return () => {
      stopRef.current = true;
      window.speechSynthesis?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, sentences]);

  function toggle() {
    if (playing) {
      stopRef.current = true;
      window.speechSynthesis?.cancel();
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  }

  function skip() {
    window.speechSynthesis?.cancel();
    setIndex((i) => (i + 1) % sentences.length);
  }

  function toggleShuffle() {
    window.speechSynthesis?.cancel();
    setIndex(0);
    setShuffled((v) => !v);
  }

  if (sentences.length === 0) {
    return (
      <Card>
        <p className="text-body text-ink-500">
          Noch keine Sätze bereit. Sprich in <a href="/stash" className="text-brand-600 hover:underline">Sätze sprechen</a> ein paar Sätze ein.
        </p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="!p-0">
        <div className="grid grid-cols-2 divide-x divide-ink-100">
          <button
            type="button"
            onClick={() => setMode("listen")}
            className={`flex min-h-[56px] items-center justify-center gap-2 rounded-l-card px-4 py-3 font-semibold transition-colors duration-150 ${
              mode === "listen" ? "bg-brand-50 text-brand-600" : "text-ink-500 hover:bg-ink-100"
            }`}
          >
            <Ear aria-hidden className="h-5 w-5" /> Nur Zuhören
          </button>
          <button
            type="button"
            onClick={() => setMode("shadow")}
            className={`flex min-h-[56px] items-center justify-center gap-2 rounded-r-card px-4 py-3 font-semibold transition-colors duration-150 ${
              mode === "shadow" ? "bg-brand-50 text-brand-600" : "text-ink-500 hover:bg-ink-100"
            }`}
          >
            <Mic aria-hidden className="h-5 w-5" /> Shadowing
          </button>
        </div>
      </Card>

      <Card className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={`min-h-[36px] rounded-chip px-3 text-caption font-semibold transition-colors duration-150 ${
                speed === s ? "bg-brand-500 text-brand-ink" : "bg-ink-100 text-ink-500 hover:bg-ink-300/40"
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={toggleShuffle}
          aria-pressed={shuffled}
          className={`flex min-h-[36px] items-center gap-1.5 rounded-chip px-3 text-caption font-semibold transition-colors duration-150 ${
            shuffled ? "bg-brand-500 text-brand-ink" : "bg-ink-100 text-ink-500 hover:bg-ink-300/40"
          }`}
        >
          <Shuffle aria-hidden className="h-4 w-4" /> Zufällig
        </button>
      </Card>

      <Card className="flex flex-col items-center gap-2 py-10 text-center">
        <p className="text-caption text-ink-500">
          Satz {index + 1} von {sentences.length}
        </p>
        <p className="mt-2 text-h2 text-ink-900">{current.turkishTranslation ?? "…"}</p>
        <p className="mt-1 text-body text-ink-500">{current.germanOriginal}</p>
        {mode === "shadow" && playing && (
          <p className="mt-3 text-caption text-brand-600">Jetzt nachsprechen …</p>
        )}
      </Card>

      <div className="flex items-center gap-3">
        <Button full onClick={toggle}>
          {playing ? (
            <span className="flex items-center justify-center gap-2">
              <Pause aria-hidden className="h-5 w-5" /> Pause
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Play aria-hidden className="h-5 w-5" /> Start
            </span>
          )}
        </Button>
        <Button variant="secondary" onClick={skip} aria-label="Nächster Satz">
          <SkipForward aria-hidden className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-caption text-ink-500">
        Bildschirm ausschalten möglich – läuft im Hintergrund weiter, solange der Tab aktiv bleibt.
      </p>
    </div>
  );
}
