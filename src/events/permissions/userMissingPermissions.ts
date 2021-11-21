import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
export class interactionCommandCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "userMissingPermissions", {
      description: "User missing permissions.",
      once: false,
      emitter: client.managers.commands,
    });
  }

  async execute(interaction: CommandInteraction, missing: string) {
    interaction.reply({
      content: `You don't have ${missing} permissions`,
      ephemeral: true,
    });
  }
}
