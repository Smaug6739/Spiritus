import { MessageEmbed } from 'discord.js';
import ms from 'ms';
import Command from '../CommandClass';
import type { ICommandInteraction, ICommandArgs, IGuildDB } from '../../typescript/interfaces';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'mute',
			aliases: [],
			args: [
				{
					name: 'user',
					description: 'User to mute.',
					type: 'STRING',
					required: true
				},
				{
					name: 'time',
					description: 'Time of mute (default : 1h).',
					type: 'STRING',
					required: false
				},
			],
			description: 'Mute user from the server.',
			category: 'Moderation',
			cooldown: 5,
			userPermissions: ['MODERATOR'],
			botPermissions: ['MANAGE_CHANNELS'],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		const argUser = args.get('user').value;
		const argTime: string = args.get('time')?.value;
		const user = await this.spiritus.util.resolveMember(interaction.guild, argUser)
		let muteRole = interaction.guild!.roles.cache.find(r => r.name === 'Muted');
		const muteTime = argTime || '60s';
		if (!user) return interaction.replyErrorMessage(`User not found.`)
		if (!muteRole) {
			muteRole = await interaction.guild!.roles.create({
				name: 'Muted',
				color: '#2f3136',
				permissions: []
			});
			interaction.guild!.channels.cache.forEach(async (channel) => {
				await channel.updateOverwrite(muteRole!, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false,
					CONNECT: false
				});
			});
		};

		await user.roles.add(muteRole.id);
		interaction.replySuccessMessage(`<@${user.id}> is muted for ${ms(ms(muteTime))}.`);

		setTimeout(() => {
			user.roles.remove(muteRole!.id);
		}, ms(muteTime));
		const embed = new MessageEmbed()
			.setAuthor(`${user.user.username} (${user.id})`, user.user.displayAvatarURL())
			.setColor(`${this.spiritus.colors.ORANGE}`)
			.setDescription(`**Action**: mute\n**Time**: ${ms(ms(muteTime))}`)
			.setTimestamp()
			.setFooter(interaction.user.username, interaction.user.displayAvatarURL());
		if (settings.modLogs) {
			const channel = this.spiritus.util.resolveChannel(interaction.guild, settings.modLogs)
			if (channel) {
				if (channel.permissionsFor(interaction.guild!.me).has('SEND_MESSAGES')) {
					channel.send(embed)
				}
			}
		}
	}
}