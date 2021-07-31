import { MessageEmbed } from 'discord.js';
import Command from '../CommandClass';
import type { ICommandInteraction, ICommandArgs, IGuildDB } from '../../typescript/interfaces';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'unmute',
			aliases: [],
			options: [
				{
					name: 'user',
					description: 'User for unmute',
					type: 'STRING',
					required: true
				},
			],
			description: 'Unlock channel from the guild',
			category: 'Moderation',
			cooldown: 5,
			userPermissions: ['MODERATOR'],
			botPermissions: ['MANAGE_ROLES', 'MANAGE_MEMBERS'],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		const argUser = args.get('user').value
		const user = await this.spiritus.util.resolveMember(interaction.guild, argUser)
		if (!user) return interaction.replyErrorMessage(`User not found.`)
		const muteRole = interaction.guild!.roles.cache.find(r => r.name === 'Muted');
		if (!muteRole) return interaction.replyErrorMessage(`This user is not muted.`);
		if (!user.roles.cache.has(muteRole.id)) return interaction.replyErrorMessage(`This user is not muted.`);
		user.roles.remove(muteRole.id);
		interaction.replySuccessMessage(`<@${user.id}> is now unmuted`);
		const embed = new MessageEmbed()
			.setAuthor(`${user.user.username} (${user.id})`, user.user.displayAvatarURL())
			.setColor(this.spiritus.colors.green)
			.setDescription(`**Action**: unmute`)
			.setTimestamp()
			.setFooter(interaction.user.username, interaction.user.displayAvatarURL());
		if (settings.modLogs) {
			const channel = this.spiritus.util.resolveChannel(interaction.guild, settings.modLogs)
			if (channel && channel.permissionsFor(interaction.guild!.me).has('SEND_MESSAGES')) channel.send(embed)
		}
	}
}