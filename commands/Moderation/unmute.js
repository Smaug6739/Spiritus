const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, interaction, args, settings) => {
  const argUser = client.getArg(args, 'user')
  const user = await client.resolveMember(interaction.guild, argUser)
  if (!user) return interaction.replyErrorMessage(`User not found.`)
  const muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
  if (!muteRole) return interaction.replyErrorMessage(`This user is not muted.`);
  if (!user.roles.cache.has(muteRole.id)) return interaction.replyErrorMessage(`This user is not muted.`);
  user.roles.remove(muteRole.id);
  interaction.replySuccessMessage(`<@${user.id}> is now unmuted`);
  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
    .setColor(`${client.config.color.VERT}`)
    .setDescription(`**Action**: unmute`)
    .setTimestamp()
    .setFooter(interaction.user.username, interaction.user.avatarURL());
  if (settings.modLogs) {
    const channel = client.resolveChannel(interaction.guild, settings.modLogs)
    if (channel) {
      if (channel.permissionsFor(interaction.guild.me).has('SEND_MESSAGES')) {
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
  moderator: true,
  args: [
    {
      name: 'user',
      description: 'User for unmute',
      type: 'STRING',
      required: true
    },
  ],
  userPermissions: [],
  botPermissions: ['MANAGE_ROLES', 'MANAGE_MEMBERS'],
  subcommands: []
};