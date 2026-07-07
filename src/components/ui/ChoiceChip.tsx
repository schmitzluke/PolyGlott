"use client";

type ChipState = "idle" | "selected" | "correct" | "wrong" | "disabled";

const styles: Record<ChipState, string> = {
  idle: "bg-surface border-ink-100 text-ink-900 hover:border-brand-300",
  selected: "bg-brand-50 border-brand-500 text-brand-700",
  correct: "bg-correct-50 border-correct-500 text-correct-700 animate-pop-in",
  wrong: "bg-error-50 border-error-500 text-error-700 animate-shake",
  disabled: "bg-ink-100 border-ink-100 text-ink-300",
};

/** Auswahl-Chip für Multiple Choice, Lückentext & Satzbau. */
export function ChoiceChip({
  children,
  state = "idle",
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  state?: ChipState;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || state === "disabled"}
      className={`min-h-[44px] rounded-chip border-2 px-4 py-2 text-left font-medium transition-[transform,background-color,border-color,color] duration-150 ease-out-strong enabled:active:scale-[0.98] ${styles[state]} ${className}`}
    >
      {children}
    </button>
  );
}
