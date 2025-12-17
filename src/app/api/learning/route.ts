import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/get-session-user";
import { createLearningSchema } from "@/lib/validators/learning";

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();

    const data = createLearningSchema.parse(body);

    const learningItem = await prisma.learningItem.create({
      data: {
        ...data,
        user: {
          connect: { email: user.email },
        },
      },
    });

    return NextResponse.json(learningItem, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json(
      { message },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const items = await prisma.learningItem.findMany({
      where: {
        user: {
          email: user.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
