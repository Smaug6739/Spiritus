module.exports.run = (client, message, args) => {
    
    message.channel.send(args.join(' '))
    
}
module.exports.help = {

    name: 'say',
    aliases: ['say'],
    category: 'fun',
    description: 'Permet d\'envoyer un message.',
    cooldown: 10,
    usage: 'text',
    exemple: ["say Spiritus"],
    isUserAdmin: false,
    permissions: true,
    args: true,
    sousCommdandes: []
}
