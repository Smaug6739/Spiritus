import type Spiritus from '../main';
import type { GuildMember } from 'discord.js'
export default class {
	spiritus: typeof Spiritus;
	constructor(spiritus: typeof Spiritus) {
		this.spiritus = spiritus;
	}
	async run(member: GuildMember) {
		const guildDb = await this.spiritus.db.getGuild(member.guild.id);
		if (!guildDb || !guildDb.welcomeMessage || !guildDb.welcomeChannel) return;
		const channel = await this.spiritus.util.resolveChannel(member.guild, guildDb.welcomeChannel)
		if (!channel) return;
		if (!(channel).permissionsFor(member.guild!.me!).has('SEND_MESSAGES')) return;
		const msg = guildDb.welcomeMessage
			.replaceAll('{Guild}', member.guild.name)
			.replaceAll('{User}', member.user.username)
		channel.send({
			content: msg
		})
	}
}

