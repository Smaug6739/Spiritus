import { MessageEmbed } from 'discord.js';
import Command from '../CommandClass';
import type { ICommandArgs, ICommandInteraction, IGuildDB } from '../../typescript/interfaces'

export default class extends Command {
	constructor(spiritus: any) {
		super(spiritus, {
			name: 'commands',
			aliases: [],
			args: [],
			description: 'Manage custom commands from the server.',
			category: 'Administration',
			cooldown: 5,
			userPermissions: ['MANAGE_GUILD'],
			botPermissions: [],
			subCommands: [
				{
					name: 'list',
					description: 'View commands custom on the guild.',
					usage: '',
					args: [],
					exemples: []
				},
				{
					name: 'add',
					description: 'Create command on the guild.',
					args: [
						{
							name: 'name',
							description: 'Name of command.',
							type: 'STRING',
							required: true
						},
						{
							name: 'value',
							description: 'Value of command.',
							type: 'STRING',
							required: true
						}
					],
				},
				{
					name: 'rem',
					description: 'Remove command of the guild.',
					args: [
						{
							name: 'name',
							description: 'Name of command.',
							type: 'STRING',
							required: true
						}
					],
				},
			],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		switch (interaction.subcommand) {
			case 'list':
				if (settings.commandes) {
					const embed = new MessageEmbed()
						.setTitle(`List of custom commands of the guid ${interaction.guild!.name}`)
						.setColor(this.colors.embed)
					if (interaction.guild!.iconURL()) embed.setThumbnail(`${interaction.guild!.iconURL()}`)
					settings.commandes.forEach(element => {
						embed.addField(`\u200b`, `Command : \`${element.nom}\``, false)
					});
					interaction.channel.send({ embeds: [embed] })
				} else return interaction.replyErrorMessage(`No commands found on this guild.`)
				break;
			case 'add':
				try {
					const title = args.get('name').value
					if (settings.commandes) {
						if (settings.commandes.length > 19) return interaction.replyErrorMessage(`You have reached the maximum number of custom commands for this guild`)
						let customCommand = settings.commandes.find(e => e.nom == title)
						if (customCommand) return interaction.replyErrorMessage(`This command already exist on this guild.`)
					}
					const contenu = args.get('value').value
					if (contenu.length > 1800) return interaction.replyErrorMessage(`Content of command is too long. `)
					let tableau = []
					tableau = settings.commandes
					tableau.push({ nom: title, contenu: contenu })
					await this.db.updateGuild(interaction.guild, { commandes: tableau });
					interaction.replySuccessMessage(`I have created the command \`${title}\`.`);
				} catch (e) { interaction.replyErrorMessage(`An error occured please try again.`) }
				break;
			case 'rem':
				if (!settings.commandes) return interaction.replyErrorMessage(`Command not found.`)
				{
					const title = args.get('name').value.toLowerCase()
					let customCommand = settings.commandes.find(e => e.nom == title)
					if (customCommand) {
						this.db.updateGuild(interaction.guild, { $pull: { commandes: { nom: title } } });
						interaction.replySuccessMessage(`I have deleted this command.`)
					} else return interaction.replyErrorMessage(`Command not found.`)
				}
				break;
		}
	}
}