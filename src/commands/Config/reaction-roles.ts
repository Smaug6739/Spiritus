import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";

export class ReactionRolesCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "reaction-roles",
      description: "Manage reaction-roles of the server.",
      type: "SLASH_COMMAND",
    });
  }
  async execute(interaction: CommandInteraction) {}
}
