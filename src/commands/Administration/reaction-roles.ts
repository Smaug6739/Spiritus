import Command from '../CommandClass';
import type { ICommandArgs, ICommandInteraction, IGuildDB } from '../../typescript/interfaces'

export default class extends Command {
	constructor(spiritus: any) {
		super(spiritus, {
			name: 'reaction-role',
			aliases: [],
			args: [],
			description: 'Manage roles from the server.',
			category: 'Administration',
			cooldown: 5,
			userPermissions: ['MANAGE_ROLES'],
			botPermissions: ['MANAGE_MEMBERS'],
			subCommands: [
				{
					name: 'add',
					description: 'Add role-reaction in the guild.',
					args: [
						{
							name: 'channel',
							description: 'Channel to add message reaction.',
							type: 'STRING',
							required: true
						},
						{
							name: 'message',
							description: 'ID of message to react.',
							type: 'STRING',
							required: true
						},
						{
							name: 'emoji',
							description: 'The emoji.',
							type: 'STRING',
							required: true
						},
						{
							name: 'role',
							description: 'The role.',
							type: 'STRING',
							required: true
						}
					],
				},
				{
					name: 'rem',
					description: 'Remove role-reaction in the guild.',
					args: [
						{
							name: 'channel',
							description: 'Channel to remove message reaction.',
							type: 'STRING',
							required: true
						},
						{
							name: 'message',
							description: 'ID of message remove react.',
							type: 'STRING',
							required: true
						},
						{
							name: 'emoji',
							description: 'The emoji.',
							type: 'STRING',
							required: true
						},
						{
							name: 'role',
							description: 'The role.',
							type: 'STRING',
							required: true
						}
					],
				},
				{
					name: 'rem-all',
					description: 'Remove all role-reaction of the guild.',
					args: [],
				}
			],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		switch (interaction.subcommand) {
			case 'add':
				if (settings.reactionroles) {
					try {
						const channelRRAdd = this.util.resolveChannel(interaction.guild, args.get('channel').value);
						if (!channelRRAdd) return interaction.replyErrorMessage(`Channel not found.`);
						const messageRRAdd = await channelRRAdd.messages.fetch(args.get('message').value);
						if (!messageRRAdd) return interaction.replyErrorMessage(`interaction not found`);
						let emoteRRAdd = await this.util.resolveGuildEmoji(interaction.guild, args.get('emoji').value);
						if (!emoteRRAdd && this.util.isUnicode(args.get('emoji').value)) emoteRRAdd = args.get('emoji').value;
						if (!emoteRRAdd) return interaction.replyErrorMessage(`Emoji not found.`);
						const role = this.util.resolveRole(interaction.guild, args.get('role').value);
						if (!role || role.id == interaction.guildId) return interaction.replyErrorMessage(`Role not found.`);
						let existingReactionRole = await settings.reactionroles.find(r => r.emoji == emoteRRAdd.id ? emoteRRAdd.id : emoteRRAdd && r.interactionID == messageRRAdd.id && r.roleID == role.id)
						if (existingReactionRole) return interaction.replyErrorMessage(`Emoji already use for this interaction.`);
						await messageRRAdd.react(emoteRRAdd.id ? `${emoteRRAdd.name}:${emoteRRAdd.id}` : emoteRRAdd);
						let arrayRRAdd = settings.reactionroles
						arrayRRAdd.push({ channelID: channelRRAdd.id, messageID: messageRRAdd.id, emoji: emoteRRAdd.id ? emoteRRAdd.id : emoteRRAdd, roleID: role.id })
						await this.db.updateGuild(interaction.guildId, { reactionroles: arrayRRAdd });
						interaction.replySuccessMessage(`Role-reaction have been created.`);
					} catch (e: any) {
						if (e.message.match('Unknown interaction')) return interaction.replyErrorMessage(`interaction not found`);
						else return interaction.replyErrorMessage(`An error occurred. Please try again.`);
					}
				} else return interaction.replyErrorMessage(`An error occurred. Please try again.`)
				break;

			case 'rem':
				try {
					const channel = this.util.resolveChannel(interaction.guild, args.get('channel').value);
					if (!channel) return interaction.replyErrorMessage(`Channel not found.`);
					const messageRR = await (await this.util.resolveChannel(interaction.guild, args.get('channel').value)).messages.fetch(args.get('message').value)
					if (!messageRR) return interaction.replyErrorMessage(`interaction not found`);
					if (!settings.reactionroles.find(r => r.interactionID === messageRR.id)) return interaction.replyErrorMessage(`There is no role-reaction under this interaction.`);
					let emojiToRemove = await this.util.resolveGuildEmoji(interaction.guild, args.get('emoji').value);
					if (!emojiToRemove && this.util.isUnicode(args.get('emoji').value)) emojiToRemove = args.get('emoji').value;
					if (!emojiToRemove) return interaction.replyErrorMessage(`Emoji not found.`);
					const role = this.util.resolveRole(interaction.guild, args.get('role').value);
					if (!role || role.id == interaction.guildId) return interaction.replyErrorMessage(` Impossible de trouver ce rôle.`);
					this.db.updateGuild(interaction.guildId, { $pull: { reactionroles: { channelID: channel, messageID: messageRR.id, emoji: emojiToRemove, roleID: role.id } } });
					interaction.replySuccessMessage(`I have deleted this role-reaction.`);
				} catch (e: any) {
					if (e.interaction.match('Unknown interaction')) return interaction.replyErrorMessage(`interaction not found`);
					else return interaction.replyErrorMessage(`An error occurred. Please try again.`);
				}
				break;
			case 'rem-all':
				await this.db.updateGuild(interaction.guildId, { reactionroles: [] })
				interaction.replySuccessMessage(`All guild roles-reactions have been deleted`);
				break;
		}
	}
}