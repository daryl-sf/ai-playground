import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const model = anthropic("claude-3-5-haiku-latest");

export const answerMyQuestion = async (prompt: string) => {
  try {
    const { textStream } = await streamText({ model, prompt });
    return textStream;
  } catch (error) {
    console.error(error);
    console.error("There was an error");
    throw error;
  }
};
