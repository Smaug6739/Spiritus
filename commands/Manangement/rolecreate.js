const { MessageEmbed } = require("discord.js") 
module.exports.run = (client, message, args) => {
  let { FALSE } = require('../../configstyle');

        if(message.member.hasPermission('MANAGE_ROLES')){
           
                message.guild.roles.create({
                    data: {
                      name: args[1],
                      color: args[0],
                    },
                  })
                  .then(console.log)
                  .catch(console.error);
                  message.channel.send(`J'ai bien crée le role ${args[1]}`)

            
        }else{
            return message.channel.send(`${FALSE}Vous devez avoir la permission de gérer les roles pour utiliser cette commande !`)
        }

}
module.exports.help = {
    
    name : 'role-create',
    aliases : ['role-create'],
    category : 'manangement',
    description : 'Crer un role',
    cooldown : 5,
    usage : '',
    exemple :["role-create name"],
    permissions : false,
    isUserAdmin: false,
    args : true
}
