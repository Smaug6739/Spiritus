const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  let { ROSE } = require('../../configstyle');

  const fetchGuildAuditLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: 'MESSAGE_DELETE'
  });

  const latestMessageDelete = fetchGuildAuditLogs.entries.first();
  console.log(latestMessageDelete);

  const { executor } = latestMessageDelete;

  const embed = new MessageEmbed()
    .setAuthor("Suppression d'un message")
    .setColor(`${ROSE}`)
    .setDescription(`**Action**: suppression de messages\n**Message supprimé**: ${message.content}`)
    .setTimestamp()
    .setFooter(executor.username, executor.displayAvatarURL());
    
  client.channels.cache.get('710763508425424897').send(embed);
}