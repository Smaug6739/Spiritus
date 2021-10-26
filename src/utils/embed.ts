import { MessageEmbed, GuildMember } from "discord.js";
import ms from "ms";
import type { ColorResolvable, Guild, User } from "discord.js";
import type { StringValue } from "ms";
export function embed() {
  return new MessageEmbed().setTimestamp().setFooter("Spiritus bot");
}

export function embedMod(
  member: GuildMember | User | undefined,
  author: User,
  color: ColorResolvable,
  action: string,
  options?: {
    reason?: string;
    guild?: Guild;
    time?: StringValue;
    messages?: number;
  }
) {
  let description = `**Action**: ${action}`;
  if (options?.reason) description += `\n**Reason**: ${options.reason}`;
  if (options?.time) description += `\n**Time**: ${ms(ms(options.time))}`;
  if (options?.messages)
    description += `\n**Messages**: ${options.messages} messages`;
  if (options?.guild) description += `\n**Guild**: ${options.guild.name}`;

  const embed = new MessageEmbed()
    .setColor(color)
    .setDescription(description)
    .setTimestamp()
    .setFooter(
      author.username,
      author.displayAvatarURL({ dynamic: true, format: "png", size: 512 })
    );

  if (member) {
    const m = member instanceof GuildMember ? member.user : member;
    embed.setAuthor(
      `${m.tag} (${m.id})`,
      m.displayAvatarURL({ dynamic: true, format: "png", size: 512 })
    );
  }

  return embed;
}
