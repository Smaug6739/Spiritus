import { readFileSync } from "fs";
import { join } from "path";
import toml from "toml";
import { CommandInteraction, Message } from "discord.js";
import mongoose from "mongoose";
import type { Config } from "../index";
import type { DatabaseProvider } from "./providers/Database";
import type { WebhookClient, ContextMenuInteraction } from "discord.js";
const config = toml.parse(
  readFileSync(join(__dirname, "../config.toml")).toString()
);

declare module "sheweny" {
  interface ShewenyClient {
    config: Config;
    db: DatabaseProvider;
    logs: WebhookClient;
  }
}

declare module "discord.js" {
  interface CommandInteraction {
    replySuccessMessage(content: string): Promise<void>;
    replyErrorMessage(content: string): Promise<void>;
    editSuccessMessage(content: string): any;
    editErrorMessage(content: string): any;
  }
}

CommandInteraction.prototype.replySuccessMessage = function (content: string) {
  return this.reply(`${config.emojis.success} ${content}`);
};
CommandInteraction.prototype.replyErrorMessage = function (content: string) {
  return this.reply(`${config.emojis.error} ${content}`);
};
CommandInteraction.prototype.editSuccessMessage = function (content: string) {
  return this.editReply(`${config.emojis.success} ${content}`);
};
CommandInteraction.prototype.editErrorMessage = function (content: string) {
  return this.editReply(`${config.emojis.error} ${content}`);
};

import Spiritus from "./client/Spiritus";

const client = new Spiritus(config);

client.login(client.config.DISCORD_TOKEN);

function connectDB() {
  mongoose.connect(config.MONGOOSE_URI, {
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity  //45000
    family: 4, // Use IPv4, skip trying IPv6
  });
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});
mongoose.connection.on("error", () => {
  console.log("Connection failed. Try reconecting in 5 seconds...");
  setTimeout(() => connectDB(), 5000);
});
client.managers.commands!.on(
  "cooldownLimit",
  (interaction: CommandInteraction | ContextMenuInteraction | Message) => {
    interaction.reply({
      content: "Please slow down",
      ephemeral: true,
    });
  }
);

connectDB();
