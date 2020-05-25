const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  let { FALSE,ROUGE } = require('../../configstyle');
  if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return console.log('Je n\'ai pas la permission envoyer messages');
  if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(`${FALSE}Je n'ai pas la permission pour ban un utilisateur.`);
  let user = message.mentions.users.first();
  let reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');
  user ? message.guild.member(user).ban(reason) : message.channel.send(`${FALSE}Je n'ai pas trouver cet utilisateur`);

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor(`${ROUGE}`)
    .setDescription(`**Action**: ban\n**Raison**: ${reason}`)
    .setThumbnail(user.displayAvatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    
  message.channel.send(embed);
};

module.exports.help = {
  name: "ban",
  aliases: ['ban'],
  category : 'moderation',
  description: "Ban un utilisateur",
  cooldown: 10,
  usage: '<@user> <raison>',
  exemple :["ban @Smaug spam"],
  isUserAdmin: true,
  permissions: true,
  args: true
};