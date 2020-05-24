const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  let { TRUE } = require('../../configstyle');

  /* message.guild.parent.lockPermissions()
    .then(`${TRUE}J'ai bien fermer le channel `)
    .catch(console.error)*/
    //console.log(message.channel.parent)
    message.channel.lockPermissions()
    .then(message.channel.send(`${TRUE}J'ai bien synchroniser les permissions du channel ${message.channel.name} avec les permissions de la catégorie ${message.channel.parent.name}`))
    .catch(console.error)
    //message.channel.clone().then(message.channel.delete())
};

module.exports.help = {
  name: "synchronisation",
  aliases: ['synchronisation','synchro'],
  category : 'manangement',
  description: "Synchronise les permissions d'un channel avec sa catégorie",
  cooldown: 10,
  usage: '<channel>',
  //exemple :["kick @Smaug spam"],
  isUserAdmin: false,
  permissions: true,
  args: false
};


