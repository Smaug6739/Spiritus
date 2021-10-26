import { Guild, User } from "../models";
import type { GuildCreateDB } from "../../index";
import { Types } from "mongoose";
class DatabaseProvider {
  async post(data: GuildCreateDB): Promise<true> {
    const merged = Object.assign({ _id: new Types.ObjectId() }, { ...data });
    await Guild.create(merged);
    return true;
  }
  async get(guildId: string): Promise<any | null> {
    let data = await Guild.findOne({ guildId });
    if (!data) {
      await this.post({ guildId });
      data = await Guild.findOne({ guildId });
    }
    return data;
  }
  async update(guildId: string, settings: any): Promise<any | null> {
    let data: any = await this.get(guildId);
    if (!data || typeof data !== "object") return null;
    return await data.updateOne(settings);
  }
  async delete(guildId: string) {
    const doc = await this.get(guildId);
    if (!doc) return false;
    await doc.delete();
    return true;
  }
  /**
   * Users
   */
  async createUser(guildID: string, userID: string, data?: Object) {
    const merged = Object.assign(
      { _id: new Types.ObjectId() },
      { guildID: guildID, userID: userID, ...data }
    );
    const createdUser = new User(merged);
    return await createdUser.save();
  }
  async getUser(guildID: string, userID: string) {
    if (!guildID) return null;
    if (!userID) return null;
    const userDB = await User.findOne({
      guildID: guildID,
      userID: userID,
    });
    if (userDB) return userDB;
    return await this.createUser(guildID, userID);
  }
  async getUsers(guildID: string) {
    if (!guildID) return null;
    const userDB = await User.find({ guildID: guildID });
    if (userDB) return userDB;
    return null;
  }
  async updateUser(guildID: string, userID: string, settings: any) {
    let data = await this.getUser(guildID, userID);
    if (!data || typeof data !== "object") return null;
    return await data.updateOne(settings);
  }
  async deleteUser(guildID: string, userID: string) {
    const data = await this.getUser(guildID, userID);
    if (data) return data.delete();
  }
}

export { DatabaseProvider };
