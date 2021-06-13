const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, interaction, args, settings) => {
    if (args.get('rem')) {
        const dbUser = await client.getUser(interaction.user, interaction.guild.id)
        const title = args.get('rem').value
        let objet = dbUser.objets.map(e => e.name).includes(title)
        if (objet) {
            client.updateUser(interaction.member, { $pull: { objets: { name: title } } });
            interaction.replySuccessMessage(`I have deleted this item.`)
        }
        else return interaction.replyErrorMessage(`Item not found.`)
    } else {
        if (args.get('user')) {
            const user = client.resolveUser(args.get('user').value);
            const mentionUser = await client.getUser(user, interaction.guild.id)
            if (mentionUser == undefined) return interaction.reply(`${user.user.username} have **0** ${client.config.emojis.coins} and don't have items.`)
            else {
                const embed = new MessageEmbed()
                embed.setTitle(`Inventaire de **${user.username}**`)
                embed.setColor(client.config.color.EMBEDCOLOR)
                if (interaction.guild.iconURL()) embed.setThumbnail(`${interaction.guild.iconURL()}`)
                embed.addField(`\u200b`, `**${user.tag}** have ${mentionUser.coins} ${client.config.emojis.coins} .`, false)
                if (mentionUser.objets) {
                    embed.addField("Items possesses : ", `\u200b`, false)
                    mentionUser.objets.slice(0, 15).forEach(objet => {
                        embed.addField(`\u200b`, `${client.config.emojis.fleche} ${objet.name}\n__Value :__ ${objet.price} ${client.config.emojis.coins}\n__Description :__ ${objet.description}`, false)
                    });
                    embed.addField(`\u200b`, `You can delete item with the command \`inventaire rem\``, false)
                }
                embed.setTimestamp()
                embed.setFooter(`Inventory of ${user.tag} (${user.id})`)
                interaction.reply({ embeds: [embed] })
            }
        } else {
            const dbUser = await client.getUser(interaction.user, interaction.guild.id);
            if (!dbUser) {
                await client.createUser({
                    guildID: interaction.member.guild.id,
                    guildName: interaction.member.guild.name,
                    userID: interaction.member.id,
                    username: interaction.member.user.tag,
                    coins: 0,
                    daily: Date.now(),
                })
                interaction.reply(`You have **0** ${client.config.emojis.coins} and you don't have items ${interaction.author}.`)
            } else {
                if (!dbUser.coins) client.updateUser(interaction.member, { coins: 0 })
                const embed = new MessageEmbed()
                embed.setTitle(`Inventory of **${interaction.member.user.username}**`)
                embed.setColor(client.config.color.EMBEDCOLOR)
                if (interaction.guild.iconURL()) embed.setThumbnail(`${interaction.guild.iconURL()}`)
                embed.addField(`\u200b`, `**${interaction.member.user.tag}** has ${dbUser.coins} ${client.config.emojis.coins} .`, false)
                if (dbUser.objets) {
                    embed.addField("Items possesses : ", `\u200b`, false)
                    dbUser.objets.slice(0, 15).forEach(objet => {
                        embed.addField(`\u200b`, `${client.config.emojis.fleche} ${objet.name}\n__Value :__ ${objet.price} ${client.config.emojis.coins}\n__Description :__ ${objet.description}`, false)
                    });
                    embed.addField(`\u200b`, `You can delete items with the command \`inventory rem\``, false)
                }
                embed.setTimestamp()
                embed.setFooter(`Inventory of ${interaction.member.user.tag} (${interaction.member.user.id})`)
                interaction.reply({ embeds: [embed] })
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
    moderator: false,
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
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
