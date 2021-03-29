const { MessageEmbed } = require('discord.js')
module.exports.run = (client, message, args, settings) => {
    const texte = args.join(' ')
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(texte)
        .setTimestamp()
        .setFooter(`Command module: Fun`)
    message.channel.send(embed)
};

module.exports.help = {
    name: "sayembed",
    aliases: ['sayembed'],
    category: 'fun',
    description: "Send message in an embed.",
    cooldown: 3,
    usage: '<texte>',
    exemple: ["sayembed Spiritus is the best bot !"],
    isUserAdmin: false,
    permissions: false,
    args: true,
    subcommands: []
};