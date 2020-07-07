const { MessageEmbed} = require("discord.js");
const moment = require('moment');
module.exports.run = async (client, message, args,settings) =>{
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande info')
        .setColor(`${client.config.color.EMBEDCOLOR}`)
        .setDescription('La commande `info` permet d\'avoir des informations sur différents éléments du serveur et du bot grace aux sous commandes suivantes :')
        .addFields(
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`info user\` donne des informations sur une personne.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`info bot\` donne des informations sur le bot.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`info serveur\` donne des informations sur le serveur.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`info role\` donne des informations sur un role.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`info channel\` donne des informations sur un channel.`, inline: false })
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
       return message.channel.send(embed)
    }
    if(args[0].toLowerCase() === 'user'){
        const infoUserDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}info user`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Misc\n**Description :** Permet d'avoir des informations sur une personne.\n**Usage :** [nom/id/mention]\n**Exemples :** \n ${settings.prefix}info user 611468402263064577 \n ${settings.prefix}info user Smaug`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1]) return message.channel.send(infoUserDescription)
    let use = client.resolveMember(message.guild,args.slice(1).join(' '))//message.mentions.members.first()||message.member
    if(use == undefined){
        try{
            client.users.fetch(args[1]).then(m =>{
            if(m.bot)BOTSTATUS = 'Vrai'
            else BOTSTATUS = 'Faux'
             emb = new MessageEmbed()
            .setAuthor(`${m.username}#${m.discriminator}`, `${m.avatarURL()}`)
            .setThumbnail(m.avatarURL())
            .addField(`\u200b`,`BOT : ${BOTSTATUS}`)
            .setDescription('Cette personne n\'est pas sur le serveur')
            .setFooter(`User ID : ${m.id}`)
             message.channel.send(emb)
             return
            })
        }catch{
            return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cette personne.`)
        }
    }else{
    if (use.user.presence.status === 'online') status = `${client.config.emojis.ONLINE}Online`  ;
    if (use.user.presence.status === 'idle') status = `${client.config.emojis.IDLE}Idle`;
    if (use.user.presence.status === 'dnd') status = `${client.config.emojis.DND}Dnd`;
    if (use.user.presence.status === 'offline') status = `${client.config.emojis.OFFLINE}Offline`;
   /*if (use.user.presence.clientStatus != null && use.user.presence.clientStatus.desktop === 'online') plateforme = '🖥️ Ordinateur'
    if (use.user.presence.clientStatus != null && use.user.presence.clientStatus.mobile === 'online') plateforme = '📱 Mobile'
    //else plateforme = 'Aucune'
        console.log(use.user.presence.clientStatus)*/
        const embed = new MessageEmbed()
        embed.setFooter(use.user.username, use.user.displayAvatarURL(), true) //OK
        embed.setThumbnail(use.user.displayAvatarURL())//OK
        embed.setColor(`${client.config.color.EMBEDCOLOR}`)//OK
        embed.setTitle(`${use.user.username}`)//OK
        embed.addField('ID de la personne :', `${use.user.id}`, true)//OK
        embed.addField('Status :', `${status}`, true)//OK
        embed.addField('Tag :', `${use.user.tag}`, true)//OK
        //if(plateforme)embed.addField('Plateforme :', `${plateforme || 'Aucune'}`, true)
        embed.addField('A rejoins :', `${moment.utc(use.joinedAt).format('DD/MM/YYYY - hh:mm')}`, true)//OK --------- IDLE
        embed.addField('Compte crée le :', `${moment.utc(use.user.createdAt).format('DD/MM/YYYY - hh:mm')}`, true)//
        embed.addField('Roles :', `${use.roles.cache.map(r => r.toString()).join('')}`)//OK            
        let permissions_arr = use.permissions.toArray().join(', ');
        let permissions = permissions_arr.toString()
        permissions = permissions.replace(/\_/g,' ');        
        embed.addField('User information:', `** Permissions:** ${use.permissions.toArray().sort().map(permissions => `${permissions.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")}`).join(", ") || "none"}`)//OK
        embed.setTimestamp();
        message.channel.send(embed);
    }
    }else if(args[0].toLowerCase() === 'bot' ){
        let v = require('./../../package.json')
        v = v.version
        const embed = new MessageEmbed()
        .setColor(`${client.config.color.EMBEDCOLOR}`)
        .setAuthor(`${client.user.username} Info`, client.user.avatarURL())
        .addFields(
        { name: 'Developpeur', value: `Smaug#6739`, inline: true },
        { name: 'Mémoire', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
        { name: 'Uptime', value: `${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true },
        { name: 'Serveurs', value: `${client.guilds.cache.size.toString()}`, inline: true },
        { name: 'Salons', value: `${client.channels.cache.size.toString()}`, inline: true },
        { name: 'Utilisateurs', value: `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`, inline: true },
        { name: 'Version', value: `${v}`, inline: true },
        { name: 'Librairie ', value: `discord.js (javascript)`, inline: true },
        { name: 'Librairie verssion', value: `12.2.0`, inline: true },
        { name: 'Support', value: `[Serveur support ](https://discord.gg/TC7Qjfs)`, inline: true },
        { name: 'Invitation :', value: `[Invite](https://discordapp.com/oauth2/authorize?client_id=689210215488684044&scope=bot&permissions=1946446974)`, inline: true },
        { name: 'Site internet :', value: `[Site](https://mail.spiritus-tech.mon.world)`, inline: true })
        .setTimestamp()
        .setFooter('Informations sur le bot Spiritus. BOT ID : 689210215488684044')
		message.channel.send(embed);
    }
    if(args[0].toLowerCase() === 'serveur'){
            var guild_name = message.guild.name,
            owner = message.guild.owner,
            region = message.guild.region.toUpperCase()
            var boost = message.guild.premiumSubscriptionCount
            if (boost === 0) boost = "Ce serveur n'est pas boost"
            else if (boost >= 1) boost = `Ce serveur possède ${boost} boosts ${boost > 1 ? "s" : ""}`
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
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            .setAuthor(`${guild_name}`, `${message.guild.iconURL()}`)
            .setThumbnail(`${message.guild.iconURL()}`)
            .addFields(
            { name: 'Nom du serveur', value: `${guild_name}`, inline: true },
            { name: 'Region', value: `${region}`, inline: true },
            { name: 'Nombre de membres', value: `${members}`, inline: true },
            { name: 'Owner', value: `${owner}`, inline: true },
            { name: 'Verification niveau', value: `${message.guild.verificationLevel}`, inline: true },
            { name: `${client.config.emojis.BOOST}Nitro du serveur`, value: `${boost}`, inline: true },
            { name: 'Chanels', value: `${client.config.emojis.CHANNEL}Texte : ${channel_t}\n${client.config.emojis.VOICE}Voice : ${channel_v}\n${client.config.emojis.ETIQUETTE}Categories : ${channel_c}`, inline: true },
            { name: 'Status des membres', value: `${client.config.emojis.ONLINE}Online : ${online}\n${client.config.emojis.IDLE}Idle : ${idle}\n${client.config.emojis.DND}Dnd : ${dnd}\n${client.config.emojis.OFFLINE}Offline : ${off}`, inline: true })
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
            message.channel.send(embed)
            });
    }
    if(args[0].toLowerCase() === 'role'){
        const infoRoleDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}info role`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Misc\n**Description :** Permet d'avoir des informations sur un role.\n**Usage :** [nom/id/mention]\n**Exemples :** \n ${settings.prefix}info role 708500588626837505 \n ${settings.prefix}info role @Admin`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1]) return message.channel.send(infoRoleDescription)
        //const role = message.mentions.roles.first()
        let role = client.resolveRole(message.guild,args.slice(1).join(" "))
        if(role == undefined) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce role`)
        if(role.mentionable) mention = 'Oui'
        else mention = 'Non'
        if(role.managed) mananger = 'Oui'
        else manenger = 'Non'
        let membersWithRole = message.guild.roles.cache.get(role.id).members;
        if(role.hoist) separation = 'Oui'
        else separation = 'Non'
        const embed = new MessageEmbed()
        .setColor(`${client.config.color.EMBEDCOLOR}`)
        .setThumbnail(`${message.guild.iconURL()}`)
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
    if(args[0].toLowerCase() == 'channel'){
        const infoRoleDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}info role`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Misc\n**Description :** Permet d'avoir des informations sur un channel.\n**Usage :** [nom/id/mention]\n**Exemples :** \n ${settings.prefix}info channel 710761432534351925 \n ${settings.prefix}info channel #tchat`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1]) return message.channel.send(infoRoleDescription)
        let channel = client.resolveChannel(message.guild, args[1])
        if(channel == undefined)return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce channel.`) 
        if(channel.type === 'text') type = `${client.config.emojis.CHANNEL}Texte`
        if(channel.nsfw) nsfw = `${client.config.emojis.CHANNELNSFW} Oui`;
        else nsfw = `${client.config.emojis.CHANNELNSFW} Non`;
        const embed = new MessageEmbed()
        .setAuthor(`Information sur un channel :`, `${message.guild.iconURL()}`)
        .setThumbnail(message.guild.iconURL())
        .setColor(`${client.config.color.EMBEDCOLOR}`)
        .setTitle(`Channel : ${channel.name}`)
        .addFields(
            { name: 'Channel id :', value: `${channel.id}`, inline: true },
            { name: 'Catégorie :', value: `${channel.parent}`, inline: true },
            { name: 'Topic :', value: `${channel.topic || 'Aucun Topic'}`, inline: false },
            { name: 'Catégorie ID :', value: `${channel.parentID}`, inline: true },
            { name: 'Position :', value: `${channel.position}`, inline: true },
            { name: '\u200b', value: `\u200b`, inline: true },
            { name: 'Crée le  :', value: `${moment.utc(channel.createdTimestamp).format('DD/MM/YYYY - hh:mm')}`, inline: true },
            { name: 'Type channel:', value: `${type}`, inline: true },
            { name: 'Channel NSFW :', value: `${nsfw}`, inline: true })
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)
    }
}
module.exports.help = {
    
    name : 'info',
    aliases : ['info','information','informations'],
    category : 'info',
    description : 'Donne des infos sur différentes choses.',
    cooldown : 5,
    usage : '<action> <valeur>',
    exemple :["info user @Smaug"],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ["info bot","info user","info serveur","info role","info channel"]
}
