const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let user = await client.users.fetch(args[0]);
  if (!user) return message.reply("l'utilisateur n'existe pas.");
  message.guild.members.unban(user);

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
    .setColor("#dc143c")
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
  isUserAdmin: false,
  permissions: true,
  args: true
};