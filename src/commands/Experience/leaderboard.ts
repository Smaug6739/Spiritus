import { MessageEmbed } from 'discord.js'
import Command from '../CommandClass';
import type { ICommandArgs, ICommandInteraction, IGuildDB } from '../../typescript/interfaces'

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'leaderboard',
			aliases: [],
			options: [],
			description: 'View leaderboard of server.',
			category: 'Experience',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, _: ICommandArgs, settings: IGuildDB) {
		if (!settings.expsysteme) return interaction.replyErrorMessage(`The experience system is not activated on this server. To activate it use the command \`/config experience\`.`)
		const embed = new MessageEmbed()
		if (interaction.guild!.iconURL()) embed.setThumbnail(`${interaction.guild!.iconURL()}`)
		embed.setTitle('TOP 10 ranking of guild users')
		embed.setColor(this.spiritus.colors.embed)
		embed.setTimestamp()
		embed.setFooter('Command module: Experience')
		await this.spiritus.db.getUsers(interaction.guild!.id).then((p: any) => {
			p.sort((a: any, b: any) => (a.experience < b.experience) ? 1 : -1).splice(0, 10).forEach((e: any) => {
				embed.addField(e.username, `${e.experience} experience points, level : ${e.level}`)
			})
		})
		interaction.reply({ embeds: [embed] })

	}
}