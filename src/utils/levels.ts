import type { GuildDB, UserData } from "../../index";
import type { ShewenyClient } from "sheweny";
import type { TextChannel } from "discord.js";
import { DataReplacer } from "data-replacer";

const Replacer = new DataReplacer({
  caseInsensitive: true,
  multipleReplaces: true,
  required: false,
});

/**
 * Return the level with experience.
 * @param exp
 * @returns {number} - The level corresponding of experience
 */
export function level(exp: number) {
  return Math.floor(Math.sqrt(exp) * 0.1) + 1;
}
/**
 * Return the experience of level.
 * @param level
 * @returns {number} - The experience corresponding of level
 */
export function experience(level: number) {
  const e = Math.pow((level - 1) / 0.1, 2);
  return e;
}

export function progression(exp: number): number {
  const actualLevel = level(exp);
  const actualLevelExp = experience(actualLevel);
  const nextLevelExp = experience(actualLevel + 1);
  const diff = nextLevelExp - actualLevelExp;
  const progressExp = exp - actualLevelExp;
  return Math.floor((progressExp / diff) * 100);
}

export function addExperience(
  client: ShewenyClient,
  channel: TextChannel,
  dbUser: UserData,
  exp: number,
  settings: GuildDB
): number {
  const guild = channel.guild;

  dbUser.experience += exp;
  const lvl = level(dbUser.experience);
  if (dbUser.level !== lvl) {
    dbUser.level = lvl;
    if (settings.expMessage) {
      let cha = client.util.resolveChannel(
        guild,
        settings.expChannel
      ) as TextChannel;
      if (!cha || (cha && !cha.isText())) return dbUser.experience;
      if (cha) cha = channel;
      if (!cha.permissionsFor(guild.me!).has("SEND_MESSAGES"))
        return dbUser.experience;
      const replace = {
        "{{User}}": `<@${dbUser.userID}>`,
        "{{Experience}}": dbUser.experience.toString(),
        "{{Level}}": level(dbUser.experience).toString(),
      };
      const content = Replacer.replace(settings.expMessage, replace);
      cha.send({ content });
    }
  }
  client.db.updateUser(guild.id, dbUser.userID, dbUser);
  return dbUser.experience;
}

export function removeExperience(
  client: ShewenyClient,
  dbUser: UserData,
  exp: number
): number {
  dbUser.experience -= exp;
  const lvl = level(dbUser.experience);
  if (dbUser.level !== lvl) dbUser.level = lvl;

  client.db.updateUser(dbUser.guildID, dbUser.userID, dbUser);
  return dbUser.experience;
}
