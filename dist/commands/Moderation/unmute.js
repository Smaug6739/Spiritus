"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandClass_1 = __importDefault(require("../CommandClass"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'unmute',
            aliases: [],
            args: [
                {
                    name: 'user',
                    description: 'User for unmute',
                    type: 'STRING',
                    required: true
                },
            ],
            description: 'Unlock channel from the guild',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: ['MODERATOR'],
            botPermissions: ['MANAGE_ROLES', 'MANAGE_MEMBERS'],
            subCommands: [],
        });
    }
    async execute(interaction, args, settings) {
        const argUser = args.get('user').value;
        const user = await this.spiritus.util.resolveMember(interaction.guild, argUser);
        if (!user)
            return interaction.replyErrorMessage(`User not found.`);
        const muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
        if (!muteRole)
            return interaction.replyErrorMessage(`This user is not muted.`);
        if (!user.roles.cache.has(muteRole.id))
            return interaction.replyErrorMessage(`This user is not muted.`);
        user.roles.remove(muteRole.id);
        interaction.replySuccessMessage(`<@${user.id}> is now unmuted`);
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${user.user.username} (${user.id})`, user.user.displayAvatarURL())
            .setColor(this.spiritus.colors.green)
            .setDescription(`**Action**: unmute`)
            .setTimestamp()
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL());
        if (settings.modLogs) {
            const channel = this.spiritus.util.resolveChannel(interaction.guild, settings.modLogs);
            if (channel && channel.permissionsFor(interaction.guild.me).has('SEND_MESSAGES'))
                channel.send(embed);
        }
    }
}
exports.default = default_1;
