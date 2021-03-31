module.exports.run = (client, message, args) => {

    client.channels.cache.get('748078482118017034').send(args.join(' '))
    message.channel.sendSuccessMessage(`Your suggestion has been sent. Thank you :heart:`)
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
    permissions: false,
    args: true,
    subcommands: []
}
