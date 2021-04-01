const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args, settings, dbUser) => {
    if (!args[0]) {
        const embed = new MessageEmbed()
        embed.setTitle(`Shop of the guild ${message.guild.name} :`)
        embed.setColor(client.config.color.EMBEDCOLOR)
        embed.setTimestamp()
        embed.setFooter(`Command module: Economy`)
        if (settings.shop) {
            settings.shop.slice(0, 20).forEach(objet => {
                embed.addField(`${client.config.emojis.fleche} ${objet.name} __Price :__ ${objet.price} ${client.config.emojis.coins}`, `__Description :__ ${objet.description}`)
            });
            embed.addField(`\u200b`, `You can buy object with the command \`${settings.prefix}shop buy <item_name>\``, false)
        } else {
            embed.addField(`No items in the shop.`, `\u200b`, true)
        }

        return message.channel.send(embed)
    }
    if (args[0].toLowerCase() === 'buy') {
        if (!dbUser || dbUser && !dbUser.coins) return message.channel.sendErrorMessage(`You have 0${client.config.emojis.coins} so you can't buy object in shop.`)
        const objetName = args[1]
        let existObj = settings.shop.find(e => e.name == objetName)
        if (!existObj) return message.channel.sendErrorMessage(`Object not found.`)
        else {
            if (dbUser.coins < existObj.price) return message.channel.sendErrorMessage(`You don't have enough coins for this.`)
            await client.remCoins(client, message.member, existObj.price)
            let tableau = []
            tableau = dbUser.objets
            tableau.push({
                name: objetName,
                price: existObj.price,
                description: existObj.description,
            })
            client.updateUser(message.member, { objets: tableau })
            message.channel.sendSuccessMessage(`You just bought  \`${existObj.name}\`. This object is now in your inventory.`)


        }
    }
}
module.exports.help = {
    name: 'shop',
    aliases: ['shop'],
    category: 'economy',
    description: 'Show the store and allow purchases.',
    cooldown: 10,
    usage: 'buy <item_name>',
    exemple: ['shop buy Objetc'],
    isUserAdmin: false,
    moderator: false,
    args: false,
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
