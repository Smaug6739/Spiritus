module.exports.run = (client, message, args) => {

    message.channel.send(args.join(' '))

}
module.exports.help = {

    name: 'say',
    aliases: ['say'],
    category: 'fun',
    description: 'Send message in a channel.',
    cooldown: 10,
    usage: 'text',
    exemple: ["say Spiritus is the best bot !"],
    isUserAdmin: false,
    moderator: false,
    args: true,
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
