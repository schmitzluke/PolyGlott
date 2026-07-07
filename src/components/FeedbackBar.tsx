"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Feedback-Leiste am unteren Rand (Übungs-Screen-Muster):
 * grün = richtig, rot = falsch, jeweils mit kurzer Erklärung + „Weiter“.
 */
export function FeedbackBar({
  correct,
  message,
  onNext,
  isLast,
}: {
  correct: boolean;
  message: string;
  onNext: () => void;
  isLast: boolean;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-x-0 bottom-0 z-20 motion-safe:animate-slide-up border-t-4 ${
        correct ? "border-correct-500 bg-correct-50" : "border-error-500 bg-error-50"
      }`}
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={`flex items-center gap-2 text-h3 ${correct ? "text-correct-700" : "text-error-700"}`}>
            {correct ? (
              <CheckCircle2 aria-hidden className="h-5 w-5 shrink-0" />
            ) : (
              <XCircle aria-hidden className="h-5 w-5 shrink-0" />
            )}
            {correct ? "Richtig!" : "Nicht ganz."}
          </p>
          <p className="mt-1 text-body text-ink-700">{message}</p>
        </div>
        <Button
          variant={correct ? "correct" : "danger"}
          onClick={onNext}
          className="shrink-0"
          autoFocus
        >
          {isLast ? "Zur Zusammenfassung" : "Weiter"}
        </Button>
      </div>
    </div>
  );
}
