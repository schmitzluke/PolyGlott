import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { askLLM, llmConfigured, type ChatMessage } from "@/lib/llm";
import { SCENARIOS } from "../../../../content/scenarios";

export const maxDuration = 30;

type Scenario = (typeof SCENARIOS)[number];

/**
 * Anruf-Modus (wird laut vorgelesen): flott, fast nur Türkisch.
 * Deutsch NUR, wenn der Lernende nicht versteht, Deutsch spricht oder Fehler macht.
 */
function callPrompt(
  scenario: Scenario | null,
  level: string,
  userName: string | null,
  knownVocab: string[],
  stashSentences: string[]
): string {
  const role = scenario
    ? `SZENARIO: ${scenario.title} – ${scenario.description}\nDEINE ROLLE: ${scenario.botRole} Du bist zugleich ein geduldiger Sprachcoach im Hintergrund.`
    : `DEINE ROLLE: Du bist „Hoca“, ein herzlicher türkischer Sprachlehrer im freien Gespräch. Themen: Alltag, Tag, Familie, Pläne, Hobbys – wechsle ab.`;

  const stashBlock =
    stashSentences.length > 0
      ? `\nPFLICHT-SÄTZE (Stash des Lernenden, bereits übersetzt):\n${stashSentences.map((s) => `- ${s}`).join("\n")}\nBaue im Laufe des Gesprächs MÖGLICHST VIELE dieser Sätze ein – als deine eigene Aussage oder als Frage, die den Lernenden zu einer ähnlichen Antwort provoziert. Nicht alle auf einmal, sondern natürlich über das Gespräch verteilt.\nBestrafe kurze Ja/Nein-Antworten des Lernenden: akzeptiere sie nicht kommentarlos, sondern hake auf Türkisch nach ("Neden?", "Anlat bakalım", "Biraz daha söyle") und fordere einen vollständigen Satz.`
      : "";

  return `Du führst einen LIVE-ANRUF in einer Türkisch-Lern-App. Deine Antworten werden per Sprachausgabe vorgelesen – kurz und natürlich wie am Telefon.

${role}
LERNENDER: ${userName ?? "dein Gesprächspartner"}, Niveau ${level}.
${stashBlock}

ANTWORTFORMAT (exakt, kein Markdown):
TR: <EIN kurzer türkischer Satz, maximal ~10 Wörter, Niveau ${level}>
DE: <nur im Ausnahmefall, sonst diese Zeile KOMPLETT weglassen>

WANN DE ERLAUBT IST – NUR dann:
- Der Lernende spricht Deutsch oder bittet um Hilfe → antworte kurz auf Deutsch, dann weiter.
- Er macht einen echten Fehler → eine kurze, ermutigende Korrektur.
- Er versteht offensichtlich nicht (unpassende Antwort, „anlamadım“, „was?“) → einmal kurz erklären, ggf. TR-Satz vereinfachen.
In allen anderen Fällen: NUR die TR-Zeile. Kein Übersetzen aus Gewohnheit.

GESPRÄCHSFÜHRUNG:
- Beginnt der Anruf („(Der Anruf beginnt …)“), eröffne abwechslungsreich und passend zur Rolle – variiere Begrüßung und erste Frage, nie zweimal gleich.
- Halte das Tempo hoch: kurze Sätze, direkte Anschlussfragen, kein Monolog.
- Die Spracherkennung hört manchmal falsch: Rate wohlwollend, was gemeint war, oder frag kurz auf Türkisch nach.
- Bevorzuge Wörter aus dem bekannten Wortschatz: ${knownVocab.length > 0 ? knownVocab.join("; ") : "(noch nichts gelernt – absolute Basics)"}
  Diese Bedeutungen sind verbindlich. Bei Unsicherheit lieber ein einfacher Standardsatz als etwas Erfundenes.`;
}

function immersivePrompt(scenario: Scenario, level: string, userName: string | null): string {
  return `Du bist Gesprächspartner:in in einer Türkisch-Lern-App (Deutsch → Türkisch).

SZENARIO: ${scenario.title} – ${scenario.description}
DEINE ROLLE: ${scenario.botRole}
NIVEAU DES LERNENDEN: ${level}${userName ? `\nNAME DES LERNENDEN: ${userName}` : ""}

REGELN:
1. Antworte auf Türkisch, kurz (1–3 Sätze) und dem Niveau ${level} angemessen.
2. Bleib in deiner Rolle und im Szenario. Stelle Rückfragen, damit das Gespräch weiterläuft.
3. Macht der Lernende einen Fehler, korrigiere sanft: Wiederhole zuerst die korrekte Version kurz in Klammern mit ✓, dann antworte inhaltlich.
4. Schreibt der Lernende auf Deutsch oder bittet um Hilfe: Erkläre kurz auf Deutsch, gib den passenden türkischen Satz als Vorschlag, und stelle deine letzte Frage dann noch einmal auf Türkisch.
5. Kein Markdown, keine Listen – nur natürliche Gesprächssätze.
6. Nach etwa 8–10 Wortwechseln führe das Gespräch zu einem natürlichen Ende.`;
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  if (!llmConfigured()) {
    return NextResponse.json(
      {
        error: "no_api_key",
        message:
          "Kein API-Key konfiguriert. Kostenlos & empfohlen: GEMINI_API_KEY (aistudio.google.com). Alternativen: GROQ_API_KEY oder ANTHROPIC_API_KEY. In die .env eintragen und Server neu starten.",
      },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  const scenarioId = body?.scenarioId as string | undefined;
  const isFreeTalk = scenarioId === "hoca" || scenarioId === "live";
  const isCall = body?.call === true || isFreeTalk;
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? null;
  if (!scenario && !isFreeTalk) return NextResponse.json({ error: "Unbekanntes Szenario." }, { status: 400 });

  const mode = body?.mode as string | undefined;

  // Übersetzen einer einzelnen Nachricht (Button im Chat)
  if (mode === "translate") {
    const text = typeof body?.text === "string" ? body.text.trim().slice(0, 800) : "";
    if (!text) return NextResponse.json({ error: "Kein Text." }, { status: 400 });
    try {
      const reply = await askLLM({
        system:
          "Übersetze den folgenden Text ins Deutsche. Gib NUR die deutsche Übersetzung zurück – keine Erklärung, keine Anführungszeichen, keine TR:/DE:-Marker.",
        messages: [{ role: "user", content: text }],
        maxTokens: 200,
        temperature: 0.2,
      });
      return NextResponse.json({ reply });
    } catch {
      return NextResponse.json({ error: "api_error", message: "Übersetzung fehlgeschlagen." }, { status: 502 });
    }
  }

  const rawMessages = Array.isArray(body?.messages) ? (body.messages as ChatMessage[]) : [];
  const messages = rawMessages
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-24)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1200) }));

  // Antwort-Tipp (Glühbirne): der Partner ist zuletzt dran, wir schlagen eine Antwort vor
  if (mode === "hint") {
    const scen = SCENARIOS.find((s) => s.id === scenarioId) ?? null;
    const roleLine = scen ? `Szenario: ${scen.title}. Rolle des Partners: ${scen.botRole}` : "Freies Gespräch mit Hoca.";
    const hintMessages = [
      ...messages,
      { role: "user" as const, content: "(Wie kann ich jetzt kurz auf Türkisch antworten? Mach mir EINEN Vorschlag.)" },
    ];
    try {
      const reply = await askLLM({
        system: `Du hilfst einem Türkisch-Lernenden (Niveau ${user.selfLevel}) mitten im Gespräch. ${roleLine}
Schlage EINE kurze, natürliche türkische Antwort vor, die zur letzten Nachricht des Partners passt.
FORMAT (exakt, kein Markdown):
TR: <kurzer türkischer Satz>
DE: <deutsche Übersetzung>`,
        messages: hintMessages,
        maxTokens: 150,
        temperature: 0.5,
      });
      return NextResponse.json({ reply });
    } catch {
      return NextResponse.json({ error: "api_error", message: "Tipp fehlgeschlagen." }, { status: 502 });
    }
  }

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Letzte Nachricht muss vom Nutzer sein." }, { status: 400 });
  }

  const wantFeedback = mode === "feedback";

  // Bekannter Wortschatz als Mini-Wörterbuch (kompakt halten = schnellere Antworten)
  let knownVocab: string[] = [];
  let stashSentences: string[] = [];
  if (isCall && !wantFeedback) {
    const known = await db.reviewItem.findMany({
      where: { userId: user.id },
      include: {
        stashSentence: { select: { turkishTranslation: true, germanOriginal: true } },
        islandSentence: { select: { turkishTranslation: true, germanOriginal: true } },
      },
      orderBy: [{ reps: "desc" }, { last_review: "desc" }],
      take: 80,
    });
    knownVocab = [
      ...new Set(
        known
          .map((k) => k.stashSentence ?? k.islandSentence)
          .filter((s): s is { turkishTranslation: string | null; germanOriginal: string } => !!s?.turkishTranslation)
          .map((s) => `${s.turkishTranslation} = ${s.germanOriginal}`)
      ),
    ];

    const ready = await db.stashSentence.findMany({
      where: { userId: user.id, status: "READY" },
      orderBy: { createdAt: "desc" },
      take: 15,
    });
    stashSentences = ready
      .filter((s) => s.turkishTranslation)
      .map((s) => `${s.turkishTranslation} (${s.germanOriginal})`);
  }

  let system: string;
  if (wantFeedback) {
    system = `Du bist Türkischlehrer:in. Der Lernende (Niveau ${user.selfLevel}) hat gerade ein Übungsgespräch geführt. Gib auf DEUTSCH ein kurzes, ermutigendes Feedback: 1) Was lief gut, 2) die 2–3 wichtigsten Fehler mit Korrektur, 3) ein konkreter Lerntipp. Maximal 120 Wörter, kein Markdown, keine TR:/DE:-Marker.`;
  } else if (isCall) {
    system = callPrompt(scenario, user.selfLevel, user.name, knownVocab, stashSentences);
  } else {
    system = immersivePrompt(scenario!, user.selfLevel, user.name);
  }

  try {
    const reply = await askLLM({
      system,
      messages,
      // Anrufe: kurz halten = schnelle Antwort + schnelle Sprachausgabe
      maxTokens: wantFeedback ? 400 : isCall ? 300 : 600,
      temperature: isCall ? 0.6 : 0.4, // etwas Varianz für abwechslungsreiche Eröffnungen
    });
    return NextResponse.json({ reply });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    console.error("Chat-Fehler:", msg);
    return NextResponse.json(
      { error: "api_error", message: "Die KI-API hat nicht geantwortet. Prüfe Key, Guthaben bzw. Rate-Limit." },
      { status: 502 }
    );
  }
}
