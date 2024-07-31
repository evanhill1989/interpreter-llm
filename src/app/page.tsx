// newNotes / TODO s
// Fix border at bottom of translate form
// add ui/ux for new view
// for now I'm exposing my API key to the browser
// but later i need to move this async function to a server-side function file

// oldNotes / TODO s

"use client";

import { useState } from "react";
import OpenAI from "openai";

import { Righteous } from "next/font/google";

// Temporary exposure of API key to the browser; move this to a server-side function for production

const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
});

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Home() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [response, setResponse] = useState("");

  async function handleStartOver(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
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
      <header className="header grid justify-center items-center ">
        <div className="flex flex-col items-center justify-center p-6 rounded-lg gap-3 bg-sky-400/90 shadow-lg">
          <h1 className={`text-5xl ${righteous.className}`}>LanguaNav</h1>
          <p className="text-xl">Found in translation</p>
        </div>
      </header>
      <main className="px-6 py-12">
        {!response && (
          <div className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col  gap-4">
              <div className="mb-4 flex flex-col items-center justify-center">
                <label
                  htmlFor="textToTranslate"
                  className="mb-4 font-semibold text-lg text-sky-300"
                >
                  Text to translate
                </label>
                <textarea
                  id="textToTranslate"
                  name="textToTranslate"
                  rows="5"
                  cols="50"
                  className="border rounded-lg p-2 w-full mt-2 text-black max-w-[500px]"
                  placeholder="Enter your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4 flex flex-col items-center w-full">
                <fieldset className=" fieldset w-1/2 max-w-[300px]">
                  {/* For some reason this legend element below doesn't respond to 
                flex align directives, so I had to use text-center on it */}
                  <legend className="mb-4 font-semibold text-center text-lg text-sky-300 ">
                    Select a language
                  </legend>

                  <div className="flex flex-col gap-4  font-semibold">
                    <div>
                      <input
                        type="radio"
                        id="french"
                        name="language"
                        value="French"
                        onChange={(e) => setLanguage(e.target.value)}
                      />
                      <label className="ml-2" htmlFor="french">
                        French
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="spanish"
                        name="language"
                        value="Spanish"
                        onChange={(e) => setLanguage(e.target.value)}
                      />
                      <label className="ml-2" htmlFor="spanish">
                        Spanish
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="japanese"
                        name="language"
                        value="Japanese"
                        onChange={(e) => setLanguage(e.target.value)}
                      />
                      <label className="ml-2" htmlFor="japanese">
                        Japanese
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <button
                type="submit"
                className="w-full max-w-[500px] self-center text-black bg-sky-300 rounded-md py-2 px-4 font-bold text-xl mb-3"
              >
                Translate!
              </button>
            </form>
          </div>
        )}
        {response && (
          <div className="p-6">
            <form onSubmit={handleStartOver} className="flex flex-col  gap-4">
              <div className="mb-4 flex flex-col items-center justify-center">
                <label
                  htmlFor="textToTranslate"
                  className="mb-4 font-semibold text-lg text-sky-300"
                >
                  Your original text
                </label>
                <textarea
                  id="textToTranslate"
                  name="textToTranslate"
                  rows="5"
                  cols="50"
                  className="border rounded-lg p-2 w-full mt-2 text-black max-w-[500px]"
                  placeholder="Enter your text here..."
                  value={text}
                ></textarea>
              </div>

              <div className="mb-4 flex flex-col items-center w-full">
                <label
                  htmlFor="textToTranslate"
                  className="mb-4 font-semibold text-lg text-sky-300"
                >
                  Translation
                </label>
                <textarea
                  id="textToTranslate"
                  name="textToTranslate"
                  rows="5"
                  cols="50"
                  className="border rounded-lg p-2 w-full mt-2 text-black max-w-[500px]"
                  placeholder="Enter your text here..."
                  value={response}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full max-w-[500px] self-center text-black bg-sky-300 rounded-md py-2 px-4 font-bold text-xl mb-3"
              >
                Start Over
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
