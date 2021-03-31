module.exports.run = (client, message, args) => {

    message.channel.send(`https://lmgtfy.com/?q=${args.join("+")}`)

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
    args: true,
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
