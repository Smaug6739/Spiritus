import { Command } from "sheweny";
import { MessageEmbed } from "discord.js";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import type { CommandDB } from "../../../index";
export class DbCmdCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "command",
      description: "Manage custom-commands from the guild.",
      type: "SLASH_COMMAND",
      channel: "GUILD",
      options: [
        {
          name: "add",
          description: "Create command on the guild.",
          type: "SUB_COMMAND",
          options: [
            {
              name: "name",
              description: "Name of command.",
              type: "STRING",
              required: true,
            },
            {
              name: "description",
              description: "Description of command.",
              type: "STRING",
              required: true,
            },
            {
              name: "value",
              description: "Value of command.",
              type: "STRING",
              required: true,
            },
          ],
        },
        {
          name: "rem",
          description: "Remove command of the guild.",
          type: "SUB_COMMAND",
          options: [
            {
              name: "name",
              description: "Name of command.",
              type: "STRING",
              required: true,
            },
          ],
        },
      ],
    });
  }
  async execute(interaction: CommandInteraction) {
    const settings = await this.client.db.get(interaction.guildId!);
    switch (interaction.options.getSubcommand(false)) {
      case "list":
        if (settings.commands) {
          const embed = new MessageEmbed()
            .setTitle(
              `List of custom commands of the guid ${interaction.guild!.name}`
            )
            .setColor(this.client.config.colors.embed);
          if (interaction.guild!.iconURL())
            embed.setThumbnail(`${interaction.guild!.iconURL()}`);
          settings.commands.forEach((e: CommandDB) => {
            embed.addField(`\u200b`, `Command : \`${e.name}\``, false);
          });
          interaction.channel!.send({ embeds: [embed] });
        } else
          return interaction.replyErrorMessage(
            `No commands found on this guild.`
          );
        break;
      case "add":
        try {
          const commandsOfGuild = await interaction.guild!.commands.fetch();
          if (commandsOfGuild && commandsOfGuild.size >= 100)
            return interaction.replyErrorMessage(
              "The application can have at most 100 commands."
            );
          const name = interaction.options.getString("name")!.toLowerCase();
          const description = interaction.options.getString("description")!;
          const content = interaction.options.getString("value")!;
          if (this.client.collections.commands!.get(name))
            return interaction.replyErrorMessage(
              "This name is a reserved name."
            );
          if (settings.commands) {
            if (settings.commands.length > 19)
              return interaction.replyErrorMessage(
                `You have reached the maximum number of custom commands for this guild`
              );
            const customCommand = settings.commands.find(
              (e: CommandDB) => e.name == name
            );
            if (customCommand)
              return interaction.replyErrorMessage(
                `This command already exist on this guild.`
              );
          }
          if (name.length > 32)
            return interaction.replyErrorMessage(
              `name of command is too long. `
            );
          if (description.length > 100)
            return interaction.replyErrorMessage(
              `Description of command is too long. `
            );
          if (content.length > 2000)
            return interaction.replyErrorMessage(
              `Content of command is too long. `
            );
          const cg = await interaction.guild!.commands.create({
            name,
            description,
          });
          const array = settings.commands;
          array.push({ id: cg.id, name: name, content: content });
          await this.client.db.update(interaction.guildId!, {
            commands: array,
          });
          interaction.replySuccessMessage(
            `I have created the command \`${name}\`.`
          );
        } catch (e) {
          interaction.replyErrorMessage(`An error occured please try again.`);
        }
        break;
      case "rem":
        const name = interaction.options.getString("name")!.toLowerCase();
        const cmdDB = settings.commands.find((e: CommandDB) => e.name == name);
        const cmd = await interaction.guild!.commands.fetch(cmdDB.id);

        if (cmd) {
          cmd.delete();
          interaction.replySuccessMessage(`Command succefuly deleted.`);
        } else interaction.replyErrorMessage(`Command not found.`);

        if (!settings.commands) return;
        if (!cmdDB) return;
        this.client.db.update(interaction.guildId!, {
          $pull: { commands: { name: name } },
        });
        break;
    }
  }
}
