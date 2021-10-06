import { Command, ShewenyClient } from "sheweny";
import { GuildMember } from "discord.js";
import type { CommandInteraction } from "discord.js";
import { embedMod, sendLogsChannel } from "../../utils";

export class WarnCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "warn",
      description: "Warn member of the guild",
      category: "Moderation",
      type: "SLASH_COMMAND",
      channel: "GUILD",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user to warn",
          required: true,
        },
        {
          name: "reason",
          description: "The reason of warn",
          type: "STRING",
          required: false,
        },
      ],
      userPermissions: ["BAN_MEMBERS"],
    });
  }
  async execute(interaction: CommandInteraction) {
    const settings = await this.client.db.get(interaction.guildId!);
    const member = interaction.options.getMember("user") as GuildMember;
    if (!member)
      return interaction.reply({
        content: `${this.client.config.emojis.error} User not found.`,
        ephemeral: true,
      });

    const reason: string =
      interaction.options.getString("reason") || "No reason was provided.";

    const embed = embedMod(
      member,
      interaction.user,
      this.client.config.colors.orange,
      "warn",
      { reason }
    );
    try {
      await member.send({ embeds: [embed] });
      sendLogsChannel(
        this.client,
        { guild: interaction.guild!, settings },
        { embeds: [embed] }
      );
    } catch {
      return interaction.reply({
        content: `${this.client.config.emojis.error} I can't send message to this user`,
        ephemeral: true,
      });
    }
    interaction.reply({
      content: `I have successfully warn ${member.user.tag}`,
      ephemeral: true,
    });
  }
}
