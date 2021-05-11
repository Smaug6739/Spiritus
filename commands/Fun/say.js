module.exports.run = (client, interaction, args) => {

    interaction.reply(client.getArg(args, 'message'))

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
    args: [
        {
            name: 'message',
            description: 'Message to send',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
