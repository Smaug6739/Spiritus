import { Command } from "sheweny";
import { MessageEmbed } from "discord.js";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "help",
      description: "Get the help embed",
      type: "SLASH_COMMAND",
      category: "Misc",
    });
  }

  execute(interaction: CommandInteraction) {
    const commands = Array.from(this.client.util.getCommands());
    const categories = new Set(commands.map((command) => command.category));
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        "Liste  of commands :",
        `${this.client.user!.displayAvatarURL()}`
      )
      .addField(
        "List of commands",
        `A list of all available subcategories and their commands.\nFor more information on an order, run \`/help <command_name>\`.`
      )
      .setTimestamp()
      .setFooter(
        `Command module: Bot`,
        `${
          interaction.guild && interaction.guild.iconURL()
            ? interaction.guild.iconURL()
            : null
        }`
      );
    for (const category of categories) {
      if (!category) continue;
      const commandsInCategory = commands.filter(
        (command) => command.category === category
      );
      embed.addField(
        category.toString(),
        `${commandsInCategory
          .map((cmd) => "__" + `/` + cmd.name + " __ - " + cmd.description)
          .join(`\r\n`)}`
      );
    }
    interaction.reply({ embeds: [embed] });
  }
}
