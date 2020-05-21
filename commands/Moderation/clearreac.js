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
    description : 'Ping le bot et donne son temps de réaction',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
