import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

/** Einzelnes Transkript inkl. extrahierter Sätze (nur eigene). */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const transcript = await db.transcript.findFirst({
    where: { id: params.id, userId: user.id },
    include: { sentences: { orderBy: { rank: "asc" } } },
  });
  if (!transcript) return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });

  return NextResponse.json({ transcript });
}

/** Löscht ein Transkript (nur eigene). */
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const transcript = await db.transcript.findFirst({ where: { id: params.id, userId: user.id } });
  if (!transcript) return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });

  await db.transcript.delete({ where: { id: transcript.id } });
  return NextResponse.json({ ok: true });
}
