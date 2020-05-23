const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let { ROUGE } = require('../../configstyle');

  let user = message.guild.member(message.mentions.users.first());
  if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.reply('il faut spécifier un ***nombre*** entre 1 et 100!');

  const messages = (await message.channel.messages.fetch({
    limit: 100,
    before: message.id,
  })).filter(a => a.author.id === user.id).array();

  messages.length = Math.min(args[1], messages.length);

  if (messages.length === 0 || !user) return message.reply('aucun message à supprimer sur cet utilisateur (ou cet utilisateur n\'existe pas).');

  if (messages.length === 1) await messages[0].delete();
  else await message.channel.bulkDelete(messages);

  message.delete();

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor(`${ROUGE}`)
    .setDescription(`**Action**: prune\n**Nbr de messages**: ${args[1]}\n**Utilisateur**: ${args[0]}`)
    
  message.channel.send(embed);
};

module.exports.help = {
  name: "prune",
  aliases: ['prune'],
  category : 'moderation',
  description: "Purge un nombre de message spécifié sur un utilisateur spécifié",
  cooldown: 10,
  usage: '<@user> <nbr_messages>',
  //exemple :["prune @Smaug 50"],
  isUserAdmin: true,
  permissions: true,
  args: true
};