module.exports.run = (client, message, args) => {
    //let role = message.guild.roles.cache.find(r => r.name === args.toString());
    const {FALSE,TRUE} = require('../../configstyle')
    let  role = message.mentions.roles.first()
    let utilisateur = message.mentions.members.first() || message.member
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${FALSE}Je n'ai pas la permission pour mettre a jour les roles d'un utilisateur.`);

    if (role) {
        if(message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send(`${FALSE}Je n'ai pas un role sufisant pour vous supprimer ce role`)
        if(message.member.roles.highest.comparePositionTo(role) <= 0){
           return message.channel.send(`${FALSE}Vous ne pouvez pas supprimer un role au superieur ou égale a votre plus haut role.`);
        }else{
            if (!utilisateur.roles.cache.has(role.id)) return message.channel.send(`${FALSE}L'utilisateur ne posséde pas ce role.`);
            //if (role.permissions.has('KICK_MEMBERS')) return message.channel.send("Vous ne pouvez pas avoir ce rôle!");
    
            utilisateur.roles.remove(role)
            .then(m => message.channel.send(`${TRUE}J'ai bien supprimer le role ${role} de ${utilisateur}.`))
            .catch(e => console.log(e));
            
            //console.log('Le role est ajoutable')
        }
    }else{
        message.channel.send(`${FALSE}Le rôle n'existe pas...`);
    }
}
module.exports.help = {
  name: "role-rem",
  aliases: ['role-rem','rem'],
  category : 'moderation',
  description: "Supprime un role d'un utilisateur",
  cooldown: 0.1,
  usage: '<@user> <role> ou <role>',
  exemple :["rem @Smaug @membre"],
  isUserAdmin: false,
  permissions: true,
  args: true
};