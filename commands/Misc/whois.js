const { MessageEmbed } = require("discord.js");
//const { stripIndents } = require("common-tags");
//const { getMember, formatDate } = require("../../functions.js");

module.exports.run = async (client, message, args) =>{
    if (message.author.presence.status === 'online') status = '<:Status1:702554304539525308>  Online';
    if (message.author.presence.status === 'idle') status = '<:651832510870978573:711643030066692106> Idle';
    if (message.author.presence.status === 'dnd') status = '<:651832449302659082:711643029731147910> Dnd';
    if (message.author.presence.status === 'offline') status = '<:651832576025034764:711643030397911130> offline';
    //if (message.author.ClientPresenceStatus === 'desktop')   platform = ':desktop: Desktop';

    //const online = fetchedMembers.filter(member => member.presence.status === 'online').size;

        const embed = new MessageEmbed()

            .setFooter(message.author.displayName, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setColor(message.author.displayHexColor === '#000000' ? '#ffffff' : message.author.displayHexColor)
            .setTitle(`${message.author.username}`)
            
            .addField('User information:', `**> ID:** ${message.author.id}`)
            .addField('User information:', `**> Status:** ${status}`)
            //.addField('User information:', `**> Plateforme :** ${message.author.ClientPresenceStatus}`)
            //.addField('A rejoin le serveur:', message.guild.members.find('id',memberToFind.id).joinedAt)
            //.addField('Compte crée le :', fetchedMembers.user.createdAt)

          /*.addField('message.author information:', `**> Display name:** ${message.author.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}`, true)

            .addField('User information:', stripIndents`**> ID:** ${message.author.user.id}
            **> Username**: ${message.author.user.username}
            **> Tag**: ${message.author.user.tag}
            **> Created at**: ${created}`, true)
            */
            .setTimestamp()

        if (message.author.presence.game) 
            embed.addField('Currently playing', stripIndents`**> Name:** ${message.author.presence.game.name}`);

        message.channel.send(embed);
    }


module.exports.help = {
    
    name : 'whois',
    aliases : ['whois'],
    category : 'misc',
    description : 'Donne des infos sur le serveur',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
