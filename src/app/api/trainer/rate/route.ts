import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const rating = Number(body?.rating ?? -1);

  if (rating < 1 || rating > 4) {
    return NextResponse.json({ error: "Ungültige Werte." }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
