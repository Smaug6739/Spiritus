const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, interaction, args, settings) => {
    console.log(args);

    if (!args.first()) {
        let haveItems = false;
        const embed = new MessageEmbed()
        embed.setTitle(`Shop of the guild ${interaction.guild.name} :`)
        embed.setColor(client.config.color.EMBEDCOLOR)
        embed.setTimestamp()
        embed.setFooter(`Command module: Economy`)
        if (settings.shop) {
            settings.shop.slice(0, 20).forEach(objet => {
                haveItems = true;
                embed.addField(`${client.config.emojis.fleche} ${objet.name} __Price :__ ${objet.price} ${client.config.emojis.coins}`, `__Description :__ ${objet.description}`)
            });
            if (!haveItems) embed.addField('\u200b', 'No items to buy at the moment.')
            embed.addField(`\u200b`, `You can buy object with the command \`${settings.prefix}shop buy <item_name>\``, false)
        } else {
            embed.addField(`No items in the shop.`, `\u200b`, true)
        }

        return interaction.reply({ embeds: [embed] })
    }
    if (args.get('buy')) {
        const dbUser = await client.getUser(interaction.user, interaction.guild.id);
        if (!dbUser) return interaction.replyErrorMessage(`You have 0${client.config.emojis.coins} so you can't buy object in shop.`)
        const objetName = args.get('buy').value
        let existObj = settings.shop.find(e => e.name == objetName)
        if (!existObj) return interaction.replyErrorMessage(`Object not found.`)
        else {
            if (dbUser.coins < existObj.price) return interaction.replyErrorMessage(`You don't have enough coins for this.`)
            await client.remCoins(client, interaction.member, existObj.price)
            let tableau = []
            tableau = dbUser.objets
            tableau.push({
                name: objetName,
                price: existObj.price,
                description: existObj.description,
            })
            client.updateUser(interaction.member, { objets: tableau })
            interaction.replySuccessMessage(`You just bought  \`${existObj.name}\`. This object is now in your inventory.`)
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
    args: [
        {
            name: 'buy',
            description: 'Buy an object in shop',
            type: 'STRING',
            required: false
        },
    ],
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
