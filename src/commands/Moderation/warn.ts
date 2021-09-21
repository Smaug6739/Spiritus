import { MessageEmbed } from 'discord.js';
import Command from '../CommandClass';
import type { ICommandInteraction, ICommandArgs } from '../../typescript/interfaces';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'warn',
			aliases: [],
			options: [
				{
					name: 'user',
					description: 'The user to warn',
					type: 'STRING',
					required: true
				},
				{
					name: 'reason',
					description: 'The reason of warn',
					type: 'STRING',
					required: false
				},
			],
			description: 'Warn a user.',
			category: 'Moderation',
			cooldown: 5,
			userPermissions: ['MODERATOR'],
			botPermissions: [],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs) {
		const member = await this.spiritus.util.resolveMember(interaction.guild, args.get('user').value)
		if (!member) return interaction.replyErrorMessage('User not found.');
		const reason: string = args.get('reason')?.value || 'No reason was provided.';
		const dmEmbed = new MessageEmbed()
			.setTitle('Warn')
			.setColor(this.spiritus.colors.orange)
			.setAuthor(member.user.username, member.user.displayAvatarURL())
			.setThumbnail(member.user.displayAvatarURL())
			.setDescription(`**Action :** Warn\n**Reason :** ${reason}${reason.endsWith('.') ? '' : '.'}\n**Server :** ${interaction.guild!.name}\n**Moderator :** ${interaction.user.username}`)
			.setTimestamp()
			.setFooter(`By : ${interaction.user.username}`, interaction.user.displayAvatarURL())
		try {
			await member.send({ embeds: [dmEmbed] });
		} catch {
			return interaction.replyErrorMessage('I can\'t send a message to this user.')
		}
		interaction.replySuccessMessage(`I have successfully warn the user \`${member.user.tag}\`.`)
	}
}