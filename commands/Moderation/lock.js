module.exports.run = (client, message, args) => {
    let { TRUE,FALSE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier ce channel.`);

    let nom = message.guild.channels.cache.find(r => r.name === args.toString());
    let lien = message.guild.channels.cache.find(r => r.id === args[0].replace(/<.*#/, '').slice(0, -1));

    if(nom){
        nom = nom.id;
        message.guild.channels.cache.get(nom).updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: false
          })
          .then(message.channel.send(`${TRUE}J'ai bien lock le channel <#${nom}>`))
          .catch(console.error)

    }else if(lien){
        lien = lien.id;
        message.guild.channels.cache.get(lien).updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: false
          })
          .then(message.channel.send(`${TRUE}J'ai bien lock le channel <#${lien}>`))
          .catch(console.error)

    }else{
        return message.channel.send(`${FALSE}Je n'ai pas trouver ce channel...`)
    }
      
}

module.exports.help = {
    name: "lock",
    aliases: ['lock'],
    category : 'moderation',
    description: "Lock un channel",
    cooldown: 10,
    usage: '',
    //exemple :["kick @Smaug spam"],
    isUserAdmin: false,
    permissions: true,
    args: false
  };