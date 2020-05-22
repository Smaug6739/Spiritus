module.exports.run =async(client, message, args) => {
 
    message.channel.messages.fetch(args[0]).then(async msg => {
        let emoo = args[1]
        let emoji_string = emoo.replace(/<.*:/, '').slice(0, -1);
        await msg.react(message.guild.emojis.cache.get(emoji_string))
        await msg.reactions.removeAll()
        
    })
 
}
module.exports.help = {
    
    name : 'clearrea',
    aliases : ['clearrea'],
    category : 'moderation',
    description : 'Supprime toutes les reactions d\'un message ',
    cooldown : 5,
    usage : 'id_message emoji',
    exemple :["clearrea 713128046886125589 <:yo:712783546552680560>"],
    permissions : true,
    isUserAdmin: false,
    args : false
}
