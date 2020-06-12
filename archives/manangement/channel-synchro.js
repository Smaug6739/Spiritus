const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  let { TRUE,FALSE } = require('../configstyle');
  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier les salons.`);


    if(!message.channel.parent) return message.channel.send(`${FALSE}Le salon n'est dans aucune catégorie`)

    try{
      message.channel.lockPermissions()
      .then(message.channel.send(`${TRUE}J'ai bien synchroniser les permissions du channel ${message.channel.name} avec les permissions de la catégorie ${message.channel.parent.name}`))
    }catch(err){
      message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`)
      client.channels.cache.get('716571613348495420').send(`Une erreur sur la commande \`channel-synchro\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
    }
    

};

module.exports.help = {
  name: "channel-synchro",
  aliases: ['channel-synchro','synchronisation','synchro'],
  category : 'manangement',
  description: "Synchronise les permissions d'un channel avec sa catégorie",
  cooldown: 10,
  usage: '<channel>',
  //exemple :["kick @Smaug spam"],
  isUserAdmin: false,
  permissions: true,
  args: false
};


