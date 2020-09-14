module.exports.run = (client, message, args) => {
    
    message.channel.send(`Le lien du serveur support est : https://discord.gg/TC7Qjfs`)
    
}
module.exports.help = {

    name: 'support',
    aliases: ['support'],
    category: 'bot',
    description: 'Permet d\'envoyer le lien du support.',
    cooldown: 10,
    usage: '',
    exemple: [],
    isUserAdmin: false,
    permissions: false,
    args: false,
    sousCommdandes: []
}
