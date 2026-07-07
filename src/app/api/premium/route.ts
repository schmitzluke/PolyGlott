import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * Paywall-Stub: „Kauf“ im Testmodus – kein echter Zahlungsdienst.
 * Hier würde später z. B. Stripe Checkout angebunden.
 */
export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  await db.user.update({ where: { id: user.id }, data: { isPremium: true } });
  return NextResponse.json({ ok: true, message: "Premium aktiviert (Testmodus)." });
}
