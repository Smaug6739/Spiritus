import Command from '../CommandClass';
import type { ICommandArgs, ICommandInteraction, IGuildDB } from '../../typescript/interfaces'

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'config',
			aliases: [],
			args: [],
			description: 'Get ping of the bot',
			category: 'Other',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [
				{
					name: 'log-channel',
					description: 'Change log-channel of the guild.',
					options: [{
						name: 'channel',
						description: 'The channel for logs',
						type: 'STRING',
						required: true
					}],
				},
				{
					name: 'welcome-message',
					description: 'Change welcome message.',
					options: [{
						name: 'message',
						description: 'The welcome message',
						type: 'STRING',
						required: false
					}],
				},
				{
					name: 'welcome-channel',
					description: 'Change welcome channel (tape none for deactivate welcome system).',
					options: [{
						name: 'channel',
						description: 'The welcome channel',
						type: 'STRING',
						required: false
					}],
				},
				{
					name: 'bye-message',
					description: 'Change welcome channel (tape none for deactivate welcome system).',
					options: [{
						name: 'message',
						description: 'The bye message',
						type: 'STRING',
						required: false
					}],
				},
				{
					name: 'bye-channel',
					description: 'Change welcome channel (tape none for deactivate bye system).',
					options: [{
						name: 'channel',
						description: 'The welcome channel',
						type: 'STRING',
						required: false
					}],
				},
				{
					name: 'experience',
					description: 'Change status of leveling system of the guild.',
					options: [],
				},
				{
					name: 'admin-invites',
					description: 'Change status of anti invitations system of the guild.',
					options: [],
				},
				{
					name: 'rank-card',
					description: 'Change rank-card.',
					options: [{
						name: 'url',
						description: 'The image url',
						type: 'STRING',
						required: true
					}],
				},
				{
					name: 'rank-channel',
					description: 'Change rank-channel setting.',
					options: [{
						name: 'channel',
						description: 'The channel (tape \'disable\' to disable it).',
						type: 'STRING',
						required: true
					}],
				},
			],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		switch (interaction.subcommand) {

			case 'log-channel':
				const logChannel = args.get('channel')?.value
				if (logChannel) {
					await this.spiritus.db.updateGuild(interaction.guild!.id, { logChannel: logChannel });
					return interaction.replySuccessMessage(`logChannel updated : \`${settings.logChannel}\` ->\`${logChannel}\``)
				}
				interaction.replySuccessMessage(`Current logs channel : \`${settings.logChannel}\``);
				break;

			case 'welcome-message':
				const welcomeMessage = args.get('message')?.value;
				if (welcomeMessage) {
					await this.spiritus.db.updateGuild(interaction.guild!.id, { welcomeMessage: welcomeMessage });
					return interaction.replySuccessMessage(`The welcome message was updated : \`${settings.welcomeMessage}\` to \`${welcomeMessage}\``)
				}
				interaction.replySuccessMessage(`Current welcome interaction : \`${settings.welcomeMessage}\``);
				break;

			case 'welcome-channel':
				const welcomeChannel = args.get('channel')?.value;
				if (welcomeChannel) {
					const channel = this.spiritus.util.resolveChannel(interaction.guild, welcomeChannel)
					if (!channel) return interaction.replyErrorMessage(`Channel not found.`)
					await this.spiritus.db.updateGuild(interaction.guild!.id, { welcomeChannel: channel.id });
					return interaction.replySuccessMessage(`The welcome channel was updated : <#${settings.welcomeChannel}> to ${channel}`)
				}
				interaction.replySuccessMessage(`Current welcome channel : <#${settings.welcomeChannel}>`);
				break;

			case 'bye-message':
				const byeMessage = args.get('message')?.value;
				if (byeMessage) {
					await this.spiritus.db.updateGuild(interaction.guild!.id, { byeMessage: byeMessage });
					return interaction.replySuccessMessage(`The welcome message was updated : \`${settings.byeMessage}\` to \`${byeMessage}\``)
				}
				interaction.replySuccessMessage(`Current welcome interaction : \`${settings.byeMessage}\``);
				break;

			case 'bye-channel':
				const byeChannel = args.get('channel')?.value;
				if (byeChannel) {
					const channel = this.spiritus.util.resolveChannel(interaction.guild, byeChannel)
					if (!channel) return interaction.replyErrorMessage(`Channel not found.`)
					await this.spiritus.db.updateGuild(interaction.guild!.id, { byeChannel: channel.id });
					return interaction.replySuccessMessage(`The welcome channel was updated : <#${settings.byeChannel}> to ${channel}`)
				}
				interaction.replySuccessMessage(`Current welcome channel : <#${settings.byeChannel}>`);
				break;

			case 'experience':
				let uexp;
				if (settings.expsysteme == true) uexp = false;
				else uexp = true;
				await this.spiritus.db.updateGuild(interaction.guild!.id, { expsysteme: uexp });
				interaction.replySuccessMessage(`Leveling system updated : \`${settings.expsysteme}\` ->\`${uexp}\``)
				break;

			case 'admin-invites':
				let invit;
				if (settings.invitations == true) invit = false;
				else invit = true;
				await this.spiritus.db.updateGuild(interaction.guild!.id, { invitations: invit });
				interaction.replySuccessMessage(`System anti-invitations of the guild updated : \`${settings.invitations}\` ->\`${invit}\``)
				break;

			case 'rank-card':
				const rankCard = args.get('url')?.value
				if (rankCard) {
					if (rankCard.includes('png') || rankCard.includes('PNG') || rankCard.includes('JPG') || rankCard.includes('jpg') || rankCard.includes('JPEG') || rankCard.includes('jpeg') || rankCard.includes('GIF') || rankCard.includes('gif')) {
						await this.spiritus.db.updateGuild(interaction.guild!.id, { rankcard: rankCard });
						return interaction.replySuccessMessage(`Rank-card updated : \`${settings.rankcard}\` ->\`${rankCard}\``)
					} else return interaction.replyErrorMessage(`The file is not in a valid format. Valid formats are : png, jpg, jpeg et gif`)
				}
				interaction.replySuccessMessage(`Current rank-card : \`${settings.rankcard}\``);
				break;

			case 'rank-channel':
				const rankChannel = args.get('channel')?.value;
				if (rankChannel) {
					if (rankChannel === 'disable') {
						this.spiritus.db.updateGuild(interaction.guild!.id, { salonranks: "" });
						return interaction.replySuccessMessage(`Rank channel has been disable.`)
					} else {
						const channel = this.spiritus.util.resolveChannel(interaction.guild, rankChannel)
						if (!channel || channel == undefined) return interaction.replyErrorMessage(`Channel not found.`)
						else {
							await this.spiritus.db.updateGuild(interaction.guild!.id, { salonranks: channel.id });
							return interaction.replySuccessMessage(`Rank-channel updated : \`${rankChannel}\``)
						}
					}
				}
				interaction.replySuccessMessage(`Current rank-channel : \`${settings.salonranks || 'none'}\``);
				break;
		}
	}
}