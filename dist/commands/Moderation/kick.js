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
            name: 'kick',
            aliases: [],
            options: [
                {
                    name: 'user',
                    description: 'User to be banned',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'reason',
                    description: 'The reason of ban',
                    type: 'STRING',
                    required: false
                },
            ],
            description: 'Kick user from the server',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: ['MODERATOR'],
            botPermissions: ['KICK_MEMBERS'],
            subCommands: [],
        });
    }
    async execute(interaction, args, settings) {
        const argUser = args.get('user').value;
        const reason = args.get('reason').value || 'No reason was given';
        const interactionMember = await this.spiritus.util.resolveMember(interaction.guild, interaction.user.id);
        const user = await this.spiritus.util.resolveMember(interaction.guild, argUser);
        if (!user)
            return interaction.replyErrorMessage(`User not found.`);
        if (interactionMember.roles.highest.comparePositionTo(user.roles.highest) <= 0 && interaction.guild.ownerId !== interaction.user.id)
            return interaction.replyErrorMessage(`You don't have the permission for this.`);
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${user.user.username} (${user.id})`)
            .setColor(this.colors.orange)
            .setDescription(`**Action**: kick\n**Reason**: ${reason}`)
            .setThumbnail(user.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL());
        if (user.kickable) {
            try {
                await user.send(embed);
            }
            finally {
                user.kick(reason).then(() => {
                    interaction.reply({ embeds: [embed] });
                    if (settings.modLogs) {
                        const channel = this.spiritus.util.resolveChannel(interaction.guild, settings.modLogs);
                        if (channel && channel.permissionsFor(interaction.guild.me).has('SEND_MESSAGES'))
                            channel.send(embed);
                    }
                });
            }
        }
    }
}
exports.default = default_1;
