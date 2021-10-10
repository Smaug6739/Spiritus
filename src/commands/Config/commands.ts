import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";

export class DbCmdCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "command",
      description: "Manage custom-commands from the guild.",
      type: "SLASH_COMMAND",
    });
  }
  execute() {}
}
