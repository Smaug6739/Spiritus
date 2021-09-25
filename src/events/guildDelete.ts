import type Spiritus from "../main";
import { MessageEmbed } from "discord.js";
import type { Guild, TextChannel } from "discord.js";
export default class {
  spiritus: typeof Spiritus;
  constructor(spiritus: typeof Spiritus) {
    this.spiritus = spiritus;
  }
  async run(guild: Guild) {
    await this.spiritus.db.deleteGuild(guild.id);
    const embed = new MessageEmbed()
      .setAuthor("Serveur delete :")
      .setTitle(`${guild.name}`)
      .setColor("#0xFF0000")
      .addFields(
        {
          name: "Name",
          value: `${guild.name}\n(\`${guild.id}\`)`,
          inline: true,
        },
        { name: "Owner", value: `\`${guild.ownerId}\``, inline: true },
        { name: "Members :", value: `${guild.memberCount}`, inline: true }
      )
      .setTimestamp()
      .setFooter(
        `Spiritus bot logs | BOT ID : ${this.spiritus.client.user?.id}`
      );
    if (guild.icon != null) {
      embed.setThumbnail(`${guild.iconURL()}`);
    }
    (
      this.spiritus.client.channels.cache.get("721270980823220324") as
        | TextChannel
        | undefined
    )?.send({ embeds: [embed] });
  }
}
