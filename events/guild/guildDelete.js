const {MessageEmbed} = require('discord.js')
module.exports = async (client, guild) => {
    //console.log(`Quiter le serveur ${guild.name}`)
    await client.deleteGuild(guild)
    const embed = new MessageEmbed()
    .setAuthor('Serveur delete :')
    .setTitle(`${guild.name}`)
    .setThumbnail(`${guild.iconURL()}`)
    .setColor('#0xFF0000')
    .addFields(
    { name: 'Nom', value: `${guild.name}\n(\`${guild.id}\`)`, inline: true },
    { name: 'Owner', value: `${guild.owner.user.tag}\n(\`${guild.ownerID}\`)`, inline: true },
    { name: 'Region', value: `${guild.region.toUpperCase()}`, inline: true },
    { name: 'Members :', value: `${guild.memberCount}`, inline: true }
    )
    .setTimestamp()
    .setFooter('Spiritus bot logs | BOT ID : 689210215488684044')
    client.channels.cache.get('721270980823220324').send(embed)
};