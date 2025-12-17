import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/get-session-user";
import { createLearningSchema } from "@/lib/validators/learning";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSessionUser();
    if (!user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const data = createLearningSchema.partial().parse(body);

    const updated = await prisma.learningItem.updateMany({
      where: {
        id: params.id,
        user: {
          email: user.email,
        },
      },
      data,
    });

    if (updated.count === 0) {
      return NextResponse.json(
        { message: "Not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Updated" });
  } catch (error: unknown) {
    let message = "An error occurred";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json(
      { message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSessionUser();
    if (!user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const deleted = await prisma.learningItem.deleteMany({
      where: {
        id: params.id,
        user: {
          email: user.email,
        },
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { message: "Not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
