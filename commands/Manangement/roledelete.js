const { MessageEmbed } = require("discord.js") 

module.exports.run = async (client, message, args) => {
    
    let role = message.guild.roles.cache.find(r => r.name === args.toString()) || message.mentions.roles.first()
    if(message.member.hasPermission('MANAGE_ROLES')){
        if(role){
            message.channel.send(`J'ai bien supprimer le role ${role.name}`)
            role.delete()
        }else{
            message.channel.send('Je n\'ai pas trouver ce role...\nEssayez de le mentionner :wink:')
        }
    }else{
        return message.channel.send('Vous devez avoir la permission de gérer les roles pour utiliser cette commande !')
    }
    
    
}
module.exports.help = {
    
    name : 'role-delete',
    aliases : ['role-delete'],
    category : 'manangement',
    description : 'Mettre a jour le nom d\'un emoji',
    cooldown : 5,
    usage : '',
    exemple :["emojiup name_emot new_name"],
    permissions : false,
    isUserAdmin: false,
    args : true
}
