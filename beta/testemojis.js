const {MessageEmbed} = require('discord.js')
module.exports.run =async(client, message, args) => {
    if(!args[1]) return message.channel.send('Merci de spécifier le nom du channel a modifier')
    if(!args[2]) return message.channel.send('Merci de spécifier le nouveau nom du channel a modifier')
    let channel = message.guild.channels.cache.find(r => r.name === args[1].toString()) //|| message.mentions.roles.first()
        if(channel){
            try{
                
               await channel.edit({ name: args[2] }).then(
                    message.channel.send(`J'ai bien mis a jour le channel ${channel.name}`)
                )//.catch(message.channel.send(`Une erreur s'est produite. Merci de réessayer`))

            }catch(err){
                client.channels.cache.get('721041152635175073').send(`Une erreur sur la commande \`channel-update\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            }
        }else{
            message.channel.send(`Je n\'ai pas trouver ce channel...`)
        }
}
module.exports.help = {
    
    name : 'test',
    aliases : ['test'],
    category : 'misc',
    description : 'Commande de test',
    cooldown : 3,
    usage : '',
    exemple :[],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : []
}

