import { MessageEmbed } from 'discord.js';
import Command from '../CommandClass';
import type { ICommandArgs, ICommandInteraction } from '../../typescript/interfaces'

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'inventory',
			aliases: [],
			args: [
				{
					name: 'user',
					description: 'View invertory of user',
					type: 'STRING',
					required: false
				},
				{
					name: 'rem',
					description: 'Remove object of inventory',
					type: 'STRING',
					required: false
				}
			],
			description: 'See your inventory.',
			category: 'Economy',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs) {
		if (args.get('rem')) {
			const dbUser = await this.db.getUser(interaction.user, interaction.guild!.id)
			const title = args.get('rem').value
			let objet = dbUser.objets.map((e: any) => e.name).includes(title)
			if (objet) {
				this.db.updateUser(interaction.member, { $pull: { objets: { name: title } } });
				interaction.replySuccessMessage(`I have deleted this item.`)
			}
			else return interaction.replyErrorMessage(`Item not found.`)
		} else {
			if (args.get('user')) {
				const user = this.util.resolveUser(args.get('user').value);
				const mentionUser = await this.db.getUser(user, interaction.guild!.id)
				if (mentionUser == undefined) return interaction.reply(`${user.user.username} have **0** ${this.emojis.coins} and don't have items.`)
				else {
					const embed = new MessageEmbed()
					embed.setTitle(`Inventory of **${user.username}**`)
					embed.setColor(this.colors.EMBEDCOLOR)
					if (interaction.guild!.iconURL()) embed.setThumbnail(`${interaction.guild!.iconURL()}`)
					embed.addField(`\u200b`, `**${user.tag}** have ${mentionUser.coins} ${this.emojis.coins} .`, false)
					if (mentionUser.objets) {
						embed.addField("Items possesses : ", `\u200b`, false)
						mentionUser.objets.slice(0, 15).forEach((objet: any) => {
							embed.addField(`\u200b`, `${this.emojis.fleche} ${objet.name}\n__Value :__ ${objet.price} ${this.emojis.coins}\n__Description :__ ${objet.description}`, false)
						});
						embed.addField(`\u200b`, `You can delete item with the command \`inventaire rem\``, false)
					}
					embed.setTimestamp()
					embed.setFooter(`Inventory of ${user.tag} (${user.id})`)
					interaction.reply({ embeds: [embed] })
				}
			} else {
				const dbUser = await this.db.getUser(interaction.user, interaction.guild!.id);
				if (!dbUser) {
					await this.db.createUser({
						guildID: interaction.guildId,
						guildName: interaction.guild!.name,
						userID: interaction.user.id,
						username: interaction.user.tag,
						coins: 0,
						daily: Date.now(),
					})
					interaction.reply(`You have **0** ${this.emojis.coins} and you don't have items ${interaction.user}.`)
				} else {
					if (!dbUser.coins) this.db.updateUser(interaction.guildId, interaction.user.id, { coins: 0 })
					const embed = new MessageEmbed()
					embed.setTitle(`Inventory of **${interaction.user.username}**`)
					embed.setColor(this.colors.embed)
					if (interaction.guild!.iconURL()) embed.setThumbnail(`${interaction.guild!.iconURL()}`)
					embed.addField(`\u200b`, `**${interaction.user.tag}** has ${dbUser.coins} ${this.emojis.coins} .`, false)
					if (dbUser.objets) {
						embed.addField("Items possesses : ", `\u200b`, false)
						dbUser.objets.slice(0, 15).forEach((objet: any) => {
							embed.addField(`\u200b`, `${this.emojis.fleche} ${objet.name}\n__Value :__ ${objet.price} ${this.emojis.coins}\n__Description :__ ${objet.description}`, false)
						});
						embed.addField(`\u200b`, `You can delete items with the command \`inventory rem\``, false)
					}
					embed.setTimestamp()
					embed.setFooter(`Inventory of ${interaction.user.tag} (${interaction.user.id})`)
					interaction.reply({ embeds: [embed] })
				}
			}
		}

	}
}