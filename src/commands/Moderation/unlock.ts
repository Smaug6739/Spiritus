import Command from '../CommandClass';
import type { ICommandInteraction, ICommandArgs } from '../../typescript/interfaces';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'unlock',
			aliases: [],
			options: [
				{
					name: 'channel',
					description: 'Channel to unlock',
					type: 'STRING',
					required: true
				},
			],
			description: 'Unlock channel from the guild',
			category: 'Moderation',
			cooldown: 5,
			userPermissions: ['MODERATOR'],
			botPermissions: ['MANAGE_CHANNELS'],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs) {
		const argChannel = args.get('channel').value
		let channel = this.spiritus.util.resolveChannel(interaction.guild, argChannel)
		if (channel == undefined) return interaction.replyErrorMessage(`Channel not found.`)

		await channel.updateOverwrite(interaction.guild!.roles.everyone, {
			SEND_MESSAGES: true
		})
			.catch(() => interaction.replyErrorMessage('An error occurred. Please try again'));
		interaction.replySuccessMessage(`I have unlock the channel ${channel}`)
	}
}