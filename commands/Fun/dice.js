const { MessageEmbed } = require('discord.js');
module.exports.run = (client, message, args) => {
    let nb_dés = args[0]
    let count = args[1]
    if (isNaN(nb_dés) || Math.sign(nb_dés) != 1) return message.channel.sendErrorMessage(` The number of dice must be a valid number.`);
    if (isNaN(count) || Math.sign(count) != 1) return message.channel.sendErrorMessage(` The number of faces must be a valid number.`);
    if (nb_dés > 30) return message.channel.sendErrorMessage(` You cannot roll more than 30 dice at a time.`)
    if (count > 50) return message.channel.sendErrorMessage(` The maximum number of faces per dice is 50.`)
    function entierAleatoire(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let tableau = []
    for (let i = 0; i < nb_dés; i++) {
        var entier = entierAleatoire(1, count);
        let a = 1;
        tableau.push(`Launched number ` + (i + a) + ` to give value ` + entier)
    }
    const exampleEmbed = new MessageEmbed()
        .setColor(client.config.color.EMBEDCOLOR)
        .setAuthor(`Dices :`, `${client.user.avatarURL()}`)
        .setDescription(tableau)
        .setTimestamp()
        .setFooter(`Command module: Fun`)
    message.channel.send(exampleEmbed)
}
module.exports.help = {
    name: 'dice',
    aliases: ['dice', 'random', 'roll'],
    category: 'fun',
    description: 'Roll one or more dice.',
    cooldown: 10,
    usage: '<numbre_dice> <max_dice>',
    exemple: ["dice 3 6"],
    isUserAdmin: false,
    moderator: false,
    args: [
        {
            name: 'dices',
            description: 'Number of dices',
            type: 'STRING',
            required: true
        },
        {
            name: 'max_value',
            description: 'Max value of dices',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}