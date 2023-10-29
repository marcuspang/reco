import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  EmbedBuilder,
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
        message.guild.id,
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
            await setWelcomeMessage(
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
          case "summarise": {
            const reply = await interaction.reply("This will take a while...");

            // const summary = await getSocialObjectsData();

            // FIXME: use envio + IPFS data instead
            const messages = await interaction.channel.messages.fetch();
            const text = messages
              .filter((m) => !m.author.bot)
              .filter((m) => Date.now() - m.createdTimestamp < 86400000)
              .map((m) =>
                JSON.stringify({
                  author: m.author.globalName,
                  content: m.content,
                })
              )
              .join(",");

            const prompt =
              " I want you to remember all of the chunk of social media data passed to you, in the form of { author: string; content: string; }. I want you to act as a objective member of the community, and use a friendly tone to summarize all the JSON-stringified objects. They are delimited by commas (not inside the object)." +
              text;

            const response =
              (await callFlockModel(prompt ?? "")) || "No response";

            reply.delete();
            if (response !== "No response") {
              const embeds = [
                new EmbedBuilder()
                  .setColor("#25E29E")
                  .setTitle("Itinerary for " + interaction.channel.name)
                  .setDescription(response),
              ];

              const next = new ButtonBuilder()
                .setCustomId("next")
                .setLabel("Next")
                .setStyle(ButtonStyle.Primary);
              const retry = new ButtonBuilder()
                .setCustomId("retry")
                .setLabel("Summarize again")
                .setStyle(ButtonStyle.Primary);
              const row = new ActionRowBuilder().addComponents(next, retry);

              await interaction.followUp({
                embeds,
                components: [row],
              });
            } else {
              await interaction.followUp(response);
            }
            break;
          }
          case "itinerary": {
            const reply = await interaction.reply("This will take a while...");

            // FIXME: use envio + IPFS data instead
            const messages = await interaction.channel.messages.fetch();
            const text = messages
              .filter((m) => !m.author.bot)
              .filter((m) => Date.now() - m.createdTimestamp < 86400000)
              .map((m) => m.content)
              .join("\n\n");

            const prompt =
              "I want you to act as a tour guide for me. You should determine which location the users in the following messages are interested in. You should return an itinerary of the locations that they might be interested in, in the following format. <time in hours and minutes> : <location/activity> and provide social media links in the history if possible. Here are the messages, delimited with 2 line breaks\n" +
              text;

            const response =
              (await callFlockModel(prompt ?? "")) || "No response";

            reply.delete();
            if (response !== "No response") {
              const embeds = [
                new EmbedBuilder()
                  .setColor("#25E29E")
                  .setTitle("Itinerary for " + interaction.channel.name)
                  .setDescription(response),
              ];

              const next = new ButtonBuilder()
                .setCustomId("next")
                .setLabel("Next")
                .setStyle(ButtonStyle.Primary);
              const store = new ButtonBuilder()
                .setCustomId("store")
                .setLabel("Store in Travel Log")
                .setStyle(ButtonStyle.Primary);
              const row = new ActionRowBuilder().addComponents(next, store);

              await interaction.followUp({
                embeds,
                components: [row],
              });
            } else {
              await interaction.followUp(response);
            }

            break;
          }
          case "governance":
            // FIXME: use envio + IPFS data instead
            const messages = await interaction.channel.messages.fetch();
            const text = messages
              .filter((m) => !m.author.bot)
              .filter((m) => Date.now() - m.createdTimestamp < 86400000)
              .map((m) => m.content)
              .join("\n\n");

            const prompt =
              "I want you to act as an impartial participant to a DAO discussion. You should determine what the main topic is through the messages and the overall consensus of the participants. You are to give a brief summary of what the discussion was about, and some important points that others agreed with. The messages will be passed to you in in strings, delimited by 2 line breaks (`\n'\n). Here is the message:\n" +
              text;

            const response =
              (await callFlockModel(prompt ?? "")) || "No response";

            reply.delete();
            if (response !== "No response") {
              const embeds = [
                new EmbedBuilder()
                  .setColor("#25E29E")
                  .setTitle("Itinerary for " + interaction.channel.name)
                  .setDescription(response),
              ];

              const yes = new ButtonBuilder()
                .setCustomId("yes")
                .setLabel("Approve")
                .setStyle(ButtonStyle.Primary);
              const no = new ButtonBuilder()
                .setCustomId("no")
                .setLabel("Disapprove")
                .setStyle(ButtonStyle.Primary);
              const row = new ActionRowBuilder().addComponents(yes, no);

              await interaction.followUp({
                embeds,
                components: [row],
              });
            } else {
              await interaction.followUp(response);
            }
            break;
          default:
            await interaction.reply("Unknown subcommand");
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
