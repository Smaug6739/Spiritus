const ms = require("ms");
const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, interaction, args, settings) => {
  const argUser = args.get('user').value;
  const argTime = args.get('time').value;
  const user = await client.resolveMember(interaction.guild, argUser)
  let muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
  const muteTime = (argTime || '60s');
  if (!user) return interaction.replyErrorMessage(`User not found.`)
  if (!muteRole) {
    muteRole = await interaction.guild.roles.create({
      name: 'Muted',
      color: '#2f3136',
      permissions: []
    });
    interaction.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false
      });
    });
  };

  await user.roles.add(muteRole.id);
  interaction.replySuccessMessage(`<@${user.id}> is muted for ${ms(ms(muteTime))}.`);

  setTimeout(() => {
    user.roles.remove(muteRole.id);
  }, ms(muteTime));
  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
    .setColor(`${client.config.color.ORANGE}`)
    .setDescription(`**Action**: mute\n**Time**: ${ms(ms(muteTime))}`)
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
  name: "mute",
  aliases: ['mute'],
  category: 'moderation',
  description: "Mute a user.",
  cooldown: 10,
  usage: '<@user> <time>',
  exemple: ["mute @Smaug 1h"],
  isUserAdmin: true,
  moderator: true,
  args: [
    {
      name: 'user',
      description: 'User for mute',
      type: 'STRING',
      required: true
    },
    {
      name: 'time',
      description: 'Time of mute',
      type: 'STRING',
      required: false
    },
  ],
  userPermissions: [],
  botPermissions: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
  subcommands: []
};