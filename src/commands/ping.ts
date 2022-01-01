import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ping",
      description: "Ping Pong",
      type: "SLASH_COMMAND",
      category: "Misc",
    });
  }

  execute(interaction: CommandInteraction) {
    const start = Date.now();
		interaction.reply('Pong !')
			.then(async () => await interaction.editReply(`Pong  BOT : \`${Date.now() - start}ms\` API : \`${this.spiritus.client.ws.ping}ms\``));
  }
}
