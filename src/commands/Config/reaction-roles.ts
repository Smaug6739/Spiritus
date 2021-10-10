import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction, GuildEmoji } from "discord.js";
import type { ReactionRole } from "../../../index";
export class ReactionRolesCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "reaction-roles",
      description: "Manage reaction-roles of the server.",
      type: "SLASH_COMMAND",
    });
  }
  async execute(interaction: CommandInteraction) {
    const settings = await this.client.db.get(interaction.guildId!);
    switch (interaction.options.getSubcommand(false)) {
      case "add":
        if (settings.reactionroles) {
          try {
            const channelRRAdd = this.client.util.resolveChannel(
              interaction.guild!,
              interaction.options.getString("channel")!
            );
            if (!channelRRAdd)
              return interaction.replyErrorMessage(`Channel not found.`);
            if (!channelRRAdd.isText())
              return interaction.replyErrorMessage(
                "The type of the channel must be text."
              );
            const messageRRAdd = await channelRRAdd.messages.fetch(
              interaction.options.getString("message")!
            );
            if (!messageRRAdd)
              return interaction.replyErrorMessage(`interaction not found`);
            let emoteRRAdd: GuildEmoji | string =
              await this.client.util.resolveGuildEmoji(
                interaction.guild!,
                interaction.options.getString("emoji")!
              );
            if (
              !emoteRRAdd &&
              isUnicode(interaction.options.getString("emoji")!)
            )
              emoteRRAdd = interaction.options.getString("emoji")!;
            if (!emoteRRAdd)
              return interaction.replyErrorMessage(`Emoji not found.`);
            const role = this.client.util.resolveRole(
              interaction.guild!,
              interaction.options.getString("role")!
            );
            if (!role || role.id == interaction.guildId!)
              return interaction.replyErrorMessage(`Role not found.`);
            const existingReactionRole = await settings.reactionroles.find(
              (r: ReactionRole) =>
                r.emoji ==
                  (typeof emoteRRAdd !== "string" && emoteRRAdd.id
                    ? emoteRRAdd.id
                    : emoteRRAdd) &&
                r.messageId == messageRRAdd.id &&
                r.roles.includes(role.id)
            );
            if (existingReactionRole)
              return interaction.replyErrorMessage(
                `Emoji already use for this interaction.`
              );
            await messageRRAdd.react(
              typeof emoteRRAdd !== "string" && emoteRRAdd.id
                ? `${emoteRRAdd.name}:${emoteRRAdd.id}`
                : emoteRRAdd
            );
            let arrayRRAdd = settings.reactionroles;
            arrayRRAdd.push({
              channelID: channelRRAdd.id,
              messageID: messageRRAdd.id,
              emoji:
                typeof emoteRRAdd !== "string" && emoteRRAdd.id
                  ? emoteRRAdd.id
                  : emoteRRAdd,
              roleID: role.id,
            });
            await this.client.db.update(interaction.guildId!, {
              reactionroles: arrayRRAdd,
            });
            interaction.replySuccessMessage(`Reaction-role have been created.`);
          } catch (e: any) {
            if (e.message.match("Unknown message"))
              return interaction.replyErrorMessage(`Message not found`);
            else
              return interaction.replyErrorMessage(
                `An error occurred. Please try again.`
              );
          }
        } else
          interaction.replyErrorMessage(`An error occurred. Please try again.`);
        break;
      case "rem":
        try {
          const channel = this.client.util.resolveChannel(
            interaction.guild!,
            interaction.options.getString("channel")!
          );
          if (!channel.isText())
            return interaction.replyErrorMessage(
              "The type of the channel must be text."
            );
          if (!channel)
            return interaction.replyErrorMessage(`Channel not found.`);
          const messageRR = await channel.messages.fetch(
            interaction.options.getString("message")!
          );
          if (!messageRR)
            return interaction.replyErrorMessage(`interaction not found`);
          if (
            !settings.reactionroles.find(
              (r: ReactionRole) => r.messageId === messageRR.id
            )
          )
            return interaction.replyErrorMessage(
              `There is no role-reaction under this interaction.`
            );
          let emojiToRemove: GuildEmoji | string =
            await this.client.util.resolveGuildEmoji(
              interaction.guild!,
              interaction.options.getString("emoji")!
            );
          if (
            !emojiToRemove &&
            isUnicode(interaction.options.getString("emoji")!)
          )
            emojiToRemove = interaction.options.getString("emoji")!;
          if (!emojiToRemove)
            return interaction.replyErrorMessage(`Emoji not found.`);
          const role = this.client.util.resolveRole(
            interaction.guild!,
            interaction.options.getString("role")!
          );
          if (!role || role.id == interaction.guildId)
            return interaction.replyErrorMessage(
              ` Impossible de trouver ce rôle.`
            );
          this.client.db.update(interaction.guildId!, {
            $pull: {
              reactionroles: {
                channelID: channel,
                messageID: messageRR.id,
                emoji: emojiToRemove,
                roleID: role.id,
              },
            },
          });
          interaction.replySuccessMessage(`I have deleted this role-reaction.`);
        } catch (e: any) {
          if (e.interaction.match("Unknown interaction"))
            return interaction.replyErrorMessage(`interaction not found`);
          else
            return interaction.replyErrorMessage(
              `An error occurred. Please try again.`
            );
        }
        break;
      case "list":
        break;
    }
  }
}

function isUnicode(str: string) {
  for (let i = 0, n = str.length; i < n; i++) {
    if (str.charCodeAt(i) > 255) return true;
    return false;
  }
}
