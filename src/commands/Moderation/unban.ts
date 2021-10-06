import { Command, ShewenyClient } from "sheweny";
import { User } from "discord.js";
import type { CommandInteraction } from "discord.js";
import { embedMod, sendLogsChannel } from "../../utils";

export class UnbanCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "unban",
      description: "Unban user in the guild",
      type: "SLASH_COMMAND",
      category: "Moderation",
      channel: "GUILD",
      options: [
        {
          name: "user",
          type: "STRING",
          description: "The user to unban",
          required: true,
        },
      ],
      userPermissions: ["MANAGE_GUILD"],
      clientPermissions: ["BAN_MEMBERS"],
    });
  }
  async execute(interaction: CommandInteraction) {
    const settings = await this.client.db.get(interaction.guildId!);
    const user: User = await this.client.util.resolveUser(
      interaction.options.getString("user", true)
    );
    if (!user)
      return interaction.reply({
        content: `${this.client.config.emojis.error} User not found.`,
        ephemeral: true,
      });

    await interaction.guild!.members.unban(user);

    const embed = embedMod(
      user,
      interaction.user,
      this.client.config.colors.green,
      "unban"
    );
    await interaction.reply({ embeds: [embed], ephemeral: true });

    sendLogsChannel(
      this.client,
      { guild: interaction.guild!, settings },
      { embeds: [embed] }
    );
  }
}
