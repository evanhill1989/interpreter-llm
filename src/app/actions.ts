import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleLlmFetch(
  event: React.MouseEvent<HTMLButtonElement>
) {
  const textInput = event.currentTarget.querySelector(
    "#textToTranslate"
  ) as HTMLInputElement;
  const text = textInput?.value;
  interface ChatCompletionMessageParam {
    role: "system" | "user";
    content: string;
  }

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are a helpful translation bot. The user's primary goal is to get practical help users communicating with non-english speakers in real-life situations. It could be in a professional collaborative situation via email or group chat, but most often it will be in a situation where the user is travelling. So it's more important that the translations help our user demographic communicate with real people on the street who need to communicate in real-time than helping them deliver precise scholarly prose.",
    },
    {
      role: "user",
      content: text,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
  });

  console.log(completion.choices[0]);
}
