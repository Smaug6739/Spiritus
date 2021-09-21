"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const mongoose_1 = require("mongoose");
class DbFunctions {
    constructor(spiritus) {
        this.spiritus = spiritus;
    }
    async createGuild(guildID, data) {
        const merged = Object.assign({ _id: mongoose_1.Types.ObjectId() }, { guildID: guildID, ...data });
        const createGuild = new index_1.Guild(merged);
        await createGuild.save();
        return true;
    }
    async getGuild(guildID) {
        if (!guildID)
            return null;
        const guildDB = await this.spiritus.models.Guild.findOne({ guildID: guildID });
        if (guildDB)
            return guildDB;
        await this.createGuild(guildID);
        return await this.spiritus.models.Guild.findOne({ guildID: guildID });
    }
    async updateGuild(guildID, settings) {
        let data = await this.getGuild(guildID);
        if (typeof data !== "object")
            data = {};
        for (const key in settings) {
            if (data[key] !== settings[key])
                data[key] = settings[key];
        }
        return data.updateOne(settings);
    }
    async deleteGuild(guildID) {
        const data = await this.getGuild(guildID);
        if (data)
            return await data.delete();
    }
    async createUser(guildID, userID, data) {
        const merged = Object.assign({ _id: mongoose_1.Types.ObjectId() }, { guildID: guildID, userID: userID, ...data });
        const createGuild = new index_1.User(merged);
        await createGuild.save();
        return true;
    }
    async getUser(guildID, userID) {
        if (!guildID)
            return null;
        if (!userID)
            return null;
        const userDB = await this.spiritus.models.User.findOne({ guildID: guildID, userID: userID });
        if (userDB)
            return userDB;
        return null;
    }
    async getUsers(guildID) {
        if (!guildID)
            return null;
        const userDB = await this.spiritus.models.User.find({ guildID: guildID });
        if (userDB)
            return userDB;
        return null;
    }
    async updateUser(guildID, userID, settings) {
        let data = await this.getUser(guildID, userID);
        if (typeof data !== "object")
            data = {};
        for (const key in settings) {
            if (data[key] !== settings[key])
                data[key] = settings[key];
        }
        return data.updateOne(settings);
    }
    async deleteUser(guildID, userID) {
        const data = await this.getUser(guildID, userID);
        if (data)
            return data.delete();
    }
}
exports.default = DbFunctions;
