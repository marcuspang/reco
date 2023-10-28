import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.FLOCK_MODEL_URL, // defaults to https://api.openai.com/v1
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
  const promptChunks = splitAndGeneratePrompts(prompt);
  let combinedResult = [];
  console.log("Prompt:", promptChunks[0]);

  const response = await client.completions.create({
    messages: [
      {
        role: "user",
        content: `I will be sending you ${promptChunks.length} messages. I want you to remember all of the chunk of social media data passed to you, in the form of { author: string; content: string; }. I want you to act as a objective member of the community, and use a friendly tone to summarize the \`content\` field in each JSON-stringified object after all the messages have been sent. Do not reply to any of the messages, until all the messages have been sent. If you understand and agree to the message, reply with "Yes".`,
      },
    ],
    model: "hackathon-chat",
    max_tokens: 10, // Set an appropriate value here for the summary length.
  });

  console.log("Instruction response:", response.choices[0].text);

  for (const prompt of promptChunks) {
    // Check if adding the next input would exceed the token limit.
    if (combinedPrompt.length + prompt.length < tokenLimit) {
      combinedPrompt += prompt + " ";
    } else {
      // If adding the next input exceeds the token limit, generate a summary with the current content.
      const response = await client.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "hackathon-chat",
        max_tokens: 50, // Set an appropriate value here for the summary length.
      });

      // Process the response here, or store it in an array if needed.
      combinedResult.push(response.choices[0].text);

      // Reset the combined prompt to the current input string.
      combinedPrompt = prompt + " ";
    }
  }

  // Generate a summary from any remaining content.
  if (combinedPrompt) {
    const response = await client.completions.create({
      engine: "text-davinci-002", // Specify your engine.
      prompt: combinedPrompt,
      max_tokens: 50, // Set an appropriate value here for the summary length.
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
