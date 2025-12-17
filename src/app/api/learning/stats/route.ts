import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/get-session-user";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [total, notStarted, inProgress, completed] = await Promise.all([
      prisma.learningItem.count({
        where: { user: { email: user.email } },
      }),
      prisma.learningItem.count({
        where: {
          user: { email: user.email },
          status: "NOT_STARTED",
        },
      }),
      prisma.learningItem.count({
        where: {
          user: { email: user.email },
          status: "IN_PROGRESS",
        },
      }),
      prisma.learningItem.count({
        where: {
          user: { email: user.email },
          status: "COMPLETED",
        },
      }),
    ]);

    return NextResponse.json({
      total,
      notStarted,
      inProgress,
      completed,
    });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
