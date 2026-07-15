import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { deepLink } from "@/lib/publicUrl";

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

  // Calculate due reviews – inkl. neuer Karten (state 0), konsistent mit
  // Dashboard und /api/external/me (buildUserSummary).
  const now = new Date();
  const dueReviewsCount = await db.reviewItem.count({
    where: {
      userId: user.id,
      dueAt: { lte: now },
    },
  });

  return NextResponse.json({
    user: {
      name: user.name,
      email: user.email,
      xpTotal: user.xpTotal,
      streak: user.streak?.current || 0,
    },
    tasks: {
      dueReviewsCount,
    },
    deepLinks: {
      reviews: deepLink("/review"),
      dashboard: deepLink("/dashboard"),
    },
  });
}
