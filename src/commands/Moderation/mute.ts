import { Command, ShewenyClient } from "sheweny";
import { GuildMember } from "discord.js";
import ms from "ms";
import { embedMod, sendLogsChannel } from "../../utils";
import type { CommandInteraction } from "discord.js";
import type { StringValue } from "ms";

export class MuteCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "mute",
      description: "Mute a user",
      type: "SLASH_COMMAND",
      category: "Moderation",
      channel: "GUILD",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user to mute",
          required: true,
        },
        {
          name: "time",
          description: "The time of mute",
          type: "STRING",
          required: false,
        },
        {
          name: "reason",
          description: "The reason of mute",
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
    const muteTime: StringValue = interaction.options.getString(
      "time",
      false
    ) as StringValue;
    const reason =
      interaction.options.getString("reason", false) || "No reason was given";

    let muteRole = interaction.guild!.roles.cache.find(
      (r) => r.name === "Muted"
    );
    if (!member)
      return interaction.reply({
        content: `${this.client.config.emojis.error} User not found`,
        ephemeral: true,
      });

    if (!muteRole) {
      muteRole = await interaction.guild!.roles.create({
        name: "Muted",
        color: "#2f3136",
        permissions: [],
      });
      interaction.guild!.channels.cache.forEach(async (channel) => {
        if (channel.isThread()) return;
        await channel.permissionOverwrites.edit(muteRole!, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false,
        });
      });
    }

    const embed = embedMod(
      member,
      interaction.user,
      this.client.config.colors.red,
      "mute",
      { reason, guild: interaction.guild!, time: muteTime }
    );

    await member.roles.add(muteRole.id);
    interaction.reply({
      content: `${this.client.config.emojis.success} <@${
        member.id
      }> is muted for ${muteTime ? ms(ms(muteTime)) : "ever"}.`,
      ephemeral: true,
    });

    if (muteTime)
      setTimeout(() => {
        member.roles.remove(muteRole!.id);
      }, ms(muteTime));
    sendLogsChannel(
      this.client,
      { guild: interaction.guild!, settings },
      { embeds: [embed] }
    );
  }
}
