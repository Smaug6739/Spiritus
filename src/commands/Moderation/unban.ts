import { MessageEmbed } from 'discord.js'

import Command from '../CommandClass';
import type { ICommandInteraction, ICommandArgs } from '../../typescript/interfaces';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'unban',
			aliases: [],
			options: [
				{
					name: 'user',
					description: 'User to change',
					type: 'STRING',
					required: true
				},
			],
			description: 'Unban user from the guild',
			category: 'Moderation',
			cooldown: 5,
			userPermissions: ['MODERATOR'],
			botPermissions: ['MANAGE_MEMBERS'],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs) {
		try {
			const user = await this.spiritus.util.resolveUser(args.get('user').value)
			if (!user) return interaction.replyErrorMessage(`User not found.`);
			interaction.guild!.members.unban(user);
			const embed = new MessageEmbed()
				.setAuthor(`${user.username} (${user.id})`, user.displayAvatarURL())
				.setColor(this.spiritus.colors.red)
				.setDescription(`**Action**: unban`)
				.setTimestamp()
				.setFooter(interaction.user.username, interaction.user.displayAvatarURL());
			interaction.reply({ embeds: [embed] });
		} catch (e: any) {
			console.log(e);

			if (e.message.match("Unknown User")) return interaction.replyErrorMessage(`User not found.`);
			else return interaction.replyErrorMessage(`An error has occurred. Please try again.`);
		}
	}
}