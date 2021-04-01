const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args, settings) => {
  let user = await client.resolveMember(message.guild, args[0]);
  let reason = (args.splice(1).join(' ') || 'No reason was given');

  if (user) {
    const embed = new MessageEmbed()
      .setTitle('Avertissement :')
      .setAuthor(`${user.username} (${user.id})`)
      .setColor(`${client.config.color.ORANGE}`)
      .setDescription(`**Action :** Warn\n**Reason :** ${reason}\n**Guild :** ${message.guild.name}\n**Moderator :** ${message.author.username}`)
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());
    try {
      if (settings.modLogs) {
        const channel = client.resolveChannel(message.guild, settings.modLogs)
        if (channel) {
          if (channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) {
            channel.send(embed)
          }
        }
      }
      user.createDM().then(msg =>
        msg.send(embed)

          .then(message.channel.send(`${client.config.emojis.success}I have warn the user **${user.tag}**`)))
        .catch(() => { })
    } catch {
      return;
    }


  } else {
    message.channel.sendErrorMessage(`User not found.`)
  }

};

module.exports.help = {
  name: "warn",
  aliases: ['warn'],
  category: 'moderation',
  description: "Warn a user.",
  cooldown: 10,
  usage: '<user> <reason>',
  exemple: ["warn @Smaug spam"],
  isUserAdmin: true,
  moderator: true,
  args: true,
  userPermissions: [],
  botPermissions: [],
  subcommands: []
};