import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { MessageReaction, User } from "discord.js";
import type { rr } from "../../../index";
export class ReactionRemove extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageReactionRemove", {
      description: "Message reaction removed",
    });
  }

  async execute(messageReaction: MessageReaction, user: User) {
    const message = messageReaction.message;
    const member = message.guild!.members.cache.get(user.id);
    const emoji = messageReaction.emoji.name;
    const emojiID = messageReaction.emoji.id;
    if (!member) return;
    if (member.user.bot) return;
    const settings = await this.client.db.get(message.guild!.id);
    if (!settings) return;
    settings.reactionroles.forEach((element: rr) => {
      if (
        element.messageID === `${message.id}` &&
        element.channelID === `${message.channel.id}`
      ) {
        if (element.emoji == `${emojiID}` || element.emoji == `${emoji}`) {
          const roleToAdd = message.guild!.roles.cache.get(`${element.roleID}`);
          if (!roleToAdd) return;
          if (
            message.guild!.me!.roles.highest.comparePositionTo(roleToAdd) <= 0
          )
            return;
          member.roles.remove(roleToAdd);
        }
      }
    });
  }
}
