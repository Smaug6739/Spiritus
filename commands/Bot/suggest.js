module.exports.run = (client, interaction, args) => {

    client.channels.cache.get('748078482118017034').send(args.get('suggestion').value);
    interaction.replySuccessMessage(`Your suggestion has been sent. Thank you :heart:`);
}
module.exports.help = {

    name: 'suggest',
    aliases: ['suggest'],
    category: 'bot',
    description: 'Send suggestion for the bot.',
    cooldown: 15,
    usage: '<your_suggestion>',
    exemple: ['suggest new awsome feature'],
    isUserAdmin: false,
    moderator: false,
    args: [
        {
            name: 'suggestion',
            description: 'Your suggestion for the bot',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
