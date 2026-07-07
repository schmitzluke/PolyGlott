"use client";

import { create } from "zustand";

export type LessonPhase = "intro" | "exercise" | "summary";

export interface ExerciseResult {
  correct: boolean;
}

interface LessonState {
  phase: LessonPhase;
  index: number;
  results: ExerciseResult[];
  /** Feedback zur aktuell beantworteten Übung (null = noch nicht geprüft) */
  feedback: { correct: boolean; message: string } | null;
  start: () => void;
  answer: (correct: boolean, message: string) => void;
  next: (total: number) => void;
  reset: () => void;
}

export const useLessonStore = create<LessonState>((set) => ({
  phase: "intro",
  index: 0,
  results: [],
  feedback: null,
  start: () => set({ phase: "exercise", index: 0, results: [], feedback: null }),
  answer: (correct, message) =>
    set((state) => ({
      feedback: { correct, message },
      results: [...state.results, { correct }],
    })),
  next: (total) =>
    set((state) => {
      const nextIndex = state.index + 1;
      if (nextIndex >= total) return { phase: "summary", feedback: null };
      return { index: nextIndex, feedback: null };
    }),
  reset: () => set({ phase: "intro", index: 0, results: [], feedback: null }),
}));
