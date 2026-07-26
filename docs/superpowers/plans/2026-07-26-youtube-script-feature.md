# YouTube-Skript-Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nutzer kann in `/media` einen YouTube-Link einfügen, bekommt Video + Original-Untertitel-Skript vor dem Karteikarten-Quiz zu lesen, kann Wörter anklicken für eine DeepL-Übersetzung, und diese Wörter optional in die FSRS-Review-Queue übernehmen.

**Architecture:** Erweiterung des bestehenden Media-Comprehension-Features (`Transcript`/`TranscriptSentence`, `mediaWorker.ts`, `MediaStudyPlayer.tsx`). Neue Route holt YouTube-Untertitel und speist sie in die unveränderte DeepSeek-Extraktion-Pipeline ein. Neue Skript-Lese-Ansicht (Video-Embed + klickbarer Text) läuft vor dem bestehenden Quiz. Wort-Übersetzung über eine neue DeepL-Route; "Merken" nutzt die bereits existierende `POST /api/stash`-Route unverändert (kein neuer Server-Code für Stash-Erzeugung nötig).

**Tech Stack:** Next.js 14 App Router, Prisma/SQLite, `youtube-transcript` (npm), DeepL Free API (fetch, kein SDK), bestehendes `askOpenAICompatible`/DeepSeek für Kernsätze-Extraktion.

## Global Constraints

- Nur Videos mit vorhandenem Untertitel-Track werden akzeptiert (kein Whisper-Fallback, keine Unterscheidung manuell/auto in v1).
- Kein DB-Caching von DeepL-Übersetzungen.
- Nur Einzelwort-Klick (keine Phrasen-/Mehrwort-Markierung).
- Bestehender Quiz-/`comprehended`-Flow (`MediaStudyPlayer.tsx`) bleibt unverändert.
- Alle neuen API-Routen prüfen `getCurrentUser()` und geben 401 zurück, wenn nicht eingeloggt (bestehendes Muster).
- Deutsche UI-Texte/Fehlermeldungen, konsistent zum bestehenden Code-Stil (keine Kommentare, die nur beschreiben WAS der Code tut).

---

### Task 1: Schema-Erweiterung `Transcript` (youtubeUrl/videoId)

**Files:**
- Modify: `prisma/schema.prisma` (Transcript-Model, aktuell Zeile 170–187 ca., siehe `rawText`-Feld)

**Interfaces:**
- Produces: `Transcript.youtubeUrl: string | null`, `Transcript.videoId: string | null` — von allen späteren Tasks nutzbar über `db.transcript.*`.

- [ ] **Step 1: Feld hinzufügen**

In `prisma/schema.prisma`, im `model Transcript` Block, nach der Zeile `rawText          String` einfügen:

```prisma
  youtubeUrl   String?
  videoId      String?
```

- [ ] **Step 2: Schema pushen**

Run: `npm run db:push`
Expected: `Your database is now in sync with your Prisma schema.` (keine Fehler, kein Datenverlust-Prompt für bestehende Spalten)

- [ ] **Step 3: Prisma-Client neu generieren prüfen**

Run: `npx tsc --noEmit -p .`
Expected: keine Typfehler (Prisma-Client wird durch `db:push` automatisch neu generiert)

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat(media): add youtubeUrl/videoId to Transcript schema"
```

---

### Task 2: YouTube-Video-ID-Extraktion (pure function + Tests)

**Files:**
- Create: `src/lib/youtube.ts`
- Test: `tests/youtube.test.ts`

**Interfaces:**
- Produces: `extractYoutubeVideoId(url: string): string | null` — genutzt von Task 3 (API-Route).

- [ ] **Step 1: Failing Test schreiben**

```typescript
// tests/youtube.test.ts
import { describe, expect, it } from "vitest";
import { extractYoutubeVideoId } from "@/lib/youtube";

describe("extractYoutubeVideoId", () => {
  it("extrahiert die ID aus einer watch-URL", () => {
    expect(extractYoutubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extrahiert die ID aus einer watch-URL mit Zusatzparametern", () => {
    expect(
      extractYoutubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s&list=abc")
    ).toBe("dQw4w9WgXcQ");
  });

  it("extrahiert die ID aus einer youtu.be-Kurz-URL", () => {
    expect(extractYoutubeVideoId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("extrahiert die ID aus einer youtu.be-Kurz-URL mit Query", () => {
    expect(extractYoutubeVideoId("https://youtu.be/dQw4w9WgXcQ?t=5")).toBe("dQw4w9WgXcQ");
  });

  it("gibt null für eine ungültige URL zurück", () => {
    expect(extractYoutubeVideoId("https://example.com/not-youtube")).toBeNull();
  });

  it("gibt null für leeren String zurück", () => {
    expect(extractYoutubeVideoId("")).toBeNull();
  });
});
```

- [ ] **Step 2: Test laufen lassen, muss fehlschlagen**

Run: `npx vitest run tests/youtube.test.ts`
Expected: FAIL mit `Cannot find module '@/lib/youtube'` o. Ä.

- [ ] **Step 3: Implementierung schreiben**

```typescript
// src/lib/youtube.ts

/** Extrahiert die 11-stellige Video-ID aus einer youtube.com- oder youtu.be-URL. */
export function extractYoutubeVideoId(url: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (parsed.hostname.endsWith("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    return null;
  } catch {
    return null;
  }
}
```

- [ ] **Step 4: Test laufen lassen, muss bestehen**

Run: `npx vitest run tests/youtube.test.ts`
Expected: PASS (6 Tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/youtube.ts tests/youtube.test.ts
git commit -m "feat(media): add YouTube video ID extraction util"
```

---

### Task 3: Wort-Tokenizer für klickbares Skript (pure function + Tests)

**Files:**
- Create: `src/lib/tokenize.ts`
- Test: `tests/tokenize.test.ts`

**Interfaces:**
- Produces: `tokenizeScript(text: string): { text: string; clickable: boolean }[]` — genutzt von Task 7 (Skript-Lese-Komponente). `clickable: true` = anklickbares Wort, `false` = Whitespace/Satzzeichen-Fragment (unverändert dargestellt, nicht klickbar).

- [ ] **Step 1: Failing Test schreiben**

```typescript
// tests/tokenize.test.ts
import { describe, expect, it } from "vitest";
import { tokenizeScript } from "@/lib/tokenize";

describe("tokenizeScript", () => {
  it("zerlegt einen einfachen Satz in Wörter und Zwischenräume", () => {
    const tokens = tokenizeScript("Merhaba dünya");
    expect(tokens).toEqual([
      { text: "Merhaba", clickable: true },
      { text: " ", clickable: false },
      { text: "dünya", clickable: true },
    ]);
  });

  it("trennt Satzzeichen vom Wort ab", () => {
    const tokens = tokenizeScript("Merhaba, dünya!");
    expect(tokens).toEqual([
      { text: "Merhaba", clickable: true },
      { text: ",", clickable: false },
      { text: " ", clickable: false },
      { text: "dünya", clickable: true },
      { text: "!", clickable: false },
    ]);
  });

  it("behandelt türkische Sonderzeichen als Teil des Worts", () => {
    const tokens = tokenizeScript("çok güzel");
    expect(tokens).toEqual([
      { text: "çok", clickable: true },
      { text: " ", clickable: false },
      { text: "güzel", clickable: true },
    ]);
  });

  it("gibt leeres Array für leeren String zurück", () => {
    expect(tokenizeScript("")).toEqual([]);
  });
});
```

- [ ] **Step 2: Test laufen lassen, muss fehlschlagen**

Run: `npx vitest run tests/tokenize.test.ts`
Expected: FAIL mit `Cannot find module '@/lib/tokenize'`

- [ ] **Step 3: Implementierung schreiben**

```typescript
// src/lib/tokenize.ts

/**
 * Zerlegt einen Text in Wort- und Nicht-Wort-Fragmente für ein anklickbares Skript.
 * Wort = Unicode-Buchstaben/Ziffern (deckt türkische Sonderzeichen ab), alles andere
 * (Leerzeichen, Satzzeichen) bleibt als nicht-klickbares Fragment erhalten.
 */
export function tokenizeScript(text: string): { text: string; clickable: boolean }[] {
  if (!text) return [];
  const matches = text.match(/[\p{L}\p{N}]+|[^\p{L}\p{N}]+/gu);
  if (!matches) return [];
  return matches.map((fragment) => ({
    text: fragment,
    clickable: /[\p{L}\p{N}]/u.test(fragment),
  }));
}
```

- [ ] **Step 4: Test laufen lassen, muss bestehen**

Run: `npx vitest run tests/tokenize.test.ts`
Expected: PASS (4 Tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/tokenize.ts tests/tokenize.test.ts
git commit -m "feat(media): add script tokenizer for clickable words"
```

---

### Task 4: `POST /api/media/youtube` — Untertitel importieren

**Files:**
- Create: `src/app/api/media/youtube/route.ts`
- Modify: `package.json` (Dependency `youtube-transcript`)

**Interfaces:**
- Consumes: `extractYoutubeVideoId` (Task 2), `db` (`src/lib/db.ts`), `getCurrentUser` (`src/lib/auth.ts`), `processTranscript` (`src/lib/mediaWorker.ts`, unverändert).
- Produces: `POST /api/media/youtube` — Request `{title?: string, url: string}`, Response `201 {id: string, status: "PENDING"}` oder `400 {error: string}` oder `401 {error: string}`.

- [ ] **Step 1: Dependency installieren**

Run: `npm install youtube-transcript`
Expected: `package.json` bekommt `"youtube-transcript": "^1.x.x"` unter `dependencies`.

- [ ] **Step 2: Route implementieren**

```typescript
// src/app/api/media/youtube/route.ts
import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { processTranscript } from "@/lib/mediaWorker";
import { extractYoutubeVideoId } from "@/lib/youtube";

/**
 * Nimmt einen YouTube-Link entgegen, holt den Untertitel-Track, speichert ihn als
 * PENDING Transcript und stößt die bestehende DeepSeek-Kernsätze-Extraktion an.
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const url = typeof body?.url === "string" ? body.url.trim() : "";
  if (!url) {
    return NextResponse.json({ error: "url fehlt." }, { status: 400 });
  }

  const videoId = extractYoutubeVideoId(url);
  if (!videoId) {
    return NextResponse.json({ error: "Ungültiger YouTube-Link." }, { status: 400 });
  }

  let segments: { text: string }[];
  try {
    segments = await YoutubeTranscript.fetchTranscript(videoId);
  } catch {
    return NextResponse.json(
      { error: "Kein Transkript für dieses Video verfügbar." },
      { status: 400 }
    );
  }
  if (!segments || segments.length === 0) {
    return NextResponse.json(
      { error: "Kein Transkript für dieses Video verfügbar." },
      { status: 400 }
    );
  }

  const rawText = segments.map((s) => s.text).join(" ").trim();
  if (rawText.length > 20000) {
    return NextResponse.json({ error: "Transkript zu lang (max. 20.000 Zeichen)." }, { status: 400 });
  }

  const entry = await db.transcript.create({
    data: {
      userId: user.id,
      title: title || "YouTube-Video",
      rawText,
      youtubeUrl: url,
      videoId,
    },
  });

  processTranscript(entry.id).catch((err) => console.error("[api/media/youtube] Worker-Fehler:", err));

  return NextResponse.json({ id: entry.id, status: entry.status }, { status: 201 });
}
```

- [ ] **Step 3: Manuell verifizieren (kein automatisierter Test — externer Netzwerkaufruf)**

Run: `npm run dev`, dann in einem zweiten Terminal:

```bash
curl -X POST http://localhost:3000/api/media/youtube \
  -H "Content-Type: application/json" \
  -b "next-auth.session-token=<gültiges-Cookie-aus-Browser-DevTools>" \
  -d '{"title": "Test", "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

Expected: `201 {"id": "...", "status": "PENDING"}` bei Video mit Untertiteln, oder `400` mit Fehlermeldung bei Video ohne. (Session-Cookie holt man aus dem Browser nach Login unter `/media` — Application → Cookies.)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/app/api/media/youtube/route.ts
git commit -m "feat(media): add YouTube transcript import route"
```

---

### Task 5: `MediaPageClient` — YouTube-Link-Eingabe

**Files:**
- Modify: `src/components/MediaPageClient.tsx`

**Interfaces:**
- Consumes: `POST /api/media/youtube` (Task 4, Response `{id, status}`).
- Produces: keine neuen Exporte — UI-Erweiterung derselben Komponente.

- [ ] **Step 1: State + Tab-Umschaltung für zweiten Eingabeweg hinzufügen**

In `src/components/MediaPageClient.tsx`, Import-Zeile ergänzen und State hinzufügen (nach Zeile 4 `import { CheckCircle2, ...}`):

```typescript
import { useState } from "react";
```

(bereits vorhanden — nur die neuen State-Variablen nach Zeile 28 `const [error, setError] = useState<string | null>(null);` einfügen:)

```typescript
  const [mode, setMode] = useState<"text" | "youtube">("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
```

- [ ] **Step 2: `submitYoutube`-Funktion hinzufügen**

Nach der bestehenden `submit`-Funktion (Zeile 52, vor der schließenden `}`):

```typescript
  async function submitYoutube() {
    if (!youtubeUrl.trim()) return;
    setSubmitting(true);
    setError(null);
    const res = await fetch("/api/media/youtube", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url: youtubeUrl }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Import fehlgeschlagen.");
      return;
    }
    const data = await res.json();
    setTranscripts((prev) => [
      { id: data.id, title: title || "YouTube-Video", status: "PENDING", comprehended: false, createdAt: new Date().toISOString() },
      ...prev,
    ]);
    setTitle("");
    setYoutubeUrl("");
  }
```

- [ ] **Step 3: Formular um Tab-Umschalter + YouTube-Feld erweitern**

Die bestehende `<Card>` (Zeile 56–78) ersetzen durch:

```tsx
      <Card>
        <div className="mb-3 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("youtube")}
            className={`text-body font-semibold ${mode === "youtube" ? "text-brand-600" : "text-ink-400"}`}
          >
            YouTube-Link
          </button>
          <span className="text-ink-300">·</span>
          <button
            type="button"
            onClick={() => setMode("text")}
            className={`text-body font-semibold ${mode === "text" ? "text-brand-600" : "text-ink-400"}`}
          >
            Text einfügen
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titel (z. B. Videoname)"
            className="min-h-[48px] rounded-chip border-2 border-ink-100 px-4 focus:border-brand-500"
          />
          {mode === "youtube" ? (
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=…"
              className="min-h-[48px] rounded-chip border-2 border-ink-100 px-4 focus:border-brand-500"
            />
          ) : (
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Türkisches Transkript hier einfügen …"
              rows={6}
              className="rounded-chip border-2 border-ink-100 px-4 py-3 focus:border-brand-500"
            />
          )}
          {error && <p className="text-caption text-error-700">{error}</p>}
          <Button
            full
            onClick={mode === "youtube" ? submitYoutube : submit}
            disabled={submitting || (mode === "youtube" ? !youtubeUrl.trim() : !rawText.trim())}
          >
            {submitting ? "Importiere …" : "Importieren"}
          </Button>
        </div>
      </Card>
```

- [ ] **Step 4: Dev-Server prüfen**

Run: `npm run dev`, im Browser `/media` öffnen, YouTube-Tab aktiv per Default, Feld sichtbar.
Expected: Formular zeigt YouTube-URL-Feld, Umschalten zu "Text einfügen" zeigt die alte Textarea.

- [ ] **Step 5: Commit**

```bash
git add src/components/MediaPageClient.tsx
git commit -m "feat(media): add YouTube link input to media import form"
```

---

### Task 6: `POST /api/media/translate-word` — DeepL-Wortübersetzung

**Files:**
- Create: `src/app/api/media/translate-word/route.ts`

**Interfaces:**
- Consumes: `getCurrentUser` (`src/lib/auth.ts`), env `DEEPL_API_KEY`.
- Produces: `POST /api/media/translate-word` — Request `{word: string}`, Response `200 {translation: string}`, `400 {error}`, `401 {error}`, `503 {error}` (Key fehlt).

- [ ] **Step 1: Route implementieren**

```typescript
// src/app/api/media/translate-word/route.ts
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

/** Übersetzt ein einzelnes türkisches Wort per DeepL Free API ins Deutsche. */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Übersetzung derzeit nicht verfügbar." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const word = typeof body?.word === "string" ? body.word.trim() : "";
  if (!word) {
    return NextResponse.json({ error: "word fehlt." }, { status: 400 });
  }

  const res = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: [word], source_lang: "TR", target_lang: "DE" }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Übersetzung fehlgeschlagen." }, { status: 503 });
  }

  const data = (await res.json()) as { translations?: { text?: string }[] };
  const translation = data.translations?.[0]?.text;
  if (!translation) {
    return NextResponse.json({ error: "Übersetzung fehlgeschlagen." }, { status: 503 });
  }

  return NextResponse.json({ translation });
}
```

- [ ] **Step 2: `.env.example` dokumentieren**

In `.env.example`, nach dem Block `DEEPSEEK_MODEL="deepseek-reasoner"` anfügen:

```bash

# Wort-Übersetzung im YouTube-Skript-Feature (Media Comprehension)
# Kostenloser Free-Tier-Key: https://www.deepl.com/de/pro-api (500.000 Zeichen/Monat gratis)
DEEPL_API_KEY=""
```

- [ ] **Step 3: Manuell verifizieren**

Mit gesetztem `DEEPL_API_KEY` in `.env`:

```bash
curl -X POST http://localhost:3000/api/media/translate-word \
  -H "Content-Type: application/json" \
  -b "next-auth.session-token=<Cookie>" \
  -d '{"word": "merhaba"}'
```

Expected: `200 {"translation": "hallo"}` (oder ähnliche DeepL-Ausgabe).

- [ ] **Step 4: Commit**

```bash
git add src/app/api/media/translate-word/route.ts .env.example
git commit -m "feat(media): add DeepL word translation route"
```

---

### Task 7: Skript-Lese-Ansicht mit klickbaren Wörtern

**Files:**
- Create: `src/components/MediaScriptReader.tsx`
- Modify: `src/app/(app)/media/[id]/page.tsx`

**Interfaces:**
- Consumes: `tokenizeScript` (Task 3), `POST /api/media/translate-word` (Task 6), `POST /api/stash` (bestehende Route, unverändert — Request `{germanOriginal, turkishTranslation}` → `201`).
- Produces: `MediaScriptReader` React-Komponente, Props `{videoId: string | null; rawText: string; onContinue: () => void}`.

- [ ] **Step 1: Komponente implementieren**

```tsx
// src/components/MediaScriptReader.tsx
"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { tokenizeScript } from "@/lib/tokenize";

type Popover = { word: string; translation: string | null; loading: boolean; saved: boolean; error: string | null };

export function MediaScriptReader({
  videoId,
  rawText,
  onContinue,
}: {
  videoId: string | null;
  rawText: string;
  onContinue: () => void;
}) {
  const [popover, setPopover] = useState<Popover | null>(null);
  const tokens = tokenizeScript(rawText);

  async function handleWordClick(word: string) {
    setPopover({ word, translation: null, loading: true, saved: false, error: null });
    const res = await fetch("/api/media/translate-word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setPopover({ word, translation: null, loading: false, saved: false, error: data?.error ?? "Fehler." });
      return;
    }
    const data = await res.json();
    setPopover({ word, translation: data.translation, loading: false, saved: false, error: null });
  }

  async function handleSave() {
    if (!popover?.translation) return;
    await fetch("/api/stash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ germanOriginal: popover.translation, turkishTranslation: popover.word }),
    });
    setPopover({ ...popover, saved: true });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4 pb-24">
      {videoId && (
        <div className="aspect-video w-full overflow-hidden rounded-card">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title="YouTube-Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <Card>
        <p className="leading-relaxed text-body text-ink-900">
          {tokens.map((token, i) =>
            token.clickable ? (
              <button
                key={i}
                type="button"
                onClick={() => handleWordClick(token.text)}
                className="rounded px-0.5 hover:bg-brand-50 hover:text-brand-700"
              >
                {token.text}
              </button>
            ) : (
              <span key={i}>{token.text}</span>
            )
          )}
        </p>
      </Card>

      {popover && (
        <Card className="fixed inset-x-4 bottom-20 z-10 mx-auto max-w-md">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-caption text-ink-500">{popover.word}</p>
              {popover.loading ? (
                <Loader2 aria-hidden className="mt-1 h-4 w-4 animate-spin text-brand-600" />
              ) : popover.error ? (
                <p className="text-body text-error-700">{popover.error}</p>
              ) : (
                <p className="text-body font-semibold text-ink-900">{popover.translation}</p>
              )}
            </div>
            {!popover.loading && popover.translation && (
              <Button variant="secondary" onClick={handleSave} disabled={popover.saved}>
                {popover.saved ? "Gemerkt" : "Merken"}
              </Button>
            )}
          </div>
        </Card>
      )}

      <Button full onClick={onContinue}>
        Weiter zum Quiz
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: `[id]/page.tsx` erweitern, `rawText`/`videoId` laden und weiterreichen**

`src/app/(app)/media/[id]/page.tsx` vollständig ersetzen durch:

```tsx
import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { MediaDetailClient } from "@/components/MediaDetailClient";

export const dynamic = "force-dynamic";

export default async function MediaDetailPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const transcript = await db.transcript.findFirst({
    where: { id: params.id, userId: user.id },
    include: { sentences: { orderBy: { rank: "asc" } } },
  });
  if (!transcript) notFound();

  return (
    <MediaDetailClient
      transcript={{
        id: transcript.id,
        title: transcript.title,
        status: transcript.status,
        comprehended: transcript.comprehended,
        rawText: transcript.rawText,
        videoId: transcript.videoId,
        sentences: transcript.sentences.map((s) => ({ id: s.id, turkish: s.turkish, german: s.german })),
      }}
    />
  );
}
```

- [ ] **Step 3: Dev-Server manuell verifizieren**

Run: `npm run dev`, ein YouTube-Transkript importieren (Task 4/5), nach READY-Status `/media/[id]` öffnen.
Expected: Video-Embed + Skript sichtbar, Wortklick öffnet Popover mit Übersetzung, "Merken" speichert (Netzwerk-Tab zeigt `201` von `/api/stash`), "Weiter zum Quiz" navigiert weiter (Verdrahtung folgt in Task 8).

- [ ] **Step 4: Commit**

```bash
git add src/components/MediaScriptReader.tsx "src/app/(app)/media/[id]/page.tsx"
git commit -m "feat(media): add script reader with clickable word translation"
```

---

### Task 8: `MediaDetailClient` — Phasen-Umschaltung Skript-Lesen → Quiz

**Files:**
- Create: `src/components/MediaDetailClient.tsx`
- Test: manuell (reine UI-Verdrahtung, keine neue Logik)

**Interfaces:**
- Consumes: `MediaScriptReader` (Task 7), `MediaStudyPlayer` (bestehend, unverändert, Props `{transcript: {id, title, status, comprehended, sentences}}`).
- Produces: `MediaDetailClient` Props `{transcript: {id, title, status, comprehended, rawText, videoId, sentences}}` — ersetzt den bisherigen direkten Aufruf von `MediaStudyPlayer` in `[id]/page.tsx` (bereits in Task 7 Step 2 verdrahtet).

- [ ] **Step 1: Komponente implementieren**

```tsx
// src/components/MediaDetailClient.tsx
"use client";

import { useState } from "react";
import { MediaScriptReader } from "@/components/MediaScriptReader";
import { MediaStudyPlayer } from "@/components/MediaStudyPlayer";

type Sentence = { id: string; turkish: string; german: string };
type Transcript = {
  id: string;
  title: string;
  status: string;
  comprehended: boolean;
  rawText: string;
  videoId: string | null;
  sentences: Sentence[];
};

export function MediaDetailClient({ transcript }: { transcript: Transcript }) {
  const [phase, setPhase] = useState<"reading" | "quiz">(
    transcript.videoId && transcript.status === "READY" ? "reading" : "quiz"
  );

  if (phase === "reading") {
    return (
      <MediaScriptReader
        videoId={transcript.videoId}
        rawText={transcript.rawText}
        onContinue={() => setPhase("quiz")}
      />
    );
  }

  return (
    <MediaStudyPlayer
      transcript={{
        id: transcript.id,
        title: transcript.title,
        status: transcript.status,
        comprehended: transcript.comprehended,
        sentences: transcript.sentences,
      }}
    />
  );
}
```

- [ ] **Step 2: Dev-Server End-to-End verifizieren**

Run: `npm run dev`.
1. `/media` öffnen, YouTube-Link importieren, warten bis Status "Bereit zum Lernen".
2. `/media/[id]` öffnen → Skript-Lese-Ansicht mit Video erscheint zuerst.
3. Wort anklicken → Übersetzung erscheint, "Merken" klicken → `/stash` zeigt neuen Eintrag.
4. "Weiter zum Quiz" klicken → Karteikarten-Quiz startet (bestehender Flow, unverändert).
5. Zusätzlich: einen Text-Paste-Transkript importieren (kein `videoId`) → `/media/[id]` überspringt die Lese-Ansicht und zeigt direkt das Quiz.

Expected: alle 5 Schritte funktionieren wie beschrieben, keine Konsolenfehler.

- [ ] **Step 3: Commit**

```bash
git add src/components/MediaDetailClient.tsx
git commit -m "feat(media): wire script-reading phase before quiz for YouTube transcripts"
```

---

## Self-Review Notes

- **Spec-Abdeckung:** Abschnitt 1 (Input/Datenmodell) → Task 1, 2, 4, 5. Abschnitt 2 (Video/Skript-Lesen) → Task 7, 8. Abschnitt 3 (DeepL-Wortklick) → Task 6, 7. Abschnitt 4 (Merken→Stash/SRS) → Task 7 (nutzt bestehende `/api/stash`-Route, kein neuer Server-Code nötig, wie im Spec-Abschnitt vorgesehen). Abschnitt 5 (Quiz unverändert) → Task 8 (reine Verdrahtung, `MediaStudyPlayer` nicht verändert). Fehlerfälle (ungültiger Link, kein Transkript, fehlender DeepL-Key) → Task 4/6.
- **Platzhalter-Scan:** keine TBD/TODO, jeder Code-Schritt zeigt vollständigen Code.
- **Typkonsistenz:** `Transcript`-Typ in `MediaDetailClient.tsx` (Task 8) und `[id]/page.tsx` (Task 7) stimmen überein (`rawText`, `videoId`, `sentences` gleich benannt). `MediaStudyPlayer`s bestehender `Transcript`-Typ (ohne `rawText`/`videoId`) bleibt unverändert — `MediaDetailClient` reicht nur die Teilmenge weiter, die `MediaStudyPlayer` erwartet.
