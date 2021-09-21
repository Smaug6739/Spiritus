import type Spiritus from '../main';
import type { IObject } from '../typescript/interfaces';
import { Guild, User } from '../models/index';

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

	async createUser(guildID: string, userID: string, data?: Object) {
		const merged = Object.assign({ _id: Types.ObjectId() }, { guildID: guildID, userID: userID, ...data });
		const createGuild = new User(merged);
		await createGuild.save();
		return true;
	}
	async getUser(guildID: string, userID: string) {
		if (!guildID) return null;
		if (!userID) return null;
		const userDB = await this.spiritus.models.User.findOne({ guildID: guildID, userID: userID });
		if (userDB) return userDB;
		return null;
	}
	async getUsers(guildID: string) {
		if (!guildID) return null;
		const userDB = await this.spiritus.models.User.find({ guildID: guildID });
		if (userDB) return userDB;
		return null;
	}
	async updateUser(guildID: string, userID: string, settings: IObject) {
		let data = await this.getUser(guildID, userID);
		if (typeof data !== "object") data = {};
		for (const key in settings) {
			if (data[key] !== settings[key]) data[key] = settings[key];
		}
		return data.updateOne(settings);
	}
	async deleteUser(guildID: string, userID: string) {
		const data = await this.getUser(guildID, userID);
		if (data) return data.delete();
	}
}