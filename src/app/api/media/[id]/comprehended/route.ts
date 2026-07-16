import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

/** Markiert ein Transkript als verstanden (Pre-Input Comprehension abgeschlossen). */
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const transcript = await db.transcript.findFirst({ where: { id: params.id, userId: user.id } });
  if (!transcript) return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });

  await db.transcript.update({ where: { id: transcript.id }, data: { comprehended: true } });
  return NextResponse.json({ ok: true });
}
