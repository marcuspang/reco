import { Client, Events, GatewayIntentBits, Partials } from "discord.js";
import {
  getWelcomeMessage,
  isWelcomeMessageEnabled,
  setWelcomeMessage,
} from "./storage.js";
import { COMMANDS } from "./commands.js";
import { getOAuthUrl } from "./discord.js";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Message, Partials.Reaction],
});

export function startEvents() {
  client.once(Events.ClientReady, async (client) => {
    console.log("Client ready! Logged in as " + client.user.tag);
  });

  client.on(Events.GuildAvailable, async (guild) => {
    console.log(`Currently in guild ${guild.name} (ID: ${guild.id})`);
  });

  client.on(Events.MessageCreate, async (message) => {
    console.log(
      `Received message from ${message.author.tag}: ${message.content}`
    );
  });

  client.on(Events.GuildMemberAdd, async (member) => {
    const channel = member.guild.channels.cache.find(
      (ch) => ch.name === "general"
    );
    if (!channel) return;
    if (!(await isWelcomeMessageEnabled(member.guild.id, channel.id))) return;
    const welcomeMessage = getWelcomeMessage(member.guild.id, channel.id);
    channel.send(welcomeMessage);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;
    switch (commandName) {
      case COMMANDS.TEST_COMMAND:
        await interaction.reply("Hello World");
        break;
      case COMMANDS.HELP_COMMAND:
        await interaction.reply(
          "Need help? Contact us on https://github.com/recommendoor/recommendoor"
        );
        break;
      case COMMANDS.CONFIGURE_COMMAND:
        const subcommandName = options.getSubcommand();
        switch (subcommandName) {
          case "dm_prompt":
            const isEnabled = await isWelcomeMessageEnabled(
              interaction.guildId,
              interaction.channelId
            );
            setWelcomeMessage(
              interaction.guildId,
              interaction.channelId,
              !isEnabled
            );
            await interaction.reply(
              `DM prompt is now ${!isEnabled ? "enabled" : "disabled"}`
            );
            break;
          case "dm_message":
            const newWelcomeMessage = options.getString("message");
            setWelcomeMessage(
              interaction.guildId,
              interaction.channelId,
              newWelcomeMessage
            );
            break;
          case "role":
            await interaction.reply("Role");
            break;
          default:
            await interaction.reply("Unknown subcommand");
            break;
        }
        break;
      case COMMANDS.INVITE_COMMAND:
        await interaction.reply("Invite command");
        break;
      case COMMANDS.VERIFY_COMMAND:
        // get verification link
        const { state: _, url } = getOAuthUrl();
        await interaction.reply(url);
        break;
      case COMMANDS.SUPPORT_COMMAND:
        await interaction.reply(
          "Contact us at https://github.com/recommendoor/recommendoor"
        );
        break;
      default:
        await interaction.reply("Unknown command");
        break;
    }
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
}
