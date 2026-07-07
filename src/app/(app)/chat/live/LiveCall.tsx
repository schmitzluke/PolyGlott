"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, GraduationCap, KeyRound, Lightbulb, Mic, PhoneCall, PhoneOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { XPBadge } from "@/components/ui/XPBadge";
import { abortRecognition, recognizeOnce, speak, sttAvailable, ttsAvailable, warmupTts } from "@/lib/speech";
import { parseAssistantReply, speakableText } from "@/lib/chatFormat";

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
    const tr = speakableText(parsed.tr);
    if (tr && !endedRef.current) await speak(tr, "tr");
    if (parsed.de && !endedRef.current) await speak(speakableText(parsed.de), "de");
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
            if (m.role === "user") {
              return (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] rounded-card bg-brand-50 px-4 py-3 motion-safe:animate-pop-in">
                    <p className="text-body">{m.content}</p>
                  </div>
                </div>
              );
            }
            const parsed = parseAssistantReply(m.content);
            return (
              <div key={i} className="flex justify-start">
                <div className="max-w-[85%] rounded-card bg-surface px-4 py-3 shadow-soft motion-safe:animate-pop-in">
                  <p className="text-body font-medium">{parsed.tr}</p>
                  {parsed.de && (
                    <div className="mt-2 flex items-start gap-1.5 border-t border-ink-100 pt-2">
                      <Lightbulb aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-info-700" />
                      <p className="text-caption text-ink-500">{parsed.de}</p>
                    </div>
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
          </div>
        </div>
      )}
    </main>
  );
}
