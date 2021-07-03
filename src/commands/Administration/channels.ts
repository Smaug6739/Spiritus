import Command from '../CommandClass';
import type { ICommandArgs, ICommandInteraction } from '../../typescript/interfaces'

export default class extends Command {
	constructor(spiritus: any) {
		super(spiritus, {
			name: 'channel',
			aliases: [],
			args: [],
			description: 'Manage channels from the server.',
			category: 'Administration',
			cooldown: 5,
			userPermissions: ['MANAGE_CHANNELS'],
			botPermissions: ['MANAGE_CHANNELS'],
			subCommands: [
				{
					name: 'create',
					description: 'Create channel on the guild.',
					args: [
						{
							name: 'type',
							description: 'Type of channel.',
							type: 'STRING',
							required: true
						},
						{
							name: 'name',
							description: 'Name of channel.',
							type: 'STRING',
							required: true
						}
					],
				},
				{
					name: 'update',
					description: 'Update channel on the guild.',
					args: [
						{
							name: 'channel',
							description: 'Channel to update.',
							type: 'STRING',
							required: true
						},
						{
							name: 'name',
							description: 'New name of channel.',
							type: 'STRING',
							required: true
						}
					],
				},
				{
					name: 'delete',
					description: 'Delete channel on the guild.',
					args: [
						{
							name: 'channel',
							description: 'Channel to delete.',
							type: 'STRING',
							required: true
						},
					],
				},
				{
					name: 'clone',
					description: 'Clone an channel of the guild.',
					args: [
						{
							name: 'channel',
							description: 'Channel to clone.',
							type: 'STRING',
							required: true
						},
					],
				},
				{
					name: 'sync',
					description: 'Synchronize the permissions of a channel.',
					args: [
						{
							name: 'synchro',
							description: 'Channel to sync.',
							type: 'STRING',
							required: true
						},
					],
				},
			],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs) {
		switch (interaction.subcommand) {
			case 'create':
				try {
					const channelName = args.get('name').value;
					const channelType = args.get('type').value.toLowerCase();
					const allowedTypes = ['text', 'voice', 'category', 'news', 'store', 'stage']
					const channel = await this.util.reolveChannel(interaction.guild, interaction.channelID)
					if (!allowedTypes.includes(channelType)) return interaction.replyErrorMessage(`Invalid channel type. Allowed types are : ${allowedTypes.join(', ')}`)
					if (channelName.length > 99) return interaction.replyErrorMessage(`Name of category is invalid (max 100 chars)`);
					await interaction.guild!.channels.create(`${channelName}`, {
						type: channelType,
						parent: channel.parent ? channel.parent : ''
					})
					interaction.replySuccessMessage(`I have created \`${channelName}\``)
				} catch (e) {
					console.log(e);

					interaction.replyErrorMessage(`An error occurred. Please try again.`)
				};
				break;
			case 'update':
				const channelToUpdate = await this.util.resolveChannel(interaction.guild, args.get('channel').value)
				if (!channelToUpdate) return interaction.replyErrorMessage(`Channel not found`)
				try {
					await channelToUpdate.edit({ name: args.get('name').value }).then(
						interaction.replySuccessMessage(`I have updated the channel \`${channelToUpdate.name}\``)
					)
				} catch (err) { return interaction.replyErrorMessage(`An error occurred please try again.`) }
				break;
			case 'delete':
				const channelToDelete = this.util.resolveChannel(interaction.guild, args.get('channel').value)
				if (!channelToDelete) return interaction.replyErrorMessage(`Channel not found`)
				try {
					channelToDelete.delete().then(interaction.replySuccessMessage(`I have deleted the channel ${channelToDelete.name}`))
				} catch (err) { return interaction.replyErrorMessage(`An error occured. Please try again.`) }
				break;
			case 'clone':
				const channelToClone = this.util.resolveChannel(interaction.guild, args.get('channel').value)
				if (!channelToClone) return interaction.replyErrorMessage(`Channel not found`)
				try {
					channelToClone.clone().then(interaction.replySuccessMessage(`I clone the channel \`${channelToClone.name}\``))
				} catch (err) { return interaction.replyErrorMessage(`An error occured. Please try again.`) };
				break;
			case 'synchro':
				const channelToSynchro = this.util.resolveChannel(interaction.guild, args.get('channel').value)
				if (!channelToSynchro) return interaction.replyErrorMessage(`Channel not found`)
				if (!channelToSynchro.parent) return interaction.replyErrorMessage(`This channel not have category.`)
				try {
					channelToSynchro.lockPermissions()
						.then(interaction.replySuccessMessage(`I have synchronized the permissions of the channel ${channelToSynchro.name} with category permissions ${channelToSynchro.parent.name}`))
				} catch (err) { interaction.replyErrorMessage(`An error occurred please try again`) }
				break;
		}
	}
}