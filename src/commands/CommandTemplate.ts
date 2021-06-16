import { MessageEmbed } from 'discord.js'
import Command from './CommandClass';
import type { ICommandInteraction, ICommandArgs, IGuildDB } from './../typescript/interfaces';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'N',
			aliases: [],
			args: [
				{
					name: 'A',
					description: 'D',
					type: 'STRING',
					required: true
				},
			],
			description: 'D',
			category: 'C',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		console.log(interaction);
		console.log(args);
		console.log(settings);
		console.log(MessageEmbed);
	}
}