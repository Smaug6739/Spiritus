const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args, settings) => {
  let user = await client.resolveMember(message.guild, args[0]);
  if (user == undefined) return message.channel.sendErrorMessage(`User not found.`)
  if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.channel.sendErrorMessage(`You don't have the permission for this.`)
  let reason = (args.splice(1).join(' ') || 'No reason was given');
  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`)
    .setColor(`${client.config.color.ORANGE}`)
    .setDescription(`**Action**: kick\n**Reason**: ${reason}`)
    .setThumbnail(user.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
  if (user) {
    if (user.kickable) {
      try {
        await user.send(embed)
      } catch {

      }
      message.guild.member(user).kick(reason).then(() => {
        message.channel.send(embed)
        if (settings.modLogs) {
          const channel = client.resolveChannel(message.guild, settings.modLogs)
          if (channel) {
            if (channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) {
              channel.send(embed)
            }
          }
        }
      })
    }
  } else message.channel.sendErrorMessage(`User not found`);
};

module.exports.help = {
  name: "kick",
  aliases: ['kick'],
  category: 'moderation',
  description: "Kick a user.",
  cooldown: 10,
  usage: '<@user> <raison>',
  exemple: ["kick @Smaug spam"],
  isUserAdmin: true,
  moderator: true,
  args: true,
  userPermissions: [],
  botPermissions: [],
  subcommands: []
};