import { Intents, WebhookClient } from "discord.js";
import { ShewenyClient } from "sheweny";
import { DatabaseProvider } from "../providers";
import type { Config } from "../../index";

export default class Spiritus extends ShewenyClient {
  public config: Config;
  public db: DatabaseProvider;
  public logs: WebhookClient;
  constructor(config: Config) {
    super({
      admins: config.admins,
      mode: config.mode,
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
      managers: {
        commands: {
          directory: "./commands",
          guildId: config.guildId?.length ? config.guildId : undefined,
          autoRegisterApplicationCommands: true,
          loadAll: true,
          default: {
            category: "Other",
            channel: "GUILD",
            cooldown: 3,
          },
        },
        events: {
          directory: "./events",
          loadAll: true,
        },
      },
    });
    this.config = config;
    this.db = new DatabaseProvider();
    this.logs = new WebhookClient({ url: config.logs });
  }
}
