import { Event } from "sheweny";
import { isValidMessage } from "../../utils";
import { DataReplacer } from "data-replacer";
import type { ShewenyClient } from "sheweny";
import type { GuildMember } from "discord.js";

export class GuildMemberRemove extends Event {
  Replacer: DataReplacer;
  constructor(client: ShewenyClient) {
    super(client, "guildMemberRemove", {
      description: "A member just left the guild",
      once: false,
    });
    this.Replacer = new DataReplacer({
      caseInsensitive: true,
      multipleReplaces: true,
      required: false,
    });
  }

  async execute(member: GuildMember): Promise<void> {
    const settings = await this.client.db.get(member.guild.id);
    if (!settings || !settings.byeMessage) return;
    const channel = await this.client.util.resolveChannel(
      member.guild,
      settings.byeChannel
    );
    if (!channel) return;
    const message = settings.byeMessage;
    if (!isValidMessage(message)) return;
    if (!channel.isText()) return;
    const replace = {
      "{{User}}": `<@${member.id}>`,
      "{{Guild}}": member.guild.name,
    };
    channel.send({ content: this.Replacer.replace(message, replace) });
  }
}
