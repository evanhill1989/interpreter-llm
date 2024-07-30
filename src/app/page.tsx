// newNotes / TODO s
// Fix border at bottom of translate form
// add ui/ux for new view
// for now I'm exposing my API key to the browser
// but later i need to move this async function to a server-side function file

// oldNotes / TODO s

"use client";

import { useState } from "react";
import OpenAI from "openai";

// Temporary exposure of API key to the browser; move this to a server-side function for production
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Home() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text || !language) {
      alert("Please enter text and select a language.");
      return;
    }

    // Define a prompt that includes the desired language
    const prompt = `Translate the following text to ${language}: ${text}`;

    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages,
      });

      setResponse(completion.choices[0]?.message?.content ?? "No response");
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      setResponse("An error occurred while processing your request.");
    }
  }

  return (
    <div className="">
      <header className="header flex flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bigShouldersDisplay">LanguageNavigator</h1>
        <p>Found in translation</p>
      </header>
      <main className="p-6">
        <div className=" border-b-slate-950 border-2 rounded-lg p-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-3"
          >
            <div className="mb-4 flex flex-col items-center justify-center">
              <label htmlFor="textToTranslate" className="mb-4 font-semibold">
                Text to translate
              </label>
              <textarea
                id="textToTranslate"
                name="textToTranslate"
                rows="5"
                cols="50"
                className="border rounded-lg p-2 w-full mt-2 text-black"
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4 flex items-center justify-center">
              <fieldset className=" ">
                <legend className="mb-4 font-semibold">
                  Select a language
                </legend>
                <div className="flex flex-col gap-4 font-semibold">
                  <div>
                    <input
                      type="radio"
                      id="french"
                      name="language"
                      value="French"
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                    <label htmlFor="french">French</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="spanish"
                      name="language"
                      value="Spanish"
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                    <label htmlFor="spanish">Spanish</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="japanese"
                      name="language"
                      value="Japanese"
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                    <label htmlFor="japanese">Japanese</label>
                  </div>
                </div>
              </fieldset>
            </div>
            <button
              type="submit"
              className="w-full text-black bg-slate-50 rounded-md py-2 px-4 font-bold text-xl"
            >
              Translate!
            </button>
          </form>
        </div>

        {response && <div className="response">{response}</div>}
      </main>
    </div>
  );
}
