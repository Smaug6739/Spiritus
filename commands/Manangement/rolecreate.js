const { MessageEmbed } = require("discord.js") 
module.exports.run = (client, message, args) => {
  let { FALSE } = require('../../configstyle');
  if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier les roles.`);

        if(message.member.hasPermission('MANAGE_ROLES')){
           try{
            message.guild.roles.create({
              data: {
                name: args[0],
                color: args[1],
              },
            })
            .then(console.log)
            .catch(console.error);
            message.channel.send(`J'ai bien crée le role ${args[0]}`)
           }catch(err){
            message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`)
            client.channels.cache.get('716556824844828723').send(`Une erreur sur la commande \`role-create\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``)
           }
                

            
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
