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
			userPermissions: ['MANAGE_ROLES', 'MANAGE_MEMBERS'],
			botPermissions: ['MANAGE_ROLES'],
			subCommands: [
				{
					name: 'list',
					description: 'List of moderators roles on the guild.',
					usage: '',
					args: 0,
					exemples: []
				},
				{
					name: 'add',
					description: 'Add moderator role on the guild.',
					usage: '<role>',
					args: 1,
					exemples: ['@role']
				},
				{
					name: 'rem',
					description: 'Remove moderator role on the guild.',
					usage: '<role>',
					args: 1,
					exemples: ['@role']
				},
			],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		switch (interaction.subcommand) {
			case 'list':
				if (!settings.modRoles || settings.modRoles.length < 1) return interaction.replyErrorMessage(`Il n'y a aucun roles modérateurs pour ce serveur. Pour en ajouter utilisez la commande \`${settings.prefix}modroles add @role\``)
				const embed = {
					title: `List of moderators roles on the guild **${interaction.guild!.name}** | ${settings.modRoles.length} in total`,
					thumbnail: {
						url: `${interaction.guild!.iconURL()}`,
					},
					color: `${this.colors.embed}`,
					description: '',
					fields: []
				};
				embed.description = '<@&' + settings.modRoles.join('>, <@&') + '>';
				interaction.reply({ embeds: [embed] });
				break;
			case 'add':
				const roleToAdd = this.util.resolveRole(interaction.guild, args.get('role').value);
				if (!roleToAdd) return interaction.replyErrorMessage(`Role not found.`);
				if (settings.modRoles.includes(roleToAdd.id)) return interaction.replyErrorMessage(`This role is already a moderator.`);
				else {
					await this.db.updateGuild(interaction.guildID, { $push: { modRoles: roleToAdd.id } })
					interaction.replySuccessMessage(`This role is now a moderator.`);
				}
				break;
			case 'rem':
				const roleToRemove = this.util.resolveRole(interaction.guild, args.get('role').value);
				if (!roleToRemove) return interaction.replyErrorMessage(`Role not found.`);
				if (!settings.modRoles.includes(roleToRemove.id)) return interaction.replyErrorMessage(`This role is not a moderator.`);
				await this.db.updateGuild(interaction.guildID, { $pull: { modRoles: roleToRemove.id } })
				interaction.replySuccessMessage(`The role \`${roleToRemove.name}\` no longer moderator.`);
				break;
		}
	}
}