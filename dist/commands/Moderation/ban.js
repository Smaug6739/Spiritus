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
            name: 'ban',
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
            description: 'Ban user from the server',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: [],
            botPermissions: ['BAN_MEMBERS'],
            subCommands: [],
        });
    }
    async execute(interaction, args, settings) {
        const argReason = args.get('reason')?.value || 'No reason was provided.';
        const argUser = args.get('user').value;
        const user = await this.spiritus.util.resolveMember(interaction.guild, argUser);
        if (!user)
            return interaction.replyErrorMessage(`User not found.`);
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${user.username} (${user.id})`)
            .setColor(this.spiritus.colors.red)
            .setDescription(`**Action**: ban\n**Reason**: ${argReason}\n**Guild :** ${interaction.guild.name}\nModerator : ${interaction.user.username}`)
            .setThumbnail(user.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL());
        if (user.bannable) {
            try {
                await user.send({ embeds: [embed] });
            }
            finally {
                user.ban({ reason: argReason }).then(() => {
                    interaction.reply({ embeds: [embed] })
                        .then(() => {
                        setTimeout(() => {
                            interaction.deleteReply();
                        }, 5000);
                    });
                    if (settings.modLogs) {
                        const channel = this.spiritus.util.resolveChannel(interaction.guild, settings.modLogs);
                        if (channel && channel.permissionsFor(interaction.guild.me).has('SEND_MESSAGES'))
                            channel.send({ embeds: embed });
                    }
                });
            }
        }
        else
            interaction.replyErrorMessage(`I can't ban this user.`);
    }
}
exports.default = default_1;
