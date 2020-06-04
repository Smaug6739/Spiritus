const { MessageEmbed, Presence } = require("discord.js");

const moment = require('moment');

module.exports.run = async (client, message, args) =>{
    const {ONLINE,IDLE,DND,OFFLINE,EMBED} = require('../../configstyle')

    let user = /*message.mentions.users.first() || */message.author;
    let use = message.mentions.members.first() || message.member

    if (use.user.presence.status === 'online') status = `${ONLINE}Online`  ;
    if (use.user.presence.status === 'idle') status = `${IDLE}Idle`;
    if (use.user.presence.status === 'dnd') status = `${DND}Dnd`;
    if (use.user.presence.status === 'offline') status = `${OFFLINE}Offline`;


        const embed = new MessageEmbed()
        //const joinServer = moment(message.member.joinedAt).format('llll');
        //const joinDiscord = moment(user.createdAt).format('llll');

            embed.setFooter(use.user.username, use.user.displayAvatarURL(), true) //OK
            embed.setThumbnail(use.user.displayAvatarURL())//OK
            embed.setColor(`${EMBED}`)//OK
            embed.setTitle(`${use.user.username}`)//OK
            
            embed.addField('ID de la personne :', `${use.user.id}`, true)//OK
            embed.addField('Status :', `${status}`, true)//OK
            embed.addField('Tag :', `${use.user.tag}`, true)//OK

            embed.addField('A rejoins :', `${moment.utc(use.user.joinedAt).format('dddd, MMMM Do YYYY')}`, true)//OK --------- IDLE
            //embed.addField('A rejoins :', `${moment.utc(message.member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)

            embed.addField('Compte crée le :', `${moment.utc(use.user.createdAt).format('dddd, MMMM Do YYYY')}`, true)//OK
            embed.addField('Roles :', `${use.roles.cache.map(r => r.toString()).join('')}`)//OK            

            let permissions_arr = use.permissions.toArray().join(', ');
            let permissions = permissions_arr.toString()
            permissions = permissions.replace(/\_/g,' ');        
            embed.addField('User information:', `**> Permissions:** ${permissions.toLowerCase()}`)//OK
            embed.setTimestamp()




           
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


        message.channel.send(embed);
    }


module.exports.help = {
    
    name : 'whois',
    aliases : ['whois','userinfo','uinfo'],
    category : 'misc',
    description : 'Donne des infos sur une personne',
    cooldown : 5,
    usage : '<@user>',
    exemple :["whois @Smaug"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
