"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, GraduationCap, KeyRound, Languages, Lightbulb, Mic, PhoneCall, PhoneOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { XPBadge } from "@/components/ui/XPBadge";
import { abortRecognition, recognizeOnce, speak, sttAvailable, ttsAvailable, warmupTts } from "@/lib/speech";
import { detectLang, parseAssistantReply, speakableText } from "@/lib/chatFormat";

interface Message {
  role: "user" | "assistant";
  content: string;
  /** Steuer-Nachrichten (z. B. Anruf-Start) – im Kontext, aber nicht im Transkript */
  hidden?: boolean;
}

type CallStatus = "idle" | "listening" | "thinking" | "speaking";

const STATUS_TEXT: Record<CallStatus, string> = {
  idle: "Tippe aufs Mikro und sprich – Deutsch oder Türkisch.",
  listening: "Ich höre zu …",
  thinking: "Einen Moment …",
  speaking: "Dein Gegenüber spricht …",
};

export function LiveCall({
  scenarioId,
  title,
  description,
  userName,
  level,
}: {
  scenarioId: string;
  title: string;
  description: string;
  userName: string | null;
  level: string;
}) {
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<CallStatus>("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [speakLang, setSpeakLang] = useState<"tr" | "de">("tr");
  const [handsFree, setHandsFree] = useState(true);
  const [error, setError] = useState<{ kind: "no_api_key" | "other"; message: string } | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [earnedXp, setEarnedXp] = useState<number | null>(null);
  const [supported, setSupported] = useState(true);
  const [translations, setTranslations] = useState<Record<number, string>>({});
  const [translating, setTranslating] = useState<number | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [hintLoading, setHintLoading] = useState(false);

  const endedRef = useRef(false);
  const speakLangRef = useRef<"tr" | "de">("tr");
  const restartAfterAbortRef = useRef(false);
  const messagesRef = useRef<Message[]>([]);
  const handsFreeRef = useRef(true);
  const statusRef = useRef<CallStatus>("idle");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSupported(sttAvailable() && ttsAvailable());
    warmupTts();
    return () => {
      endedRef.current = true;
      abortRecognition();
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    handsFreeRef.current = handsFree;
  }, [handsFree]);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status, feedback]);

  function switchLang(lang: "tr" | "de") {
    setSpeakLang(lang);
    speakLangRef.current = lang;
    if (statusRef.current === "listening") {
      restartAfterAbortRef.current = true;
      abortRecognition();
    }
  }

  function pushMessages(next: Message[]) {
    messagesRef.current = next;
    setMessages(next);
  }

  async function requestReply(next: Message[], mode?: "feedback"): Promise<string | null> {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenarioId,
        call: true,
        mode,
        messages: next.map(({ role, content }) => ({ role, content })),
      }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setError({
        kind: data?.error === "no_api_key" ? "no_api_key" : "other",
        message: data?.message ?? "Etwas ist schiefgelaufen.",
      });
      return null;
    }
    return data.reply as string;
  }

  async function speakReply(raw: string) {
    const parsed = parseAssistantReply(raw);
    setStatus("speaking");
    // Stimme je erkannter Sprache wählen – sonst wird eine deutsche Erklärung
    // mit türkischer Stimme vorgelesen und klingt falsch.
    const tr = speakableText(parsed.tr);
    if (tr && !endedRef.current) await speak(tr, detectLang(tr));
    if (parsed.de && !endedRef.current) {
      const de = speakableText(parsed.de);
      if (de) await speak(de, detectLang(de));
    }
  }

  async function translateMessage(i: number, text: string) {
    if (translations[i] || translating !== null) return;
    setTranslating(i);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId, mode: "translate", text }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.reply) setTranslations((t) => ({ ...t, [i]: data.reply as string }));
    } finally {
      setTranslating(null);
    }
  }

  async function getHint() {
    if (hintLoading) return;
    setHintLoading(true);
    setHint(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId,
          mode: "hint",
          messages: messagesRef.current.filter((m) => !m.hidden).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.reply) setHint(data.reply as string);
    } finally {
      setHintLoading(false);
    }
  }

  async function startCall() {
    setStarted(true);
    endedRef.current = false;
    setStatus("thinking");
    // Eröffnung kommt vom Modell – jedes Mal anders, passend zur Rolle
    const opening: Message[] = [
      { role: "user", content: "(Der Anruf beginnt. Begrüße mich in deiner Rolle und eröffne das Gespräch.)", hidden: true },
    ];
    pushMessages(opening);
    const reply = await requestReply(opening);
    if (!reply || endedRef.current) {
      setStatus("idle");
      return;
    }
    pushMessages([...opening, { role: "assistant", content: reply }]);
    await speakReply(reply);
    setStatus("idle");
    if (handsFreeRef.current) void listenLoop();
  }

  async function listenLoop() {
    if (endedRef.current || feedback) return;
    setError(null);
    setStatus("listening");
    let transcript = "";
    try {
      transcript = (await recognizeOnce(speakLangRef.current)).trim();
    } catch (e) {
      setStatus("idle");
      const code = e instanceof Error ? e.message : "";
      if (code === "not-allowed") {
        setError({ kind: "other", message: "Mikrofon-Zugriff wurde abgelehnt – erlaube ihn in den Browser-Einstellungen." });
      }
      return;
    }
    if (endedRef.current) return;
    if (!transcript) {
      if (restartAfterAbortRef.current) {
        restartAfterAbortRef.current = false;
        return void listenLoop();
      }
      setStatus("idle");
      return;
    }

    // Sprache automatisch am Transkript erkennen und den Umschalter nachführen,
    // damit die nächste Erkennung im richtigen Modus läuft (Web-Speech braucht
    // die Sprache vorab – daher greift die Erkennung ab dem nächsten Zug).
    const detected = detectLang(transcript);
    if (detected !== speakLangRef.current) {
      setSpeakLang(detected);
      speakLangRef.current = detected;
    }

    const withUser: Message[] = [...messagesRef.current, { role: "user", content: transcript }];
    pushMessages(withUser);
    setStatus("thinking");

    const reply = await requestReply(withUser);
    if (endedRef.current) return;
    if (!reply) {
      setStatus("idle");
      return;
    }
    pushMessages([...withUser, { role: "assistant", content: reply }]);
    await speakReply(reply);
    if (endedRef.current) return;
    setStatus("idle");
    if (handsFreeRef.current) void listenLoop();
  }

  async function endCall() {
    endedRef.current = true;
    abortRecognition();
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setStatus("thinking");
    const userTurns = messagesRef.current.filter((m) => m.role === "user" && !m.hidden).length;
    const reply = await requestReply(
      [...messagesRef.current, { role: "user", content: "(Das Gespräch ist zu Ende. Bitte gib mir jetzt dein Feedback.)" }],
      "feedback"
    );
    if (reply) {
      setFeedback(reply);
      const res = await fetch("/api/chat/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userTurns }),
      });
      const data = await res.json().catch(() => null);
      if (data?.xp) setEarnedXp(data.xp);
    }
    setStatus("idle");
  }

  if (!supported) {
    return (
      <main className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center gap-4 text-center">
        <Mic aria-hidden className="h-12 w-12 text-ink-500" />
        <h1 className="text-h1">Anruf-Modus</h1>
        <p className="text-body text-ink-500">
          Dein Browser unterstützt Spracherkennung oder Sprachausgabe nicht.
          Am besten funktioniert der Anruf-Modus in Chrome. Alternativ kannst du
          in den Szenario-Chats tippen.
        </p>
        <Link href="/chat" className="font-semibold text-brand-600 hover:underline">
          Zu den Szenario-Chats
        </Link>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="mx-auto flex min-h-[70dvh] max-w-md flex-col items-center justify-center gap-6 text-center">
        <span className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-50" aria-hidden>
          <PhoneCall className="h-14 w-14 text-brand-600" />
        </span>
        <div>
          <h1 className="text-h1">Anruf: {title}</h1>
          <p className="mt-2 text-body text-ink-500">
            {description} Du sprichst, dein Gegenüber antwortet mit Stimme – fast nur auf
            Türkisch. Deutsch gibt es nur, wenn du nicht weiterkommst oder danach fragst.
          </p>
        </div>
        <Button full onClick={startCall}>
          <span className="flex items-center justify-center gap-2">
            <PhoneCall aria-hidden className="h-5 w-5" /> Anrufen
          </span>
        </Button>
        <Link href="/chat" className="text-body text-ink-500 hover:text-ink-700">
          Zurück zur Übersicht
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[80dvh] max-w-2xl flex-col gap-4">
      <header className="flex items-center gap-3">
        <Link
          href="/chat"
          aria-label="Anruf verlassen"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
        >
          <ArrowLeft aria-hidden className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-h3">{title}</h1>
          <p className="text-caption text-ink-500" aria-live="polite">
            {feedback ? "Anruf beendet" : `Niveau ${level} · ${STATUS_TEXT[status]}`}
          </p>
        </div>
        {!feedback && (
          <Button variant="danger" onClick={endCall} disabled={status === "thinking"}>
            <span className="flex items-center gap-2">
              <PhoneOff aria-hidden className="h-4 w-4" /> Auflegen
            </span>
          </Button>
        )}
      </header>

      {/* Transkript */}
      <div className="flex flex-1 flex-col gap-3">
        {messages
          .filter((m) => !m.hidden)
          .map((m, i) => {
            const isUser = m.role === "user";
            const parsed = isUser ? null : parseAssistantReply(m.content);
            const mainText = isUser ? m.content : parsed!.tr;
            const translation = translations[i];
            return (
              <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-card px-4 py-3 motion-safe:animate-pop-in ${
                    isUser ? "bg-brand-50" : "bg-surface shadow-soft"
                  }`}
                >
                  <p className={`text-body ${isUser ? "" : "font-medium"}`}>{mainText}</p>
                  {!isUser && parsed!.de && (
                    <div className="mt-2 flex items-start gap-1.5 border-t border-ink-100 pt-2">
                      <Lightbulb aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-info-700" />
                      <p className="text-caption text-ink-500">{parsed!.de}</p>
                    </div>
                  )}
                  {translation ? (
                    <p className="mt-2 border-t border-ink-100 pt-2 text-caption text-ink-500">🇩🇪 {translation}</p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => translateMessage(i, mainText)}
                      disabled={translating === i}
                      className="mt-2 inline-flex items-center gap-1 text-caption font-semibold text-brand-600 hover:underline disabled:opacity-50"
                    >
                      <Languages aria-hidden className="h-3.5 w-3.5" />
                      {translating === i ? "Übersetze …" : "Übersetzen"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        {status === "thinking" && !feedback && (
          <div className="flex justify-start">
            <div className="rounded-card bg-surface px-4 py-3 text-ink-500 shadow-soft">…</div>
          </div>
        )}

        {error && (
          <Card className={error.kind === "no_api_key" ? "border-2 border-info-500/40" : "border-2 border-error-500/40"}>
            {error.kind === "no_api_key" ? (
              <div className="flex items-start gap-3">
                <KeyRound aria-hidden className="h-6 w-6 shrink-0 text-info-700" />
                <p className="text-body text-ink-500">
                  Kein API-Key: <code className="rounded bg-ink-100 px-1">GEMINI_API_KEY</code> (kostenlos,
                  aistudio.google.com), <code className="rounded bg-ink-100 px-1">GROQ_API_KEY</code> oder{" "}
                  <code className="rounded bg-ink-100 px-1">ANTHROPIC_API_KEY</code> in die .env, dann Server neu starten.
                </p>
              </div>
            ) : (
              <p className="text-body text-error-700">{error.message}</p>
            )}
          </Card>
        )}

        {feedback && (
          <Card className="border-2 border-correct-500/40">
            <p className="flex items-center gap-2 text-caption font-bold text-correct-700">
              <GraduationCap aria-hidden className="h-4 w-4" /> Dein Feedback
            </p>
            <p className="mt-2 whitespace-pre-line text-body text-ink-700">{feedback}</p>
            <div className="mt-3 flex items-center gap-3">
              {earnedXp && <XPBadge xp={earnedXp} label="XP verdient" />}
              <Link href="/chat" className="font-semibold text-brand-600 hover:underline">
                Zurück zur Übersicht
              </Link>
            </div>
          </Card>
        )}
        {hint && !feedback && (
          <Card className="border-2 border-gold/40 bg-gold/5">
            <div className="flex items-start gap-2">
              <Lightbulb aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div className="flex-1">
                <p className="text-caption font-bold text-ink-500">So könntest du antworten</p>
                {(() => {
                  const p = parseAssistantReply(hint);
                  return (
                    <>
                      <p className="mt-1 flex items-center gap-2 text-body font-medium">
                        {p.tr}
                        <button
                          type="button"
                          onClick={() => speak(speakableText(p.tr), "tr")}
                          aria-label="Vorlesen"
                          className="text-ink-500 hover:text-ink-700"
                        >
                          <Volume2 aria-hidden className="h-4 w-4" />
                        </button>
                      </p>
                      {p.de && <p className="text-caption text-ink-500">{p.de}</p>}
                    </>
                  );
                })()}
              </div>
              <button type="button" onClick={() => setHint(null)} aria-label="Tipp schließen" className="text-caption text-ink-500 hover:text-ink-700">
                ✕
              </button>
            </div>
          </Card>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Call-Steuerung */}
      {!feedback && (
        <div className="sticky bottom-20 flex flex-col items-center gap-3 rounded-card bg-surface p-4 shadow-lifted sm:bottom-4">
          <button
            type="button"
            onClick={() => status === "idle" && listenLoop()}
            disabled={status !== "idle"}
            aria-label="Sprechen"
            className={`flex h-20 w-20 items-center justify-center rounded-full shadow-lifted transition-transform active:scale-95 ${
              status === "listening"
                ? "animate-pulse bg-error-500 text-white"
                : status === "speaking"
                  ? "bg-info-500 text-white"
                  : status === "thinking"
                    ? "bg-ink-100 text-ink-500"
                    : "bg-brand-500 text-brand-ink hover:scale-105"
            }`}
          >
            {status === "speaking" ? <Volume2 aria-hidden className="h-9 w-9" /> : <Mic aria-hidden className="h-9 w-9" />}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex overflow-hidden rounded-chip border-2 border-ink-100" role="group" aria-label="Ich spreche gerade">
              <button
                type="button"
                onClick={() => switchLang("tr")}
                className={`min-h-[36px] px-3 text-caption font-bold ${speakLang === "tr" ? "bg-brand-500 text-brand-ink" : "bg-surface text-ink-500"}`}
              >
                Ich spreche Türkisch
              </button>
              <button
                type="button"
                onClick={() => switchLang("de")}
                className={`min-h-[36px] px-3 text-caption font-bold ${speakLang === "de" ? "bg-brand-500 text-brand-ink" : "bg-surface text-ink-500"}`}
              >
                Deutsch
              </button>
            </div>
            <label className="flex items-center gap-2 text-caption text-ink-500">
              <input
                type="checkbox"
                checked={handsFree}
                onChange={(e) => setHandsFree(e.target.checked)}
                className="h-4 w-4 accent-[#F59E0B]"
              />
              Freisprechen
            </label>
            <button
              type="button"
              onClick={getHint}
              disabled={hintLoading || status === "listening" || status === "thinking"}
              className="inline-flex min-h-[36px] items-center gap-1 rounded-chip border-2 border-gold/50 px-3 text-caption font-bold text-gold disabled:opacity-50"
            >
              <Lightbulb aria-hidden className="h-4 w-4" /> {hintLoading ? "…" : "Tipp"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
