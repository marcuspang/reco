import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.FLOCK_MODEL_URL,
});

const TOKEN_LIMIT = 4096;

function splitAndGeneratePrompts(largePrompt) {
  const promptChunks = [];
  let currentChunk = "";
  const lines = largePrompt.split("\n"); // Split by line if needed.

  for (const line of lines) {
    const tokens = line.split(" "); // Split by space or as needed.
    for (const token of tokens) {
      if (currentChunk.length + token.length < TOKEN_LIMIT) {
        currentChunk += token + " ";
      } else {
        promptChunks.push(currentChunk.trim());
        currentChunk = token + " ";
      }
    }
  }

  if (currentChunk) {
    promptChunks.push(currentChunk.trim());
  }

  return promptChunks;
}

export async function callFlockModel(prompt) {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "hackathon-chat",
  });

  return response.choices[0].message.content;
}

export async function callFlockModelWithChunkSplitting(initialPrompt) {
  const promptChunks = splitAndGeneratePrompts(initialPrompt).map((chunk) => ({
    role: "user",
    content: chunk,
  }));

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `I will be sending you ${
          promptChunks.length + 1
        } messages. I want you to remember all of the chunk of social media data passed to you, in the form of { author: string; content: string; }. I want you to act as a objective member of the community, and use a friendly tone to summarize the \`content\` field in each JSON-stringified object after all the messages have been sent. Do not reply to any of the messages, until all the messages have been sent. If you understand and agree to the message, reply with "Yes".`,
      },
      ...promptChunks,
    ],
    model: "hackathon-chat",
  });

  return response.choices[0].message.content;
}

/**
{
  id: 'chatcmpl-3aivEZHK3NVFKFMRHE5iJ2',
  object: 'chat.completion',
  created: 1698525442,
  model: 'hackathon-chat',
  choices: [ { index: 0, message: [Object], finish_reason: 'stop' } ],
  usage: { prompt_tokens: 49, total_tokens: 91, completion_tokens: 42 }
}
Choices: {
  role: 'assistant',
  content: 'Why did the nihilist buy a self-help book?\n' +
    '\n' +
    'Because they needed a step-by-step guide on how to not give a step-by-step guide any meaning.'
}
 */
