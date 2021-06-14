const { MessageEmbed } = require('discord.js')
module.exports.run = (client, interaction, args) => {
    const replies = ['Yes', 'No', 'Maybe']
    const question = args.get('question')
    const reponce = Math.floor(Math.random() * replies.length)
    const embed = new MessageEmbed()
        .setAuthor(`${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
        .setColor(client.config.color.EMBEDCOLOR)
        .addField(`${question}`, `${replies[reponce]}`, false)
        .setTimestamp()
        .setFooter(`Command module: Fun`)
    interaction.reply(embed)
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