import { randomBytes, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";

/**
 * Persönlicher API-Key pro Nutzer für die externe Companion-API.
 * Format: `pg_<32 base64url-Zeichen>`. Nur Präfix ist geraten-sicher erkennbar.
 */
export function generateApiKey(): string {
  return `pg_${randomBytes(24).toString("base64url")}`;
}

/** Konstantzeit-Vergleich zweier Keys (verhindert Timing-Angriffe). */
export function apiKeyEquals(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Extrahiert den Bearer-Token aus dem Authorization-Header (oder ""). */
export function bearerToken(req: Request): string {
  const header = req.headers.get("authorization") ?? "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
}

/**
 * Liefert den API-Key des Nutzers; erzeugt + persistiert einen, falls noch keiner existiert.
 */
export async function ensureApiKey(userId: string): Promise<string> {
  const user = await db.user.findUnique({ where: { id: userId }, select: { apiKey: true } });
  if (user?.apiKey) return user.apiKey;
  return regenerateApiKey(userId);
}

/**
 * Erzeugt einen neuen Key für den Nutzer und ersetzt den alten (Revoke + Rotate).
 * Bei (astronomisch unwahrscheinlicher) Kollision mit @unique wird neu gewürfelt.
 */
export async function regenerateApiKey(userId: string): Promise<string> {
  for (let i = 0; i < 5; i++) {
    const apiKey = generateApiKey();
    try {
      await db.user.update({ where: { id: userId }, data: { apiKey } });
      return apiKey;
    } catch {
      // Unique-Kollision → erneut versuchen
    }
  }
  throw new Error("Konnte keinen eindeutigen API-Key erzeugen");
}
