import { Guild } from "../models";
import type { GuildCreateDB } from "../../index";
class DatabaseProvider {
  async post(data: GuildCreateDB): Promise<true> {
    await Guild.create({ data });
    return true;
  }
  async get(guildId: string): Promise<any | null> {
    const data = await Guild.findOne({ guildId });
    return data || null;
  }
  async update(guildId: string, settings: any): Promise<boolean> {
    let data: any = await this.get(guildId);
    if (!data) return false;
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return await data.updateOne(settings);
  }
  async delete(guildId: string) {
    const doc = await this.get(guildId);
    if (!doc) return false;
    await doc.delete();
    return true;
  }
}

export { DatabaseProvider };
