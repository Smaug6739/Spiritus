const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args, settings, dbUser) => {
    if (args[0].toLowerCase() === 'rem') {
        const title = args[1]
        let objet = settings.shop.find(e => e.name == title)
        if (objet) {
            client.updateUser(message.member, { $pull: { objets: { name: title } } });
            message.channel.sendSuccessMessage(`I have deleted this item.`)
        }
        else return message.channel.sendErrorMessage(`Item not found.`)
    } else {
        if (message.mentions.users.first()) {
            const user = message.guild.member(message.mentions.users.first());
            const mentionUser = await client.getUser(user, message.member.guild.id)
            if (mentionUser == undefined) return message.channel.send(`${user.user.username} have **0** ${client.config.emojis.coins} and don't have items.`)
            else {
                const embed = new MessageEmbed()
                embed.setTitle(`Inventaire de **${user.user.username}**`)
                embed.setColor(client.config.color.EMBEDCOLOR)
                if (message.guild.iconURL()) embed.setThumbnail(`${message.guild.iconURL()}`)
                embed.addField(`\u200b`, `**${user.user.tag}** have ${mentionUser.coins} ${client.config.emojis.coins} .`, false)
                if (mentionUser.objets) {
                    embed.addField("Items possesses : ", `\u200b`, false)
                    mentionUser.objets.slice(0, 15).forEach(objet => {
                        embed.addField(`\u200b`, `${client.config.emojis.fleche} ${objet.name}\n__Value :__ ${objet.price} ${client.config.emojis.coins}\n__Description :__ ${objet.description}`, false)
                    });
                    embed.addField(`\u200b`, `You can delete item with the command \`inventaire rem\``, false)
                }
                embed.setTimestamp()
                embed.setFooter(`Inventory of ${user.user.tag} (${user.user.id})`)
                message.channel.send(embed)
            }
        } else {
            if (!dbUser && settings.expsysteme) return message.channel.send(`You have **0** ${client.config.emojis.coins} and you don't have item ${message.author}.`)
            if (!dbUser) {
                await client.createUser({
                    guildID: message.member.guild.id,
                    guildName: message.member.guild.name,
                    userID: message.member.id,
                    username: message.member.user.tag,
                    coins: 0,
                    daily: Date.now(),
                })
                message.channel.send(`You have **0** ${client.config.emojis.coins} and you don't have items ${message.author}.`)
            } else {
                if (!dbUser.coins) client.updateUser(message.member, { coins: 0 })
                const embed = new MessageEmbed()
                embed.setTitle(`Inventaire de **${message.member.user.username}**`)
                embed.setColor(client.config.color.EMBEDCOLOR)
                if (message.guild.iconURL()) embed.setThumbnail(`${message.guild.iconURL()}`)
                embed.addField(`\u200b`, `**${message.member.user.tag}** has ${dbUser.coins} ${client.config.emojis.coins} .`, false)
                if (dbUser.objets) {
                    embed.addField("Items possesses : ", `\u200b`, false)
                    dbUser.objets.slice(0, 15).forEach(objet => {
                        embed.addField(`\u200b`, `${client.config.emojis.fleche} ${objet.name}\n__Value :__ ${objet.price} ${client.config.emojis.coins}\n__Description :__ ${objet.description}`, false)
                    });
                    embed.addField(`\u200b`, `You can delete items with the command \`inventaire rem\``, false)
                }
                embed.setTimestamp()
                embed.setFooter(`Inventory of ${message.member.user.tag} (${message.member.user.id})`)
                message.channel.send(embed)
            }
        }
    }

}
module.exports.help = {
    name: 'inventory',
    aliases: ['inventory', 'money'],
    category: 'economie',
    description: 'Send your inventory.',
    cooldown: 10,
    usage: '<user>',
    exemple: ['inventory rem Item'],
    isUserAdmin: false,
    permissions: false,
    args: false,
    subcommands: []
}
