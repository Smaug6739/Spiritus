import { Command } from "sheweny";
import { isValidMessage } from "../../utils";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "config",
      description: "Config the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
      channel: "GUILD",
      options: [
        {
          name: "exp-system",
          description: "Enable or disable the experience system in the guild.",
          type: "SUB_COMMAND",
        },
        {
          name: "exp-channel",
          description:
            "Change the logs channel of experience system (no argument for no channel).",
          type: "SUB_COMMAND",
          options: [
            {
              name: "channel",
              description: "The logs channel.",
              type: "CHANNEL",
              channelTypes: ["GUILD_TEXT"],
            },
          ],
        },
        {
          name: "exp-message",
          description:
            "Change the experience message (variables: {{User}} {{Level}} {{Experience}}).",
          type: "SUB_COMMAND",
          options: [
            {
              name: "message",
              description: "The message.",
              type: "STRING",
              required: true,
            },
          ],
        },
        {
          name: "welcome-channel",
          description:
            "Change the logs channel of welcome system (no argument for disable).",
          type: "SUB_COMMAND",
          options: [
            {
              name: "channel",
              description: "The logs channel.",
              type: "CHANNEL",
              channelTypes: ["GUILD_TEXT"],
            },
          ],
        },
        {
          name: "welcome-message",
          description:
            "Change the logs message of welcome system (variables: {{User}} {{Guild}}).",
          type: "SUB_COMMAND",
          options: [
            {
              name: "message",
              description: "The message (variables: {{User}} {{Guild}}).",
              type: "STRING",
              required: true,
            },
          ],
        },
        {
          name: "bye-channel",
          description:
            "Change the logs channel of bye system (no argument for disable).",
          type: "SUB_COMMAND",
          options: [
            {
              name: "channel",
              description: "The logs channel.",
              type: "CHANNEL",
              channelTypes: ["GUILD_TEXT"],
            },
          ],
        },
        {
          name: "bye-message",
          description:
            "Change the logs message of bye system (variables: {{User}} {{Guild}}).",
          type: "SUB_COMMAND",
          options: [
            {
              name: "message",
              description: "The message (variables: {{User}} {{Guild}}).",
              type: "STRING",
              required: true,
            },
          ],
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const settings = await this.client.db.get(interaction.guildId!);
    if (!settings) return interaction.replyErrorMessage("An error occurred");
    switch (interaction.options.getSubcommand()) {
      case "exp-system":
        await this.client.db.update(interaction.guildId!, {
          expSystem: !settings.expSystem,
        });
        interaction.replySuccessMessage("The system has been updated.");
        break;
      case "exp-message":
        const expMessage = interaction.options.getString("message");
        if (!isValidMessage(expMessage))
          return interaction.replyErrorMessage("Invalid message");
        await this.client.db.update(interaction.guildId!, {
          expMessage,
        });
        interaction.replySuccessMessage("The message has been updated.");
        break;
      case "exp-channel":
        const expChannel = interaction.options.getChannel("channel")?.id;
        await this.client.db.update(interaction.guildId!, {
          expChannel,
        });
        interaction.replySuccessMessage("The channel has been updated.");
        break;
      case "welcome-channel":
        const welcomeChannel = interaction.options.getChannel("channel")?.id;
        await this.client.db.update(interaction.guildId!, { welcomeChannel });
        interaction.replySuccessMessage("The channel has been updated.");
        break;
      case "welcome-message":
        const welcomeMessage = interaction.options.getString("message");
        if (!isValidMessage(welcomeMessage))
          return interaction.replyErrorMessage("Invalid message");
        await this.client.db.update(interaction.guildId!, { welcomeMessage });
        interaction.replySuccessMessage("The message has been updated.");
        break;
      case "bye-channel":
        const byeChannel = interaction.options.getChannel("channel")?.id;
        await this.client.db.update(interaction.guildId!, { byeChannel });
        interaction.replySuccessMessage("The channel has been updated.");
        break;
      case "bye-message":
        const byeMessage = interaction.options.getString("message");
        if (!isValidMessage(byeMessage))
          return interaction.replyErrorMessage("Invalid message");
        await this.client.db.update(interaction.guildId!, { byeMessage });
        interaction.replySuccessMessage("The message has been updated.");
        break;
    }
  }
}
