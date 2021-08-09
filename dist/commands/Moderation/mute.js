"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
const CommandClass_1 = __importDefault(require("../CommandClass"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'mute',
            aliases: [],
            options: [
                {
                    name: 'user',
                    description: 'User to mute.',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'time',
                    description: 'Time of mute (default : 1h).',
                    type: 'STRING',
                    required: false
                },
            ],
            description: 'Mute user from the server.',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: ['MODERATOR'],
            botPermissions: ['MANAGE_CHANNELS'],
            subCommands: [],
        });
    }
    async execute(interaction, args, settings) {
        const argUser = args.get('user').value;
        const argTime = args.get('time')?.value;
        const user = await this.spiritus.util.resolveMember(interaction.guild, argUser);
        let muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
        const muteTime = argTime || '60s';
        if (!user)
            return interaction.replyErrorMessage(`User not found.`);
        if (!muteRole) {
            muteRole = await interaction.guild.roles.create({
                name: 'Muted',
                color: '#2f3136',
                permissions: []
            });
            interaction.guild.channels.cache.forEach(async (channel) => {
                if (channel.isThread())
                    return;
                await channel.updateOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    CONNECT: false
                });
            });
        }
        ;
        await user.roles.add(muteRole.id);
        interaction.replySuccessMessage(`<@${user.id}> is muted for ${ms_1.default(ms_1.default(muteTime))}.`);
        setTimeout(() => {
            user.roles.remove(muteRole.id);
        }, ms_1.default(muteTime));
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${user.user.username} (${user.id})`, user.user.displayAvatarURL())
            .setColor(this.colors.orange)
            .setDescription(`**Action**: mute\n**Time**: ${ms_1.default(ms_1.default(muteTime))}`)
            .setTimestamp()
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL());
        if (settings.modLogs) {
            const channel = this.spiritus.util.resolveChannel(interaction.guild, settings.modLogs);
            if (channel) {
                if (channel.permissionsFor(interaction.guild.me).has('SEND_MESSAGES')) {
                    channel.send({ embeds: [embed] });
                }
            }
        }
    }
}
exports.default = default_1;
