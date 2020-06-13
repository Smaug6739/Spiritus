const { MessageEmbed, Presence } = require("discord.js");
const moment = require('moment');
module.exports.run = async (client, message, args) =>{
    const {ONLINE,IDLE,DND,OFFLINE,EMBED,FLECHE} = require('../../configstyle');
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande info')
        .setDescription('La commande `info` permet d\'avoir des informations sur différents éléments du serveur et du bot grace aux sous commandes suivantes :')
        .addFields(
            { name: '\u200b', value: `${FLECHE}\`info user\` donne des informations sur une personne.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`info bot\` donne des informations sur le bot.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`info serveur\` donne des informations sur le serveur.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`info role\` donne des informations sur un role.`, inline: false },
            //{ name: '\u200b', value: `${FLECHE}\`info invite\` permet de supprimer un info`, inline: false },
            //{ name: '\u200b', value: `${FLECHE}\`info channel\` permet de supprimer un info`, inline: false },
        )
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)
    }
    if(args[0] === 'user'){
    let use = message.mentions.members.first() || message.member
    if (use.user.presence.status === 'online') status = `${ONLINE}Online`  ;
    if (use.user.presence.status === 'idle') status = `${IDLE}Idle`;
    if (use.user.presence.status === 'dnd') status = `${DND}Dnd`;
    if (use.user.presence.status === 'offline') status = `${OFFLINE}Offline`;
        const embed = new MessageEmbed()
        embed.setFooter(use.user.username, use.user.displayAvatarURL(), true) //OK
        embed.setThumbnail(use.user.displayAvatarURL())//OK
        embed.setColor(`${EMBED}`)//OK
        embed.setTitle(`${use.user.username}`)//OK
        embed.addField('ID de la personne :', `${use.user.id}`, true)//OK
        embed.addField('Status :', `${status}`, true)//OK
        embed.addField('Tag :', `${use.user.tag}`, true)//OK
        embed.addField('A rejoins :', `${moment.utc(use.joinedAt).format('DD/MM/YYYY - hh:mm')}`, true)//OK --------- IDLE
        embed.addField('Compte crée le :', `${moment.utc(use.user.createdAt).format('DD/MM/YYYY - hh:mm')}`, true)//
        embed.addField('Roles :', `${use.roles.cache.map(r => r.toString()).join('')}`)//OK            
        let permissions_arr = use.permissions.toArray().join(', ');
        let permissions = permissions_arr.toString()
        permissions = permissions.replace(/\_/g,' ');        
        embed.addField('User information:', `** Permissions:** ${use.permissions.toArray().sort().map(permissions => `${permissions.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")}`).join(", ") || "none"}`)//OK
        embed.setTimestamp();
        message.channel.send(embed);
    }else if(args[0] === 'bot' ){
        const embed = new MessageEmbed()
        .setColor(`${EMBED}`)
        .setAuthor(`${client.user.username} Info`, client.user.avatarURL())
        .addFields(
        { name: 'Developpeur', value: `Smaug#6739`, inline: true },
        { name: 'Mémoire', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
        { name: 'Uptime', value: `${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true },
        { name: 'Serveurs', value: `${client.guilds.cache.size.toString()}`, inline: true },
        { name: 'Salons', value: `${client.channels.cache.size.toString()}`, inline: true },
        { name: 'Utilisateurs', value: `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`, inline: true },
        { name: 'Version', value: `1.0.0`, inline: true },
        { name: 'Librairie ', value: `discord.js (javascript)`, inline: true },
        { name: 'Librairie verssion', value: `12.2.0`, inline: true },
        { name: 'Support', value: `[Serveur support ](https://discord.gg/TC7Qjfs)`, inline: true },
        { name: 'Invitation :', value: `[Invite](https://discordapp.com/oauth2/authorize?client_id=689210215488684044&scope=bot&permissions=1946446974)`, inline: true },
        { name: 'Site internet :', value: `[Site](https://discord.com/)`, inline: true })
        .setTimestamp()
        .setFooter('Informations sur le bot Spiritus. BOT ID : 689210215488684044')
		message.channel.send(embed);
    }else if(args[0] === 'serveur'){
            const {CHANNEL,VOICE,ETIQUETTE,BOOST,ONLINE,IDLE,DND,OFFLINE,EMBED} = require('../../configstyle')
            var guild_name = message.guild.name,
            owner = message.guild.owner,
            region = message.guild.region.toUpperCase()
            var boost = message.guild.premiumSubscriptionCount
            if (boost === 0) boost = "Ce serveur n'est pas boost"
            else if (boost >= 1) boost = `Ce serveur possède ${boost} BOOST${boost > 1 ? "s" : ""}`
            var members = message.guild.memberCount; 
            message.guild.members.fetch().then(fetchedMembers => {     
            const online = fetchedMembers.filter(member => member.presence.status === 'online').size;
            const idle = fetchedMembers.filter(member => member.presence.status === 'idle').size;
            const dnd = fetchedMembers.filter(member => member.presence.status === 'dnd').size;
            const off = fetchedMembers.filter(member => member.presence.status === 'offline').size;
            const channel_t = message.guild.channels.cache.filter(channel => channel.type === "text").size
            const channel_v = message.guild.channels.cache.filter(channel => channel.type === "voice").size
            const channel_c = message.guild.channels.cache.filter(channel => channel.type === "category").size
            let embed = new MessageEmbed()
            .setTitle(`**Informations sur le serveur :**`)
            .setColor(EMBED)
            .setAuthor(`${guild_name}`, `${message.guild.iconURL()}`)
            .setThumbnail(`${message.guild.iconURL()}`)
            .addFields(
            { name: 'Nom du serveur', value: `${guild_name}`, inline: true },
            { name: 'Region', value: `${region}`, inline: true },
            { name: 'Nombre de membres', value: `${members}`, inline: true },
            { name: 'Owner', value: `${owner}`, inline: true },
            { name: 'Verification niveau', value: `${message.guild.verificationLevel}`, inline: true },
            { name: `${BOOST}Nitro du serveur`, value: `${boost}`, inline: true },
            { name: 'Chanels', value: `${CHANNEL}Texte : ${channel_t}\n${VOICE}Voice : ${channel_v}\n${ETIQUETTE}Categories : ${channel_c}`, inline: true },
            { name: 'Status des membres', value: `${ONLINE}Online : ${online}\n${IDLE}Idle : ${idle}\n${DND}Dnd : ${dnd}\n${OFFLINE}Offline : ${off}`, inline: true })
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
            message.channel.send(embed)
            });
    }else if(args[0] === 'role'){
        const role = message.mentions.roles.first()
        if(role.mentionable) mention = 'Oui'
        else mention = 'Non'
        if(role.managed) mananger = 'Oui'
        else manenger = 'Non'
        let membersWithRole = message.guild.roles.cache.get(role.id).members;
        if(role.hoist) separation = 'Oui'
        else separation = 'Non'
        const embed = new MessageEmbed()
        .setColor(EMBED)
        .setAuthor(`Information sur un role :`, `${message.guild.iconURL()}`)
        .setTitle(`${role.name}`)
        .addFields(
            { name: 'Role', value: `${role}`, inline: true },
            { name: 'Couleur du role', value: `${role.hexColor}`, inline: true },
            { name: 'Position du role', value:`${role.position}`, inline: true },
            { name: 'ID du role', value:`${role.id}`, inline: true },
            { name: 'Mananger :', value:`${manenger}`, inline: true },
            { name: 'Mentionable :', value:`${mention}`, inline: true },
            { name: 'Members :', value:`${membersWithRole.size}`, inline: true },
            { name: 'Separation :', value:`${separation}`, inline: true },
            { name: 'Crée le  :', value: `${moment.utc(role.createdTimestamp).format('DD/MM/YYYY - hh:mm')}`, inline: true },
            { name: 'Permissions :', value:`${role.permissions.toArray().sort().map(permissions => `${permissions.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")}`).join(", ") || "none"}`, inline: true })
        .setTimestamp()
        .setFooter('Commande d\'information de role. BOT ID : 689210215488684044')
        message.channel.send(embed) 
    }
}
module.exports.help = {
    
    name : 'whois',
    aliases : ['info','information','informations'],
    category : 'info',
    description : 'Donne des infos sur différentes choses.',
    cooldown : 5,
    usage : '<action> <>',
    exemple :["info user @Smaug"],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ["info bot","info user","info serveur","info role"]

}
