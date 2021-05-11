const { MessageEmbed } = require('discord.js')
module.exports.run = (client, message, args, settings) => {
    let text = args.join(' ');
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let bin = text[i].charCodeAt().toString(2);
        result += Array(8 - bin.length + 1).join('0') + bin;
    }
    if (result.length > 1999) result = 'Result is too long.'
    const embed = new MessageEmbed()
        .setTitle(`Convert to binary`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(result)
        .setTimestamp()
        .setFooter(`Command module: Fun`)
    return message.channel.send(embed);
};

module.exports.help = {
    name: "binary",
    aliases: ['binary'],
    category: 'fun',
    description: "Convert string to binary.",
    cooldown: 3,
    usage: '<text>',
    exemple: ["binary Spiritus"],
    isUserAdmin: false,
    moderator: false,
    args: [
        {
            name: 'message',
            description: 'Message to convert in binary',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: [],
    botPermissions: [],
    subcommands: []
};