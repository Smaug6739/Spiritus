const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission pour unban un utilisateur.`);
  let { ROUGE } = require('../../configstyle');
  let user = await client.users.fetch(args[0]);
  if (!user) return message.reply("l'utilisateur n'existe pas.");
  message.guild.members.unban(user);

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
    .setColor(`${client.config.color.ROUGE}`)
    .setDescription(`**Action**: unban`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
  message.channel.send(embed);
};

module.exports.help = {
  name: "unban",
  aliases: ['unban'],
  category : 'moderation',
  description: "Unban un utilisateur",
  cooldown: 10,
  usage: '<user_id>',
  exemple :["unban 611468402263064577"],
  isUserAdmin: false,
  permissions: true,
  args: true,
  sousCommdandes : []
};