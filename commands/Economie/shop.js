const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args, settings, dbUser) => {
    if (!args[0]) {
        const embed = new MessageEmbed()
        embed.setTitle(`Shop du serveur ${message.guild.name} :`)
        embed.setColor(client.config.color.EMBEDCOLOR)
        embed.setTimestamp()
        embed.setFooter('BOT ID : 689210215488684044')
        if (settings.shop) {
            settings.shop.slice(0, 20).forEach(objet => {
                embed.addField(`${client.config.emojis.fleche} ${objet.name} __Prix :__ ${objet.price} ${client.config.emojis.coins}`, `__Description :__ ${objet.description}`)
            });
            embed.addField(`\u200b`, `Vous pouvez acheté des objets avec la commande \`${settings.prefix}shop buy <objet_name>\``, false)
        } else {
            embed.addField(`Aucun objet dans la boutique.`, `\u200b`, true)
        }

        return message.channel.send(embed)
    }
    if (args[0].toLowerCase() === 'buy')
        if (!dbUser) return message.channel.send(`${client.config.emojis.error}Vous avez 0 ${client.config.emojis.coins} vous ne pouvez donc rien acheté a la boutique !`)
    if (!dbUser.coins) return message.channel.send(`${client.config.emojis.error}Vous avez 0 ${client.config.emojis.coins} vous ne pouvez donc rien acheté a la boutique !`)
    const objetName = args[1]
    let existObj = settings.shop.find(e => e.name == objetName)
    if (!existObj) return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouvé cet objet.`)
    else {
        if (dbUser.coins < existObj.price) return message.channel.send(`${client.config.emojis.error}Vous n'avez pas asser d'argent pour acheté ceci.`)
        await client.remCoins(client, message.member, existObj.price)
        let tableau = []
        tableau = dbUser.objets
        tableau.push({
            name: objetName,
            price: existObj.price,
            description: existObj.description,
        })
        client.updateUser(message.member, { objets: tableau })
        message.channel.send(`${client.config.emojis.success}Vous venez d'acheter l'objet \`${existObj.name}\` qui à été placé dans votre inventaire.`)


    }
}
module.exports.help = {
    name: 'shop',
    aliases: ['shop'],
    category: 'economie',
    description: 'Montre la boutique  et permet les achats.',
    cooldown: 10,
    usage: '',
    exemple: [''],
    isUserAdmin: false,
    permissions: false,
    args: false,
    subcommands: []
}
