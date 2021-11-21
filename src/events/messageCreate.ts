import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Message, TextChannel } from "discord.js";
import { addExperience } from "../utils";
export class MessageCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageCreate", {
      description: "A message is created",
    });
  }

  async execute(message: Message) {
    if (message.author.bot || message.system) return;
    if (!message.guild) return;
    const settings = await this.client.db.get(message.guildId!);
    if (!settings || !settings.expSystem) return;
    const expCd = Math.floor(Math.random() * 19) + 1;
    const expToAdd = Math.floor(Math.random() * 25) + 10;
    if (expCd >= 10 && expCd <= 15) {
      const dbUser = await this.client.db.getUser(
        message.guildId!,
        message.author.id
      );
      addExperience(
        this.client,
        message.channel as TextChannel,
        dbUser,
        expToAdd,
        settings
      );
    }
  }
}
