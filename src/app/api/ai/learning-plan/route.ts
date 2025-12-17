import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getSessionUser } from "@/lib/get-session-user";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    // Ensure authenticated
    await getSessionUser();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { message: "GROQ_API_KEY is missing on the server" },
        { status: 500 }
      );
    }

    const { goal } = await req.json();

    if (!goal) {
      return NextResponse.json(
        { message: "Goal is required" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an expert learning mentor. Respond concisely and clearly.",
        },
        {
          role: "user",
          content: `
Create a beginner-to-intermediate learning plan for:
"${goal}"

Return the response in this exact format:

1. Learning Goal Overview
2. Key Topics (bullet points)
3. 7-Day Learning Plan (Day 1 to Day 7)
`,
        },
      ],
      temperature: 0.6,
    });

    const content =
      completion.choices[0]?.message?.content || "No response";

    return NextResponse.json({ result: content });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "AI generation failed";
    const status = message.toLowerCase().includes("unauthorized") ? 401 : 500;
    return NextResponse.json({ message }, { status });
  }
}
