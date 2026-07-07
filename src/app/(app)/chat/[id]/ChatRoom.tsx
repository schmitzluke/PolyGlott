"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flag, KeyRound, Lightbulb, Loader2, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AudioButton } from "@/components/ui/AudioButton";
import { XPBadge } from "@/components/ui/XPBadge";
import { abortRecognition, recognizeOnce, sttAvailable } from "@/lib/speech";
import { parseAssistantReply, speakableText } from "@/lib/chatFormat";

interface ScenarioInfo {
  id: string;
  title: string;
  level: string;
  description: string;
  opener: string;
  openerTranslation: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatRoom({ scenario }: { scenario: ScenarioInfo }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: scenario.opener },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [micLang, setMicLang] = useState<"tr" | "de">("tr");
  const [error, setError] = useState<{ kind: "no_api_key" | "other"; message: string } | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [earnedXp, setEarnedXp] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [micAvailable, setMicAvailable] = useState(false);

  useEffect(() => setMicAvailable(sttAvailable()), []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, feedback]);

  const userTurns = messages.filter((m) => m.role === "user").length;

  async function callApi(nextMessages: Message[], mode?: "feedback"): Promise<string | null> {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenarioId: scenario.id, messages: nextMessages, mode }),
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

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading || feedback) return;
    setError(null);
    setInput("");
    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setLoading(true);
    const reply = await callApi(nextMessages);
    if (reply) setMessages([...nextMessages, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  async function listen() {
    if (listening) return;
    setListening(true);
    try {
      const transcript = await recognizeOnce(micLang);
      if (transcript) setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    } catch {
      setError({ kind: "other", message: "Spracherkennung hat nicht geklappt – tipp deine Antwort einfach." });
    } finally {
      setListening(false);
    }
  }

  async function finish() {
    if (loading || feedback) return;
    setLoading(true);
    setError(null);
    const fb = await callApi(
      [...messages, { role: "user", content: "(Das Gespräch ist zu Ende. Bitte gib mir jetzt dein Feedback.)" }],
      "feedback"
    );
    if (fb) {
      setFeedback(fb);
      const res = await fetch("/api/chat/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userTurns }),
      });
      const data = await res.json().catch(() => null);
      if (data?.xp) setEarnedXp(data.xp);
    }
    setLoading(false);
  }

  return (
    <main className="mx-auto flex min-h-[80dvh] max-w-2xl flex-col gap-4">
      <header className="flex items-center gap-3">
        <Link
          href="/chat"
          aria-label="Zurück zur Szenario-Auswahl"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
        >
          <ArrowLeft aria-hidden className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-h3">{scenario.title}</h1>
          <p className="text-caption text-ink-500">Niveau {scenario.level} · Auf Deutsch fragen ist erlaubt!</p>
        </div>
        {!feedback && userTurns >= 3 && (
          <Button variant="secondary" onClick={finish} disabled={loading}>
            <span className="flex items-center gap-2">
              <Flag aria-hidden className="h-4 w-4" /> Beenden
            </span>
          </Button>
        )}
      </header>

      <div className="flex flex-1 flex-col gap-3">
        {messages.map((m, i) => {
          if (m.role === "user") {
            return (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-card bg-brand-50 px-4 py-3 text-ink-900 motion-safe:animate-pop-in">
                  <p className="text-body">{m.content}</p>
                </div>
              </div>
            );
          }
          const parsed = parseAssistantReply(m.content);
          const tts = speakableText(parsed.tr);
          return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] rounded-card bg-surface px-4 py-3 shadow-soft motion-safe:animate-pop-in">
                <div className="flex items-start gap-2">
                  <p className="text-body font-medium">{parsed.tr}</p>
                  {tts && <AudioButton text={tts} lang="tr" />}
                </div>
                {i === 0 && (
                  <p className="mt-1 text-caption text-ink-500">{scenario.openerTranslation}</p>
                )}
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

        {loading && !feedback && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-card bg-surface px-4 py-3 text-ink-500 shadow-soft">
              <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> schreibt …
            </div>
          </div>
        )}

        {error && (
          <Card className={error.kind === "no_api_key" ? "border-2 border-info-500/40" : "border-2 border-error-500/40"}>
            {error.kind === "no_api_key" ? (
              <div className="flex items-start gap-3">
                <KeyRound aria-hidden className="h-6 w-6 shrink-0 text-info-700" />
                <div>
                  <p className="font-semibold">API-Key fehlt</p>
                  <p className="mt-1 text-body text-ink-500">
                    Der Konversationsmodus braucht einen KI-Anbieter. Kostenlos: Key auf
                    console.groq.com erstellen und als{" "}
                    <code className="rounded bg-ink-100 px-1">GROQ_API_KEY</code> in die{" "}
                    <code className="rounded bg-ink-100 px-1">.env</code> eintragen. Beste Qualität:{" "}
                    <code className="rounded bg-ink-100 px-1">ANTHROPIC_API_KEY</code> (Claude).
                    Danach Server neu starten – alles andere in der App funktioniert auch ohne.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-body text-error-700">{error.message}</p>
            )}
          </Card>
        )}

        {feedback && (
          <Card className="border-2 border-correct-500/40">
            <p className="text-caption font-bold text-correct-700">Dein Feedback</p>
            <p className="mt-2 whitespace-pre-line text-body text-ink-700">{feedback}</p>
            <div className="mt-3 flex items-center gap-3">
              {earnedXp && <XPBadge xp={earnedXp} label="XP verdient" />}
              <Link href="/chat" className="font-semibold text-brand-600 hover:underline">
                Neues Szenario wählen
              </Link>
            </div>
          </Card>
        )}
        <div ref={bottomRef} />
      </div>

      {!feedback && (
        <form
          className="sticky bottom-20 flex items-end gap-2 sm:bottom-4"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Auf Türkisch antworten – oder auf Deutsch fragen …"
            aria-label="Deine Nachricht"
            className="max-h-32 min-h-[52px] flex-1 resize-y rounded-chip border-2 border-ink-100 px-4 py-3 text-body focus:border-brand-500"
          />
          {micAvailable && (
            <div className="flex shrink-0 flex-col items-center gap-1">
              <button
                type="button"
                onClick={listen}
                aria-label={`Einsprechen (${micLang === "tr" ? "Türkisch" : "Deutsch"})`}
                className={`flex h-[52px] w-[52px] items-center justify-center rounded-chip ${
                  listening ? "animate-pulse bg-error-500 text-white" : "bg-ink-100 text-ink-700 hover:bg-ink-300/50"
                }`}
              >
                <Mic aria-hidden className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (listening) abortRecognition(); // laufende Erkennung nicht in alter Sprache weiterlaufen lassen
                  setMicLang(micLang === "tr" ? "de" : "tr");
                }}
                aria-label={`Mikrofon-Sprache umschalten, aktuell ${micLang === "tr" ? "Türkisch" : "Deutsch"}`}
                title="Mikrofon-Sprache umschalten"
                className="rounded-chip bg-info-50 px-2 py-0.5 text-[11px] font-bold text-info-700"
              >
                {micLang === "tr" ? "TR" : "DE"}
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Senden"
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-chip bg-brand-500 text-brand-ink disabled:opacity-40"
          >
            <Send aria-hidden className="h-5 w-5" />
          </button>
        </form>
      )}
    </main>
  );
}
