module.exports.run = async (client, message, args) =>{
    if(!client.config.ADMIN.includes(message.author.id)) return message.channel.send(`${client.config.emojis.FALSE}Tu n'est pas admin du BOT `)
        command = args.slice(1).join(" ")
        dir = args[0]
        chemin = `./../${dir}/${command}.js`
        try {
            delete require.cache[require.resolve(`${chemin}`)];
            client.commands.delete(command)
            const pull = require(`${chemin}`)
            client.commands.set(command, pull)
            message.channel.send(`${client.config.emojis.TRUE}Reloaded command \`${command}\``);
        } catch (err) {
            return message.channel.send(`${client.config.emojis.FALSE}An error occured: \n\`\`\`js\n${err}\n\`\`\``);
        }
    
    
}
module.exports.help = {
        
    name : 'reload',
    aliases : ['reload'],
    category : 'admin',
    description : 'Recharge une commande.',
    cooldown : 5,
    usage : '[dir] [file]',
    exemple :[],
    permissions : true,
    isUserAdmin: false,
    args : true,
    sousCommdandes : [""]

}    
    