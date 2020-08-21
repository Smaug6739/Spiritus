const { MessageEmbed } = require("discord.js");
const moment = require('moment');
module.exports.run = async (client, message, args, settings) => {
    if (!args[0]) {
        const embed = new MessageEmbed()
            .setTitle('Commande info')
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            .setDescription(`La commande __info__ permet d'avoir des informations sur différents éléments du serveur et du bot grace aux sous commandes suivantes :\n\n${client.config.emojis.fleche}__info user__ donne des informations sur une personne.\n${client.config.emojis.fleche}__info bot__ donne des informations sur le bot.\n${client.config.emojis.fleche}__info serveur__ donne des informations sur le serveur.\n${client.config.emojis.fleche}__info role__ donne des informations sur un role.\n${client.config.emojis.fleche}__info channel__ donne des informations sur un channel.`)
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044')
        return message.channel.send(embed)
    }
    if (args[0].toLowerCase() === 'user') {
        const infoUserDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}info user`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Misc\n**Description :** Permet d'avoir des informations sur une personne.\n**Usage :** [nom/id/mention]\n**Exemples :** \n ${settings.prefix}info user 611468402263064577 \n ${settings.prefix}info user Smaug`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
        if (!args[1]) return message.channel.send(infoUserDescription)
        let userInfo = await client.resolveMember(message.guild , args[1])//message.mentions.members.first()||message.member
        await console.log(userInfo)
        if (!userInfo) {
            client.users.fetch(args[1]).then(u => {
                if(!u) return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver cet utilisateur.`)
                if (u.bot) BOTSTATUS = 'Vrai'
                else BOTSTATUS = 'Faux'
                const embed = new MessageEmbed()
                    .setAuthor(`${u.username}#${u.discriminator}`, `${u.displayAvatarURL()}`)
                    .setColor(`${client.config.color.EMBEDCOLOR}`)
                    .setThumbnail(u.displayAvatarURL())
                    .addField(`\u200b`, `BOT : ${BOTSTATUS}`)
                    .setDescription('Cette personne n\'est pas sur le serveur')
                    .setFooter(`User ID : ${u.id}`)
                    return message.channel.send(embed)
            })
            
        } else {
            //if (use.user.presence.status === 'online') status = `${client.config.emojis.ONLINE}Online`  ;
            //if (use.user.presence.status === 'idle') status = `${client.config.emojis.IDLE}Idle`;
            //if (use.user.presence.status === 'dnd') status = `${client.config.emojis.DND}Dnd`;
            //if (use.user.presence.status === 'offline') status = `${client.config.emojis.OFFLINE}Offline`;
            //if (use.user.presence.clientStatus != null && use.user.presence.clientStatus.desktop === 'online') plateforme = '🖥️ Ordinateur'
            //if (use.user.presence.clientStatus != null && use.user.presence.clientStatus.mobile === 'online') plateforme = '📱 Mobile'
            let permissions_arr = userInfo.permissions.toArray().join(', ');
            let permissions = permissions_arr.toString()
            permissions = permissions.replace(/\_/g, ' ');
            const embed = new MessageEmbed()
            embed.setFooter(`${userInfo.user.username} ID : ${userInfo.user.id}`, userInfo.user.displayAvatarURL(), true) //OK
            embed.setThumbnail(userInfo.user.displayAvatarURL())//OK
            embed.setColor(`${client.config.color.EMBEDCOLOR}`)//OK
            embed.setTitle(`${userInfo.user.username}`)//OK
            embed.addField('ID :', `${userInfo.user.id}`, true)//OK
            embed.addField('Tag :', `${userInfo.user.tag}`, true)//OK
            embed.addField('A rejoins :', `${moment.utc(userInfo.joinedAt).format('DD/MM/YYYY - hh:mm')}`, true)//OK --------- IDLE
            embed.addField('Compte crée le :', `${moment.utc(userInfo.user.createdAt).format('DD/MM/YYYY - hh:mm')}`, true)//
            embed.addField('Roles :', `${userInfo.roles.cache.map(r => r.toString()).join('')}`)//OK            
            embed.addField('User information:', `** Permissions:** ${userInfo.permissions.toArray().sort().map(permissions => `${permissions.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")}`).join(", ") || "none"}`)//OK
            embed.setTimestamp();
            message.channel.send(embed);
        }
    } else if (args[0].toLowerCase() === 'bot') {
        let package = require('./../../package.json')
        const verssionBot = package.version
        const verssionDjs = package.dependencies["discord.js"]
        const embed = new MessageEmbed()
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            .setAuthor(`${client.user.username} Info`, client.user.avatarURL())
            .setThumbnail(client.user.avatarURL())
            .addFields(
                { name: 'Developpeur', value: `Smaug#6739`, inline: true },
                { name: 'Mémoire', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
                { name: 'Uptime', value: `${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true },
                { name: 'Serveurs', value: `${client.guilds.cache.size.toString()}`, inline: true },
                { name: 'Salons', value: `${client.channels.cache.size.toString()}`, inline: true },
                { name: 'Utilisateurs', value: `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`, inline: true },
                { name: 'Version', value: `${verssionBot}`, inline: true },
                { name: 'Librairie ', value: `discord.js (javascript)`, inline: true },
                { name: 'Librairie verssion', value: `${verssionDjs.replace('^','')}`, inline: true },
                { name: 'Support', value: `[Serveur support ](https://discord.gg/TC7Qjfs)`, inline: true },
                { name: 'Invitation :', value: `[Invite](https://discordapp.com/oauth2/authorize?client_id=689210215488684044&scope=bot&permissions=1946446974)`, inline: true },
                { name: 'Site internet :', value: `[Site](https://mail.spiritus-tech.mon.world)`, inline: true })
            .setTimestamp()
            .setFooter('Informations sur le bot Spiritus. BOT ID : 689210215488684044')
        message.channel.send(embed);
    }
    if (args[0].toLowerCase() === 'serveur') {
        var guild_name = message.guild.name,
            owner = message.guild.owner,
            region = message.guild.region.toUpperCase()
        var boost = message.guild.premiumSubscriptionCount
        if (boost === 0) boost = "Ce serveur n'est pas boost"
        else if (boost >= 1) boost = `Ce serveur possède ${boost} boost${boost > 1 ? "s" : ""}`
        var members = message.guild.memberCount;
        // message.guild.members.fetch().then(fetchedMembers => {     
        // const online = fetchedMembers.filter(member => member.presence.status === 'online').size;
        // const idle = fetchedMembers.filter(member => member.presence.status === 'idle').size;
        // const dnd = fetchedMembers.filter(member => member.presence.status === 'dnd').size;
        // const off = fetchedMembers.filter(member => member.presence.status === 'offline').size;
        const channel_t = message.guild.channels.cache.filter(channel => channel.type === "text").size;
        const channel_v = message.guild.channels.cache.filter(channel => channel.type === "voice").size;
        const channel_c = message.guild.channels.cache.filter(channel => channel.type === "category").size;
        const roles = message.guild.roles.cache.size;
        const salons = message.guild.channels.cache.size;
        const embed = new MessageEmbed()
        if (message.guild.iconURL()) {
            embed.setAuthor(`${guild_name}`, `${message.guild.iconURL()}`)
            embed.setThumbnail(`${message.guild.iconURL()}`)
            embed.setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
        } else {
            embed.setAuthor(`${guild_name}`)
            embed.setFooter(`BOT ID : ${client.user.id}`);
        }
        embed.setTitle(`**Informations sur le serveur :**`)
        embed.setColor(`${client.config.color.EMBEDCOLOR}`)
        embed.addFields(
            { name: 'Nom du serveur', value: `${guild_name}`, inline: true },
            { name: 'Region', value: `${region}`, inline: true },
            { name: 'Owner', value: `${owner}`, inline: true },
            { name: 'Membres', value: `${members}`, inline: true },
            { name: 'Salons', value: `${salons}`, inline: true },
            { name: 'Roles', value: `${roles}`, inline: true },
            { name: 'Chanels', value: `${client.config.emojis.CHANNEL}Texte : ${channel_t}\n${client.config.emojis.VOICE}Voice : ${channel_v}\n${client.config.emojis.ETIQUETTE}Categories : ${channel_c}`, inline: true },
            { name: 'Verification niveau', value: `${message.guild.verificationLevel}`, inline: true },
            { name: `${client.config.emojis.BOOST}Nitro du serveur`, value: `${boost}`, inline: true },
            //{ name: 'Status des membres', value: `${client.config.emojis.ONLINE}Online : ${online}\n${client.config.emojis.IDLE}Idle : ${idle}\n${client.config.emojis.DND}Dnd : ${dnd}\n${client.config.emojis.OFFLINE}Offline : ${off}`, inline: true }
        )
        embed.setTimestamp()
        message.channel.send(embed)
        //});
    }
    if (args[0].toLowerCase() === 'role') {
        const infoRoleDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}info role`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Misc\n**Description :** Permet d'avoir des informations sur un role.\n**Usage :** [nom/id/mention]\n**Exemples :** \n ${settings.prefix}info role 708500588626837505 \n ${settings.prefix}info role @Admin`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
        if (!args[1]) return message.channel.send(infoRoleDescription)
        let role = client.resolveRole(message.guild, args.slice(1).join(" "))
        if (role == undefined) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce role`)
        if (role.mentionable) mention = 'Oui'
        else mention = 'Non'
        if (role.managed) mananger = 'Oui'
        else manenger = 'Non'
        let membersWithRole = message.guild.roles.cache.get(role.id).members;
        if (role.hoist) separation = 'Oui'
        else separation = 'Non'
        const embed = new MessageEmbed()
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            .setThumbnail(`${message.guild.iconURL()}`)
            .setAuthor(`Information sur un role :`, `${message.guild.iconURL()}`)
            .setTitle(`${role.name}`)
            .addFields(
                { name: 'Role', value: `${role}`, inline: true },
                { name: 'Couleur du role', value: `${role.hexColor}`, inline: true },
                { name: 'Position du role', value: `${role.position}`, inline: true },
                { name: 'ID du role', value: `${role.id}`, inline: true },
                { name: 'Mananger :', value: `${manenger}`, inline: true },
                { name: 'Mentionable :', value: `${mention}`, inline: true },
                { name: 'Members :', value: `${membersWithRole.size}`, inline: true },
                { name: 'Separation :', value: `${separation}`, inline: true },
                { name: 'Crée le  :', value: `${moment.utc(role.createdTimestamp).format('DD/MM/YYYY - hh:mm')}`, inline: true },
                { name: 'Permissions :', value: `${role.permissions.toArray().sort().map(permissions => `${permissions.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")}`).join(", ") || "none"}`, inline: true })
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)
    }
    if (args[0].toLowerCase() == 'channel') {
        const infoRoleDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}info role`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Misc\n**Description :** Permet d'avoir des informations sur un channel.\n**Usage :** [nom/id/mention]\n**Exemples :** \n ${settings.prefix}info channel 710761432534351925 \n ${settings.prefix}info channel #tchat`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
        if (!args[1]) return message.channel.send(infoRoleDescription)
        let channel = client.resolveChannel(message.guild, args[1])
        if (channel == undefined) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce channel.`)
        if (channel.type === 'text') type = `${client.config.emojis.CHANNEL}Texte`
        if (channel.nsfw) nsfw = `${client.config.emojis.CHANNELNSFW} Oui`;
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
    name: 'info',
    aliases: ['info', 'information', 'informations'],
    category: 'misc',
    description: 'Donne des informations.',
    cooldown: 5,
    usage: '<action> <valeur>',
    exemple: ["info user @Smaug"],
    permissions: false,
    isUserAdmin: false,
    args: false,
    sousCommdandes: ["info bot", "info user", "info serveur", "info role", "info channel"]
}
