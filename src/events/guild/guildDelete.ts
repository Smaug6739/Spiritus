import { Event } from "sheweny";
import { MessageEmbed } from "discord.js";
import type { Guild } from "discord.js";
import type { ShewenyClient } from "sheweny";

export class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildDelete", {
      description: "Bot left a guild",
      once: false,
    });
  }

  execute(guild: Guild) {
    const embed = new MessageEmbed()
      .setAuthor("Bot left a guild :")
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
      .setFooter("Spiritus bot logs");
    if (guild.icon) {
      embed.setThumbnail(`${guild.iconURL()}`);
    }
    this.client.logs.send({ embeds: [embed] });
  }
}
