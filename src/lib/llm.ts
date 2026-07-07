/**
 * Provider-agnostischer LLM-Client (ohne SDK, nutzt fetch).
 * Unterstützt:
 *  - Anthropic (Claude)     – beste Qualität, bezahlt (Centbeträge)
 *  - Google Gemini          – kostenlos (AI Studio, ~1500 Anfragen/Tag), gute Qualität
 *  - Groq (Llama)           – kostenlos, schwächer bei Türkisch
 *
 * Auswahl: LLM_PROVIDER="anthropic" | "gemini" | "groq" in .env, sonst automatisch
 * in dieser Reihenfolge: Anthropic → Gemini → Groq (je nachdem, welcher Key da ist).
 */

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type LlmProvider = "anthropic" | "gemini" | "groq";

export function activeProvider(): LlmProvider | null {
  const forced = process.env.LLM_PROVIDER;
  if (forced === "anthropic" && process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (forced === "gemini" && process.env.GEMINI_API_KEY) return "gemini";
  if (forced === "groq" && process.env.GROQ_API_KEY) return "groq";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.GEMINI_API_KEY) return "gemini";
  if (process.env.GROQ_API_KEY) return "groq";
  return null;
}

export function llmConfigured(): boolean {
  return activeProvider() !== null;
}

interface AskOptions {
  system: string;
  messages: ChatMessage[];
  model?: string;
  maxTokens?: number;
  /** Niedrig (z. B. 0.4) = weniger Halluzinationen, wichtig für Sprachkorrektheit */
  temperature?: number;
}

async function askAnthropic(options: AskOptions): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: options.model ?? process.env.CHAT_MODEL ?? "claude-haiku-4-5-20251001",
      max_tokens: options.maxTokens ?? 600,
      ...(options.temperature !== undefined ? { temperature: options.temperature } : {}),
      system: options.system,
      messages: options.messages,
    }),
  });
  if (!res.ok) {
    throw new Error(`anthropic_${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
  }
  const data = (await res.json()) as { content: { type: string; text?: string }[] };
  return data.content
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("\n")
    .trim();
}

/** OpenAI-kompatibles Chat-Completions-Format (Groq, Gemini, OpenRouter, …) */
async function askOpenAICompatible(
  baseUrl: string,
  apiKey: string,
  model: string,
  options: AskOptions
): Promise<string> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: options.maxTokens ?? 600,
      ...(options.temperature !== undefined ? { temperature: options.temperature } : {}),
      messages: [{ role: "system", content: options.system }, ...options.messages],
    }),
  });
  if (!res.ok) {
    throw new Error(`llm_${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
  }
  const data = (await res.json()) as { choices: { message?: { content?: string } }[] };
  return (data.choices?.[0]?.message?.content ?? "").trim();
}

export async function askLLM(options: AskOptions): Promise<string> {
  const provider = activeProvider();
  if (!provider) throw new Error("no_api_key");

  switch (provider) {
    case "anthropic":
      return askAnthropic(options);
    case "gemini":
      return askOpenAICompatible(
        "https://generativelanguage.googleapis.com/v1beta/openai",
        process.env.GEMINI_API_KEY!,
        options.model ?? process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
        options
      );
    case "groq":
      return askOpenAICompatible(
        "https://api.groq.com/openai/v1",
        process.env.GROQ_API_KEY!,
        options.model ?? process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
        options
      );
  }
}
