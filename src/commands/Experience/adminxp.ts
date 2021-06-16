import Command from '../CommandClass';
import type { ICommandArgs, ICommandInteraction, IGuildDB } from '../../typescript/interfaces'

export default class Ping extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'adminxp',
			aliases: [],
			args: [],
			description: 'Manage experience of users.',
			category: 'Experience',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [
				{
					name: 'add',
					description: 'Add exp to a user.',
					args: [
						{
							name: 'user',
							description: 'User to add experience',
							type: 'STRING',
							required: true
						},
						{
							name: 'experience',
							description: 'Number of experience points to add',
							type: 'STRING',
							required: true
						},
					],
				},
				{
					name: 'rem',
					description: 'Remove exp to a user.',
					args: [
						{
							name: 'user',
							description: 'User to add experience',
							type: 'STRING',
							required: true
						},
						{
							name: 'experience',
							description: 'Number of experience points to remove',
							type: 'STRING',
							required: true
						},
					],
				},
			],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		if (!settings.expsysteme) return interaction.replyErrorMessage(`The experience system is not activated on this server. To activate it use the command \`/config experience\`.`)
		const user = await this.spiritus.util.resolveMember(interaction.guild, args.get('user').value);
		const expChange = parseInt(args.get('experience').value);
		if (!user) return interaction.replyErrorMessage(`User not found.`);
		if (isNaN(expChange)) return interaction.replyErrorMessage('Please enter a valid number.');
		const dbUser = await this.spiritus.db.getUser(interaction.guild!.id, user.id);
		switch (interaction.subcommand) {
			case 'add':
				dbUser.experience -= expChange;
				dbUser.save();
				interaction.replySuccessMessage(`User experience is now \`${dbUser.experience += expChange}\`.`);
				break;
			case 'rem':
				dbUser.experience -= expChange;
				dbUser.save();
				interaction.replySuccessMessage(`User experience is now \`${dbUser.experience -= expChange}\`.`);
				break;
		}

	}
}