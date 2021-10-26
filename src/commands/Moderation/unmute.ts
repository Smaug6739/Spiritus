import { Command, ShewenyClient } from "sheweny";
import { GuildMember } from "discord.js";
import type { CommandInteraction } from "discord.js";
import { embedMod, sendLogsChannel } from "../../utils";

export class UnmuteCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "unmute",
      description: "Unmute user in the guild",
      type: "SLASH_COMMAND",
      category: "Moderation",
      channel: "GUILD",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user to unmute",
          required: true,
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

    const muteRole = interaction.guild!.roles.cache.find(
      (r) => r.name === "Muted"
    );
    if (!muteRole)
      return interaction.reply({
        content: `${this.client.config.emojis.error} No mute role.`,
        ephemeral: true,
      });
    if (!member.roles.cache.has(muteRole.id))
      return interaction.reply({
        content: `${this.client.config.emojis.error} This user is not muted.`,
        ephemeral: true,
      });

    member.roles.remove(muteRole.id);
    await interaction.reply({
      content: `${member.user.tag} is now unmuted`,
      ephemeral: true,
    });

    const embed = embedMod(
      member,
      interaction.user,
      this.client.config.colors.green,
      "unmute"
    );
    sendLogsChannel(
      this.client,
      { guild: interaction.guild!, settings },
      { embeds: [embed] }
    );
  }
}
