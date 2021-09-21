import { MessageEmbed } from 'discord.js'
import Command from '../CommandClass';
import type { ICommandInteraction, ICommandArgs, IGuildDB } from '../../typescript/interfaces';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'filter',
			aliases: [],
			options: [],
			description: 'Add word to the blacklist',
			category: 'Moderation',
			cooldown: 5,
			userPermissions: ['MODERATOR'],
			botPermissions: [],
			subCommands: [
				{
					name: 'add',
					description: 'Add word to the blacklist',
					options: [
						{
							name: 'word',
							description: 'Word to add to the blacklist',
							type: 'STRING',
							required: true
						},
					],
				},
				{
					name: 'rem',
					description: 'Remove word to the blacklist',
					options: [
						{
							name: 'word',
							description: 'Word to remove to the blacklist',
							type: 'STRING',
							required: true
						},
					],
				},
				{
					name: 'list',
					description: 'View blacklist',
					options: [],
				},
			],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		switch (interaction.subcommand) {
			case 'add':
				const wordToAdd = args.get('word').value
				settings.filter.push(wordToAdd);
				await this.spiritus.db.updateGuild(interaction.guildId, { $push: { filter: wordToAdd } })
				interaction.replySuccessMessage(`This word is now forbidden on the server.`);
				break;
			case 'rem':
				const wordToRemove = args.get('word').value
				if (!settings.filter.includes(wordToRemove)) return interaction.replyErrorMessage(`This word is not in the list.`);
				await this.spiritus.db.updateGuild(interaction.guildId, { $pull: { filter: wordToRemove } })
				interaction.replySuccessMessage(`The word \`${wordToRemove}\` is now allowed.`);
				break;

			case 'list':
				if (!settings.filter || settings.filter.length < 1) return interaction.replyErrorMessage(`There are no forbidden words for this server. To add it use the command \`${settings.prefix}filter add <mot>\``)
				const embed = new MessageEmbed()
					.setTitle(`List of words in blacklist of this guild**${interaction.guild!.name}** | ${settings.filter.length} total`)
					.setThumbnail(interaction.guild!.iconURL()! ? interaction.guild!.iconURL()! : '')
					.setColor(this.spiritus.colors.embed)
					.setDescription(`\`${settings.filter.join('\`, \`')}\``)
					.setFooter('Command module: Moderation')
					.setTimestamp()
				interaction.reply({ embeds: [embed] });
				break;
		}
	}
}