import "dotenv/config";
import { InstallGlobalCommands } from "../src/utils.js";

export const COMMANDS = {
  TEST_COMMAND: "test",
  HELP_COMMAND: "help",
  INVITE_COMMAND: "invite",
  CONFIGURE_COMMAND: "configure",
  VERIFY_COMMAND: "verify",
  SUPPORT_COMMAND: "support",
  LIST_EVENTS_COMMAND: "list_events",
  GENERATE_COMMAND: "generate",
  PROMPT_COMMAND: "prompt",
};

const INVITE_COMMAND = {
  name: COMMANDS.INVITE_COMMAND,
  type: 1,
  description: "Invite the bot.",
};

const HELP_COMMAND = {
  type: 1,
  name: COMMANDS.HELP_COMMAND,
  description: "Shows the help message.",
};

const CONFIGURE_COMMAND = {
  name: COMMANDS.CONFIGURE_COMMAND,
  description: "Configure various settings",
  options: [
    {
      type: 1,
      name: "role",
      description: "Change the role given to verified members",
      options: [
        {
          type: 6,
          name: "user",
          description: "Select a user",
          required: true,
        },
        {
          type: 8,
          name: "role",
          description: "Enter the role name",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "dm_prompt",
      description: "Enable or disable message sent to new members",
    },
    {
      type: 1,
      name: "dm_message",
      description: "Configure the message sent to new members",
      options: [
        {
          type: 3,
          name: "message",
          description: "Enter the new member message",
          required: true,
        },
      ],
    },
  ],
};

const VERIFY_COMMAND = {
  type: 1,
  name: COMMANDS.VERIFY_COMMAND,
  description: "Receive a link to verify yourself.",
};

const SUPPORT_COMMAND = {
  type: 1,
  name: COMMANDS.SUPPORT_COMMAND,
  description: "Join the support server.",
};

// itinerary, summary, governance
const GENERATE_COMMAND = {
  type: 1,
  name: COMMANDS.GENERATE_COMMAND,
  description: "Generate content with the help of a decentralized AI model.",
  options: [
    {
      type: 1,
      name: "summarise",
      description: "Summarise the channel's texts in the past day.",
    },
    {
      type: 1,
      name: "itinerary",
      description: "Generate an itinerary for the channel for the channel.",
    },
    {
      type: 1,
      name: "governance",
      description:
        "Generate sentiment analysis for the discussion of governance in the channel.",
    },
  ],
};

// DEBUG ONLY COMMANDS
const PROMPT_COMMAND = {
  type: 1,
  name: COMMANDS.PROMPT_COMMAND,
  description:
    "[DEBUG] Generate content with the help of a decentralized AI model.",
  options: [
    {
      type: 3,
      name: "prompt",
      description: "Enter the prompt text",
      required: true,
    },
  ],
};

const LIST_EVENTS_COMMAND = {
  type: 1,
  name: COMMANDS.LIST_EVENTS_COMMAND,
  description: "[DEBUG] List all events for the current channel.",
};

const TEST_COMMAND = {
  name: COMMANDS.TEST_COMMAND,
  description: "[DEBUG] Basic command",
  type: 1,
};

const ALL_COMMANDS = [
  TEST_COMMAND,
  HELP_COMMAND,
  INVITE_COMMAND,
  CONFIGURE_COMMAND,
  VERIFY_COMMAND,
  SUPPORT_COMMAND,
  LIST_EVENTS_COMMAND,
  GENERATE_COMMAND,
  PROMPT_COMMAND,
];

// uncomment this to update bot commands
// InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
