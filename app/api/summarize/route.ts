import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

const requestSchema = z.object({
  text: z.string().min(1, "Text is required").max(20000, "Max 20,000 characters"),
  format: z.enum(["short_paragraph", "detailed_paragraph", "bulleted"]),
});

type Format = "short_paragraph" | "detailed_paragraph" | "bulleted";

function makePrompt(text: string, format: Format) {
  const base =
    "You are a helpful assistant that summarizes text accurately without hallucinations. Preserve key facts, names, numbers, and intent. IMPORTANT: Always respond in the same language as the input text unless the user specifically requests a different language in their input.";

  if (format === "bulleted") {
    return `${base}\nSummarize the following text as concise bullet points. Avoid long sentences. Return only bullet points. Use the same language as the input text.\n\n${text}`;
  }
  if (format === "detailed_paragraph") {
    return `${base}\nProvide a detailed paragraph (5–8 sentences) capturing context, key arguments, and outcomes. Use the same language as the input text.\n\n${text}`;
  }
  return `${base}\nProvide a short paragraph (2–4 sentences) with the most important points. Use the same language as the input text.\n\n${text}`;
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { text, format } = requestSchema.parse(json);

    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: makePrompt(text, format),
    });

    const summary = (response as { text?: string }).text ?? "";

    return NextResponse.json({ summary, format });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: err.flatten() },
        { status: 400 }
      );
    }
    console.error("Summarize API error:", err);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}