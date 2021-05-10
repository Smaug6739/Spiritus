const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, interaction, args, settings) => {
  const memberArg = client.getArg(args, 'user')
  const reasonArg = client.getArg(args, 'reason')
  const member = await client.resolveMember(interaction.guild, memberArg);
  const reason = (reasonArg || 'No reason was given');

  if (member) {
    const embed = new MessageEmbed()
      .setTitle('Avertissement :')
      .setAuthor(`${member.user.username} (${member.user.id})`)
      .setColor(`${client.config.color.ORANGE}`)
      .setDescription(`**Action :** Warn\n**Reason :** ${reason}\n**Guild :** ${interaction.guild.name}\n**Moderator :** ${interaction.author.username}`)
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp()
      .setFooter(interaction.author.username, interaction.author.avatarURL());
    try {
      if (settings.modLogs) {
        const channel = client.resolveChannel(interaction.guild, settings.modLogs)
        if (channel) {
          if (channel.permissionsFor(interaction.guild.me).has('SEND_MESSAGES')) {
            channel.send(embed)
          }
        }
      }
      member.createDM().then(msg =>
        msg.send(embed)
          .then(interaction.replySuccessMessage(`I have warn the user \`${member.user.tag}\``)))
    } catch {
      return message.replyErrorMessage(`An error has occurred. Please try again.`);
    }


  } else {
    interaction.channel.sendErrorinteraction(`User not found.`)
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
  isUserAdmin: false,
  moderator: true,
  args: [
    {
      name: 'user',
      description: 'User',
      type: 'STRING',
      required: true
    },
    {
      name: 'reason',
      description: 'The reason of warn',
      type: 'STRING',
      required: false
    },
  ],
  userPermissions: [],
  botPermissions: [],
  subcommands: []
};