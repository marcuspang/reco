import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from "discord-interactions";
import "dotenv/config";
import express from "express";
import { getRandomEmoji } from "./utils.js";
import { COMMANDS } from "./commands.js";

const app = express();
app.use(express.json({ verify: verifyKeyMiddleware }));
const PORT = process.env.PORT || 3000;

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    let response;
    switch (name) {
      case COMMANDS.TEST_COMMAND: {
        // Send a message into the channel where command was triggered from
        response = {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            // Fetches a random emoji to send from a helper function
            content: "hello world " + getRandomEmoji(),
          },
        };
        break;
      }
      case COMMANDS.HELP_COMMAND: {
        response = {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "help message",
          },
        };
        break;
      }
    }
    return res.send(response);
  }
});

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
