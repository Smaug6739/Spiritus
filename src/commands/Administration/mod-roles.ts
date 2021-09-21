import Command from '../CommandClass';
import type { ICommandArgs, ICommandInteraction, IGuildDB } from '../../typescript/interfaces'
import { MessageEmbed } from "discord.js"
export default class extends Command {
	constructor(spiritus: any) {
		super(spiritus, {
			name: 'mod-roles',
			aliases: [],
			options: [],
			description: 'Manage roles from the server.',
			category: 'Administration',
			cooldown: 5,
			userPermissions: ['MANAGE_ROLES', 'MANAGE_MEMBERS'],
			botPermissions: ['MANAGE_ROLES'],
			subCommands: [
				{
					name: 'list',
					description: 'List of moderators roles on the guild.',
				},
				{
					name: 'add',
					description: 'Add moderator role on the guild.',
					usage: '<role>',
					options: [
						{
							name: 'role',
							description: 'Role to add.',
							type: 'STRING',
							required: true
						},
					],
					exemples: ['@role']
				},
				{
					name: 'rem',
					description: 'Remove moderator role on the guild.',
					usage: '<role>',
					options: [
						{
							name: 'role',
							description: 'Role to remove.',
							type: 'STRING',
							required: true
						},
					],
					exemples: ['@role']
				},
			],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		switch (interaction.subcommand) {
			case 'list':
				if (!settings.modRoles || settings.modRoles.length < 1) return interaction.replyErrorMessage(`No mods roles on this server`)
				const embed = new MessageEmbed()
					.setTitle(`List of moderators roles on the guild **${interaction.guild!.name}** | ${settings.modRoles.length} in total`)
				if (interaction.guild!.iconURL()) embed.setThumbnail(interaction.guild!.iconURL()!)
				embed.setColor(this.colors.embed)
				embed.setDescription('<@&' + settings.modRoles.join('>, <@&') + '>');
				interaction.reply({ embeds: [embed] });
				break;
			case 'add':
				const roleToAdd = this.util.resolveRole(interaction.guild, args.get('role').value);
				if (!roleToAdd) return interaction.replyErrorMessage(`Role not found.`);
				if (settings.modRoles.includes(roleToAdd.id)) return interaction.replyErrorMessage(`This role is already a moderator.`);
				else {
					await this.db.updateGuild(interaction.guildId, { $push: { modRoles: roleToAdd.id } })
					interaction.replySuccessMessage(`This role is now a moderator.`);
				}
				break;
			case 'rem':
				const roleToRemove = this.util.resolveRole(interaction.guild, args.get('role').value);
				if (!roleToRemove) return interaction.replyErrorMessage(`Role not found.`);
				if (!settings.modRoles.includes(roleToRemove.id)) return interaction.replyErrorMessage(`This role is not a moderator.`);
				await this.db.updateGuild(interaction.guildId, { $pull: { modRoles: roleToRemove.id } })
				interaction.replySuccessMessage(`The role \`${roleToRemove.name}\` no longer moderator.`);
				break;
		}
	}
}