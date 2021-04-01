const { Guild } = require("../../models/index");
//const DBL = require('dblapi.js');
const { MessageEmbed, WebhookClient } = require('discord.js')
module.exports = async client => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activity: { name: `${client.configuration.DEFAULTSETTINGS.prefix}help | ${client.configuration.DEFAULTSETTINGS.prefix}cmds`, type: 'WATCHING' }, status: 'online' });
  const webhookClient = new WebhookClient(`${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.ID}`, `${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.TOKEN}`);
  const embed = new MessageEmbed()
    .setTitle(`BOT ${client.user.tag} started.`)
    .setColor(`#0099ff`)
    .setThumbnail(`${client.user.displayAvatarURL()}`)
    .addField('Event ', 'Ready', true)
    .addField('Users ', `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`, true)
    .addField('Guilds ', `${client.guilds.cache.size.toString()}`, true)
    .setTimestamp()
    .setFooter(`BOT ID : ${client.user.id}`);

  webhookClient.send('', {
    username: `${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.NAME}`,
    avatarURL: `${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.AVATAR}`,
    embeds: [embed],
  });
}