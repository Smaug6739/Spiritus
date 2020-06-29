const ms = require("ms");
const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de mute.`);
  if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier les roles.`);
  let user = await client.resolveMember(message.guild,args[0])
  //let user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
  let muteTime = (args[1] || '60s');
  if (!muteRole) {
    muteRole = await message.guild.roles.create({
      data: {
        name: 'Muted',
        color: '#2f3136',
        permissions: []
      }
    });
    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false
      });
    });
  };

  await user.roles.add(muteRole.id);
  message.channel.send(`<@${user.id}> est muté pour ${ms(ms(muteTime))}.`);

  setTimeout(() => {
    user.roles.remove(muteRole.id);
  }, ms(muteTime));

  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
    .setColor(`${client.config.color.ORANGE}`)
    .setDescription(`**Action**: mute\n**Temps**: ${ms(ms(muteTime))}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    message.channel.send(embed);
};

module.exports.help = {
  name: "mute",
  aliases: ['mute'],
  category : 'moderation',
  description: "Mute un utilisateur",
  cooldown: 10,
  usage: '<@user> <time>',
  exemple :["mute @Smaug 1h"],
  isUserAdmin: true,
  permissions: true,
  args: true,
  sousCommdandes : []
};