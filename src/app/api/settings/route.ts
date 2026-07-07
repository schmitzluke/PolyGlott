import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const data: Record<string, unknown> = {};

  if (typeof body?.name === "string") data.name = body.name.trim().slice(0, 60);
  if ([10, 30, 50].includes(body?.dailyGoalXp)) data.dailyGoalXp = body.dailyGoalXp;
  if (typeof body?.notifications === "boolean") data.notifications = body.notifications;
  if (typeof body?.targetLanguage === "string") data.targetLanguage = body.targetLanguage;

  await db.user.update({ where: { id: user.id }, data });
  return NextResponse.json({ ok: true });
}
