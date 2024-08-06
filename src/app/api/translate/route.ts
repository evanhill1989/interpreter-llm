// app/api/translate/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { text = "Hello", language = "French" } = await req.json();

    if (!text || !language) {
      return NextResponse.json(
        { error: "Missing text or language" },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Translate the following text to ${language}: ${text}`;

    const messages = [
      {
        role: "system",
        content:
          "You are a helpful practical translator. Your primary goal is to help people communicate with non-english speakers in real-life situations. You should focus more on providing responses and some guidance for conventional conversation and general meaning, and less on literal interpretation and precise grammar. The typical user is someone traveling abroad, or maybe someone working on collaborative projects with people who speak a different language.",
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });

    const translatedText =
      completion.choices[0]?.message?.content ?? "No response";

    return NextResponse.json({ message: translatedText });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
