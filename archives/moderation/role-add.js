module.exports.run = (client, message, args) => {
    //let role = message.guild.roles.cache.find(r => r.name === args.toString());
    const {FALSE,TRUE} = require('../../configstyle')
    let  role = message.mentions.roles.first()
    let utilisateur = message.mentions.members.first() || message.member
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${FALSE}Je n'ai pas la permission pour mettre a jour les roles d'un utilisateur.`);

    if (role) {
        if(message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send(`${FALSE}Je n'ai pas un role sufisant pour vous attribuer ce role`)
        if(message.member.roles.highest.comparePositionTo(role) <= 0){
           return message.channel.send(`${FALSE}Vous ne pouvez pas ajouter un role superieur a votre role le plus haut.`);
        }else{
            if (utilisateur.roles.cache.has(role.id)) return message.channel.send("Vous avez déjà ce rôle! Essayez à nouveau!");
            //if (role.permissions.has('KICK_MEMBERS')) return message.channel.send("Vous ne pouvez pas avoir ce rôle!");
    
            utilisateur.roles.add(role)
            .then(m => message.channel.send(`${TRUE}J'ai bien ajouter le role ${role} a ${utilisateur}.`))
            .catch(e => console.log(e));
            
            //console.log('Le role est ajoutable')
        }
    }else{
        message.channel.send(`${FALSE}Le rôle n'existe pas...`);
    }
}
module.exports.help = {
  name: "role-add",
  aliases: ['role-add','add'],
  category : 'moderation',
  description: "Ajoute un role a un utilisateur",
  cooldown: 0.1,
  usage: '<@user> <role> ou <role>',
  exemple :["add @Smaug @membre"],
  isUserAdmin: false,
  permissions: true,
  args: true
};