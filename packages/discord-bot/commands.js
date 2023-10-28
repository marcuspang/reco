import "dotenv/config";
import { getRPSChoices } from "./game.js";
import { capitalize, InstallGlobalCommands } from "./utils.js";

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

export const COMMANDS = {
  TEST_COMMAND: "test",
  CHALLENGE_COMMAND: "challenge",
  HELP_COMMAND: "help",
  INVITE_COMMAND: "invite",
  CONFIGURE_COMMAND: "configure",
  VERIFY_COMMAND: "verify",
  SUPPORT_COMMAND: "support",
};

// Simple test command
const TEST_COMMAND = {
  name: COMMANDS.TEST_COMMAND,
  description: "Basic command",
  type: 1,
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: COMMANDS.CHALLENGE_COMMAND,
  description: "Challenge to a match of rock paper scissors",
  options: [
    {
      type: 3,
      name: "object",
      description: "Pick your object",
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
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
      type: 1, // Subcommand option
      name: "role",
      description: "Change the role given to verified members",
      options: [
        {
          type: 6, // User option
          name: "user",
          description: "Select a user",
          required: true,
        },
        {
          type: 3, // String option
          name: "role",
          description: "Enter the role name",
          required: true,
        },
      ],
    },
    {
      type: 1, // Subcommand option
      name: "dm_prompt",
      description: "Enable or disable message sent to new members",
      options: [
        {
          type: 6, // User option
          name: "user",
          description: "Select a user",
          required: true,
        },
        {
          type: 3, // String option
          name: "prompt",
          description: "Enter the DM prompt text",
          required: true,
        },
      ],
    },
    {
      type: 1, // Subcommand option
      name: "dm_message",
      description: "Configure the message sent to new members",
      options: [
        {
          type: 3, // String option
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

const ALL_COMMANDS = [
  TEST_COMMAND,
  CHALLENGE_COMMAND,
  HELP_COMMAND,
  INVITE_COMMAND,
  CONFIGURE_COMMAND,
  VERIFY_COMMAND,
  SUPPORT_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
