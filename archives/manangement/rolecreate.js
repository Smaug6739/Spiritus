module.exports.run = (client, message, args) => {
  let { TRUE,FALSE } = require('../../configstyle');
  if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier les roles.`);

      if(message.member.hasPermission('MANAGE_ROLES')){
          if(args[0].includes('BLUE')||args[0].includes('BLACK')||args[0].includes('GREEN')||args[0].includes('RED')||args[0].includes('YELLOW')){
          let role_name = (args.splice(1).join(' ') || 'new role');
          if(role_name.length > 99) return message.channel.send(`${FALSE}Le nom du role doit etre inferieur a 100 caractères.`);
          message.guild.roles.create({
            data: {
              name: role_name,
              color: args[0],
            },
          })
          .then(message.channel.send(`${TRUE}J'ai bien crée le role ${role_name}`))
          .catch(console.error);
          
          }else{
          let role_name = (args.splice(0).join(' ') || 'new role');
          if(role_name.length > 99) return message.channel.send(`${FALSE}Le nom du role doit etre inferieur a 100 caractères.`);
          message.guild.roles.create({
            data: {
              name: role_name,
            },
          })
          .then(message.channel.send(`${TRUE}J'ai bien crée le role ${role_name}`))
          .catch(console.error);
          
          }
          
      }else{
          return message.channel.send(`${FALSE}Vous devez avoir la permission de gérer les roles pour utiliser cette commande.`)
      }

}
module.exports.help = {
    
    name : 'role-create',
    aliases : ['role-create','role-cre'],
    category : 'manangement',
    description : 'Crer un role',
    cooldown : 5,
    usage : '{color} <name>',
    exemple :["role-create name"],
    permissions : false,
    isUserAdmin: false,
    args : true,
    sousCommdandes : [""]
}
