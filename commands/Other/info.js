const { MessageEmbed } = require("discord.js");
const moment = require('moment');
module.exports.run = async (client, interaction, args, settings) => {

    switch (args[0].subcommand) {
        case 'user':
            const argUser = args.get('user').value
            const userInfo = await client.resolveMember(interaction.guild, argUser)
            if (!userInfo) {
                client.users.fetch(args[1])
                    .then(u => {
                        if (!u) return interaction.replyErrorMessage(`User not found.`)
                        if (u.bot) BOTSTATUS = 'yes'
                        else BOTSTATUS = 'no'
                        const embedUser = new MessageEmbed()
                            .setAuthor(`${u.username}#${u.discriminator}`, `${u.displayAvatarURL()}`)
                            .setColor(`${client.config.color.EMBEDCOLOR}`)
                            .setThumbnail(u.displayAvatarURL())
                            .addField(`\u200b`, `BOT : ${BOTSTATUS}`)
                            .setDescription('This user is no on the server.')
                            .setFooter(`User ID : ${u.id}`)
                        return interaction.reply(embedUser)
                    })
                    .catch(() => interaction.replyErrorMessage(`User not found.`))
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
                interaction.reply(embedMember);
                break;
            }
        case 'bot':
            let package = require('../../package.json')
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
                    { name: 'Servers', value: `${client.guilds.cache.size.toString()}`, inline: true },
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
            interaction.reply(embedBot);
            break;
        case 'server':
            var guild_name = interaction.guild.name,
                owner = interaction.guild.owner,
                region = interaction.guild.region.toUpperCase()
            var boost = interaction.guild.premiumSubscriptionCount
            if (boost === 0) boost = "This server no have boost"
            else if (boost >= 1) boost = `Server have ${boost} boost${boost > 1 ? "s" : ""}`
            var members = interaction.guild.memberCount;
            // interaction.guild.members.fetch().then(fetchedMembers => {     
            // const online = fetchedMembers.filter(member => member.presence.status === 'online').size;
            // const idle = fetchedMembers.filter(member => member.presence.status === 'idle').size;
            // const dnd = fetchedMembers.filter(member => member.presence.status === 'dnd').size;
            // const off = fetchedMembers.filter(member => member.presence.status === 'offline').size;
            const channel_t = interaction.guild.channels.cache.filter(channel => channel.type === "text").size;
            const channel_v = interaction.guild.channels.cache.filter(channel => channel.type === "voice").size;
            const channel_c = interaction.guild.channels.cache.filter(channel => channel.type === "category").size;
            const roles = interaction.guild.roles.cache.size;
            const salons = interaction.guild.channels.cache.size;
            const embed = new MessageEmbed()
            if (interaction.guild.iconURL()) {
                embed.setAuthor(`${guild_name}`, `${interaction.guild.iconURL()}`)
                embed.setThumbnail(`${interaction.guild.iconURL()}`)
                embed.setFooter(`BOT ID : ${client.user.id}`, `${interaction.guild.iconURL()}`);
            } else {
                embed.setAuthor(`${guild_name}`)
                embed.setFooter(`BOT ID : ${client.user.id}`);
            }
            embed.setTitle(`**Informations sur le serveur :**`)
            embed.setColor(`${client.config.color.EMBEDCOLOR}`)
            embed.addFields(
                { name: 'Name', value: `${guild_name}`, inline: true },
                { name: 'Region', value: `${region}`, inline: true },
                { name: 'Owner', value: `${owner}`, inline: true },
                { name: 'Members', value: `${members}`, inline: true },
                { name: 'Channels', value: `${salons}`, inline: true },
                { name: 'Roles', value: `${roles}`, inline: true },
                { name: 'Chanels', value: `${client.config.emojis.CHANNEL}Texte : ${channel_t}\n${client.config.emojis.VOICE}Voice : ${channel_v}\n${client.config.emojis.ETIQUETTE}Categories : ${channel_c}`, inline: true },
                { name: 'Verification level', value: `${interaction.guild.verificationLevel}`, inline: true },
                { name: `${client.config.emojis.BOOST}Nitro(s) of server`, value: `${boost}`, inline: true },
                //{ name: 'Status des membres', value: `${client.config.emojis.ONLINE}Online : ${online}\n${client.config.emojis.IDLE}Idle : ${idle}\n${client.config.emojis.DND}Dnd : ${dnd}\n${client.config.emojis.OFFLINE}Offline : ${off}`, inline: true }
            )
            embed.setTimestamp()
            interaction.reply(embed)
            //});
            break;
        case 'role':
            const argRole = args.get('role').value
            let role = client.resolveRole(interaction.guild, argRole)
            if (role == undefined) return interaction.replyErrorMessage(`Role not found.`)
            if (role.mentionable) mention = 'yes'
            else mention = 'no'
            if (role.managed) mananger = 'yes'
            else manenger = 'no'
            let membersWithRole = interaction.guild.roles.cache.get(role.id).members;
            if (role.hoist) separation = 'yes'
            else separation = 'no'
            const embedRole = new MessageEmbed()
                .setColor(`${client.config.color.EMBEDCOLOR}`)
                .setThumbnail(`${interaction.guild.iconURL()}`)
                .setAuthor(`Information of role :`, `${interaction.guild.iconURL()}`)
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
            interaction.reply(embedRole)
            break;
        case 'channel':
            let channel = client.resolveChannel(interaction.guild, args.get('channel').value)
            if (channel == undefined) return interaction.replyErrorMessage(`Channel not found.`)
            if (channel.type === 'text') type = `${client.config.emojis.CHANNEL}Text`
            if (channel.type === 'voice') type = `${client.config.emojis.VOICE}Voice`
            if (channel.type === 'category') type = `Categrory`
            if (!type) type = `Other`
            if (channel.nsfw) nsfw = `${client.config.emojis.CHANNELNSFW} Yes`;
            else nsfw = `${client.config.emojis.CHANNELNSFW} No`;
            const embedChannel = new MessageEmbed()
                .setAuthor(`Information of a channel :`, `${interaction.guild.iconURL()}`)
                .setThumbnail(interaction.guild.iconURL())
                .setColor(`${client.config.color.EMBEDCOLOR}`)
                .setTitle(`Channel : ${channel.name}`)
                .addFields(
                    { name: 'Channel id :', value: `${channel.id}`, inline: true },
                    { name: 'Category :', value: `${channel.parent ? channel.parent : 'none'}`, inline: true },
                    { name: 'Topic :', value: `${channel.topic || 'No topic'}`, inline: false },
                    { name: 'Catégory ID :', value: `${channel.parentID}`, inline: true },
                    { name: 'Position :', value: `${channel.position}`, inline: true },
                    { name: '\u200b', value: `\u200b`, inline: true },
                    { name: 'Created at  :', value: `${moment.utc(channel.createdTimestamp).format('DD/MM/YYYY - hh:mm')}`, inline: true },
                    { name: 'Type channel:', value: `${type}`, inline: true },
                    { name: 'Channel NSFW :', value: `${nsfw}`, inline: true })
                .setTimestamp()
                .setFooter('Command module: Fun')
            interaction.reply(embedChannel)
            break;
    }
}
module.exports.help = {
    name: 'info',
    aliases: ['info', 'infos', 'information', 'informations'],
    category: 'fun',
    description: 'Send informations.',
    cooldown: 5,
    usage: '<action> <value>',
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
            args: [
                {
                    name: 'user',
                    description: 'User to get infos',
                    type: 'STRING',
                    required: true
                },
            ],
            exemples: ['611468402263064577', 'Smaug']
        },
        {
            name: 'bot',
            description: 'Allows to have information about bot.',
            usage: '',
            args: null,
            exemples: []
        },
        {
            name: 'server',
            description: 'Allows to have information about server.',
            usage: '',
            args: null,
            exemples: []
        },
        {
            name: 'role',
            description: 'Allows to have information about role.',
            usage: '<role>',
            args: [
                {
                    name: 'role',
                    description: 'Role to get infos',
                    type: 'STRING',
                    required: true
                },
            ],
            exemples: ['@Role', '710759495483129876']
        },
        {
            name: 'channel',
            description: 'Allows to have information about channel.',
            usage: '<channel>',
            args: [
                {
                    name: 'channel',
                    description: 'Channel to get infos',
                    type: 'STRING',
                    required: true
                },
            ],
            exemples: ['#channel', '710759495483129876']
        }
    ]
}
