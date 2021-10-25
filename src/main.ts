import { readFileSync } from "fs";
import { join } from "path";
import toml from "toml";
import { CommandInteraction } from "discord.js";
import mongoose from "mongoose";
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
connectDB();
