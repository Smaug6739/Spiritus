const { MessageEmbed } = require("discord.js") 
module.exports.run = async (client, message, args) => {
    let { FALSE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier les roles.`);

    let role = message.guild.roles.cache.find(r => r.name === args.toString()) || message.mentions.roles.first()
    if(message.member.hasPermission('MANAGE_ROLES')){
        if(role){
            message.channel.send(`J'ai bien supprimer le role ${role.name}`)
            role.delete()
        }else{
            message.channel.send(`${FALSE}Je n\'ai pas trouver ce role... Essayez de le mentionner`)
        }
    }else{
        return message.channel.send(`${FALSE}Vous devez avoir la permission de gérer les roles pour utiliser cette commande !`)
    }
    
    
}
module.exports.help = {
    
    name : 'role-delete',
    aliases : ['role-delete'],
    category : 'manangement',
    description : 'Supprimer un role',
    cooldown : 5,
    usage : '',
    exemple :["emojiup name_emot new_name"],
    permissions : false,
    isUserAdmin: false,
    args : true
}
