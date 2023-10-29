import {
  Client,
  Events,
  GatewayIntentBits,
  MessageType,
  Partials,
} from "discord.js";
import { COMMANDS } from "../scripts/commands.js";
import { interactContent, uploadData } from "./contracts.js";
import { getDiscordUserAddress } from "./database.js";
import { getOAuthUrl } from "./discord.js";
import { callFlockModel } from "./flock.js";
import { getEvents, getSocialObjectsData, uploadEvent } from "./lighthouse.js";
import { getWelcomeMessage, setWelcomeMessage } from "./database.js";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
  ],
  partials: [
    Partials.Message,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.User,
  ],
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

    if (message.author.bot) return;
    if (message.type === MessageType.UserJoin) {
      const welcomeMessage = await getWelcomeMessage(
        member.guild.id,
        channel.id
      );
      if (!welcomeMessage || !welcomeMessage.isEnabled) {
        return;
      }
      await channel.send(welcomeMessage.message);
      return;
    }

    const messageStruct = {
      content: message.content,
      author: message.author.id,
      channelId: message.channelId,
      guildId: message.guildId,
    };

    const result = await uploadEvent(
      messageStruct,
      message.channelId,
      message.guildId
    );

    const address = await getDiscordUserAddress(message.author.username);
    if (!address) {
      console.log("User address not found");
      return;
    }

    await uploadData(address, result.Hash, message.channelId);
  });

  client.on(Events.GuildMemberAdd, async (member) => {
    const channel = member.guild.channels.cache.find(
      (ch) => ch.name === "general"
    );
    const welcomeMessage = await getWelcomeMessage(member.guild.id, channel.id);
    if (!welcomeMessage || !welcomeMessage.isEnabled) {
      return;
    }
    await channel.send(welcomeMessage.message);
  });

  client.on(Events.MessageReactionAdd, async (reaction, user) => {
    console.log(
      `Reaction ${reaction.emoji.name} added by ${user.tag} to message ${reaction.message.id}`
    );

    if (message.author.bot) return;
    const messageStruct = {
      content: `${user.tag} reacted with ${reaction.emoji.name} to message ${reaction.message}`,
      author: message.author.id,
      channelId: message.channelId,
      guildId: message.guildId,
    };

    const result = await uploadEvent(
      messageStruct,
      message.channelId,
      message.guildId
    );
    console.log("Event uploaded to IPFS:", result);

    const address = await getDiscordUserAddress(user.globalName);
    if (!address) {
      console.log("User address not found");
      return;
    }

    await interactContent(address, result.Hash, "react");
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;
    switch (commandName) {
      case COMMANDS.HELP_COMMAND: {
        await interaction.reply(
          "Need help? Contact us on `https://github.com/recommendoor/recommendoor`"
        );
        break;
      }
      case COMMANDS.CONFIGURE_COMMAND: {
        const subcommandName = options.getSubcommand();
        switch (subcommandName) {
          case "dm_prompt":
            const welcomeMessage = await getWelcomeMessage(
              interaction.guildId,
              interaction.channelId
            );
            if (!welcomeMessage) {
              await interaction.reply("DM prompt is not set");
              break;
            }
            await setWelcomeMessage(
              interaction.guildId,
              interaction.channelId,
              welcomeMessage.message,
              !welcomeMessage.isEnabled
            );
            await interaction.reply(
              `DM prompt is now ${
                !welcomeMessage.isEnabled ? "`enabled`" : "`disabled`"
              }`
            );
            break;
          case "dm_message":
            const newWelcomeMessage = options.getString("message");
            setWelcomeMessage(
              interaction.guildId,
              interaction.channelId,
              newWelcomeMessage
            );
            await interaction.reply(
              `DM message is now: \`${newWelcomeMessage}\``
            );
            break;
          case "role":
            const user = options.getUser("user");
            const role = options.getRole("role");
            if (!role) {
              await interaction.reply(`Role "${role}" not found`);
              return;
            }
            const member = interaction.guild.members.cache.get(user.id);
            console.log({ member });
            if (!member) {
              await interaction.reply(`User "${user.tag}" not found`);
              return;
            }

            await member.roles.add(role);
            await interaction.reply(
              `Role "${role.name}" has been added to user "${user.tag}"`
            );
            break;
          default:
            await interaction.reply("Unknown subcommand");
            break;
        }
        break;
      }
      case COMMANDS.INVITE_COMMAND: {
        await interaction.reply(
          "Click the link to invite me to your server" +
            `https://discord.com/api/oauth2/authorize?client_id=${
              process.env.DISCORD_CLIENT_ID
            }&permissions=1085620615232&redirect_uri=${encodeURIComponent(
              process.env.DISCORD_REDIRECT_URI
            )}&response_type=code&scope=guilds%20activities.read%20applications.entitlements%20bot%20guilds.join`
        );
        break;
      }
      case COMMANDS.VERIFY_COMMAND: {
        const { state: _, url } = getOAuthUrl();
        await interaction.reply(url);
        break;
      }
      case COMMANDS.SUPPORT_COMMAND: {
        await interaction.reply(
          "Contact us at https://github.com/recommendoor/recommendoor"
        );
        break;
      }
      case COMMANDS.GENERATE_COMMAND: {
        const subcommandName = options.getSubcommand();
        switch (subcommandName) {
          case "summarise":
            const reply = await interaction.reply("This will take a while...");

            const summary = await getSocialObjectsData();

            reply.delete();
            await interaction.followUp("Summary of the channel: " + summary);
            break;
          case "itinerary":
            await interaction.reply("Coming soon...");
            break;
          case "governance":
            break;
          default:
            await interaction.reply("Coming soon...");
            break;
        }
        break;
      }
      // DEBUG COMMANDS
      case COMMANDS.PROMPT_COMMAND: {
        const prompt = options.getString("prompt");
        const reply = await interaction.reply("Awaiting for response...");

        const response = (await callFlockModel(prompt ?? "")) || "No response";

        await reply.delete();
        await interaction.followUp(response);
        break;
      }
      case COMMANDS.LIST_EVENTS_COMMAND: {
        const events = await getEvents();
        const eventCids = events.fileList.map((event) => event.cid);
        await interaction.reply(`Events: \`${JSON.stringify(eventCids)}\``);
        break;
      }
      case COMMANDS.TEST_COMMAND: {
        await interaction.reply("Hello World");
        break;
      }
      default:
        await interaction.reply("Unknown command");
        break;
    }
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
}
