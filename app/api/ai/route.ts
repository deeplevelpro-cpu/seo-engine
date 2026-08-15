import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            `OpenAI API request failed (${response.status}).`,
        },
        { status: response.status }
      );
    }

    const result = data?.choices?.[0]?.message?.content;

    if (!result) {
      return NextResponse.json(
        { error: "OpenAI returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("AI route error:", error);

    return NextResponse.json(
      {
        error: "AI request failed. Check the terminal for details.",
      },
      { status: 500 }
    );
  }
}
