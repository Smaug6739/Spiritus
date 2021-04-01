const { MessageEmbed } = require('discord.js')
module.exports = async (client, guild) => {
  embed = new MessageEmbed()
    .setAuthor('Add to a new guild :')
    .setTitle(`${guild.name}`)
    .setColor(`#0x00FF00`)
    .addFields(
      { name: 'Name', value: `${guild.name}\n(\`${guild.id}\`)`, inline: true },
      { name: 'Owner', value: `\`${guild.ownerID}\``, inline: true },
      { name: 'Region', value: `${guild.region.toUpperCase()}`, inline: true },
      { name: 'Members :', value: `${guild.memberCount}`, inline: true },
    )
    .setTimestamp()
    .setFooter('Spiritus bot logs | BOT ID : 689210215488684044')
  if (guild.icon) {
    embed.setThumbnail(`${guild.iconURL()}`)
  }
  client.channels.cache.get('721270980823220324').send(embed)

};