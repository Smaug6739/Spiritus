import Command from '../CommandClass';

export default class Ping extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'ping',
			aliases: [],
			args: [],
			description: 'Get ping of the bot',
			category: 'Other',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [
				{
					name: 'sub',
					description: 'Delete messages in a channel',
					args: [
						{
							name: 'field',
							description: 'The field to ping',
							type: 'STRING',
							required: true
						}
					],
				},
			],
		})
	}
	async execute(interaction: any, args: any) {
		interaction.reply('Pong !')
		console.log(interaction.subCommands);
		console.log(args);


	}
}