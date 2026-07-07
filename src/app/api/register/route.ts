import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const name = typeof body?.name === "string" ? body.name.trim() : null;

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Bitte gib eine gültige E-Mail-Adresse an." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Das Passwort braucht mindestens 8 Zeichen." }, { status: 400 });
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Diese E-Mail ist bereits registriert." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.user.create({ data: { email, name, passwordHash } });
  return NextResponse.json({ ok: true }, { status: 201 });
}
