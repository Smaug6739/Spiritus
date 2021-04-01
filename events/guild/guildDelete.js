const { MessageEmbed } = require('discord.js')
module.exports = async (client, guild) => {
    await client.deleteGuild(guild)
    embed = new MessageEmbed()
        .setAuthor('Serveur delete :')
        .setTitle(`${guild.name}`)
        .setColor('#0xFF0000')
        .addFields(
            { name: 'Name', value: `${guild.name}\n(\`${guild.id}\`)`, inline: true },
            { name: 'Owner', value: `\`${guild.ownerID}\``, inline: true },
            { name: 'Region', value: `${guild.region.toUpperCase()}`, inline: true },
            { name: 'Members :', value: `${guild.memberCount}`, inline: true }
        )
        .setTimestamp()
        .setFooter(`Spiritus bot logs | BOT ID : ${client.user.id}`)
    if (guild.icon != null) {
        embed.setThumbnail(`${guild.iconURL()}`)
    }
    client.channels.cache.get('721270980823220324').send(embed)
};