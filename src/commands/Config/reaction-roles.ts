import { Command } from "sheweny";
import { CommandInteraction, GuildEmoji, TextChannel } from "discord.js";
import { embed } from "../../utils";
import type { ReactionRole } from "../../../index";
import type { ShewenyClient } from "sheweny";
import type { rr } from "../../../index";
export class ReactionRolesCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "reaction-roles",
      description: "Manage reaction-roles of the server.",
      type: "SLASH_COMMAND",
      options: [
        {
          name: "add",
          description: "Add a reaction-role to a message.",
          type: "SUB_COMMAND",
          options: [
            {
              name: "channel",
              description: "Channel to add message reaction.",
              type: "CHANNEL",
              required: true,
              channelTypes: ["GUILD_TEXT"],
            },
            {
              name: "message",
              description: "ID of message to react.",
              type: "STRING",
              required: true,
            },
            {
              name: "emoji",
              description: "The emoji.",
              type: "STRING",
              required: true,
            },
            {
              name: "role",
              description: "The role.",
              type: "ROLE",
              required: true,
            },
          ],
        },
        {
          name: "rem",
          description: "Remove role-reaction in the guild.",
          type: "SUB_COMMAND",
          options: [
            {
              name: "channel",
              description: "Channel to remove message reaction.",
              type: "CHANNEL",
              required: true,
              channelTypes: ["GUILD_TEXT"],
            },
            {
              name: "message",
              description: "ID of message remove react.",
              type: "STRING",
              required: true,
            },
            {
              name: "emoji",
              description: "The emoji.",
              type: "STRING",
              required: true,
            },
            {
              name: "role",
              description: "The role.",
              type: "ROLE",
              required: true,
            },
          ],
        },
        {
          name: "list",
          description: "List the roles reactions of the guild.",
          type: "SUB_COMMAND",
        },
      ],
    });
  }
  async execute(interaction: CommandInteraction) {
    const settings = await this.client.db.get(interaction.guildId!);

    switch (interaction.options.getSubcommand(false)) {
      case "add":
        if (settings.reactionroles) {
          try {
            const channelRRAdd = interaction.options.getChannel(
              "channel",
              false
            ) as TextChannel;
            if (!channelRRAdd)
              return interaction.replyErrorMessage(`Channel not found.`);

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
            const role = interaction.options.getRole("role");
            if (!role || role.id == interaction.guildId!)
              return interaction.replyErrorMessage(`Role not found.`);
            const existingReactionRole = await settings.reactionroles.find(
              (r: ReactionRole) =>
                r.emoji ==
                  (typeof emoteRRAdd !== "string" && emoteRRAdd.id
                    ? emoteRRAdd.id
                    : emoteRRAdd) &&
                r.messageID == messageRRAdd.id &&
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
              D: messageRRAdd.id,
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
            if (e.message?.match("Unknown message"))
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
          const channel = interaction.options.getChannel(
            "channel"
          ) as TextChannel;
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
            return interaction.replyErrorMessage(`Message not found`);
          if (
            !settings.reactionroles.find(
              (r: ReactionRole) => r.messageID === messageRR.id
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
          const role = interaction.options.getRole("role");
          if (!role || role.id == interaction.guildId)
            return interaction.replyErrorMessage(`Role not found.`);
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
          console.log(e);

          if (e.message?.match("Unknown message"))
            return interaction.replyErrorMessage(`Message not found`);
          else
            return interaction.replyErrorMessage(
              `An error occurred. Please try again.`
            );
        }
        break;
      case "list":
        let content = "No reaction-role in this guild";
        if (settings && settings.reactionroles) {
          content = `Emoji | Channel | Role | Message\n${settings.reactionroles
            .map(
              (r: rr) =>
                r.emoji +
                " : <#" +
                r.channelID +
                "> <@&" +
                r.roleID +
                "> " +
                r.messageID
            )
            .join("\n")}`;
        }
        if (content.length > 4096) content = "Too much data for a message";
        interaction.reply({
          embeds: [
            embed()
              .setTitle("List of reaction-roles :")
              .setDescription(content),
          ],
        });
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
