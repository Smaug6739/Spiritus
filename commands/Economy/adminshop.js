module.exports.run = async (client, message, args, settings) => {
    switch (args[0].toLowerCase()) {
        case 'add':
            if (settings.shop.length > 14) return message.channel.sendErrorMessage(`Your guild has reached the maximum number of items that can be contained in the shop (15).`)
            const objetName = args[1]
            const objetPrix = parseInt(`${args[2]}`)
            const objetDescription = args.slice(3).join(' ')
            if (objetName.length > 30) return message.channel.sendErrorMessage(`You cannot choose a name longer than 30 characters.`)
            if (objetDescription.length > 300) return message.channel.sendErrorMessage(`You cannot choose a description longer than 300 characters.`)
            if (isNaN(objetPrix) == true) return message.channel.sendErrorMessage(`The price must be a number. No \`${args[2]}\` .`);
            if (objetPrix > 999) return message.channel.sendErrorMessage(`You cannot choose a price longer than 1000 ${client.config.emojis.coins}.`)
            if (settings.shop) {
                let existObj = settings.shop.find(e => e.name == objetName)
                if (existObj) return message.channel.sendErrorMessage(`An item with this name already exist.`)
                let tableau = []
                tableau = settings.shop
                tableau.push({
                    name: objetName,
                    price: objetPrix,
                    description: objetDescription,
                    redwareRole: '',
                    redwareMemberID: ''
                })
                await client.updateGuild(message.guild, { shop: tableau });
                message.channel.sendSuccessMessage(`The item \`${objetName}\` has been created.`)
            }
            break;
        case 'rem':
            if (settings.shop) {
                if (args.length == 2 && args[1] == 'all') {
                    settings.shop.splice(0, settings.shop.length);
                    settings.save();
                    return message.channel.sendSuccessMessage(`Every items have been deleted.`);
                } else {
                    const title = args[1]
                    let objet = settings.shop.find(e => e.name == title)
                    if (objet) {
                        client.updateGuild(message.guild, { $pull: { shop: { name: title } } });
                        message.channel.sendSuccessMessage(`Item deleted.`)
                    }
                    else return message.channel.sendErrorMessage(`Item not found.`)
                }
            } else return message.channel.sendErrorMessage(`No item found.`)
            break;
    }
}
module.exports.help = {
    name: 'adminshop',
    aliases: ['adminshop', 'admin-shop'],
    category: 'economy',
    description: 'Configure la boutique.',
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
            args: 3,
            exemples: ['Spiritus 1500 Amazing item with the name of the bot !']
        },
        {
            name: 'rem',
            description: 'Remove item to the shop or remove all items.',
            usage: '[name] | all',
            args: 1,
            exemples: ['Spiritus', 'all']
        },
    ]
}
