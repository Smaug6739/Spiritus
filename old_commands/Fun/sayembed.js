const { MessageEmbed } = require('discord.js')
module.exports.run = (client, interaction, args) => {
    const text = args.get('message')
    const embed = new MessageEmbed()
        .setAuthor(`${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(text)
        .setTimestamp()
        .setFooter(`Command module: Fun`)
    interaction.reply(embed)
};

module.exports.help = {
    name: "sayembed",
    aliases: ['sayembed'],
    category: 'fun',
    description: "Send message in an embed.",
    cooldown: 3,
    usage: '<text>',
    exemple: ["sayembed Spiritus is the best bot !"],
    isUserAdmin: false,
    moderator: false,
    args: [
        {
            name: 'message',
            description: 'Message to send',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: [],
    botPermissions: ['SEND_MESSAGES'],
    subcommands: []
};