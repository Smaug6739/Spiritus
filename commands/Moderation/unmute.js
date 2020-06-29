const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {

  if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier les roles.`);
  let user = await client.resolveMember(message.guild,args[0])
  if(user == undefined)return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cet utilisateur.`)
  //let user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
  if (!user.roles.cache.has(muteRole.id)) return message.reply("l'utilisateur mentionné n'est pas muté!");
  user.roles.remove(muteRole.id);
  message.channel.send(`<@${user.id}> n'est plus muté!`);
  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
    .setColor(`${client.config.color.ORANGE}`)
    .setDescription(`**Action**: unmute`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    message.channel.send(embed);
};

module.exports.help = {
  name: "unmute",
  aliases: ['unmute'],
  category : 'moderation',
  description: "Unmute un utilisateur",
  cooldown: 10,
  usage: '<@user>',
  exemple :["unmute @Smaug"],
  isUserAdmin: true,
  permissions: true,
  args: true,
  sousCommdandes : []
}; 