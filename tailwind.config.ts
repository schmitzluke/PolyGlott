import type { Config } from "tailwindcss";

/**
 * Design-Token-System (Single Source of Truth).
 * Farben liegen als CSS-Variablen (R G B-Kanäle) in globals.css und existieren
 * je Theme doppelt (`:root` = hell, `.dark` = dunkel). Tailwind referenziert sie
 * über rgb(var(--x) / <alpha-value>), damit Alpha-Modifier (bg-info-500/30) und
 * der Light/Dark-Umschalter ohne className-Änderungen funktionieren.
 * - ink-900…50: Text- und Flächenskala (900 = Haupttext, 50 = Seitenhintergrund)
 * - surface: Karten/Eingabefelder, eine Stufe über dem Seitenhintergrund
 * - brand: Amber-Akzent; brand-600 = AA-Textfarbe, brand-ink = Text AUF Amber
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: token("brand-50"),
          100: token("brand-100"),
          200: token("brand-200"),
          300: token("brand-300"),
          400: token("brand-400"),
          500: token("brand-500"),
          600: token("brand-600"),
          700: token("brand-700"),
          ink: token("brand-ink"),
        },
        ink: {
          900: token("ink-900"),
          700: token("ink-700"),
          500: token("ink-500"),
          300: token("ink-300"),
          100: token("ink-100"),
          50: token("ink-50"),
        },
        surface: {
          DEFAULT: token("surface"),
          raised: token("surface-raised"),
        },
        correct: {
          50: token("correct-50"),
          500: token("correct-500"),
          700: token("correct-700"),
        },
        error: {
          50: token("error-50"),
          500: token("error-500"),
          700: token("error-700"),
        },
        info: {
          50: token("info-50"),
          500: token("info-500"),
          700: token("info-700"),
        },
        gold: token("gold"),
      },
      borderRadius: {
        card: "1.25rem",
        button: "1rem",
        chip: "0.875rem",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        lifted: "var(--shadow-lifted)",
      },
      // Fixe rem-Skala, Verhältnis ~1.125–1.2 (Product-Register: kein fluid clamp(), dichter als Brand)
      fontSize: {
        display: ["2.25rem", { lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.025em" }],
        h1: ["1.75rem", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.02em" }],
        h2: ["1.5rem", { lineHeight: "1.3", fontWeight: "700", letterSpacing: "-0.015em" }],
        h3: ["1.25rem", { lineHeight: "1.35", fontWeight: "600", letterSpacing: "-0.01em" }],
        h4: ["1.125rem", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "-0.005em" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.55" }],
        caption: ["0.8125rem", { lineHeight: "1.4" }],
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      // Starke, absichtsvolle Kurven (Standard-CSS-Easings sind zu schwach – Emil-Prinzip)
      transitionTimingFunction: {
        "out-strong": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-strong": "cubic-bezier(0.77, 0, 0.175, 1)",
        drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      keyframes: {
        "pop-in": {
          "0%": { transform: "scale(0.92)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
        "flame-flicker": {
          "0%, 100%": { transform: "scale(1) rotate(-2deg)" },
          "50%": { transform: "scale(1.08) rotate(2deg)" },
        },
      },
      animation: {
        // Entrances: starke ease-out-Kurve, unter 250ms → wirkt responsiv (Emil)
        "pop-in": "pop-in 0.22s cubic-bezier(0.23, 1, 0.32, 1)",
        "slide-up": "slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        shake: "shake 0.3s ease-in-out",
        "flame-flicker": "flame-flicker 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
