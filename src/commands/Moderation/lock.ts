import Command from '../CommandClass';
import type { ICommandInteraction, ICommandArgs } from '../../typescript/interfaces';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'lock',
			aliases: [],
			options: [
				{
					name: 'channel',
					description: 'Channel to lock',
					type: 'STRING',
					required: true
				},
			],
			description: 'Lock a channel from the server.',
			category: 'Moderation',
			cooldown: 5,
			userPermissions: ['MODERATOR'],
			botPermissions: ['MANAGE_CHANNELS'],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs) {
		const argChannel = args.get('channel').value;
		const channel = this.spiritus.util.resolveChannel(interaction.guild, argChannel)
		if (!channel) return interaction.replyErrorMessage(`Channel not found.`)
		await channel.updateOverwrite(interaction.guild!.roles.everyone, {
			SEND_MESSAGES: false
		})
			.catch(() => interaction.replyErrorMessage(`An error occurred. Please try again.`));
		interaction.replySuccessMessage(`I have lock the channel \`${channel}\``)
	}
}