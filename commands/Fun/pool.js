const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args, settings) => {
    const question = args.join(' ')
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Sondage de ${message.author.username} :**\n${question}`)
        .addField(`\u200b`, `🟩 Yes \n🟦 Neutral \n🟥 No`)
        .setTimestamp()
        .setFooter(`Command module: Fun`)
    const msg = await message.channel.send(embed)
    await msg.react('🟩')
    await msg.react('🟦')
    await msg.react('🟥')
};

module.exports.help = {
    name: "pool",
    aliases: ['pool'],
    category: 'fun',
    description: "Send pool in a channel.",
    cooldown: 3,
    usage: '<question>',
    exemple: ["pool <question>"],
    isUserAdmin: false,
    moderator: false,
    args: true,
    userPermissions: [],
    botPermissions: [],
    subcommands: []
};