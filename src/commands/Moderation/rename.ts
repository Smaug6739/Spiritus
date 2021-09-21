import Command from '../CommandClass';
import type { ICommandInteraction, ICommandArgs } from '../../typescript/interfaces';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'rename',
			aliases: [],
			options: [
				{
					name: 'user',
					description: 'User to change',
					type: 'STRING',
					required: true
				},
				{
					name: 'new_name',
					description: 'New username',
					type: 'STRING',
					required: true
				},
			],
			description: 'Rename user from the guild',
			category: 'Moderation',
			cooldown: 5,
			userPermissions: ['MODERATOR'],
			botPermissions: ['MANAGE_MEMBERS'],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs) {
		const argMember = args.get('user').value;
		const argNewName = args.get('new_name').value;
		const member = await this.spiritus.util.resolveMember(interaction.guild, argMember);
		if (member == undefined) return interaction.replyErrorMessage(`User not found.`);
		if (argNewName.length > 15) return interaction.replyErrorMessage(`The nickname is too long.`);
		if (argNewName.length < 2) return interaction.replyErrorMessage(`The nickname is too short.`);
		let e = 0;
		await member.setNickname(argNewName)
			.catch(() => {
				e = 1;
				interaction.replyErrorMessage(`An error has occurred. Please try again.`);
			})
		if (!e) interaction.replySuccessMessage(`I have updated the nickname of the user ${member}.`)
	}
}