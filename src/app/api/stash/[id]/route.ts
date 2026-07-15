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

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const entry = await db.stashSentence.findUnique({ where: { id: params.id } });
  if (!entry || entry.userId !== user.id) {
    return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const germanOriginal = typeof body?.germanOriginal === "string" ? body.germanOriginal.trim() : "";
  const turkishTranslation =
    typeof body?.turkishTranslation === "string" ? body.turkishTranslation.trim() : "";
  if (!germanOriginal || !turkishTranslation) {
    return NextResponse.json({ error: "germanOriginal und turkishTranslation erforderlich." }, { status: 400 });
  }

  const updated = await db.stashSentence.update({
    where: { id: params.id },
    data: { germanOriginal, turkishTranslation, status: "READY" },
  });
  return NextResponse.json({ id: updated.id, germanOriginal: updated.germanOriginal, turkishTranslation: updated.turkishTranslation, status: updated.status });
}
