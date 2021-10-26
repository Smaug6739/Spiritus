import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Interaction } from "discord.js";
export class interactionCommandCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "interactionCreate", {
      description: "An interaction was created.",
      once: false,
    });
  }

  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;
    if (this.client.collections.commands!.get(interaction.commandName)) return;
    if (!interaction.guildId) return;
    const settings = await this.client.db.get(interaction.guildId);
    if (!settings || !settings.commands) return;
    for (const cmd of settings.commands) {
      if (cmd.name === interaction.commandName) {
        return interaction.reply(cmd.content);
      }
    }
  }
}
