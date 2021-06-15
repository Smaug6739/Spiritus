"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    constructor(client) {
        this.resolveMember = (guild, arg) => __awaiter(this, void 0, void 0, function* () {
            if (!arg || !guild || !guild.available) {
                return;
            }
            const member = guild.members.cache.find((mem) => mem.id === arg.replace('!', '').replace(/<@|>/g, '') || // Mention
                mem.user.username.toLowerCase() === arg.toLowerCase() || // Username
                `${mem.user.username.toLowerCase()}#${mem.user.discriminator}` === arg.toLowerCase() || // Username + discriminator
                mem.user.username.toLowerCase().startsWith(arg.toLowerCase())); // Starts with
            return member;
        });
        this.resolveUser = (arg) => {
            if (!arg) {
                return;
            }
            const user = this.client.users.cache.find((u) => u.id === arg.replace('!', '').replace(/<@|>/g, '') ||
                u.username.toLowerCase().startsWith(arg.toLowerCase()) ||
                u.username.toLowerCase() === arg.toLowerCase() ||
                `${u.username.toLowerCase()}#${u.discriminator}` === arg.toLowerCase());
            return user;
        };
        this.resolveChannel = (guild, arg) => {
            if (!guild || !arg) {
                return;
            }
            const channel = guild.channels.cache.find((chan) => chan.id === arg || chan.id === arg.replace(/<#|>/g, '') || chan.name === arg.toLowerCase());
            return channel;
        };
        this.resolveGuild = (arg) => {
            if (!arg)
                return null;
            const guild = this.client.guilds.cache.find((g) => g.id === arg || g.name === arg.toLowerCase());
            return guild;
        };
        this.resolveRole = (guild, arg) => {
            if (!guild || !arg)
                return null;
            const role = guild.roles.cache.find((r) => r.id === arg ||
                r.id === arg.replace('&', '').replace(/<@|>/g, '') ||
                r.name.toLowerCase().startsWith(arg.toLowerCase()) ||
                r.name === arg.toLowerCase());
            return role;
        };
        this.isUnicode = (str) => {
            for (let i = 0, n = str.length; i < n; i++) {
                if (str.charCodeAt(i) > 255)
                    return true;
                return false;
            }
        };
        this.resolveGuildEmoji = (guild, arg) => __awaiter(this, void 0, void 0, function* () {
            if (!guild || !arg)
                return null;
            const emoji = guild.emojis.cache.find((e) => e.id == arg || e.name == arg) ||
                guild.emojis.cache.find((e) => e.id == arg.replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1]); // await guild.emojis.cache.find(arg.replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1]).catch(() => null);
            return emoji;
        });
        this.checkMod = (member, settings) => __awaiter(this, void 0, void 0, function* () {
            let isMod = false;
            if (settings.modRoles) {
                settings.modRoles.forEach((modRole) => {
                    if (member.roles.cache.map((r) => r.id).includes(modRole))
                        isMod = true;
                });
            }
            if (member.permissions.has('ADMINISTRATOR') || member.permissions.has('MANAGE_GUILD') || (settings.modRoles && settings.modRoles.length > 0 && isMod))
                return true;
            return false;
        });
        this.client = client;
    }
    ;
}
exports.default = Util;
