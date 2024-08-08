"use client";

// need messages history state
// need UI to accomodate chat flow with automatic scrolling to most recent chat messages
import { Righteous } from "next/font/google";
const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
});
export default function ChatVersion({
  setChat,
}: {
  setChat: (value: boolean) => void;
}) {
  return (
    <>
      <header className="header grid justify-center items-center ">
        <div className="flex flex-col items-center justify-center p-6 rounded-lg gap-3 bg-sky-400/90 shadow-lg">
          <h1 className={`text-5xl ${righteous.className}`}>LanguaNav</h1>
          <p className="text-xl">Found in translation</p>
          <button
            className="bg-white text-sky-400 rounded px-2 py-1 hover:bg-sky-200"
            onClick={() => setChat(false)}
          >
            Switch to Translator
          </button>
        </div>
      </header>
    </>
  );
}
