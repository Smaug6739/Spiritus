const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args, settings) => {

  if (!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send(`${client.config.emojis.error}I don't have permission to change roles.`);
  let user = await client.resolveMember(message.guild, args[0])
  if (user == undefined) return message.channel.send(`${client.config.emojis.error}User not found.`)
  let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
  if (!user.roles.cache.has(muteRole.id)) return message.channel.send(`${client.config.emojis.error}This user is not muted.`);
  user.roles.remove(muteRole.id);
  message.channel.send(`<@${user.id}> n'est plus muté!`);
  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
    .setColor(`${client.config.color.VERT}`)
    .setDescription(`**Action**: unmute`)
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
  name: "unmute",
  aliases: ['unmute'],
  category: 'moderation',
  description: "Unmute a user.",
  cooldown: 10,
  usage: '<@user>',
  exemple: ["unmute @Smaug"],
  isUserAdmin: true,
  permissions: true,
  args: true,
  subcommands: []
};