import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { ensureApiKey, regenerateApiKey } from "@/lib/apiKey";

/** Liefert (und erzeugt bei Bedarf) den persönlichen API-Key des eingeloggten Nutzers. */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  const apiKey = await ensureApiKey(user.id);
  return NextResponse.json({ apiKey });
}

/** Rotiert den Key: der alte wird sofort ungültig, ein neuer zurückgegeben. */
export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  const apiKey = await regenerateApiKey(user.id);
  return NextResponse.json({ apiKey });
}
