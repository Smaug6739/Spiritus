const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if(isNaN(args[0]) || (args[0] < 1 || args[0] > 100 )) return message.reply('Merci de spécifier un nombre valide !')
  const messages = await  message.channel.messages.fetch({
      limit : Math.min(args[0],100),
      before : message.id
  });
  message.delete();
  message.channel.bulkDelete(messages);
  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("#dc143c")
    .setDescription(`**Action**: purge\n**Nbr messages**: ${args[0]}\n**Salon**: ${message.channel}`)
    
  message.channel.send(embed);
};

module.exports.help = {
  name: "purge",
  aliases: ['purge'],
  category : 'moderation',
  description: "Permet de supprimer le nombre de messages indiqués",
  cooldown: 10,
  usage: '<nb_messages>',
  //exemple :["purge 50"],
  isUserAdmin: false,
  permissions: true,
  args: true
};