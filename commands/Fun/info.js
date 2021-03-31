const { MessageEmbed } = require("discord.js");
const moment = require('moment');
module.exports.run = async (client, message, args, settings) => {

    switch (args[0].toLowerCase()) {
        case 'user':
            let userInfo = await client.resolveMember(message.guild, args[1])
            if (!userInfo) {
                client.users.fetch(args[1])
                    .then(u => {
                        if (!u) return message.channel.sendErrorMessage(`User not found.`)
                        if (u.bot) BOTSTATUS = 'yes'
                        else BOTSTATUS = 'no'
                        const embedUser = new MessageEmbed()
                            .setAuthor(`${u.username}#${u.discriminator}`, `${u.displayAvatarURL()}`)
                            .setColor(`${client.config.color.EMBEDCOLOR}`)
                            .setThumbnail(u.displayAvatarURL())
                            .addField(`\u200b`, `BOT : ${BOTSTATUS}`)
                            .setDescription('This user is no on the guild.')
                            .setFooter(`User ID : ${u.id}`)
                        return message.channel.send(embedUser)
                    })
                    .catch(() => message.channel.sendErrorMessage(`User not found.`))
                break;

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
                const embedMember = new MessageEmbed()
                embedMember.setFooter(`${userInfo.user.username} ID : ${userInfo.user.id}`, userInfo.user.displayAvatarURL(), true) //OK
                embedMember.setThumbnail(userInfo.user.displayAvatarURL())
                embedMember.setColor(`${client.config.color.EMBEDCOLOR}`)
                embedMember.setTitle(`${userInfo.user.username}`)
                embedMember.addField('ID :', `${userInfo.user.id}`, true)
                embedMember.addField('Tag :', `${userInfo.user.tag}`, true)
                embedMember.addField('Joigned :', `${moment.utc(userInfo.joinedAt).format('DD/MM/YYYY - hh:mm')}`, true)//OK --------- IDLE
                embedMember.addField('Account created :', `${moment.utc(userInfo.user.createdAt).format('DD/MM/YYYY - hh:mm')}`, true)//
                embedMember.addField('Roles :', `${userInfo.roles.cache.map(r => r.toString()).join('')}`)//OK            
                embedMember.addField('User information:', `** Permissions:** ${userInfo.permissions.toArray().sort().map(permissions => `${permissions.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")}`).join(", ") || "none"}`)//OK
                embedMember.setTimestamp();
                message.channel.send(embedMember);
                break;
            }
        case 'bot':
            let package = require('./../../package.json')
            const verssionBot = package.version
            const verssionDjs = package.dependencies["discord.js"]
            const embedBot = new MessageEmbed()
                .setColor(`${client.config.color.EMBEDCOLOR}`)
                .setAuthor(`${client.user.username} Info`, client.user.avatarURL())
                .setThumbnail(client.user.avatarURL())
                .addFields(
                    { name: 'Developer', value: `Smaug#6739`, inline: true },
                    { name: 'Data', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
                    { name: 'Uptime', value: `${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true },
                    { name: 'Guilds', value: `${client.guilds.cache.size.toString()}`, inline: true },
                    { name: 'Channels', value: `${client.channels.cache.size.toString()}`, inline: true },
                    { name: 'Users', value: `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`, inline: true },
                    { name: 'Version', value: `${verssionBot}`, inline: true },
                    { name: 'Library ', value: `discord.js (javascript)`, inline: true },
                    { name: 'Library verssion', value: `${verssionDjs.replace('^', '')}`, inline: true },
                    { name: 'Support', value: `[Serveur support ](https://discord.gg/TC7Qjfs)`, inline: true },
                    { name: 'Invite :', value: `[Invite](https://discordapp.com/oauth2/authorize?client_id=689210215488684044&scope=bot&permissions=1946446974)`, inline: true },
                    { name: 'Top.gg :', value: `[Site](https://top.gg/bot/689210215488684044)`, inline: true })
                .setTimestamp()
                .setFooter(`Infos of ${client.user.username}. BOT ID : ${client.user.id}`)
            message.channel.send(embedBot);
            break;
        case 'guild':
            var guild_name = message.guild.name,
                owner = message.guild.owner,
                region = message.guild.region.toUpperCase()
            var boost = message.guild.premiumSubscriptionCount
            if (boost === 0) boost = "This server no have boost"
            else if (boost >= 1) boost = `Guild have ${boost} boost${boost > 1 ? "s" : ""}`
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
                embed.setFooter(`BOT ID : ${client.user.id}`, `${message.guild.iconURL()}`);
            } else {
                embed.setAuthor(`${guild_name}`)
                embed.setFooter(`BOT ID : ${client.user.id}`);
            }
            embed.setTitle(`**Informations sur le serveur :**`)
            embed.setColor(`${client.config.color.EMBEDCOLOR}`)
            embed.addFields(
                { name: 'Guild name', value: `${guild_name}`, inline: true },
                { name: 'Region', value: `${region}`, inline: true },
                { name: 'Owner', value: `${owner}`, inline: true },
                { name: 'Members', value: `${members}`, inline: true },
                { name: 'Channels', value: `${salons}`, inline: true },
                { name: 'Roles', value: `${roles}`, inline: true },
                { name: 'Chanels', value: `${client.config.emojis.CHANNEL}Texte : ${channel_t}\n${client.config.emojis.VOICE}Voice : ${channel_v}\n${client.config.emojis.ETIQUETTE}Categories : ${channel_c}`, inline: true },
                { name: 'Verification level', value: `${message.guild.verificationLevel}`, inline: true },
                { name: `${client.config.emojis.BOOST}Nitro(s) of guild`, value: `${boost}`, inline: true },
                //{ name: 'Status des membres', value: `${client.config.emojis.ONLINE}Online : ${online}\n${client.config.emojis.IDLE}Idle : ${idle}\n${client.config.emojis.DND}Dnd : ${dnd}\n${client.config.emojis.OFFLINE}Offline : ${off}`, inline: true }
            )
            embed.setTimestamp()
            message.channel.send(embed)
            //});
            break;
        case 'role':
            if (!args[1]) return message.channel.send(infoRoleDescription)
            let role = client.resolveRole(message.guild, args.slice(1).join(" "))
            if (role == undefined) return message.channel.sendErrorMessage(`Je n'ai pas trouver ce role`)
            if (role.mentionable) mention = 'Oui'
            else mention = 'Non'
            if (role.managed) mananger = 'Oui'
            else manenger = 'Non'
            let membersWithRole = message.guild.roles.cache.get(role.id).members;
            if (role.hoist) separation = 'Oui'
            else separation = 'Non'
            const embedRole = new MessageEmbed()
                .setColor(`${client.config.color.EMBEDCOLOR}`)
                .setThumbnail(`${message.guild.iconURL()}`)
                .setAuthor(`Information sur un role :`, `${message.guild.iconURL()}`)
                .setTitle(`${role.name}`)
                .addFields(
                    { name: 'Role', value: `${role}`, inline: true },
                    { name: 'Color', value: `${role.hexColor}`, inline: true },
                    { name: 'Position', value: `${role.position}`, inline: true },
                    { name: 'ID', value: `${role.id}`, inline: true },
                    { name: 'Mananger :', value: `${manenger}`, inline: true },
                    { name: 'Mention :', value: `${mention}`, inline: true },
                    { name: 'Members :', value: `${membersWithRole.size}`, inline: true },
                    { name: 'Separation :', value: `${separation}`, inline: true },
                    { name: 'Created at  :', value: `${moment.utc(role.createdTimestamp).format('DD/MM/YYYY - hh:mm')}`, inline: true },
                    { name: 'Permissions :', value: `${role.permissions.toArray().sort().map(permissions => `${permissions.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")}`).join(", ") || "none"}`, inline: true })
                .setTimestamp()
                .setFooter('Command module: Fun')
            message.channel.send(embedRole)
            break;
        case 'channel':
            let channel = client.resolveChannel(message.guild, args[1])
            if (channel == undefined) return message.channel.sendErrorMessage(`Je n'ai pas trouver ce channel.`)
            if (channel.type === 'text') type = `${client.config.emojis.CHANNEL}Texte`
            if (channel.nsfw) nsfw = `${client.config.emojis.CHANNELNSFW} Oui`;
            else nsfw = `${client.config.emojis.CHANNELNSFW} Non`;
            const embedChannel = new MessageEmbed()
                .setAuthor(`Information sur un channel :`, `${message.guild.iconURL()}`)
                .setThumbnail(message.guild.iconURL())
                .setColor(`${client.config.color.EMBEDCOLOR}`)
                .setTitle(`Channel : ${channel.name}`)
                .addFields(
                    { name: 'Channel id :', value: `${channel.id}`, inline: true },
                    { name: 'Categorie :', value: `${channel.parent}`, inline: true },
                    { name: 'Topic :', value: `${channel.topic || 'Aucun Topic'}`, inline: false },
                    { name: 'Catégorie ID :', value: `${channel.parentID}`, inline: true },
                    { name: 'Position :', value: `${channel.position}`, inline: true },
                    { name: '\u200b', value: `\u200b`, inline: true },
                    { name: 'Created at  :', value: `${moment.utc(channel.createdTimestamp).format('DD/MM/YYYY - hh:mm')}`, inline: true },
                    { name: 'Type channel:', value: `${type}`, inline: true },
                    { name: 'Channel NSFW :', value: `${nsfw}`, inline: true })
                .setTimestamp()
                .setFooter('Command module: Fun')
            message.channel.send(embedChannel)
            break;
    }
}
module.exports.help = {
    name: 'info',
    aliases: ['info', 'infos', 'information', 'informations'],
    category: 'fun',
    description: 'Donne des informations.',
    cooldown: 5,
    usage: '<action> <valeur>',
    exemple: ["info user @Smaug"],
    moderator: false,
    isUserAdmin: false,
    args: false,
    userPermissions: [],
    botPermissions: [],
    subcommands: [
        {
            name: 'user',
            description: 'Allows to have information about a user.',
            usage: '<user>',
            args: 1,
            exemples: ['611468402263064577', 'Smaug']
        },
        {
            name: 'bot',
            description: 'Allows to have information about bot.',
            usage: '',
            args: 0,
            exemples: []
        },
        {
            name: 'guild',
            description: 'Allows to have information about guild.',
            usage: '',
            args: 0,
            exemples: []
        },
        {
            name: 'role',
            description: 'Allows to have information about role.',
            usage: '<role>',
            args: 1,
            exemples: ['@Role', '710759495483129876']
        },
        {
            name: 'channel',
            description: 'Allows to have information about channel.',
            usage: '<channel>',
            args: 1,
            exemples: ['#channel', '710759495483129876']
        }
    ]
}
