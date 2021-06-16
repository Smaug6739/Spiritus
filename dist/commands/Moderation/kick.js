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
const discord_js_1 = require("discord.js");
const CommandClass_1 = __importDefault(require("../CommandClass"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'N',
            aliases: [],
            args: [
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
    execute(interaction, args, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const argUser = args.get('user').value;
            const reason = args.get('reason').value || 'No reason was given';
            const interactionMember = yield this.spiritus.util.resolveMember(interaction.guild, interaction.user.id);
            const user = yield this.spiritus.util.resolveMember(interaction.guild, argUser);
            if (!user)
                return interaction.replyErrorMessage(`User not found.`);
            if (interactionMember.roles.highest.comparePositionTo(user.roles.highest) <= 0 && interaction.guild.ownerID !== interaction.user.id)
                return interaction.replyErrorMessage(`You don't have the permission for this.`);
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(`${user.user.username} (${user.id})`)
                .setColor(`${this.spiritus.colors.orange}`)
                .setDescription(`**Action**: kick\n**Reason**: ${reason}`)
                .setThumbnail(user.user.displayAvatarURL())
                .setTimestamp()
                .setFooter(interaction.user.username, interaction.user.displayAvatarURL());
            if (user.kickable) {
                try {
                    yield user.send(embed);
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
        });
    }
}
exports.default = default_1;
