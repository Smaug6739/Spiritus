const { MessageEmbed } = require("discord.js") 

module.exports.run = async (client, message, args) => {
    
        if(message.member.hasPermission('MANAGE_ROLES')){
           
                message.guild.roles.create({
                    data: {
                      name: args[0],
                      color: args[1],
                    },
                  })
                  .then(console.log)
                  .catch(console.error);
                  message.channel.send(`J'ai bien crée le role ${args[0]}`)

            
        }else{
            return message.channel.send('Vous devez avoir la permission de gérer les roles pour utiliser cette commande !')
        }

}
module.exports.help = {
    
    name : 'role-create',
    aliases : ['role-create'],
    category : 'manangement',
    description : 'Crer un role',
    cooldown : 5,
    usage : '',
    exemple :["emojiup name_emot new_name"],
    permissions : false,
    isUserAdmin: false,
    args : true
}
