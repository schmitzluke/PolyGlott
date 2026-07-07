"use client";

import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "correct";

const styles: Record<Variant, string> = {
  primary: "bg-brand-500 text-brand-ink hover:bg-brand-400 shadow-soft",
  secondary: "bg-surface text-ink-900 border-2 border-ink-100 hover:border-brand-500",
  ghost: "bg-transparent text-ink-500 hover:bg-ink-100 hover:text-ink-700",
  danger: "bg-error-500 text-white hover:bg-error-700",
  correct: "bg-correct-500 text-white hover:bg-correct-700",
};

// Nur die tatsächlich animierten Eigenschaften (kein transition-all), starke
// ease-out-Kurve, Press-Feedback scale(0.97) – bestätigt den Druck sofort (Emil).
const base =
  "min-h-[44px] rounded-button px-6 py-2.5 font-semibold transition-[transform,background-color,border-color,color] duration-150 ease-out-strong active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  full?: boolean;
}

/** Primärer Baustein für alle Aktionen. Min. 44px Touch-Target (A11y). */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", full = false, className = "", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${base} ${styles[variant]} ${full ? "w-full" : ""} ${className}`}
      {...props}
    />
  );
});
