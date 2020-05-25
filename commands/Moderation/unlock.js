module.exports.run = (client, message, args) => {
    let { TRUE,FALSE } = require('../../configstyle');

    let nom = message.guild.channels.cache.find(r => r.name === args.toString());
    let lien = message.guild.channels.cache.find(r => r.id === args[0].replace(/<.*#/, '').slice(0, -1));

    if(nom){
        nom = nom.id;
        
        message.guild.channels.cache.get(nom).updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: true
          })
          .then(message.channel.send(`${TRUE}J'ai bien unlock le channel <#${nom}>`))
          .catch(console.error)

    }else if(lien){
        lien = lien.id;
        message.guild.channels.cache.get(lien).updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: true
          })
          .then(message.channel.send(`${TRUE}J'ai bien unlock le channel <#${lien}>`))
          .catch(console.error)

    }else{
        return message.channel.send(`${FALSE}Je n'ai pas trouver ce channel...`)
    }
      
}

module.exports.help = {
    name: "unlock",
    aliases: ['unlock'],
    category : 'moderation',
    description: "unlock un channel",
    cooldown: 5,
    usage: '',
    //exemple :["kick @Smaug spam"],
    isUserAdmin: false,
    permissions: true,
    args: false
  };