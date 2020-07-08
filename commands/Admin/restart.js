module.exports.run = async (client, message, args) =>{
    if(!client.config.ADMIN.includes(message.author.id)) return message.channel.send(`${client.config.emojis.FALSE}Tu n'est pas admin du BOT `)
        console.log("Redemarage")
        await message.channel.send(`${client.config.emojis.TRUE}OK .`)
        process.exit()
    
}
module.exports.help = {
        
    name : 'restart',
    aliases : ['restart'],
    category : 'admin',
    description : 'Redemare le bot.',
    cooldown : 5,
    usage : '',
    exemple :[],
    permissions : true,
    isUserAdmin: false,
    args : false,
    sousCommdandes : [""]

}    
    