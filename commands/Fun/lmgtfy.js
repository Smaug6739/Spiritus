module.exports.run = (client, interaction, args) => {
    const argSearch = client.getArg(args, 'search')
    const argSplit = argSearch.split(' ').join('+')
    interaction.reply(`https://lmgtfy.com/?q=${argSplit}`)

}
module.exports.help = {

    name: 'lmgtfy',
    aliases: ['lmgtfy'],
    category: 'fun',
    description: 'Send link lmgtfy.',
    cooldown: 10,
    usage: '<question>',
    exemple: ["lmgtfy question ?"],
    isUserAdmin: false,
    moderator: false,
    args: [
        {
            name: 'search',
            description: 'The search',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
