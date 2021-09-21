import Command from '../CommandClass';
import type { ICommandInteraction } from '../../typescript/interfaces'

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'support',
			aliases: [],
			options: [],
			description: 'Get link of support server.',
			category: 'Other',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction) {
		interaction.reply(`Support server is : https://discord.gg/TC7Qjfs`)
	}
}