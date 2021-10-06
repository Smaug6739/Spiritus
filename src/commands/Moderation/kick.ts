import { Command, ShewenyClient } from "sheweny";
import { GuildMember } from "discord.js";
import type { CommandInteraction } from "discord.js";
import { embedMod, sendLogsChannel } from "../../utils";

export class KickCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "kick",
      description: "Kick member from the guild",
      type: "SLASH_COMMAND",
      category: "Moderation",
      channel: "GUILD",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user to kick",
          required: true,
        },
        {
          name: "reason",
          description: "The reason of kick",
          type: "STRING",
          required: false,
        },
      ],
      userPermissions: ["KICK_MEMBERS"],
      clientPermissions: ["KICK_MEMBERS"],
    });
  }
  async execute(interaction: CommandInteraction) {
    const settings = await this.client.db.get(interaction.guildId!);
    const member = interaction.options.getMember("user", true) as GuildMember;
    const reason =
      interaction.options.getString("reason", false) || "No reason was given";
    if (!member)
      return interaction.reply({
        content: `${this.client.config.emojis.error} User not found`,
        ephemeral: true,
      });

    if (
      (interaction.member as GuildMember).roles.highest.comparePositionTo(
        member.roles.highest
      ) <= 0
    )
      return interaction.reply({
        content: `${this.client.config.emojis.error} You don't have the permission for this`,
        ephemeral: true,
      });

    const embed = embedMod(
      member,
      interaction.user,
      this.client.config.colors.red,
      "kick",
      { reason, guild: interaction.guild! }
    );
    if (member.kickable) {
      try {
        await member.send({ embeds: [embed] });
      } finally {
        member.kick(reason).then(() => {
          interaction.reply({
            content: `${member.user.tag} is kicked`,
            ephemeral: true,
          });
          sendLogsChannel(
            this.client,
            { guild: interaction.guild!, settings },
            { embeds: [embed] }
          );
        });
      }
    } else
      return interaction.reply({
        content: `${this.client.config.emojis.error} I can't kick this user`,
        ephemeral: true,
      });
  }
}
