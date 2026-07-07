"use client";

/**
 * Wrapper um Web Speech API (TTS + STT) mit Graceful Fallback.
 * Die Provider-Abstraktion erlaubt später externe STT/TTS-Dienste:
 * einfach ttsProvider/sttProvider austauschen.
 */

export const LANG_TAGS: Record<string, string> = {
  tr: "tr-TR",
  es: "es-ES",
  de: "de-DE",
  en: "en-US",
};

// ---- TTS ----

export function ttsAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/**
 * Stimmen werden vom Browser asynchron geladen – ohne Vorab-Laden ist der
 * erste speak()-Aufruf spürbar verzögert oder stumm. Deshalb: Cache + Warmup.
 */
let voicesCache: SpeechSynthesisVoice[] = [];

export function warmupTts(): void {
  if (!ttsAvailable()) return;
  const synth = window.speechSynthesis;
  voicesCache = synth.getVoices();
  if (voicesCache.length === 0) {
    synth.addEventListener(
      "voiceschanged",
      () => {
        voicesCache = synth.getVoices();
      },
      { once: true }
    );
  }
}

function pickVoice(tag: string): SpeechSynthesisVoice | undefined {
  const voices = voicesCache.length > 0 ? voicesCache : window.speechSynthesis.getVoices();
  const norm = (l: string) => l.replace("_", "-").toLowerCase();
  return (
    // 1. exakte Sprache, lokale Stimme (startet am schnellsten)
    voices.find((v) => norm(v.lang) === tag.toLowerCase() && v.localService) ??
    // 2. exakte Sprache
    voices.find((v) => norm(v.lang) === tag.toLowerCase()) ??
    // 3. gleiche Sprachfamilie (z. B. tr-*)
    voices.find((v) => norm(v.lang).startsWith(tag.slice(0, 2).toLowerCase()))
  );
}

export function speak(text: string, lang = "tr"): Promise<void> {
  return new Promise((resolve) => {
    if (!ttsAvailable()) return resolve();
    const synth = window.speechSynthesis;
    const tag = LANG_TAGS[lang] ?? lang;

    const doSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = tag;
      utterance.rate = 0.95;
      const voice = pickVoice(tag);
      if (voice) utterance.voice = voice;

      // Safety-Net: falls onend nie feuert (Browser-Bug), nicht ewig hängen
      const timeout = setTimeout(() => resolve(), Math.max(4000, text.length * 120));
      utterance.onend = () => {
        clearTimeout(timeout);
        resolve();
      };
      utterance.onerror = () => {
        clearTimeout(timeout);
        resolve();
      };
      synth.speak(utterance);
      // Chrome bleibt manchmal im "paused"-Zustand hängen
      synth.resume();
    };

    if (synth.speaking || synth.pending) {
      // Chrome-Bug: speak() direkt nach cancel() wird oft verschluckt –
      // kurzer Delay macht die Wiedergabe zuverlässig.
      synth.cancel();
      setTimeout(doSpeak, 60);
    } else {
      doSpeak();
    }
  });
}

// ---- STT ----

type SpeechRecognitionCtor = new () => {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function sttAvailable(): boolean {
  return getRecognitionCtor() !== null;
}

/** Aktive Erkennung – damit z. B. ein Sprachwechsel sie sofort abbrechen kann. */
let activeRecognition: { abort: () => void } | null = null;

export function abortRecognition(): void {
  activeRecognition?.abort();
  activeRecognition = null;
}

export function recognizeOnce(lang = "tr"): Promise<string> {
  return new Promise((resolve, reject) => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) return reject(new Error("stt_unavailable"));
    const rec = new Ctor();
    rec.lang = LANG_TAGS[lang] ?? lang;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    activeRecognition = rec;
    let settled = false;
    rec.onresult = (event) => {
      settled = true;
      resolve(event.results[0]?.[0]?.transcript ?? "");
    };
    rec.onerror = (event) => {
      settled = true;
      // "aborted" ist kein echter Fehler (Sprachwechsel/Abbruch)
      if (event.error === "aborted") resolve("");
      else reject(new Error(event.error));
    };
    rec.onend = () => {
      if (activeRecognition === rec) activeRecognition = null;
      if (!settled) resolve("");
    };
    rec.start();
  });
}

// ---- Aussprache-Vergleich ----

export function normalize(text: string): string {
  return text
    .toLocaleLowerCase("tr")
    .normalize("NFC")
    .replace(/[.,!?;:'"¿¡]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Türkische Sonderzeichen auf ASCII falten – die Spracherkennung liefert je
 * nach Browser/Systemsprache „nasilsin“ statt „nasılsın“. Das darf nicht als
 * Fehler zählen.
 */
function asciiFold(word: string): string {
  return word
    .replace(/ı/g, "i")
    .replace(/i̇/g, "i")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/â/g, "a");
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const curr = [i];
    for (let j = 1; j <= n; j++) {
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = curr;
  }
  return prev[n];
}

function similarity(a: string, b: string): number {
  const max = Math.max(a.length, b.length);
  if (max === 0) return 1;
  return 1 - levenshtein(a, b) / max;
}

export interface PronunciationScore {
  score: number; // 0–100
  words: { word: string; matched: boolean }[];
}

/**
 * Wortweiser, fehlertoleranter Vergleich Transkript ↔ Zieltext:
 * Sonderzeichen-Falten + Ähnlichkeit ≥ 75 % gilt als Treffer
 * (STT schreibt nie exakt so, wie das Lehrbuch es tut).
 */
export function scorePronunciation(target: string, transcript: string): PronunciationScore {
  const targetWords = normalize(target).split(" ").filter(Boolean);
  const heardWords = normalize(transcript).split(" ").filter(Boolean);
  const used = new Set<number>();

  const words = targetWords.map((word) => {
    const folded = asciiFold(word);
    let bestIndex = -1;
    let bestSim = 0;
    heardWords.forEach((heard, i) => {
      if (used.has(i)) return;
      const sim = similarity(folded, asciiFold(heard));
      if (sim > bestSim) {
        bestSim = sim;
        bestIndex = i;
      }
    });
    const matched = bestSim >= 0.75;
    if (matched && bestIndex >= 0) used.add(bestIndex);
    return { word, matched };
  });

  const matchedCount = words.filter((w) => w.matched).length;
  const score = targetWords.length === 0 ? 0 : Math.round((matchedCount / targetWords.length) * 100);
  return { score, words };
}
