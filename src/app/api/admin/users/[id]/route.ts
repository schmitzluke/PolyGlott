import { NextResponse } from "next/server";
import { getCurrentUser, isAdminUser } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * Admin-Aktionen auf einen Nutzer. Jede Route prüft serverseitig isAdminUser –
 * der Client wird nie als Autorität behandelt.
 */
async function guard() {
  const me = await getCurrentUser();
  if (!isAdminUser(me)) return null;
  return me!;
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const me = await guard();
  if (!me) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const target = await db.user.findUnique({ where: { id: params.id } });
  if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = (await req.json().catch(() => ({}))) as { action?: string; amount?: number };
  const action = body.action;

  switch (action) {
    case "togglePremium":
      await db.user.update({ where: { id: target.id }, data: { isPremium: !target.isPremium } });
      break;

    case "toggleAdmin":
      // Selbst-Entzug verhindern, damit man sich nicht aussperrt.
      if (target.id === me.id && target.isAdmin) {
        return NextResponse.json({ error: "Du kannst dir selbst nicht die Admin-Rechte entziehen." }, { status: 400 });
      }
      await db.user.update({ where: { id: target.id }, data: { isAdmin: !target.isAdmin } });
      break;

    case "addXp": {
      const amount = Number.isFinite(body.amount) ? Math.trunc(body.amount as number) : 50;
      await db.user.update({ where: { id: target.id }, data: { xpTotal: { increment: amount } } });
      break;
    }

    case "resetProgress":
      // Kompletter Lern-Reset für Tests: Fortschritt, Karteikarten, XP-Events,
      // Achievements, Streak löschen und XP auf 0 setzen. Konto bleibt bestehen.
      await db.$transaction([
        db.userProgress.deleteMany({ where: { userId: target.id } }),
        db.reviewItem.deleteMany({ where: { userId: target.id } }),
        db.xpEvent.deleteMany({ where: { userId: target.id } }),
        db.userAchievement.deleteMany({ where: { userId: target.id } }),
        db.streak.deleteMany({ where: { userId: target.id } }),
        db.user.update({ where: { id: target.id }, data: { xpTotal: 0 } }),
      ]);
      break;

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const me = await guard();
  if (!me) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (params.id === me.id) {
    return NextResponse.json({ error: "Du kannst dein eigenes Konto hier nicht löschen." }, { status: 400 });
  }
  await db.user.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
