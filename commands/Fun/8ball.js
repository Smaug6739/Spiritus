const { MessageEmbed } = require('discord.js')
module.exports.run = (client, message, args, settings) => {
    const replies = ['Yes', 'No', 'Maybe']
    const question = args.join(' ')
    const reponce = Math.floor(Math.random() * replies.length)
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setColor(client.config.color.EMBEDCOLOR)
        .addField(`${question}`, `${replies[reponce]}`, false)
        .setTimestamp()
        .setFooter(`Command module: Fun`)
    message.channel.send(embed)
};

module.exports.help = {
    name: "8ball",
    aliases: ['8ball'],
    category: 'fun',
    description: "Ask a question to the magic ball.",
    cooldown: 5,
    usage: '<question>',
    exemple: ["8ball <question>"],
    isUserAdmin: false,
    moderator: false,
    args: [
        {
            name: 'question',
            description: 'Question to ask',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: [],
    botPermissions: [],
    subcommands: []
};