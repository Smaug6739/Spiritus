const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
    if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission pour kick un utilisateur.`);

  let user = message.mentions.users.first();
  let reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');

   await user ? message.guild.member(user).kick(reason) : message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cet utilisateur`);
  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor(`${client.config.color.ORANGE}`)
    .setDescription(`**Action**: kick\n**Raison**: ${reason}`)
    .setThumbnail(user.displayAvatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    
    message.channel.send(embed);
};

module.exports.help = {
  name: "kick",
  aliases: ['kick'],
  category : 'moderation',
  description: "Kick un utilisateur",
  cooldown: 10,
  usage: '<@user> <raison>',
  exemple :["kick @Smaug spam"],
  isUserAdmin: true,
  permissions: true,
  args: true,
  sousCommdandes : []
};