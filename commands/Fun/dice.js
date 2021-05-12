const { MessageEmbed } = require('discord.js');
module.exports.run = (client, interaction, args) => {
    let dicesCount = client.getArg(args, 'dices')
    let maxValue = client.getArg(args, 'max_value')
    if (isNaN(dicesCount) || Math.sign(dicesCount) != 1) return interaction.replyErrorMessage(`The number of dice must be a valid number.`);
    if (isNaN(maxValue) || Math.sign(maxValue) != 1) return interaction.replyErrorMessage(`The number of faces must be a valid number.`);
    if (dicesCount > 30) return interaction.replyErrorMessage(`You cannot roll more than 30 dice at a time.`)
    if (maxValue > 50) return interaction.replyErrorMessage(`The maximum number of faces per dice is 50.`)
    function entierAleatoire(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let arr = []
    for (let i = 0; i < dicesCount; i++) {
        var entier = entierAleatoire(1, maxValue);
        let a = 1;
        arr.push(`Launched number ` + (i + a) + ` to give value ` + entier)
    }
    const exampleEmbed = new MessageEmbed()
        .setColor(client.config.color.EMBEDCOLOR)
        .setAuthor(`Dices :`, `${client.user.avatarURL()}`)
        .setDescription(arr)
        .setTimestamp()
        .setFooter(`Command module: Fun`)
    interaction.reply(exampleEmbed)
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