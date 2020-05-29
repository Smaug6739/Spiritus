const {MessageEmbed}=require('discord.js')
const {PREFIX}=require('./config.js');
module.exports = (bot) => {

  
  
  
  /********************************************[EMOJIS]**********************************************************/
  
  const emojiEmbed = new MessageEmbed()
  
  .setTitle('Tableau de classement emojitique')
  .setDescription('Nommez vos émojis comme sur le tableau pour les placer à l\'endroit désiré')
  .setImage('https://cdn.discordapp.com/attachments/714242633375023164/714436203012816936/sketch-1590086562873.png')
  bot.on('message', message => {
  
    if(message.content === PREFIX +'emojitab')
     
      message.channel.send(emojiEmbed)
     
     
  });
  
  
  /********************************************[FLYER MULTIGAMING]**********************************************************/
  
  
  const flyersEmbed = new MessageEmbed()
  
  .setTitle('Affiche multigaming')
  .setDescription('Postez cette image accompagnée de votre lien d\'invitation pour recruter de nouveaux compagnons dans des groupes multigaming')
  .setImage('https://cdn.discordapp.com/attachments/714242633375023164/714435629366247444/sketch-1590357630728.png')
  bot.on('message', message => {
  
    if(message.content === PREFIX +'flyer multigaming')
     
      message.channel.send(flyersEmbed)
     
     
  });
  }