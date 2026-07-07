"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Light/Dark-Umschalter. Der initiale Zustand wird bereits vom Inline-Skript in
 * layout.tsx gesetzt (kein FOUC); hier synchronisieren wir nur die Anzeige und
 * schreiben die Wahl nach localStorage. Beim Wechsel überblenden Flächen/Text
 * kurz über die Klasse `theme-transition` (statt dauerhafter Transitions).
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");

    root.classList.add("theme-transition");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* Speicher nicht verfügbar – Wahl gilt nur für diese Sitzung */
    }
    setIsDark(next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 260);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted && isDark ? "Zu hellem Design wechseln" : "Zu dunklem Design wechseln"}
      aria-pressed={mounted ? isDark : undefined}
      title="Design umschalten"
      className="flex h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink-100 active:scale-[0.92]"
    >
      {/* Vor dem Mount neutral (Icon-Größe reserviert), danach zustandsabhängig */}
      {mounted &&
        (isDark ? (
          <Moon aria-hidden className="h-5 w-5" />
        ) : (
          <Sun aria-hidden className="h-5 w-5" />
        ))}
    </button>
  );
}
