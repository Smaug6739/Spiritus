import Command from '../CommandClass';

export default class Ping extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'warn',
			aliases: [],
			args: [],
			description: 'Warn a user.',
			category: 'Moderation',
			cooldown: 10,
			userPermissions: [],
			botPermissions: [],
			subCommands: [],
		})
	}
	async execute(interaction: any, args: any) {
		interaction.reply('Pong !');
		console.log(args);

	}
}