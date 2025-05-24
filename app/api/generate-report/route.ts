import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  // Call the OpenAI API (requires you to set OPENAI_API_KEY in your environment)
  const apiKey = process.env.OPENAI_API_KEY;
  console.log("OPENAI_API_KEY:", apiKey);
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OpenAI API key." },
      { status: 500 }
    );
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert financial advisor." },
        { role: "user", content: prompt },
      ],
      max_tokens: 800,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Error generating the report." },
      { status: 500 }
    );
  }

  const data = await response.json();
  const report =
    data.choices?.[0]?.message?.content || "Could not generate the report.";

  return NextResponse.json({ report });
}
