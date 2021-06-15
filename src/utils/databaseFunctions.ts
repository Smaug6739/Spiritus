import type Spiritus from '../main';
import type { IObject } from '../typescript/interfaces';
import { Guild } from '../models/index';

import { Types } from 'mongoose';
export default class DbFunctions {
	private spiritus;
	constructor(spiritus: typeof Spiritus) {
		this.spiritus = spiritus;
	}
	async createGuild(guildID: string, data?: Object) {
		const merged = Object.assign({ _id: Types.ObjectId() }, { guildID: guildID, ...data });
		const createGuild = new Guild(merged);
		await createGuild.save();
		return true;
	}
	async getGuild(guildID: string) {
		if (!guildID) return null;
		const guildDB = await this.spiritus.models.Guild.findOne({ guildID: guildID });
		if (guildDB) return guildDB;
		await this.createGuild(guildID)
		return await this.spiritus.models.Guild.findOne({ guildID: guildID });
	}
	async updateGuild(guildID: string, settings: IObject) {
		let data = await this.getGuild(guildID);
		if (typeof data !== "object") data = {};
		for (const key in settings) {
			if (data[key] !== settings[key]) data[key] = settings[key];
		}
		return data.updateOne(settings);
	}
	async deleteGuild(guildID: string) {
		const data = await this.getGuild(guildID);
		if (data) return await data.delete();
	}
}