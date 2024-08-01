import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw Error("Missing OPENAI_API_KEY");
}

const openai = new OpenAI({ apiKey });

export default openai;
