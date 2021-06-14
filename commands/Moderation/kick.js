const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, interaction, args, settings) => {
  const argUser = args.get('user').value;
  const argReason = args.get('reason').value;
  const user = await client.resolveMember(interaction.guild, argUser);
  if (!user) return interaction.replyErrorMessage(`User not found.`)
  if (interaction.member.roles.highest.comparePositionTo(user.roles.highest) <= 0 && interaction.guild.ownerID !== interaction.user.id) return interaction.replyErrorMessage(`You don't have the permission for this.`)
  let reason = (argReason || 'No reason was given');
  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`)
    .setColor(`${client.config.color.ORANGE}`)
    .setDescription(`**Action**: kick\n**Reason**: ${reason}`)
    .setThumbnail(user.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(interaction.user.username, interaction.user.avatarURL());
  if (user.kickable) {
    try {
      await user.send(embed)
    } catch { }
    user.kick(reason).then(() => {
      interaction.reply(embed)
      if (settings.modLogs) {
        const channel = client.resolveChannel(interaction.guild, settings.modLogs)
        if (channel) {
          if (channel.permissionsFor(interaction.guild.me).has('SEND_MESSAGES')) {
            channel.send(embed)
          }
        }
      }
    })
  }
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
  args: [
    {
      name: 'user',
      description: 'User to kick',
      type: 'STRING',
      required: true
    },
    {
      name: 'reason',
      description: 'Reason of kick',
      type: 'STRING',
      required: false
    },
  ],
  userPermissions: [],
  botPermissions: ['KICK_MEMBERS'],
  subcommands: []
};