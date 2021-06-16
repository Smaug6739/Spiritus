import Command from '../CommandClass';
import type { ICommandArgs, ICommandInteraction } from '../../typescript/interfaces'

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'pay',
			aliases: [],
			args: [
				{
					name: 'user',
					description: 'User to pay',
					type: 'STRING',
					required: true
				},
				{
					name: 'money',
					description: 'Money to give.',
					type: 'STRING',
					required: true
				},
			],
			description: 'Give coins to a user.',
			category: 'Economy',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs) {

		const dbUserInteraction = await this.db.getUser(interaction.user, interaction.guild!.id);
		if (!dbUserInteraction) return interaction.replyErrorMessage('User not found.');
		const userMention = await this.util.resolveMember(interaction.guild, args.get('user').value);
		if (!userMention) return interaction.replyErrorMessage('User not found.');
		const dbUserMention = await this.db.getUser(interaction.user, interaction.guild!.id);

		const moneyToGive = parseInt(args.get('money').value);
		if (isNaN(moneyToGive)) return interaction.replyErrorMessage('Please enter a valid number.')

		if (userMention.id === interaction.user.id) return interaction.replyErrorMessage(`You can't give coins to you.`);

		if (dbUserInteraction.coins < moneyToGive) return interaction.replyErrorMessage(`You don't have enough coins for this. You can have coins with the command \`daily\` `)
		if (!dbUserMention) {
			await this.db.createUser({
				guildID: userMention.guild.id,
				guildName: userMention.guild.name,
				userID: userMention.id,
				username: userMention.user.tag,
				coins: moneyToGive,
				daily: Date.now(),
			})
			await this.db.updateUser(interaction.guild!.id, interaction.user.id, {
				coins: (dbUserInteraction.coins - moneyToGive)
			})
			interaction.replySuccessMessage(`You have give **${moneyToGive}** ${this.emojis.coins} to ${userMention.user.username}`)
		} else {
			await this.db.updateUser(interaction.guild!.id, interaction.user.id, {
				coins: (dbUserInteraction.coins - moneyToGive)
			})
			await this.db.updateUser(interaction.guild!.id, userMention.id, {
				coins: (dbUserMention.coins + moneyToGive)
			})
			interaction.replySuccessMessage(`You have give **${moneyToGive}** ${this.emojis.coins} to ${userMention.user.username} !`)
		}
	}
}