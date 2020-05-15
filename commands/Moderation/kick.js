
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  let user = message.mentions.users.first();
  let reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');
  user ? message.guild.member(user).kick(reason) : message.channel.send("L'utilisateur n'existe pas.");

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#ffa500")
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
  isUserAdmin: true,
  permissions: true,
  args: true
};