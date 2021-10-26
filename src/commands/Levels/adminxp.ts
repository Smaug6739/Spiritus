import { Command } from "sheweny";
import { addExperience, removeExperience } from "../../utils";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction, TextChannel } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "adminxp",
      description: "Manage the xp of the guild",
      type: "SLASH_COMMAND",
      category: "Misc",
      channel: "GUILD",
      options: [
        {
          name: "add",
          description: "Add exp to a user.",
          type: "SUB_COMMAND",
          options: [
            {
              name: "user",
              description: "User to add experience",
              type: "USER",
              required: true,
            },
            {
              name: "experience",
              description: "Number of experience points to add",
              type: "INTEGER",
              required: true,
            },
          ],
        },
        {
          name: "rem",
          description: "Remove exp to a user.",
          type: "SUB_COMMAND",
          options: [
            {
              name: "user",
              description: "User to add experience",
              type: "USER",
              required: true,
            },
            {
              name: "experience",
              description: "Number of experience points to remove",
              type: "INTEGER",
              required: true,
            },
          ],
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const settings = await this.client.db.get(interaction.guildId!);
    if (!settings.expSystem)
      return interaction.replyErrorMessage(
        `The experience system is not activated on this server. To activate it use the command \`/config exp-system\`.`
      );
    const user = await this.client.util.resolveUser(
      interaction.options.get("user")!.value as string
    );
    if (!user) return interaction.replyErrorMessage("User not found.");
    if (user.bot)
      return interaction.replyErrorMessage("Please chose a valid user.");
    const expChange = interaction.options.getInteger("experience")!;
    const dbUser = await this.client.db.getUser(interaction.guild!.id, user.id);
    switch (interaction.options.getSubcommand(false)) {
      case "add":
        const newExpAdd = await addExperience(
          this.client,
          interaction.channel as TextChannel,
          dbUser,
          expChange,
          settings
        );
        interaction.replySuccessMessage(
          `User experience is now \`${newExpAdd}\`.`
        );
        break;
      case "rem":
        const newExpRemove = await removeExperience(
          this.client,
          dbUser,
          expChange
        );
        interaction.replySuccessMessage(
          `User experience is now \`${newExpRemove}\`.`
        );
        break;
    }
  }
}
