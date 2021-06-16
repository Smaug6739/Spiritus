import Command from '../CommandClass';
import type { ICommandArgs, ICommandInteraction, IGuildDB } from '../../typescript/interfaces'

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'admin-shop',
			aliases: [],
			args: [],
			description: 'Give coins to a user.',
			category: 'Economy',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [
				{
					name: 'add',
					description: 'Add item to the shop.',
					args: [
						{
							name: 'name',
							description: 'Name of object',
							type: 'STRING',
							required: true
						},
						{
							name: 'price',
							description: 'Price of object',
							type: 'STRING',
							required: true
						},
						{
							name: 'description',
							description: 'Description of object',
							type: 'STRING',
							required: true
						},
					],
				},
				{
					name: 'rem',
					description: 'Remove item to the shop or remove all items.',
					args: [
						{
							name: 'item',
							description: 'Remove object of shop',
							type: 'STRING',
							required: true
						}
					],
				},
			],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {

		switch (interaction.subcommand) {
			case 'add':
				if (settings.shop.length > 19) return interaction.replyErrorMessage(`Your guild has reached the maximum number of items that can be contained in the shop (20).`)
				const objetName = args.get('name').value;
				const itemPrice = parseInt(args.get('price').value)
				const objetDescription = args.get('description').value
				if (objetName.length > 30) return interaction.replyErrorMessage(`You cannot choose a name longer than 30 characters.`)
				if (objetDescription.length > 300) return interaction.replyErrorMessage(`You cannot choose a description longer than 300 characters.`)
				if (isNaN(itemPrice)) return interaction.replyErrorMessage(`The price must be a number. No \`${itemPrice}\` .`);
				if (itemPrice > 10000) return interaction.replyErrorMessage(`You cannot choose a price longer than 10000 ${this.emojis.coins}.`)
				if (settings.shop) {
					let existObj = settings.shop.find(e => e.name == objetName)
					if (existObj) return interaction.replyErrorMessage(`An item with this name already exist.`)
					let arr = []
					arr = settings.shop
					arr.push({
						name: objetName,
						price: itemPrice,
						description: objetDescription,
						redwareRole: '',
						redwareMemberID: ''
					})
					await this.db.updateGuild(interaction.guild, { shop: arr });
					interaction.replySuccessMessage(`The item \`${objetName}\` has been created.`)
				}
				break;
			case 'rem':
				if (settings.shop) {
					if (args.get('item').value === 'all') {
						await this.db.updateGuild(interaction.guildID, { shop: [] });
						return interaction.replySuccessMessage(`Every items have been deleted.`);
					} else {
						const title = args.get('item').value
						let objet = settings.shop.find(e => e.name === title)
						if (objet) {
							this.db.updateGuild(interaction.guildID, { $pull: { shop: { name: title } } });
							interaction.replySuccessMessage(`Item deleted.`)
						} else return interaction.replyErrorMessage(`Item not found.`)
					}
				} else return interaction.replyErrorMessage(`No item found.`)
				break;
		}
	}
}