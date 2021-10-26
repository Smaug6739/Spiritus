import { Command, ShewenyClient } from "sheweny";
import { GuildMember } from "discord.js";
import type { CommandInteraction } from "discord.js";
import { sendLogsChannel, embedMod } from "../../utils";
export class BanCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ban",
      description: "Ban member from the guild",
      type: "SLASH_COMMAND",
      category: "Moderation",
      channel: "GUILD",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user to ban",
          required: true,
        },
        {
          name: "reason",
          description: "The reason of ban",
          type: "STRING",
          required: false,
        },
      ],
      userPermissions: ["BAN_MEMBERS"],
      clientPermissions: ["BAN_MEMBERS"],
    });
  }
  async execute(interaction: CommandInteraction) {
    const settings = await this.client.db.get(interaction.guildId!);
    const reason =
      interaction.options.getString("reason", false) ||
      "No reason was provided.";

    const member = interaction.options.getMember("user", true) as GuildMember;
    if (!member)
      return interaction.reply({
        content: `${this.client.config.emojis.error} User not found`,
        ephemeral: true,
      });

    const banEmbed = embedMod(
      member,
      interaction.user,
      this.client.config.colors.red,
      "ban",
      { reason, guild: interaction.guild! }
    );
    if (member.bannable) {
      try {
        await member.send({ embeds: [banEmbed] });
      } finally {
        member.ban({ reason }).then(async () => {
          await interaction.reply({
            content: `${member.user.tag} is banned`,
            ephemeral: true,
          });
          sendLogsChannel(
            this.client,
            { guild: interaction.guild!, settings },
            { embeds: [banEmbed] }
          );
        });
      }
    } else
      return interaction.reply({
        content: `${this.client.config.emojis.error} I can't ban this user`,
        ephemeral: true,
      });
  }
}
