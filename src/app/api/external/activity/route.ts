import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const apiKey = process.env.INTEGRATION_API_KEY;

  if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const daysParam = searchParams.get("days") || "7";
  const days = parseInt(daysParam, 10);

  if (!email) {
    return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
  }

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - days);

  const completedLessons = await db.userProgress.findMany({
    where: {
      userId: user.id,
      completedAt: { gte: sinceDate },
    },
    include: {
      lesson: { select: { slug: true, title: true } },
    },
    orderBy: { completedAt: "desc" },
  });

  const xpEvents = await db.xpEvent.findMany({
    where: {
      userId: user.id,
      createdAt: { gte: sinceDate },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    since: sinceDate.toISOString(),
    completedLessons: completedLessons.map((p) => ({
      lessonSlug: p.lesson.slug,
      lessonTitle: p.lesson.title,
      completedAt: p.completedAt,
      score: p.score,
    })),
    xpEvents: xpEvents.map((e) => ({
      amount: e.amount,
      reason: e.reason,
      createdAt: e.createdAt,
    })),
  });
}
