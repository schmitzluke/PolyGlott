import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

type BulkRow = { germanOriginal: string; turkishTranslation: string };

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const rows: BulkRow[] = Array.isArray(body?.rows)
    ? body.rows
        .map((r: unknown) => ({
          germanOriginal: typeof (r as BulkRow)?.germanOriginal === "string" ? (r as BulkRow).germanOriginal.trim() : "",
          turkishTranslation: typeof (r as BulkRow)?.turkishTranslation === "string" ? (r as BulkRow).turkishTranslation.trim() : "",
        }))
        .filter((r: BulkRow) => r.germanOriginal && r.turkishTranslation)
    : [];

  if (rows.length === 0) {
    return NextResponse.json({ error: "Keine gültigen Zeilen gefunden." }, { status: 400 });
  }

  const created = await db.$transaction(
    rows.map((r) =>
      db.stashSentence.create({
        data: { userId: user.id, germanOriginal: r.germanOriginal, turkishTranslation: r.turkishTranslation, status: "READY" },
      })
    )
  );

  await db.reviewItem.createMany({
    data: created.map((entry) => ({ userId: user.id, stashSentenceId: entry.id })),
  });

  return NextResponse.json(
    { count: created.length, sentences: created.map((e) => ({ id: e.id, germanOriginal: e.germanOriginal, turkishTranslation: e.turkishTranslation, status: e.status })) },
    { status: 201 }
  );
}
