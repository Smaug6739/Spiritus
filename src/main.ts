import { readFileSync } from "fs";
import { join } from "path";
import toml from "toml";
import { CommandInteraction } from "discord.js";
import type { Config } from "../index";
import type { DatabaseProvider } from "./providers/Database";
const config = toml.parse(
  readFileSync(join(__dirname, "../config.toml")).toString()
);

declare module "sheweny" {
  interface ShewenyClient {
    config: Config;
    db: DatabaseProvider;
  }
}

declare module "discord.js" {
  interface CommandInteraction {
    replySuccessMessage(content: string): any;
    replyErrorMessage(content: string): any;
  }
}

CommandInteraction.prototype.replySuccessMessage = function (content: string) {
  return this.reply(`${config.emojis.success} ${content}`);
};
CommandInteraction.prototype.replyErrorMessage = function (content: string) {
  return this.reply(`${config.emojis.error} ${content}`);
};

import Spiritus from "./client/Spiritus";

const client = new Spiritus(config);

client.login(client.config.DISCORD_TOKEN);
