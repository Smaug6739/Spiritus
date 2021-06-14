import type { Client, Guild, GuildMember, Role, GuildEmoji, GuildChannel, User } from "discord.js";
import type { IGuildDB } from '../typescript/interfaces';

export default class Util {
	client: Client;
	constructor(client: Client) {
		this.client = client;
	};

	resolveMember = async (guild: Guild, arg: string) => {
		if (!arg || !guild || !guild.available) {
			return;
		}

		const member =
			guild.members.cache.find((mem: GuildMember) => mem.id === arg.replace('!', '').replace(/<@|>/g, '') || // Mention
				mem.user.username.toLowerCase() === arg.toLowerCase() || // Username
				`${mem.user.username.toLowerCase()}#${mem.user.discriminator}` === arg.toLowerCase() || // Username + discriminator
				mem.user.username.toLowerCase().startsWith(arg.toLowerCase())) // Starts with
		return member;
	}
	resolveUser = (arg: string) => {
		if (!arg) {
			return;
		}
		const user = this.client.users.cache.find((u: User) =>
			u.id === arg.replace('!', '').replace(/<@|>/g, '') ||
			u.username.toLowerCase().startsWith(arg.toLowerCase()) ||
			u.username.toLowerCase() === arg.toLowerCase() ||
			`${u.username.toLowerCase()}#${u.discriminator}` === arg.toLowerCase());
		return user;
	}
	resolveChannel = (guild: Guild, arg: string) => {
		if (!guild || !arg) {
			return;
		}
		const channel = guild.channels.cache.find((chan: GuildChannel) => chan.id === arg || chan.id === arg.replace(/<#|>/g, '') || chan.name === arg.toLowerCase());
		return channel;
	}
	resolveGuild = (arg: string) => {
		if (!arg) return null;
		const guild = this.client.guilds.cache.find((g: Guild) => g.id === arg || g.name === arg.toLowerCase());
		return guild;
	}
	resolveRole = (guild: Guild, arg: string) => {
		if (!guild || !arg) return null;
		const role = guild.roles.cache.find((r: Role) =>
			r.id === arg ||
			r.id === arg.replace('&', '').replace(/<@|>/g, '') ||
			r.name.toLowerCase().startsWith(arg.toLowerCase()) ||
			r.name === arg.toLowerCase());
		return role;
	}

	isUnicode = (str: string) => {
		for (let i = 0, n = str.length; i < n; i++) {
			if (str.charCodeAt(i) > 255) return true;
			return false;
		}
	}
	resolveGuildEmoji = async (guild: Guild, arg: string) => {
		if (!guild || !arg) return null;
		const emoji = guild.emojis.cache.find((e: GuildEmoji) =>
			e.id == arg || e.name == arg) ||
			guild.emojis.cache.find((e: GuildEmoji) => e.id == arg.replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1]) // await guild.emojis.cache.find(arg.replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1]).catch(() => null);
		return emoji;
	}
	checkMod = async (member: GuildMember, settings: IGuildDB) => {
		let isMod = false;
		if (settings.modRoles) {
			settings.modRoles.forEach((modRole: any) => {
				if (member.roles.cache.map((r: Role) => r.id).includes(modRole)) isMod = true;
			});
		}
		if (member.permissions.has('ADMINISTRATOR') || member.permissions.has('MANAGE_GUILD') || (settings.modRoles && settings.modRoles.length > 0 && isMod)) return true;
		return false;
	}
}