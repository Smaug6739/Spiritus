const { MessageEmbed } = require("discord.js");
module.exports.run = (client, message, args) => {
  if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission pour ban un utilisateur.`);
  let user  = client.resolveMember(message.guild,args[0])
  if(user == undefined)return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cet utilisateur.`)
  let reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');
  //let user = message.mentions.users.first();
  

  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`)
    .setColor(`${client.config.color.ROUGE}`)
    .setDescription(`**Action**: ban\n**Raison**: ${reason}`)
    .setThumbnail(user.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    user ? message.guild.member(user).ban(reason).then(message.channel.send(embed)) : message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cet utilisateur`);

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
  args: true,
  sousCommdandes : []
};