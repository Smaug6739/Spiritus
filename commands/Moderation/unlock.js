module.exports.run = (client, message, args) => {
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier ce channel.`);
    
    let nom = message.guild.channels.cache.find(r => r.name === args.toString());
    let lien = message.guild.channels.cache.find(r => r.id === args[0].replace(/<.*#/, '').slice(0, -1));

    if(nom){
        nom = nom.id;
        
        message.guild.channels.cache.get(nom).updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: true
          })
          .then(message.channel.send(`${client.config.emojis.TRUE}J'ai bien unlock le channel <#${nom}>`))
          .catch(console.error)

    }else if(lien){
        lien = lien.id;
        message.guild.channels.cache.get(lien).updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: true
          })
          .then(message.channel.send(`${client.config.emojis.TRUE}J'ai bien unlock le channel <#${lien}>`))
          .catch(console.error)

    }else{
        try{
            message.guild.channels.cache.get(args[0]).updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: true
              })
              .then(message.channel.send(`${client.config.emojis.TRUE}J'ai bien lock le channel <#${args[0]}>`))
              .catch(console.error);
        }catch(err){
             //client.channels.cache.get('716624695205691513').send(`Une erreur sur la commande \`lock\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce channel...`);
             
            

        }
    }
      
}

module.exports.help = {
    name: "unlock",
    aliases: ['unlock'],
    category : 'moderation',
    description: "unlock un channel",
    cooldown: 5,
    usage: '<#salon> ou <salon_name> ou <id_salon>',
    exemple :["unlock #general"],
    isUserAdmin: false,
    permissions: true,
    args: true,
    sousCommdandes : []
  };