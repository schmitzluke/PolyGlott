import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const targetLanguage = typeof body?.targetLanguage === "string" ? body.targetLanguage : "tr";
  const selfLevel = ["A1", "A2", "B1", "B2", "C1"].includes(body?.selfLevel) ? body.selfLevel : "A1";
  const dailyGoalXp = [10, 30, 50].includes(body?.dailyGoalXp) ? body.dailyGoalXp : 30;

  await db.user.update({
    where: { id: user.id },
    data: { targetLanguage, selfLevel, dailyGoalXp, onboarded: true },
  });
  return NextResponse.json({ ok: true });
}
