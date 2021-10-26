import { Intents } from "discord.js";
import { ShewenyClient } from "sheweny";
import { DatabaseProvider } from "../providers";

import type { Config } from "../../index";

export default class Spiritus extends ShewenyClient {
  public config: Config;
  constructor(config: Config) {
    super({
      allowedMentions: {
        parse: ["roles", "users"],
      },
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
      ],
      partials: ["CHANNEL", "MESSAGE", "REACTION", "USER", "GUILD_MEMBER"],
      presence: {
        status: "online",
        activities: [
          {
            name: "Spiritus bot",
            type: "WATCHING",
          },
        ],
      },
      handlers: {
        commands: {
          directory: "./commands",
          guildId: "900408085800157185",
        },
        events: {
          directory: "./events",
        },
        // buttons: {
        //   directory: "./interactions/buttons",
        // },
        // selectMenus: {
        //   directory: "./interactions/selectMenus",
        // },
      },
    });
    this.config = config;
    this.db = new DatabaseProvider();
  }
}
