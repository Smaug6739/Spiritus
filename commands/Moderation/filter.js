const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  if(!args[0]){
    const embed = new MessageEmbed()
    
    return message.channel.send(embed)
}
};
 
module.exports.help = {
  name: "filter",
  aliases: ['filter'],
  category : 'moderation',
  description: "Interdit certains mots sur le serveur.",
  cooldown: 10,
  usage: '<mot_a_interdir>',
  exemple :["filter fck"],
  isUserAdmin: false,
  permissions: true,
  args: false,
  sousCommdandes : []
};



