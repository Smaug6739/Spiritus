import type { GuildDB, UserDB } from "../../index";
import type { ShewenyClient } from "sheweny";
import type { Guild } from "discord.js";
import { DataReplacer } from "data-replacer";

const Replacer = new DataReplacer({
  caseInsensitive: true,
  multipleReplaces: true,
  required: false,
});

export function level(exp: number) {
  return Math.floor(Math.sqrt(exp) * 0.1) + 1;
}

export function expForLevel(level: number) {
  const e = Math.pow((level - 1) / 0.1, 2);
  return e;
}

export function progression(exp: number) {
  const nextLevelExp = expForLevel(level(exp) + 1);
  return (exp / nextLevelExp) * 100;
}

export function addExperience(
  client: ShewenyClient,
  guild: Guild,
  dbUser: UserDB,
  exp: number,
  settings: GuildDB
) {
  dbUser.experience += exp;
  const lvl = level(dbUser.experience);
  if (dbUser.level !== lvl) {
    dbUser.level = lvl;
    if (settings.expChannel && settings.expMessage) {
      const channel = client.util.resolveChannel(guild, settings.expChannel);
      if (!channel || !channel.isText()) return;
      if (!channel.permissionsFor(guild.me!).has("SEND_MESSAGES")) return;
      const replace = {
        "{{User}}": `<@${dbUser.id}>`,
        "{{Experience}}": dbUser.experience.toString(),
        "{{Level}}": level(dbUser.experience).toString(),
      };
      const content = Replacer.replace(settings.expMessage, replace);
      channel.send({ content });
    }
  }
  dbUser.save();
}

export function removeExperience(dbUser: UserDB, exp: number) {
  dbUser.experience -= exp;
  const lvl = level(dbUser.experience);
  if (dbUser.level !== lvl) dbUser.level = lvl;

  dbUser.save();
}
