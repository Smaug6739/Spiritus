import type { Schema } from "mongoose";

export interface Config {
  DISCORD_TOKEN: string;
  MONGOOSE_URI: string;
  admins: string[];
  logs: string;
  owner: {
    id: string;
    username: string;
  };
  defaultSettings: {
    guildName: string;
    prefix: string;
    logChannel: string;
    welcomeMessage: string;
    rankcard: string;
    invitations: boolean;
    kickauto: boolean;
  };
  colors: {
    embed: string;
    red: string;
    orange: string;
    green: string;
  };
  emojis: {
    boost: string;
    info: string;
    voice: string;
    channel: string;
    success: string;
    error: string;
    loading: string;
    arrow: string;
    coins: string;
  };
}

export interface GuildDB {
  _id: Schema.Types.ObjectId;
  byeMessage: string;
  byeChannel: string;
  commands: Array<any>;
  expSystem: boolean;
  expChannel: string;
  expCard: string;
  filter: Array<string>;
  guildId: string;
  invitations: boolean;
  ignoreChannel: Array<string>;
  kickAuto: boolean;
  links: Array<any>;
  modLogs: string;
  modRoles: Array<string>;
  premium: boolean;
  reactionRoles: Array<any>;
  welcomeMessage: string;
  welcomeChannel: string;
}
