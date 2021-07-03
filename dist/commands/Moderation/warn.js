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
            name: 'warn',
            aliases: [],
            args: [
                {
                    name: 'user',
                    description: 'The user to warn',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'reason',
                    description: 'The reason of warn',
                    type: 'STRING',
                    required: false
                },
            ],
            description: 'Warn a user.',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: ['MODERATOR'],
            botPermissions: [],
            subCommands: [],
        });
    }
    async execute(interaction, args) {
        const member = await this.spiritus.util.resolveMember(interaction.guild, args.get('user').value);
        if (!member)
            return interaction.replyErrorMessage('User not found.');
        const reason = args.get('reason')?.value || 'No reason was provided.';
        const dmEmbed = new discord_js_1.MessageEmbed()
            .setTitle('Warn')
            .setColor(this.spiritus.colors.orange)
            .setAuthor(member.user.username, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`**Action :** Warn\n**Reason :** ${reason}${reason.endsWith('.') ? '' : '.'}\n**Server :** ${interaction.guild.name}\n**Moderator :** ${interaction.user.username}`)
            .setTimestamp()
            .setFooter(`By : ${interaction.user.username}`, interaction.user.displayAvatarURL());
        try {
            await member.send({ embeds: [dmEmbed] });
        }
        catch {
            return interaction.replyErrorMessage('I can\'t send a message to this user.');
        }
        interaction.replySuccessMessage(`I have successfully warn the user \`${member.user.tag}\`.`);
    }
}
exports.default = default_1;
