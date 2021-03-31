const ms = require("ms");
const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args, settings) => {

  let user = await client.resolveMember(message.guild, args[0])
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
  message.channel.send(`<@${user.id}> is muted for ${ms(ms(muteTime))}.`);

  setTimeout(() => {
    user.roles.remove(muteRole.id);
  }, ms(muteTime));
  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
    .setColor(`${client.config.color.ORANGE}`)
    .setDescription(`**Action**: mute\n**Time**: ${ms(ms(muteTime))}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
  if (settings.modLogs) {
    const channel = client.resolveChannel(message.guild, settings.modLogs)
    if (channel) {
      if (channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) {
        channel.send(embed)
      }
    }
  }

};

module.exports.help = {
  name: "mute",
  aliases: ['mute'],
  category: 'moderation',
  description: "Mute a user.",
  cooldown: 10,
  usage: '<@user> <time>',
  exemple: ["mute @Smaug 1h"],
  isUserAdmin: true,
  moderator: true,
  args: true,
  userPermissions: [],
  botPermissions: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
  subcommands: []
};