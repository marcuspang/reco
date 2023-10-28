import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.FLOCK_MODEL_URL, // defaults to https://api.openai.com/v1
});

export async function callFlockModel(prompt) {
  console.log("Prompt:", prompt);
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "hackathon-chat",
    });
    console.log("Response:", chatCompletion);
    console.log("Choices:", chatCompletion?.choices[0].message);
    return chatCompletion?.choices[0]?.message.content;
  } catch (error) {
    console.error("Error getting completion from OpenAI:", error);
    throw error;
  }
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
