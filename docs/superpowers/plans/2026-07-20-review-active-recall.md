# Review Active Recall Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "Antwort zeigen" reveal-button in `ReviewSessionClient.tsx` with active-recall input (type or speak the answer, scored, rating suggested) — same pattern the vocab Trainer already uses.

**Architecture:** Move the trainer's local `suggestRating` helper into `src/lib/fsrs.ts` (next to the existing `RATING_CONFIG`) so both `TrainerPlayer.tsx` and `ReviewSessionClient.tsx` import one implementation. Then rework `ReviewSessionClient.tsx`'s card face: input+mic before answer is known, existing reveal panel (now showing score too) after.

**Tech Stack:** Next.js 14 client component, existing `src/lib/speech.ts` (STT/scoring), existing `src/lib/fsrs.ts` (Rating enum), no new dependencies.

## Global Constraints

- Scope is global: `ReviewSessionClient.tsx` is shared by `/review`, island practice, and story practice — one change point, no per-route branching.
- No FSRS logic, API routes, or grading persistence change.
- No opt-in/opt-out toggle between reveal and recall modes.
- Reuse `normalize`, `recognizeOnce`, `scorePronunciation`, `sttAvailable` from `src/lib/speech.ts` as-is.
- No dedicated unit tests exist for these two client components today (UI-heavy); verification is manual in-browser per Task 3.

---

### Task 1: Move `suggestRating` into `src/lib/fsrs.ts`

**Files:**
- Modify: `src/lib/fsrs.ts` (add function near `RATING_CONFIG`, end of file)
- Modify: `src/app/trainer/[pack]/TrainerPlayer.tsx:14,24-29` (import instead of local def)

**Interfaces:**
- Produces: `suggestRating(score: number): Grade` exported from `src/lib/fsrs.ts`. `Grade` and `Rating` are already exported from that module (`fsrs.ts:21-22`).

- [ ] **Step 1: Add `suggestRating` to `src/lib/fsrs.ts`**

Append after the `RATING_CONFIG` block (after line 148):

```ts
/**
 * Score-Schwellen für die automatische Bewertungsvorschlag – Nutzer kann übersteuern.
 */
export function suggestRating(score: number): Grade {
  if (score >= 90) return Rating.Easy;
  if (score >= 70) return Rating.Good;
  if (score >= 40) return Rating.Hard;
  return Rating.Again;
}
```

- [ ] **Step 2: Remove the local copy from `TrainerPlayer.tsx` and import it**

In `src/app/trainer/[pack]/TrainerPlayer.tsx`, delete lines 23-29 (the `suggestRating` function and its comment):

```ts
// Score-Schwellen für die automatische Bewertungsvorschlag – Nutzer kann übersteuern.
function suggestRating(score: number): number {
  if (score >= 90) return Rating.Easy;
  if (score >= 70) return Rating.Good;
  if (score >= 40) return Rating.Hard;
  return Rating.Again;
}
```

Change the import on line 13 from:

```ts
import { Rating } from "@/lib/fsrs";
```

to:

```ts
import { Rating, suggestRating } from "@/lib/fsrs";
```

- [ ] **Step 3: Type-check**

Run: `npm run build`
Expected: build succeeds, no TS errors about `suggestRating` or `Rating` in `TrainerPlayer.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/fsrs.ts src/app/trainer/\[pack\]/TrainerPlayer.tsx
git commit -m "refactor: move suggestRating helper into src/lib/fsrs.ts"
```

---

### Task 2: Active-recall input in `ReviewSessionClient.tsx`

**Files:**
- Modify: `src/components/ReviewSessionClient.tsx`

**Interfaces:**
- Consumes: `suggestRating(score: number): Grade` and `Rating` from `@/lib/fsrs` (Task 1). `normalize`, `recognizeOnce`, `scorePronunciation`, `sttAvailable` from `@/lib/speech` (existing signatures, see `src/app/trainer/[pack]/TrainerPlayer.tsx:14` for reference: `scorePronunciation(target: string, answer: string): { score: number; ... }`, `recognizeOnce(lang: "tr"): Promise<string | null>`, `sttAvailable(): boolean`, `normalize(text: string): string`).
- Produces: no new exports — this is a leaf client component consumed by `/review/page.tsx`, `/islands/[theme]/[slug]/practice`, `/islands/[theme]/[slug]/stories/[storyId]/practice` (unchanged prop signature: `{ apiUrl, title, emptyState }`).

- [ ] **Step 1: Add imports and new state**

In `src/components/ReviewSessionClient.tsx`, change the imports at the top (after line 9, the `AudioButton` import) to add:

```ts
import { Mic } from "lucide-react";
import { normalize, recognizeOnce, scorePronunciation, sttAvailable } from "@/lib/speech";
import { Rating, suggestRating } from "@/lib/fsrs";
```

Add new state alongside the existing `useState` calls (after line 68, `seenIds`):

```ts
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
```

- [ ] **Step 2: Add `checkAnswer` and `startVoiceInput` functions**

Add these functions after `loadRound` (after line 84, before the `useEffect` on line 86):

```ts
  function checkAnswer(text: string) {
    if (!text.trim() || !current) return;
    const result = scorePronunciation(current.target, text);
    setScore(result.score);
    setRevealed(true);
  }

  async function startVoiceInput() {
    if (!sttAvailable()) return;
    setIsRecording(true);
    const transcript = await recognizeOnce("tr");
    setIsRecording(false);
    if (transcript) {
      setAnswer(transcript);
      checkAnswer(transcript);
    }
  }
```

Note: `checkAnswer` and `startVoiceInput` reference `current`, which is defined later in the component (line 95, `const current = queue[0]`) — since these are function declarations (hoisted) called only from JSX after `current` exists, this is safe, but `current` must be in scope. Move these two functions to directly after the `const current = queue[0];` line (line 95) instead of after `loadRound`, so `current` is a valid closure reference at definition time and reads clearly. Do NOT place them before line 95.

- [ ] **Step 3: Reset `answer`/`score` on card change**

In the `grade` function (currently lines 160-186), the first line is `const item = current;` followed by `setRevealed(false);`. Add resets right after:

```ts
  async function grade(rating: number) {
    const item = current;
    setRevealed(false);
    setAnswer("");
    setScore(null);
    setSeenIds((ids) => [...ids, item.id]);
```

(only the two new lines are added; rest of `grade` is unchanged)

- [ ] **Step 4: Replace the reveal-button card face with input + reveal-with-score**

Replace this block (current lines 202-219):

```tsx
        <p className="text-caption font-bold text-ink-500">Was heißt …</p>
        <p className="text-display">{current.source}</p>
        {revealed ? (
          <div className="flex flex-col items-center gap-2 motion-safe:animate-pop-in">
            <div className="flex items-center gap-2">
              <p className="text-h1 text-brand-600">{current.target}</p>
              <AudioButton text={current.target} lang="tr" autoPlay />
            </div>
            {current.exampleTarget && (
              <p className="text-caption text-ink-500">
                {current.exampleTarget}
                {current.exampleSource && <> – {current.exampleSource}</>}
              </p>
            )}
          </div>
        ) : (
          <Button onClick={() => setRevealed(true)}>Antwort zeigen</Button>
        )}
```

with:

```tsx
        <p className="text-caption font-bold text-ink-500">Was heißt …</p>
        <p className="text-display">{current.source}</p>
        {revealed ? (
          <div className="flex flex-col items-center gap-2 motion-safe:animate-pop-in">
            <div className="flex items-center gap-2">
              <p className="text-h1 text-brand-600">{current.target}</p>
              <AudioButton text={current.target} lang="tr" autoPlay />
            </div>
            {current.exampleTarget && (
              <p className="text-caption text-ink-500">
                {current.exampleTarget}
                {current.exampleSource && <> – {current.exampleSource}</>}
              </p>
            )}
            {score !== null && (
              <p className="text-caption text-ink-500">
                {normalize(answer) === normalize(current.target)
                  ? "Richtig"
                  : `Deine Antwort: "${answer}"`}{" "}
                · Treffer: {score}%
              </p>
            )}
          </div>
        ) : (
          <form
            className="flex w-full max-w-xs flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              checkAnswer(answer);
            }}
          >
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Türkische Übersetzung eintippen …"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="min-h-[48px] w-full rounded-chip border-2 border-ink-100 px-4 text-center focus:border-brand-500"
            />
            <div className="flex gap-2">
              <Button type="submit" full disabled={!answer.trim()}>
                Prüfen
              </Button>
              {sttAvailable() && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={startVoiceInput}
                  disabled={isRecording}
                  aria-label="Antwort sprechen"
                >
                  <Mic aria-hidden className={`h-5 w-5 ${isRecording ? "animate-pulse text-error-500" : ""}`} />
                </Button>
              )}
            </div>
          </form>
        )}
```

- [ ] **Step 5: Mark the suggested rating button**

Replace the grade-buttons block (current lines 222-236):

```tsx
      {revealed && (
        <div className="grid grid-cols-4 gap-2" role="group" aria-label="Wie gut wusstest du es?">
          {GRADES.map((g) => (
            <button
              key={g.rating}
              type="button"
              onClick={() => grade(g.rating)}
              className={`flex min-h-[60px] flex-col items-center justify-center rounded-chip border-2 font-semibold transition-transform duration-150 ease-out-strong active:scale-[0.96] [@media(hover:hover)]:hover:-translate-y-0.5 ${g.style}`}
            >
              {g.label}
              <span className="text-[10px] font-normal opacity-70">{current.preview[g.key as keyof typeof current.preview]}</span>
            </button>
          ))}
        </div>
      )}
```

with:

```tsx
      {revealed && (() => {
        const suggested = score !== null ? suggestRating(score) : null;
        return (
          <div className="grid grid-cols-4 gap-2" role="group" aria-label="Wie gut wusstest du es?">
            {GRADES.map((g) => (
              <button
                key={g.rating}
                type="button"
                onClick={() => grade(g.rating)}
                className={`flex min-h-[60px] flex-col items-center justify-center rounded-chip border-2 font-semibold transition-transform duration-150 ease-out-strong active:scale-[0.96] [@media(hover:hover)]:hover:-translate-y-0.5 ${g.style} ${
                  suggested === g.rating ? "ring-2 ring-offset-1 ring-current" : ""
                }`}
              >
                {g.label}
                <span className="text-[10px] font-normal opacity-70">{current.preview[g.key as keyof typeof current.preview]}</span>
              </button>
            ))}
          </div>
        );
      })()}
```

`Rating` import from Task 1 is used implicitly via `suggested === g.rating` comparing `Grade` values (`GRADES[].rating` is already `1 | 2 | 3 | 4`, matching `Rating` enum values) — no separate cast needed.

- [ ] **Step 6: Type-check and build**

Run: `npm run build`
Expected: build succeeds, no TS errors in `ReviewSessionClient.tsx`.

- [ ] **Step 7: Commit**

```bash
git add src/components/ReviewSessionClient.tsx
git commit -m "feat: active recall input for review flashcards"
```

---

### Task 3: Manual verification across all three consumers

**Files:** none (verification only)

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: server starts on `http://localhost:3000`.

- [ ] **Step 2: Verify `/review`**

Log in (demo user `demo@polyglott.app` / `demo1234` if no other session), navigate to `/review`. Confirm:
- Card shows German source + text input + "Prüfen" button (+ mic button if browser supports STT).
- Typing an answer and submitting reveals target + score % + one grade button visually marked (ring highlight).
- Grading and moving to the next card resets the input to empty and hides the score.

- [ ] **Step 3: Verify an island practice session**

Navigate to `/islands`, open any theme → any island → "Sätze üben". Confirm the same input/score/reveal behavior as Step 2.

- [ ] **Step 4: Verify a story practice session**

From the same island detail page, open a story (if any story has sentences) → practice. Confirm same behavior. If no story has sentences yet (per `CLAUDE.md`, stories are "Struktur only, noch ohne Content"), skip this check and note it.

- [ ] **Step 5: Verify trainer still works (regression check for Task 1)**

Navigate to `/trainer`, open any pack, complete one word. Confirm scoring/rating-suggestion behavior is unchanged from before Task 1.

- [ ] **Step 6: Run existing test suite**

Run: `npm test`
Expected: all existing tests pass (no test touches these two components directly, but this catches accidental breakage elsewhere, e.g. if `fsrs.ts` exports changed unexpectedly).
