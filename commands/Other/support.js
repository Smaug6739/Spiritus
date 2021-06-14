module.exports.run = (client, interaction) => {

    interaction.reply(`Support server is : https://discord.gg/TC7Qjfs`)

}
module.exports.help = {

    name: 'support',
    aliases: ['support'],
    category: 'other',
    description: 'Send link to the support.',
    cooldown: 10,
    usage: '',
    exemple: [],
    isUserAdmin: false,
    moderator: false,
    args: false,
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
