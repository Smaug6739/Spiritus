import { Guild, User } from "../models/index";

import { Types } from "mongoose";

interface anyObject {
  [key: string]: any;
}

export async function createGuild(guildID: string, data?: Object) {
  const merged = Object.assign(
    { _id: new Types.ObjectId() },
    { guildID: guildID, ...data }
  );
  const createGuild = new Guild(merged);
  await createGuild.save();
  return true;
}
export async function getGuild(guildID: string) {
  if (!guildID) return null;
  const guildDB = await Guild.findOne({
    guildID: guildID,
  });
  if (guildDB) return guildDB;
  await createGuild(guildID);
  return await Guild.findOne({ guildID: guildID });
}
export async function updateGuild(guildID: string, settings: anyObject) {
  let data = await getGuild(guildID);
  if (typeof data !== "object") data = {};
  for (const key in settings) {
    if (data[key] !== settings[key]) data[key] = settings[key];
  }
  return data.updateOne(settings);
}
export async function deleteGuild(guildID: string) {
  const data = await getGuild(guildID);
  if (data) return await data.delete();
}

export async function createUser(
  guildID: string,
  userID: string,
  data?: Object
) {
  const merged = Object.assign(
    { _id: new Types.ObjectId() },
    { guildID: guildID, userID: userID, ...data }
  );
  const createGuild = new User(merged);
  await createGuild.save();
  return true;
}
export async function getUser(guildID: string, userID: string) {
  if (!guildID) return null;
  if (!userID) return null;
  const userDB = await User.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (userDB) return userDB;
  return null;
}
export async function getUsers(guildID: string) {
  if (!guildID) return null;
  const userDB = await User.find({ guildID: guildID });
  if (userDB) return userDB;
  return null;
}
export async function updateUser(
  guildID: string,
  userID: string,
  settings: anyObject
) {
  let data = await getUser(guildID, userID);
  if (typeof data !== "object") data = {};
  for (const key in settings) {
    if (data[key] !== settings[key]) data[key] = settings[key];
  }
  return data.updateOne(settings);
}
export async function deleteUser(guildID: string, userID: string) {
  const data = await getUser(guildID, userID);
  if (data) return data.delete();
}
