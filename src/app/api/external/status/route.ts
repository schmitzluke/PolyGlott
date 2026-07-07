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

  if (!email) {
    return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
  }

  const user = await db.user.findUnique({
    where: { email },
    include: { streak: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Calculate due reviews
  const now = new Date();
  const dueReviewsCount = await db.reviewItem.count({
    where: {
      userId: user.id,
      dueAt: { lte: now },
      state: { not: 0 },
    },
  });

  // Find next uncompleted lesson
  // We sort by course order, unit order, lesson order
  const nextLesson = await db.lesson.findFirst({
    where: {
      progress: {
        none: { userId: user.id },
      },
    },
    orderBy: [
      { unit: { course: { order: "asc" } } },
      { unit: { order: "asc" } },
      { order: "asc" },
    ],
  });

  // Determine the base URL for deep links
  const baseUrl = process.env.NEXTAUTH_URL || "https://lukesserver.tail1253fa.ts.net";

  return NextResponse.json({
    user: {
      name: user.name,
      email: user.email,
      xpTotal: user.xpTotal,
      streak: user.streak?.current || 0,
    },
    tasks: {
      dueReviewsCount,
      nextLesson: nextLesson ? {
        slug: nextLesson.slug,
        title: nextLesson.title,
      } : null,
    },
    deepLinks: {
      reviews: `${baseUrl}/review`,
      nextLesson: nextLesson ? `${baseUrl}/lessons/${nextLesson.slug}` : null,
      dashboard: `${baseUrl}/dashboard`,
    },
  });
}
