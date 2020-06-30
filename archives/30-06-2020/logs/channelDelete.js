const { MessageEmbed } = require("discord.js");

module.exports = async (client, channel) => {
  let { ROSE } = require('../../configstyle');

  const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: 'CHANNEL_DELETE'
  });

  const latestChannelDelete = fetchGuildAuditLogs.entries.first();
  console.log(latestChannelDelete);

  const { executor } = latestChannelDelete;

  const embed = new MessageEmbed()
    .setAuthor("Suppression d'un salon")
    .setColor(`${ROSE}`)
    .setDescription(`**Action**: suppression de salon\n**Salon supprimé**: ${channel.name}`)
    .setTimestamp()
    .setFooter(executor.username, executor.displayAvatarURL());
    
  client.channels.cache.get('710763508425424897').send(embed);
}