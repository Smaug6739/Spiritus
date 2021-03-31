const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args, settings) => {
    if (settings.expsysteme) {
        const embed = new MessageEmbed()
        if (message.guild.iconURL()) embed.setThumbnail(`${message.guild.iconURL()}`)
        embed.setTitle('TOP 10 ranking of guild users')
        embed.setColor(client.config.color.EMBEDCOLOR)
        embed.setTimestamp()
        embed.setFooter('Command module: Experience')
        await client.getUsers(message.guild).then(p => {
            p.sort((a, b) => (a.experience < b.experience) ? 1 : -1).splice(0, 10).forEach(e => {
                embed.addField(e.username, `${e.experience} experience points, level : ${e.level}`)
            })
        })
        message.channel.send(embed)

    } else return message.channel.sendErrorMessage(`The experience system is not activated on this server. To activate it use the command \`${settings.prefix} config experience\`.`)
};


module.exports.help = {

    name: 'leaderboard',
    aliases: ['leaderboard', 'lead'],
    category: 'experience',
    description: 'Ranking of users on the guild.',
    cooldown: 10,
    usage: '',
    exemple: [],
    moderator: false,
    isUserAdmin: false,
    args: false,
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}