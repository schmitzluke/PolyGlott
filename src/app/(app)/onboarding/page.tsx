"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChoiceChip } from "@/components/ui/ChoiceChip";
import { ProgressBar } from "@/components/ui/ProgressBar";

const LANGUAGES = [
  { code: "tr", label: "🇹🇷 Türkisch", available: true },
  { code: "es", label: "🇪🇸 Spanisch", available: false },
  { code: "fr", label: "🇫🇷 Französisch", available: false },
];
const LEVELS = [
  { code: "A1", label: "A1 – Ich fange ganz neu an" },
  { code: "A2", label: "A2 – Ich kenne ein paar Grundlagen" },
  { code: "B1", label: "B1 – Ich verstehe einfache Gespräche" },
];
const GOALS = [
  { xp: 10, label: "Entspannt – 10 XP/Tag (~5 Min.)" },
  { xp: 30, label: "Regelmäßig – 30 XP/Tag (~15 Min.)" },
  { xp: 50, label: "Ehrgeizig – 50 XP/Tag (~25 Min.)" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [targetLanguage, setTargetLanguage] = useState("tr");
  const [selfLevel, setSelfLevel] = useState("A1");
  const [dailyGoalXp, setDailyGoalXp] = useState(30);
  const [saving, setSaving] = useState(false);

  async function finish() {
    setSaving(true);
    await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetLanguage, selfLevel, dailyGoalXp }),
    });
    router.push("/dashboard");
    router.refresh();
  }

  const steps = [
    {
      title: "Welche Sprache möchtest du lernen?",
      body: (
        <div className="flex flex-col gap-3">
          {LANGUAGES.map((l) => (
            <ChoiceChip
              key={l.code}
              state={!l.available ? "disabled" : targetLanguage === l.code ? "selected" : "idle"}
              onClick={() => l.available && setTargetLanguage(l.code)}
            >
              {l.label}
              {!l.available && <span className="ml-2 text-caption text-ink-500">(bald verfügbar)</span>}
            </ChoiceChip>
          ))}
        </div>
      ),
    },
    {
      title: "Wie schätzt du dein Niveau ein?",
      body: (
        <div className="flex flex-col gap-3">
          {LEVELS.map((l) => (
            <ChoiceChip
              key={l.code}
              state={selfLevel === l.code ? "selected" : "idle"}
              onClick={() => setSelfLevel(l.code)}
            >
              {l.label}
            </ChoiceChip>
          ))}
        </div>
      ),
    },
    {
      title: "Wie viel möchtest du täglich lernen?",
      body: (
        <div className="flex flex-col gap-3">
          {GOALS.map((g) => (
            <ChoiceChip
              key={g.xp}
              state={dailyGoalXp === g.xp ? "selected" : "idle"}
              onClick={() => setDailyGoalXp(g.xp)}
            >
              {g.label}
            </ChoiceChip>
          ))}
          <p className="text-caption text-ink-500">Das Tagesziel kannst du jederzeit in den Einstellungen ändern.</p>
        </div>
      ),
    },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center gap-6">
      <ProgressBar value={step + 1} max={steps.length} label="Onboarding-Fortschritt" />
      <Card className="motion-safe:animate-pop-in" key={step}>
        <h1 className="text-h2">{current.title}</h1>
        <div className="mt-4">{current.body}</div>
      </Card>
      <div className="flex gap-3">
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            Zurück
          </Button>
        )}
        <Button
          full
          disabled={saving}
          onClick={() => (isLast ? finish() : setStep(step + 1))}
        >
          {isLast ? (saving ? "Einen Moment …" : "Los geht’s! 🎉") : "Weiter"}
        </Button>
      </div>
    </main>
  );
}
