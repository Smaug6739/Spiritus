const { MessageEmbed, Presence } = require("discord.js");
//const { stripIndents } = require("common-tags");
//const { getMember, formatDate } = require("../../functions.js");
const moment = require('moment');

module.exports.run = async (client, message, args) =>{
    let user = /*message.mentions.users.first() || */message.author;
   
    if (user.presence.status === 'online') status = '<:Status1:702554304539525308>  Online';
    if (user.presence.status === 'idle') status = '<:651832510870978573:711643030066692106> Idle';
    if (user.presence.status === 'dnd') status = '<:651832449302659082:711643029731147910> Dnd';
    if (user.presence.status === 'offline') status = '<:651832576025034764:711643030397911130> offline';
    //if (message.author.ClientPresenceStatus === 'desktop')   platform = ':desktop: Desktop';

    //const online = fetchedMembers.filter(member => member.presence.status === 'online').size;

        const embed = new MessageEmbed()
        const joinServer = moment(message.member.joinedAt).format('llll');
        //const joinDiscord = moment(user.createdAt).format('llll');

        let member = message.mentions.members.first() || message.member
            embed.setFooter(user.username, user.displayAvatarURL(), true)
            embed.setThumbnail(user.displayAvatarURL())
            embed.setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
            embed.setTitle(`${user.username}`)
            
            embed.addField('ID de la personne :', `${user.id}`, true)
            embed.addField('Status :', `${status}`, true)
            embed.addField('Tag :', `${user.tag}`, true)
           // if(user.presence.activities){
            //embed.addField('Presence :', `${user.presence.activities}`, true)
           // }
            embed.addField('A rejoins :', `${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY')}`, true)
            //embed.addField('A rejoins :', `${moment.utc(message.member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)

            embed.addField('Compte crée le :', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY')}`, true)
            embed.addField('Roles :', `${message.member.roles.cache.map(r => r.toString()).join('')}`)            

            let permissions_arr = message.member.permissions.toArray().join(', ');
            let permissions = permissions_arr.toString()
            permissions = permissions.replace(/\_/g,' ');        
            embed.addField('User information:', `**> Permissions:** ${permissions.toLowerCase()}`)

            //console.log(user.roles); // it is undefined


            //embed.addField('User information:', `**> Roles:** ${message.member.guild.roles.fetch().then(role => console.log${role.color}}`)

           
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
            embed.setTimestamp()


        message.channel.send(embed);
    }


module.exports.help = {
    
    name : 'whois',
    aliases : ['whois'],
    category : 'misc',
    description : 'Donne des infos sur une personne',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
