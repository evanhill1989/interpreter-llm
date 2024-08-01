import openai from "@/lib/openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { text, language } = body;

  if (!text || !language) {
    return new Response("Please enter text and select a language.", {
      status: 400,
    });
  }

  const prompt = `Translate the following text to ${language}: ${text}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    return new Response(
      completion.choices[0]?.message?.content ?? "No response",
      { status: 200 }
    );
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return new Response("An error occurred while processing your request.", {
      status: 500,
    });
  }
}
