import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const followerId = (session?.user as { id?: string })?.id;
    if (!followerId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
    const followingId = params.id;

    if (followerId === followingId) {
      return NextResponse.json(
        { error: "You cannot follow yourself" },
        { status: 400 }
      );
    }

    // Check if target user exists
    const targetUser = await db.user.findUnique({
      where: { id: followingId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create follow relationship
    await db.follows.upsert({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
      update: {},
      create: {
        followerId,
        followingId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[FOLLOW_POST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const followerId = (session?.user as { id?: string })?.id;
    if (!followerId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
    const followingId = params.id;

    // Delete follow relationship
    await db.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // If it doesn't exist, it will throw a P2025 error, which we can safely ignore or return success
    if (error && typeof error === 'object' && 'code' in error && (error as any).code === 'P2025') {
       return NextResponse.json({ success: true });
    }
    
    console.error("[FOLLOW_DELETE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
