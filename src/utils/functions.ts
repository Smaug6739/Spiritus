import type { GuildMember, Role } from "discord.js";
import type { IGuildDB } from '../typescript/interfaces';

export async function checkMod(member: GuildMember, settings: IGuildDB) {
	let isMod = false;
	if (settings.modRoles) {
		settings.modRoles.forEach((modRole: any) => {
			if (member.roles.cache.map((r: Role) => r.id).includes(modRole)) isMod = true;
		});
	}
	if (member.permissions.has('ADMINISTRATOR') || member.permissions.has('MANAGE_GUILD') || (settings.modRoles && settings.modRoles.length > 0 && isMod)) return true;
	return false;
}
