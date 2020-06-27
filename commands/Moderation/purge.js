const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  let { TRUE,FALSE,ROUGE,FLECHE } = require('../../configstyle');
  if(!args[0]){
    const embed = new MessageEmbed()
    .setTitle('Commande purge')
    .setDescription('La commande `purge` permet de gérer les messages du serveur graces aux sous commandes suivantes :')
    .addFields(
        { name: '\u200b', value: `${FLECHE}\`purge channel\` permet de purge  un channel entier.`, inline: false },
        { name: '\u200b', value: `${FLECHE}\`purge <number>\` permet de supprimer un certain nombre de messages.`, inline: false },
        { name: '\u200b', value: `${FLECHE}\`@user <number>\` permet de supprimer un certain nombre de messages d'une personne.`, inline: false },
    )
    .setTimestamp()
    .setFooter('BOT ID : 689210215488684044')
    return message.channel.send(embed)
}
  if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${FALSE}Je n'ai pas la permission de supprimer des messages.`);
  if(args[0] === 'channel'){
    message.channel.clone().then(message.channel.delete())    
  
  }else if(!isNaN(args[0])){
    if(isNaN(args[0]) || (args[0] < 1 || args[0] > 100 )) return message.reply('Merci de spécifier un nombre valide.')
    const messages = await  message.channel.messages.fetch({
        limit : Math.min(args[0],100),
        before : message.id
    });
    message.delete();
    message.channel.bulkDelete(messages);
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setColor(`${ROUGE}`)
      .setDescription(`**Action**: purge\n**Nbr messages**: ${args[0]}\n**Salon**: ${message.channel}`)
    message.channel.send(embed).then(m => {
      setTimeout(function() {
        m.delete()
      }, 3000)
    })
  }else if(message.mentions.users.first()){
    let user = message.guild.member(message.mentions.users.first());
    if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.channel.send(`${FALSE}il faut spécifier un nombre entre 1 et 100.`);
    const messages = (await message.channel.messages.fetch({
      limit: 100,
      before: message.id,
    })).filter(a => a.author.id === user.id).array();
    messages.length = Math.min(args[1], messages.length);
    if (messages.length === 0 || !user) return message.reply('aucun message à supprimer sur cet utilisateur (ou cet utilisateur n\'existe pas).');
    if (messages.length === 1) await messages[1].delete();
    else await message.channel.bulkDelete(messages);
    message.delete();
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setColor(`${ROUGE}`)
      .setDescription(`**Action**: prune\n**Nbr de messages**: ${args[1]}\n**Utilisateur**: ${user}`)
       message.channel.send(embed);
  }
};
 
module.exports.help = {
  name: "purge",
  aliases: ['purge'],
  category : 'moderation',
  description: "Permet de supprimer le nombre de messages indiqués",
  cooldown: 10,
  usage: '<nb_messages>',
  exemple :["purge 50"],
  isUserAdmin: false,
  permissions: true,
  args: false,
  sousCommdandes : []
};