module.exports.run =async(client, message, args) => {
    let { FALSE } = require('../../configstyle');

    if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${FALSE}Je n'ai pas la permission de gérer les messages.`);

    message.channel.messages.fetch(args[0]).then(async msg => {
        let emoo = args[1]
        let emoji_string = emoo.replace(/<.*:/, '').slice(0, -1);
        await msg.react(message.guild.emojis.cache.get(emoji_string))
        await msg.reactions.removeAll()
        
    })
 
}
module.exports.help = {
    
    name : 'clear-reactions',
    aliases : ['clearrea','clear-rea'],
    category : 'moderation',
    description : 'Supprime une reaction d\'un message ',
    cooldown : 5,
    usage : '<id_message> <emoji>',
    exemple :["clear-reactions 713128046886125589 <:yo:712783546552680560>"],
    permissions : true,
    isUserAdmin: false,
    args : false
}
