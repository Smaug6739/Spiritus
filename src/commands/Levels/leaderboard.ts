import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import { embed } from "../../utils";
export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "leaderboard",
      description: "The leaderboard of the guild",
      type: "SLASH_COMMAND",
      category: "Misc",
      channel: "GUILD",
    });
  }

  async execute(interaction: CommandInteraction) {
    const settings = await this.client.db.get(interaction.guildId!);
    if (!settings.expSystem)
      return interaction.replyErrorMessage(
        `The experience system is not activated on this server. To activate it use the command \`/config experience\`.`
      );
    const em = embed();
    if (interaction.guild!.iconURL())
      em.setThumbnail(`${interaction.guild!.iconURL()}`)
        .setTitle("TOP 10 ranking of guild users")
        .setColor(this.client.config.colors.embed);
    const users = await this.client.db.getUsers(interaction.guild!.id);
    const sorted = users.sort((a: any, b: any) =>
      a.experience < b.experience ? 1 : -1
    );

    for (const e of sorted.splice(0, 10)) {
      const user = await this.client.util.resolveUser(e.userID);
      em.addField(
        user.username,
        `${e.experience} experience points, level : ${e.level}`
      );
    }

    interaction.reply({ embeds: [em] });
  }
}
