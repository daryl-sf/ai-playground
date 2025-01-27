import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const model = anthropic("claude-3-5-haiku-latest");

export const answerMyQuestion = async (prompt: string) => {
  try {
    const { textStream } = await streamText({ model, prompt });

    for await (const text of textStream) {
      console.log(text);
    }

    return textStream;
  } catch (error) {
    console.error(error);
    console.error("There was an error");
  }
};

rl.question("Ask me a question: ", async (question) => {
  await answerMyQuestion(question);
  rl.close();
});
