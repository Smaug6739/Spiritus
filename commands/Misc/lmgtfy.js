module.exports.run = (client, message, args) => {
    
    message.channel.send(`https://lmgtfy.com/?q=${args.join("+")}`)
    
}
module.exports.help = {

    name: 'lmgtfy',
    aliases: ['lmgtfy'],
    category: 'misc',
    description: 'Permet d\'envoyer un lien lmgtfy.',
    cooldown: 10,
    usage: 'question',
    exemple: ["lmgtfy question ?"],
    isUserAdmin: false,
    permissions: true,
    args: true,
    sousCommdandes: []
}
