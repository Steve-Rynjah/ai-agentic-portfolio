import { NextRequest, NextResponse } from "next/server";
import { STEVE_RESUME } from "@/data/resume";

export const dynamic = "force-dynamic";

const systemPrompt = `You are Steve Austin's personal AI assistant embedded in his portfolio website.
You have Steve's complete, up-to-date resume and background loaded below. Answer all questions accurately and confidently using this information.

${STEVE_RESUME}

Guidelines:
- Be concise, professional, and friendly — 2-4 sentences per response unless more detail is asked.
- Answer questions about Steve's skills, experience, projects, education, and availability using the resume above.
- If asked something completely unrelated to Steve (e.g. general coding help, random topics), politely redirect: "I'm focused on answering questions about Steve — feel free to ask about his background, skills, or projects!"
- Never say you don't have Steve's resume or that it's unavailable — you have it above.
- If someone asks "are you available for hire?" — yes, Steve is actively open to opportunities.
- Speak in third person about Steve when answering, or in first person as his assistant.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      "X-Title": "Steve Austin Portfolio",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b:free",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    console.error("OpenRouter error:", response.status, errorBody);
    return NextResponse.json(
      { reply: "I'm having trouble connecting right now. Please try again in a moment." },
      { status: 200 }
    );
  }

  const data = await response.json();
  const reply =
    data.choices?.[0]?.message?.content ?? "No response received.";

  return NextResponse.json({ reply });
}
