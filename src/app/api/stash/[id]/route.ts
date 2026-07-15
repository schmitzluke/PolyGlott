import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const entry = await db.stashSentence.findUnique({ where: { id: params.id } });
  if (!entry || entry.userId !== user.id) {
    return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });
  }

  await db.stashSentence.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
