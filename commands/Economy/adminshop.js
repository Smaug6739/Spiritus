module.exports.run = async (client, interaction, args, settings) => {
    switch (interaction.subcommand) {
        case 'add':
            if (settings.shop.length > 19) return interaction.replyErrorMessage(`Your guild has reached the maximum number of items that can be contained in the shop (20).`)
            const objetName = args.get('name').value;
            const objetPrix = parseInt(args.get('price').value)
            const objetDescription = args.get('description').value
            if (objetName.length > 30) return interaction.replyErrorMessage(`You cannot choose a name longer than 30 characters.`)
            if (objetDescription.length > 300) return interaction.replyErrorMessage(`You cannot choose a description longer than 300 characters.`)
            if (isNaN(objetPrix)) return interaction.replyErrorMessage(`The price must be a number. No \`${args[2]}\` .`);
            if (objetPrix > 10000) return interaction.replyErrorMessage(`You cannot choose a price longer than 10000 ${client.config.emojis.coins}.`)
            if (settings.shop) {
                let existObj = settings.shop.find(e => e.name == objetName)
                if (existObj) return interaction.replyErrorMessage(`An item with this name already exist.`)
                let tableau = []
                tableau = settings.shop
                tableau.push({
                    name: objetName,
                    price: objetPrix,
                    description: objetDescription,
                    redwareRole: '',
                    redwareMemberID: ''
                })
                await client.updateGuild(interaction.guild, { shop: tableau });
                interaction.replySuccessMessage(`The item \`${objetName}\` has been created.`)
            }
            break;
        case 'rem':
            if (settings.shop) {
                if (args.get('item').value === 'all') {
                    settings.shop.splice(0, settings.shop.length);
                    settings.save();
                    return interaction.replySuccessMessage(`Every items have been deleted.`);
                } else {
                    const title = args.get('item').value
                    let objet = settings.shop.find(e => e.name === title)
                    if (objet) {
                        client.updateGuild(interaction.guild, { $pull: { shop: { name: title } } });
                        interaction.replySuccessMessage(`Item deleted.`)
                    } else return interaction.replyErrorMessage(`Item not found.`)
                }
            } else return interaction.replyErrorMessage(`No item found.`)
            break;
    }
}
module.exports.help = {
    name: 'adminshop',
    aliases: ['adminshop', 'admin-shop'],
    category: 'economy',
    description: 'Configure the shop of guild.',
    cooldown: 10,
    usage: '',
    exemple: [],
    isUserAdmin: false,
    moderator: false,
    args: false,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: [],
    subcommands: [
        {
            name: 'add',
            description: 'Add item to the shop.',
            usage: '[name] [price] [description]',
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
            exemples: ['Spiritus 1500 Amazing item with the name of the bot !']
        },
        {
            name: 'rem',
            description: 'Remove item to the shop or remove all items.',
            usage: '[name] | all',
            args: [
                {
                    name: 'item',
                    description: 'Remove object of shop',
                    type: 'STRING',
                    required: true
                }
            ],
            exemples: ['Spiritus', 'all']
        },
    ]
}
