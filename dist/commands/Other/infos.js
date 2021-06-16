"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = __importDefault(require("../CommandClass"));
const discord_js_1 = require("discord.js");
const moment_1 = __importDefault(require("moment"));
class Ping extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'infos',
            aliases: [],
            args: [],
            description: 'Get informations',
            category: 'Other',
            cooldown: 5,
            userPermissions: [],
            botPermissions: [],
            subCommands: [
                {
                    name: 'user',
                    description: 'Allows to have information about a user.',
                    args: [
                        {
                            name: 'user',
                            description: 'User to get infos',
                            type: 'STRING',
                            required: true
                        },
                    ],
                },
                {
                    name: 'bot',
                    description: 'Allows to have information about bot.',
                    args: null,
                },
                {
                    name: 'server',
                    description: 'Allows to have information about server.',
                    args: null,
                },
                {
                    name: 'role',
                    description: 'Allows to have information about role.',
                    args: [
                        {
                            name: 'role',
                            description: 'Role to get infos',
                            type: 'STRING',
                            required: true
                        },
                    ],
                },
                {
                    name: 'channel',
                    description: 'Allows to have information about channel.',
                    args: [
                        {
                            name: 'channel',
                            description: 'Channel to get infos',
                            type: 'STRING',
                            required: true
                        },
                    ],
                }
            ],
        });
    }
    execute(interaction, args) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            switch (interaction.subcommand) {
                case 'user':
                    const argUser = args.get('user').value;
                    const userInfo = yield this.spiritus.util.resolveMember(interaction.guild, argUser);
                    if (!userInfo) {
                        this.spiritus.client.users.fetch(args.get('user').value)
                            .then(u => {
                            let BOTSTATUS;
                            if (!u)
                                return interaction.replyErrorMessage(`User not found.`);
                            if (u.bot)
                                BOTSTATUS = 'yes';
                            else
                                BOTSTATUS = 'no';
                            const embedUser = new discord_js_1.MessageEmbed()
                                .setAuthor(`${u.username}#${u.discriminator}`, `${u.displayAvatarURL()}`)
                                .setColor(`${this.spiritus.colors.EMBEDCOLOR}`)
                                .setThumbnail(u.displayAvatarURL())
                                .addField(`\u200b`, `BOT : ${BOTSTATUS}`)
                                .setDescription('This user is no on the server.')
                                .setFooter(`User ID : ${u.id}`);
                            return interaction.reply({ embeds: [embedUser] });
                        })
                            .catch(() => interaction.replyErrorMessage(`User not found.`));
                        break;
                    }
                    else {
                        //if (use.user.presence.status === 'online') status = `${this.spiritus.emojis.ONLINE}Online`  ;
                        //if (use.user.presence.status === 'idle') status = `${this.spiritus.emojis.IDLE}Idle`;
                        //if (use.user.presence.status === 'dnd') status = `${this.spiritus.emojis.DND}Dnd`;
                        //if (use.user.presence.status === 'offline') status = `${this.spiritus.emojis.OFFLINE}Offline`;
                        //if (use.user.presence.clientStatus != null && use.user.presence.clientStatus.desktop === 'online') plateforme = '🖥️ Ordinateur'
                        //if (use.user.presence.clientStatus != null && use.user.presence.clientStatus.mobile === 'online') plateforme = '📱 Mobile'
                        let permissions_arr = userInfo.permissions.toArray().join(', ');
                        let permissions = permissions_arr.toString();
                        permissions = permissions.replace(/\_/g, ' ');
                        const embedMember = new discord_js_1.MessageEmbed();
                        embedMember.setThumbnail(userInfo.user.displayAvatarURL());
                        embedMember.setColor(this.spiritus.colors.embed);
                        embedMember.setTitle(`${userInfo.user.username}`);
                        embedMember.addField('ID :', `${userInfo.user.id}`, true);
                        embedMember.addField('Tag :', `${userInfo.user.tag}`, true);
                        embedMember.addField('Joigned :', `${moment_1.default.utc(userInfo.joinedAt).format('DD/MM/YYYY - hh:mm')}`, true); //OK --------- IDLE
                        embedMember.addField('Account created :', `${moment_1.default.utc(userInfo.user.createdAt).format('DD/MM/YYYY - hh:mm')}`, true); //
                        embedMember.addField('Roles :', `${userInfo.roles.cache.map((r) => r.toString()).join('')}`); //OK            
                        embedMember.addField('User information:', `** Permissions:** ${userInfo.permissions.toArray().sort().map((permissions) => `${permissions.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")}`).join(", ") || "none"}`); //OK
                        embedMember.setTimestamp();
                        embedMember.setFooter(`${userInfo.user.username} ID : ${userInfo.user.id}`, userInfo.user.displayAvatarURL()); //OK
                        interaction.reply({ embeds: [embedMember] });
                        break;
                    }
                case 'bot':
                    const pck = require('../../package.json');
                    const verssionBot = pck.version;
                    const verssionDjs = pck.dependencies["discord.js"];
                    const embedBot = new discord_js_1.MessageEmbed()
                        .setColor(this.spiritus.colors.embed)
                        .setAuthor(`${this.spiritus.client.user.username} Info`, this.spiritus.client.user.displayAvatarURL())
                        .setThumbnail(this.spiritus.client.user.displayAvatarURL())
                        .addFields({ name: 'Developer', value: `Smaug#6739`, inline: true }, { name: 'Data', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true }, { name: 'Uptime', value: `${Math.floor(this.spiritus.client.uptime / 1000 / 60).toString()} minutes`, inline: true }, { name: 'Servers', value: `${this.spiritus.client.guilds.cache.size.toString()}`, inline: true }, { name: 'Channels', value: `${this.spiritus.client.channels.cache.size.toString()}`, inline: true }, { name: 'Users', value: `${this.spiritus.client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`, inline: true }, { name: 'Version', value: `${verssionBot}`, inline: true }, { name: 'Library ', value: `discord.js (javascript)`, inline: true }, { name: 'Library verssion', value: `${verssionDjs.replace('^', '')}`, inline: true }, { name: 'Support', value: `[Serveur support ](https://discord.gg/TC7Qjfs)`, inline: true }, { name: 'Invite :', value: `[Invite](https://discord.com/oauth2/authorize?client_id=689210215488684044&scope=bot&permissions=1946446974%20applications.commands)`, inline: true }, { name: 'Top.gg :', value: `[Site](https://top.gg/bot/689210215488684044)`, inline: true })
                        .setTimestamp()
                        .setFooter(`Infos of ${this.spiritus.client.user.username}. BOT ID : ${this.spiritus.client.user.id}`);
                    interaction.reply({ embeds: [embedBot] });
                    break;
                case 'server':
                    const guild_name = interaction.guild.name;
                    const owner = `<@${interaction.guild.ownerID}>`;
                    const boost = interaction.guild.premiumSubscriptionCount;
                    let boostMsg = '';
                    if (!boost)
                        boostMsg = "This server no have boost";
                    else
                        boostMsg = `Server have ${boost} boost${boost > 1 ? "s" : ""}`;
                    const members = interaction.guild.memberCount;
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
                    const embedInfoGuild = new discord_js_1.MessageEmbed();
                    if (interaction.guild.iconURL()) {
                        embedInfoGuild.setAuthor(`${guild_name}`, `${interaction.guild.iconURL() ? interaction.guild.iconURL() : ''}`);
                        embedInfoGuild.setThumbnail(`${interaction.guild.iconURL()}`);
                        embedInfoGuild.setFooter(`BOT ID : ${this.spiritus.client.user.id}`, `${interaction.guild.iconURL()}`);
                    }
                    else {
                        embedInfoGuild.setAuthor(`${guild_name}`);
                        embedInfoGuild.setFooter(`BOT ID : ${this.spiritus.client.user.id}`);
                    }
                    embedInfoGuild.setTitle(`**Informations sur le serveur :**`);
                    embedInfoGuild.setColor(this.spiritus.colors.embed);
                    embedInfoGuild.addFields({ name: 'Name', value: `${guild_name}`, inline: true }, { name: 'Owner', value: `${owner}`, inline: true }, { name: 'Members', value: `${members}`, inline: true }, { name: 'Channels', value: `${salons}`, inline: true }, { name: 'Roles', value: `${roles}`, inline: true }, { name: 'Chanels', value: `${this.spiritus.emojis.channel}Texte : ${channel_t}\n${this.spiritus.emojis.voice}Voice : ${channel_v}\n${this.spiritus.emojis.info}Categories : ${channel_c}`, inline: true }, { name: 'Verification level', value: `${interaction.guild.verificationLevel}`, inline: true }, { name: `${this.spiritus.emojis.boost}Nitro(s) of server`, value: `${boostMsg}`, inline: true });
                    embedInfoGuild.setTimestamp();
                    interaction.reply({ embeds: [embedInfoGuild] });
                    //});
                    break;
                case 'role':
                    const argRole = args.get('role').value;
                    const role = this.spiritus.util.resolveRole(interaction.guild, argRole);
                    if (!role)
                        return interaction.replyErrorMessage(`Role not found.`);
                    let mention = '';
                    let manager = '';
                    let separation = '';
                    if (role.mentionable)
                        mention = 'yes';
                    else
                        mention = 'no';
                    if (role.managed)
                        manager = 'yes';
                    else
                        manager = 'no';
                    const membersWithRole = (_a = interaction.guild.roles.cache.get(role.id)) === null || _a === void 0 ? void 0 : _a.members.size;
                    if (role.hoist)
                        separation = 'yes';
                    else
                        separation = 'no';
                    const embedRole = new discord_js_1.MessageEmbed()
                        .setColor(this.spiritus.colors.embed)
                        .setThumbnail(`${interaction.guild.iconURL() ? interaction.guild.iconURL() : ''}`)
                        .setAuthor(`Information of role :`, `${interaction.guild.iconURL() ? interaction.guild.iconURL() : ''}`)
                        .setTitle(`${role.name}`)
                        .addFields({ name: 'Role', value: `${role}`, inline: true }, { name: 'Color', value: `${role.hexColor}`, inline: true }, { name: 'Position', value: `${role.position}`, inline: true }, { name: 'ID', value: `${role.id}`, inline: true }, { name: 'Manager :', value: `${manager}`, inline: true }, { name: 'Mention :', value: `${mention}`, inline: true }, { name: 'Members :', value: `${membersWithRole}`, inline: true }, { name: 'Separation :', value: `${separation}`, inline: true }, { name: 'Created at  :', value: `${moment_1.default.utc(role.createdTimestamp).format('DD/MM/YYYY - hh:mm')}`, inline: true }, { name: 'Permissions :', value: `${role.permissions.toArray().sort().map((permissions) => `${permissions.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")}`).join(", ") || "none"}`, inline: true })
                        .setTimestamp()
                        .setFooter('Command module: Fun');
                    interaction.reply({ embeds: [embedRole] });
                    break;
                case 'channel':
                    const channel = this.spiritus.util.resolveChannel(interaction.guild, args.get('channel').value);
                    if (!channel)
                        return interaction.replyErrorMessage(`Channel not found.`);
                    let type = '';
                    let nsfw;
                    if (channel.type === 'text')
                        type = `${this.spiritus.emojis.channel}Text`;
                    if (channel.type === 'voice')
                        type = `${this.spiritus.emojis.voice}Voice`;
                    if (channel.type === 'category')
                        type = `Categrory`;
                    if (!type)
                        type = `Other`;
                    if (channel.nsfw)
                        nsfw = `${this.spiritus.emojis.CHANNELNSFW} Yes`;
                    else
                        nsfw = `${this.spiritus.emojis.CHANNELNSFW} No`;
                    const embedChannel = new discord_js_1.MessageEmbed()
                        .setAuthor(`Information of a channel :`, `${interaction.guild.iconURL()}`)
                        .setThumbnail(`${interaction.guild.iconURL() ? interaction.guild.iconURL() : ''}`)
                        .setColor(this.spiritus.colors.embed)
                        .setTitle(`Channel : ${channel.name}`)
                        .addFields({ name: 'Channel id :', value: `${channel.id}`, inline: true }, { name: 'Category :', value: `${channel.parent ? channel.parent : 'none'}`, inline: true }, { name: 'Topic :', value: `${channel.topic || 'No topic'}`, inline: false }, { name: 'Catégory ID :', value: `${channel.parentID}`, inline: true }, { name: 'Position :', value: `${channel.position}`, inline: true }, { name: '\u200b', value: `\u200b`, inline: true }, { name: 'Created at  :', value: `${moment_1.default.utc(channel.createdTimestamp).format('DD/MM/YYYY - hh:mm')}`, inline: true }, { name: 'Type channel:', value: `${type}`, inline: true }, { name: 'Channel NSFW :', value: `${nsfw}`, inline: true })
                        .setTimestamp()
                        .setFooter('Command module: Fun');
                    interaction.reply({ embeds: [embedChannel] });
                    break;
            }
        });
    }
}
exports.default = Ping;
