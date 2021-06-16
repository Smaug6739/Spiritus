import { MessageEmbed } from 'discord.js'
import Command from '../CommandClass';
import type { ICommandInteraction, ICommandArgs, IGuildDB } from '../../typescript/interfaces';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'N',
			aliases: [],
			args: [
				{
					name: 'user',
					description: 'User to be banned',
					type: 'STRING',
					required: true
				},
				{
					name: 'reason',
					description: 'The reason of ban',
					type: 'STRING',
					required: false
				},
			],
			description: 'Kick user from the server',
			category: 'Moderation',
			cooldown: 5,
			userPermissions: ['MODERATOR'],
			botPermissions: ['KICK_MEMBERS'],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		const argUser = args.get('user').value;
		const reason = args.get('reason').value || 'No reason was given';
		const interactionMember = await this.spiritus.util.resolveMember(interaction.guild, interaction.user.id)
		const user = await this.spiritus.util.resolveMember(interaction.guild, argUser);
		if (!user) return interaction.replyErrorMessage(`User not found.`)
		if (interactionMember.roles.highest.comparePositionTo(user.roles.highest) <= 0 && interaction.guild!.ownerID !== interaction.user.id) return interaction.replyErrorMessage(`You don't have the permission for this.`)
		const embed = new MessageEmbed()
			.setAuthor(`${user.user.username} (${user.id})`)
			.setColor(`${this.spiritus.colors.orange}`)
			.setDescription(`**Action**: kick\n**Reason**: ${reason}`)
			.setThumbnail(user.user.displayAvatarURL())
			.setTimestamp()
			.setFooter(interaction.user.username, interaction.user.displayAvatarURL());
		if (user.kickable) {
			try {
				await user.send(embed)
			} finally {
				user.kick(reason).then(() => {
					interaction.reply({ embeds: [embed] })
					if (settings.modLogs) {
						const channel = this.spiritus.util.resolveChannel(interaction.guild, settings.modLogs)
						if (channel && channel.permissionsFor(interaction.guild!.me).has('SEND_MESSAGES')) channel.send(embed)
					}
				})
			}
		}
	}
}