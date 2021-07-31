import { MessageEmbed } from 'discord.js'
import Command from '../CommandClass';
import type { ICommandInteraction, ICommandArgs, IGuildDB } from '../../typescript/interfaces';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'ban',
			aliases: [],
			options: [
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
			description: 'Ban user from the server',
			category: 'Moderation',
			cooldown: 5,
			userPermissions: [],
			botPermissions: ['BAN_MEMBERS'],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		const argReason = args.get('reason')?.value || 'No reason was provided.';
		const argUser = args.get('user').value;
		const user = await this.spiritus.util.resolveMember(interaction.guild, argUser)
		if (!user) return interaction.replyErrorMessage(`User not found.`)
		const embed = new MessageEmbed()
			.setAuthor(`${user.username} (${user.id})`)
			.setColor(this.spiritus.colors.red)
			.setDescription(`**Action**: ban\n**Reason**: ${argReason}\n**Guild :** ${interaction.guild!.name}\nModerator : ${interaction.user.username}`)
			.setThumbnail(user.user.displayAvatarURL())
			.setTimestamp()
			.setFooter(interaction.user.username, interaction.user.displayAvatarURL());
		if (user.bannable) {
			try {
				await user.send(embed)
			} finally {
				user.ban({ reason: argReason }).then(() => {
					interaction.reply({ embeds: [embed] })
						.then(() => {
							setTimeout(() => {
								interaction.deleteReply()
							}, 5000)
						})
					if (settings.modLogs) {
						const channel = this.spiritus.util.resolveChannel(interaction.guild, settings.modLogs)
						if (channel && channel.permissionsFor(interaction.guild!.me).has('SEND_MESSAGES')) channel.send({ embeds: embed })
					}
				})
			}
		} else interaction.replyErrorMessage(`I can't ban this user.`)
	}
}