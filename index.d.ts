import type { ColorResolvable } from "discord.js/typings/index.js";

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
    embed: ColorResolvable;
    red: ColorResolvable;
    orange: ColorResolvable;
    green: ColorResolvable;
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
  reactionRoles: Array<rr>;
  welcomeMessage: string;
  welcomeChannel: string;
}
export interface rr {
  emoji: string;
  messageID: string;
  channelID: string;
  roleID: string;
}
export interface UserDB {
  guildId: string;
  name: string;
  userId: string;
  experience: number;
}
export interface GuildCreateDB {
  guildId: string;
  name?: string;
}
export interface ReactionRole {
  channelId: string;
  messageId: string;
  emoji: string;
  roles: Array<string>;
}
