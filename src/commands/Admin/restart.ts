import Command from '../CommandClass';
import type { ICommandInteraction } from '../../typescript/interfaces';



export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'restart',
			aliases: [],
			options: [],
			description: 'Restart the bot.',
			category: 'Admin',
			cooldown: 5,
			userPermissions: ['BOT_ADMIN'],
			botPermissions: [],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction) {
		await interaction.replySuccessMessage(`OK .`)
		process.exit();

	}
}