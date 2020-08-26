module.exports.run = (client, message, args) => {
    
        client.channels.cache.get('748078482118017034').send(args.join(' '))
        message.channel.send(`${client.config.emojis.success}Votre suggestion à bien été envoyée. Merci :heart:`)
}
module.exports.help = {

    name: 'suggest',
    aliases: ['suggest'],
    category: 'bot',
    description: 'Permet d\'envoyer une suggestion.',
    cooldown: 15,
    usage: '',
    exemple: [],
    isUserAdmin: false,
    permissions: true,
    args: false,
    sousCommdandes: []
}
