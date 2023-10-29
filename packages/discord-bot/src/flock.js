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

export async function callFlockModel(initialPrompt) {
  const promptChunks = splitAndGeneratePrompts(initialPrompt);
  let combinedResult = [];
  console.log("Prompt:", promptChunks[0]);

  const response = await openai.completions.create({
    messages: [
      {
        role: "user",
        content: `I will be sending you ${promptChunks.length} messages. I want you to remember all of the chunk of social media data passed to you, in the form of { author: string; content: string; }. I want you to act as a objective member of the community, and use a friendly tone to summarize the \`content\` field in each JSON-stringified object after all the messages have been sent. Do not reply to any of the messages, until all the messages have been sent. If you understand and agree to the message, reply with "Yes".`,
      },
    ],
    model: "hackathon-chat",
    max_tokens: 10,
  });

  console.log("Instruction response:", response.choices[0].text);

  for (const prompt of promptChunks) {
    // Check if adding the next input would exceed the token limit.
    if (combinedPrompt.length + prompt.length < TOKEN_LIMIT) {
      combinedPrompt += prompt + " ";
    } else {
      const response = await openai.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "hackathon-chat",
        max_tokens: 50,
      });

      combinedResult.push(response.choices[0].text);

      combinedPrompt = prompt + " ";
    }
  }

  // Generate a summary from any remaining content.
  if (combinedPrompt) {
    const response = await openai.completions.create({
      model: "hackathon-chat",
      prompt: combinedPrompt,
      max_tokens: 50,
    });

    // Process the final response or add it to the array if needed.
    combinedResult.push(response.choices[0].text);
  }

  return combinedResult;
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
