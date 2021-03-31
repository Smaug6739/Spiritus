const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, settings) => {
    const embed = new MessageEmbed()
        .setTitle(`Invite link :`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=1946446974`)
        .setTimestamp()
        .setFooter()
    message.channel.send(embed)
}
module.exports.help = {
    name: 'invite',
    aliases: ['invite'],
    category: 'bot',
    description: 'Send link invite for the bot.',
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
